
import { Platform, Tool, Poll } from './types';

// =====================================================================
// 🟢 管理指南：如何添加新内容
// =====================================================================

// ---------------------------------------------------------------------
// 1. 行业板块 (Industries)
// ---------------------------------------------------------------------
export const INDUSTRIES = [
  'Development',
  'Design',
  'Marketing',
  'Writing',
  'Product',
  'Customer Support',
  'Operations',
  'Sales'
];

// ---------------------------------------------------------------------
// 2. 远程工具箱 (Remote Tools)
// ---------------------------------------------------------------------
export const REMOTE_TOOLS: Tool[] = [
  {
    id: 'vpn-tool',
    name: 'G-Network 加速器',
    description: '稳定高速的全球网络接入服务，解决 Upwork/Fiverr 等国际平台访问卡顿问题，远程工作必备。',
    url: 'https://get.affiliatescn.net/aff_c?offer_id=153&aff_id=136572&url_id=613',
    category: '网络工具',
    recommended: true
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'All-in-one 生产力工具，适合整理远程工作文档、项目进度和个人知识库。',
    url: 'https://www.notion.so/',
    category: '协作效率'
  },
  {
    id: 'wise',
    name: 'Wise (TransferWise)',
    description: '低费率接收美元、欧元工资的首选工具，支持提现到国内支付宝/微信。',
    url: 'https://wise.com/',
    category: '跨境收款'
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: '全球最通用的视频会议软件，面试和团队沟通的标准配置。',
    url: 'https://zoom.us/',
    category: '沟通会议'
  },
  {
    id: 'toggl',
    name: 'Toggl Track',
    description: '简洁的时间追踪工具，适合按小时计费的自由职业者生成工时报告。',
    url: 'https://toggl.com/',
    category: '时间管理'
  },
  {
    id: 'deel',
    name: 'Deel',
    description: '全球合规薪酬支付平台，许多远程公司通过它来雇佣和支付海外员工。',
    url: 'https://www.deel.com/',
    category: '合规薪酬'
  }
];

// ---------------------------------------------------------------------
// 3. 互动投票 (Interactive Poll)
// ---------------------------------------------------------------------
export const POLL_DATA: Poll = {
  id: 'poll-001',
  question: '你目前最大的远程工作挑战是什么？',
  totalVotes: 1240,
  options: [
    { id: 'opt1', label: '找不到合适的工作/项目', votes: 540 },
    { id: 'opt2', label: '孤独感与缺乏社交', votes: 210 },
    { id: 'opt3', label: '工作与生活界限模糊', votes: 380 },
    { id: 'opt4', label: '时差与异步沟通困难', votes: 110 }
  ]
};

// ---------------------------------------------------------------------
// 4. 平台列表 (Platforms)
// ---------------------------------------------------------------------
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
    id: 'freehunter',
    name: 'Freehunter',
    description: '香港最大的自由职业者平台，连接创意人才与企业客户，涵盖设计、IT、市场营销等多个领域。',
    url: 'https://freehunter.hk/',
    logoColor: '#f95f5f',
    platformType: 'Freelance Market',
    industries: ['Design', 'Marketing', 'Development', 'Writing'],
    jobTypes: ['Freelance'],
    salaryTier: '$$',
    tags: ['香港', '自由职业', '创意'],
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
    id: 'data-annotation',
    name: 'DataAnnotation',
    description: '参与 AI 模型训练项目，工作内容包括编程、创意写作和数据标注。工作时间灵活，报酬丰厚。',
    url: 'https://www.dataannotation.tech/',
    logoColor: '#2d3748',
    platformType: 'Freelance Market',
    industries: ['Development', 'Writing'],
    jobTypes: ['Freelance', 'Part-time'],
    salaryTier: '$$',
    tags: ['AI', '数据标注', '高薪'],
    popular: true,
    language: 'EN'
  },
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
