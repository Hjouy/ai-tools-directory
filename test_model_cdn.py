import urllib.request, ssl
ctx = ssl.create_default_context()

# 测试把模型文件放到 jsdelivr 可访问的 npm 包
# onnxruntime-web 本身在 jsdelivr 可达
# 找一个把 RMBG/U2Net 模型打包成 npm 的包
test_urls = [
    # onnx-rmbg npm 包
    'https://cdn.jsdelivr.net/npm/onnx-rmbg/model.onnx',
    # rembg-wasm
    'https://cdn.jsdelivr.net/npm/rembg-wasm/dist/',
    # background-removal-node
    'https://cdn.jsdelivr.net/npm/@imgly/background-removal-node@1.7.0/',
    # 直接测试 jsdelivr 能不能访问 HF 镜像
    'https://hf-mirror.com/briaai/RMBG-1.4/resolve/main/onnx/model.onnx',
    # modelscope (国内)
    'https://modelscope.cn/models/BRIA/RMBG-1.4/resolve/master/onnx/model.onnx',
]
for url in test_urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'}, method='HEAD')
        resp = urllib.request.urlopen(req, timeout=10, context=ctx)
        cl = resp.headers.get('Content-Length', '?')
        print(f'OK {resp.status} size={cl} - {url[:80]}')
    except Exception as e:
        print(f'FAIL - {url[:80]}: {str(e)[:70]}')
