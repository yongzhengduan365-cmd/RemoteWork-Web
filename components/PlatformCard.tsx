
import React from 'react';
import { ExternalLink, Globe, Tag, Briefcase, DollarSign } from 'lucide-react';
import { Platform } from '../types';

interface PlatformCardProps {
  platform: Platform;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ platform }) => {
  // Helper to render salary tier dots
  const renderSalaryTier = (tier: string) => {
    const level = tier.length; // '$' = 1, '$$' = 2, '$$$' = 3
    return (
      <div className="flex gap-0.5" title={`Income Potential: ${tier}`}>
        {[1, 2, 3].map((i) => (
          <DollarSign 
            key={i} 
            size={12} 
            className={`${i <= level ? 'text-green-600 fill-green-600' : 'text-slate-200'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden relative">
      {/* Top Banner for Popular items */}
      {platform.popular && (
        <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
          POPULAR
        </div>
      )}

      <div className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div 
            className="w-12 h-12 shrink-0 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm"
            style={{ backgroundColor: platform.logoColor }}
          >
            {platform.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors truncate">
              {platform.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-medium">
                {platform.platformType}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {platform.language === 'CN' ? '🇨🇳 国内' : '🌏 Global'}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed h-10">
          {platform.description}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-slate-500 mb-5 bg-slate-50 p-3 rounded-lg">
          <div className="col-span-2 flex items-center gap-2">
             <Briefcase size={12} className="text-slate-400" />
             <span className="truncate">{platform.jobTypes.join(', ')}</span>
          </div>
          <div className="col-span-2 flex items-center justify-between">
            <span className="text-slate-400">收入潜力:</span>
            {renderSalaryTier(platform.salaryTier)}
          </div>
        </div>

        {/* Tags & Action - Pushed to bottom */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1.5 mb-4 h-12 overflow-hidden content-start">
            {platform.industries.slice(0, 2).map((ind, idx) => (
              <span key={`ind-${idx}`} className="text-[10px] font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">
                {ind}
              </span>
            ))}
            {platform.tags.slice(0, 2).map((tag, idx) => (
              <span key={`tag-${idx}`} className="flex items-center text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                <Tag size={8} className="mr-1 opacity-50" />
                {tag}
              </span>
            ))}
          </div>
          
          <a 
            href={platform.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 hover:border-blue-600 font-medium py-2 rounded-lg transition-all text-sm group-hover:shadow-md"
          >
            访问平台 <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;
