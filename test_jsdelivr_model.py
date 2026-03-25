import urllib.request, ssl
ctx = ssl.create_default_context()

url = 'https://cdn.jsdelivr.net/gh/Hjouy/ai-tools-directory@main/models/u2netp.onnx'
try:
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Origin':'https://hjouy.github.io'}, method='HEAD')
    resp = urllib.request.urlopen(req, timeout=10, context=ctx)
    print('状态:', resp.status)
    print('Content-Length:', resp.headers.get('Content-Length','?'))
    print('CORS:', resp.headers.get('Access-Control-Allow-Origin','NONE'))
    print('Content-Type:', resp.headers.get('Content-Type','?'))
    print('Cache-Control:', resp.headers.get('Cache-Control','?'))
    print()
    print('jsDelivr URL 完全可用!')
    print(f'URL: {url}')
except Exception as e:
    print('失败:', str(e))
