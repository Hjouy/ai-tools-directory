// AI工具导航 - 统一工具数据库
// 所有工具数据集中管理，供 index.html、tool.html 等页面共享使用

const TOOLS_DATA = {
  // AI写作
  chatgpt: {
    id: 'chatgpt', name: 'ChatGPT', icon: '💬', color: '#10b981',
    category: 'AI写作', categoryId: 'writing', users: '1亿+用户', rating: 4.8, price: '免费/$20月', priceType: 'freemium',
    url: 'https://chat.openai.com',
    desc: 'OpenAI开发的超强AI对话助手，支持写作、编程、分析、翻译等多种任务，是全球使用最广泛的AI工具，GPT-4支持多模态输入输出。',
    features: [
      { icon: '✍️', title: '智能写作', desc: '生成文章、邮件、文案、故事，质量远超普通AI' },
      { icon: '💻', title: '代码助手', desc: '生成、调试、解释代码，支持50+编程语言' },
      { icon: '🔍', title: '深度分析', desc: '数据分析、研究报告、复杂问题深度剖析' },
      { icon: '🌐', title: '多语言翻译', desc: '支持100+语言的高质量翻译，保留语气语境' },
      { icon: '🎨', title: '图像理解', desc: 'GPT-4V支持上传图片进行分析和问答' },
      { icon: '🔌', title: '插件生态', desc: '500+官方插件扩展，联网搜索、代码执行等' },
    ],
    scenes: ['内容创作', '学术写作', '代码开发', '客户服务', '教育学习', '市场营销', '数据分析', '语言翻译'],
    pricing: [
      { name: 'Free', price: '免费', features: 'GPT-3.5，基础对话' },
      { name: 'Plus', price: '$20/月', features: 'GPT-4，DALL-E 3，插件' },
      { name: 'Team', price: '$30/月/人', features: 'GPT-4，团队协作，更高限额' },
      { name: 'Enterprise', price: '联系销售', features: '企业定制，SSO，数据安全' },
    ],
    reviews: [
      { name: '张明', role: '内容创作者', rating: 5, text: 'ChatGPT彻底改变了我的工作方式，以前写一篇文章需要2小时，现在30分钟就能完成高质量初稿。GPT-4的理解能力真的非常出色！' },
      { name: 'Lisa Wang', role: '全栈工程师', rating: 5, text: '用ChatGPT辅助编程已经快1年了，解决bug的效率提升了至少3倍。有些复杂的架构问题它能给出非常专业的建议。' },
      { name: '王芳', role: '英语老师', rating: 4, text: '用来辅助备课和批改作文非常方便，翻译质量也很高。偶尔会有一些小错误，需要自己核实，但总体非常实用。' },
    ],
    info: { developer: 'OpenAI', released: '2022年11月', platform: '网页/iOS/Android/API', language: '100+语言', update: '持续更新', category: 'AI对话助手' },
    related: ['claude', 'perplexity', 'notion-ai'],
    reviewCount: 28470, score5: 72, score4: 18, score3: 6, score2: 3, score1: 1,
    isHot: true, isNew: false,
  },

  claude: {
    id: 'claude', name: 'Claude', icon: '🧠', color: '#d97706',
    category: 'AI写作', categoryId: 'writing', users: '500万+用户', rating: 4.7, price: '免费/$20月', priceType: 'freemium',
    url: 'https://claude.ai',
    desc: 'Anthropic开发的AI助手，以安全性和准确性著称，支持200K上下文窗口（业界最大），擅长长文本处理、代码分析、学术研究和复杂推理任务。',
    features: [
      { icon: '📖', title: '超长上下文', desc: '200K token上下文窗口，可处理整本书的内容' },
      { icon: '🔒', title: '安全可靠', desc: '宪法AI训练，有害内容拒绝率业界最低' },
      { icon: '📊', title: '数据分析', desc: '上传CSV/Excel文件，智能分析数据并生成图表' },
      { icon: '💻', title: '代码能力', desc: '编写、调试、解释代码，支持主流编程语言' },
      { icon: '🔬', title: '学术研究', desc: '分析论文、总结研究、生成参考文献' },
      { icon: '🗣️', title: '自然对话', desc: '对话风格自然流畅，很少出现机器感' },
    ],
    scenes: ['学术写作', '长文档处理', '代码审查', '研究分析', '法律文书', '商业报告', '内容摘要', '深度对话'],
    pricing: [
      { name: 'Free', price: '免费', features: 'Claude 3 Sonnet，有限次数' },
      { name: 'Pro', price: '$20/月', features: 'Claude 3 Opus，5倍使用限额' },
      { name: 'Team', price: '$30/月/人', features: '更高限额，集中计费，Admin' },
      { name: 'API', price: '按量计费', features: '开发者API，多模型可选' },
    ],
    reviews: [
      { name: '研究员', role: '大学教授', rating: 5, text: 'Claude分析长篇学术文献的能力非常出色，可以上传整篇论文然后进行深度问答。处理中文学术内容也毫无压力，是我科研工作的重要助手。' },
      { name: 'Legal Pro', role: '律师', rating: 5, text: "Claude's ability to analyze lengthy contracts without losing context is invaluable for legal work. Its careful approach to accuracy makes it more reliable than other AI tools." },
      { name: '产品经理', role: '互联网公司', rating: 4, text: '用来写PRD和分析竞品报告非常高效。中文理解能力很强，回复也比较有条理。比较美中不足是有时候回复太长，需要指定简洁模式。' },
    ],
    info: { developer: 'Anthropic', released: '2023年3月', platform: 'Web/iOS/API', language: '多语言', update: '持续更新', category: 'AI对话助手' },
    related: ['chatgpt', 'perplexity'],
    reviewCount: 11520, score5: 67, score4: 21, score3: 8, score2: 3, score1: 1,
    isHot: false, isNew: false,
  },

  // 更多AI写作工具
  jasper: {
    id: 'jasper', name: 'Jasper', icon: '🖊️', color: '#7c3aed',
    category: 'AI写作', categoryId: 'writing', users: '100万+用户', rating: 4.5, price: '$49/月起', priceType: 'paid',
    url: 'https://jasper.ai',
    desc: '专为营销人设计的AI写作平台，支持博客文章、广告文案、社媒内容、产品描述等50+内容模板，是企业级AI内容创作的领导者。',
    features: [
      { icon: '📝', title: '50+模板', desc: '覆盖博客、广告、邮件、社媒等50+内容模板' },
      { icon: '🌐', title: '多语言', desc: '支持30+语言，包括中文内容生成' },
      { icon: '🔄', title: '品牌声音', desc: '学习并保持品牌独特的写作风格' },
      { icon: '📊', title: 'SEO优化', desc: '集成Surfer SEO，生成SEO友好的内容' },
      { icon: '🤝', title: '团队协作', desc: '多人协作，品牌资产库，审批流程' },
      { icon: '🔌', title: 'API集成', desc: '与主流CMS、营销工具深度集成' },
    ],
    scenes: ['营销文案', '博客创作', '广告设计', '社媒运营', '邮件营销', '产品描述', '品牌内容', 'SEO文章'],
    pricing: [
      { name: 'Creator', price: '$49/月', features: '1个品牌，50+模板' },
      { name: 'Pro', price: '$99/月', features: '5个品牌，无限项目，AI助手' },
      { name: 'Business', price: '$499/月', features: '无限品牌，团队协作，自定义模板' },
    ],
    reviews: [
      { name: 'Marketing Director', role: '电商品牌', rating: 5, text: "Jasper has transformed our content workflow. We produce 3x more content with consistent quality. The brand voice feature is excellent!" },
      { name: '内容运营', role: 'MCN机构', rating: 4, text: '用来做社媒运营特别方便，模板很丰富，出稿速度快。虽然价格有点贵但效率提升很明显。' },
      { name: 'SEO专家', role: '数字营销', rating: 5, text: 'Surfer SEO集成太棒了，写出来的文章直接就是SEO友好的。团队用了一年，效果非常好！' },
    ],
    info: { developer: 'Jasper AI', released: '2021年', platform: 'Web/API', language: '30+语言', update: '持续更新', category: 'AI营销写作' },
    related: ['copy-ai', 'chatgpt'],
    reviewCount: 15600, score5: 58, score4: 24, score3: 12, score2: 4, score1: 2,
    isHot: false, isNew: false,
  },

  'copy-ai': {
    id: 'copy-ai', name: 'Copy.ai', icon: '📝', color: '#0891b2',
    category: 'AI写作', categoryId: 'writing', users: '100万+用户', rating: 4.4, price: '免费/$49月', priceType: 'freemium',
    url: 'https://copy.ai',
    desc: '一键生成营销文案、广告语、产品介绍、社媒帖子，有免费版可用，支持中文内容生成，是个人创作者和小团队的理想选择。',
    features: [
      { icon: '⚡', title: '快速生成', desc: '输入关键词，秒级生成多种文案' },
      { icon: '🆓', title: '免费使用', desc: '每天100次免费生成，无需信用卡' },
      { icon: '📱', title: '90+模板', desc: '覆盖所有主流内容类型的模板库' },
      { icon: '🌏', title: '中文支持', desc: '完整的中文内容生成能力' },
      { icon: '📋', title: '批量生成', desc: '一次生成多个版本，选择最佳' },
      { icon: '✂️', title: '长文写作', desc: '支持生成博客文章、完整内容' },
    ],
    scenes: ['营销文案', '社媒内容', '产品介绍', '广告语', '邮件主题', '标题党', '品牌故事', 'SEO内容'],
    pricing: [
      { name: 'Free', price: '免费', features: '每天100次，2000词/月' },
      { name: 'Pro', price: '$49/月', features: '无限生成，无限词数' },
      { name: 'Enterprise', price: '联系销售', features: '团队协作，API访问，自定义' },
    ],
    reviews: [
      { name: '独立创业者', role: '个人开发者', rating: 5, text: 'Copy.ai帮我省了大量写营销文案的时间。免费版对个人用户来说完全够用，生成的文案质量很高！' },
      { name: 'Startup Founder', role: '创业者', rating: 4, text: "Great for quick marketing copy. The free tier is generous and the quality is surprisingly good. Perfect for bootstrapped startups." },
      { name: '运营专员', role: '电商公司', rating: 4, text: '用来生成产品描述和广告语效率很高。模板很实用，修改一下就能直接用，省了不少时间。' },
    ],
    info: { developer: 'CopyAI Inc.', released: '2021年', platform: 'Web/API', language: '中文支持', update: '持续更新', category: 'AI营销文案' },
    related: ['jasper', 'writesonic'],
    reviewCount: 12400, score5: 55, score4: 25, score3: 13, score2: 5, score1: 2,
    isHot: false, isNew: false,
  },

  writesonic: {
    id: 'writesonic', name: 'Writesonic', icon: '⚡', color: '#06b6d4',
    category: 'AI写作', categoryId: 'writing', users: '300万+用户', rating: 4.3, price: '免费/$16月', priceType: 'freemium',
    url: 'https://writesonic.com',
    desc: 'SEO优化的AI写作工具，可生成符合搜索引擎排名的博客文章、落地页内容，集成Surfer SEO，是内容营销人员的得力助手。',
    features: [
      { icon: '🔍', title: 'SEO优化', desc: '集成Surfer SEO，生成排名友好的内容' },
      { icon: '📝', title: '多种生成', desc: '文章、落地页、广告、社交媒体全覆盖' },
      { icon: '🎨', title: 'Botsonic', desc: '无需代码，创建自定义AI聊天机器人' },
      { icon: '🖼️', title: 'Photosonic', desc: 'AI图片生成，配图一键搞定' },
      { icon: '📱', title: 'AI聊天', desc: 'Chatsonic对话助手，实时信息获取' },
      { icon: '🔄', title: '改写优化', desc: '一键改写、扩展、缩短内容' },
    ],
    scenes: ['SEO文章', '博客创作', '落地页', '广告文案', '产品描述', '社媒内容', '邮件营销', '品牌文案'],
    pricing: [
      { name: 'Free', price: '免费', features: '10,000词/月，基础功能' },
      { name: 'Pro', price: '$16/月', features: '无限词，所有功能' },
      { name: 'Enterprise', price: '联系销售', features: '自定义，API，团队' },
    ],
    reviews: [
      { name: 'SEO博主', role: '独立站长', rating: 5, text: 'Writesonic帮我写SEO文章太方便了！集成Surfer SEO让我不用再手动优化，直接生成符合排名要求的文章。' },
      { name: 'Content Marketer', role: '数字营销', rating: 4, text: "The SEO integration with Surfer is excellent. Articles come out well-structured and optimized. Good value for money." },
      { name: '运营主管', role: '内容团队', rating: 4, text: '团队用来做内容批量生产效果不错。文章质量比自己写差一点，但胜在量大，改一改就能用。' },
    ],
    info: { developer: 'Writesonic Inc.', released: '2021年', platform: 'Web/iOS/API', language: '25+语言', update: '持续更新', category: 'AI SEO写作' },
    related: ['jasper', 'copy-ai'],
    reviewCount: 9800, score5: 52, score4: 26, score3: 15, score2: 5, score1: 2,
    isHot: false, isNew: false,
  },

  rytr: {
    id: 'rytr', name: 'Rytr', icon: '🖋️', color: '#8b5cf6',
    category: 'AI写作', categoryId: 'writing', users: '70万+用户', rating: 4.2, price: '免费/$9月', priceType: 'freemium',
    url: 'https://rytr.me',
    desc: '性价比极高的AI写作工具，支持40+语言和20+写作风格，适合个人博主和小团队使用，是入门级AI写作的最佳选择。',
    features: [
      { icon: '💰', title: '超高性价比', desc: '免费版功能丰富，付费版仅$9/月' },
      { icon: '🌐', title: '40+语言', desc: '支持包括中文在内的40多种语言' },
      { icon: '🎯', title: '20+风格', desc: '多种写作风格可选，专业/休闲/正式等' },
      { icon: '✍️', title: '40+用例', desc: '覆盖博客、邮件、广告、社交媒体等场景' },
      { icon: '🔄', title: '改写模式', desc: '原句改写，提升表达多样性' },
      { icon: '📊', title: ' plagiarism检查', desc: '内置查重，确保内容原创性' },
    ],
    scenes: ['博客创作', '邮件撰写', '社媒内容', '广告文案', '产品描述', '视频脚本', '问答生成', 'SEO内容'],
    pricing: [
      { name: 'Free', price: '免费', features: '5000字符/月，5种语言' },
      { name: 'Saver', price: '$9/月', features: '无限字符，无限语言' },
      { name: 'Unlimited', price: '$29/月', features: '无限+优先支持' },
    ],
    reviews: [
      { name: '个人博主', role: '内容创作者', rating: 5, text: 'Rytr的免费版太良心了！对于刚入门AI写作的我来说完全够用，界面简洁好上手，生成质量也不错。' },
      { name: 'Freelance Writer', role: '自由撰稿人', rating: 4, text: "Great value for money. The free tier is surprisingly generous. Good for quick drafts and overcoming writer's block." },
      { name: '小团队运营', role: '创业公司', rating: 4, text: '预算有限的情况下Rytr是很好的选择。功能够用，生成速度快，虽然没有Jasper那么强大但价格也便宜很多。' },
    ],
    info: { developer: 'Rytr LLC', released: '2021年', platform: 'Web/Chrome扩展', language: '40+语言', update: '持续更新', category: 'AI写作助手' },
    related: ['copy-ai', 'writesonic'],
    reviewCount: 6800, score5: 50, score4: 24, score3: 16, score2: 6, score1: 4,
    isHot: false, isNew: false,
  },

  grammarly: {
    id: 'grammarly', name: 'Grammarly', icon: '✅', color: '#15803d',
    category: 'AI写作', categoryId: 'writing', users: '3000万+用户', rating: 4.5, price: '免费/$12月', priceType: 'freemium',
    url: 'https://www.grammarly.com',
    desc: 'AI英文写作助手，实时检查语法、拼写、风格，还能提供写作建议和改进方案，英文写作必备工具，被全球数千万用户信赖。',
    features: [
      { icon: '✏️', title: '语法检查', desc: '实时检查英文语法错误，准确率极高' },
      { icon: '🔍', title: '拼写检查', desc: '自动纠正拼写错误，支持美式/英式英语' },
      { icon: '💡', title: '写作建议', desc: '提供清晰度、简洁性、语气等优化建议' },
      { icon: '🎯', title: '语气检测', desc: '检测文本语气，确保符合场景需求' },
      { icon: '🔄', title: '改写建议', desc: '一键改写句子，提升表达效果' },
      { icon: '🌐', title: '多平台支持', desc: '浏览器扩展/Word/邮件/社交媒体' },
    ],
    scenes: ['英文邮件', '学术论文', '商务写作', '社交媒体', '求职简历', '博客文章', '留学申请', '日常工作'],
    pricing: [
      { name: 'Free', price: '免费', features: '基础语法、拼写检查' },
      { name: 'Premium', price: '$12/月', features: '高级检查、语气检测、清晰度' },
      { name: 'Business', price: '$15/月/人', features: '团队管理、品牌语调' },
    ],
    reviews: [
      { name: '留学生', role: '海外留学生', rating: 5, text: 'Grammarly是我写英文论文的必备工具！语法检查非常准确，还能帮我改写让句子更地道。免费版就很够用了。' },
      { name: 'Marketing Manager', role: '外企员工', rating: 5, text: "I write in English daily and Grammarly is indispensable. Catches mistakes I miss and suggests improvements that make my writing more professional." },
      { name: '求职者', role: '应届毕业生', rating: 4, text: '用它来写英文简历和cover letter太方便了！检查出来的建议都很专业，面试官都说我的英文写作很好。' },
    ],
    info: { developer: 'Grammarly Inc.', released: '2009年', platform: 'Web/浏览器/Office', language: '英语为主', update: '持续更新', category: 'AI英文写作辅助' },
    related: ['chatgpt', 'claude'],
    reviewCount: 45600, score5: 62, score4: 24, score3: 10, score2: 3, score1: 1,
    isHot: false, isNew: false,
  },

  kimi: {
    id: 'kimi', name: 'Kimi', icon: '🌙', color: '#06b6d4',
    category: 'AI写作', categoryId: 'writing', users: '1000万+用户', rating: 4.5, price: '免费', priceType: 'free',
    url: 'https://kimi.moonshot.cn',
    desc: '月之暗面出品的国产AI助手，200万字超长上下文，中文理解能力优秀，可上传PDF直接提问，是国产AI中的佼佼者。',
    features: [
      { icon: '📖', title: '超长上下文', desc: '200万字上下文，可处理整本书籍' },
      { icon: '📄', title: '文件解析', desc: '支持PDF、Word、Excel等文件上传' },
      { icon: '🌐', title: '联网搜索', desc: '实时获取最新信息，结合搜索' },
      { icon: '💬', title: '多轮对话', desc: '支持超长对话上下文记忆' },
      { icon: '✍️', title: '写作辅助', desc: '文章创作、文案撰写、润色改写' },
      { icon: '🔗', title: 'Kimi+', desc: '官方智能体扩展，解决各类专业问题' },
    ],
    scenes: ['长文档分析', '论文阅读', '合同审核', '代码审查', '内容创作', '学习辅导', '市场调研', '报告撰写'],
    pricing: [
      { name: '免费版', price: '免费', features: '完整功能，国内直连' },
      { name: 'Kimi+', price: '免费', features: '官方智能体扩展' },
    ],
    reviews: [
      { name: '研究人员', role: '博士研究生', rating: 5, text: 'Kimi分析论文太牛了！直接上传整篇PDF然后问问题，比自己逐字读快10倍。200万字的上下文简直是神器。' },
      { name: '法务人员', role: '律师', rating: 5, text: '用来审合同特别方便，上传后直接问关键条款的问题。分析全面，速度又快，帮我省了大量时间。' },
      { name: '产品经理', role: '互联网公司', rating: 4, text: '写PRD和分析竞品报告很好用。国内访问速度快，中文理解准确，用起来比ChatGPT方便。' },
    ],
    info: { developer: '月之暗面 (Moonshot AI)', released: '2023年10月', platform: 'Web/iOS/Android', language: '中文为主', update: '持续更新', category: '国产AI助手' },
    related: ['chatgpt', 'claude'],
    reviewCount: 23400, score5: 65, score4: 22, score3: 9, score2: 3, score1: 1,
    isHot: true, isNew: true,
  },

  'tongyi-qianwen': {
    id: 'tongyi-qianwen', name: '通义千问', icon: '🌟', color: '#f5a623',
    category: 'AI写作', categoryId: 'writing', users: '2000万+用户', rating: 4.4, price: '免费', priceType: 'free',
    url: 'https://tongyi.aliyun.com',
    desc: '阿里云出品，中文写作体验优秀，支持文档分析、代码生成、图像理解，国内访问速度极快，是阿里生态的首选AI助手。',
    features: [
      { icon: '📝', title: '创意写作', desc: '文章创作、故事编写、脚本生成' },
      { icon: '💻', title: '代码助手', desc: '代码生成、调试、优化建议' },
      { icon: '🖼️', title: '图片理解', desc: '上传图片，AI分析图中内容' },
      { icon: '📄', title: '文档处理', desc: '长文总结、要点提取、问答' },
      { icon: '🎨', title: '通义万相', desc: 'AI绘画，文字生成图片' },
      { icon: '🔧', title: '效率工具', desc: 'PPT生成、SWOT分析等智能体' },
    ],
    scenes: ['创意写作', '办公文档', '代码开发', '营销策划', '学习辅导', '数据分析', '图像创作', '日常问答'],
    pricing: [
      { name: '免费版', price: '免费', features: '基础功能，国内直连' },
      { name: 'Pro', price: '免费', features: '更强模型，更多额度' },
    ],
    reviews: [
      { name: '运营人员', role: '电商公司', rating: 5, text: '通义千问写营销文案很厉害！用通义万相配图，整个内容生产一站式搞定，阿里系公司用起来很方便。' },
      { name: '开发者', role: '程序员', rating: 4, text: '代码生成能力还不错，用来做辅助编程挺好用。阿里云生态集成很方便，速度也快。' },
      { name: '学生党', role: '大学生', rating: 5, text: '用来写作业和做PPT太方便了！通义听悟还能帮我整理课堂笔记，真的提升了不少学习效率。' },
    ],
    info: { developer: '阿里云', released: '2023年4月', platform: 'Web/iOS/Android/API', language: '中文为主', update: '持续更新', category: '国产AI助手' },
    related: ['chatgpt', 'kimi'],
    reviewCount: 31200, score5: 60, score4: 24, score3: 11, score2: 4, score1: 1,
    isHot: false, isNew: false,
  },

  'wenxin-yiyan': {
    id: 'wenxin-yiyan', name: '文心一言', icon: '🔵', color: '#3b82f6',
    category: 'AI写作', categoryId: 'writing', users: '1亿+用户', rating: 4.3, price: '免费', priceType: 'free',
    url: 'https://yiyan.baidu.com',
    desc: '百度出品的AI助手，中文语境理解深刻，集成百度搜索引擎，可获取实时信息，适合日常写作和内容创作。',
    features: [
      { icon: '🔍', title: '实时搜索', desc: '集成百度搜索，实时获取网络信息' },
      { icon: '✍️', title: '文学创作', desc: '诗歌、故事、小说、文案创作' },
      { icon: '📊', title: '数据分析', desc: '数据解读、图表生成、分析报告' },
      { icon: '🎨', title: '文心一格', desc: 'AI绘画，文字生成精美图片' },
      { icon: '💡', title: '灵感激发', desc: '头脑风暴、创意建议、策划方案' },
      { icon: '🔄', title: '内容优化', desc: '润色、改写、扩写、缩写' },
    ],
    scenes: ['日常对话', '内容创作', '文案撰写', '信息查询', '学习辅导', '工作汇报', '创意策划', '数据分析'],
    pricing: [
      { name: '免费版', price: '免费', features: '基础功能，文心一言3.5' },
      { name: '会员', price: '¥49.9/月', features: '文心一言4.0，更强能力' },
    ],
    reviews: [
      { name: '自媒体人', role: '内容创作者', rating: 4, text: '文心一言写中文内容很接地气！用百度搜索获取实时信息，生成的内容时效性很强。配合文心一格使用很方便。' },
      { name: '办公室文员', role: '国企员工', rating: 4, text: '用来写工作汇报和公文很方便，中文语境理解准确，格式也比较规范。免费版就够日常使用了。' },
      { name: '营销人员', role: '广告公司', rating: 4, text: '创意策划和头脑风暴很好用，能给不少灵感。生成的内容修改一下就能用，效率提升不少。' },
    ],
    info: { developer: '百度', released: '2023年3月', platform: 'Web/iOS/Android', language: '中文为主', update: '持续更新', category: '国产AI助手' },
    related: ['chatgpt', 'tongyi-qianwen'],
    reviewCount: 56700, score5: 55, score4: 25, score3: 14, score2: 4, score1: 2,
    isHot: false, isNew: false,
  },

  perplexity: {
    id: 'perplexity', name: 'Perplexity', icon: '🔎', color: '#0f766e',
    category: 'AI搜索', categoryId: 'search', users: '1000万+用户', rating: 4.7, price: '免费/$20月', priceType: 'freemium',
    url: 'https://www.perplexity.ai',
    desc: '融合AI和搜索引擎的新一代搜索工具，实时检索网络信息并提供精准答案，支持文献检索、数据分析，是学术研究和知识工作者的首选。',
    features: [
      { icon: '🔍', title: '实时检索', desc: '实时搜索最新信息，不依赖训练数据' },
      { icon: '📚', title: '学术搜索', desc: '可检索学术论文、技术文档，自动引用来源' },
      { icon: '📊', title: '数据分析', desc: '上传文件，AI自动分析并生成报告' },
      { icon: '🌐', title: '多模态输入', desc: '支持文字、图片、文件等多种查询方式' },
      { icon: '🔗', title: '来源引用', desc: '每个答案都标注信息来源，可验证可追溯' },
      { icon: '🤖', title: '对话式搜索', desc: '多轮对话深入探索主题，逐步细化需求' },
    ],
    scenes: ['学术研究', '文献调研', '市场分析', '技术学习', '新闻追踪', '数据查询', '竞品分析', '知识整理'],
    pricing: [
      { name: 'Free', price: '免费', features: '基础搜索，Pro AI模型有限使用' },
      { name: 'Pro', price: '$20/月', features: 'GPT-4/Claude，无限Pro查询，文件上传' },
      { name: 'Team', price: '$40/月/人', features: '团队协作，高级功能，API访问' },
      { name: 'Enterprise', price: '联系销售', features: '企业级安全，定制化部署' },
    ],
    reviews: [
      { name: '博士生小李', role: '医学研究员', rating: 5, text: '论文检索神器！能直接回答复杂的医学问题，还附上文献来源。比传统搜索引擎效率高太多了，每天至少节省3小时查资料时间。' },
      { name: 'Market Analyst', role: '投资经理', rating: 5, text: "Perplexity has revolutionized how I research companies and markets. The ability to ask follow-up questions and get cited answers is invaluable for due diligence." },
      { name: '技术博客作者', role: '自媒体创作者', rating: 4, text: '写技术文章时用来查资料特别好，它能整合多个来源的信息给出综合答案。唯一缺点是有时候搜索结果质量参差不齐，需要筛选。' },
    ],
    info: { developer: 'Perplexity AI', released: '2022年12月', platform: 'Web/iOS/Android', language: '多语言', update: '持续更新', category: 'AI搜索引擎' },
    related: ['chatgpt', 'claude'],
    reviewCount: 28750, score5: 66, score4: 20, score3: 9, score2: 3, score1: 2,
    isHot: false, isNew: false,
  },

  // AI绘画
  midjourney: {
    id: 'midjourney', name: 'Midjourney', icon: '🎨', color: '#6366f1',
    category: 'AI绘画', categoryId: 'image', users: '1500万+用户', rating: 4.8, price: '$30/月起', priceType: 'paid',
    url: 'https://www.midjourney.com',
    desc: '全球最流行的AI绘画工具，通过文字描述生成高质量艺术图片，拥有独特的艺术风格和强大的创意能力，广泛用于商业设计、游戏原画、概念设计等领域。',
    features: [
      { icon: '✏️', title: '文字生图', desc: '输入描述词，几秒生成高质量AI艺术图像' },
      { icon: '🖼️', title: '多种风格', desc: '写实、卡通、水彩、油画、赛博朋克等无限风格' },
      { icon: '🔍', title: '超高分辨率', desc: '支持生成最高4K分辨率，细节清晰锐利' },
      { icon: '🎭', title: '角色一致性', desc: 'V6支持角色参考，保持人物外观一致' },
      { icon: '🖌️', title: '图像编辑', desc: '局部重绘、放大细节、扩展画面边界' },
      { icon: '🤝', title: 'Discord社区', desc: '百万用户社区，海量灵感来源和提示词技巧' },
    ],
    scenes: ['商业插画', '游戏原画', '概念设计', '产品展示', '社交媒体', '书籍封面', '壁纸创作', '角色设计'],
    pricing: [
      { name: 'Basic', price: '$10/月', features: '约200图/月，Web访问' },
      { name: 'Standard', price: '$30/月', features: '无限慢速图，15小时快速图' },
      { name: 'Pro', price: '$60/月', features: '无限慢速+30小时快速，隐私模式' },
      { name: 'Mega', price: '$120/月', features: '60小时快速图，最高优先级' },
    ],
    reviews: [
      { name: '陈设计', role: 'UI设计师', rating: 5, text: 'V6版本真的太惊艳了！生成的图片质量极高，很多时候直接可以商用，大大缩短了设计周期。提示词越用越有技巧，值得深入学习！' },
      { name: 'Anya K', role: '游戏原画师', rating: 5, text: 'As a concept artist, Midjourney has become an essential brainstorming tool. The consistency features in V6 are a game changer for character design workflows.' },
      { name: '李文博', role: '自媒体运营', rating: 4, text: '用来做公众号封面图和配图非常好用，质量甩其他图库好几条街。唯一缺点是订阅费有点贵，希望出更低价的基础版。' },
    ],
    info: { developer: 'Midjourney Inc.', released: '2022年7月', platform: 'Discord/Web', language: '多语言', update: '持续更新', category: 'AI图像生成' },
    related: ['stable-diffusion', 'runway'],
    reviewCount: 15320, score5: 70, score4: 20, score3: 7, score2: 2, score1: 1,
    isHot: true, isNew: false,
  },

  'stable-diffusion': {
    id: 'stable-diffusion', name: 'Stable Diffusion', icon: '🖼️', color: '#dc2626',
    category: 'AI绘画', categoryId: 'image', users: '800万+用户', rating: 4.7, price: '本地免费', priceType: 'free',
    url: 'https://stability.ai',
    desc: '由Stability AI开发的开源AI图像生成模型，可在本地免费部署运行，支持无限自定义，拥有庞大的模型社区，是技术用户和创作者的首选AI绘画工具。',
    features: [
      { icon: '🆓', title: '完全开源免费', desc: '代码和模型完全开源，本地部署0成本' },
      { icon: '🎨', title: '无限生成', desc: '本地运行无次数限制，不用担心配额' },
      { icon: '🔧', title: '高度可定制', desc: '支持LoRA、ControlNet等扩展，精细控制生成' },
      { icon: '🌐', title: '海量模型', desc: 'Civitai等社区提供数万个精调模型免费下载' },
      { icon: '🎭', title: 'ControlNet控制', desc: '骨骼/线稿/深度图精准控制生成结果' },
      { icon: '📦', title: 'WebUI界面', desc: 'AUTOMATIC1111提供友好的本地Web界面' },
    ],
    scenes: ['角色设计', '场景创作', '风格迁移', '图像修复', '批量生成', '艺术创作', '商业插图', '个人项目'],
    pricing: [
      { name: '本地部署', price: '免费', features: '需要GPU，VRAM 4GB+' },
      { name: 'DreamStudio', price: '按点数计费', features: 'Stability AI官方云端API' },
      { name: 'ClipDrop API', price: '$7/月起', features: '商业API，无需本地GPU' },
    ],
    reviews: [
      { name: '技术宅小明', role: 'AI研究员', rating: 5, text: '开源生态真的太强大了！通过ControlNet+LoRA可以实现非常精准的生图控制，比商业服务灵活得多。对于有技术背景的用户来说是最佳选择。' },
      { name: 'Pixel Artist', role: '数字艺术家', rating: 5, text: 'The flexibility of Stable Diffusion is unmatched. With the right models and controlnets, you can achieve results that are impossible with closed-source tools.' },
      { name: '小白用户', role: '设计爱好者', rating: 4, text: '效果很好，免费也是大优势。但是配置环境确实有点麻烦，对于不懂技术的人有一定门槛。建议先从WebUI版本入手。' },
    ],
    info: { developer: 'Stability AI', released: '2022年8月', platform: 'Windows/Mac/Linux/云端', language: '多语言', update: '持续更新', category: 'AI图像生成' },
    related: ['midjourney', 'runway'],
    reviewCount: 12450, score5: 65, score4: 22, score3: 8, score2: 3, score1: 2,
    isHot: false, isNew: false,
  },

  // AI编程
  cursor: {
    id: 'cursor', name: 'Cursor', icon: '⚡', color: '#818cf8',
    category: 'AI编程', categoryId: 'code', users: '100万+用户', rating: 4.9, price: '免费/$20月', priceType: 'freemium',
    url: 'https://cursor.sh',
    desc: '基于VS Code的AI代码编辑器，深度集成GPT-4能力，支持代码自动补全、智能重构、自然语言生成代码，是目前开发者增长最快的AI编程工具，2024年ARR突破1亿美元。',
    features: [
      { icon: '🤖', title: 'AI代码补全', desc: '基于上下文的智能多行代码补全，准确率极高' },
      { icon: '💬', title: '对话编程', desc: 'Ctrl+K直接用自然语言描述需求，自动生成代码' },
      { icon: '🔧', title: '一键重构', desc: '选中代码，AI自动优化结构、提升性能' },
      { icon: '🐛', title: '智能Debug', desc: '自动识别错误原因，给出修复方案' },
      { icon: '📚', title: '代码库理解', desc: 'Codebase功能理解整个项目，回答架构问题' },
      { icon: '🔌', title: 'VS Code兼容', desc: '无缝迁移VS Code配置、插件和快捷键' },
    ],
    scenes: ['Web开发', '后端开发', '移动开发', '数据科学', '代码重构', '学习编程', '代码审查', '快速原型'],
    pricing: [
      { name: 'Free', price: '免费', features: '2000次基础补全/月，50次高级模型请求' },
      { name: 'Pro', price: '$20/月', features: '无限补全，500次高级请求，GPT-4o' },
      { name: 'Business', price: '$40/月/人', features: '团队功能，集中管理，隐私模式' },
    ],
    reviews: [
      { name: '王开发', role: '前端工程师', rating: 5, text: '用了Cursor之后，真的再也回不去普通编辑器了。Tab补全简直神了，经常连我下一步想干什么都能猜到。每天节省至少2小时！' },
      { name: 'David Chen', role: 'Full Stack Dev', rating: 5, text: "Cursor's codebase understanding is unreal. It can answer questions about my entire 100k+ line codebase in seconds. Absolute game changer for solo developers." },
      { name: '赵小鱼', role: '独立开发者', rating: 5, text: '刚开始学编程就遇到了Cursor，真的降低了太多门槛。遇到不懂的直接问，它不仅给答案还解释原因，比Stack Overflow方便多了！' },
    ],
    info: { developer: 'Anysphere Inc.', released: '2023年3月', platform: 'Windows/Mac/Linux', language: '50+编程语言', update: '双周更新', category: 'AI代码编辑器' },
    related: ['github-copilot', 'chatgpt'],
    reviewCount: 8920, score5: 78, score4: 16, score3: 4, score2: 1, score1: 1,
    isHot: true, isNew: true,
  },

  'github-copilot': {
    id: 'github-copilot', name: 'GitHub Copilot', icon: '🐙', color: '#1f2937',
    category: 'AI编程', categoryId: 'code', users: '100万+用户', rating: 4.7, price: '$10/月', priceType: 'paid',
    url: 'https://github.com/features/copilot',
    desc: 'GitHub与OpenAI联合开发的AI编程助手，实时在编辑器中提供智能代码补全建议，支持多种编程语言，是程序员最喜爱的AI工具之一。',
    features: [
      { icon: '⚡', title: '实时补全', desc: '边写边补全，自动理解上下文，精准预测代码' },
      { icon: '🎯', title: '函数级建议', desc: '直接生成完整函数、类、模块级代码' },
      { icon: '🔧', title: '多语言支持', desc: '支持Python、JavaScript、Java等20+主流语言' },
      { icon: '💬', title: '对话式编程', desc: 'Copilot Chat可用自然语言解释和生成代码' },
      { icon: '📝', title: '注释生成', desc: '选中代码，AI自动生成详细注释和文档' },
      { icon: '🌐', title: '跨IDE支持', desc: 'VS Code、JetBrains、Neovim等主流编辑器' },
    ],
    scenes: ['日常开发', '代码重构', '学习编程', 'API调用', '单元测试', '快速原型', '代码审查', '文档编写'],
    pricing: [
      { name: 'Free', price: '免费', features: '学生、开源维护者免费使用' },
      { name: 'Pro', price: '$10/月', features: '个人开发者，完整功能' },
      { name: 'Business', price: '$19/月/人', features: '企业版，额外安全功能' },
      { name: 'Enterprise', price: '$39/月/人', features: '高级合规，企业级支持' },
    ],
    reviews: [
      { name: '后端工程师', role: '阿里P7', rating: 5, text: '用了快两年了，现在真的离不开Copilot。它不仅能快速生成常见模式代码，有时候还能给我一些意想不到的优化思路。效率提升至少50%。' },
      { name: 'Python Dev', role: '数据科学家', rating: 4, text: "Copilot is great for boilerplate code and standard libraries. Sometimes it suggests inefficient code though, so you still need to review carefully. Overall very helpful!" },
      { name: '前端小王', role: 'React开发者', rating: 5, text: '写组件的时候特别有用，它非常熟悉React的写法，很多复杂的逻辑几秒钟就写好了。配合Copilot Chat简直无敌！' },
    ],
    info: { developer: 'GitHub & OpenAI', released: '2021年6月', platform: 'VS Code/JetBrains/Neovim等', language: '20+编程语言', update: '持续更新', category: 'AI编程助手' },
    related: ['cursor', 'codeium'],
    reviewCount: 42300, score5: 64, score4: 22, score3: 9, score2: 3, score1: 2,
    isHot: false, isNew: false,
  },

  // AI视频
  runway: {
    id: 'runway', name: 'Runway', icon: '🎬', color: '#0891b2',
    category: 'AI视频', categoryId: 'video', users: '300万+用户', rating: 4.6, price: '$35/月', priceType: 'paid',
    url: 'https://runwayml.com',
    desc: '专业AI创意工具平台，提供文字/图片生成视频、视频编辑、背景移除等30+AI功能，被好莱坞电影工作室、广告公司和内容创作者广泛使用。',
    features: [
      { icon: '🎥', title: 'Gen-3视频生成', desc: '最新一代AI视频模型，文字/图片生成高质量视频' },
      { icon: '✂️', title: 'AI视频剪辑', desc: '智能剪辑、场景切换、自动配音，一键专业化' },
      { icon: '🎭', title: '背景移除', desc: '无需绿幕，AI自动识别并移除视频背景' },
      { icon: '🔊', title: '声音设计', desc: 'AI生成音效、配乐，与视频内容智能匹配' },
      { icon: '🎨', title: '风格迁移', desc: '将普通视频转换为动画、油画等艺术风格' },
      { icon: '☁️', title: '云端处理', desc: '无需本地GPU，全程云端处理，随时随地创作' },
    ],
    scenes: ['短视频创作', '广告制作', '影视特效', '社交媒体', '教育内容', '产品展示', '音乐MV', '概念演示'],
    pricing: [
      { name: 'Basic', price: '免费', features: '125积分，720p，水印' },
      { name: 'Standard', price: '$15/月', features: '625积分/月，无水印，1080p' },
      { name: 'Pro', price: '$35/月', features: '2250积分/月，4K，优先队列' },
      { name: 'Unlimited', price: '$95/月', features: '无限次标准代，无限存储' },
    ],
    reviews: [
      { name: '影视工作者', role: '独立导演', rating: 5, text: 'Gen-3的视频生成质量让我震惊，配合真实素材后期几乎看不出差异。制作成本大幅降低，小团队也能做出大片质感的内容！' },
      { name: 'Creative Studio', role: '广告创意总监', rating: 4, text: "Runway has become essential in our production pipeline. The background removal alone saves us hours of rotoscoping work. Gen-3 is impressive but still has consistency issues." },
      { name: '小红书博主', role: '内容创作者', rating: 5, text: '用Runway做短视频特效真的太好了！以前做不到的效果现在几分钟就能搞定，粉丝增长明显加快。虽然有点贵但值得！' },
    ],
    info: { developer: 'Runway AI Inc.', released: '2019年', platform: 'Web/iOS', language: '多语言', update: '持续更新', category: 'AI视频创作' },
    related: ['suno', 'midjourney'],
    reviewCount: 6830, score5: 60, score4: 25, score3: 10, score2: 3, score1: 2,
    isHot: false, isNew: false,
  },

  // AI音乐
  suno: {
    id: 'suno', name: 'Suno', icon: '🎵', color: '#7c3aed',
    category: 'AI音乐', categoryId: 'audio', users: '500万+用户', rating: 4.5, price: '免费/$8月', priceType: 'freemium',
    url: 'https://suno.com',
    desc: '最热门的AI音乐生成工具，输入歌词和风格描述，即可在60秒内生成带人声、伴奏的完整歌曲，支持流行、说唱、摇滚、古典等几乎所有音乐风格。',
    features: [
      { icon: '🎼', title: '完整歌曲生成', desc: '60秒内生成带人声和伴奏的完整歌曲' },
      { icon: '🎸', title: '多种音乐风格', desc: '流行/摇滚/说唱/电子/古典/民谣等50+风格' },
      { icon: '🔊', title: '高质量人声', desc: 'AI演唱，音色自然，支持多种人声风格' },
      { icon: '✏️', title: '歌词编辑', desc: '可自定义歌词，也可让AI自动创作歌词' },
      { icon: '🎚️', title: '音频质量', desc: '输出高质量MP3，可直接用于发布' },
      { icon: '🔄', title: '无限延伸', desc: '对喜欢的片段进行续写，构建完整音乐作品' },
    ],
    scenes: ['个人创作', '背景音乐', '短视频配乐', '游戏BGM', '广告配乐', '个人专辑', '音乐教育', '娱乐玩耍'],
    pricing: [
      { name: 'Free', price: '免费', features: '每天50积分，约10首歌' },
      { name: 'Pro', price: '$8/月', features: '每月2500积分，约500首' },
      { name: 'Premier', price: '$24/月', features: '每月10000积分，商用授权' },
    ],
    reviews: [
      { name: '音乐爱好者', role: '业余创作人', rating: 5, text: '终于实现了从小的音乐梦！虽然不会乐器和编曲，但用Suno能创作出真正好听的歌。朋友们都以为我请了专业团队，哈哈！' },
      { name: 'Video Creator', role: 'YouTuber', rating: 5, text: "Suno has solved my biggest headache - finding copyright-free background music. I generate custom tracks that perfectly fit my content in minutes. Absolutely worth it!" },
      { name: '博主小燕', role: '短视频创作者', rating: 4, text: '配乐质量很不错，特别是风格描述越具体效果越好。免费版每天10首对个人够用了。唯一希望能更精准控制节奏和情绪。' },
    ],
    info: { developer: 'Suno Inc.', released: '2023年12月', platform: 'Web/iOS/Android', language: '多语言', update: '持续更新', category: 'AI音乐生成' },
    related: ['runway', 'chatgpt'],
    reviewCount: 9240, score5: 58, score4: 26, score3: 11, score2: 3, score1: 2,
    isHot: false, isNew: true,
  },

  // AI搜索
  perplexity: {
    id: 'perplexity', name: 'Perplexity', icon: '🔎', color: '#0f766e',
    category: 'AI搜索', categoryId: 'search', users: '1000万+用户', rating: 4.7, price: '免费/$20月', priceType: 'freemium',
    url: 'https://www.perplexity.ai',
    desc: '融合AI和搜索引擎的新一代搜索工具，实时检索网络信息并提供精准答案，支持文献检索、数据分析，是学术研究和知识工作者的首选。',
    features: [
      { icon: '🔍', title: '实时检索', desc: '实时搜索最新信息，不依赖训练数据' },
      { icon: '📚', title: '学术搜索', desc: '可检索学术论文、技术文档，自动引用来源' },
      { icon: '📊', title: '数据分析', desc: '上传文件，AI自动分析并生成报告' },
      { icon: '🌐', title: '多模态输入', desc: '支持文字、图片、文件等多种查询方式' },
      { icon: '🔗', title: '来源引用', desc: '每个答案都标注信息来源，可验证可追溯' },
      { icon: '🤖', title: '对话式搜索', desc: '多轮对话深入探索主题，逐步细化需求' },
    ],
    scenes: ['学术研究', '文献调研', '市场分析', '技术学习', '新闻追踪', '数据查询', '竞品分析', '知识整理'],
    pricing: [
      { name: 'Free', price: '免费', features: '基础搜索，Pro AI模型有限使用' },
      { name: 'Pro', price: '$20/月', features: 'GPT-4/Claude，无限Pro查询，文件上传' },
      { name: 'Team', price: '$40/月/人', features: '团队协作，高级功能，API访问' },
      { name: 'Enterprise', price: '联系销售', features: '企业级安全，定制化部署' },
    ],
    reviews: [
      { name: '博士生小李', role: '医学研究员', rating: 5, text: '论文检索神器！能直接回答复杂的医学问题，还附上文献来源。比传统搜索引擎效率高太多了，每天至少节省3小时查资料时间。' },
      { name: 'Market Analyst', role: '投资经理', rating: 5, text: "Perplexity has revolutionized how I research companies and markets. The ability to ask follow-up questions and get cited answers is invaluable for due diligence." },
      { name: '技术博客作者', role: '自媒体创作者', rating: 4, text: '写技术文章时用来查资料特别好，它能整合多个来源的信息给出综合答案。唯一缺点是有时候搜索结果质量参差不齐，需要筛选。' },
    ],
    info: { developer: 'Perplexity AI', released: '2022年12月', platform: 'Web/iOS/Android', language: '多语言', update: '持续更新', category: 'AI搜索引擎' },
    related: ['chatgpt', 'claude'],
    reviewCount: 28750, score5: 66, score4: 20, score3: 9, score2: 3, score1: 2,
    isHot: false, isNew: false,
  },

  // AI效率
  'notion-ai': {
    id: 'notion-ai', name: 'Notion AI', icon: '📝', color: '#374151',
    category: 'AI效率', categoryId: 'productivity', users: '2000万+用户', rating: 4.6, price: '$10/月', priceType: 'paid',
    url: 'https://notion.so',
    desc: 'Notion内置的AI写作和工作助手，无缝集成在笔记和文档工作流中，支持智能续写、内容总结、翻译、生成会议纪要、脑暴创意等功能。',
    features: [
      { icon: '✍️', title: '智能续写', desc: '光标位置直接调用AI，续写任何文档内容' },
      { icon: '📋', title: '一键总结', desc: '自动总结长文档、会议记录、研究资料' },
      { icon: '🌐', title: '多语言翻译', desc: '文档内翻译，保留格式，支持多种语言' },
      { icon: '💡', title: '头脑风暴', desc: '快速生成创意列表、内容提纲、解决方案' },
      { icon: '🗃️', title: '数据库AI', desc: 'Notion数据库可用AI自动填充字段内容' },
      { icon: '🤝', title: '团队协作', desc: '多人同时使用AI功能，团队效率整体提升' },
    ],
    scenes: ['团队文档', '项目管理', '会议记录', '内容创作', '知识库建设', '任务管理', '研究笔记', 'OKR制定'],
    pricing: [
      { name: 'Free', price: '免费', features: 'Notion基础功能，有限AI次数' },
      { name: 'Plus', price: '$8/月', features: 'Notion完整功能，AI 20次/月' },
      { name: 'AI Add-on', price: '$10/月/人', features: 'Notion AI无限次使用' },
      { name: 'Business', price: '$15/月/人', features: '企业版，SSO，高级权限' },
    ],
    reviews: [
      { name: '产品设计师', role: '创业公司CTO', rating: 5, text: '团队用Notion管理所有文档，现在配合AI功能，整个团队的文档质量和效率提升了很多。会议总结和PRD生成特别好用！' },
      { name: 'Student', role: '研究生', rating: 4, text: "Notion AI is perfect for taking lecture notes and generating study guides. The summarization feature has saved me countless hours of reviewing long papers." },
      { name: '内容运营', role: '新媒体公司', rating: 5, text: '用Notion AI管理内容日历，AI帮我生成选题、拟标题、写初稿，整个内容生产流水线的效率提升了三四倍，真的很值！' },
    ],
    info: { developer: 'Notion Labs', released: '2023年2月（AI功能）', platform: 'Web/Windows/Mac/iOS/Android', language: '多语言', update: '持续更新', category: 'AI效率工具' },
    related: ['chatgpt', 'claude'],
    reviewCount: 34620, score5: 62, score4: 24, score3: 9, score2: 3, score1: 2,
    isHot: false, isNew: false,
  },

  // AI音频
  elevenlabs: {
    id: 'elevenlabs', name: 'ElevenLabs', icon: '🎙️', color: '#dc2626',
    category: 'AI音频', categoryId: 'audio', users: '200万+用户', rating: 4.6, price: '$5/月', priceType: 'freemium',
    url: 'https://elevenlabs.io',
    desc: '业界领先的AI语音合成工具，支持文字转语音、语音克隆、多语言配音，声音自然逼真，被YouTuber、播客、游戏开发者和广告行业广泛使用。',
    features: [
      { icon: '🎵', title: '自然语音', desc: '语音质量接近真人，情感表达丰富' },
      { icon: '🎤', title: '语音克隆', desc: '上传30秒音频，克隆任意声音' },
      { icon: '🌐', title: '29种语言', desc: '支持中英日韩等29种语言的自然合成' },
      { icon: '🎭', title: '情感控制', desc: '调整语速、语调、情感，表达更丰富' },
      { icon: '🎙️', title: '500+音色', desc: '丰富的预设音色库，男声女声童声俱全' },
      { icon: '📱', title: 'API集成', desc: '开发者API，轻松集成到应用中' },
    ],
    scenes: ['视频配音', '有声书', '播客制作', '游戏配音', '广告配音', '语音助手', '新闻播报', '学习材料'],
    pricing: [
      { name: 'Free', price: '免费', features: '每月1万字，3个音色' },
      { name: 'Starter', price: '$5/月', features: '每月3万字，10个音色' },
      { name: 'Creator', price: '$22/月', features: '每月10万字，自定义音色' },
      { name: 'Pro', price: '$99/月', features: '每月50万字，优先队列，API' },
    ],
    reviews: [
      { name: 'YouTuber', role: '视频创作者', rating: 5, text: 'ElevenLabs的语音质量太惊人了！比TTS软件自然太多，听众都以为是真人配音。克隆自己的声音后做视频超省时间！' },
      { name: 'Audiobook Creator', role: '有声书作者', rating: 5, text: "The voice quality is indistinguishable from human narration. I've created 20+ audiobooks using ElevenLabs, and my listeners can't tell the difference!" },
      { name: '游戏开发者', role: '独立制作人', rating: 4, text: '用来给游戏角色配音非常好，特别是多语言版本，一套内容就能支持多种语言。唯一的不足是价格对于小团队有点高。' },
    ],
    info: { developer: 'ElevenLabs Inc.', released: '2022年1月', platform: 'Web/API', language: '29种语言', update: '持续更新', category: 'AI语音合成' },
    related: ['suno', 'runway'],
    reviewCount: 18730, score5: 60, score4: 24, score3: 10, score2: 4, score1: 2,
    isHot: false, isNew: true,
  },

  // Gemini
  gemini: {
    id: 'gemini', name: 'Google Gemini', icon: '✨', color: '#4285f4',
    category: 'AI对话', categoryId: 'writing', users: '5000万+用户', rating: 4.6, price: '免费', priceType: 'free',
    url: 'https://gemini.google.com',
    desc: 'Google推出的多模态AI助手，支持200万token超长上下文，能理解和处理文字、图像、音频、视频，与Google生态深度集成。',
    features: [
      { icon: '📖', title: '超长上下文', desc: '200万token上下文，处理整本书或代码库' },
      { icon: '🖼️', title: '多模态理解', desc: '同时理解文字、图像、音频、视频' },
      { icon: '🔍', title: '实时搜索', desc: '联网搜索最新信息，结合Google搜索' },
      { icon: '📊', title: '数据分析', desc: '上传文件，生成图表和分析报告' },
      { icon: '🎨', title: '图片生成', desc: '集成ImageFX，快速生成AI图片' },
      { icon: '🔗', title: 'Google集成', desc: '与Gmail、Docs、Drive等Google服务联动' },
    ],
    scenes: ['日常对话', '学术研究', '代码开发', '内容创作', '数据分析', '旅行规划', '学习辅导', '创意灵感'],
    pricing: [
      { name: 'Free', price: '免费', features: 'Gemini 1.5 Flash，基础功能' },
      { name: 'Pro', price: '免费', features: 'Gemini 1.5 Pro，更强能力' },
      { name: 'Advanced', price: '$19.99/月', features: 'Gemini Advanced，Ultra 1.0' },
    ],
    reviews: [
      { name: '开发者小张', role: '全栈工程师', rating: 5, text: 'Gemini 1.5 Pro的上下文窗口太大了，直接上传整个代码仓库让它分析，效率提升明显。配合Google服务使用特别方便！' },
      { name: 'Researcher', role: '研究员', rating: 5, text: "The 1 million token context window is a game changer for research. I can upload entire books or paper archives and have Gemini analyze them comprehensively." },
      { name: '产品经理', role: '互联网公司', rating: 4, text: '用来做竞品分析和市场调研特别高效，Google搜索集成让信息获取变得很简单。中文理解能力也很强，日常使用完全够用。' },
    ],
    info: { developer: 'Google', released: '2023年12月', platform: 'Web/iOS/Android', language: '多语言', update: '持续更新', category: 'AI对话助手' },
    related: ['chatgpt', 'claude'],
    reviewCount: 56800, score5: 65, score4: 22, score3: 8, score2: 3, score1: 2,
    isHot: true, isNew: false,
  },

  // 剪映
  capcut: {
    id: 'capcut', name: '剪映', icon: '✂️', color: '#ef4444',
    category: 'AI视频', categoryId: 'video', users: '5亿+用户', rating: 4.7, price: '免费', priceType: 'free',
    url: 'https://www.capcut.cn',
    desc: '字节跳动推出的AI视频编辑工具，内置大量AI功能如智能剪辑、字幕生成、语音转文字、AI配音等，是全球最受欢迎的短视频编辑器之一。',
    features: [
      { icon: '✂️', title: '智能剪辑', desc: 'AI自动识别精彩片段，一键生成短视频' },
      { icon: '📝', title: '自动字幕', desc: '语音自动识别生成字幕，支持多语言' },
      { icon: '🎙️', title: 'AI配音', desc: '文字转语音，多种音色可选' },
      { icon: '🎨', title: '智能配乐', desc: '根据视频内容自动匹配背景音乐' },
      { icon: '✨', title: '特效滤镜', desc: '海量AI特效和滤镜，一键美化' },
      { icon: '📱', title: '全端同步', desc: '手机、电脑、网页端数据同步' },
    ],
    scenes: ['短视频创作', 'Vlog制作', '营销视频', '教学视频', '社交媒体', '产品展示', '个人剪辑', '内容创作'],
    pricing: [
      { name: '免费版', price: '免费', features: '基础功能，部分特效' },
      { name: '专业版', price: '¥168/年', features: '解锁全部特效，云空间' },
      { name: '商业版', price: '¥398/年', features: '商用授权，高级功能' },
    ],
    reviews: [
      { name: '短视频博主', role: '抖音创作者', rating: 5, text: '剪映真的太好用了！特别是智能剪辑和自动字幕，大大提高了剪辑效率。现在做一条视频的时间缩短了60%，强烈推荐！' },
      { name: 'Content Creator', role: 'YouTuber', rating: 5, text: "CapCut has become my go-to video editor. The AI features like auto-captions and smart cut save me hours every week. The interface is intuitive and powerful!" },
      { name: '自媒体运营', role: '小红书博主', rating: 5, text: '用剪映做教程视频特别方便，AI字幕识别准确率很高。手机剪辑也很流畅，随时随地都能产出内容，效率提升太多！' },
    ],
    info: { developer: '字节跳动', released: '2019年', platform: 'Web/iOS/Android/Mac/Windows', language: '多语言', update: '持续更新', category: 'AI视频编辑' },
    related: ['runway', 'pika'],
    reviewCount: 156000, score5: 68, score4: 20, score3: 8, score2: 3, score1: 1,
    isHot: false, isNew: false,
  },

  // DALL-E
  'dall-e': {
    id: 'dall-e', name: 'DALL-E 3', icon: '🖼️', color: '#ec4899',
    category: 'AI绘画', categoryId: 'image', users: '200万+用户', rating: 4.7, price: '$15/115张', priceType: 'paid',
    url: 'https://openai.com/dall-e-3',
    desc: 'OpenAI出品的AI图像生成模型，集成在ChatGPT Plus中，生成质量极高，图文理解能力业界领先，广泛用于插画、设计和创意工作。',
    features: [
      { icon: '🎨', title: '高质量图像', desc: '生成1024x1024高清图像，细节丰富' },
      { icon: '📝', title: '图文理解', desc: '精确理解复杂提示词，遵循构图要求' },
      { icon: '🔄', title: '变体生成', desc: '一键生成多个相似变体，选择最佳' },
      { icon: '✏️', title: '局部重绘', desc: '选中区域重新生成，保持其他部分' },
      { icon: '📱', title: 'ChatGPT集成', desc: '在ChatGPT中直接使用，方便快捷' },
      { icon: '🔒', title: '安全过滤', desc: '内置安全系统，避免不当内容' },
    ],
    scenes: ['插画设计', '概念艺术', '产品展示', '社交媒体', '书籍插图', '营销素材', '头像生成', '创意灵感'],
    pricing: [
      { name: 'ChatGPT Plus', price: '$20/月', features: '包含DALL-E 3，115张/月' },
      { name: '额外额度', price: '$15/115张', features: '按需购买额外额度' },
      { name: 'API', price: '按量计费', features: '开发者API，$0.04/图' },
    ],
    reviews: [
      { name: '设计师阿美', role: '品牌设计师', rating: 5, text: 'DALL-E 3的图文理解能力太强了！以前需要反复调整提示词，现在一次性就能生成想要的效果。配合ChatGPT使用体验极佳！' },
      { name: 'Illustrator', role: '插画师', rating: 5, text: "DALL-E 3 is excellent for generating illustrations. The understanding of complex scenes and composition is impressive. It's become an essential part of my creative workflow." },
      { name: '运营小王', role: '电商运营', rating: 4, text: '用来生成产品图和营销素材很方便，质量也不错。配合Canva做设计，整个流程效率提升很多。就是额度有点不够用。' },
    ],
    info: { developer: 'OpenAI', released: '2023年9月', platform: 'Web/API', language: '多语言', update: '持续更新', category: 'AI图像生成' },
    related: ['midjourney', 'stable-diffusion'],
    reviewCount: 18200, score5: 66, score4: 21, score3: 8, score2: 3, score1: 2,
    isHot: false, isNew: false,
  },

  // Pika
  pika: {
    id: 'pika', name: 'Pika', icon: '🎥', color: '#7c3aed',
    category: 'AI视频', categoryId: 'video', users: '200万+用户', rating: 4.5, price: '$8/月', priceType: 'freemium',
    url: 'https://pika.art',
    desc: '专注于文字/图片生成视频的AI工具，支持3-4秒短片生成、视频风格转换、lip-sync对口型等功能，是短视频创作者的得力助手。',
    features: [
      { icon: '✨', title: 'Text to Video', desc: '输入文字描述，几秒生成短视频' },
      { icon: '🖼️', title: 'Image to Video', desc: '上传静态图片，让照片动起来' },
      { icon: '🎭', title: 'Lip Sync', desc: '让AI视频中的人物对口型，真实感强' },
      { icon: '🎨', title: '风格转换', desc: '将视频转换为动画、3D、素描等风格' },
      { icon: '📱', title: '社区模板', desc: '海量优质模板，一键套用快速产出' },
      { icon: '🔄', title: '延长视频', desc: '对生成的片段进行续写，构建长视频' },
    ],
    scenes: ['短视频', '广告创意', '产品展示', '社交媒体', '个人Vlog', '电商视频', '教育内容', '概念演示'],
    pricing: [
      { name: 'Free', price: '免费', features: '每月150积分，带水印' },
      { name: 'Basic', price: '$8/月', features: '每月250积分，无水印' },
      { name: 'Pro', price: '$28/月', features: '每月700积分，延长视频' },
      { name: 'Studio', price: '$58/月', features: '每月3000积分，最高优先级' },
    ],
    reviews: [
      { name: '短视频达人', role: '抖音创作者', rating: 5, text: 'Pika的Lip Sync功能太神了！让AI人物对口型做口播，效果比真人录音还自然。现在做口播视频效率提升了10倍，强烈推荐！' },
      { name: 'Social Media Manager', role: '品牌运营', rating: 4, text: "Pika is great for quick social media content. The templates are very helpful, though the video length limit can be restrictive for longer content." },
      { name: '产品经理', role: '电商平台', rating: 5, text: '用来做产品展示视频特别省事，上传产品图就能生成动态展示，省了拍视频的钱。质量也不错，完全够用！' },
    ],
    info: { developer: 'Pika Labs', released: '2023年4月', platform: 'Web/Discord', language: '多语言', update: '持续更新', category: 'AI视频生成' },
    related: ['runway', 'midjourney'],
    reviewCount: 8920, score5: 58, score4: 24, score3: 12, score2: 4, score1: 2,
    isHot: false, isNew: false,
  },

  // HeyGen
  heygen: {
    id: 'heygen', name: 'HeyGen', icon: '🎭', color: '#0891b2',
    category: 'AI视频', categoryId: 'video', users: '100万+用户', rating: 4.4, price: '$29/月', priceType: 'paid',
    url: 'https://www.heygen.com',
    desc: '领先的AI数字人视频生成平台，支持文字生成虚拟主播视频、口型同步、多语言配音，广泛用于企业培训、营销视频、客户服务等领域。',
    features: [
      { icon: '👤', title: '100+数字人', desc: '丰富的虚拟主播形象，可选真人风格或卡通风格' },
      { icon: '🎤', title: '文字转视频', desc: '输入脚本文字，AI生成数字人演讲视频' },
      { icon: '🗣️', title: '多语言配音', desc: '支持40+语言口型同步和AI配音' },
      { icon: '📹', title: 'PPT转视频', desc: '上传PPT自动生成讲解视频' },
      { icon: '🎨', title: '自定义形象', desc: '可上传照片生成专属数字人' },
      { icon: '⚡', title: '快速生成', desc: '几分钟内生成专业视频，无需拍摄' },
    ],
    scenes: ['企业培训', '产品介绍', '营销视频', '客户服务', '在线课程', '新闻播报', '会议开场', '品牌宣传'],
    pricing: [
      { name: 'Free', price: '免费', features: '每月1分钟，带水印' },
      { name: 'Creator', price: '$29/月', features: '每月15分钟，无水印' },
      { name: 'Business', price: '$89/月', features: '每月30分钟，4K导出' },
      { name: 'Enterprise', price: '联系销售', features: '无限分钟，定制化服务' },
    ],
    reviews: [
      { name: '培训经理', role: '企业HR', rating: 5, text: '做员工培训视频神器！不用找真人拍摄，直接用数字人录制，节省了70%的预算。口型同步非常自然，完全看不出是AI。' },
      { name: 'Marketing Director', role: '科技公司', rating: 4, text: "HeyGen has been great for product demo videos. The AI avatars are professional and the lip-sync technology is impressive. Price could be lower for longer videos." },
      { name: '在线讲师', role: '知识付费', rating: 5, text: '录课神器！不用自己出镜，用数字人讲就行了。多语言功能特别好，一套内容可以生成多个语言版本，覆盖更多市场！' },
    ],
    info: { developer: 'HeyGen Inc.', released: '2020年', platform: 'Web', language: '40+语言', update: '持续更新', category: 'AI数字人视频' },
    related: ['runway', 'suno'],
    reviewCount: 12400, score5: 55, score4: 25, score3: 13, score2: 5, score1: 2,
    isHot: false, isNew: false,
  },

  // Udio
  udio: {
    id: 'udio', name: 'Udio', icon: '🎶', color: '#f59e0b',
    category: 'AI音乐', categoryId: 'audio', users: '300万+用户', rating: 4.6, price: '免费/$12月', priceType: 'freemium',
    url: 'https://www.udio.com',
    desc: 'Suno的强劲竞争对手，专注于高质量AI音乐生成，支持完整的歌曲创作、歌词生成、人声演唱，在音乐质量和风格多样性上表现突出。',
    features: [
      { icon: '🎼', title: '完整歌曲', desc: '生成带人声和伴奏的完整歌曲' },
      { icon: '🎸', title: '多种风格', desc: '流行、摇滚、电子、爵士、古典等30+风格' },
      { icon: '✏️', title: '歌词生成', desc: 'AI自动创作歌词，也可自定义' },
      { icon: '🎚️', title: '高清音质', desc: '输出高保真音频，专业级音质' },
      { icon: '🔄', title: '无限迭代', desc: '对生成的片段不断优化，达到理想效果' },
      { icon: '💾', title: '项目管理', desc: '保存多个版本，轻松管理创作项目' },
    ],
    scenes: ['个人创作', '短视频配乐', '游戏BGM', '广告配乐', '音乐学习', '背景音乐', '个人专辑', '娱乐创作'],
    pricing: [
      { name: 'Free', price: '免费', features: '每天10首歌，标准音质' },
      { name: 'Basic', price: '$12/月', features: '每月1000首歌，高清音质' },
      { name: 'Pro', price: '$30/月', features: '每月3000首歌，商用授权' },
      { name: 'Enterprise', price: '联系销售', features: '无限生成，API访问' },
    ],
    reviews: [
      { name: '音乐制作人', role: '专业编曲', rating: 5, text: 'Udio的音乐质量真的很专业，编曲、人声、混音都很到位。用来做灵感参考特别棒，很多想法能快速实现！' },
      { name: 'Content Creator', role: 'YouTuber', rating: 5, text: "I switched from Suno to Udio because the music quality is just better. The vocals sound more natural and the production quality is higher. Highly recommended!" },
      { name: '短视频博主', role: '抖音创作者', rating: 4, text: '用来给视频配乐很好用，风格描述很准。免费版每天10首对个人创作者够了，希望能出更多免商用授权的套餐。' },
    ],
    info: { developer: 'Udio Inc.', released: '2024年4月', platform: 'Web', language: '多语言', update: '持续更新', category: 'AI音乐生成' },
    related: ['suno', 'runway'],
    reviewCount: 12650, score5: 61, score4: 23, score3: 10, score2: 4, score1: 2,
    isHot: false, isNew: false,
  },

  // Codeium
  codeium: {
    id: 'codeium', name: 'Codeium', icon: '🔮', color: '#8b5cf6',
    category: 'AI编程', categoryId: 'code', users: '50万+用户', rating: 4.6, price: '免费', priceType: 'free',
    url: 'https://codeium.com',
    desc: '完全免费的AI编程助手，支持40+编程语言，实时代码补全、智能重构、代码解释，性价比极高，适合个人开发者和小团队。',
    features: [
      { icon: '⚡', title: '实时补全', desc: '基于上下文的智能代码补全' },
      { icon: '💬', title: 'Codeium Chat', desc: '用自然语言提问，AI解答代码问题' },
      { icon: '🔧', title: '代码重构', desc: '选中代码，AI自动优化改进' },
      { icon: '📝', title: '注释生成', desc: '自动生成代码注释和文档' },
      { icon: '🔒', title: '隐私安全', desc: '代码不用于训练，企业级安全' },
      { icon: '🌐', title: '40+语言', desc: '支持Python、JavaScript、Go等主流语言' },
    ],
    scenes: ['日常开发', '代码学习', '快速原型', '代码重构', '单元测试', '代码审查', '文档编写', 'Bug修复'],
    pricing: [
      { name: 'Free', price: '免费', features: '个人用户，完整功能' },
      { name: 'Teams', price: '$12/月/人', features: '团队功能，代码历史' },
      { name: 'Enterprise', price: '联系销售', features: '自部署，SSO，高级权限' },
    ],
    reviews: [
      { name: '独立开发者', role: '全栈工程师', rating: 5, text: '完全免费还要什么自行车！功能比付费的Copilot不差多少，对于个人开发者来说是神级工具。Codeium Chat也很好用！' },
      { name: 'Startup CTO', role: '小团队负责人', rating: 5, text: "Our team migrated from Copilot to Codeium and saved $15k/month. The code suggestions are excellent and we haven't noticed any drop in productivity." },
      { name: '编程初学者', role: '学生', rating: 4, text: '用来学习编程特别有用，它不仅给代码还会解释原因。有时候补全不够精准，但对于学习足够了。' },
    ],
    info: { developer: 'Codeium Inc.', released: '2022年', platform: 'VS Code/JetBrains/Vim', language: '40+编程语言', update: '持续更新', category: 'AI编程助手' },
    related: ['cursor', 'github-copilot'],
    reviewCount: 15680, score5: 63, score4: 22, score3: 10, score2: 3, score1: 2,
    isHot: false, isNew: false,
  },

  // Adobe Firefly
  'adobe-firefly': {
    id: 'adobe-firefly', name: 'Adobe Firefly', icon: '🔥', color: '#ff4400',
    category: 'AI设计', categoryId: 'image', users: '2000万+用户', rating: 4.5, price: '免费/$4.99月', priceType: 'freemium',
    url: 'https://adobe.com/firefly',
    desc: 'Adobe推出的AI创意工具，深度集成Photoshop和Illustrator，支持文生图、填充、风格迁移等功能，是设计师的高效助手。',
    features: [
      { icon: '🎨', title: '文生图', desc: '输入文字描述，AI生成高质量图像' },
      { icon: '✨', title: '智能填充', desc: '选中区域智能生成，无缝融合' },
      { icon: '🎭', title: '风格迁移', desc: '将艺术风格应用到图像上' },
      { icon: '📐', title: '矢量生成', desc: 'AI生成可编辑的矢量图形' },
      { icon: '🔄', title: '创意填充', desc: '扩展图像边界，AI补全内容' },
      { icon: '📝', title: '文字效果', desc: '将文字转换为精美设计' },
    ],
    scenes: ['平面设计', 'UI设计', '营销素材', '社交媒体', '照片编辑', '插画创作', '品牌设计', '概念艺术'],
    pricing: [
      { name: 'Free', price: '免费', features: '每月25个积分，基础功能' },
      { name: 'Firefly Pro', price: '$4.99/月', features: '每月100个积分，高级功能' },
      { name: 'Creative Cloud', price: '¥548.88/年', features: '完整Adobe套件+Firefly' },
    ],
    reviews: [
      { name: '设计师小李', role: '平面设计师', rating: 5, text: 'Firefly集成在Photoshop里用起来太方便了！创意填充功能帮我省了大量抠图时间。生成效果和原图融合得很自然！' },
      { name: 'UI Designer', role: '互联网公司', rating: 4, text: "Adobe Firefly has become essential for quick mockups. The integration with Photoshop makes the workflow seamless. Great for exploring design concepts fast." },
      { name: '摄影爱好者', role: '业余摄影', rating: 4, text: '用来扩展照片和修复不满意的构图特别有用。虽然免费额度不多，但Adobe订阅用户可以直接用，体验很好。' },
    ],
    info: { developer: 'Adobe', released: '2023年3月', platform: 'Web/Photoshop/Illustrator', language: '多语言', update: '持续更新', category: 'AI设计工具' },
    related: ['midjourney', 'canva-ai'],
    reviewCount: 28400, score5: 58, score4: 24, score3: 12, score2: 4, score1: 2,
    isHot: false, isNew: false,
  },

  // Canva AI
  'canva-ai': {
    id: 'canva-ai', name: 'Canva AI', icon: '🎨', color: '#00c4cc',
    category: 'AI设计', categoryId: 'image', users: '1.5亿+用户', rating: 4.6, price: '免费/$12.99月', priceType: 'freemium',
    url: 'https://www.canva.com',
    desc: '全球领先的在线设计平台，内置AI功能包括文生图、智能抠图、AI写作助手等，让设计变得简单高效。',
    features: [
      { icon: '✨', title: 'AI文生图', desc: '输入描述，AI生成设计素材' },
      { icon: '✂️', title: '智能抠图', desc: '一键移除背景，精准分离主体' },
      { icon: '✍️', title: 'AI写作助手', desc: '生成文案、标题、描述' },
      { icon: '🎨', title: '魔法换色', desc: 'AI自动调整配色方案' },
      { icon: '📐', title: '智能排版', desc: 'AI自动优化布局和层次' },
      { icon: '🔄', title: '品牌套件', desc: '一键应用品牌颜色和字体' },
    ],
    scenes: ['社交媒体', '演示文稿', '海报设计', 'Logo设计', '视频制作', '简历制作', '名片设计', '营销素材'],
    pricing: [
      { name: 'Free', price: '免费', features: '基础功能，大量模板' },
      { name: 'Pro', price: '$12.99/月', features: '完整功能，品牌套件' },
      { name: 'Teams', price: '$14.99/人/月', features: '团队协作，资源共享' },
      { name: 'Enterprise', price: '联系销售', features: '企业级功能，安全合规' },
    ],
    reviews: [
      { name: '运营专员', role: '新媒体公司', rating: 5, text: 'Canva AI太省事了！以前做一张海报要半小时，现在几分钟搞定。AI抠图和文生图功能特别好用，模板也很丰富！' },
      { name: 'Social Media Manager', role: '品牌运营', rating: 5, text: "Canva has completely transformed our design workflow. Magic Write saves hours of copywriting time, and the AI image generation is perfect for social content." },
      { name: '大学生', role: '学生', rating: 4, text: '做PPT和简历特别方便，模板免费版就够用了。AI功能虽然免费额度不多，但日常需求完全满足。' },
    ],
    info: { developer: 'Canva', released: '2012年（AI功能2023年）', platform: 'Web/iOS/Android', language: '多语言', update: '持续更新', category: 'AI设计平台' },
    related: ['adobe-firefly', 'midjourney'],
    reviewCount: 89200, score5: 62, score4: 24, score3: 10, score2: 3, score1: 1,
    isHot: false, isNew: false,
  },
};

