// 图片水印和保护功能

// 添加水印到Canvas
function addWatermark(canvas, text = 'AI工具导航') {
  const ctx = canvas.getContext('2d');
  const fontSize = Math.max(16, canvas.width / 40);
  
  ctx.save();
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.lineWidth = 2;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  
  const x = canvas.width - 20;
  const y = canvas.height - 20;
  
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
  ctx.restore();
  
  return canvas;
}

// 下载图片时自动添加水印
function downloadWithWatermark(canvasOrDataUrl, filename, watermarkText = 'AI工具导航') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  return new Promise((resolve, reject) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // 绘制原图
      ctx.drawImage(img, 0, 0);
      
      // 添加水印
      addWatermark(canvas, watermarkText);
      
      // 触发下载
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      resolve();
    };
    
    img.onerror = reject;
    img.src = typeof canvasOrDataUrl === 'string' ? canvasOrDataUrl : canvasOrDataUrl.toDataURL();
  });
}

// 禁用图片右键菜单（可选）
function disableImageContextMenu() {
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'CANVAS') {
      e.preventDefault();
      showImageTip();
    }
  });
}

// 显示提示
function showImageTip() {
  const existing = document.querySelector('.img-tip');
  if (existing) return;
  
  const tip = document.createElement('div');
  tip.className = 'img-tip';
  tip.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.9);
    color: white;
    padding: 20px 32px;
    border-radius: 12px;
    font-size: 14px;
    z-index: 10001;
    text-align: center;
  `;
  tip.innerHTML = `
    <div style="font-size: 24px; margin-bottom: 8px;">🛡️</div>
    <div>图片已受版权保护</div>
    <div style="color: #94a3b8; margin-top: 4px; font-size: 12px;">请通过页面提供的下载按钮保存</div>
  `;
  document.body.appendChild(tip);
  
  setTimeout(() => tip.remove(), 2000);
}

// 初始化图片保护
function initImageProtection(watermarkText = 'AI工具导航 | aitools.example.com') {
  // 禁用右键菜单
  disableImageContextMenu();
  
  // 监听下载按钮，自动添加水印
  window.watermarkText = watermarkText;
}
