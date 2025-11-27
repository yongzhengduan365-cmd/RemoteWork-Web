
import { Platform } from './types';

// =====================================================================
// 🟢 管理指南：如何添加新内容
// =====================================================================
// 这个文件是整个网站的“数据库”。只需修改这里，网站内容就会自动更新。

// ---------------------------------------------------------------------
// 1. 行业板块 (Industries)
// ---------------------------------------------------------------------
// 在下方数组中添加新的行业名称（英文），它会自动出现在左侧的“行业领域”筛选器中。
// 这里的名称必须与下方 PLATFORMS 里的 industries 字段对应。
export const INDUSTRIES = [
  'Development',
  'Design',
  'Marketing',
  'Writing',
  'Product',
  'Customer Support',
  'Operations',
  'Sales'
  // 示例: 在这里添加 'Data Science' 或 'Virtual Assistant'
];

// ---------------------------------------------------------------------
// 2. 平台列表 (Platforms)
// ---------------------------------------------------------------------
// 要添加新网站，请复制下面的 [模版对象]，修改内容后粘贴到 PLATFORMS 数组中。

/* --- 复制开始 ---
  {
    id: 'unique-id-here',          // 唯一ID，英文，不要重复 (例如: 'zhilian-zhaopin')
    name: '网站名称',               // 显示在卡片标题
    description: '简短描述...',     // 显示在卡片正文 (建议30-50字)
    url: 'https://example.com',    // 网站链接
    logoColor: '#3b82f6',          // Logo背景色 (Hex颜色码)
    platformType: 'Job Board',     // 类型 (只能选): 'Job Board'(招聘板) | 'Freelance Market'(众包) | 'Community'(社区) | 'Aggregator'(聚合)
    industries: ['Development'],   // 行业: 必须是上面 INDUSTRIES 列表里有的词
    jobTypes: ['Full-time'],       // 工作类型: 'Full-time' | 'Part-time' | 'Contract'(合同) | 'Freelance'(自由职业)
    salaryTier: '$$',              // 薪资等级: '$'(入门/低) | '$$'(中等) | '$$$'(高薪)
    tags: ['标签1', '标签2'],       // 自定义标签，显示在卡片底部
    language: 'CN',                // 语言: 'CN'(国内) | 'EN'(国外) | 'BOTH'(都有)
    popular: false                 // 是否显示 "POPULAR" 热门标签
  },
--- 复制结束 --- */