// 获取所有工具的简化列表（用于快速查询和列表展示）
function getToolsList() {
  return Object.values(TOOLS_DATA).map(tool => ({
    id: tool.id,
    name: tool.name,
    icon: tool.icon,
    color: tool.color,
    desc: tool.desc,
    price: tool.price,
    rating: tool.rating,
    users: tool.users,
    tag: tool.category,
    url: tool.url,
    category: tool.category,
    categoryId: tool.categoryId,
    priceType: tool.priceType,
    isHot: tool.isHot,
    isNew: tool.isNew,
  }));
}

// 按分类获取工具
function getToolsByCategory(category) {
  return Object.values(TOOLS_DATA).filter(tool => tool.categoryId === category);
}

// 按ID获取工具完整数据
function getToolById(id) {
  return TOOLS_DATA[id];
}

// 获取工具总数
function getToolsCount() {
  return Object.keys(TOOLS_DATA).length;
}

// 获取所有分类
function getCategories() {
  const categories = {};
  Object.values(TOOLS_DATA).forEach(tool => {
    if (!categories[tool.categoryId]) {
      categories[tool.categoryId] = {
        id: tool.categoryId,
        name: tool.category,
        count: 0,
        icon: tool.category === 'AI写作' ? '✍️' :
              tool.category === 'AI绘画' ? '🎨' :
              tool.category === 'AI视频' ? '🎬' :
              tool.category === 'AI编程' ? '💻' :
              tool.category === 'AI音乐' ? '🎵' :
              tool.category === 'AI音频' ? '🎙️' :
              tool.category === 'AI效率' ? '⚡' :
              tool.category === 'AI搜索' ? '🔎' :
              tool.category === 'AI设计' ? '🎨' : '🤖'
      };
    }
    categories[tool.categoryId].count++;
  });
  return Object.values(categories);
}
