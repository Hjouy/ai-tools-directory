import urllib.request, ssl, os
ctx = ssl.create_default_context()

print('下载 RMBG-1.4 量化模型（42MB）...')
url = 'https://hf-mirror.com/briaai/RMBG-1.4/resolve/main/onnx/model_quantized.onnx'
save_path = r'c:\Users\36970\WorkBuddy\20260323191722\models\rmbg-1.4-quant.onnx'

os.makedirs(os.path.dirname(save_path), exist_ok=True)

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
resp = urllib.request.urlopen(req, timeout=60, context=ctx)

total = int(resp.headers.get('Content-Length', 0))
downloaded = 0
chunk_size = 1024 * 1024  # 1MB

with open(save_path, 'wb') as f:
    while True:
        chunk = resp.read(chunk_size)
        if not chunk:
            break
        f.write(chunk)
        downloaded += len(chunk)
        pct = downloaded * 100 // total if total else 0
        print(f'\r{downloaded//1024//1024}MB / {total//1024//1024}MB ({pct}%)', end='', flush=True)

print(f'\n完成！保存到: {save_path}')
print(f'文件大小: {os.path.getsize(save_path) // 1024 // 1024}MB')
