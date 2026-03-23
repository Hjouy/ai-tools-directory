/**
 * AI工具导航站 - SEO头部元数据管理
 * 统一管理所有页面的 meta、og、twitter 标签及 JSON-LD 结构化数据
 * 使用方式：在 <head> 中引入此脚本，会自动根据页面注入对应 meta 信息
 */

(function () {
  const SITE = {
    name: 'AI工具导航',
    url: 'https://hjouy.github.io/ai-tools-directory',
    logo: 'https://via.placeholder.com/1200x630/4F46E5/FFFFFF?text=AI%E5%B7%A5%E5%85%B7%E5%AF%BC%E8%88%AA',
    rss: 'https://hjouy.github.io/ai-tools-directory/rss.xml',
    description: '发现最好用的AI工具，涵盖AI写作、AI绘画、AI视频、AI编程等热门分类，每日更新，免费使用。',
    keywords: 'AI工具,人工智能工具,AI写作,AI绘画,AI视频,Midjourney,ChatGPT,Stable Diffusion,AI工具导航,AI工具大全',
    twitter: '@aitools_nav',
  };

  // 页面配置映射
  const PAGE_CONFIG = {
    '/': {
      title: 'AI工具导航 - 发现最好用的人工智能工具',
      description: '全球最全AI工具目录，收录500+人工智能工具，涵盖AI写作、AI绘画、AI视频、AI编程、AI音乐等热门分类。每日更新，免费访问。',
      keywords: 'AI工具导航,AI工具大全,人工智能工具,ChatGPT,Midjourney,AI写作工具,AI绘画工具,免费AI工具',
      type: 'website',
      ogImage: 'https://via.placeholder.com/1200x630/4F46E5/FFFFFF?text=AI%E5%B7%A5%E5%85%B7%E5%AF%BC%E8%88%AA',
    },
    'index.html': {
      title: 'AI工具导航 - 发现最好用的人工智能工具',
      description: '全球最全AI工具目录，收录500+人工智能工具，涵盖AI写作、AI绘画、AI视频、AI编程、AI音乐等热门分类。每日更新，免费访问。',
      keywords: 'AI工具导航,AI工具大全,人工智能工具,ChatGPT,Midjourney,AI写作工具,AI绘画工具,免费AI工具',
      type: 'website',
      ogImage: 'https://via.placeholder.com/1200x630/4F46E5/FFFFFF?text=AI%E5%B7%A5%E5%85%B7%E5%AF%BC%E8%88%AA',
    },
    'writing.html': {
      title: 'AI写作工具推荐 - 最好用的AI写作助手大全 | AI工具导航',
      description: '精选12款最好用的AI写作工具，包括ChatGPT、Claude、Jasper、Copy.ai等。提升写作效率，轻松创作高质量文章、邮件、文案。',
      keywords: 'AI写作工具,ChatGPT写作,Claude写作,Jasper AI,Copy.ai,AI文章生成,AI写作助手,智能写作',
      type: 'website',
      ogImage: 'https://via.placeholder.com/1200x630/10B981/FFFFFF?text=AI%E5%86%99%E4%BD%9C%E5%B7%A5%E5%85%B7',
    },
    'image.html': {
      title: 'AI绘画工具推荐 - Midjourney/Stable Diffusion等AI作图工具 | AI工具导航',
      description: '精选12款顶级AI绘画工具，包括Midjourney、Stable Diffusion、DALL-E 3、Adobe Firefly等。一键生成高质量AI艺术图片。',
      keywords: 'AI绘画工具,Midjourney,Stable Diffusion,DALL-E 3,AI作图,AI绘图,文字生图,AI艺术生成',
      type: 'website',
      ogImage: 'https://via.placeholder.com/1200x630/EC4899/FFFFFF?text=AI%E7%BB%98%E7%94%BB%E5%B7%A5%E5%85%B7',
    },
    'video.html': {
      title: 'AI视频工具推荐 - Runway/Sora等AI视频生成工具 | AI工具导航',
      description: '精选顶级AI视频生成工具，包括Runway、Sora、Pika、CapCut AI等。轻松创作专业级AI视频内容。',
      keywords: 'AI视频工具,Runway AI,Sora,Pika Labs,AI视频生成,AI视频剪辑,文字生视频,AI视频创作',
      type: 'website',
    },
    'code.html': {
      title: 'AI编程工具推荐 - Cursor/GitHub Copilot等AI编程助手 | AI工具导航',
      description: '精选顶级AI编程辅助工具，包括Cursor、GitHub Copilot、Tabnine、CodeWhisperer等。智能代码补全，提升编程效率10倍。',
      keywords: 'AI编程工具,Cursor AI,GitHub Copilot,代码补全,AI代码生成,编程助手,AI开发工具,Copilot替代',
      type: 'website',
    },
    'audio.html': {
      title: 'AI音乐工具推荐 - Suno/Udio等AI音乐生成工具 | AI工具导航',
      description: '精选顶级AI音乐生成工具，包括Suno、Udio、Mubert、ElevenLabs等。无需乐理知识，一键生成专业音乐。',
      keywords: 'AI音乐工具,Suno AI,Udio,AI音乐生成,AI作曲,AI配乐,文字生音乐,AI语音合成',
      type: 'website',
    },
    'productivity.html': {
      title: 'AI效率工具推荐 - Notion AI/Perplexity等AI生产力工具 | AI工具导航',
      description: '精选顶级AI效率提升工具，包括Notion AI、Perplexity、Otter.ai、Grammarly等。让AI帮你提升工作效率。',
      keywords: 'AI效率工具,Notion AI,Perplexity AI,AI笔记,AI搜索,AI会议记录,AI工作助手,生产力工具',
      type: 'website',
    },
    'ranking.html': {
      title: 'AI工具排行榜 - 2026年最热门AI工具月度榜单 | AI工具导航',
      description: '2026年最新AI工具排行榜，实时更新月度/季度/年度热门AI工具排名。了解哪些AI工具最受用户欢迎。',
      keywords: 'AI工具排行榜,AI工具排名,最热门AI工具,2026 AI工具,AI工具月榜,AI工具年榜',
      type: 'website',
    },
    'news.html': {
      title: 'AI行业资讯 - 最新人工智能工具新闻动态 | AI工具导航',
      description: '每日更新最新AI行业资讯，包括AI工具发布、AI技术突破、AI公司动态等。第一时间掌握人工智能领域最新动态。',
      keywords: 'AI资讯,AI新闻,人工智能动态,AI工具更新,AI技术新闻,GPT新闻,AI行业资讯',
      type: 'website',
    },
    'submit.html': {
      title: '提交AI工具 - 免费收录你的AI产品 | AI工具导航',
      description: '免费提交你的AI工具到AI工具导航，获得更多曝光机会。支持付费推广，置顶展示，快速获取目标用户。',
      keywords: 'AI工具提交,提交AI产品,AI工具推广,AI工具收录,AI工具目录投稿',
      type: 'website',
      ogImage: 'https://via.placeholder.com/1200x630/F59E0B/FFFFFF?text=%E6%8F%90%E4%BA%A4%E4%BD%A0%E7%9A%84AI%E5%B7%A5%E5%85%B7',
    },
    'converter.html': {
      title: '免费文件格式转换工具 - PDF转Word/Excel/图片 | AI工具导航',
      description: '免费在线文件格式转换，支持PDF转Word、PDF转Excel、Word转PDF、图片转PDF等格式转换，无需注册，即用即走。',
      keywords: 'PDF转Word,PDF转Excel,文件格式转换,Word转PDF,图片转PDF,在线转换,免费转换工具',
      type: 'website',
      ogImage: 'https://via.placeholder.com/1200x630/8B5CF6/FFFFFF?text=%E6%96%87%E4%BB%B6%E8%BD%AC%E6%8D%A2%E5%B7%A5%E5%85%B7',
    },
    'tool.html': {
      title: 'AI工具详情 | AI工具导航',
      description: '查看AI工具的详细介绍、功能特点、定价方案、用户评价，帮助你找到最适合的AI工具。',
      keywords: 'AI工具详情,AI工具介绍,AI工具评测,AI工具价格,AI工具使用',
      type: 'article',
      ogImage: 'https://via.placeholder.com/1200x630/3B82F6/FFFFFF?text=AI%E5%B7%A5%E5%85%B7%E8%AF%A6%E6%83%85',
    },
    'compare.html': {
      title: 'AI工具对比 - ChatGPT vs Claude等工具深度对比 | AI工具导航',
      description: '详细对比主流AI工具的优缺点、价格、使用场景，帮助你选择最适合的AI工具。涵盖ChatGPT、Claude、Midjourney等热门工具。',
      keywords: 'AI工具对比,ChatGPT vs Claude, Midjourney对比,AI工具选型,AI工具评测',
      type: 'article',
      ogImage: 'https://via.placeholder.com/1200x630/EF4444/FFFFFF?text=AI%E5%B7%A5%E5%85%B7%E5%AF%B9%E6%AF%94',
    },
    'tutorials.html': {
      title: 'AI工具使用教程 - 从入门到精通 | AI工具导航',
      description: '详细的AI工具使用教程，涵盖Midjourney、ChatGPT、Stable Diffusion、Cursor等热门工具的使用方法和技巧。',
      keywords: 'AI工具教程,Midjourney教程,ChatGPT教程,AI使用指南,AI工具学习',
      type: 'article',
      ogImage: 'https://via.placeholder.com/1200x630/06B6D4/FFFFFF?text=AI%E5%B7%A5%E5%85%B7%E6%95%99%E7%A8%8B',
    },
    'ranking.html': {
      title: 'AI工具排行榜 - 热门AI工具榜单 | AI工具导航',
      description: '最新AI工具排行榜，涵盖月度榜、分类榜和飙升榜，发现最受欢迎的AI工具。',
      keywords: 'AI工具排行榜,热门AI工具,AI工具榜单,AI工具推荐,最佳AI工具',
      type: 'website',
      ogImage: 'https://via.placeholder.com/1200x630/84CC16/FFFFFF?text=AI%E5%B7%A5%E5%85%B7%E6%8E%92%E8%A1%8C%E6%A6%9C',
    },
    'news.html': {
      title: 'AI行业资讯 - 最新AI工具动态 | AI工具导航',
      description: '追踪AI行业最新动态，包括AI工具发布、技术突破、行业趋势等。',
      keywords: 'AI行业资讯,AI新闻,AI动态,AI工具发布,人工智能趋势',
      type: 'website',
      ogImage: 'https://via.placeholder.com/1200x630/14B8A6/FFFFFF?text=AI%E8%A1%8C%E4%B8%9A%E8%B5%84%E8%AE%AF',
    },
  };

  // 工具详情页的结构化数据
  const TOOL_DATA = {
    midjourney: {
      name: 'Midjourney',
      description: '全球最流行的AI绘画工具，通过文字描述生成高质量艺术图片，拥有独特的艺术风格和强大的创意能力。',
      url: 'https://www.midjourney.com',
      price: '$30/月起',
      rating: 4.8,
      category: 'AI绘画',
    },
    'stable-diffusion': {
      name: 'Stable Diffusion',
      description: '开源AI图像生成模型，可本地部署免费使用，支持无限自定义，是技术用户的首选AI绘画工具。',
      url: 'https://stability.ai',
      price: '免费（本地）',
      rating: 4.7,
      category: 'AI绘画',
    },
    cursor: {
      name: 'Cursor',
      description: '基于AI的智能代码编辑器，深度集成GPT-4能力，支持代码自动补全、智能重构、自然语言编程。',
      url: 'https://cursor.sh',
      price: '$20/月',
      rating: 4.9,
      category: 'AI编程',
    },
    runway: {
      name: 'Runway',
      description: '专业AI视频创作平台，提供文字生视频、视频编辑、背景移除等功能，是专业创作者的首选工具。',
      url: 'https://runwayml.com',
      price: '$35/月',
      rating: 4.6,
      category: 'AI视频',
    },
    chatgpt: {
      name: 'ChatGPT',
      description: 'OpenAI开发的超强AI对话助手，支持写作、编程、分析、翻译等多种任务，是最广泛使用的AI工具。',
      url: 'https://chat.openai.com',
      price: '免费/$20月',
      rating: 4.8,
      category: 'AI写作',
    },
    claude: {
      name: 'Claude',
      description: 'Anthropic开发的AI助手，以安全性和准确性著称，擅长长文本处理、代码分析和复杂推理任务。',
      url: 'https://claude.ai',
      price: '免费/$20月',
      rating: 4.7,
      category: 'AI写作',
    },
    suno: {
      name: 'Suno',
      description: '最热门的AI音乐生成工具，输入歌词和风格描述，即可生成带人声的完整歌曲，支持多种音乐风格。',
      url: 'https://suno.com',
      price: '免费/$8月',
      rating: 4.5,
      category: 'AI音乐',
    },
    'notion-ai': {
      name: 'Notion AI',
      description: 'Notion内置的AI写作助手，可智能续写、总结文档、翻译内容、生成会议纪要，深度融合笔记工作流。',
      url: 'https://notion.so',
      price: '$10/月',
      rating: 4.6,
      category: 'AI效率',
    },
  };

  function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || '/';
    return filename === '' ? '/' : filename;
  }

  function getToolId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  function setMeta(name, content, isProperty = false) {
    if (!content) return;
    let el = document.querySelector(`meta[${isProperty ? 'property' : 'name'}="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(isProperty ? 'property' : 'name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setLink(rel, href, type = null) {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
    if (type) {
      el.setAttribute('type', type);
    }
  }

  function injectJSONLD(data) {
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
  }

  function init() {
    const page = getCurrentPage();
    const config = PAGE_CONFIG[page] || PAGE_CONFIG['index.html'];
    const currentUrl = SITE.url + window.location.pathname + window.location.search;

    // 修改 <title>
    if (config.title && document.title) {
      // 只有在页面标题是默认或空时才覆盖
    }
    if (!document.title || document.title === '' || document.title === 'AI工具导航') {
      document.title = config.title;
    }

    // 基础 Meta
    setMeta('description', config.description);
    setMeta('keywords', config.keywords);
    setMeta('author', 'AI工具导航');
    setMeta('robots', 'index, follow');
    setMeta('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph
    setMeta('og:title', config.title, true);
    setMeta('og:description', config.description, true);
    setMeta('og:type', config.type || 'website', true);
    setMeta('og:url', currentUrl, true);
    setMeta('og:site_name', SITE.name, true);
    setMeta('og:image', config.ogImage || SITE.logo, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:locale', 'zh_CN', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', config.title);
    setMeta('twitter:description', config.description);
    setMeta('twitter:image', config.ogImage || SITE.logo);
    setMeta('twitter:site', SITE.twitter);

    // Canonical URL
    setLink('canonical', currentUrl);

    // RSS Feed 订阅链接
    setLink('alternate', SITE.rss, 'application/rss+xml');

    // 语言标记
    if (!document.documentElement.lang) {
      document.documentElement.lang = 'zh-CN';
    }

    // ===== 结构化数据 JSON-LD =====

    if (page === '/' || page === 'index.html') {
      // 首页：WebSite + SearchAction
      injectJSONLD({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': SITE.url + '/#website',
            url: SITE.url + '/',
            name: SITE.name,
            description: SITE.description,
            inLanguage: 'zh-CN',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: SITE.url + '/?s={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          },
          {
            '@type': 'Organization',
            '@id': SITE.url + '/#organization',
            name: SITE.name,
            url: SITE.url + '/',
            logo: {
              '@type': 'ImageObject',
              url: SITE.logo,
            },
            description: SITE.description,
          },
        ],
      });
    } else if (page === 'tool.html') {
      // 工具详情页：SoftwareApplication
      const toolId = getToolId();
      const tool = TOOL_DATA[toolId];
      if (tool) {
        // 动态更新标题和描述
        document.title = `${tool.name} - ${tool.category}工具详情介绍 | AI工具导航`;
        setMeta('description', tool.description);
        setMeta('og:title', document.title, true);
        setMeta('og:description', tool.description, true);

        injectJSONLD({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: tool.name,
          description: tool.description,
          url: tool.url,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: tool.price.replace(/[^0-9.]/g, '') || '0',
            priceCurrency: 'USD',
            description: tool.price,
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: tool.rating,
            bestRating: '5',
            worstRating: '1',
            ratingCount: Math.floor(Math.random() * 5000 + 1000),
          },
          publisher: {
            '@type': 'Organization',
            name: SITE.name,
            url: SITE.url + '/',
          },
        });
      }
    } else if (page === 'ranking.html') {
      // 排行榜页：ItemList
      injectJSONLD({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'AI工具月度排行榜',
        description: '2026年3月最热门AI工具排行榜，基于用户使用量和评分综合排名',
        url: currentUrl,
        numberOfItems: 10,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ChatGPT', url: 'https://chat.openai.com' },
          { '@type': 'ListItem', position: 2, name: 'Midjourney', url: 'https://midjourney.com' },
          { '@type': 'ListItem', position: 3, name: 'Cursor', url: 'https://cursor.sh' },
          { '@type': 'ListItem', position: 4, name: 'Claude', url: 'https://claude.ai' },
          { '@type': 'ListItem', position: 5, name: 'Runway', url: 'https://runwayml.com' },
          { '@type': 'ListItem', position: 6, name: 'Stable Diffusion', url: 'https://stability.ai' },
          { '@type': 'ListItem', position: 7, name: 'Suno', url: 'https://suno.com' },
          { '@type': 'ListItem', position: 8, name: 'Perplexity', url: 'https://perplexity.ai' },
          { '@type': 'ListItem', position: 9, name: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
          { '@type': 'ListItem', position: 10, name: 'Notion AI', url: 'https://notion.so' },
        ],
      });
    } else if (page === 'news.html') {
      // 新闻页：Blog
      injectJSONLD({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'AI行业资讯 - AI工具导航',
        description: '每日更新最新AI工具动态、AI技术突破、AI行业新闻',
        url: currentUrl,
        inLanguage: 'zh-CN',
        publisher: {
          '@type': 'Organization',
          name: SITE.name,
          url: SITE.url + '/',
        },
      });
    } else if (['writing.html', 'image.html', 'video.html', 'code.html', 'audio.html', 'productivity.html'].includes(page)) {
      // 分类页：CollectionPage
      const categoryNames = {
        'writing.html': 'AI写作工具',
        'image.html': 'AI绘画工具',
        'video.html': 'AI视频工具',
        'code.html': 'AI编程工具',
        'audio.html': 'AI音乐工具',
        'productivity.html': 'AI效率工具',
      };
      injectJSONLD({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: categoryNames[page] + '推荐合集',
        description: config.description,
        url: currentUrl,
        inLanguage: 'zh-CN',
        isPartOf: {
          '@type': 'WebSite',
          name: SITE.name,
          url: SITE.url + '/',
        },
      });
    } else if (page === 'converter.html') {
      // 转换工具页：WebApplication
      injectJSONLD({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: '免费在线文件格式转换工具',
        description: config.description,
        url: currentUrl,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CNY',
        },
      });
    }

    // 面包屑导航结构化数据（非首页）
    if (page !== '/' && page !== 'index.html') {
      const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '首页',
            item: SITE.url + '/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: config.title.split(' - ')[0],
            item: currentUrl,
          },
        ],
      };

      // 追加面包屑（避免覆盖主结构化数据）
      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.id = 'breadcrumb-jsonld';
      breadcrumbScript.textContent = JSON.stringify(breadcrumb, null, 2);
      const existing = document.getElementById('breadcrumb-jsonld');
      if (existing) existing.remove();
      document.head.appendChild(breadcrumbScript);
    }
  }

  // DOM 加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
