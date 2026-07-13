import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  Globe, 
  Menu,
  MicOff,
  LogIn,
  X,
  CircleDot
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';
import GoogleTranslate from './GoogleTranslate';

interface HeaderProps {
  isListening?: boolean;
  onVoiceToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isListening = false, onVoiceToggle = () => {} }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 
        Official Government Tricolor Accent Bar 
      */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-gradient-to-r from-orange-500 via-white to-green-600" />
      
      <header className="bg-[#0B0F19]/80 backdrop-blur-md border-b sm:border border-white/10 fixed top-1 sm:top-6 w-full sm:w-[calc(100%-2rem)] sm:max-w-5xl sm:left-1/2 sm:-translate-x-1/2 z-50 shadow-lg transition-all sm:rounded-full">
        <div className="mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Left Side: Branding */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
          >
            {/* Minimalist Geometric 'B' / Chakra Logo */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-blue-400">
              <CircleDot className="w-6 h-6 text-blue-400" />
            </div>
            
            <div className="flex flex-col justify-center">
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
                {t('bharatsetu') || 'BharatSetu'}
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 leading-tight">
                {t('empowering_india') || 'Empowering India'}
              </p>
            </div>
          </div>

          {/* Right Side: Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Translate Button */}
            <div className="relative group flex items-center">
              <div className="flex items-center text-slate-300 hover:text-white transition-colors bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-sm cursor-pointer overflow-hidden shadow-sm">
                <Globe className="w-4 h-4 mr-2 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <span className="font-medium mr-2">21+ Languages</span>
                {/* Embedded Google Translate Widget Overlay */}
                <div className="absolute opacity-0 hover:opacity-100 inset-0 z-10 w-full h-full flex items-center justify-center bg-[#0B0F19]/95 rounded-full border border-white/10">
                   <div className="scale-75 origin-center"><GoogleTranslate /></div>
                </div>
              </div>
            </div>

            {/* Voice Command */}
            <button
              onClick={onVoiceToggle}
              className={`p-2 rounded-full border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm ${
                isListening 
                  ? "bg-red-500/20 border-red-500/30 text-red-400 animate-pulse" 
                  : "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
              }`}
              aria-label={isListening ? "Stop Voice Command" : "Start Voice Command"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* System Status */}
            <div className="flex items-center px-3 py-1.5 bg-white/5 border border-white/10 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Secure</span>
            </div>

            {/* Citizen Login CTA */}
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button
                onClick={() => navigate('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-white border border-white/10 shadow-sm px-6 font-semibold transition-all rounded-full"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Citizen Login
              </Button>
            </motion.div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={onVoiceToggle}
              className={`p-2 rounded-full border transition-colors ${
                isListening 
                  ? "bg-red-500/20 border-red-500/30 text-red-400" 
                  : "bg-white/5 border-white/10 text-slate-300"
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            
            <button 
              className="p-2 text-slate-300 bg-white/5 border border-white/10 rounded-full focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0F19]/95 backdrop-blur-xl pt-20 pb-4 px-4 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {/* Translate Wrapper for Mobile */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
               <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                 Language / भाषा
               </label>
               <GoogleTranslate />
            </div>

            <div className="flex items-center p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3" />
              <span className="text-sm font-medium text-slate-300">Secure Connection</span>
            </div>

            <motion.div whileTap={{ scale: 0.97 }} className="w-full mt-4">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/login');
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Citizen Login
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
