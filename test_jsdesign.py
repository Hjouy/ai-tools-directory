import urllib.request, ssl, json, time, base64

ctx = ssl.create_default_context()

# 测试即时设计的抠图 API
# 先看看这个端点返回了什么
req = urllib.request.Request('https://js.design/api/v1/ai/remove-bg',
    headers={'User-Agent':'Mozilla/5.0', 'Accept':'application/json'})
resp = urllib.request.urlopen(req, timeout=10, context=ctx)
print('状态:', resp.status)
print('Headers:', dict(resp.headers))
body = resp.read().decode('utf-8', errors='replace')
print('Body:', body[:500])
