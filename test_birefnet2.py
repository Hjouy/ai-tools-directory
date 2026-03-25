import urllib.request, ssl, json, time, base64

ctx = ssl.create_default_context()
base = 'https://ZhengPeng7-birefnet-demo.hf.space'

# 用一张真实的人像图测试（从网上取一张小图）
# 先用 Picsum 的小图代替
test_img_url = 'https://picsum.photos/id/1005/200/300'  # 人像图
req0 = urllib.request.Request(test_img_url, headers={'User-Agent':'Mozilla/5.0'})
img_data = urllib.request.urlopen(req0, timeout=10, context=ctx).read()
data_url = 'data:image/jpeg;base64,' + base64.b64encode(img_data).decode()
print(f'图片大小: {len(img_data)} bytes, base64长度: {len(data_url)}')

session_hash = 'birefnet_test_001'

# 提交任务
payload = json.dumps({
    'fn_index': 0,
    'data': [{
        'url': data_url,
        'orig_name': 'test.jpg',
        'mime_type': 'image/jpeg',
        'is_stream': False,
        'meta': {'_type': 'gradio.FileData'}
    }],
    'session_hash': session_hash,
    'event_data': None,
}).encode()

req2 = urllib.request.Request(base + '/gradio_api/queue/join', data=payload,
    headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}, method='POST')
resp2 = urllib.request.urlopen(req2, timeout=15, context=ctx)
join_data = json.loads(resp2.read())
print('Join:', join_data)

# SSE 监听
time.sleep(0.5)
req3 = urllib.request.Request(
    base + '/gradio_api/queue/data?session_hash=' + session_hash,
    headers={'User-Agent': 'Mozilla/5.0', 'Accept': 'text/event-stream'}
)
resp3 = urllib.request.urlopen(req3, timeout=60, context=ctx)
print('SSE 连接成功，等待结果...')

start = time.time()
for i in range(100):
    line = resp3.readline().decode('utf-8', errors='replace').strip()
    if not line:
        continue
    elapsed = time.time() - start
    print(f'[{elapsed:.1f}s] {line[:200]}')
    if 'process_completed' in line:
        msg = json.loads(line[5:])  # 去掉 'data: ' 前缀
        output = msg.get('output', {})
        print('\n=== 结果 ===')
        print(json.dumps(output, indent=2, ensure_ascii=False)[:500])
        break
    if 'error' in line.lower() and 'event_id' not in line:
        print('出错了')
        break
