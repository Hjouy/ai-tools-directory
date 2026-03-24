#!/usr/bin/env python3
"""
每日新闻数据抓取脚本
通过 GitHub Actions 定时运行（每日 07:00 / 12:00 / 20:00）
抓取微博/知乎/百度热搜 + 澎湃/RSS 新闻，生成 news-data.json
"""
import json
import datetime
import random
import re
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from typing import List, Dict, Any, Optional

# ============================
# 工具函数
# ============================
def http_get(url: str, headers: Optional[Dict] = None, timeout: int = 10) -> Optional[str]:
    """带 UA 随机化的 HTTP GET"""
    default_headers = {
        'User-Agent': random.choice([
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        ]),
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Referer': 'https://weibo.com/',
    }
    if headers:
        default_headers.update(headers)

    req = urllib.request.Request(url, headers=default_headers)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            # 自动处理 gzip
            import gzip
            if resp.info().get('Content-Encoding') == 'gzip':
                return gzip.decompress(resp.read()).decode('utf-8')
            return resp.read().decode('utf-8')
    except Exception as e:
        print(f"  [ERROR] GET {url} -> {e}")
        return None


def clean_text(text: str) -> str:
    """清理 HTML 实体和多余空白"""
    import html
    text = html.unescape(text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def parse_rss(url: str, max_items: int = 10) -> List[Dict]:
    """通用 RSS 解析，返回 [{title, link, pubDate}]"""
    content = http_get(url, timeout=15)
    if not content:
        return []

    try:
        root = ET.fromstring(content)
        channel = root.find('channel')
        items = channel.findall('item') if channel else root.findall('item')
        results = []
        for item in items[:max_items]:
            title = clean_text(item.findtext('title') or '')
            link = item.findtext('link') or ''
            pub_raw = item.findtext('pubDate') or ''
            # 简化时间格式
            pub_date = ''
            if pub_raw:
                try:
                    dt = datetime.datetime.strptime(pub_raw[:25], '%a, %d %b %Y %H:%M:%S')
                    pub_date = dt.strftime('%m-%d %H:%M')
                except Exception:
                    pub_date = pub_raw[:16]

            if title:
                results.append({'title': title, 'link': link, 'pubDate': pub_date})
        return results
    except Exception as e:
        print(f"  [RSS ERROR] {url} -> {e}")
        return []


# ============================
# 各分类数据源抓取函数
# ============================

def fetch_military() -> Dict:
    """军事新闻"""
    results = []
    # RSS 源
    rss_sources = [
        ('澎湃新闻-军事', 'https://feed.pengpaiprod1.com/military'),
        ('中华网军事', 'http://military.china.com/rss.xml'),
        ('新浪军事', 'https://feed.mix.sina.com.cn/api/roll/get?pageid=153&lid=2516&k=&num=10&page=1'),
    ]
    for name, url in rss_sources:
        print(f"  -> {name}")
        items = parse_rss(url)
        results.extend(items)
        if len(results) >= 8:
            break

    # 微博热搜军事相关（过滤关键词）
    weibo = fetch_weibo_hot()
    military_keywords = ['军事', '军', '国防', '演习', '武器', '舰', '战机', '导弹', '战争', '冲突']
    for item in weibo:
        if any(kw in item['title'] for kw in military_keywords):
            results.append(item)

    # 去重并截取
    seen = set()
    unique = []
    for r in results:
        key = r['title'][:20]
        if key not in seen:
            seen.add(key)
            unique.append(r)
    return {
        'label': '军事', 'icon': '🪖', 'color': '#ef4444',
        'desc': '国防动态 · 军事装备 · 国际局势',
        'subs': [
            {
                'id': 'mil-policy', 'icon': '📋', 'name': '军事动态',
                'desc': '部队建设、演习训练、装备更新',
                'items': [{'id': f'm{i+1}', **r} for i, r in enumerate(unique[:6])]
            },
            {
                'id': 'mil-equip', 'icon': '⚙️', 'name': '武器装备',
                'desc': '新型武器、技术突破、装备列装',
                'items': [{'id': f'm{i+6}', **r} for i, r in enumerate(unique[6:10])]
            }
        ]
    }


def fetch_economy() -> Dict:
    """经济新闻"""
    results = []
    sources = [
        ('新浪财经', 'https://feed.mix.sina.com.cn/api/roll/get?pageid=153&lid=1686&k=&num=10&page=1'),
        ('36Kr-科技', 'https://36kr.com/feed', True),
        ('彭博中文', 'https://feeds.bloomberg.com/markets/news.rss'),
    ]
    for name, url in sources:
        print(f"  -> {name}")
        if 'sina' in url:
            # 新浪 RSS JSON
            content = http_get(url)
            if content:
                try:
                    data = json.loads(content)
                    for item in data.get('result', {}).get('data', [])[:8]:
                        t = clean_text(item.get('title', ''))
                        if t:
                            results.append({
                                'title': t,
                                'link': item.get('url', ''),
                                'pubDate': item.get('ctime', '')[:10] if item.get('ctime') else ''
                            })
                except Exception as e:
                    print(f"    [JSON ERROR] {e}")
        else:
            items = parse_rss(url)
            results.extend(items)

    seen = set()
    unique = []
    for r in results:
        key = r['title'][:20]
        if key not in seen:
            seen.add(key)
            unique.append(r)

    return {
        'label': '经济', 'icon': '📈', 'color': '#f59e0b',
        'desc': '宏观经济 · 金融市场 · 产业政策',
        'subs': [
            {
                'id': 'eco-market', 'icon': '📊', 'name': '金融市场',
                'desc': '股市、汇市、大宗商品、基金',
                'items': [{'id': f'e{i+1}', **r} for i, r in enumerate(unique[:6])]
            },
            {
                'id': 'eco-policy', 'icon': '🏦', 'name': '宏观政策',
                'desc': '货币政策、财政政策、经济数据',
                'items': [{'id': f'e{i+6}', **r} for i, r in enumerate(unique[6:10])]
            }
        ]
    }


def fetch_tech() -> Dict:
    """科技新闻"""
    results = []
    sources = [
        ('36Kr-科技', 'https://36kr.com/feed'),
        ('少数派', 'https://sspai.com/feed'),
        ('爱范儿', 'https://www.ifanr.com/feed'),
        ('品玩', 'https://www.pingwest.com/feed'),
    ]
    for name, url in sources:
        print(f"  -> {name}")
        items = parse_rss(url)
        results.extend(items)
        if len(results) >= 10:
            break

    # 知乎热榜
    zhihu = fetch_zhihu_hot()
    results.extend(zhihu[:5])

    seen = set()
    unique = []
    for r in results:
        key = r['title'][:20]
        if key not in seen:
            seen.add(key)
            unique.append(r)

    return {
        'label': '科技', 'icon': '💻', 'color': '#6366f1',
        'desc': 'AI前沿 · 互联网 · 数码 · 前沿研究',
        'subs': [
            {
                'id': 'tech-ai', 'icon': '🤖', 'name': 'AI最前沿',
                'desc': '大模型、AGI进展、AI应用',
                'items': [{'id': f't{i+1}', **r} for i, r in enumerate(unique[:6])]
            },
            {
                'id': 'tech-internet', 'icon': '🌐', 'name': '互联网资讯',
                'desc': '大厂动态、产品更新、行业热点',
                'items': [{'id': f't{i+6}', **r} for i, r in enumerate(unique[6:10])]
            }
        ]
    }


def fetch_domestic() -> Dict:
    """国内大事"""
    results = []
    sources = [
        ('澎湃新闻-要闻', 'https://feed.pengpaiprod1.com/politics'),
        ('人民日报', 'http://paper.people.com.cn/rmrb/rss/rss5.xml'),
        ('新华网', 'http://www.news.cn/rss/xhsl.xml'),
        ('新京报', 'https://www.bjnews.com.cn/rss/underlines.xml'),
    ]
    for name, url in sources:
        print(f"  -> {name}")
        items = parse_rss(url)
        results.extend(items)
        if len(results) >= 12:
            break

    seen = set()
    unique = []
    for r in results:
        key = r['title'][:20]
        if key not in seen:
            seen.add(key)
            unique.append(r)

    return {
        'label': '国内大事', 'icon': '🏛️', 'color': '#10b981',
        'desc': '政策法规 · 社会热点 · 法治 · 地方要闻',
        'subs': [
            {
                'id': 'dom-policy', 'icon': '📜', 'name': '政策法规',
                'desc': '新出台的法规、政策解读、行业规范',
                'items': [{'id': f'd{i+1}', **r} for i, r in enumerate(unique[:6])]
            },
            {
                'id': 'dom-hot', 'icon': '🔥', 'name': '社会热点',
                'desc': '当天热门事件、舆论焦点、全民关注',
                'items': [{'id': f'd{i+6}', **r} for i, r in enumerate(unique[6:10])]
            }
        ]
    }


def fetch_life() -> Dict:
    """生活百态"""
    results = []
    sources = [
        ('澎湃新闻-社会', 'https://feed.pengpaiprod1.com/social'),
        ('知乎-数码', 'https://www.zhihu.com/rss'),
        ('小红书精选', None),  # 小红书无公开 RSS，跳过
    ]
    for name, url in sources:
        if not url:
            continue
        print(f"  -> {name}")
        items = parse_rss(url)
        results.extend(items)
        if len(results) >= 10:
            break

    # 微博热搜民生相关
    weibo = fetch_weibo_hot()
    life_keywords = ['消费', '旅游', '健康', '教育', '生活', '美食', '娱乐', '天气', '出行']
    for item in weibo:
        if any(kw in item['title'] for kw in life_keywords):
            results.append(item)

    seen = set()
    unique = []
    for r in results:
        key = r['title'][:20]
        if key not in seen:
            seen.add(key)
            unique.append(r)

    return {
        'label': '生活百态', 'icon': '🏠', 'color': '#a855f7',
        'desc': '消费 · 美食 · 健康 · 奇趣 · 家庭',
        'subs': [
            {
                'id': 'life-consume', 'icon': '🛒', 'name': '消费好物',
                'desc': '好物推荐、价格动态、购物节',
                'items': [{'id': f'l{i+1}', **r} for i, r in enumerate(unique[:5])]
            },
            {
                'id': 'life-food', 'icon': '🍜', 'name': '吃喝玩乐',
                'desc': '餐饮资讯、旅游热点、娱乐活动',
                'items': [{'id': f'l{i+5}', **r} for i, r in enumerate(unique[5:9])]
            },
            {
                'id': 'life-health', 'icon': '💊', 'name': '健康养生',
                'desc': '医疗资讯、健康知识、养生指南',
                'items': [{'id': f'l{i+9}', **r} for i, r in enumerate(unique[9:12])]
            }
        ]
    }


def fetch_weibo_hot() -> List[Dict]:
    """抓取微博热搜前50条"""
    # 微博热搜公开 API
    url = 'https://weibo.com/ajax/side/hotSearch'
    content = http_get(url)
    if not content:
        return []

    try:
        data = json.loads(content)
        bands = data.get('data', {}).get('band_list', [])
        hotwords = data.get('data', {}).get('hotgov', {})

        results = []
        # 热搜主榜
        for i, item in enumerate(bands[:20]):
            word = clean_text(item.get('word', ''))
            if word:
                results.append({
                    'title': f'🔥 {word}',
                    'link': f'https://s.weibo.com/weibo?q={word}',
                    'pubDate': '',
                    'hot': i < 3
                })
        # 人民热搜
        gov = hotwords.get('name', '')
        if gov:
            results.insert(0, {
                'title': f'📌 {gov}',
                'link': f'https://s.weibo.com/weibo?q={gov}',
                'pubDate': '',
                'hot': True
            })
        return results
    except Exception as e:
        print(f"  [Weibo ERROR] {e}")
        return []


def fetch_zhihu_hot() -> List[Dict]:
    """抓取知乎热榜"""
    url = 'https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=10'
    content = http_get(url)
    if not content:
        return []

    try:
        data = json.loads(content)
        results = []
        for i, item in enumerate(data.get('data', [])[:10]):
            target = item.get('target', {})
            title = clean_text(target.get('title', '') or target.get('question', {}).get('title', ''))
            link = 'https://www.zhihu.com' + (target.get('url', '') or target.get('question', {}).get('url', ''))
            if title:
                results.append({
                    'title': title,
                    'link': link,
                    'pubDate': '',
                    'hot': i < 3
                })
        return results
    except Exception as e:
        print(f"  [Zhihu ERROR] {e}")
        return []


def fetch_baidu_hot() -> List[Dict]:
    """抓取百度热搜"""
    url = 'https://top.baidu.com/api?/get=topic_list&page=1&needWriteToken=0&category=topic&height_reduce=1'
    content = http_get(url)
    if not content:
        return []

    try:
        data = json.loads(content)
        results = []
        items = data.get('data', {}).get('topic_list', [])
        for i, item in enumerate(items[:20]):
            word = clean_text(item.get('query', '') or item.get('word', ''))
            if word:
                results.append({
                    'title': f'#{word}#',
                    'link': f'https://www.baidu.com/s?wd={word}',
                    'pubDate': '',
                    'hot': i < 5
                })
        return results
    except Exception as e:
        print(f"  [Baidu ERROR] {e}")
        return []


# ============================
# 主函数
# ============================
def main():
    now = datetime.datetime.now()
    date_str = now.strftime('%Y-%m-%d')
    time_str = now.strftime('%H:%M:%S')
    print(f"\n{'='*50}")
    print(f"📰 每日新闻抓取任务")
    print(f"   时间: {date_str} {time_str}")
    print(f"{'='*50}\n")

    news_data = {
        'version': '1.0',
        'updatedAt': now.strftime('%Y-%m-%dT%H:%M:%S'),
        'updatedDate': date_str,
        'updatedTime': time_str,
        'categories': []
    }

    fetchers = [
        ('🪖 军事', fetch_military),
        ('📈 经济', fetch_economy),
        ('💻 科技', fetch_tech),
        ('🏛️ 国内大事', fetch_domestic),
        ('🏠 生活百态', fetch_life),
    ]

    for name, fetcher in fetchers:
        print(f"\n>>> 正在抓取: {name}")
        try:
            cat_data = fetcher()
            total_items = sum(len(s['items']) for s in cat_data['subs'])
            print(f"    ✓ 获取 {total_items} 条")
            news_data['categories'].append(cat_data)
        except Exception as e:
            print(f"    ✗ 失败: {e}")
            # 写入空分类作为占位
            news_data['categories'].append({
                'label': name.strip('🪖📈💻🏛️🏠 '),
                'icon': '📰', 'color': '#94a3b8',
                'desc': '数据加载中...',
                'subs': [{'id': 'empty', 'icon': '⏳', 'name': '加载中', 'desc': '', 'items': []}]
            })

    # 写入 JSON 文件
    output_file = 'news-data.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(news_data, f, ensure_ascii=False, indent=2)

    total = sum(len(c['subs']) for c in news_data['categories'])
    print(f"\n{'='*50}")
    print(f"✅ 完成! 共 {total} 个子板块, 已写入 {output_file}")
    print(f"   更新时间: {news_data['updatedAt']}")
    print(f"{'='*50}\n")


if __name__ == '__main__':
    main()
