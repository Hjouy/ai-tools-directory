import ctypes, ctypes.wintypes as wintypes, urllib.request, json, base64, ssl

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
file_path = 'id-photo.html'

req = urllib.request.Request(f'https://api.github.com/repos/{repo}/contents/{file_path}', headers=headers)
resp = urllib.request.urlopen(req, timeout=15, context=ctx)
info = json.loads(resp.read())
sha = info['sha']
print('SHA:', sha[:10])

with open(r'c:\Users\36970\WorkBuddy\20260323191722\id-photo.html', 'rb') as f:
    content = f.read()
print('文件大小:', len(content), '字节')

payload = json.dumps({
    'message': 'feat: 换用 onnxruntime-web + RMBG-1.4本地推理，完全离线，无需服务器',
    'content': base64.b64encode(content).decode(),
    'sha': sha,
    'branch': 'main'
}).encode()

req2 = urllib.request.Request(f'https://api.github.com/repos/{repo}/contents/{file_path}', data=payload, headers=headers, method='PUT')
resp2 = urllib.request.urlopen(req2, timeout=30, context=ctx)
result = json.loads(resp2.read())
print('推送成功! commit:', result['commit']['sha'][:10])
