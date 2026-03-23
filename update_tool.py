# Script to update tool.html to use data.js

with open('tool.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add data.js reference before the <script> tag
# Find the line "<script>" that starts after line 613
script_tag = '<script>\n// 工具完整数据库'
if script_tag in content:
    content = content.replace(
        script_tag,
        '<script src="data.js"></script>\n<script>\n// 使用 data.js 中的工具数据'
    )
    print("1. Added data.js reference")

# 2. Find and replace the TOOLS definition start
# Replace "const TOOLS = {" with a comment and use TOOLS_DATA
if 'const TOOLS = {' in content:
    content = content.replace(
        'const TOOLS = {',
        '''// 使用 data.js 中的 TOOLS_DATA
// 注意：data.js 中的工具数据结构与这里兼容
const TOOLS = TOOLS_DATA;
'''
    )
    print("2. Replaced TOOLS with TOOLS_DATA")

# Write back
with open('tool.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Success! Updated tool.html to use data.js")
