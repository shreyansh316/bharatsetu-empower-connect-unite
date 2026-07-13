import React from 'react';
import { SCHEME_PILLARS } from '../constants/categories';
import { useSchemeStore } from '../store/schemeStore';
import { useSearchParams } from 'react-router-dom';

export const SidebarFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activePillars = useSchemeStore((state) => state.activePillars);
  const togglePillar = useSchemeStore((state) => state.togglePillar);

  // Sync URL query params with state for shareable links
  React.useEffect(() => {
    const pillarsParam = searchParams.get('pillars');
    if (pillarsParam) {
      const pillars = pillarsParam.split(',');
      pillars.forEach(p => {
        if (!activePillars.includes(p)) {
          togglePillar(p);
        }
      });
    }
  }, []);

  const handleToggle = (id: string) => {
    togglePillar(id);
    
    // Update URL
    const newActive = activePillars.includes(id) 
      ? activePillars.filter(p => p !== id) 
      : [...activePillars, id];
      
    if (newActive.length > 0) {
      searchParams.set('pillars', newActive.join(','));
    } else {
      searchParams.delete('pillars');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-24 h-max glass-strong rounded-3xl p-5 border border-white/5 bg-[#050507]/40 backdrop-blur-[24px]">
      <h3 className="text-white/90 font-semibold mb-4 flex items-center justify-between">
        Categories
        <span className="text-xs font-normal text-white/40 bg-white/5 px-2 py-0.5 rounded-md">
          {activePillars.length} Selected
        </span>
      </h3>
      
      <div className="space-y-2">
        {SCHEME_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          const isActive = activePillars.includes(pillar.id);
          
          return (
            <button
              key={pillar.id}
              onClick={() => handleToggle(pillar.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-white/10' 
                  : 'hover:bg-white/5 text-white/60 hover:text-white/90'
              }`}
              style={{
                boxShadow: isActive ? `inset 0 0 0 1px ${pillar.color}40, 0 0 20px ${pillar.color}10` : 'none',
              }}
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ 
                  background: isActive ? `${pillar.color}20` : 'rgba(255,255,255,0.05)',
                  color: isActive ? pillar.color : 'currentColor'
                }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-sm ${isActive ? 'text-white font-medium' : ''}`}>
                {pillar.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
