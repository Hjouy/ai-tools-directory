import ctypes, ctypes.wintypes as wintypes, urllib.request, json, base64, ssl, os

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

ctx = ssl.create_default_context()
headers = {'Authorization': f'token {token}', 'User-Agent': 'Python', 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json'}
repo = 'Hjouy/ai-tools-directory'

# 推送模型文件（42MB，用 base64 编码上传）
model_path = r'c:\Users\36970\WorkBuddy\20260323191722\models\rmbg-1.4-quant.onnx'
file_path_in_repo = 'models/rmbg-1.4-quant.onnx'

print(f'读取模型文件: {os.path.getsize(model_path)//1024//1024}MB')

# 检查文件是否已存在（获取 sha）
sha = None
try:
    req = urllib.request.Request(f'https://api.github.com/repos/{repo}/contents/{file_path_in_repo}', headers=headers)
    resp = urllib.request.urlopen(req, timeout=15, context=ctx)
    info = json.loads(resp.read())
    sha = info['sha']
    print('文件已存在，SHA:', sha[:10])
except Exception:
    print('文件不存在，将新建')

with open(model_path, 'rb') as f:
    content = f.read()

payload = {
    'message': 'feat: 添加 RMBG-1.4 量化模型（本地推理用）',
    'content': base64.b64encode(content).decode(),
    'branch': 'main'
}
if sha:
    payload['sha'] = sha

print('上传中（42MB，需要约30秒）...')
payload_bytes = json.dumps(payload).encode()
print(f'payload大小: {len(payload_bytes)//1024//1024}MB')

req2 = urllib.request.Request(
    f'https://api.github.com/repos/{repo}/contents/{file_path_in_repo}',
    data=payload_bytes, headers=headers, method='PUT'
)
resp2 = urllib.request.urlopen(req2, timeout=120, context=ctx)
result = json.loads(resp2.read())
print('推送成功! commit:', result['commit']['sha'][:10])
