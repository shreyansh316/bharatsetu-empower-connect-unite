import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, Scan, Mic, Landmark, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FinJan() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setScanResult(false);
    setTimeout(() => {
      setScanning(false);
      setScanResult(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen aurora-bg aurora-animated noise-overlay relative pb-12 overflow-hidden">
      {/* Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-gradient-hero" style={{ fontSize: '18vw', fontWeight: 100, opacity: 0.03 }}>
          FIN_JAN
        </span>
      </div>

      <header className="glass-strong border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/modules')} className="text-white/50 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white/90">FinJan</h1>
              <p className="text-xs text-white/40 tracking-widest uppercase mt-0.5">Financial Literacy & Inclusive Banking</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 relative z-10">
        <Tabs defaultValue="scan">
          <TabsList className="grid w-full grid-cols-4 glass rounded-2xl p-1 mb-8">
            <TabsTrigger value="scan" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Scan className="w-4 h-4 mr-2 hidden sm:block"/> Scan Loan</TabsTrigger>
            <TabsTrigger value="invest" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><TrendingUp className="w-4 h-4 mr-2 hidden sm:block"/> Invest</TabsTrigger>
            <TabsTrigger value="audit" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Mic className="w-4 h-4 mr-2 hidden sm:block"/> Voice Audit</TabsTrigger>
            <TabsTrigger value="subsidy" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Landmark className="w-4 h-4 mr-2 hidden sm:block"/> Subsidies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scan" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Predatory Loan Screener</h2>
                <p className="text-sm text-white/50 mt-2">Scan loan documents to instantly highlight hidden fees and exorbitant interest rates using our OCR engine.</p>
              </div>
              <div>
                {!scanning && !scanResult && (
                  <div 
                    className="border border-dashed border-white/20 bg-white/5 rounded-2xl p-12 text-center hover:bg-white/10 transition-colors cursor-pointer" 
                    onClick={handleScan}
                  >
                    <Scan className="w-12 h-12 text-white/30 mx-auto mb-4" />
                    <p className="text-white/80 font-medium tracking-wide">Tap to scan loan document</p>
                    <p className="text-xs font-mono-stat text-white/40 mt-2 uppercase tracking-widest">Uses device camera</p>
                  </div>
                )}

                {scanning && (
                  <div className="border border-teal-400/30 rounded-2xl p-12 text-center bg-teal-400/5 shadow-[0_0_30px_rgba(45,212,191,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-teal-400/50 shadow-[0_0_10px_#2dd4bf] animate-[bounce_2s_ease-in-out_infinite]" />
                    <Scan className="w-12 h-12 text-teal-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-teal-400 font-mono-stat text-sm animate-pulse tracking-widest uppercase">Extracting financial terms via OCR...</p>
                  </div>
                )}

                {scanResult && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 bg-red-500/10 p-5 rounded-2xl border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-red-400 tracking-wide">High Risk Detected</h4>
                        <p className="text-sm text-white/70 mt-1">The annualized interest rate calculates to <span className="font-bold text-red-400">38%</span>, which exceeds legal caps for micro-loans.</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 bg-yellow-500/10 p-5 rounded-2xl border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                      <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30 flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-yellow-400 tracking-wide">Hidden Processing Fee</h4>
                        <p className="text-sm text-white/70 mt-1">Clause 4b mandates a <span className="font-bold text-yellow-400">5% processing fee</span> deducted upfront.</p>
                      </div>
                    </div>
                    <Button onClick={() => setScanResult(false)} className="w-full mt-6 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white font-mono-stat tracking-widest uppercase text-xs h-12">
                      Scan Another Document
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="invest" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Fractional Micro-Investments</h2>
                <p className="text-sm text-white/50 mt-2">Start building wealth with as little as ₹10.</p>
              </div>
              <div>
                <div className="text-center p-8 bg-black/40 rounded-2xl border border-white/5 mb-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <h3 className="text-sm font-mono-stat tracking-widest uppercase text-white/50">Portfolio Value</h3>
                  <p className="text-5xl font-bold text-teal-400 mt-4 tracking-tight drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">₹1,245.50</p>
                  <Badge className="mt-4 bg-teal-500/20 text-teal-300 border border-teal-500/30 font-mono-stat tracking-widest">+12.4% THIS YEAR</Badge>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] hover:border-teal-400/30 transition-all cursor-pointer group">
                    <h4 className="font-bold text-white/90 text-lg">Government Gold Bond</h4>
                    <p className="text-xs text-white/40 mt-1 mb-6 font-mono-stat uppercase tracking-widest">Low risk • 2.5% fixed</p>
                    <Button size="sm" className="w-full rounded-xl bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border border-teal-500/30 font-mono-stat tracking-widest uppercase text-xs h-10 group-hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-shadow">
                      Invest ₹10+
                    </Button>
                  </div>
                  <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] hover:border-teal-400/30 transition-all cursor-pointer group">
                    <h4 className="font-bold text-white/90 text-lg">Index Mutual Fund</h4>
                    <p className="text-xs text-white/40 mt-1 mb-6 font-mono-stat uppercase tracking-widest">Med risk • Nifty 50</p>
                    <Button size="sm" className="w-full rounded-xl bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border border-teal-500/30 font-mono-stat tracking-widest uppercase text-xs h-10 group-hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-shadow">
                      Invest ₹50+
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Conversational Expense Auditing</h2>
                <p className="text-sm text-white/50 mt-2">Speak to log your expenses in your native language.</p>
              </div>
              <div className="text-center py-12">
                <div className="w-32 h-32 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 hover:bg-teal-500/20 hover:border-teal-500/30 hover:shadow-[0_0_30px_rgba(45,212,191,0.2)] cursor-pointer transition-all group relative">
                  <div className="absolute inset-0 rounded-full bg-teal-400/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                  <Mic className="w-12 h-12 text-white/30 group-hover:text-teal-400 transition-colors relative z-10" />
                </div>
                <h3 className="text-lg font-medium text-white/80 tracking-wide">Tap to Speak</h3>
                <p className="text-white/40 mt-3 font-mono-stat tracking-widest uppercase text-xs">"I spent 50 rupees on milk today..."</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="subsidy" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Subsidy Eligibility Engine</h2>
                <p className="text-sm text-white/50 mt-2">Based on your profile, you are eligible for the following schemes.</p>
              </div>
              <div>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] transition-colors gap-4">
                    <div>
                      <h4 className="font-bold flex items-center text-white/90 text-lg">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mr-3"/> 
                        PM Kisan Samman Nidhi
                      </h4>
                      <p className="text-sm text-white/50 mt-2 ml-8">₹6,000 per year for farmer families.</p>
                    </div>
                    <Button variant="outline" size="sm" className="sm:ml-4 rounded-xl bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white font-mono-stat tracking-widest uppercase text-xs">
                      Apply Now
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] transition-colors gap-4">
                    <div>
                      <h4 className="font-bold flex items-center text-white/90 text-lg">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mr-3"/> 
                        Ayushman Bharat
                      </h4>
                      <p className="text-sm text-white/50 mt-2 ml-8">Health insurance cover up to ₹5 Lakhs.</p>
                    </div>
                    <Button variant="outline" size="sm" className="sm:ml-4 rounded-xl bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white font-mono-stat tracking-widest uppercase text-xs">
                      Apply Now
                    </Button>
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
