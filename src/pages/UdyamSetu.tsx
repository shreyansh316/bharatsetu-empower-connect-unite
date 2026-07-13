import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Truck, Calculator, Globe, UploadCloud, CheckCircle, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UdyamSetu() {
  const navigate = useNavigate();
  const [financingState, setFinancingState] = useState<'idle' | 'uploading' | 'approved'>('idle');

  const handleUploadInvoice = () => {
    setFinancingState('uploading');
    setTimeout(() => {
      setFinancingState('approved');
    }, 2500);
  };

  return (
    <div className="min-h-screen aurora-bg aurora-animated noise-overlay relative pb-12 overflow-hidden">
      {/* Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-gradient-hero" style={{ fontSize: '15vw', fontWeight: 100, opacity: 0.03 }}>
          UDYAM_SETU
        </span>
      </div>

      <header className="glass-strong border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/modules')} className="text-white/50 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white/90">UdyamSetu</h1>
              <p className="text-xs text-white/40 tracking-widest uppercase mt-0.5">MSME Acceleration & B2B Hub</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 relative z-10">
        <Tabs defaultValue="invoice">
          <TabsList className="grid w-full grid-cols-4 glass rounded-2xl p-1 mb-8">
            <TabsTrigger value="invoice" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><FileText className="w-4 h-4 mr-2 hidden sm:block"/> Invoice Finance</TabsTrigger>
            <TabsTrigger value="freight" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Truck className="w-4 h-4 mr-2 hidden sm:block"/> Freight Matcher</TabsTrigger>
            <TabsTrigger value="gst" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Calculator className="w-4 h-4 mr-2 hidden sm:block"/> GST Compliance</TabsTrigger>
            <TabsTrigger value="export" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Globe className="w-4 h-4 mr-2 hidden sm:block"/> Global Trade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="invoice" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Smart Invoice Financing</h2>
                <p className="text-sm text-white/50 mt-2">Upload unpaid invoices to get instant micro-loans for working capital.</p>
              </div>
              <div>
                {financingState === 'idle' && (
                  <div className="border border-dashed border-white/20 bg-white/5 rounded-2xl p-12 text-center hover:bg-white/10 transition-colors cursor-pointer" onClick={handleUploadInvoice}>
                    <UploadCloud className="w-12 h-12 text-white/30 mx-auto mb-4" />
                    <p className="text-white/80 font-medium tracking-wide">Upload Invoice (PDF/JPG)</p>
                    <p className="text-xs font-mono-stat text-white/40 mt-2 uppercase tracking-widest">Get up to 80% advance instantly</p>
                  </div>
                )}
                
                {financingState === 'uploading' && (
                  <div className="border border-purple-400/30 rounded-2xl p-12 text-center bg-purple-400/5 shadow-[0_0_30px_rgba(192,132,252,0.1)]">
                    <FileText className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-bounce drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                    <p className="text-purple-400 font-mono-stat text-sm animate-pulse tracking-widest uppercase">Verifying invoice against GSTN registry...</p>
                  </div>
                )}

                {financingState === 'approved' && (
                  <div className="border border-green-500/30 rounded-2xl p-8 bg-green-500/10 text-center shadow-[0_0_30px_rgba(34,197,94,0.15)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0%,transparent_70%)] pointer-events-none" />
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/40 mx-auto mb-6 relative">
                      <div className="absolute inset-0 rounded-full animate-ping bg-green-500/20" />
                      <CheckCircle className="w-10 h-10 text-green-400 relative z-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-400 mb-3 tracking-wide">Advance Approved!</h3>
                    <p className="text-white/70 mb-8 max-w-md mx-auto">Invoice <span className="font-mono-stat text-white/90">#INV-2024-089</span> verified. An advance of <span className="font-bold text-green-400 text-lg">₹45,000</span> is ready for disbursal.</p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <Button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30 rounded-xl h-12 font-mono-stat tracking-widest uppercase text-xs">
                        Accept & Disburse
                      </Button>
                      <Button variant="outline" onClick={() => setFinancingState('idle')} className="rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white font-mono-stat tracking-widest uppercase text-xs h-12">
                        Upload Another
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="freight" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Dynamic Freight Matcher</h2>
                <p className="text-sm text-white/50 mt-2">Bundle your partial shipments with other local MSMEs to cut logistics costs.</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] hover:border-purple-400/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-white/90 text-lg tracking-wide">Delhi → Mumbai</h4>
                    <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono-stat tracking-widest text-[10px]">LEAVING TODAY</Badge>
                  </div>
                  <p className="text-sm text-white/50 mb-6 leading-relaxed">Truck Capacity: 80% Full. Add your shipment to share costs.</p>
                  <div className="flex items-center text-xs font-mono-stat text-purple-300 mb-6 bg-purple-500/10 p-3 rounded-xl border border-purple-500/20">
                    <Package className="w-4 h-4 mr-3 text-purple-400" />
                    <span>AVAILABLE: 500 KG</span>
                  </div>
                  <Button className="w-full rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30 font-mono-stat tracking-widest uppercase text-xs h-12 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-shadow">
                    Book Space (₹2,400)
                  </Button>
                </div>
                <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] hover:border-purple-400/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-white/90 text-lg tracking-wide">Surat → Bangalore</h4>
                    <Badge className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 font-mono-stat tracking-widest text-[10px]">LEAVING TOMORROW</Badge>
                  </div>
                  <p className="text-sm text-white/50 mb-6 leading-relaxed">Truck Capacity: 40% Full. Ideal for bulk textiles.</p>
                  <div className="flex items-center text-xs font-mono-stat text-purple-300 mb-6 bg-purple-500/10 p-3 rounded-xl border border-purple-500/20">
                    <Package className="w-4 h-4 mr-3 text-purple-400" />
                    <span>AVAILABLE: 2,000 KG</span>
                  </div>
                  <Button className="w-full rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30 font-mono-stat tracking-widest uppercase text-xs h-12 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-shadow">
                    Book Space (₹5,800)
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gst" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Automated GST Compliance</h2>
                <p className="text-sm text-white/50 mt-2">Scan a product to automatically find the correct HSN code and GST rate.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 bg-black/40 h-64 rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden group">
                  <div className="absolute inset-0 border-2 border-purple-500/30 rounded-2xl m-4 opacity-50" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-purple-500/50 shadow-[0_0_10px_#a855f7] animate-[bounce_3s_ease-in-out_infinite]" />
                  <span className="text-white/30 font-mono-stat tracking-widest uppercase text-xs">Camera Viewfinder</span>
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="font-semibold text-lg text-white/90 tracking-wide mb-2">Analysis Result</h3>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <span className="text-[10px] text-white/40 font-mono-stat uppercase tracking-widest">Detected Item</span>
                    <p className="font-medium text-white/90 mt-1 text-lg">Cotton Woven Fabric</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <span className="text-[10px] text-white/40 font-mono-stat uppercase tracking-widest">Suggested HSN Code</span>
                    <p className="font-medium text-white/90 mt-1 text-lg">5208</p>
                  </div>
                  <div className="p-5 bg-purple-500/10 border border-purple-500/30 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.15)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                      <Calculator className="w-16 h-16 text-purple-400" />
                    </div>
                    <span className="text-[10px] text-purple-300 font-mono-stat uppercase tracking-widest relative z-10">Applicable GST Rate</span>
                    <p className="font-bold text-purple-400 text-3xl mt-1 tracking-tighter drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] relative z-10">5%</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Global Trade Advisor</h2>
                <p className="text-sm text-white/50 mt-2">AI-powered translation and localized marketing for rural artisans reaching global markets.</p>
              </div>
              <div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium mb-3 text-white/60 tracking-wide">Your Product Description (Hindi)</h4>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 h-40 font-medium text-white/80 leading-relaxed shadow-inner">
                      "यह हाथ से बुनी हुई खादी की शॉल है, जो सर्दियों के लिए बहुत अच्छी है।"
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-purple-400 tracking-wide flex items-center">
                      AI Global Translation (Premium) <SparklesIcon className="w-4 h-4 ml-2" />
                    </h4>
                    <div className="p-6 bg-purple-500/10 rounded-2xl border border-purple-500/30 h-40 relative shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                      <p className="text-purple-100 font-medium leading-relaxed tracking-wide">
                        "Authentic hand-woven Khadi shawl. Crafted by traditional artisans, offering premium warmth and sustainable elegance for the winter season."
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="mt-8 w-full md:w-auto rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30 font-mono-stat tracking-widest uppercase text-xs h-12 px-8">
                  List on ONDC Global Hub
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}
