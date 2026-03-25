#!/usr/bin/env python3
"""
自动推送脚本 - 用 GitHub API 推送文件到仓库
无需 VPN，直接走 GitHub API 绕过 git push 的网络限制
用法: python push_to_github.py [文件路径1] [文件路径2] ... [commit消息]
"""
import urllib.request, json, base64, ssl, sys, os, ctypes, ctypes.wintypes as wintypes

REPO = 'Hjouy/ai-tools-directory'
BRANCH = 'main'

def get_token():
    """从 Windows 凭据管理器读取 GitHub PAT"""
    CRED_TYPE_GENERIC = 1
    class CREDENTIAL_ATTRIBUTE(ctypes.Structure):
        _fields_ = [('Keyword', wintypes.LPWSTR),('Flags', wintypes.DWORD),('ValueSize', wintypes.DWORD),('Value', ctypes.POINTER(ctypes.c_byte))]
    class CREDENTIAL(ctypes.Structure):
        _fields_ = [('Flags', wintypes.DWORD),('Type', wintypes.DWORD),('TargetName', wintypes.LPWSTR),('Comment', wintypes.LPWSTR),('LastWritten', wintypes.FILETIME),('CredentialBlobSize', wintypes.DWORD),('CredentialBlob', ctypes.POINTER(ctypes.c_byte)),('Persist', wintypes.DWORD),('AttributeCount', wintypes.DWORD),('Attributes', ctypes.POINTER(CREDENTIAL_ATTRIBUTE)),('TargetAlias', wintypes.LPWSTR),('UserName', wintypes.LPWSTR)]
    advapi32 = ctypes.windll.advapi32
    pcred = ctypes.POINTER(CREDENTIAL)()
    ok = advapi32.CredReadW('git:https://github.com', CRED_TYPE_GENERIC, 0, ctypes.byref(pcred))
    if not ok:
        raise RuntimeError('无法从凭据管理器读取 GitHub token')
    cred = pcred.contents
    blob = bytes(cred.CredentialBlob[i] for i in range(cred.CredentialBlobSize))
    return blob.decode('utf-16-le')

def push_file(local_path, remote_path, commit_msg, token):
    """推送单个文件到 GitHub"""
    ctx = ssl.create_default_context()
    headers = {
        'Authorization': f'token {token}',
        'User-Agent': 'AutoPush/1.0',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
    }

    # 获取文件当前 SHA
    url = f'https://api.github.com/repos/{REPO}/contents/{remote_path}'
    req = urllib.request.Request(url, headers=headers)
    try:
        resp = urllib.request.urlopen(req, timeout=15, context=ctx)
        sha = json.loads(resp.read())['sha']
    except urllib.error.HTTPError as e:
        if e.code == 404:
            sha = None  # 新文件
        else:
            raise

    # 读取本地文件
    with open(local_path, 'rb') as f:
        content_b64 = base64.b64encode(f.read()).decode()

    # 提交
    payload = {'message': commit_msg, 'content': content_b64, 'branch': BRANCH}
    if sha:
        payload['sha'] = sha
    req2 = urllib.request.Request(url, data=json.dumps(payload).encode(), headers=headers, method='PUT')
    resp2 = urllib.request.urlopen(req2, timeout=30, context=ctx)
    result = json.loads(resp2.read())
    return result['commit']['sha'][:10]

def main():
    # 默认推送所有已修改的 html 文件
    import subprocess
    result = subprocess.run(['git', 'diff', '--name-only', 'HEAD~1', 'HEAD'],
                          capture_output=True, text=True,
                          cwd=r'c:\Users\36970\WorkBuddy\20260323191722')
    changed = [f.strip() for f in result.stdout.splitlines() if f.strip()]
    
    if not changed:
        print('没有检测到变更文件')
        return

    token = get_token()
    print(f'已获取 token，开始推送 {len(changed)} 个文件...')
    
    base_dir = r'c:\Users\36970\WorkBuddy\20260323191722'
    commit_msg = '自动推送: 更新最新修改'
    
    for fname in changed:
        local = os.path.join(base_dir, fname)
        if os.path.exists(local):
            print(f'推送: {fname} ...', end=' ', flush=True)
            try:
                sha = push_file(local, fname, commit_msg, token)
                print(f'✓ (commit: {sha})')
            except Exception as e:
                print(f'✗ 失败: {e}')

if __name__ == '__main__':
    main()
