import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Find and remove the toolsData array (lines 1350-1373)
toolsData_pattern = r'  // 工具数据\n  const toolsData = \[.*?\];'
content = re.sub(toolsData_pattern, '', content, flags=re.DOTALL)

# 2. Find the location to add new initialization code - after the SEO section ends
# Add initialization code before "// 工具跳转逻辑"
new_init_code = '''
  // 使用 data.js 中的工具数据
  let currentFilters = {
    price: 'all',
    users: 'all',
    rating: 'all',
    category: 'all'
  };

  // 初始化页面
  function initPage() {
    // 渲染分类导航
    renderCategories();
    // 渲染今日精选
    renderDailyPick();
    // 渲染工具卡片
    renderToolsGrid();
    // 更新统计数字
    updateStats();
    // 初始化筛选结果
    filterTools();
  }

  // 更新统计数据
  function updateStats() {
    const toolsList = getToolsList();
    const categories = getCategories();
    document.getElementById('totalTools').textContent = toolsList.length + '+';
    document.getElementById('totalCategories').textContent = categories.length;
  }

  // 渲染分类导航
  function renderCategories() {
    const container = document.getElementById('categoriesGrid');
    const categories = getCategories();
    
    container.innerHTML = categories.map(cat => `
      <a href="${cat.id}.html" class="category-card" aria-label="${cat.name}工具分类">
        <span class="category-icon">${cat.icon}</span>
        <div class="category-name">${cat.name}</div>
        <div class="category-count">${cat.count} 个工具</div>
      </a>
    `).join('');
  }

  // 渲染今日精选
  function renderDailyPick() {
    const container = document.getElementById('dailyPick');
    // 选择评分最高的工具作为今日精选
    const tools = getToolsList();
    const featured = tools.sort((a, b) => b.rating - a.rating)[0];
    const toolData = getToolById(featured.id);
    
    if (!toolData) return;
    
    container.innerHTML = `
      <div>
        <div class="daily-pick-badge">⭐ 今日精选工具</div>
        <h3 id="daily-pick-title">${toolData.name} — ${toolData.category}</h3>
        <p>${toolData.desc}</p>
        <div class="daily-pick-stats">
          <div class="dp-stat"><div class="dp-stat-val">${toolData.rating}</div><div class="dp-stat-lab">用户评分</div></div>
          <div class="dp-stat"><div class="dp-stat-val">${toolData.users}</div><div class="dp-stat-lab">活跃用户</div></div>
          <div class="dp-stat"><div class="dp-stat-val">${toolData.price}</div><div class="dp-stat-lab">定价</div></div>
        </div>
        <a href="tool.html?id=${toolData.id}" class="btn-primary" style="display:inline-block; text-decoration:none; padding: 10px 24px; border-radius: 8px; font-size: 0.9rem;">查看详情 →</a>
      </div>
      <div class="daily-pick-img" aria-hidden="true">${toolData.icon}</div>
    `;
  }

  // 渲染工具卡片网格
  function renderToolsGrid() {
    const container = document.getElementById('toolsGrid');
    let tools = getToolsList();
    
    // 应用筛选
    tools = applyFilters(tools);
    
    // 更新筛选结果数量
    document.getElementById('filteredCount').textContent = tools.length;
    
    if (tools.length === 0) {
      container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--text-muted);">没有找到符合条件的工具</div>';
      return;
    }
    
    container.innerHTML = tools.map(tool => {
      const toolData = getToolById(tool.id);
      const tags = toolData ? toolData.scenes.slice(0, 2) : [tool.category];
      const tagBadges = tags.map(t => `<span class="tag">${t}</span>`).join('');
      
      let badge = '';
      if (tool.isHot) badge = '<span class="hot-tag">HOT</span>';
      else if (tool.isNew) badge = '<span class="new-tag">NEW</span>';
      
      const priceClass = tool.priceType === 'free' ? 'price-free' : (tool.priceType === 'paid' ? 'price-paid' : '');
      const priceText = tool.price;
      
      return `
        <article class="tool-card" role="listitem" onclick="goToTool('${tool.id}')" itemscope itemtype="https://schema.org/SoftwareApplication">
          ${badge}
          <div class="tool-card-header">
            <div class="tool-logo" style="background: ${tool.color}20; color: ${tool.color};">${tool.icon}</div>
            <div class="tool-info">
              <h3 itemprop="name">${tool.name}</h3>
              <div class="tool-meta">
                <span class="tool-rating" aria-label="评分${tool.rating}">${'★'.repeat(Math.floor(tool.rating))}${tool.rating % 1 >= 0.5 ? '½' : ''}${'☆'.repeat(5 - Math.floor(tool.rating) - (tool.rating % 1 >= 0.5 ? 1 : 0))} ${tool.rating}</span>
                <span class="tool-users">${tool.users}</span>
              </div>
            </div>
          </div>
          <p class="tool-desc" itemprop="description">${tool.desc}</p>
          <div class="tool-card-footer">
            <div class="tool-tags">${tagBadges}</div>
            <span class="tool-price ${priceClass}" itemprop="offers" itemscope itemtype="https://schema.org/Offer">${priceText}</span>
          </div>
        </article>
      `;
    }).join('');
  }

  // 应用筛选
  function applyFilters(tools) {
    return tools.filter(tool => {
      // 价格筛选
      if (currentFilters.price !== 'all') {
        if (currentFilters.price === 'free' && !tool.price.includes('免费')) return false;
        if (currentFilters.price === 'paid' && !tool.priceType === 'paid') return false;
        if (currentFilters.price === 'freemium' && tool.priceType !== 'freemium') return false;
      }
      
      // 用户量筛选
      if (currentFilters.users !== 'all') {
        const users = parseUsers(tool.users);
        if (currentFilters.users === 'high' && users < 1000000) return false;
        if (currentFilters.users === 'medium' && (users < 100000 || users >= 1000000)) return false;
        if (currentFilters.users === 'low' && users >= 100000) return false;
      }
      
      // 评分筛选
      if (currentFilters.rating !== 'all') {
        if (tool.rating < parseFloat(currentFilters.rating)) return false;
      }
      
      // 分类筛选
      if (currentFilters.category !== 'all' && tool.category !== currentFilters.category) return false;
      
      return true;
    });
  }

  // 解析用户数量
  function parseUsers(usersStr) {
    const match = usersStr.match(/([\\d.]+)(万|亿)?/);
    if (!match) return 0;
    let num = parseFloat(match[1]);
    if (match[2] === '亿') num *= 100000000;
    else if (match[2] === '万') num *= 10000;
    return num;
  }

  // 筛选工具
  function filterTools() {
    currentFilters.price = document.getElementById('filterPrice').value;
    currentFilters.users = document.getElementById('filterUsers').value;
    currentFilters.rating = document.getElementById('filterRating').value;
    currentFilters.category = document.getElementById('filterCategory').value;
    
    renderToolsGrid();
  }

  // 重置筛选
  function resetFilters() {
    document.getElementById('filterPrice').value = 'all';
    document.getElementById('filterUsers').value = 'all';
    document.getElementById('filterRating').value = 'all';
    document.getElementById('filterCategory').value = 'all';
    
    currentFilters = {
      price: 'all',
      users: 'all',
      rating: 'all',
      category: 'all'
    };
    
    renderToolsGrid();
  }

  // 快速查询筛选（用于弹窗）
  function filterToolsModal() {
    const q = document.getElementById('modalInput').value.toLowerCase();
    const tools = getToolsList().filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.tag.toLowerCase().includes(q)
    );
    
    const container = document.getElementById('modalResults');
    if (tools.length === 0) {
      container.innerHTML = '<div style="padding:24px;text-align:center;color:var(--text-muted);">没有找到相关工具，试试其他关键词？</div>';
      return;
    }
    
    container.innerHTML = `<div style="padding:8px 16px;font-size:0.75rem;color:var(--text-muted);border-bottom:1px solid var(--border);">找到 ${tools.length} 个相关工具</div>` +
      tools.map(t => `
      <div class="modal-tool-item" onclick="goToTool('${t.id}');document.getElementById('modalOverlay').classList.remove('open');">
        <div class="modal-tool-icon" style="background:${t.color}20;color:${t.color};">${t.icon}</div>
        <div style="flex:1;min-width:0;">
          <div class="modal-tool-name">${t.name}</div>
          <div class="modal-tool-desc">${t.desc.substring(0, 30)}... · ★${t.rating} · ${t.users}用户</div>
        </div>
        <div class="modal-tool-price">${t.price.includes('免费') ? '免费' : t.price}</div>
      </div>
    `).join('');
  }

  // 页面加载完成后初始化
  document.addEventListener('DOMContentLoaded', initPage);

  // 修改快速查询弹窗的输入事件
  document.getElementById('modalInput').oninput = filterToolsModal;

'''

# Find the location to insert - before "// 工具跳转逻辑"
content = content.replace(
    '  // 工具跳转逻辑',
    new_init_code + '\n  // 工具跳转逻辑'
)

# 3. Update goToTool function to use tool.html with id only
content = content.replace(
    "function goToTool(id, url) {\n    // 所有收录工具都跳转到详情页\n    window.location.href = 'tool.html?id=' + id;\n  }",
    '''function goToTool(id) {
    // 所有收录工具都跳转到详情页
    window.location.href = 'tool.html?id=' + id;
  }'''
)

# 4. Remove the old filterTools function (modal version will be replaced by filterToolsModal)
# Find and remove the old filterTools function for modal
old_filter_pattern = r'function filterTools\(\) \{\s*const q = document\.getElementById\(\'modalInput\'\)\.value\.toLowerCase\(\);\s*const list = toolsData\.filter\(.*?\);.*?\}\s*\}'
content = re.sub(old_filter_pattern, 'function filterTools() { filterToolsModal(); }', content, flags=re.DOTALL)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Success! Updated index.html with dynamic tool rendering.")
