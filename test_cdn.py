import urllib.request, ssl
ctx = ssl.create_default_context()

urls = [
    'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/dist/index.mjs',
    'https://unpkg.com/@imgly/background-removal@1.7.0/dist/index.mjs',
    'https://esm.sh/@imgly/background-removal@1.7.0',
    'https://esm.sh/@imgly/background-removal',
]
for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'}, method='HEAD')
        resp = urllib.request.urlopen(req, timeout=8, context=ctx)
        cl = resp.headers.get('Content-Length','?')
        ct = resp.headers.get('Content-Type','?')
        print(f'OK {resp.status} size={cl} type={ct[:30]} - {url[:70]}')
    except Exception as e:
        print(f'FAIL - {url[:60]}: {str(e)[:60]}')
