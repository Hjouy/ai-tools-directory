import urllib.request, ssl, json, time, base64

ctx = ssl.create_default_context()
base = 'https://ZhengPeng7-birefnet-demo.hf.space'

# 查看 /image 端点的参数详情
req = urllib.request.Request(base + '/gradio_api/info',
    headers={'User-Agent':'Mozilla/5.0', 'Accept':'application/json'})
resp = urllib.request.urlopen(req, timeout=10, context=ctx)
data = json.loads(resp.read())

print('=== /image 端点参数 ===')
ep = data['named_endpoints'].get('/image', {})
print(json.dumps(ep, indent=2, ensure_ascii=False)[:2000])
