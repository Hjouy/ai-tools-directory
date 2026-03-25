import urllib.request, ssl, json, time

ctx = ssl.create_default_context()
base = 'https://not-lain-background-removal.hf.space'

small_png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
data_url = 'data:image/png;base64,' + small_png

# 用命名端点 /image 提交
for ep in ['/image', '/text', '/png']:
    session_hash = 'sess' + ep.replace('/', '')
    payload = json.dumps({
        'fn_index': 0,
        'data': [{'url': data_url, 'orig_name': 'test.png', 'mime_type': 'image/png',
                  'is_stream': False, 'meta': {'_type': 'gradio.FileData'}}],
        'session_hash': session_hash,
        'event_data': None,
        'fn': ep,   # 命名端点
    }).encode()

    req2 = urllib.request.Request(base + '/gradio_api/queue/join', data=payload,
        headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}, method='POST')
    try:
        resp2 = urllib.request.urlopen(req2, timeout=15, context=ctx)
        join_data = json.loads(resp2.read())
        print(f'端点 {ep} Join:', join_data)

        time.sleep(0.5)
        req3 = urllib.request.Request(
            base + '/gradio_api/queue/data?session_hash=' + session_hash,
            headers={'User-Agent': 'Mozilla/5.0', 'Accept': 'text/event-stream'}
        )
        resp3 = urllib.request.urlopen(req3, timeout=15, context=ctx)
        for i in range(10):
            line = resp3.readline().decode('utf-8', errors='replace').strip()
            if line:
                print(f'  {repr(line)}')
            if 'process_completed' in line or 'unexpected_error' in line or 'error' in line:
                break
    except Exception as e:
        print(f'端点 {ep} 失败:', e)
    print()
