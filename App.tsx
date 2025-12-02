
import React, { useState, useMemo } from 'react';
import { Search, Filter, X, SlidersHorizontal, Check, Mail, Globe, MessageCircle, ExternalLink, Sparkles, BarChart, Zap, LayoutGrid, Wrench } from 'lucide-react';
import { PLATFORMS, INDUSTRIES, REMOTE_TOOLS, POLL_DATA } from './constants';
import { JobType, PlatformType, SalaryTier } from './types';
import PlatformCard from './components/PlatformCard';

// --- Sub-components for better organization ---

const PollWidget = () => {
  const [hasVoted, setHasVoted] = useState(false);
  const [localPoll, setLocalPoll] = useState(POLL_DATA);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    
    // Simulate updating votes locally
    const updatedOptions = localPoll.options.map(opt => 
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );
    
    setLocalPoll({
      ...localPoll,
      options: updatedOptions,
      totalVotes: localPoll.totalVotes + 1
    });
    setHasVoted(true);
  };

  return (
    <div className="bg-white rounded-xl border border-blue-100 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <BarChart size={18} className="text-blue-600" />
        <h4 className="font-bold text-slate-900 text-sm">每周话题</h4>
      </div>
      <p className="text-sm text-slate-700 font-medium mb-4">{localPoll.question}</p>
      
      <div className="space-y-3">
        {localPoll.options.map((opt) => {
          const percentage = Math.round((opt.votes / localPoll.totalVotes) * 100);
          return (
            <button
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              disabled={hasVoted}
              className="w-full relative group"
            >
              {/* Progress Bar Background */}
              {hasVoted && (
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-50 rounded-lg transition-all duration-500 ease-out" 
                  style={{ width: `${percentage}%` }}
                />
              )}
              
              <div className={`relative z-10 flex items-center justify-between px-3 py-2 rounded-lg border text-xs transition-colors ${
                 hasVoted ? 'border-transparent' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
              }`}>
                <span className="text-slate-700">{opt.label}</span>
                {hasVoted && <span className="font-bold text-blue-600">{percentage}%</span>}
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
        <span>{localPoll.totalVotes.toLocaleString()} 人参与</span>
        {hasVoted && <span className="text-green-600">感谢您的投票！</span>}
      </div>
    </div>
  );
};

const ToolSection = () => (
  <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {REMOTE_TOOLS.map((tool) => (
        <a 
          key={tool.id} 
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`block bg-white rounded-xl border p-5 hover:shadow-lg hover:-translate-y-1 transition-all group ${
            tool.recommended ? 'border-blue-300 ring-1 ring-blue-100' : 'border-slate-200'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`text-xs font-bold px-2.5 py-1 rounded-md inline-block ${
              tool.recommended ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {tool.category}
            </div>
            {tool.recommended && <Zap size={16} className="text-amber-500 fill-amber-500" />}
          </div>
          
          <h3 className={`font-bold text-base mb-2 ${tool.recommended ? 'text-blue-700' : 'text-slate-900'}`}>
            {tool.name}
          </h3>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed h-10 line-clamp-2">{tool.description}</p>
          <div className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
             <span>访问官网</span>
             <ExternalLink size={12} />
          </div>
        </a>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  // State for View Mode (Tabs)
  const [activeTab, setActiveTab] = useState<'platforms' | 'tools'>('platforms');

  // State for Filters
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter States
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<JobType[]>([]);
  const [selectedPlatformTypes, setSelectedPlatformTypes] = useState<PlatformType[]>([]);
  const [selectedSalaryTiers, setSelectedSalaryTiers] = useState<SalaryTier[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<'ALL' | 'CN' | 'EN'>('ALL');

  // Helper to toggle array selections
  const toggleSelection = <T extends string>(item: T, current: T[], setter: (val: T[]) => void) => {
    if (current.includes(item)) {
      setter(current.filter(i => i !== item));
    } else {
      setter([...current, item]);
    }
  };

  const clearFilters = () => {
    setSelectedIndustries([]);
    setSelectedJobTypes([]);
    setSelectedPlatformTypes([]);
    setSelectedSalaryTiers([]);
    setSelectedLanguage('ALL');
    setSearchQuery('');
  };

  const filteredPlatforms = useMemo(() => {
    return PLATFORMS.filter(platform => {
      // 1. Search Query
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        searchQuery === '' ||
        platform.name.toLowerCase().includes(searchLower) || 
        platform.description.toLowerCase().includes(searchLower) ||
        platform.tags.some(tag => tag.toLowerCase().includes(searchLower));

      // 2. Industry Filter (OR logic within Industries)
      const matchesIndustry = selectedIndustries.length === 0 || 
        platform.industries.some(ind => selectedIndustries.includes(ind));

      // 3. Job Type Filter (OR logic)
      const matchesJobType = selectedJobTypes.length === 0 ||
        platform.jobTypes.some(type => selectedJobTypes.includes(type));

      // 4. Platform Type Filter (OR logic)
      const matchesPlatformType = selectedPlatformTypes.length === 0 ||
        selectedPlatformTypes.includes(platform.platformType);

      // 5. Salary Tier Filter (OR logic)
      const matchesSalary = selectedSalaryTiers.length === 0 ||
        selectedSalaryTiers.includes(platform.salaryTier);

      // 6. Language Filter
      const matchesLanguage = selectedLanguage === 'ALL' ||
        platform.language === selectedLanguage || 
        platform.language === 'BOTH';

      return matchesSearch && matchesIndustry && matchesJobType && matchesPlatformType && matchesSalary && matchesLanguage;
    });
  }, [searchQuery, selectedIndustries, selectedJobTypes, selectedPlatformTypes, selectedSalaryTiers, selectedLanguage]);

  const activeFilterCount = 
    selectedIndustries.length + 
    selectedJobTypes.length + 
    selectedPlatformTypes.length + 
    selectedSalaryTiers.length + 
    (selectedLanguage !== 'ALL' ? 1 : 0);

  // Filter Sidebar Component
  const FilterSidebar = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      {/* Header with Clear Button */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <Filter size={18} /> 筛选条件
        </h3>
        {activeFilterCount > 0 && (
          <button 
            onClick={clearFilters}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            清空所有
          </button>
        )}
      </div>

      {/* Language */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">语言 / 地区</h4>
        <div className="flex gap-2">
          {['ALL', 'CN', 'EN'].map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang as any)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                selectedLanguage === lang
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {lang === 'ALL' ? '全部' : lang === 'CN' ? '🇨🇳 国内' : '🌏 Global'}
            </button>
          ))}
        </div>
      </div>

      {/* Industries */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">行业领域</h4>
        <div className="space-y-2">
          {INDUSTRIES.map(industry => (
            <label key={industry} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedIndustries.includes(industry) ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 group-hover:border-blue-400'}`}>
                {selectedIndustries.includes(industry) && <Check size={10} className="text-white" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden"
                checked={selectedIndustries.includes(industry)}
                onChange={() => toggleSelection(industry, selectedIndustries, setSelectedIndustries)}
              />
              <span className={`text-sm ${selectedIndustries.includes(industry) ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                {industry}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Job Types */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">工作类型</h4>
        <div className="flex flex-wrap gap-2">
          {['Full-time', 'Part-time', 'Contract', 'Freelance'].map((type) => (
            <button
              key={type}
              onClick={() => toggleSelection(type as JobType, selectedJobTypes, setSelectedJobTypes)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                selectedJobTypes.includes(type as JobType)
                  ? 'bg-blue-50 text-blue-700 border-blue-200 font-medium'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

       {/* Platform Types */}
       <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">平台类型</h4>
        <div className="space-y-2">
          {['Job Board', 'Freelance Market', 'Community', 'Aggregator'].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
               <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedPlatformTypes.includes(type as PlatformType) ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 group-hover:border-blue-400'}`}>
                {selectedPlatformTypes.includes(type as PlatformType) && <Check size={10} className="text-white" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden"
                checked={selectedPlatformTypes.includes(type as PlatformType)}
                onChange={() => toggleSelection(type as PlatformType, selectedPlatformTypes, setSelectedPlatformTypes)}
              />
              <span className="text-sm text-slate-600">{type}</span>
            </label>
          ))}
        </div>
      </div>

       {/* Salary Tier */}
       <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">薪资等级</h4>
        <div className="flex gap-2">
          {['$', '$$', '$$$'].map((tier) => (
            <button
              key={tier}
              onClick={() => toggleSelection(tier as SalaryTier, selectedSalaryTiers, setSelectedSalaryTiers)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                selectedSalaryTiers.includes(tier as SalaryTier)
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Poll Widget in Sidebar */}
      <div className="pt-4 border-t border-slate-200">
        <PollWidget />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                <Globe size={20} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Remote<span className="text-blue-600">Hub</span>
              </span>
            </div>
            
            {/* Top Navigation Links Removed */}
          </div>
        </div>
      </nav>

      {/* Hero Section - Compact Version */}
      <div className="bg-blue-900 text-white relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.2C93.5,8.8,82.2,21.9,71.4,33.1C60.7,44.3,50.5,53.6,39.1,61.7C27.7,69.8,15.1,76.7,1.8,73.6C-11.5,70.5,-25.5,57.4,-38.3,46.2C-51.1,35,-62.7,25.7,-69.3,13.2C-75.9,0.7,-77.5,-15,-72.2,-28.9C-66.9,-42.8,-54.7,-54.9,-41.8,-62.7C-28.9,-70.5,-15.3,-74,0,-74C15.3,-74,30.5,-70.5,44.7,-76.4Z" transform="translate(100 100)" />
           </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12 text-center relative z-10">
           <h1 className="text-2xl md:text-4xl font-extrabold mb-3 tracking-tight">
             全球远程工作机会与资源，<span className="text-blue-300">一站式枢纽</span>
           </h1>
           <p className="text-blue-100 text-sm md:text-base max-w-2xl mx-auto mb-6">
             汇集全球 20+ 顶级远程招聘平台与必备工具，助你开启自由职业生涯。
           </p>

           <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="搜索平台、行业或关键词 (例如: Design, Crypto...)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/30 text-sm shadow-xl"
              />
           </div>
           
           {/* New Tab Navigation Buttons */}
           <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={() => setActiveTab('platforms')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === 'platforms' 
                  ? 'bg-white text-blue-900 shadow-lg scale-105' 
                  : 'bg-blue-800/50 text-blue-200 hover:bg-blue-800'
                }`}
              >
                <LayoutGrid size={16} /> 找工作 (Platforms)
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === 'tools' 
                  ? 'bg-white text-blue-900 shadow-lg scale-105' 
                  : 'bg-blue-800/50 text-blue-200 hover:bg-blue-800'
                }`}
              >
                <Wrench size={16} /> 用工具 (Tools)
              </button>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {activeTab === 'platforms' ? (
          /* Platforms View */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button 
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-sm font-medium text-slate-700 w-full justify-center"
              >
                <SlidersHorizontal size={16} />
                {isMobileFilterOpen ? '收起筛选' : '显示筛选'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar (Desktop) */}
              <div className="hidden lg:block lg:col-span-1 sticky top-24 h-fit">
                <FilterSidebar />
              </div>

              {/* Sidebar (Mobile Drawer) */}
              {isMobileFilterOpen && (
                <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}>
                  <div className="absolute right-0 top-0 h-full w-4/5 bg-white p-6 overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg">筛选条件</h3>
                      <button onClick={() => setIsMobileFilterOpen(false)}><X size={24} /></button>
                    </div>
                    <FilterSidebar />
                  </div>
                </div>
              )}

              {/* Main Grid */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <Sparkles size={18} className="text-yellow-500 fill-yellow-500" /> 
                    精选平台 <span className="text-slate-400 font-normal text-sm ml-2">({filteredPlatforms.length})</span>
                  </h2>
                </div>

                {filteredPlatforms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredPlatforms.map(platform => (
                      <PlatformCard key={platform.id} platform={platform} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
                    <p className="text-slate-500 mb-2">没有找到符合条件的平台</p>
                    <button onClick={clearFilters} className="text-blue-600 font-medium hover:underline">
                      清空筛选条件
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Tools View */
          <div className="bg-slate-50 min-h-[500px]">
             <ToolSection />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-slate-900 text-white p-1 rounded">
                  <Globe size={16} />
                </div>
                <span className="font-bold text-lg text-slate-900">RemoteHub</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                致力于为全球数字游民和远程工作者提供最全面的资源导航。连接机会，打破地域限制。
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm">关于我们</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600">项目愿景</a></li>
                <li><a href="#" className="hover:text-blue-600">开源贡献</a></li>
                <li><a href="#" className="hover:text-blue-600">隐私政策</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm">联系与合作</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <Mail size={14} />
                  <a href="mailto:yongzhengduan365@gmail.com" className="hover:text-blue-600 transition-colors">
                    yongzhengduan365@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle size={14} />
                  <span>WeChat: _41zcfirsteat</span>
                </li>
                 <li className="mt-4 pt-4 border-t border-slate-100">
                  <a href="mailto:yongzhengduan365@gmail.com?subject=商务合作/提交收录" className="inline-flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700">
                    <span>提交收录 / 商务合作</span>
                    <ExternalLink size={12} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright section removed */}
        </div>
      </footer>

      {/* AI Advisor Chat Button Removed */}
    </div>
  );
};

export default App;
