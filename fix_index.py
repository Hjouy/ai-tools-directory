import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the tools-grid section
# Pattern: from '<div class="tools-grid" role="list" id="toolsGrid">' to '</div>'

# Find the start
start_marker = '<div class="tools-grid" role="list" id="toolsGrid">'
end_marker = '</div>\n\n  <!-- 广告位 2 -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_section = '<div class="tools-grid" role="list" id="toolsGrid"></div>\n\n  <!-- 广告位 2 -->'
    new_content = content[:start_idx] + new_section + content[end_idx + len(end_marker):]
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Success! Replaced tools grid section.")
else:
    print(f"Could not find markers. start={start_idx}, end={end_idx}")
