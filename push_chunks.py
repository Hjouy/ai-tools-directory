import ctypes, ctypes.wintypes as wintypes, urllib.request, json, base64, ssl, math, os

# ===== 读取 PAT（与 push.py 相同方式）=====
CRED_TYPE_GENERIC = 1
class CREDENTIAL_ATTRIBUTE(ctypes.Structure):
    _fields_ = [('Keyword', wintypes.LPWSTR),('Flags', wintypes.DWORD),('ValueSize', wintypes.DWORD),('Value', ctypes.POINTER(ctypes.c_byte))]
class CREDENTIAL(ctypes.Structure):
    _fields_ = [('Flags', wintypes.DWORD),('Type', wintypes.DWORD),('TargetName', wintypes.LPWSTR),('Comment', wintypes.LPWSTR),('LastWritten', wintypes.FILETIME),('CredentialBlobSize', wintypes.DWORD),('CredentialBlob', ctypes.POINTER(ctypes.c_byte)),('Persist', wintypes.DWORD),('AttributeCount', wintypes.DWORD),('Attributes', ctypes.POINTER(CREDENTIAL_ATTRIBUTE)),('TargetAlias', wintypes.LPWSTR),('UserName', wintypes.LPWSTR)]

advapi32 = ctypes.windll.advapi32
pcred = ctypes.POINTER(CREDENTIAL)()
advapi32.CredReadW('git:https://github.com', CRED_TYPE_GENERIC, 0, ctypes.byref(pcred))
cred = pcred.contents
blob = bytes(cred.CredentialBlob[i] for i in range(cred.CredentialBlobSize))
token = blob.decode('utf-16-le')
print('PAT OK, len:', len(token))

ctx = ssl.create_default_context()
OWNER = 'Hjouy'
REPO = 'ai-tools-directory'
headers = {
    'Authorization': f'token {token}',
    'User-Agent': 'Python',
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
}

def api_get(path):
    req = urllib.request.Request(f'https://api.github.com{path}', headers=headers)
    try:
        resp = urllib.request.urlopen(req, timeout=15, context=ctx)
        return json.loads(resp.read()), resp.status
    except urllib.request.HTTPError as e:
        return json.loads(e.read()), e.code

def api_put(path, data):
    body = json.dumps(data).encode()
    req = urllib.request.Request(f'https://api.github.com{path}', data=body, headers=headers, method='PUT')
    try:
        resp = urllib.request.urlopen(req, timeout=90, context=ctx)
        return json.loads(resp.read()), resp.status
    except urllib.request.HTTPError as e:
        return json.loads(e.read()), e.code

# ===== 切块 =====
model_path = 'models/rmbg-1.4-quant.onnx'
with open(model_path, 'rb') as f:
    model_data = f.read()

total_size = len(model_data)
CHUNK_SIZE = 9 * 1024 * 1024  # 9MB 每块
num_chunks = math.ceil(total_size / CHUNK_SIZE)

print(f'模型: {total_size/1024/1024:.1f} MB -> {num_chunks} 块 x {CHUNK_SIZE/1024/1024:.0f}MB')

for i in range(num_chunks):
    start = i * CHUNK_SIZE
    end = min(start + CHUNK_SIZE, total_size)
    chunk = model_data[start:end]
    chunk_name = f'rmbg14q.part{i:02d}'
    github_path = f'models/chunks/{chunk_name}'

    print(f'[{i+1}/{num_chunks}] {chunk_name} ({len(chunk)/1024/1024:.1f}MB)...', end=' ', flush=True)

    existing, status = api_get(f'/repos/{OWNER}/{REPO}/contents/{github_path}')
    sha = existing.get('sha') if status == 200 else None

    payload = {
        'message': f'Add RMBG-1.4 chunk {i+1}/{num_chunks}',
        'content': base64.b64encode(chunk).decode(),
        'branch': 'main'
    }
    if sha:
        payload['sha'] = sha

    result, code = api_put(f'/repos/{OWNER}/{REPO}/contents/{github_path}', payload)
    if code in (200, 201):
        commit = result.get('commit', {}).get('sha', '?')[:10]
        print(f'OK {commit}')
    else:
        print(f'FAIL {code}: {result.get("message","")}')
        break

print('Done!')
print(f'CDN: https://cdn.jsdelivr.net/gh/Hjouy/ai-tools-directory@main/models/chunks/rmbg14q.part00')
print(f'块数: {num_chunks}  (part00 ~ part{num_chunks-1:02d})')
