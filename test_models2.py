import urllib.request, ssl
ctx = ssl.create_default_context()

# 找更小的可用模型和更稳定的 CDN
tests = [
    # 更小的 RMBG 量化模型 - 不同来源
    ('hf-mirror RMBG quant', 'https://hf-mirror.com/briaai/RMBG-1.4/resolve/main/onnx/model_quantized.onnx'),
    # modelscope 国内镜像
    ('modelscope RMBG', 'https://modelscope.cn/models/BRIA/RMBG-1.4/resolve/master/onnx/model_quantized.onnx'),
    # 更轻量的 u2netp (4MB!)
    ('u2netp via hf-mirror', 'https://hf-mirror.com/danielgatis/rembg/resolve/main/u2netp.onnx'),
    ('u2net via hf-mirror', 'https://hf-mirror.com/danielgatis/rembg/resolve/main/u2net.onnx'),
    ('silueta via hf-mirror', 'https://hf-mirror.com/danielgatis/rembg/resolve/main/silueta.onnx'),
    # isnet-portrait (人像专用)
    ('isnet-portrait', 'https://hf-mirror.com/danielgatis/rembg/resolve/main/isnet-general-use.onnx'),
]
for name, url in tests:
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'}, method='HEAD')
        resp = urllib.request.urlopen(req, timeout=8, context=ctx)
        cl = int(resp.headers.get('Content-Length', 0))
        cors = resp.headers.get('Access-Control-Allow-Origin', 'NONE')
        print(f'OK {cl//1024//1024}MB cors={cors[:20]} - {name}')
    except Exception as e:
        print(f'FAIL - {name}: {str(e)[:60]}')
