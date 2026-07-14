import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText, Users, ShieldCheck, Activity, Star,
  Mic, Search, Bell, LogOut, ChevronRight, Landmark
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Ashoka Chakra Watermark SVG
   ───────────────────────────────────────────── */
const AshokaChakraWatermark = () => (
  <svg
    viewBox="0 0 100 100"
    className="fixed -bottom-32 -right-32 w-[600px] h-[600px] text-slate-400 opacity-5 pointer-events-none select-none z-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <circle cx="50" cy="50" r="46" />
    <circle cx="50" cy="50" r="8" fill="currentColor" />
    {Array.from({ length: 24 }).map((_, i) => (
      <line
        key={i}
        x1="50"
        y1="50"
        x2={50 + 46 * Math.cos((i * 15 * Math.PI) / 180)}
        y2={50 + 46 * Math.sin((i * 15 * Math.PI) / 180)}
        strokeWidth="1"
      />
    ))}
  </svg>
);

/* ─────────────────────────────────────────────
   NLP-Powered Civic Omnibar
   ───────────────────────────────────────────── */
const CivicOmnibar = ({ onSignOut }: { onSignOut: () => void }) => {
  return (
    <header className="fixed top-1.5 left-0 right-0 z-50 flex justify-center pt-4 px-6 pointer-events-none">
      <div className="w-full max-w-7xl flex items-center justify-between gap-4 pointer-events-auto">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group transition-opacity hover:opacity-80 bg-white shadow-sm border border-slate-200 px-4 py-2 rounded-xl">
          <div className="relative flex items-center justify-center w-8 h-8">
             <svg viewBox="0 0 100 100" className="w-6 h-6 text-[#000080]" fill="none" stroke="currentColor" strokeWidth="2">
               <circle cx="50" cy="50" r="46" />
               <circle cx="50" cy="50" r="8" fill="currentColor" />
               {Array.from({ length: 24 }).map((_, i) => (
                 <line key={i} x1="50" y1="50" x2={50 + 46 * Math.cos((i * 15 * Math.PI) / 180)} y2={50 + 46 * Math.sin((i * 15 * Math.PI) / 180)} strokeWidth="1" />
               ))}
             </svg>
          </div>
          <div>
            <h1 className="text-slate-900 font-bold text-lg tracking-tight leading-none">BharatSetu</h1>
            <p className="text-slate-500 text-[10px] uppercase font-semibold tracking-wider">Command Center</p>
          </div>
        </Link>

        {/* Neural Omnibar */}
        <div className="flex-1 max-w-2xl bg-white rounded-full border border-slate-200 shadow-sm flex items-center px-6 py-3 relative group">
          <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
          
          <div className="flex-1 flex items-center">
            <span className="text-sm font-medium text-slate-700">
              Ask your AI Civic Assistant...
            </span>
            <span className="ml-2 text-xs text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 bg-slate-50">
              Ctrl+K
            </span>
          </div>

          {/* Audio Wave Visualizer */}
          <div className="flex items-center gap-1 ml-4 h-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-[#000080] rounded-full opacity-80"
                animate={{ height: ['40%', '100%', '30%', '80%', '40%'] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center ml-4 hover:bg-slate-200 transition-colors border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#000080]">
            <Mic className="w-4 h-4 text-[#000080]" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <button className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors relative focus:outline-none focus:ring-2 focus:ring-[#000080]">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full" />
          </button>
          <button
            onClick={onSignOut}
            className="flex items-center gap-2 px-4 h-11 rounded-xl text-slate-600 hover:text-red-600 bg-white border border-slate-200 shadow-sm hover:bg-red-50 hover:border-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-semibold hidden sm:inline">Sign Out</span>
          </button>
        </div>

      </div>
    </header>
  );
};

/* ─────────────────────────────────────────────
   Stat Card
   ───────────────────────────────────────────── */
const StatCard = ({
  icon: Icon, labelEn, labelHi, value, colorHex, bgColorClass, iconColorClass
}: {
  icon: React.ElementType, labelEn: string, labelHi: string, value: string, colorHex: string, bgColorClass: string, iconColorClass: string
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColorClass}`}>
           <Icon className={`w-6 h-6 ${iconColorClass}`} strokeWidth={2} />
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-slate-900 tracking-tight">{value}</span>
        </div>
      </div>
      <div>
        <h3 className="text-slate-700 font-semibold text-sm">{labelEn}</h3>
        <h4 className="text-slate-500 font-medium text-xs mt-0.5">{labelHi}</h4>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Interactive "India Stack" Topology Map
   ───────────────────────────────────────────── */
const TopologyMapWidget = () => {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between mb-6 z-10">
        <div>
          <h3 className="text-slate-900 font-bold tracking-tight text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#000080]" /> Civic Data Topology
          </h3>
          <p className="text-slate-500 text-sm mt-1">Live structural network across official nodes</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-md text-green-700 text-xs font-semibold">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           System Active
        </div>
      </div>
      
      <div className="flex-1 relative min-h-[250px] flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100">
        {/* Minimalist vector map of India abstraction */}
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-[300px]">
          {/* Solid Base Map Shape (Abstracted) */}
          <path 
            d="M 60 40 L 90 20 L 120 40 L 140 80 L 130 140 L 100 180 L 70 130 L 50 80 Z" 
            fill="#e2e8f0" 
            stroke="#cbd5e1" 
            strokeWidth="2" 
            strokeLinejoin="round" 
          />
          
          {/* Structural Network Lines */}
          <path d="M 90 20 L 60 80 L 100 150 L 130 90 Z" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M 60 80 L 130 90" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M 90 20 L 100 150" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Secure Civic Nodes (Saffron) */}
          <circle cx="90" cy="20" r="4" fill="#f97316" className="animate-pulse" /> {/* Delhi */}
          <circle cx="60" cy="80" r="4" fill="#f97316" className="animate-pulse" /> {/* Mumbai */}
          <circle cx="100" cy="150" r="4" fill="#f97316" className="animate-pulse" /> {/* Bangalore */}
          <circle cx="130" cy="90" r="4" fill="#f97316" className="animate-pulse" /> {/* Kolkata */}
        </svg>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Official Quick Commands
   ───────────────────────────────────────────── */
const QuickCommandBtn = ({ title, desc, icon: Icon, colorClass, bgClass }: { title: string, desc: string, icon: React.ElementType, colorClass: string, bgClass: string }) => {
  return (
    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors group focus:outline-none focus:ring-2 focus:ring-[#000080]">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bgClass}`}>
          <Icon className={`w-5 h-5 ${colorClass}`} />
        </div>
        <div className="text-left">
          <span className="block text-slate-900 font-semibold text-sm">{title}</span>
          <span className="block text-slate-500 text-xs mt-0.5">{desc}</span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
    </button>
  );
};

/* ═════════════════════════════════════════════
   DASHBOARD PAGE - PRISTINE OFFICIAL
   ═════════════════════════════════════════════ */
const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login', { replace: true });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans select-none">
      
      {/* ── Tricolor Accent Bar ── */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-green-600 fixed top-0 left-0 z-[60] shadow-sm" aria-hidden="true" />

      {/* Background Watermark */}
      <AshokaChakraWatermark />

      <CivicOmnibar onSignOut={handleSignOut} />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          
          {/* Identity Plate */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-slate-200 pb-8">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 mb-4">
                <Landmark className="w-4 h-4 text-[#000080]" />
                <span className="text-[#000080] text-xs font-bold tracking-widest uppercase">Citizen Portal Access</span>
              </div>
              <h2 className="text-slate-900 text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                Welcome, Citizen <span className="text-slate-300 font-light text-2xl">|</span> <span className="font-serif text-[#000080] text-2xl">नमस्ते</span>
              </h2>
              <p className="text-slate-600 text-sm font-medium">
                ID: IN-BHRT-99X2 • Secure Session Active
              </p>
            </motion.div>
            
            {/* Pristine Aadhaar Verified Badge */}
            <motion.div variants={itemVariants} className="flex-shrink-0">
              <div className="bg-white border border-slate-200 shadow-sm rounded-xl px-5 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 text-sm font-bold tracking-wide uppercase">Aadhaar Verified</span>
                  <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest mt-0.5">Absolute Trust</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Authoritative Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={FileText} labelEn="Active Applications" labelHi="सक्रिय आवेदन" value="3" colorHex="#3B82F6" bgColorClass="bg-blue-50" iconColorClass="text-blue-600" />
            <StatCard icon={Users} labelEn="Linked Family" labelHi="जुड़ा हुआ परिवार" value="4" colorHex="#8B5CF6" bgColorClass="bg-purple-50" iconColorClass="text-purple-600" />
            <StatCard icon={Star} labelEn="Schemes Enrolled" labelHi="नामांकित योजनाएं" value="7" colorHex="#F97316" bgColorClass="bg-orange-50" iconColorClass="text-orange-600" />
            <StatCard icon={Activity} labelEn="System Syncs" labelHi="सिस्टम सिंक" value="12" colorHex="#10B981" bgColorClass="bg-green-50" iconColorClass="text-green-600" />
          </motion.div>

          {/* Action Command & Topology Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Quick Commands */}
            <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col">
              <h3 className="text-slate-900 font-bold tracking-tight text-lg mb-4 flex items-center gap-2">
                Quick Commands
              </h3>
              <div className="space-y-3 flex-1 flex flex-col">
                <QuickCommandBtn 
                  title="Explore Schemes" 
                  desc="AI-matched welfare benefits" 
                  icon={Search} 
                  colorClass="text-blue-600" 
                  bgClass="bg-blue-50" 
                />
                <QuickCommandBtn 
                  title="Document Vault" 
                  desc="Secure DigiLocker integration" 
                  icon={FileText} 
                  colorClass="text-orange-600" 
                  bgClass="bg-orange-50" 
                />
                <QuickCommandBtn 
                  title="Family Services" 
                  desc="Manage dependants & household" 
                  icon={Users} 
                  colorClass="text-purple-600" 
                  bgClass="bg-purple-50" 
                />
                <QuickCommandBtn 
                  title="Help & Support" 
                  desc="Contact civic authorities" 
                  icon={ShieldCheck} 
                  colorClass="text-emerald-600" 
                  bgClass="bg-emerald-50" 
                />
              </div>
            </motion.div>

            {/* Topology Map */}
            <motion.div variants={itemVariants} className="lg:col-span-2 flex">
              <TopologyMapWidget />
            </motion.div>

          </div>
          
        </motion.div>
      </main>

      {/* ── Official Trust Footer ── */}
      <footer className="border-t border-slate-200 mt-10 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-semibold tracking-wide">
            © 2026 BharatSetu — Government of India
          </p>
          <div className="flex items-center gap-6 text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <button className="hover:text-slate-900 transition-colors">Privacy Policy</button>
            <button className="hover:text-slate-900 transition-colors">Terms of Service</button>
            <button className="hover:text-slate-900 transition-colors">Help Center</button>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Dashboard;
