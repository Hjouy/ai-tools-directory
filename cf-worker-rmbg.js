/**
 * Cloudflare Worker - AI 抠图中转服务
 * 
 * 部署步骤：
 * 1. 登录 https://dash.cloudflare.com
 * 2. 左侧菜单 "Workers & Pages" → 点击 "Create"
 * 3. 选择 "Create Worker" → 点击 "Deploy"
 * 4. 点击 "Edit code"，把这整个文件内容粘贴进去
 * 5. 点击右上角 "Save and Deploy"
 * 6. 复制 Worker 的 URL（格式：https://xxx.xxx.workers.dev）
 * 7. 把 URL 填到 id-photo.html 的 WORKER_URL 变量里
 */

// 允许跨域的来源（填你的 GitHub Pages 地址）
const ALLOWED_ORIGINS = [
  'https://hjouy.github.io',
  'http://localhost',
  'http://127.0.0.1',
  // 开发调试时允许所有来源，上线后可以删掉下面这行
  '*'
];

export default {
  async fetch(request, env, ctx) {
    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    // 只接受 POST 请求
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const origin = request.headers.get('Origin') || '';
    
    try {
      // 读取用户上传的图片
      const imageBlob = await request.blob();
      
      if (!imageBlob || imageBlob.size < 100) {
        return corsResponse({ error: '图片数据无效' }, 400, origin);
      }

      // 图片大小限制 10MB
      if (imageBlob.size > 10 * 1024 * 1024) {
        return corsResponse({ error: '图片太大，请上传10MB以内的图片' }, 400, origin);
      }

      let resultBlob = null;
      let usedModel = '';

      // ===== 尝试 RMBG-1.4（最高质量）=====
      try {
        const resp = await fetch(
          'https://api-inference.huggingface.co/models/briaai/RMBG-1.4',
          {
            method: 'POST',
            headers: {
              'Content-Type': imageBlob.type || 'image/jpeg',
              // 如果有 HF Token 填这里，没有也能用（但有限速）
              // 'Authorization': 'Bearer hf_your_token_here',
            },
            body: imageBlob,
            signal: AbortSignal.timeout(45000)
          }
        );

        if (resp.ok) {
          const blob = await resp.blob();
          if (blob.size > 500) {
            resultBlob = blob;
            usedModel = 'RMBG-1.4';
          }
        } else if (resp.status === 503) {
          // 模型冷启动，等待后重试一次
          const errJson = await resp.json().catch(() => ({}));
          const waitTime = (errJson.estimated_time || 20) * 1000;
          await sleep(Math.min(waitTime, 25000));
          
          const resp2 = await fetch(
            'https://api-inference.huggingface.co/models/briaai/RMBG-1.4',
            {
              method: 'POST',
              headers: { 'Content-Type': imageBlob.type || 'image/jpeg' },
              body: imageBlob,
              signal: AbortSignal.timeout(45000)
            }
          );
          if (resp2.ok) {
            const blob2 = await resp2.blob();
            if (blob2.size > 500) {
              resultBlob = blob2;
              usedModel = 'RMBG-1.4';
            }
          }
        }
      } catch (e) {
        console.error('RMBG-1.4 error:', e.message);
      }

      // ===== 尝试 BiRefNet（备用高质量）=====
      if (!resultBlob) {
        try {
          const resp = await fetch(
            'https://api-inference.huggingface.co/models/ZhengPeng7/BiRefNet',
            {
              method: 'POST',
              headers: { 'Content-Type': imageBlob.type || 'image/jpeg' },
              body: imageBlob,
              signal: AbortSignal.timeout(45000)
            }
          );
          if (resp.ok) {
            const blob = await resp.blob();
            if (blob.size > 500) {
              resultBlob = blob;
              usedModel = 'BiRefNet';
            }
          }
        } catch (e) {
          console.error('BiRefNet error:', e.message);
        }
      }

      // ===== 所有模型都失败 =====
      if (!resultBlob) {
        return corsResponse(
          { error: 'AI模型暂时不可用，请稍后重试（模型可能正在启动，30秒后再试）' },
          503,
          origin
        );
      }

      // 返回透明 PNG 图片
      const arrayBuffer = await resultBlob.arrayBuffer();
      return new Response(arrayBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'X-Model-Used': usedModel,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cache-Control': 'no-cache'
        }
      });

    } catch (err) {
      console.error('Worker error:', err);
      return corsResponse({ error: '服务器内部错误：' + err.message }, 500, origin);
    }
  }
};

// ===== 工具函数 =====
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function handleCORS(request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}

function corsResponse(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
