import urllib.request, ssl, json
ctx = ssl.create_default_context()

# 测试 transformers.js CDN
urls = [
    'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.3/dist/transformers.min.js',
    # 测试模型文件能否通过 jsdelivr 访问 HF Hub
    'https://huggingface.co/briaai/RMBG-1.4/resolve/main/onnx/model.onnx',
    # 测试 cdnjs
    'https://cdnjs.cloudflare.com/ajax/libs/onnxruntime-web/1.18.0/ort.min.js',
]
for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'}, method='HEAD')
        resp = urllib.request.urlopen(req, timeout=8, context=ctx)
        cl = resp.headers.get('Content-Length','?')
        print(f'OK {resp.status} size={cl} - {url[:80]}')
    except Exception as e:
        print(f'FAIL - {url[:80]}: {str(e)[:60]}')
