import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Video, Briefcase, Activity, MapPin, Play, MessageSquare, BriefcaseIcon, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DivyangSahayak() {
  const navigate = useNavigate();
  const [translating, setTranslating] = useState(false);

  return (
    <div className="min-h-screen aurora-bg aurora-animated noise-overlay relative pb-12 overflow-hidden">
      {/* Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-gradient-hero" style={{ fontSize: '16vw', fontWeight: 100, opacity: 0.03 }}>
          DIVYANG
        </span>
      </div>

      <header className="glass-strong border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/modules')} className="text-white/50 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white/90">DivyangSahayak</h1>
              <p className="text-xs text-white/40 tracking-widest uppercase mt-0.5">Universal Assistive Hub</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 relative z-10">
        <Tabs defaultValue="translate">
          <TabsList className="grid w-full grid-cols-4 glass rounded-2xl p-1 mb-8">
            <TabsTrigger value="translate" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Video className="w-4 h-4 mr-2 hidden sm:block"/> Sign Translate</TabsTrigger>
            <TabsTrigger value="jobs" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Briefcase className="w-4 h-4 mr-2 hidden sm:block"/> Jobs</TabsTrigger>
            <TabsTrigger value="therapy" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Activity className="w-4 h-4 mr-2 hidden sm:block"/> Therapy</TabsTrigger>
            <TabsTrigger value="routing" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><MapPin className="w-4 h-4 mr-2 hidden sm:block"/> Routing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="translate" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Real-Time Sign Language Translation</h2>
                <p className="text-sm text-white/50 mt-2">Uses your device camera and Edge AI to translate Indian Sign Language (ISL) to spoken text.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                {/* Camera feed mockup */}
                <div className="flex-1 bg-black/50 rounded-3xl aspect-video flex flex-col items-center justify-center relative overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(217,70,239,0.05)] group">
                  {!translating ? (
                    <div className="text-center relative z-10">
                      <Button onClick={() => setTranslating(true)} className="bg-fuchsia-500/20 hover:bg-fuchsia-500/40 border border-fuchsia-500/50 text-fuchsia-300 rounded-full w-20 h-20 flex items-center justify-center p-0 mb-4 mx-auto transition-all group-hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]">
                        <Play className="w-8 h-8 ml-1" />
                      </Button>
                      <p className="text-white/40 font-mono-stat tracking-widest uppercase text-xs">Start Camera</p>
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/40 to-transparent flex items-center justify-center opacity-80 mix-blend-screen" />
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                      <div className="absolute top-4 left-4 flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] text-white/60 font-mono-stat uppercase tracking-widest">LIVE / AI EDGE-MODE</span>
                      </div>
                      
                      {/* Pose estimation lines mockup */}
                      <div className="absolute w-40 h-40 border-t-2 border-l-2 border-fuchsia-400/50 top-1/4 left-1/4 animate-pulse shadow-[0_0_15px_rgba(217,70,239,0.3)]" />
                      <div className="absolute w-40 h-40 border-b-2 border-r-2 border-fuchsia-400/50 bottom-1/4 right-1/4 animate-pulse shadow-[0_0_15px_rgba(217,70,239,0.3)]" />
                      
                      <Button 
                        onClick={() => setTranslating(false)} 
                        variant="destructive" 
                        className="absolute bottom-6 right-6 bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/50 rounded-xl font-mono-stat tracking-widest uppercase text-xs"
                        size="sm"
                      >
                        Stop Translation
                      </Button>
                    </>
                  )}
                </div>
                
                {/* Translation Output */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg flex items-center mb-6 text-white/90 tracking-wide">
                    <MessageSquare className="w-5 h-5 mr-3 text-fuchsia-400"/> 
                    Translation Output
                  </h3>
                  <div className="flex-1 bg-white/[0.02] rounded-3xl border border-white/5 p-6 relative min-h-[250px] shadow-inner flex flex-col justify-end">
                    {translating ? (
                      <div className="space-y-4">
                        <p className="text-white/60 text-lg font-light leading-relaxed">"Hello, how are you today?"</p>
                        <p className="text-white/90 text-2xl font-medium leading-relaxed drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">"I need assistance filling out this form."</p>
                        <div className="flex space-x-1 items-center h-6 mt-4 opacity-70">
                          <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    ) : (
                      <p className="text-white/30 italic font-light tracking-wide self-center mb-12">Waiting for camera feed...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Accessible Job Boards</h2>
                <p className="text-sm text-white/50 mt-2">Curated opportunities from employers dedicated to inclusive hiring practices.</p>
              </div>
              <div className="space-y-4">
                <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] hover:border-fuchsia-400/30 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white/90 text-lg">Data Entry Specialist (Remote)</h4>
                      <p className="text-sm text-white/50 mt-1">TechVision India</p>
                    </div>
                    <Badge className="bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 font-mono-stat tracking-widest text-[10px]">VISUAL IMPAIRMENT FRIENDLY</Badge>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-mono-stat text-fuchsia-400/70 uppercase tracking-widest bg-fuchsia-500/5 p-3 rounded-xl border border-fuchsia-500/10">
                    <BriefcaseIcon className="w-4 h-4 mr-3" />
                    Screen-reader compatible software provided
                  </div>
                </div>
                <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] hover:border-fuchsia-400/30 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white/90 text-lg">Customer Support Executive</h4>
                      <p className="text-sm text-white/50 mt-1">Global Services</p>
                    </div>
                    <Badge className="bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 font-mono-stat tracking-widest text-[10px]">WHEELCHAIR ACCESSIBLE</Badge>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-mono-stat text-fuchsia-400/70 uppercase tracking-widest bg-fuchsia-500/5 p-3 rounded-xl border border-fuchsia-500/10">
                    <BriefcaseIcon className="w-4 h-4 mr-3" />
                    100% accessible office space in Bangalore
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="therapy" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Remote Physical Therapy Coaching</h2>
                <p className="text-sm text-white/50 mt-2">Computer vision powered pose tracking to ensure you are doing prescribed exercises correctly at home.</p>
              </div>
              <div className="bg-black/40 rounded-3xl aspect-[21/9] flex flex-col items-center justify-center border border-white/10 relative overflow-hidden group hover:border-fuchsia-500/30 transition-colors cursor-pointer">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Activity className="w-16 h-16 text-white/20 mb-6 group-hover:text-fuchsia-400 transition-colors" />
                <h3 className="font-mono-stat tracking-widest uppercase text-white/40 group-hover:text-white/80 transition-colors">Posture Tracking Camera Offline</h3>
                <Button className="mt-6 rounded-xl bg-fuchsia-500/20 text-fuchsia-300 hover:bg-fuchsia-500/30 border border-fuchsia-500/30 font-mono-stat tracking-widest uppercase text-xs h-12 px-8 relative z-10">
                  Start Exercise: Shoulder Mobility
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="routing" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Custom Crowdsourced Routing</h2>
                <p className="text-sm text-white/50 mt-2">Find routes that are mapped for wheelchair accessibility and visually impaired navigation.</p>
              </div>
              <div>
                <div className="bg-black/60 h-80 rounded-3xl flex flex-col items-center justify-center border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                  <Navigation className="w-16 h-16 text-fuchsia-500/30 mb-4 animate-pulse relative z-10" />
                  <p className="text-fuchsia-500/50 font-mono-stat tracking-widest uppercase text-xs relative z-10">Accessible Map Interface / Loading Tile Data...</p>
                </div>
                <div className="mt-6 p-6 bg-fuchsia-500/10 rounded-2xl border border-fuchsia-500/30 flex items-start space-x-4 shadow-[0_0_20px_rgba(217,70,239,0.1)]">
                  <div className="bg-fuchsia-500/20 p-3 rounded-full border border-fuchsia-500/40">
                    <MapPin className="w-6 h-6 text-fuchsia-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-fuchsia-400 tracking-wide text-lg">Community Alert</h4>
                    <p className="text-sm text-white/70 mt-2 leading-relaxed">The ramp at <span className="text-white/90 font-medium">MG Road Metro Station Gate B</span> is currently under repair. The app has automatically rerouted you to Gate A.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
