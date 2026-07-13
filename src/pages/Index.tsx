import { useState, useEffect } from 'react';
import { useTranslation, TranslationProvider } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import {
  Heart, Sprout, Rocket, Shield, Zap, BookOpen, ArrowRight,
  CircleDot, Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { motion } from 'framer-motion';

const STATS = [
  { value: '2.5M+', label: 'Citizens Empowered' },
  { value: '50+', label: 'Govt Schemes' },
  { value: '5', label: 'Core Pillars' },
  { value: '22', label: 'Languages' },
];

const FEATURED_MODULES = [
  { 
    title: 'Ayushman Bharat', 
    desc: 'World\'s largest health insurance — ₹5L cover for 12Cr families', 
    icon: Heart, 
    theme: 'emerald' // For Emerald styling
  },
  { 
    title: 'PM Kisan', 
    desc: '₹6,000 annual income support for all landholding farmers', 
    icon: Sprout, 
    theme: 'orange' // For Saffron styling
  },
  { 
    title: 'Skill India', 
    desc: 'National skill development mission for 40 crore Indians', 
    icon: Rocket, 
    theme: 'blue' // For Ashoka Chakra styling
  },
  { 
    title: 'Beti Bachao Beti Padhao', 
    desc: 'Promoting girl child education and gender equality', 
    icon: Shield, 
    theme: 'rose' // For Pink styling
  },
  { 
    title: 'Mudra Yojana', 
    desc: 'Collateral-free loans up to ₹10L for micro enterprises', 
    icon: Zap, 
    theme: 'amber' // For Yellow styling
  },
  { 
    title: 'Startup India', 
    desc: 'Building India\'s startup ecosystem with 1.1L+ recognized startups', 
    icon: BookOpen, 
    theme: 'indigo' // For Indigo styling
  },
];

const getThemeClasses = (theme: string) => {
  switch(theme) {
    case 'emerald': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'orange': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'blue': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'rose': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    case 'amber': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'indigo': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
    default: return 'bg-white/10 text-white border-white/20';
  }
}

const IndexContent = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] font-sans overflow-hidden relative">
      {/* Import Devanagari Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Noto+Sans+Devanagari:wght@400;600;800&display=swap');
          .font-hindi { font-family: 'Noto Sans Devanagari', sans-serif; }
          .font-hindi-kalam { font-family: 'Kalam', cursive; }
        `}
      </style>

      {/* Deep Radial Ambient Glows (FinTech Lighting) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FF9933] rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#138808] rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none" />

      {/* FinTech Mandala/Geometric Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='none' stroke='%23ffffff' stroke-width='1' stroke-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      <Header isListening={isListening} onVoiceToggle={handleVoiceToggle} />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-32 pt-40 max-w-6xl mx-auto">
        
        {/* Heritage Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 text-slate-300 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-sm flex items-center">
            <CircleDot className="w-4 h-4 mr-2 text-orange-500" />
            <span className="mr-2 border-r border-white/10 pr-2">भारत सरकार</span>
            Government of India
          </div>
        </motion.div>

        {/* Monumental Hero Text (High Contrast) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center leading-tight tracking-tight mb-4 text-white"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontWeight: 800 }}
        >
          Bharat<span className="font-light text-orange-500">Setu</span>
        </motion.h1>

        {/* Hindi Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center text-slate-400 font-hindi-kalam text-2xl md:text-3xl mb-4"
        >
          एक ऐप. पच्चास से अधिक योजनाएं.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-slate-400 text-center max-w-2xl mb-12 text-xl font-medium"
        >
          One app. Fifty+ schemes. Infinite impact.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-20 w-full sm:w-auto"
        >
          <motion.div whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Button
              onClick={() => navigate('/modules')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-white/10 px-8 py-6 text-lg shadow-xl hover:shadow-2xl hover:shadow-blue-900/50 transition-all rounded-full font-semibold"
            >
              <Rocket className="w-5 h-5 mr-3" />
              Launch Modules
            </Button>
          </motion.div>
          
          <motion.div whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Button
              onClick={() => navigate('/register')}
              variant="outline"
              className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 px-8 py-6 text-lg shadow-sm transition-all rounded-full font-semibold backdrop-blur-md"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </motion.div>
        </motion.div>

        {/* FinTech Glassmorphism Stats Cards */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.6 },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
              whileHover={{ y: -2, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/10 shadow-lg relative overflow-hidden group"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 font-mono text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="relative z-10 text-slate-400 text-[10px] font-bold tracking-widest uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Modules with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-24 w-full"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-slate-400 text-xs font-bold tracking-[0.3em] uppercase">
              Featured Initiatives
            </h2>
            <div className="h-px flex-1 bg-white/10 ml-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_MODULES.map((mod, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(mod.route)}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
              >
                {/* Micro-interaction: Tricolor Border Highlight on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-white to-green-600 opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl p-[1px] -z-10" />
                <div className="absolute inset-[1px] bg-[#0B0F19]/90 backdrop-blur-xl rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start gap-4 mt-2">
                  {/* Glowing Circular Container */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${getThemeClasses(mod.theme)} shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-300`}>
                    <mod.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors truncate">
                      {mod.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                      {mod.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Floating Action Button (AI Assistant) */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 z-50 group border border-orange-400/50"
      >
        <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full border border-orange-500 animate-ping opacity-20" />
      </motion.button>

    </div>
  );
};

const Index = () => (
  <TranslationProvider>
    <IndexContent />
  </TranslationProvider>
);

export default Index;
