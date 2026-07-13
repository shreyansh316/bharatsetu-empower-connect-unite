import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Phone, Mail, Shield, Chrome, ArrowLeft, ArrowRight,
  Sparkles, Search, UserPlus, Lock, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PhoneOTPRegister from '@/components/auth/PhoneOTPRegister';
import EmailPasswordRegister from '@/components/auth/EmailPasswordRegister';
import DigiLockerRegister from '@/components/auth/DigiLockerRegister';
import GoogleRegister from '@/components/auth/GoogleRegister';

const TAB_CONFIG = [
  { id: 'phone', label: 'Phone', icon: Phone, tint: '#22d3ee' },
  { id: 'email', label: 'Email', icon: Mail, tint: '#a78bfa' },
  { id: 'digilocker', label: 'DigiLocker', icon: Shield, tint: '#fb923c' },
  { id: 'google', label: 'Google', icon: Chrome, tint: '#f472b6' },
];

const Register = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('phone');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 3D tilt
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }, []);

  const currentTint = TAB_CONFIG.find(t => t.id === activeTab)?.tint || '#22d3ee';

  return (
    <div className="min-h-screen aurora-bg aurora-animated noise-overlay relative overflow-hidden flex items-center justify-center">
      {/* Ambient Orbs */}
      <div className="orb w-[500px] h-[500px] -top-32 -right-20" style={{ background: '#6C22A6', filter: 'blur(120px)', opacity: 0.3 }} />
      <div className="orb w-[400px] h-[400px] bottom-0 -left-16" style={{ background: '#00E5FF', filter: 'blur(100px)', opacity: 0.25, animationDelay: '8s' }} />
      <div
        className="orb w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: currentTint, filter: 'blur(140px)', opacity: 0.12, transition: 'background 0.8s ease' }}
      />

      {/* Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0" style={{ overflow: 'hidden' }}>
        <span className="text-gradient-hero" style={{ fontSize: 'clamp(6rem, 20vw, 14rem)', fontWeight: 100, opacity: 0.04, mixBlendMode: 'overlay' as any }}>
          BharatSetu
        </span>
      </div>

      {/* Navigation Island */}
      <nav className={`nav-island flex items-center gap-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <button onClick={() => navigate('/')} className="text-white/50 hover:text-white/90 transition-colors flex items-center gap-1.5 text-xs">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Home</span>
        </button>
        <div className="h-5 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-white/90 text-sm tracking-wide">Register</span>
        </div>
        <div className="h-5 w-px bg-white/10" />
        <button onClick={() => navigate('/login')} className="text-white/40 hover:text-white/80 transition-colors text-xs">
          Sign In
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[440px] px-4">
        {/* Glass Terminal */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`
            w-full glass-strong spotlight-border rounded-3xl overflow-hidden tilt-card
            transition-all duration-1000
            ${loaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}
          `}
          style={{
            boxShadow: `0 24px 80px rgba(0,0,0,0.5), 0 0 60px ${currentTint}10`,
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.6s ease, opacity 0.8s ease',
          }}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-400/20 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <UserPlus className="w-6 h-6 text-white/70" />
              </div>
              <h2 className="text-white/90 font-semibold text-xl mb-1">Create Account</h2>
              <p className="text-white/30 text-xs tracking-[0.2em] uppercase">
                Join the BharatSetu ecosystem
              </p>
            </div>

            {/* Segmented Control */}
            <div className="glass rounded-2xl p-1 flex mb-8 relative">
              <div
                className="absolute top-1 bottom-1 rounded-xl transition-all duration-300"
                style={{
                  width: `${100 / TAB_CONFIG.length}%`,
                  left: `${TAB_CONFIG.findIndex(t => t.id === activeTab) * (100 / TAB_CONFIG.length)}%`,
                  background: `${currentTint}20`,
                  boxShadow: `0 0 20px ${currentTint}15`,
                }}
              />
              {TAB_CONFIG.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 relative z-10 transition-colors duration-300 ${
                    activeTab === tab.id ? 'text-white' : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  <tab.icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="space-y-4 [&_input]:bg-white/[0.04] [&_input]:border-white/10 [&_input]:text-white [&_input]:placeholder:text-white/20 [&_input]:rounded-xl [&_input]:font-mono-stat [&_label]:text-white/50 [&_label]:text-xs [&_label]:tracking-wider [&_label]:uppercase focus-within:[&_input]:border-cyan-400/50 focus-within:[&_input]:bg-white/[0.08] [&_input]:transition-all [&_input]:duration-300">
              {activeTab === 'phone' && <PhoneOTPRegister />}
              {activeTab === 'email' && <EmailPasswordRegister />}
              {activeTab === 'digilocker' && <DigiLockerRegister />}
              {activeTab === 'google' && <GoogleRegister />}
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        {/* Sign in link */}
        <div className={`mt-6 text-center transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-white/25 text-xs">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-white/60 hover:text-white transition-colors font-medium">
              Sign In
            </button>
          </p>
          <p className="text-white/15 text-[10px] mt-3">
            By registering, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[1]" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
      }} />
    </div>
  );
};

export default Register;
