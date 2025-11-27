
import React, { useState, useMemo } from 'react';
import { Search, Briefcase, Filter, X, SlidersHorizontal, Check } from 'lucide-react';
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
              {lang === 'ALL' ? '全部' : lang === 'CN' ? '国内' : '全球'}
            </button>
          ))}
        </div>
      </div>

      {/* Industries */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">行业领域</h4>
        <div className="space-y-2">
          {INDUSTRIES.map(ind => (
            <label key={ind} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                selectedIndustries.includes(ind) 
                  ? 'bg-blue-600 border-blue-600' 
                  : 'bg-white border-slate-300 group-hover:border-blue-400'
              }`}>
                {selectedIndustries.includes(ind) && <Check size={10} className="text-white" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden"
                checked={selectedIndustries.includes(ind)}
                onChange={() => toggleSelection(ind, selectedIndustries, setSelectedIndustries)}
              />
              <span className={`text-sm ${selectedIndustries.includes(ind) ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                {ind}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Job Types */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">工作性质</h4>
        <div className="flex flex-wrap gap-2">
          {['Full-time', 'Part-time', 'Contract', 'Freelance'].map((type) => (
            <button
              key={type}
              onClick={() => toggleSelection(type as JobType, selectedJobTypes, setSelectedJobTypes)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
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

      {/* Salary Tier */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">收入潜力</h4>
        <div className="flex gap-2">
          {(['$', '$$', '$$$'] as SalaryTier[]).map((tier) => (
            <button
              key={tier}
              onClick={() => toggleSelection(tier, selectedSalaryTiers, setSelectedSalaryTiers)}
              className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                selectedSalaryTiers.includes(tier)
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
              title={tier === '$' ? '入门 / 微任务' : tier === '$$' ? '中等 / 市场价' : '高薪 / 精英'}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Platform Types */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">平台类型</h4>
        <div className="space-y-2">
          {['Job Board', 'Freelance Market', 'Community', 'Aggregator'].map((pt) => (
            <label key={pt} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                selectedPlatformTypes.includes(pt as PlatformType) 
                  ? 'bg-blue-600 border-blue-600' 
                  : 'bg-white border-slate-300 group-hover:border-blue-400'
              }`}>
                {selectedPlatformTypes.includes(pt as PlatformType) && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden"
                checked={selectedPlatformTypes.includes(pt as PlatformType)}
                onChange={() => toggleSelection(pt as PlatformType, selectedPlatformTypes, setSelectedPlatformTypes)}
              />
              <span className={`text-sm ${selectedPlatformTypes.includes(pt as PlatformType) ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                {pt}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg text-white shadow-md">
                <Briefcase size={20} />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 hidden sm:block">
                RemoteHub
              </h1>
            </div>
            
            {/* Search Bar - Centered */}
            <div className="flex-1 max-w-lg">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="搜索平台、技能 (Python, 设计)..."
                  className="block w-full pl-10 pr-4 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg relative"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={20} />
              {activeFilterCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24 shadow-sm">
              <FilterSidebar />
            </div>
          </aside>

          {/* Mobile Drawer */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
              <div className="absolute inset-y-0 right-0 w-[85vw] max-w-sm bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                  <h2 className="font-bold text-lg text-slate-800">筛选条件</h2>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <FilterSidebar />
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50">
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                  >
                    查看 {filteredPlatforms.length} 个结果
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Grid */}
          <main className="flex-1 min-w-0">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-bold text-xl text-slate-800">
                平台列表
                <span className="ml-2 text-sm font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {filteredPlatforms.length}
                </span>
              </h2>
              {/* Optional: Simple Sort could go here */}
            </div>

            {filteredPlatforms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPlatforms.map(platform => (
                  <PlatformCard key={platform.id} platform={platform} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center">
                <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                  <Search size={32} />
                </div>
                <h3 className="text-lg font-medium text-slate-900">未找到符合条件的平台</h3>
                <p className="mt-2 text-slate-500 text-sm">尝试减少筛选条件，或使用更通用的搜索关键词。</p>
                <button 
                  onClick={clearFilters}
                  className="mt-6 px-6 py-2.5 bg-white border border-slate-300 hover:border-blue-400 hover:text-blue-600 text-slate-700 font-medium rounded-lg transition-colors"
                >
                  清空所有筛选
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-2 mb-4">
             <Briefcase className="text-blue-600" size={24} />
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} RemoteHub. 汇集全球优质远程工作资源
          </p>
        </div>
      </footer>

      <AiAdvisor />
    </div>
  );
};

export default App;
