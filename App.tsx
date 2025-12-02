
import React, { useState, useMemo } from 'react';
import { Search, Filter, X, SlidersHorizontal, Check, Mail, Globe, MessageCircle, ExternalLink, Sparkles, Hammer, BarChart, Zap } from 'lucide-react';
import { PLATFORMS, INDUSTRIES, REMOTE_TOOLS, POLL_DATA } from './constants';
import { JobType, PlatformType, SalaryTier } from './types';
import PlatformCard from './components/PlatformCard';
import AiAdvisor from './components/AiAdvisor';

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
  <div className="mt-12 mb-8">
    <div className="flex items-center gap-2 mb-4">
      <Hammer className="text-blue-600" size={20} />
      <h2 className="text-xl font-bold text-slate-900">远程工作必备工具</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {REMOTE_TOOLS.map((tool) => (
        <a 
          key={tool.id} 
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`block bg-white rounded-xl border p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group ${
            tool.recommended ? 'border-blue-300 ring-1 ring-blue-100' : 'border-slate-200'
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className={`text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block ${
              tool.recommended ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {tool.category}
            </div>
            {tool.recommended && <Zap size={14} className="text-amber-500 fill-amber-500" />}
          </div>
          
          <h3 className={`font-bold text-sm mb-1 ${tool.recommended ? 'text-blue-700' : 'text-slate-900'}`}>
            {tool.name}
          </h3>
          <p className="text-xs text-slate-600 mb-3 leading-relaxed h-10 line-clamp-2">{tool.description}</p>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
             <span>访问官网</span>
             <ExternalLink size={10} />
          </div>
        </a>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
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
    <div className="space-y-8">
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
              <span className={`text-sm ${selectedPlatformTypes.includes(type as PlatformType) ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                {type}
              </span>
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
              className={`flex-1 py-1.5 text-xs font-bold rounded-md border transition-colors ${
                selectedSalaryTiers.includes(tier as SalaryTier)
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Poll Widget in Sidebar */}
      <div className="pt-6 border-t border-slate-200">
        <PollWidget />
      </div>

    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-blue-200 shadow-lg">
              R
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 hidden sm:block">
              RemoteHub
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all sm:text-sm"
              placeholder="搜索平台、技能或关键字..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <SlidersHorizontal size={20} />
            {activeFilterCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white"></span>
            )}
          </button>

          {/* Github / About Link */}
          <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900">
             <Globe size={16} />
             <span>About</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        
        {/* HERO SECTION: Value Proposition (FLATTENED) */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl p-6 mb-8 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 bg-blue-600/50 px-2.5 py-0.5 rounded-full text-[10px] font-medium text-blue-100 mb-2 border border-blue-500/50">
                <Sparkles size={10} />
                <span>2024 Remote Work Guide</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                全球远程工作机会与资源，<br/>一站式枢纽
              </h1>
              <p className="text-blue-100 text-sm md:text-base max-w-xl leading-relaxed opacity-90">
                汇集 Upwork、电鸭、Toptal 等全球顶尖远程平台，提供专业的求职指南与工具，助你开启自由职业之旅。
              </p>
            </div>
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-24 -mt-24"></div>
            <div className="absolute bottom-0 right-12 w-32 h-32 bg-indigo-400 opacity-10 rounded-full blur-xl"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Mobile Sidebar Drawer */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
              <div className="absolute inset-y-0 right-0 w-80 bg-white shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-bold">筛选条件</h2>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 hover:bg-slate-100 rounded-full">
                    <X size={24} className="text-slate-500" />
                  </button>
                </div>
                <FilterSidebar />
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200"
                  >
                    显示 {filteredPlatforms.length} 个结果
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                {searchQuery ? '搜索结果' : '精选平台'} 
                <span className="ml-2 text-sm font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {filteredPlatforms.length}
                </span>
              </h2>
            </div>

            {filteredPlatforms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPlatforms.map(platform => (
                  <PlatformCard key={platform.id} platform={platform} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-slate-400" size={32} />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">没有找到相关平台</h3>
                <p className="text-slate-500 text-sm mb-4">尝试调整筛选条件或搜索关键词</p>
                <button 
                  onClick={clearFilters}
                  className="text-blue-600 font-medium hover:underline"
                >
                  清空所有筛选
                </button>
              </div>
            )}

            {/* Tool Section (Replaces Articles) */}
            <ToolSection />

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  R
                </div>
                <span className="text-xl font-bold text-slate-900">RemoteHub</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                帮助全球数字游民和远程工作者发现最好的机会。连接人才与未来工作方式。
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-slate-900 mb-4">联系我们</h4>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-slate-400" />
                  <a href="mailto:yongzhengduan365@gmail.com" className="hover:text-blue-600">
                    yongzhengduan365@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-slate-400" />
                  <span>WeChat: _41zcfirsteat</span>
                </div>
              </div>
            </div>

            {/* Business */}
            <div>
              <h4 className="font-bold text-slate-900 mb-4">商务合作</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="mailto:yongzhengduan365@gmail.com?subject=Platform%20Submission" className="hover:text-blue-600 flex items-center gap-1">
                    提交收录 <ExternalLink size={12} />
                  </a>
                </li>
                <li>
                  <a href="mailto:yongzhengduan365@gmail.com?subject=Business%20Cooperation" className="hover:text-blue-600">
                    广告投放
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} RemoteHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Advisor Chat Widget */}
      <AiAdvisor />
    </div>
  );
};

export default App;
