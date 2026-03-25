import urllib.request, ssl, json
ctx = ssl.create_default_context()

# 找 background-removal-data 包的最新版本
req = urllib.request.Request(
    'https://registry.npmjs.org/@imgly/background-removal-data/latest',
    headers={'User-Agent':'Mozilla/5.0'}
)
resp = urllib.request.urlopen(req, timeout=10, context=ctx)
data = json.loads(resp.read())
print('data包版本:', data['version'])
print('main:', data.get('main',''))

# 测试 staticimgly CDN 正确路径
ver = data['version']
test_urls = [
    f'https://staticimgly.com/@imgly/background-removal-data/{ver}/dist/',
    f'https://staticimgly.com/@imgly/background-removal-data@{ver}/dist/',
    f'https://cdn.jsdelivr.net/npm/@imgly/background-removal-data@{ver}/dist/',
]
for url in test_urls:
    try:
        req2 = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'}, method='HEAD')
        resp2 = urllib.request.urlopen(req2, timeout=8, context=ctx)
        print(f'OK {resp2.status} - {url}')
    except Exception as e:
        print(f'FAIL - {url[:80]}: {str(e)[:60]}')
