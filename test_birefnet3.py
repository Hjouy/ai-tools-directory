import urllib.request, ssl, json, time, base64

ctx = ssl.create_default_context()
base = 'https://ZhengPeng7-birefnet-demo.hf.space'

# 查看完整 API info，搞清楚 /image 端点真正的 fn_index
req = urllib.request.Request(base + '/gradio_api/info',
    headers={'User-Agent':'Mozilla/5.0', 'Accept':'application/json'})
resp = urllib.request.urlopen(req, timeout=10, context=ctx)
data = json.loads(resp.read())

# 找到 /image 对应的 fn_index
print('所有 named_endpoints:')
for name, ep in data['named_endpoints'].items():
    params = [p['parameter_name'] for p in ep.get('parameters', [])]
    returns = [r.get('label','?') for r in ep.get('returns', [])]
    print(f'  {name}: params={params}, returns={returns}')

# 试试不同的数据格式
# 方式1：用 list 而非 FileData 对象
test_img_url = 'https://picsum.photos/id/1005/200/300'
req0 = urllib.request.Request(test_img_url, headers={'User-Agent':'Mozilla/5.0'})
img_data = urllib.request.urlopen(req0, timeout=10, context=ctx).read()
data_url = 'data:image/jpeg;base64,' + base64.b64encode(img_data).decode()

# 方式2: 先用 upload API 上传文件再引用
# Gradio 支持先 POST /upload 拿到服务器路径，再用路径提交
print('\n=== 测试 /upload 接口 ===')
boundary = 'boundary12345'
body = (
    f'--{boundary}\r\nContent-Disposition: form-data; name="files"; filename="test.jpg"\r\nContent-Type: image/jpeg\r\n\r\n'
).encode() + img_data + f'\r\n--{boundary}--\r\n'.encode()

req_up = urllib.request.Request(base + '/gradio_api/upload', data=body,
    headers={
        'Content-Type': f'multipart/form-data; boundary={boundary}',
        'User-Agent': 'Mozilla/5.0'
    }, method='POST')
try:
    resp_up = urllib.request.urlopen(req_up, timeout=15, context=ctx)
    up_data = json.loads(resp_up.read())
    print('Upload 成功:', up_data)
    # 用返回的路径提交
    file_path = up_data[0] if isinstance(up_data, list) else up_data
    
    session_hash = 'birefnet_upload_test'
    payload = json.dumps({
        'fn_index': 0,
        'data': [{'path': file_path, 'orig_name': 'test.jpg', 'mime_type': 'image/jpeg',
                  'is_stream': False, 'meta': {'_type': 'gradio.FileData'}}],
        'session_hash': session_hash,
    }).encode()
    
    req2 = urllib.request.Request(base + '/gradio_api/queue/join', data=payload,
        headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}, method='POST')
    resp2 = urllib.request.urlopen(req2, timeout=15, context=ctx)
    join_data = json.loads(resp2.read())
    print('Join (path方式):', join_data)
    
    time.sleep(0.5)
    req3 = urllib.request.Request(
        base + '/gradio_api/queue/data?session_hash=' + session_hash,
        headers={'User-Agent': 'Mozilla/5.0', 'Accept': 'text/event-stream'}
    )
    resp3 = urllib.request.urlopen(req3, timeout=60, context=ctx)
    start = time.time()
    for i in range(100):
        line = resp3.readline().decode('utf-8', errors='replace').strip()
        if not line:
            continue
        elapsed = time.time() - start
        print(f'[{elapsed:.1f}s] {line[:300]}')
        if 'process_completed' in line:
            msg = json.loads(line[5:])
            print('\n最终output:', json.dumps(msg.get('output', {}), indent=2)[:800])
            break
        if elapsed > 30:
            print('超时')
            break
except Exception as e:
    print('Upload 失败:', e)
