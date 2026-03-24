// 社交分享功能

// 分享到微信（显示二维码）
function shareToWechat(title, url) {
  // 创建一个简单的分享提示
  const shareUrl = encodeURIComponent(url);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${shareUrl}`;
  
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;
  modal.innerHTML = `
    <div style="background: white; border-radius: 16px; padding: 24px; text-align: center; max-width: 300px;">
      <h3 style="margin-bottom: 16px; color: #333;">分享到微信</h3>
      <img src="${qrUrl}" alt="微信二维码" style="width: 150px; height: 150px; margin-bottom: 16px;">
      <p style="color: #666; font-size: 14px;">截图保存后用微信扫码</p>
      <button onclick="this.closest('div').parentElement.parentElement.remove()" 
              style="margin-top: 16px; padding: 8px 24px; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer;">
        关闭
      </button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// 分享到微博
function shareToWeibo(title, url) {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  window.open(`https://service.weibo.com/share/share.php?url=${shareUrl}&title=${shareTitle}`, '_blank');
}

// 分享到QQ
function shareToQQ(title, url) {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  window.open(`https://connect.qq.com/widget/shareqq/iframe_index.html?url=${shareUrl}&title=${shareTitle}`, '_blank');
}

// 分享到QQ空间
function shareToQzone(title, url) {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  window.open(`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${shareUrl}&title=${shareTitle}`, '_blank');
}

// 复制链接
function copyLink(url) {
  navigator.clipboard.writeText(url).then(() => {
    showToast('链接已复制到剪贴板！');
  }).catch(() => {
    showToast('复制失败，请手动复制');
  });
}

// 显示提示
function showToast(message) {
  const existing = document.querySelector('.share-toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'share-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.9);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 10001;
    animation: fadeInUp 0.3s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// 创建分享按钮HTML
function createShareButtons(containerId, title, url) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = `
    <div class="share-buttons" style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <span style="font-size: 14px; color: var(--text-muted); margin-right: 8px;">分享:</span>
      <button onclick="shareToWechat('${title}', '${url}')" title="分享到微信" class="share-btn wechat">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89l-.406-.032zm-1.834 2.994c.536 0 .97.44.97.983a.976.976 0 0 1-.97.983.976.976 0 0 1-.97-.983c0-.542.434-.983.97-.983zm4.857 0c.536 0 .97.44.97.983a.976.976 0 0 1-.97.983.976.976 0 0 1-.97-.983c0-.542.434-.983.97-.983z"/></svg>
      </button>
      <button onclick="shareToWeibo('${title}', '${url}')" title="分享到微博" class="share-btn weibo">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.439l-.002.004zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.18.573h.014zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.579-.18-.405-.649.396-1.07.436-1.991.007-2.648-.801-1.239-2.996-1.174-5.516-.026 0 0-.792.345-.582-.283.386-1.15.354-2.087-.249-2.581-1.375-1.127-5.212-.052-8.562 2.397C.537 11.82-.62 15.292.428 17.792c.967 2.313 3.714 3.801 6.898 3.539 4.676-.385 8.417-3.035 8.968-5.569.107-.487.396-.844.756-1.051l.006-.004zM19.759 9c-.549-1.67-2.048-2.947-3.924-3.395-.514-.118-1.031-.171-1.542-.166-.434-.005-.858.053-1.271.154a.485.485 0 0 1-.184-.943 5.086 5.086 0 0 1 2.001-.336c.54-.005 1.079.06 1.612.174 2.337.512 3.879 2.164 4.28 4.512.046.269-.016.553-.18.773-.173.232-.432.368-.706.375-.272.006-.524-.123-.695-.333l-.391-.711z"/></svg>
      </button>
      <button onclick="shareToQQ('${title}', '${url}')" title="分享到QQ" class="share-btn qq">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.003 2c-2.265 0-6.52 1.145-6.52 6.852 0 2.22.974 4.268 2.658 5.841-.08.44-.29 1.69-.29 1.69-.08.28.18.28.28.11.38-.67.91-1.37.91-1.37.08-.17.28-.22.28.11 0 1.17-.67 2.11-1.11 2.66-.22.28 0 .45.34.17.67-.5 1.23-1.24 1.57-1.88.11-.22.56-.11.45.11-.22.67-.67 1.9-.67 1.9-.06.17.06.22.17.11.56-.5 1.34-1.37 1.34-1.37.12-.17.34-.11.23.11-.11.28-.34 1.01-.34 1.01-.11.17.06.28.23.11.45-.5 1.01-1.24 1.18-1.88.06-.22.45-.22.45.11v1.63s-.06.28-.06.84c0 2.24 1.66 4.16 3.68 4.16 2.02 0 3.68-1.92 3.68-4.16 0-.56-.06-.84-.06-.84v-1.58s.39-.34.45-.11c.17.64.73 1.37 1.18 1.88.17.17.34.06.23-.11-.23-.45-.56-1.01-.56-1.01-.11-.22.11-.28.23-.11 0 0 .78.87 1.34 1.37.11.11.23.06.17-.11 0 0-.45-1.24-.67-1.9-.11-.22.34-.33.45-.11.34.64.9 1.37 1.57 1.88.34.28.56.11.34-.17-.45-.55-1.11-1.49-1.11-2.66 0-.33.2-.28.28-.11 0 0 .53.7.91 1.37.1.17.36.17.28-.11 0 0-.21-1.25-.29-1.69 1.69-1.57 2.66-3.61 2.66-5.84 0-5.705-4.25-6.85-6.52-6.85zm.18 3.8c1.52 0 2.75 1.23 2.75 2.75s-1.23 2.75-2.75 2.75-2.75-1.23-2.75-2.75 1.23-2.75 2.75-2.75zm4.4 2.19c-.34-.28-.79-.45-1.35-.45h-2.03v1.18c0 .45-.37.82-.82.82h-.82c-.45 0-.82-.37-.82-.82v-1.18H7.8c-.56 0-1.01.17-1.35.45-.33.28-.5.67-.5 1.14 0 .95.76 1.73 1.7 1.73.35 0 .67-.1.94-.27.28-.17.5-.39.67-.66.17.28.39.5.67.66.28.17.6.27.95.27.94 0 1.7-.78 1.7-1.73 0-.47-.17-.86-.5-1.14zm-5.77.06c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5z"/></svg>
      </button>
      <button onclick="copyLink('${url}')" title="复制链接" class="share-btn link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
      </button>
    </div>
  `;
  
  // 添加样式
  if (!document.getElementById('share-buttons-style')) {
    const style = document.createElement('style');
    style.id = 'share-buttons-style';
    style.textContent = `
      .share-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        color: white;
      }
      .share-btn:hover {
        transform: scale(1.1);
      }
      .share-btn.wechat { background: #07c160; }
      .share-btn.weibo { background: #e6162d; }
      .share-btn.qq { background: #1296db; }
      .share-btn.link { background: #6366f1; }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
}
