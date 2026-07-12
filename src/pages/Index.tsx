import { useState, useEffect } from 'react';
import { useTranslation, TranslationProvider } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart, Scale, Briefcase, AlertCircle, ArrowRight,
  Sparkles, Rocket, Shield, BookOpen, Sprout, MapPin,
  Zap, Brain, Globe, Users, Search, Navigation,
  Sun, PlusCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DOCK_MODULES = [
  { icon: Heart, route: '/swasthya-mitra', label: 'Health', color: '#f472b6' },
  { icon: Scale, route: '/kanoon-sathi', label: 'Legal', color: '#818cf8' },
  { icon: Briefcase, route: '/yuva-rojgar', label: 'Jobs', color: '#34d399' },
  { icon: Shield, route: '/nari-shakti', label: 'Safety', color: '#f9a8d4' },
  { icon: Zap, route: '/resq-net', label: 'Rescue', color: '#fb923c' },
  { icon: BookOpen, route: '/vidya-setu', label: 'Learn', color: '#60a5fa' },
  { icon: PlusCircle, route: '/arogya-doot', label: 'Health+', color: '#f87171' },
  { icon: Navigation, route: '/pariwahan', label: 'Transit', color: '#2dd4bf' },
];

const STATS = [
  { value: '2.5M+', label: 'Citizens Empowered' },
  { value: '13', label: 'AI Modules' },
  { value: '22', label: 'Languages' },
  { value: '99.99%', label: 'Uptime' },
];

const IndexContent = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="min-h-screen aurora-bg aurora-animated noise-overlay relative overflow-hidden">
      {/* Ambient Orbs */}
      <div className="orb orb-grape w-[500px] h-[500px] -top-32 -left-32" />
      <div className="orb orb-cyan w-[400px] h-[400px] top-1/2 -right-24" style={{ animationDelay: '5s' }} />
      <div className="orb orb-pink w-[300px] h-[300px] bottom-20 left-1/3" style={{ animationDelay: '10s' }} />

      {/* ── Floating Navigation Island ── */}
      <nav className="nav-island flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white/90 text-sm tracking-wide hidden sm:block">BharatSetu</span>
        </div>
        <div className="h-5 w-px bg-white/10" />
        <button
          onClick={() => navigate('/modules')}
          className="text-xs text-white/50 hover:text-white/90 transition-colors flex items-center gap-1.5"
        >
          <Search className="w-3 h-3" />
          <span className="hidden sm:inline">Modules</span>
          <kbd className="hidden md:inline text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono-stat">⌘K</kbd>
        </button>
        <div className="h-5 w-px bg-white/10 hidden sm:block" />
        <button
          onClick={() => navigate('/login')}
          className="text-xs text-white/50 hover:text-white/90 transition-colors hidden sm:block"
        >
          Sign in
        </button>
      </nav>

      {/* ── Hero Section ── */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-32 pt-24">
        {/* Glowing tag */}
        <div
          className={`mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <Badge className="glow-badge bg-white/5 border border-white/10 text-white/80 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase backdrop-blur-md">
            <Sparkles className="w-3 h-3 mr-2 text-purple-400" />
            India's Digital Empowerment Ecosystem
          </Badge>
        </div>

        {/* Massive Hero Text */}
        <h1
          className={`text-gradient-hero text-center leading-none tracking-tight mb-6 transition-all duration-1000 delay-200 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', fontWeight: 300 }}
        >
          Bharat<span style={{ fontWeight: 600 }}>Setu</span>
        </h1>

        <p
          className={`text-white/50 text-center max-w-xl mb-4 transition-all duration-700 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.7 }}
        >
          One app. Thirteen modules. Infinite impact.
        </p>

        <p
          className={`text-white/30 text-center max-w-md mb-12 text-sm transition-all duration-700 delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Health · Legal · Employment · Education · Safety · Disaster Relief · Finance · Transit — powered by edge AI, offline-first, and built for 1.4 billion.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-700 delay-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button
            onClick={() => navigate('/modules')}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full text-base shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1"
          >
            <Rocket className="w-4 h-4 mr-2" />
            Launch Modules
          </Button>
          <Button
            onClick={() => navigate('/register')}
            variant="ghost"
            className="text-white/60 hover:text-white hover:bg-white/5 px-8 py-3 rounded-full text-base border border-white/10"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Floating Stat Bubbles */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full transition-all duration-700 delay-[1200ms] ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-5 text-center hover-lift cursor-default"
            >
              <div className="font-mono-stat text-2xl md:text-3xl font-bold text-gradient-grape mb-1">
                {stat.value}
              </div>
              <div className="text-white/40 text-xs tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Module Quick Grid */}
        <div
          className={`mt-16 max-w-5xl w-full transition-all duration-700 delay-[1400ms] ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-white/30 text-xs tracking-[0.3em] uppercase text-center mb-8">
            Featured Modules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'SwasthyaMitra', desc: 'AI-powered healthcare & symptom analysis', icon: Heart, color: '#f472b6', route: '/swasthya-mitra' },
              { title: 'NariShakti', desc: 'SOS audio analytics & women safety', icon: Shield, color: '#f9a8d4', route: '/nari-shakti' },
              { title: 'ResQNet', desc: 'Offline mesh networking & disaster response', icon: Zap, color: '#fb923c', route: '/resq-net' },
              { title: 'VidyaSetu', desc: 'Vernacular education & AR classrooms', icon: BookOpen, color: '#60a5fa', route: '/vidya-setu' },
              { title: 'ArogyaDoot', desc: 'Telemedicine & drone medicine delivery', icon: PlusCircle, color: '#f87171', route: '/arogya-doot' },
              { title: 'Pariwahan', desc: 'E-Rickshaw pooling & rural transit', icon: Navigation, color: '#2dd4bf', route: '/pariwahan' },
            ].map((mod, i) => (
              <div
                key={i}
                onClick={() => navigate(mod.route)}
                className="glass rounded-2xl p-6 hover-lift cursor-pointer group relative overflow-hidden"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Ambient tint */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${mod.color}15, transparent 70%)` }}
                />

                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${mod.color}20` }}
                  >
                    <mod.icon className="w-5 h-5" style={{ color: mod.color }} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white/90 font-semibold text-sm mb-1 group-hover:text-white transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-white/35 text-xs leading-relaxed group-hover:text-white/50 transition-colors">
                      {mod.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/modules')}
              className="text-white/40 hover:text-white/80 hover:bg-white/5 rounded-full px-6 text-sm border border-white/5"
            >
              View all 13 modules
              <ArrowRight className="w-3 h-3 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      {/* ── Floating Bottom Dock ── */}
      <div className="bottom-dock">
        {DOCK_MODULES.map((mod, i) => (
          <button
            key={i}
            onClick={() => navigate(mod.route)}
            className="dock-item"
            title={mod.label}
          >
            <mod.icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
};

const Index = () => (
  <TranslationProvider>
    <IndexContent />
  </TranslationProvider>
);

export default Index;
