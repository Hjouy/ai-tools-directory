import ctypes, ctypes.wintypes as wintypes, urllib.request, json, ssl, os

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
auth_headers = {'Authorization': f'token {token}', 'User-Agent': 'Python', 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json'}
repo = 'Hjouy/ai-tools-directory'

# Step 1: 创建 Release（tag: models-v1）
print('Step 1: 创建 Release...')
release_payload = json.dumps({
    'tag_name': 'models-v1',
    'name': 'AI Models v1',
    'body': 'RMBG-1.4 量化模型，用于证件照AI抠图本地推理',
    'draft': False,
    'prerelease': False
}).encode()

try:
    req = urllib.request.Request(
        f'https://api.github.com/repos/{repo}/releases',
        data=release_payload, headers=auth_headers, method='POST'
    )
    resp = urllib.request.urlopen(req, timeout=15, context=ctx)
    release = json.loads(resp.read())
    upload_url = release['upload_url'].replace('{?name,label}', '')
    release_id = release['id']
    print(f'Release 创建成功: {release["html_url"]}')
    print(f'Upload URL: {upload_url}')
except Exception as e:
    # 如果已存在，查找它
    print(f'创建失败（可能已存在）: {e}')
    req2 = urllib.request.Request(
        f'https://api.github.com/repos/{repo}/releases/tags/models-v1',
        headers=auth_headers
    )
    try:
        resp2 = urllib.request.urlopen(req2, timeout=10, context=ctx)
        release = json.loads(resp2.read())
        upload_url = release['upload_url'].replace('{?name,label}', '')
        print(f'找到已有 Release: {release["html_url"]}')
    except Exception as e2:
        print(f'查找也失败: {e2}')
        exit(1)

# Step 2: 上传模型文件到 Release Assets
model_path = r'c:\Users\36970\WorkBuddy\20260323191722\models\rmbg-1.4-quant.onnx'
file_size = os.path.getsize(model_path)
print(f'\nStep 2: 上传模型文件 ({file_size//1024//1024}MB)...')

upload_headers = {
    'Authorization': f'token {token}',
    'User-Agent': 'Python',
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/octet-stream',
    'Content-Length': str(file_size)
}

with open(model_path, 'rb') as f:
    model_data = f.read()

upload_req = urllib.request.Request(
    f'{upload_url}?name=rmbg-1.4-quant.onnx',
    data=model_data,
    headers=upload_headers,
    method='POST'
)
upload_resp = urllib.request.urlopen(upload_req, timeout=120, context=ctx)
asset = json.loads(upload_resp.read())
print(f'上传成功!')
print(f'下载URL: {asset["browser_download_url"]}')
