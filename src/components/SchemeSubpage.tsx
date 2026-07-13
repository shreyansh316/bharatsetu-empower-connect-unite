import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft, ExternalLink, Sparkles, CheckCircle2,
  Shield, FileText, Globe,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { type SchemeModule, type Pillar, getPillar } from '@/data/moduleRegistry';
import HowItWorksStepper from './HowItWorksStepper';
import DocumentVault from './DocumentVault';
import EligibilityQuiz from './EligibilityQuiz';
import VernacularAssistant from './VernacularAssistant';

interface SchemeSubpageProps {
  scheme: SchemeModule;
}

const SchemeSubpage: React.FC<SchemeSubpageProps> = ({ scheme }) => {
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const pillar = getPillar(scheme.pillar);
  const IconComp = scheme.icon;

  return (
    <div className="min-h-screen aurora-bg aurora-animated noise-overlay relative overflow-hidden pb-32">
      {/* Ambient Orbs */}
      <div
        className="orb w-[500px] h-[500px] -top-32 -left-32"
        style={{ background: scheme.color, opacity: 0.15 }}
      />
      <div
        className="orb w-[350px] h-[350px] top-1/2 -right-24"
        style={{ background: scheme.color, opacity: 0.1, animationDelay: '7s' }}
      />

      {/* Background watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span
          className="text-gradient-hero"
          style={{ fontSize: '15vw', fontWeight: 100, opacity: 0.03 }}
        >
          {scheme.title.split(' ')[0]}
        </span>
      </div>

      {/* ── Sticky Header ── */}
      <header className="glass-strong border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/modules')}
              className="text-white/50 hover:text-white hover:bg-white/10 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${scheme.color}20` }}
            >
              <IconComp className="w-5 h-5" style={{ color: scheme.color }} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white/90 leading-tight">{scheme.title}</h1>
              <p className="text-[10px] text-white/40 tracking-widest uppercase">
                {scheme.titleHi} · {pillar?.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              className={`text-[10px] px-2.5 py-0.5 rounded-full border ${
                scheme.status === 'active'
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : scheme.status === 'beta'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-white/5 border-white/10 text-white/40'
              }`}
            >
              {scheme.status === 'active' ? '● Active' : scheme.status === 'beta' ? '◐ Beta' : '○ Upcoming'}
            </Badge>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-5xl mx-auto px-4 mt-8 relative z-10">
        {/* Hero Section */}
        <section className="mb-10 animate-float-up">
          <div
            className="glass spotlight-border rounded-3xl p-8 relative overflow-hidden"
          >
            {/* Accent glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 60% 40% at 20% 30%, ${scheme.color}15, transparent 70%)`,
              }}
            />

            <div className="relative z-10">
              {/* Stat watermark */}
              <div className="stat-watermark">{scheme.stat}</div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${scheme.color}18` }}
                    >
                      <IconComp className="w-7 h-7" style={{ color: scheme.color }} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white/90">{scheme.title}</h2>
                      <p className="text-sm text-white/40">{scheme.titleHi}</p>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xl">
                    {scheme.description}
                  </p>

                  {/* Quick stats */}
                  <div className="flex items-center gap-4">
                    <div className="glass rounded-xl px-4 py-2">
                      <span className="font-mono-stat text-lg font-bold text-gradient-grape">
                        {scheme.stat}
                      </span>
                      <span className="text-white/30 text-xs ml-2">{scheme.statLabel}</span>
                    </div>
                    <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-white/30" />
                      <span className="text-white/40 text-xs">22 Languages</span>
                    </div>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col gap-3 min-w-[200px]">
                  <Button
                    onClick={() => setShowQuiz(true)}
                    className="rounded-xl text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${scheme.color}, ${scheme.color}cc)`,
                      boxShadow: `0 8px 24px ${scheme.color}30`,
                    }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Check Eligibility
                  </Button>
                  <Button
                    variant="ghost"
                    className="rounded-xl text-white/60 hover:text-white border border-white/10 hover:bg-white/10"
                    onClick={() => window.open(scheme.officialUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility quick glance */}
        <section className="mb-8 animate-float-up" style={{ animationDelay: '100ms' }}>
          <div className="glass rounded-2xl p-6">
            <h3 className="text-white/50 text-xs tracking-wider uppercase mb-4 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" style={{ color: scheme.color }} />
              Quick Eligibility
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {scheme.eligibility.map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: scheme.color }} />
                  <span className="text-white/60 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Stepper */}
        <div className="animate-float-up" style={{ animationDelay: '200ms' }}>
          <HowItWorksStepper steps={scheme.steps} accentColor={scheme.color} />
        </div>

        {/* Document Vault */}
        <div className="animate-float-up" style={{ animationDelay: '300ms' }}>
          <DocumentVault requiredDocs={scheme.documents} accentColor={scheme.color} />
        </div>

        {/* Official Link */}
        <section className="mt-8 mb-8 animate-float-up" style={{ animationDelay: '400ms' }}>
          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-2xl p-5 flex items-center justify-between group hover:bg-white/[0.06] transition-all duration-300 cursor-pointer block"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${scheme.color}15` }}
              >
                <FileText className="w-5 h-5" style={{ color: scheme.color }} />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                  Official Government Portal
                </p>
                <p className="text-white/30 text-xs">{scheme.officialUrl}</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
          </a>
        </section>
      </main>

      {/* Vernacular AI Assistant */}
      <VernacularAssistant schemeName={scheme.title} accentColor={scheme.color} />

      {/* Eligibility Quiz Modal */}
      {showQuiz && (
        <EligibilityQuiz
          schemeName={scheme.title}
          eligibilityPoints={scheme.eligibility}
          accentColor={scheme.color}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
};

export default SchemeSubpage;
