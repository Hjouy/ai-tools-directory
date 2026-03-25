import urllib.request, ssl, json
ctx = ssl.create_default_context()

# 获取包的文件列表
req = urllib.request.Request(
    'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/',
    headers={'User-Agent':'Mozilla/5.0', 'Accept':'application/json'}
)
resp = urllib.request.urlopen(req, timeout=10, context=ctx)
data = json.loads(resp.read())
files = data.get('files', [])
print('文件列表:')
for f in files:
    print(f'  {f["name"]} ({f.get("size","?")})')
