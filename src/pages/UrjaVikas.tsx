import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Sun, Zap, TrendingUp, Shield, MapPin, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UrjaVikas() {
  const navigate = useNavigate();
  const [calculating, setCalculating] = useState(false);

  const handleCalculate = () => {
    setCalculating(true);
    setTimeout(() => setCalculating(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-amber-500 border-b shadow-sm sticky top-0 z-10 text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-amber-600" onClick={() => navigate('/modules')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">UrjaVikas</h1>
              <p className="text-sm text-amber-100">Green Energy & Subsidies</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        <Tabs defaultValue="solar">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="solar"><Sun className="w-4 h-4 mr-2 hidden sm:block"/> Solar</TabsTrigger>
            <TabsTrigger value="invest"><TrendingUp className="w-4 h-4 mr-2 hidden sm:block"/> Invest</TabsTrigger>
            <TabsTrigger value="meters"><Zap className="w-4 h-4 mr-2 hidden sm:block"/> Meters</TabsTrigger>
            <TabsTrigger value="credits"><Shield className="w-4 h-4 mr-2 hidden sm:block"/> Credits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="solar" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Solar Subsidy Calculator</CardTitle>
                <CardDescription>Get an instant estimate of government subsidies for rooftop solar based on your location.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Property Location (Auto-detected)</label>
                      <div className="flex items-center mt-1 border rounded-md px-3 py-2 bg-gray-100 text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" /> Sector 12, Gandhinagar
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Average Monthly Bill (₹)</label>
                      <input type="number" defaultValue="2500" className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Available Roof Area (sq. ft)</label>
                      <input type="number" defaultValue="500" className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500" />
                    </div>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={handleCalculate} disabled={calculating}>
                      {calculating ? 'Calculating Subsidies...' : 'Calculate Subsidy & Savings'}
                    </Button>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 flex flex-col justify-center">
                    {!calculating ? (
                       <>
                         <h3 className="text-lg font-semibold text-amber-900 mb-4">Estimated Results</h3>
                         <div className="space-y-3">
                           <div className="flex justify-between border-b border-amber-200 pb-2">
                             <span className="text-amber-800">System Size</span>
                             <span className="font-bold text-amber-900">3 kW</span>
                           </div>
                           <div className="flex justify-between border-b border-amber-200 pb-2">
                             <span className="text-amber-800">Total Cost</span>
                             <span className="font-bold text-amber-900">₹1,45,000</span>
                           </div>
                           <div className="flex justify-between border-b border-amber-200 pb-2">
                             <span className="text-amber-800 flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-green-600"/> PM Surya Ghar Subsidy</span>
                             <span className="font-bold text-green-700">-₹78,000</span>
                           </div>
                           <div className="flex justify-between pt-2">
                             <span className="text-amber-800 font-semibold">Your Payable Amount</span>
                             <span className="font-bold text-2xl text-amber-900">₹67,000</span>
                           </div>
                         </div>
                       </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-amber-600">
                        <Sun className="w-12 h-12 animate-spin-slow mb-4" />
                        <p>Fetching state policies...</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invest" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Wind-Farm Micro-Investments</CardTitle>
                <CardDescription>Invest as little as ₹500 into local green energy projects and earn returns.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 hover:border-amber-400 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">Kutch Wind Project Phase II</h4>
                      <p className="text-sm text-gray-500">Adani Green Energy Ltd</p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">12% Est. APY</div>
                  </div>
                  <div className="mt-4 mb-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full w-[75%]"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                    <span>₹75 Lakhs raised</span>
                    <span>₹1 Crore Goal</span>
                  </div>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">Invest Now (Min ₹500)</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meters" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Smart Meter Tracking</CardTitle>
                <CardDescription>Monitor your daily electricity usage and grid export in real-time.</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                 <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                 <h3 className="text-lg font-medium text-gray-700">No Smart Meter Detected</h3>
                 <p className="text-gray-500 mt-2 max-w-sm mx-auto">Link your smart meter ID to view live energy consumption and solar export data.</p>
                 <Button className="mt-6" variant="outline">Link Smart Meter</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="credits" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Carbon Credits Wallet</CardTitle>
                <CardDescription>Earn points for low energy usage and redeem them for local transit discounts.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg p-6 text-white text-center shadow-lg">
                  <h3 className="text-sm opacity-90 uppercase tracking-wider font-semibold">Your Carbon Balance</h3>
                  <p className="text-5xl font-bold mt-2">1,250 <span className="text-xl">pts</span></p>
                  <p className="text-sm mt-2 opacity-90">Equivalent to 12.5 kg of CO2 saved</p>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button className="bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50">Redeem for Transit Pass</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
