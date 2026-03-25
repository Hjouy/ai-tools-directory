import urllib.request, ssl, os, ctypes, ctypes.wintypes as wintypes, json, base64

ctx = ssl.create_default_context()

# 下载 u2netp (4MB 轻量模型)
print('下载 u2netp.onnx (4.7MB)...')
url = 'https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2netp.onnx'
save_path = r'c:\Users\36970\WorkBuddy\20260323191722\models\u2netp.onnx'
os.makedirs(os.path.dirname(save_path), exist_ok=True)

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
resp = urllib.request.urlopen(req, timeout=30, context=ctx)
with open(save_path, 'wb') as f:
    data = resp.read()
    f.write(data)
print(f'下载完成: {len(data)//1024//1024}MB')

# 推送到 GitHub 仓库 (models/u2netp.onnx)
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

headers = {'Authorization': f'token {token}', 'User-Agent': 'Python', 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json'}
repo = 'Hjouy/ai-tools-directory'
file_path_in_repo = 'models/u2netp.onnx'

sha = None
try:
    req2 = urllib.request.Request(f'https://api.github.com/repos/{repo}/contents/{file_path_in_repo}', headers=headers)
    resp2 = urllib.request.urlopen(req2, timeout=10, context=ctx)
    info = json.loads(resp2.read())
    sha = info['sha']
    print('已存在，SHA:', sha[:8])
except:
    print('文件不存在，新建')

print('推送到 GitHub 仓库...')
payload = {'message': 'feat: 添加 u2netp ONNX 模型（4MB，本地推理用）', 'content': base64.b64encode(data).decode(), 'branch': 'main'}
if sha:
    payload['sha'] = sha

req3 = urllib.request.Request(f'https://api.github.com/repos/{repo}/contents/{file_path_in_repo}', data=json.dumps(payload).encode(), headers=headers, method='PUT')
resp3 = urllib.request.urlopen(req3, timeout=60, context=ctx)
result = json.loads(resp3.read())
print('推送成功! commit:', result['commit']['sha'][:10])
print('jsdelivr URL:', f'https://cdn.jsdelivr.net/gh/Hjouy/ai-tools-directory@main/models/u2netp.onnx')
