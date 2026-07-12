import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart, Scale, Briefcase, AlertCircle, ArrowLeft, ArrowRight,
  Bot, Sparkles, Star, Users, MapPin, Phone, Calendar,
  FileText, Activity, TrendingUp, Shield, Zap,
  BookOpen, PlusCircle, Sun, Navigation, Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ModuleLauncher = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'swasthya', title: 'SwasthyaMitra', subtitle: 'AI Health Assistant',
      icon: Heart, color: '#f472b6', route: '/swasthya-mitra',
      stat: '2.5M+', statLabel: 'Users'
    },
    {
      id: 'kanoon', title: 'KanoonSathi', subtitle: 'Legal Aid Platform',
      icon: Scale, color: '#818cf8', route: '/kanoon-sathi',
      stat: '1.2K+', statLabel: 'Cases'
    },
    {
      id: 'yuva', title: 'YuvaRojgar', subtitle: 'Career Empowerment',
      icon: Briefcase, color: '#34d399', route: '/yuva-rojgar',
      stat: '50K+', statLabel: 'Jobs'
    },
    {
      id: 'samasya', title: 'SamasyaReport', subtitle: 'Civic Issue Reporter',
      icon: AlertCircle, color: '#fb923c', route: '/samasya-report',
      stat: '75K+', statLabel: 'Reports'
    },
    {
      id: 'narishakti', title: 'NariShakti', subtitle: 'Women\'s Safety',
      icon: Shield, color: '#f9a8d4', route: '/nari-shakti',
      stat: '100K+', statLabel: 'Protected'
    },
    {
      id: 'resqnet', title: 'ResQNet', subtitle: 'Disaster Mesh Network',
      icon: Zap, color: '#fb923c', route: '/resq-net',
      stat: '500+', statLabel: 'Nodes'
    },
    {
      id: 'finjan', title: 'FinJan', subtitle: 'Financial Literacy',
      icon: TrendingUp, color: '#4ade80', route: '/fin-jan',
      stat: '₹10Cr+', statLabel: 'Protected'
    },
    {
      id: 'udyamsetu', title: 'UdyamSetu', subtitle: 'MSME Accelerator',
      icon: Briefcase, color: '#a78bfa', route: '/udyam-setu',
      stat: '25K+', statLabel: 'MSMEs'
    },
    {
      id: 'divyangsahayak', title: 'DivyangSahayak', subtitle: 'Assistive Hub',
      icon: Activity, color: '#38bdf8', route: '/divyang-sahayak',
      stat: '50K+', statLabel: 'Sessions'
    },
    {
      id: 'shramikkalyan', title: 'ShramikKalyan', subtitle: 'Worker Protection',
      icon: Users, color: '#f59e0b', route: '/shramik-kalyan',
      stat: '₹200Cr+', statLabel: 'Escrowed'
    },
    {
      id: 'vidyasetu', title: 'VidyaSetu', subtitle: 'Education Hub',
      icon: BookOpen, color: '#60a5fa', route: '/vidya-setu',
      stat: '10M+', statLabel: 'Students'
    },
    {
      id: 'nyayamitra', title: 'NyayaMitra', subtitle: 'Legal Aid',
      icon: Scale, color: '#94a3b8', route: '/nyaya-mitra',
      stat: '500K+', statLabel: 'Cases'
    },
    {
      id: 'arogyadoot', title: 'ArogyaDoot', subtitle: 'Telemedicine',
      icon: PlusCircle, color: '#f87171', route: '/arogya-doot',
      stat: '2M+', statLabel: 'Consults'
    },
    {
      id: 'urjavikas', title: 'UrjaVikas', subtitle: 'Green Energy',
      icon: Sun, color: '#fbbf24', route: '/urja-vikas',
      stat: '1000+', statLabel: 'MW'
    },
    {
      id: 'pariwahan', title: 'Pariwahan', subtitle: 'Rural Transit',
      icon: Navigation, color: '#2dd4bf', route: '/pariwahan',
      stat: '10M+', statLabel: 'Rides'
    },
  ];

  // 3D tilt handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
  }, []);

  return (
    <div className="min-h-screen aurora-bg aurora-animated noise-overlay relative overflow-hidden pb-28">
      {/* Ambient Orbs */}
      <div className="orb orb-grape w-[400px] h-[400px] -top-20 right-0" />
      <div className="orb orb-cyan w-[350px] h-[350px] bottom-40 -left-20" style={{ animationDelay: '7s' }} />
      <div className="orb orb-pink w-[250px] h-[250px] top-1/2 right-1/3" style={{ animationDelay: '12s' }} />

      {/* ── Floating Navigation Island ── */}
      <nav className="nav-island flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="text-white/50 hover:text-white/90 transition-colors flex items-center gap-1.5 text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Home</span>
        </button>
        <div className="h-5 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-white/90 text-sm tracking-wide">Modules</span>
        </div>
        <div className="h-5 w-px bg-white/10" />
        <Badge className="glow-badge bg-white/5 border border-white/10 text-purple-300 text-[10px] px-2 py-0.5 rounded-full">
          13 Active
        </Badge>
      </nav>

      {/* ── Hero Header ── */}
      <div className="relative z-10 text-center pt-28 pb-12 px-4">
        <h1
          className="text-gradient-hero leading-none tracking-tight mb-4 animate-float-up"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300 }}
        >
          Module <span style={{ fontWeight: 600 }}>Launcher</span>
        </h1>
        <p className="text-white/30 text-sm max-w-lg mx-auto animate-float-up" style={{ animationDelay: '100ms' }}>
          13 AI-powered government service modules. Click any card to launch.
        </p>
      </div>

      {/* ── Bento Grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bento-grid">
          {modules.map((mod, i) => (
            <div
              key={mod.id}
              onClick={() => navigate(mod.route)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`
                glass spotlight-border rounded-3xl p-6 cursor-pointer
                tilt-card group relative overflow-hidden
                animate-float-up
                ${i === 0 ? 'bento-2x' : ''}
              `}
              style={{
                animationDelay: `${i * 60}ms`,
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
              }}
            >
              {/* Ambient module tint */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{ background: `radial-gradient(circle at 30% 30%, ${mod.color}12, transparent 70%)` }}
              />

              {/* Stat watermark */}
              <div className="stat-watermark">{mod.stat}</div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${mod.color}18` }}
                >
                  <mod.icon className="w-6 h-6" style={{ color: mod.color }} />
                </div>

                {/* Title */}
                <h3 className="text-white/90 font-semibold text-base mb-1 group-hover:text-white transition-colors">
                  {mod.title}
                </h3>
                <p className="text-white/30 text-xs mb-4 group-hover:text-white/50 transition-colors tracking-wider uppercase">
                  {mod.subtitle}
                </p>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom row */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono-stat text-white/60 text-xs font-medium">{mod.stat}</span>
                    <span className="text-white/25 text-[10px]">{mod.statLabel}</span>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all duration-300 group-hover:translate-x-1"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white/80 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Floating Bottom Dock ── */}
      <div className="bottom-dock">
        <button
          onClick={() => navigate('/')}
          className="dock-item"
          title="Home"
        >
          <Sparkles className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-white/10 mx-1" />
        {modules.slice(0, 8).map((mod, i) => (
          <button
            key={i}
            onClick={() => navigate(mod.route)}
            className="dock-item"
            title={mod.title}
          >
            <mod.icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModuleLauncher;