export const PLATFORMS: Platform[] = [
  // --- 国内平台 (CN Platforms) ---
  {
    id: 'eleduck',
    name: '电鸭社区',
    description: '国内最早的远程工作社区，聚集了大量开发者和自由职业者，提供招聘和交流版块。',
    url: 'https://eleduck.com',
    logoColor: '#fbbf24',
    platformType: 'Community',
    industries: ['Development', 'Design', 'Product', 'Marketing'],
    jobTypes: ['Full-time', 'Contract', 'Freelance'],
    salaryTier: '$$',
    tags: ['社区', '国内', '数字游民'],
    popular: true,
    language: 'CN'
  },
  {
    id: 'sweet-salary',
    name: '甜薪工场',
    description: '连接企业和远程人才的平台，覆盖开发、设计、市场等多个领域。',
    url: 'https://www.tiantask.com',
    logoColor: '#f43f5e',
    platformType: 'Freelance Market',
    industries: ['Development', 'Design', 'Marketing', 'Writing'],
    jobTypes: ['Freelance', 'Part-time'],
    salaryTier: '$',
    tags: ['兼职', '众包', '灵活用工'],
    language: 'CN'
  },
  {
    id: 'v2ex-jobs',
    name: 'V2EX 酷工作',
    description: '知名技术社区的招聘节点，虽不是纯远程，但包含大量远程机会，质量较高。',
    url: 'https://www.v2ex.com/go/jobs',
    logoColor: '#333333',
    platformType: 'Community',
    industries: ['Development', 'Product'],
    jobTypes: ['Full-time'],
    salaryTier: '$$',
    tags: ['极客', '程序员', '高薪'],
    language: 'CN'
  },
  {
    id: 'yuancheng-work',
    name: '远程.work',
    description: '专门收集国内远程工作机会的聚合网站，界面简洁。',
    url: 'https://yuancheng.work',
    logoColor: '#3b82f6',
    platformType: 'Aggregator',
    industries: ['Development', 'Design', 'Product', 'Operations'],
    jobTypes: ['Full-time', 'Part-time'],
    salaryTier: '$$',
    tags: ['聚合', '国内', '互联网'],
    language: 'CN'
  },

  // --- 全球平台 (Global Platforms) ---
  {
    id: 'upwork',
    name: 'Upwork',
    description: '全球最大的自由职业平台之一，项目种类繁多，从开发到设计、写作应有尽有。',
    url: 'https://www.upwork.com',
    logoColor: '#14a800',
    platformType: 'Freelance Market',
    industries: ['Development', 'Design', 'Writing', 'Marketing', 'Customer Support', 'Sales'],
    jobTypes: ['Freelance', 'Contract'],
    salaryTier: '$',
    tags: ['全球', '综合', '外包'],
    popular: true,
    language: 'EN'
  },
  {
    id: 'toptal',
    name: 'Toptal',
    description: '精英自由职业者平台，号称只录用全球前3%的开发者、设计师和金融专家。',
    url: 'https://www.toptal.com',
    logoColor: '#386cfb',
    platformType: 'Freelance Market',
    industries: ['Development', 'Design', 'Product', 'Operations'],
    jobTypes: ['Contract', 'Freelance'],
    salaryTier: '$$$',
    tags: ['高端', '面试严格', 'Top 3%'],
    popular: true,
    language: 'EN'
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    description: '以服务（Gigs）为核心的平台，适合提供标准化的小型服务，起步较容易。',
    url: 'https://www.fiverr.com',
    logoColor: '#1dbf73',
    platformType: 'Freelance Market',
    industries: ['Design', 'Marketing', 'Writing', 'Development'],
    jobTypes: ['Freelance'],
    salaryTier: '$',
    tags: ['微服务', '创意', '低门槛'],
    language: 'EN'
  },
  {
    id: 'remoteok',
    name: 'Remote OK',
    description: '著名的远程工作聚合搜索网站，覆盖全球各地的远程职位，尤其是技术类。',
    url: 'https://remoteok.com',
    logoColor: '#ff4742',
    platformType: 'Aggregator',
    industries: ['Development', 'Design', 'Marketing', 'Customer Support'],
    jobTypes: ['Full-time', 'Contract'],
    salaryTier: '$$$',
    tags: ['全球', '大厂', '美元支付'],
    popular: true,
    language: 'EN'
  },
  {
    id: 'weworkremotely',
    name: 'We Work Remotely',
    description: '历史悠久的远程工作招聘版块，职位质量普遍较高，不仅限于技术。',
    url: 'https://weworkremotely.com',
    logoColor: '#dd2e44',
    platformType: 'Job Board',
    industries: ['Development', 'Design', 'Marketing', 'Product', 'Customer Support'],
    jobTypes: ['Full-time', 'Contract'],
    salaryTier: '$$',
    tags: ['老牌', '高质量', '综合'],
    language: 'EN'
  },
  {
    id: 'flexjobs',
    name: 'FlexJobs',
    description: '付费会员制的远程和灵活工作平台，人工筛选职位，避免诈骗和劣质信息。',
    url: 'https://www.flexjobs.com',
    logoColor: '#003366',
    platformType: 'Job Board',
    industries: ['Writing', 'Customer Support', 'Marketing', 'Development', 'Sales', 'Operations'],
    jobTypes: ['Full-time', 'Part-time', 'Freelance'],
    salaryTier: '$',
    tags: ['付费', '人工筛选', '安全'],
    language: 'EN'
  },
  {
    id: 'dribbble-jobs',
    name: 'Dribbble Jobs',
    description: '设计师社区 Dribbble 的招聘版块，寻找远程设计工作的首选之地。',
    url: 'https://dribbble.com/jobs',
    logoColor: '#ea4c89',
    platformType: 'Job Board',
    industries: ['Design'],
    jobTypes: ['Full-time', 'Freelance'],
    salaryTier: '$$',
    tags: ['设计', 'UI/UX', '创意'],
    language: 'EN'
  },
  {
    id: 'problogger',
    name: 'ProBlogger',
    description: '专注于写作、博客和内容创作的招聘版块，适合自由撰稿人。',
    url: 'https://problogger.com/jobs/',
    logoColor: '#f97316',
    platformType: 'Job Board',
    industries: ['Writing', 'Marketing'],
    jobTypes: ['Contract', 'Freelance'],
    salaryTier: '$',
    tags: ['写作', '内容', '博客'],
    language: 'EN'
  },
  {
    id: 'gun-io',
    name: 'Gun.io',
    description: '专注于高级软件工程师的自由职业平台，注重开发者体验和匹配质量。',
    url: 'https://www.gun.io',
    logoColor: '#000000',
    platformType: 'Freelance Market',
    industries: ['Development'],
    jobTypes: ['Contract', 'Freelance'],
    salaryTier: '$$$',
    tags: ['极客', '精英', '开发者优先'],
    language: 'EN'
  },
  {
    id: 'wellfound',
    name: 'Wellfound',
    description: '原 AngelList Talent，专注于初创公司（Startup）的招聘平台，很多远程机会。',
    url: 'https://wellfound.com',
    logoColor: '#000000',
    platformType: 'Job Board',
    industries: ['Development', 'Product', 'Design', 'Marketing', 'Sales'],
    jobTypes: ['Full-time', 'Contract'],
    salaryTier: '$$',
    tags: ['创业公司', '期权', 'Web3'],
    language: 'EN'
  },
  {
    id: 'behance-jobs',
    name: 'Behance Jobs',
    description: 'Adobe 旗下的创意展示平台招聘区，适合寻找全职或兼职的设计类远程工作。',
    url: 'https://www.behance.net/joblist',
    logoColor: '#1769ff',
    platformType: 'Job Board',
    industries: ['Design'],
    jobTypes: ['Full-time', 'Freelance'],
    salaryTier: '$$',
    tags: ['Adobe', '视觉', '艺术'],
    language: 'EN'
  }
];
