import urllib.request, ssl
ctx = ssl.create_default_context()

# 找真正小的可用抠图 ONNX 模型
# u2netp 是 4.7MB 的轻量版
tests = [
    # rembg 官方发布的小模型
    ('u2netp 4.7MB', 'https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2netp.onnx'),
    ('silueta 44MB', 'https://github.com/danielgatis/rembg/releases/download/v0.0.0/silueta.onnx'),
    # 更小的人像分割
    ('u2net_human 176MB', 'https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net_human_seg.onnx'),
    # BRIA light 版本
    ('BRIA RMBG via raw', 'https://raw.githubusercontent.com/briaai/RMBG-1.4/main/onnx/model_quantized.onnx'),
]
for name, url in tests:
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'}, method='HEAD')
        resp = urllib.request.urlopen(req, timeout=8, context=ctx)
        cl = int(resp.headers.get('Content-Length', 0))
        cors = resp.headers.get('Access-Control-Allow-Origin', 'NONE')
        final_url = resp.url
        print(f'OK {cl//1024//1024}MB cors={cors} - {name}')
        print(f'  final: {final_url[:80]}')
    except Exception as e:
        print(f'FAIL - {name}: {str(e)[:60]}')
