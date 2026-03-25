import urllib.request, ssl
ctx = ssl.create_default_context()

# 测试 hf-mirror 上的量化小模型（更快下载）
test_urls = [
    # RMBG-1.4 的不同量化版本
    'https://hf-mirror.com/briaai/RMBG-1.4/resolve/main/onnx/model_quantized.onnx',
    'https://hf-mirror.com/briaai/RMBG-1.4/resolve/main/onnx/model_fp16.onnx',
    # 更小的 U2Net 模型
    'https://hf-mirror.com/schirrmacher/u2net-portrait/resolve/main/onnx/u2net_portrait.onnx',
    # isnet-general-use (轻量版)
    'https://hf-mirror.com/skytnt/anime-seg/resolve/main/isnetis.onnx',
]
for url in test_urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'}, method='HEAD')
        resp = urllib.request.urlopen(req, timeout=10, context=ctx)
        cl = int(resp.headers.get('Content-Length', 0))
        print(f'OK size={cl//1024//1024}MB - {url.split("/")[-1]} - {url[:80]}')
    except Exception as e:
        print(f'FAIL - {url.split("/")[-1]}: {str(e)[:70]}')
