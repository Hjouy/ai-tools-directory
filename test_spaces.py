import urllib.request, ssl, json, time

ctx = ssl.create_default_context()

# 候选 Space 列表
spaces = [
    'https://BRIA-background-removal.hf.space',
    'https://briaai-RMBG-1.4.hf.space',
    'https://gokaygokay-Florence-2-SD3-Captioner.hf.space',
    'https://schirrmacher-ormbg.hf.space',
    'https://Xenova-remove-background-web.hf.space',
    'https://nateraw-background-remover.hf.space',
    'https://piddnad-ddcolor.hf.space',
]

for base in spaces:
    try:
        req = urllib.request.Request(base + '/gradio_api/info',
            headers={'User-Agent':'Mozilla/5.0', 'Accept':'application/json'})
        resp = urllib.request.urlopen(req, timeout=8, context=ctx)
        data = json.loads(resp.read())
        eps = list(data.get('named_endpoints', {}).keys())
        print(f'OK  {base}  endpoints={eps}')
    except Exception as e:
        print(f'FAIL {base}  {str(e)[:60]}')
