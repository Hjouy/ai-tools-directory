import urllib.request, ssl, json, time

ctx = ssl.create_default_context()

# 测试稳定可访问的抠图API
tests = [
    # 即时设计 - 国内
    ('即时设计抠图', 'GET', 'https://js.design/api/v1/ai/remove-bg', None),
    # 搞定抠图
    ('搞定设计', 'GET', 'https://www.gaoding.com/', None),
    # 改图鸭
    ('改图鸭', 'GET', 'https://www.gaitubao.com/', None),
    # 稿定
    ('稿定', 'GET', 'https://www.gaoding.com/', None),
    # remove.bg 直接测试
    ('remove.bg', 'GET', 'https://api.remove.bg/v1.0/account', None),
    # Clipdrop
    ('Clipdrop', 'GET', 'https://clipdrop-api.co/', None),
    # 百度 AI 开放平台
    ('百度AI', 'GET', 'https://aip.baidubce.com/', None),
    # 腾讯云 AI
    ('腾讯云AI', 'GET', 'https://ai.qq.com/', None),
    # 讯飞开放平台
    ('讯飞', 'GET', 'https://www.xfyun.cn/', None),
    # 阿里云视觉智能
    ('阿里云', 'GET', 'https://vision.aliyuncs.com/', None),
]

for name, method, url, data in tests:
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
        resp = urllib.request.urlopen(req, timeout=5, context=ctx)
        print(f'OK   {name} ({resp.status}): {url}')
    except Exception as e:
        print(f'FAIL {name}: {str(e)[:60]}')
