import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Phone, Mail, Shield, Chrome, ArrowRight, ArrowLeft,
  Bot, Lock, Eye, Sparkles, Search, CheckCircle,
  AlertTriangle, Fingerprint
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import PhoneOTPLogin from '@/components/auth/PhoneOTPLogin';
import EmailPasswordLogin from '@/components/auth/EmailPasswordLogin';
import DigiLockerLogin from '@/components/auth/DigiLockerLogin';
import GoogleLogin from '@/components/auth/GoogleLogin';
import HumanVerification from '@/components/auth/HumanVerification';

const TAB_CONFIG = [
  { id: 'phone', label: 'Phone', icon: Phone, tint: '#22d3ee' },
  { id: 'email', label: 'Email', icon: Mail, tint: '#a78bfa' },
  { id: 'digilocker', label: 'DigiLocker', icon: Shield, tint: '#fb923c' },
  { id: 'google', label: 'Google', icon: Chrome, tint: '#f472b6' },
];

const SECURITY_STATS = [
  { label: 'Encryption', value: 'AES-256', icon: Lock },
  { label: 'Uptime', value: '99.99%', icon: Eye },
  { label: 'AI Shield', value: 'Active', icon: Bot },
  { label: 'MFA', value: 'Enabled', icon: Fingerprint },
];

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState('phone');
  const [showHumanVerification, setShowHumanVerification] = useState(false);
  const [verificationLevel, setVerificationLevel] = useState<'basic' | 'advanced' | 'biometric'>('basic');
  const [isVerified, setIsVerified] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        navigate('/modules');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // 3D tilt
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }, []);

  const handleSuccessfulLogin = () => {
    setIsLoggingIn(true);
    toast({
      title: "Login Successful",
      description: "Welcome back! Routing to your dashboard...",
    });
    setTimeout(() => navigate('/account'), 1500);
  };

  const handleLoginAttempt = () => {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);
    if (newAttempts >= 3) {
      setVerificationLevel('advanced');
      setShowHumanVerification(true);
    } else if (newAttempts >= 2) {
      setVerificationLevel('basic');
      setShowHumanVerification(true);
    } else {
      handleSuccessfulLogin();
    }
  };

  const handleVerificationComplete = (verified: boolean) => {
    setIsVerified(verified);
    setShowHumanVerification(false);
    if (verified) handleSuccessfulLogin();
  };

  const currentTint = TAB_CONFIG.find(t => t.id === activeTab)?.tint || '#22d3ee';

  return (
    <div className="min-h-screen aurora-bg aurora-animated noise-overlay relative overflow-hidden flex items-center justify-center">
      {/* ── Ambient Orbs ── */}
      <div className="orb w-[500px] h-[500px] -top-32 -left-20" style={{ background: '#6C22A6', filter: 'blur(120px)', opacity: 0.35 }} />
      <div className="orb w-[400px] h-[400px] bottom-0 -right-16" style={{ background: '#00E5FF', filter: 'blur(100px)', opacity: 0.3, animationDelay: '8s' }} />
      {/* Backlight orb behind card */}
      <div
        className="orb w-[350px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: currentTint, filter: 'blur(140px)', opacity: 0.15, transition: 'background 0.8s ease' }}
      />

      {/* ── Massive Background Watermark ── */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        style={{ overflow: 'hidden' }}
      >
        <span
          className="text-gradient-hero"
          style={{
            fontSize: 'clamp(6rem, 20vw, 14rem)',
            fontWeight: 100,
            opacity: 0.04,
            letterSpacing: '0.05em',
            mixBlendMode: 'overlay' as any,
          }}
        >
          BharatSetu
        </span>
      </div>

      {/* ── Floating Navigation Island ── */}
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
          <span className="font-semibold text-white/90 text-sm tracking-wide">Login</span>
        </div>
        <div className="h-5 w-px bg-white/10" />
        <button className="text-white/30 hover:text-white/60 transition-colors flex items-center gap-1.5 text-xs">
          <Search className="w-3 h-3" />
          <kbd className="hidden md:inline text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono-stat glow-badge" style={{ boxShadow: '0 0 8px rgba(139,92,246,0.3)' }}>⌘K</kbd>
        </button>
        <div className="h-5 w-px bg-white/10 hidden sm:block" />
        <Badge className="glow-badge bg-white/5 border border-white/10 text-green-300 text-[10px] px-2 py-0.5 rounded-full hidden sm:flex">
          <Shield className="w-2.5 h-2.5 mr-1" /> Gov Verified
        </Badge>
      </nav>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-[440px] px-4 flex flex-col items-center">

        {/* ── Floating Security Stat Bubbles ── */}
        <div className={`absolute -top-4 -left-20 hidden lg:block transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          {SECURITY_STATS.slice(0, 2).map((stat, i) => (
            <div key={i} className="glass rounded-2xl px-4 py-3 mb-3 flex items-center gap-3 hover-lift" style={{ animationDelay: `${i * 200}ms` }}>
              <stat.icon className="w-4 h-4 text-white/40" />
              <div>
                <div className="font-mono-stat text-xs text-white/70 font-medium">{stat.value}</div>
                <div className="text-[10px] text-white/30 tracking-wider uppercase">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={`absolute -top-4 -right-20 hidden lg:block transition-all duration-1000 delay-900 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          {SECURITY_STATS.slice(2).map((stat, i) => (
            <div key={i} className="glass rounded-2xl px-4 py-3 mb-3 flex items-center gap-3 hover-lift" style={{ animationDelay: `${(i + 2) * 200}ms` }}>
              <stat.icon className="w-4 h-4 text-white/40" />
              <div>
                <div className="font-mono-stat text-xs text-white/70 font-medium">{stat.value}</div>
                <div className="text-[10px] text-white/30 tracking-wider uppercase">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Glass Login Terminal ── */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`
            w-full glass-strong spotlight-border rounded-3xl overflow-hidden
            tilt-card transition-all duration-1000
            ${loaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}
            ${isLoggingIn ? 'scale-105 opacity-0' : ''}
          `}
          style={{
            boxShadow: `0 24px 80px rgba(0,0,0,0.5), 0 0 60px ${currentTint}10`,
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.6s ease, opacity 0.8s ease, scale 0.8s ease',
          }}
        >
          {/* Specular top highlight */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h2
                className="text-white/90 font-semibold mb-1"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}
              >
                Welcome Back
              </h2>
              <p className="text-white/30 text-xs tracking-[0.2em] uppercase">
                Advanced Secure Login Portal
              </p>
            </div>

            {/* ── Segmented Control Pill ── */}
            <div className="glass rounded-2xl p-1 flex mb-8 relative">
              {/* Sliding active pill */}
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

            {/* Login Attempts Warning */}
            {loginAttempts > 0 && !showHumanVerification && (
              <div className="mb-6 glass rounded-xl p-3 flex items-center gap-3 border border-amber-500/20">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <p className="text-xs text-amber-200/80">
                  {loginAttempts} attempt(s) detected.{loginAttempts >= 2 && ' Human verification required.'}
                </p>
              </div>
            )}

            {/* ── Form Content ── */}
            {showHumanVerification ? (
              <HumanVerification
                onVerificationComplete={handleVerificationComplete}
                verificationLevel={verificationLevel}
              />
            ) : (
              <div>
                {/* Auth form components — already styled by their own files */}
                <div className="space-y-4 [&_input]:bg-white/[0.04] [&_input]:border-white/10 [&_input]:text-white [&_input]:placeholder:text-white/20 [&_input]:rounded-xl [&_input]:font-mono-stat [&_label]:text-white/50 [&_label]:text-xs [&_label]:tracking-wider [&_label]:uppercase focus-within:[&_input]:border-cyan-400/50 focus-within:[&_input]:bg-white/[0.08] [&_input]:transition-all [&_input]:duration-300">
                  {activeTab === 'phone' && <PhoneOTPLogin />}
                  {activeTab === 'email' && <EmailPasswordLogin />}
                  {activeTab === 'digilocker' && <DigiLockerLogin />}
                  {activeTab === 'google' && <GoogleLogin />}
                </div>
              </div>
            )}
          </div>

          {/* Bottom specular */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        {/* ── Register link (outside card) ── */}
        <div className={`mt-6 text-center transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-white/25 text-xs">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-white/60 hover:text-white transition-colors font-medium"
            >
              Register Now
            </button>
          </p>
        </div>

        {/* ── Verified badge ── */}
        {isVerified && (
          <div className="mt-4">
            <Badge className="glass rounded-full text-green-300 text-[10px] px-3 py-1 border border-green-500/20">
              <CheckCircle className="w-3 h-3 mr-1.5" /> Human Verified
            </Badge>
          </div>
        )}
      </div>

      {/* ── Floating Bottom Dock ── */}
      <div className={`bottom-dock transition-all duration-700 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <button onClick={() => navigate('/')} className="dock-item" title="Home">
          <Sparkles className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-white/10 mx-1" />
        <button onClick={() => navigate('/modules')} className="dock-item" title="Modules">
          <Search className="w-4 h-4" />
        </button>
        <button className="dock-item" title="Encryption">
          <Lock className="w-4 h-4" />
        </button>
        <button className="dock-item" title="Privacy">
          <Eye className="w-4 h-4" />
        </button>
        <button className="dock-item" title="AI Shield">
          <Bot className="w-4 h-4" />
        </button>
        <button className="dock-item" title="Biometrics">
          <Fingerprint className="w-4 h-4" />
        </button>
      </div>

      {/* ── Vignette ── */}
      <div className="fixed inset-0 pointer-events-none z-[1]" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
      }} />
    </div>
  );
};

export default Login;
