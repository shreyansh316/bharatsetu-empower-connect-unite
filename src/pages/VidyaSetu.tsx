import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Zap, Users, FileText, Play, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VidyaSetu() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen aurora-bg aurora-animated noise-overlay relative pb-12 overflow-hidden">
      {/* Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-gradient-hero" style={{ fontSize: '15vw', fontWeight: 100, opacity: 0.03 }}>
          VIDYA_SETU
        </span>
      </div>

      <header className="glass-strong border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/modules')} className="text-white/50 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white/90">VidyaSetu</h1>
              <p className="text-xs text-white/40 tracking-widest uppercase mt-0.5">Universal Education Hub</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 relative z-10">
        <Tabs defaultValue="courses">
          <TabsList className="grid w-full grid-cols-4 glass rounded-2xl p-1 mb-8">
            <TabsTrigger value="courses" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><BookOpen className="w-4 h-4 mr-2 hidden sm:block"/> Courses</TabsTrigger>
            <TabsTrigger value="ar-labs" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Zap className="w-4 h-4 mr-2 hidden sm:block"/> AR Labs</TabsTrigger>
            <TabsTrigger value="tutors" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Users className="w-4 h-4 mr-2 hidden sm:block"/> Tutors</TabsTrigger>
            <TabsTrigger value="tests" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><FileText className="w-4 h-4 mr-2 hidden sm:block"/> Tests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Vernacular Skill-Building</h2>
                <p className="text-sm text-white/50 mt-2">Download entire courses for offline viewing in 12 regional languages.</p>
              </div>
              <div className="space-y-4">
                <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] hover:border-blue-500/30 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mr-6 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                      <Play className="w-8 h-8 text-blue-400 ml-1" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white/90 text-xl tracking-wide group-hover:text-blue-400 transition-colors">Advanced Welding Techniques</h4>
                      <p className="text-xs text-white/40 mt-2 font-mono-stat tracking-widest uppercase flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <span className="bg-white/5 px-2 py-1 rounded">HINDI</span> 
                        <span className="bg-white/5 px-2 py-1 rounded">12 MODULES</span>
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="sm:w-auto w-full rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white font-mono-stat tracking-widest uppercase text-xs h-12">
                    <Download className="w-4 h-4 mr-3 text-blue-400"/> Download All (450MB)
                  </Button>
                </div>

                <div className="p-6 border border-green-500/20 bg-green-500/5 rounded-2xl hover:bg-green-500/10 hover:border-green-500/30 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center">
                    <div className="w-20 h-20 bg-green-500/10 rounded-2xl flex items-center justify-center mr-6 border border-green-500/20">
                      <Play className="w-8 h-8 text-green-400 ml-1" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white/90 text-xl tracking-wide">Organic Farming Basics</h4>
                      <p className="text-xs text-white/40 mt-2 font-mono-stat tracking-widest uppercase flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <span className="bg-white/5 px-2 py-1 rounded">MARATHI</span> 
                        <span className="bg-white/5 px-2 py-1 rounded">8 MODULES</span>
                      </p>
                    </div>
                  </div>
                  <Button className="sm:w-auto w-full rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 font-mono-stat tracking-widest uppercase text-xs h-12 cursor-default">
                    <Download className="w-4 h-4 mr-3"/> Downloaded
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ar-labs" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Augmented Reality Classrooms</h2>
                <p className="text-sm text-white/50 mt-2">Interactive 3D models for science and engineering students.</p>
              </div>
              <div className="bg-black/60 aspect-video rounded-3xl flex flex-col items-center justify-center relative overflow-hidden border border-white/10 group cursor-pointer hover:border-blue-500/40 transition-colors shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_50%,transparent_75%)] bg-[length:250%_250%] group-hover:animate-[shimmer_3s_infinite]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="text-center relative z-10">
                  <div className="w-24 h-24 bg-blue-500/20 border border-blue-500/40 rounded-full flex items-center justify-center mx-auto mb-6 relative group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/30" />
                    <Zap className="w-10 h-10 text-blue-400 relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white/90 tracking-wide mb-3 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">Launch AR Heart Anatomy</h3>
                  <p className="text-blue-400/60 font-mono-stat tracking-widest uppercase text-[10px]">Requires Camera Permission</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tutors" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Live Doubt Solving Tutors</h2>
                <p className="text-sm text-white/50 mt-2">Connect with verified educators for 1-on-1 sessions.</p>
              </div>
              <div className="text-center py-20 relative">
                <div className="w-32 h-32 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                   <div className="absolute -inset-4 border border-blue-500/20 rounded-full opacity-50" />
                   <div className="absolute -inset-8 border border-blue-500/10 rounded-full opacity-20" />
                   <Users className="w-12 h-12 text-white/20" />
                </div>
                <h3 className="text-2xl font-bold text-white/80 tracking-wide mb-4">No tutors currently online</h3>
                <p className="text-white/40 max-w-md mx-auto leading-relaxed font-light">Your district's assigned educators are offline. You can schedule a priority session for tomorrow between 4:00 PM and 6:00 PM.</p>
                <Button className="mt-8 rounded-xl bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30 font-mono-stat tracking-widest uppercase text-xs h-12 px-8">
                  Schedule Session
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tests" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Skill Certification Tests</h2>
                <p className="text-sm text-white/50 mt-2">Take proctored tests offline and sync results when connected.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-blue-500/30 bg-blue-500/10 p-8 rounded-3xl hover:bg-blue-500/20 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
                  <h4 className="font-bold text-white/90 text-xl tracking-wide relative z-10 group-hover:text-blue-400 transition-colors">Basic Electrical Safety</h4>
                  <div className="flex items-center gap-4 mt-6 mb-8 relative z-10">
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-lg text-[10px] font-mono-stat tracking-widest uppercase border border-blue-500/30">45 MINS</span>
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-lg text-[10px] font-mono-stat tracking-widest uppercase border border-blue-500/30">30 QUES</span>
                  </div>
                  <Button className="w-full rounded-xl bg-blue-500 text-white hover:bg-blue-600 font-mono-stat tracking-widest uppercase text-xs h-12 relative z-10 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    Start Test
                  </Button>
                </div>

                <div className="border border-white/10 bg-white/[0.01] p-8 rounded-3xl opacity-50 relative overflow-hidden">
                  <h4 className="font-bold text-white/50 text-xl tracking-wide mb-4">Advanced Carpentry</h4>
                  <p className="text-xs text-white/30 font-mono-stat tracking-widest uppercase mb-8 border border-white/10 bg-white/5 p-3 rounded-xl">
                    Requires completing level 1 course
                  </p>
                  <Button className="w-full rounded-xl bg-white/5 border border-white/10 text-white/30 cursor-not-allowed font-mono-stat tracking-widest uppercase text-xs h-12">
                    Locked
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
