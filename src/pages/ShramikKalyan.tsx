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
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/modules')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-orange-700">ShramikKalyan</h1>
              <p className="text-sm text-gray-500">Migrant Worker Protection</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        <Tabs defaultValue="escrow">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="escrow"><Shield className="w-4 h-4 mr-2 hidden sm:block"/> Wage Escrow</TabsTrigger>
            <TabsTrigger value="health"><Heart className="w-4 h-4 mr-2 hidden sm:block"/> Health ID</TabsTrigger>
            <TabsTrigger value="housing"><MapPin className="w-4 h-4 mr-2 hidden sm:block"/> Housing</TabsTrigger>
            <TabsTrigger value="contractor"><Users className="w-4 h-4 mr-2 hidden sm:block"/> Contractors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="escrow" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Smart Wage Escrow Protection</CardTitle>
                <CardDescription>Ensures you get paid on time. Employers deposit funds into escrow before you start work.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg p-6 text-white shadow-md mb-6">
                  <h3 className="text-sm font-medium opacity-90">Current Escrow Balance (Site A)</h3>
                  <p className="text-4xl font-bold mt-1">₹14,500</p>
                  <div className="mt-4 flex justify-between items-center text-sm opacity-90 border-t border-white/20 pt-4">
                    <span>Next Payout: 15th Aug</span>
                    <span>Status: Fully Funded</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-700">Recent Transactions</h4>
                  <Button size="sm" variant="outline" onClick={addMockTransaction}>
                    <Plus className="w-4 h-4 mr-1" /> Mock Receive
                  </Button>
                </div>
                <div className="space-y-3">
                  {transactions.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No recent transactions.</p>
                  ) : (
                    transactions.map((tx) => (
                      <div key={tx.id} className="flex justify-between items-center p-3 border rounded-lg bg-white">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${tx.status === 'completed' ? 'bg-green-100' : 'bg-orange-100'}`}>
                            {tx.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Clock className="w-5 h-5 text-orange-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{tx.title}</p>
                            <p className="text-xs text-gray-500">{tx.subtitle}</p>
                          </div>
                        </div>
                        <span className={`font-bold ${tx.status === 'completed' ? 'text-green-600' : 'text-orange-600'}`}>{tx.amount}</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Portable Healthcare Profile</CardTitle>
                <CardDescription>Your medical history follows you across states. Linked securely to your ABHA ID.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg mb-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-orange-900">ABHA Number</h3>
                    <p className="text-orange-800 tracking-wider font-mono text-lg mt-1">91-2345-6789-1234</p>
                  </div>
                  <Button variant="outline" className="bg-white">Show QR</Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-700 flex items-center"><Heart className="w-4 h-4 mr-2 text-red-500"/> Blood Group</h4>
                    <p className="text-2xl font-bold mt-2">O Positive</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-700 flex items-center"><MapPin className="w-4 h-4 mr-2 text-blue-500"/> Last Checkup</h4>
                    <p className="text-lg font-medium mt-2">12th June, Mumbai</p>
                    <p className="text-sm text-gray-500">City Hospital</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="housing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Housing Verifier</CardTitle>
                <CardDescription>Check real ratings from other workers before moving into a labor camp or PG.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:border-orange-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-orange-900">Sunrise Labor Quarters (Sector 44)</h4>
                        <div className="flex items-center mt-1 space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <Star className="w-4 h-4 text-gray-300" />
                          <span className="text-sm text-gray-600 ml-2">(124 Reviews)</span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Verified Safe</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 border-t pt-3">"Clean drinking water available. No overcrowding. The contractor is decent." - Ramesh K.</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg border-red-200 bg-red-50 hover:border-red-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-red-900">Builders Colony Camp (Phase 2)</h4>
                        <div className="flex items-center mt-1 space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <Star className="w-4 h-4 text-gray-300" />
                          <Star className="w-4 h-4 text-gray-300" />
                          <Star className="w-4 h-4 text-gray-300" />
                          <Star className="w-4 h-4 text-gray-300" />
                          <span className="text-sm text-gray-600 ml-2">(45 Reviews)</span>
                        </div>
                      </div>
                      <Badge variant="destructive">Avoid</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 border-t border-red-200 pt-3">"Terrible hygiene. Only 2 washrooms for 50 people. Do not go here." - Anonymous</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contractor" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Lingual Contractor Checkpoints</CardTitle>
                <CardDescription>Track the trust scores and payment history of contractors across India.</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700">Search for a Contractor</h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">Enter a contractor's GST number, phone number, or name to view their worker-rated trust score.</p>
                <div className="mt-6 flex justify-center max-w-sm mx-auto">
                  <input type="text" placeholder="Enter details..." className="border rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  <Button className="rounded-l-none bg-orange-600 hover:bg-orange-700 text-white">Search</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
