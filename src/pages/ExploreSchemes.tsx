import React, { useState } from 'react';
import { SidebarFilter } from '../components/SidebarFilter';
import { SchemeGrid } from '../components/SchemeGrid';
import { SemanticSearchBar } from '../components/SemanticSearchBar';
import Header from '../components/Header';

const ExploreSchemes: React.FC = () => {
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="min-h-screen bg-[#050507] font-sans pb-24">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-bs-navy/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-bs-green/5 blur-[150px]" />
      </div>

      <Header isListening={isListening} onVoiceToggle={() => setIsListening(!isListening)} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 lg:pt-32">
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Explore 200+ <span className="text-gradient-saffron">Welfare Schemes</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mb-8">
            Filter by categories, search by intent, or let Sahaayak AI guide you to the perfect government scheme based on your profile.
          </p>
          
          <SemanticSearchBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <SidebarFilter />
          
          <div className="flex-1 w-full">
            <SchemeGrid />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExploreSchemes;
