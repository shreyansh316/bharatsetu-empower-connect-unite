import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, Heart, MapPin, Users, CheckCircle, Clock, Star, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDatabase } from '@/lib/offline-db';

export default function ShramikKalyan() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const loadTx = async () => {
      const db = await getDatabase();
      const sub = db.escrow_tx.find({
        sort: [{ timestamp: 'desc' }]
      }).$.subscribe(txs => {
        setTransactions(txs.map(t => t.toJSON()));
      });
      return () => sub.unsubscribe();
    };
    loadTx();
  }, []);

  const addMockTransaction = async () => {
    const db = await getDatabase();
    await db.escrow_tx.insert({
      id: Math.random().toString(36).substr(2, 9),
      title: 'Bonus Payout',
      subtitle: 'Diwali Bonus',
      amount: '+₹500',
      status: 'completed',
      timestamp: Date.now()
    });
  };

  return (
    <div className="min-h-screen aurora-bg aurora-animated noise-overlay relative pb-12 overflow-hidden">
      {/* Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-gradient-hero" style={{ fontSize: '15vw', fontWeight: 100, opacity: 0.03 }}>
          SHRAMIK
        </span>
      </div>

      <header className="glass-strong border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/modules')} className="text-white/50 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white/90">ShramikKalyan</h1>
              <p className="text-xs text-white/40 tracking-widest uppercase mt-0.5">Migrant Worker Protection</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 relative z-10">
        <Tabs defaultValue="escrow">
          <TabsList className="grid w-full grid-cols-4 glass rounded-2xl p-1 mb-8">
            <TabsTrigger value="escrow" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Shield className="w-4 h-4 mr-2 hidden sm:block"/> Wage Escrow</TabsTrigger>
            <TabsTrigger value="health" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Heart className="w-4 h-4 mr-2 hidden sm:block"/> Health ID</TabsTrigger>
            <TabsTrigger value="housing" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><MapPin className="w-4 h-4 mr-2 hidden sm:block"/> Housing</TabsTrigger>
            <TabsTrigger value="contractor" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Users className="w-4 h-4 mr-2 hidden sm:block"/> Contractors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="escrow" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Smart Wage Escrow Protection</h2>
                <p className="text-sm text-white/50 mt-2">Ensures you get paid on time. Employers deposit funds into escrow before you start work.</p>
              </div>
              <div>
                <div className="bg-gradient-to-br from-orange-500/20 to-amber-600/10 border border-orange-500/30 rounded-3xl p-8 shadow-[0_0_30px_rgba(249,115,22,0.15)] mb-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <h3 className="text-xs font-mono-stat tracking-widest uppercase text-orange-300/70">Current Escrow Balance (Site A)</h3>
                  <p className="text-5xl font-bold text-orange-400 mt-4 tracking-tighter drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">₹14,500</p>
                  <div className="mt-8 flex justify-between items-center text-xs font-mono-stat uppercase tracking-widest text-orange-300/70 border-t border-orange-500/20 pt-6">
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-2"/> NEXT PAYOUT: 15TH AUG</span>
                    <Badge className="bg-orange-500/20 text-orange-300 border border-orange-500/30 font-mono-stat tracking-widest">FULLY FUNDED</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold text-white/80 tracking-wide">Recent Transactions</h4>
                  <Button size="sm" variant="outline" onClick={addMockTransaction} className="rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white font-mono-stat tracking-widest uppercase text-[10px] h-8">
                    <Plus className="w-3 h-3 mr-2" /> Mock Receive
                  </Button>
                </div>
                <div className="space-y-4">
                  {transactions.length === 0 ? (
                    <div className="p-8 border border-dashed border-white/10 rounded-2xl text-center">
                      <p className="text-sm text-white/30 font-mono-stat tracking-widest uppercase">No recent transactions</p>
                    </div>
                  ) : (
                    transactions.map((tx) => (
                      <div key={tx.id} className="flex justify-between items-center p-5 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] transition-colors group">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 border shadow-inner ${tx.status === 'completed' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-orange-500/10 border-orange-500/30 text-orange-400'}`}>
                            {tx.status === 'completed' ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <Clock className="w-6 h-6 animate-pulse" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white/90 text-lg tracking-wide">{tx.title}</p>
                            <p className="text-[10px] text-white/40 font-mono-stat uppercase tracking-widest mt-1">{tx.subtitle}</p>
                          </div>
                        </div>
                        <span className={`font-mono-stat tracking-wider text-xl ${tx.status === 'completed' ? 'text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]'}`}>{tx.amount}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="health" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Portable Healthcare Profile</h2>
                <p className="text-sm text-white/50 mt-2">Your medical history follows you across states. Linked securely to your ABHA ID.</p>
              </div>
              <div>
                <div className="p-6 border border-orange-500/30 bg-orange-500/10 rounded-2xl mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center relative overflow-hidden group shadow-[0_0_20px_rgba(249,115,22,0.1)] gap-6">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Heart className="w-24 h-24 text-orange-500" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-mono-stat uppercase tracking-widest text-[10px] text-orange-300/70 mb-2">ABHA Number</h3>
                    <p className="text-orange-400 tracking-[0.2em] font-mono-stat text-2xl font-bold drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">91-2345-6789-1234</p>
                  </div>
                  <Button className="relative z-10 bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 border border-orange-500/30 rounded-xl font-mono-stat tracking-widest uppercase text-xs h-10 px-6">Show QR</Button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="border border-white/5 bg-white/[0.02] rounded-2xl p-6 hover:bg-white/[0.05] transition-colors">
                    <h4 className="font-mono-stat uppercase tracking-widest text-xs text-white/50 flex items-center mb-4"><Heart className="w-4 h-4 mr-3 text-red-400"/> Blood Group</h4>
                    <p className="text-3xl font-bold text-white/90 tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">O Positive</p>
                  </div>
                  <div className="border border-white/5 bg-white/[0.02] rounded-2xl p-6 hover:bg-white/[0.05] transition-colors">
                    <h4 className="font-mono-stat uppercase tracking-widest text-xs text-white/50 flex items-center mb-4"><MapPin className="w-4 h-4 mr-3 text-blue-400"/> Last Checkup</h4>
                    <p className="text-xl font-medium text-white/90 tracking-wide">12th June, Mumbai</p>
                    <p className="text-sm text-white/40 mt-1 font-mono-stat tracking-wider">City Hospital</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="housing" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Community Housing Verifier</h2>
                <p className="text-sm text-white/50 mt-2">Check real ratings from other workers before moving into a labor camp or PG.</p>
              </div>
              <div>
                <div className="space-y-6">
                  <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:border-orange-500/30 hover:bg-white/[0.05] transition-all group">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <h4 className="font-bold text-white/90 text-xl tracking-wide group-hover:text-orange-400 transition-colors">Sunrise Labor Quarters (Sector 44)</h4>
                        <div className="flex items-center mt-3 space-x-1">
                          <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                          <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                          <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                          <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                          <Star className="w-4 h-4 text-white/20" />
                          <span className="text-[10px] font-mono-stat tracking-widest uppercase text-white/40 ml-3">(124 REVIEWS)</span>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 font-mono-stat tracking-widest text-[10px]">VERIFIED SAFE</Badge>
                    </div>
                    <p className="text-sm text-white/60 mt-6 border-t border-white/5 pt-6 leading-relaxed italic font-light">"Clean drinking water available. No overcrowding. The contractor is decent." - Ramesh K.</p>
                  </div>
                  
                  <div className="p-6 border border-red-500/30 bg-red-500/5 rounded-2xl hover:bg-red-500/10 transition-all group relative overflow-hidden">
                     <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(239,68,68,0.05)_50%,transparent_75%)] bg-[length:250%_250%] group-hover:animate-[shimmer_2s_infinite]" />
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 relative z-10">
                      <div>
                        <h4 className="font-bold text-red-400 text-xl tracking-wide drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Builders Colony Camp (Phase 2)</h4>
                        <div className="flex items-center mt-3 space-x-1">
                          <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                          <Star className="w-4 h-4 text-white/20" />
                          <Star className="w-4 h-4 text-white/20" />
                          <Star className="w-4 h-4 text-white/20" />
                          <Star className="w-4 h-4 text-white/20" />
                          <span className="text-[10px] font-mono-stat tracking-widest uppercase text-white/40 ml-3">(45 REVIEWS)</span>
                        </div>
                      </div>
                      <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 font-mono-stat tracking-widest text-[10px]">AVOID</Badge>
                    </div>
                    <p className="text-sm text-red-200/60 mt-6 border-t border-red-500/20 pt-6 leading-relaxed italic font-light relative z-10">"Terrible hygiene. Only 2 washrooms for 50 people. Do not go here." - Anonymous</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contractor" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Multi-Lingual Contractor Checkpoints</h2>
                <p className="text-sm text-white/50 mt-2">Track the trust scores and payment history of contractors across India.</p>
              </div>
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 relative group">
                  <div className="absolute inset-0 rounded-full bg-orange-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                  <Users className="w-10 h-10 text-white/20 group-hover:text-orange-400 transition-colors relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white/90 tracking-wide mb-3">Search for a Contractor</h3>
                <p className="text-white/50 max-w-md mx-auto leading-relaxed">Enter a contractor's GST number, phone number, or name to view their worker-rated trust score.</p>
                <div className="mt-8 flex justify-center max-w-lg mx-auto relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-500" />
                  <input type="text" placeholder="Enter details..." className="relative w-full bg-black/60 border border-white/10 rounded-l-2xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 font-mono-stat tracking-wide" />
                  <Button className="relative rounded-l-none rounded-r-2xl bg-orange-500 hover:bg-orange-600 text-white px-8 font-mono-stat tracking-widest uppercase text-xs">Search</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
