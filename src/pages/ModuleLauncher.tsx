import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Activity, Zap, Shield, Users, Leaf, GraduationCap, Building2, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { Category, CATEGORIES, SCHEMES_DB } from '../data/mockSchemes';

// Category Icon Mapping
const CategoryIcon = ({ category, className }: { category: Category; className?: string }) => {
  switch (category) {
    case 'Yuva': return <Zap className={className} />;
    case 'Nari Shakti': return <Shield className={className} />;
    case 'Krishi & Rural': return <Leaf className={className} />;
    case 'Swasthya': return <Activity className={className} />;
    case 'Arthik & MSME': return <Users className={className} />;
    case 'Infrastructure': return <Building2 className={className} />;
    case 'Education': return <GraduationCap className={className} />;
    default: return <Activity className={className} />;
  }
};

// Category Ribbon Color Mapping
const getCategoryRibbonColor = (category: Category) => {
  switch (category) {
    case 'Yuva': return 'bg-yellow-500';
    case 'Nari Shakti': return 'bg-pink-600';
    case 'Krishi & Rural': return 'bg-emerald-600';
    case 'Swasthya': return 'bg-blue-500';
    case 'Arthik & MSME': return 'bg-orange-500';
    case 'Infrastructure': return 'bg-slate-700';
    case 'Education': return 'bg-indigo-600';
    default: return 'bg-blue-600';
  }
};

// Framer Motion Variants for Staggered List
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Rapid cascading sequence
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.15 } 
  }
};

export const ModuleLauncher: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Cmd+K / Ctrl+K Hook
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter Logic
  const filteredSchemes = useMemo(() => {
    return SCHEMES_DB.filter((scheme) => {
      const matchesCategory = activeCategory === 'All' || scheme.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        scheme.titleEnglish.toLowerCase().includes(q) || 
        scheme.titleHindi.toLowerCase().includes(q) || 
        scheme.description.toLowerCase().includes(q);
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // Compute Category Counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All': filteredSchemes.length };
    CATEGORIES.forEach(c => counts[c] = 0);
    
    const searchFilteredOnly = SCHEMES_DB.filter((scheme) => {
      const q = searchQuery.toLowerCase();
      return scheme.titleEnglish.toLowerCase().includes(q) || 
             scheme.titleHindi.toLowerCase().includes(q) || 
             scheme.description.toLowerCase().includes(q);
    });

    searchFilteredOnly.forEach(s => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-50 flex flex-col overflow-x-hidden transition-colors">
      <Header />

      <main className="relative z-10 flex flex-col flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-28 pb-16">
        
        {/* Hero & Search Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Government Modules
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mb-8">
            Access exactly what you need. Search across 300+ highly optimized government schemes and digital public goods.
          </p>

          <div className="relative group w-full max-w-2xl">
            {/* Search Bar Redesign */}
            <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-lg px-5 py-3 border border-slate-300 dark:border-slate-600 shadow-sm focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 transition-all">
              <Search className="w-6 h-6 text-slate-400 dark:text-slate-500 mr-4 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes (e.g., 'Krishi', 'Scholarship')..."
                className="bg-transparent border-none outline-none text-slate-900 dark:text-white w-full text-lg placeholder:text-slate-400 focus:ring-0"
              />
              {/* Tactile Keyboard Key Badge with whileTap */}
              <motion.div 
                whileTap={{ scale: 0.90 }}
                onClick={() => searchInputRef.current?.focus()}
                className="hidden sm:flex items-center ml-4 px-2.5 py-1 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-[0_2px_0_rgba(203,213,225,1)] dark:shadow-[0_2px_0_rgba(71,85,105,1)] rounded text-slate-500 dark:text-slate-300 text-xs font-mono font-bold cursor-pointer select-none"
              >
                <Command className="w-3 h-3 mr-1" /> K
              </motion.div>
            </div>
          </div>
        </div>

        {/* Underline Category Tabs */}
        <div className="flex gap-6 mb-8 overflow-x-auto pb-0 border-b border-slate-200 dark:border-slate-700 scrollbar-hide justify-start md:justify-center relative">
          
          <button
            onClick={() => setActiveCategory('All')}
            className={`relative flex items-center pb-4 text-sm font-semibold transition-colors whitespace-nowrap outline-none hover:text-slate-900 dark:hover:text-white ${
              activeCategory === 'All' 
                ? 'text-blue-700 dark:text-blue-400' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            All Modules
            <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              {categoryCounts['All'] || 0}
            </span>
            {activeCategory === 'All' && (
              <motion.div 
                layoutId="activeTabUnderline" 
                className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-blue-600 dark:bg-blue-400 rounded-t-sm" 
              />
            )}
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative flex items-center pb-4 text-sm font-semibold transition-colors whitespace-nowrap outline-none hover:text-slate-900 dark:hover:text-white ${
                activeCategory === cat 
                  ? 'text-blue-700 dark:text-blue-400' 
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <CategoryIcon category={cat} className="w-4 h-4 mr-2" />
              {cat}
              <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                {categoryCounts[cat] || 0}
              </span>
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeTabUnderline" 
                  className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-blue-600 dark:bg-blue-400 rounded-t-sm" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Structured Grid Card Layout with Animations */}
        <div className="flex-1 w-full">
          {filteredSchemes.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-64 text-center p-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No Modules Found</h3>
              <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or category filters.</p>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredSchemes.map((scheme) => (
                  <motion.div
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    key={scheme.id}
                    className="group flex flex-col justify-between bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-shadow outline-none focus-within:ring-2 focus-within:ring-blue-600 cursor-pointer h-full relative overflow-hidden"
                    onClick={() => navigate(`/scheme/${scheme.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/scheme/${scheme.id}`)}
                  >
                    {/* Top Structural Category Ribbon */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${getCategoryRibbonColor(scheme.category)}`} />
                    
                    <div className="p-6 pb-5">
                      <div className="flex items-center justify-between gap-3 mb-4 mt-1">
                        <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center">
                          <CategoryIcon category={scheme.category} className="w-3.5 h-3.5 mr-2" />
                          {scheme.category}
                        </span>
                        {!scheme.isActive && (
                          <span className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                            Inactive
                          </span>
                        )}
                      </div>
                      
                      {/* High-contrast Titles */}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {scheme.titleEnglish}
                      </h3>
                      <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 font-vernacular mb-3">
                        {scheme.titleHindi}
                      </h4>
                      {/* Readable muted description */}
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed">
                        {scheme.description}
                      </p>
                    </div>
                    
                    {/* Distinctly Shaded Footer Section for Metrics */}
                    <div className="pt-4 pb-4 px-6 mt-auto bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                          {scheme.metricText}
                        </span>
                        {/* Authoritative Font Weight */}
                        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                          {scheme.metricValue}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white text-slate-400 transition-colors shadow-sm">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ModuleLauncher;
