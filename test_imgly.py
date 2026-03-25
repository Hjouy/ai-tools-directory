import urllib.request, ssl
ctx = ssl.create_default_context()

urls = [
    'https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/',
    'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/dist/index.mjs',
]
for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'}, method='HEAD')
        resp = urllib.request.urlopen(req, timeout=8, context=ctx)
        print(f'OK {resp.status} - {url[:70]}')
    except Exception as e:
        print(f'FAIL - {url[:60]}: {str(e)[:70]}')
