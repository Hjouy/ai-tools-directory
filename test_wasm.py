import urllib.request, ssl
ctx = ssl.create_default_context()

# 验证 onnxruntime-web WASM 文件是否在 jsdelivr 上存在
wasm_files = [
    'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/ort-wasm-simd-threaded.wasm',
    'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/ort-wasm-simd.wasm',
    'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/ort-wasm.wasm',
    'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/ort.min.js',
    # 模型
    'https://hf-mirror.com/briaai/RMBG-1.4/resolve/main/onnx/model_quantized.onnx',
]
for url in wasm_files:
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Origin':'https://hjouy.github.io'}, method='HEAD')
        resp = urllib.request.urlopen(req, timeout=8, context=ctx)
        cl = resp.headers.get('Content-Length', '?')
        cors = resp.headers.get('Access-Control-Allow-Origin', 'NONE')
        print(f'OK size={cl} cors={cors} - {url.split("/")[-1]}')
    except Exception as e:
        print(f'FAIL - {url.split("/")[-1]}: {str(e)[:70]}')
