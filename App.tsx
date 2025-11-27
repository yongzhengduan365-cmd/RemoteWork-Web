
import React, { useState, useMemo } from 'react';
import { Search, Briefcase, Filter, X, SlidersHorizontal, Check, Mail, Globe, MessageCircle, ExternalLink } from 'lucide-react';
import { PLATFORMS, INDUSTRIES } from './constants';
import { JobType, PlatformType, SalaryTier } from './types';
import PlatformCard from './components/PlatformCard';
import AiAdvisor from './components/AiAdvisor';

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

          {/* Github / About Link (Placeholder) */}
          <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900">
             <Globe size={16} />
             <span>About</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
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
                {searchQuery ? '搜索结果' : '所有平台'} 
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
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">R</div>
                <span className="font-bold text-slate-800 text-lg">RemoteHub</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                致力于为全球数字游民、自由职业者和远程工作者提供最全面的平台导航服务。发现机会，连接世界。
              </p>
              <div className="text-xs text-slate-400">
                &copy; {new Date().getFullYear()} RemoteHub. All rights reserved.
              </div>
            </div>

            {/* Contact Section - UPDATED */}
            <div className="col-span-1">
              <h4 className="font-bold text-slate-900 mb-4">联系我们 / Contact</h4>
              <div className="space-y-3">
                 <div className="flex items-start gap-3 text-sm text-slate-600 group">
                    <Mail size={18} className="text-slate-400 group-hover:text-blue-500 mt-0.5 transition-colors" />
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">Email</div>
                      <a href="mailto:yongzhengduan365@gmail.com" className="hover:text-blue-600 font-medium transition-colors break-all">
                        yongzhengduan365@gmail.com
                      </a>
                    </div>
                 </div>
                 <div className="flex items-start gap-3 text-sm text-slate-600 group">
                    <MessageCircle size={18} className="text-slate-400 group-hover:text-green-500 mt-0.5 transition-colors" />
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">WeChat</div>
                      <span className="font-medium hover:text-green-600 transition-colors cursor-text selection:bg-green-100">
                        _41zcfirsteat
                      </span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Cooperation & Links */}
            <div className="col-span-1">
              <h4 className="font-bold text-slate-900 mb-4">商务合作 / Business</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="mailto:yongzhengduan365@gmail.com?subject=Platform Submission" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
                    <Check size={16} className="text-blue-500" />
                    <span>提交新平台收录</span>
                  </a>
                </li>
                 <li>
                  <a href="mailto:yongzhengduan365@gmail.com?subject=Business Inquiry" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
                    <ExternalLink size={16} className="text-blue-500" />
                    <span>广告与置顶合作</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AiAdvisor />
    </div>
  );
};

export default App;
