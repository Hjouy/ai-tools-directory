import urllib.request, ssl, json, time, base64

ctx = ssl.create_default_context()
base = 'https://not-lain-background-removal.hf.space'

# 查看完整 API info
req = urllib.request.Request(base + '/gradio_api/info', headers={'User-Agent':'Mozilla/5.0', 'Accept':'application/json'})
resp = urllib.request.urlopen(req, timeout=10, context=ctx)
data = json.loads(resp.read())

print('named_endpoints:', list(data.get('named_endpoints', {}).keys()))
for ep_name, ep_info in data.get('named_endpoints', {}).items():
    params = [p['parameter_name'] for p in ep_info.get('parameters', [])]
    print(f'  {ep_name}: params={params}')

# 用命名端点 /image 提交，看看是否还是同样错误
session_hash = 'xyz987654321'

small_png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
data_url = 'data:image/png;base64,' + small_png

payload = json.dumps({
    'fn_index': 0,
    'data': [{'url': data_url, 'orig_name': 'test.png', 'mime_type': 'image/png',
              'is_stream': False, 'meta': {'_type': 'gradio.FileData'}}],
    'session_hash': session_hash,
    'event_data': None,
}).encode()

req2 = urllib.request.Request(base + '/gradio_api/queue/join', data=payload,
    headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}, method='POST')
resp2 = urllib.request.urlopen(req2, timeout=15, context=ctx)
join_data = json.loads(resp2.read())
print('\nJoin:', join_data)

time.sleep(0.5)
req3 = urllib.request.Request(
    base + '/gradio_api/queue/data?session_hash=' + session_hash,
    headers={'User-Agent': 'Mozilla/5.0', 'Accept': 'text/event-stream'}
)
resp3 = urllib.request.urlopen(req3, timeout=30, context=ctx)
print('SSE connected:', resp3.status)
for i in range(20):
    line = resp3.readline().decode('utf-8', errors='replace').strip()
    if line:
        print(repr(line))
    if 'process_completed' in line or 'unexpected_error' in line:
        break

# 也试试直接调用 /api/predict（同步接口）
print('\n--- 测试同步 predict ---')
payload2 = json.dumps({
    'fn_index': 0,
    'data': [{'url': data_url, 'orig_name': 'test.png', 'mime_type': 'image/png',
              'is_stream': False, 'meta': {'_type': 'gradio.FileData'}}]
}).encode()
try:
    req4 = urllib.request.Request(base + '/api/predict', data=payload2,
        headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}, method='POST')
    resp4 = urllib.request.urlopen(req4, timeout=30, context=ctx)
    print('Predict同步:', resp4.status, resp4.read()[:200])
except Exception as e:
    print('Predict失败:', e)
