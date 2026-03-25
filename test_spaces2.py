import urllib.request, ssl, json, time

ctx = ssl.create_default_context()

# 更多候选，包括 RMBG-2.0 相关
spaces = [
    # 从 CSDN 博文里提到的
    'https://briaai-RMBG-2.0.hf.space',
    'https://BRIA-RMBG-2.0.hf.space',
    'https://ZhengPeng7-BiRefNet.hf.space',
    'https://ZhengPeng7-BiRefNet-HR.hf.space',
    'https://ZhengPeng7-birefnet-demo.hf.space',
    'https://jbrinkma-remove-background.hf.space',
    'https://dylanebert-background-removal.hf.space',
    'https://fffiloni-image-to-image.hf.space',
    'https://songweig-rich-text-palette.hf.space',
    'https://multimodalart-cosxl.hf.space',
]

for base in spaces:
    try:
        req = urllib.request.Request(base + '/gradio_api/info',
            headers={'User-Agent':'Mozilla/5.0', 'Accept':'application/json'})
        resp = urllib.request.urlopen(req, timeout=8, context=ctx)
        data = json.loads(resp.read())
        eps = list(data.get('named_endpoints', {}).keys())
        print(f'OK   {base}')
        print(f'     endpoints={eps}')
    except Exception as e:
        err = str(e)[:50]
        print(f'FAIL {base}  {err}')
