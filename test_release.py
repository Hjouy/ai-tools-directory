import urllib.request, ssl
ctx = ssl.create_default_context()

# 验证 GitHub Release 文件的 CORS
url = 'https://github.com/Hjouy/ai-tools-directory/releases/download/models-v1/rmbg-1.4-quant.onnx'
# GitHub Release 会重定向到 objects.githubusercontent.com
try:
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0', 'Origin':'https://hjouy.github.io'}, method='HEAD')
    resp = urllib.request.urlopen(req, timeout=15, context=ctx)
    print('最终URL:', resp.url)
    print('状态:', resp.status)
    print('Content-Length:', resp.headers.get('Content-Length','?'))
    print('CORS:', resp.headers.get('Access-Control-Allow-Origin','NONE'))
    print('Content-Type:', resp.headers.get('Content-Type','?'))
except Exception as e:
    print('失败:', str(e)[:100])
