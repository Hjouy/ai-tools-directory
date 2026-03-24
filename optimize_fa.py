import os
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

# Font Awesome 异步加载代码
old_fa = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">'
new_fa = '''<!-- Font Awesome 异步加载，不阻塞页面渲染 -->
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></noscript>'''

# 查找所有HTML文件
root_dir = os.path.dirname(os.path.abspath(__file__))
html_files = []

for root, dirs, files in os.walk(root_dir):
    # 跳过.workbuddy目录
    if '.workbuddy' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

changed_count = 0
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_fa in content:
        new_content = content.replace(old_fa, new_fa)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        changed_count += 1
        print(f"[OK] {os.path.basename(filepath)}")

print(f"\nTotal: {changed_count} files optimized")
