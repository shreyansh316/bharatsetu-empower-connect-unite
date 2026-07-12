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
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/modules')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-teal-700">FinJan</h1>
              <p className="text-sm text-gray-500">Financial Literacy & Inclusive Banking</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        <Tabs defaultValue="scan">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scan"><Scan className="w-4 h-4 mr-2 hidden sm:block"/> Scan Loan</TabsTrigger>
            <TabsTrigger value="invest"><TrendingUp className="w-4 h-4 mr-2 hidden sm:block"/> Invest</TabsTrigger>
            <TabsTrigger value="audit"><Mic className="w-4 h-4 mr-2 hidden sm:block"/> Voice Audit</TabsTrigger>
            <TabsTrigger value="subsidy"><Landmark className="w-4 h-4 mr-2 hidden sm:block"/> Subsidies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scan" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Predatory Loan Screener</CardTitle>
                <CardDescription>Scan loan documents to instantly highlight hidden fees and exorbitant interest rates using our OCR engine.</CardDescription>
              </CardHeader>
              <CardContent>
                {!scanning && !scanResult && (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-teal-50 transition-colors cursor-pointer" 
                    onClick={handleScan}
                  >
                    <Scan className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Tap to scan loan document</p>
                    <p className="text-sm text-gray-500 mt-1">Uses device camera</p>
                  </div>
                )}

                {scanning && (
                  <div className="border-2 border-solid border-teal-200 rounded-lg p-12 text-center bg-teal-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-teal-500 animate-[bounce_2s_ease-in-out_infinite]" />
                    <Scan className="w-12 h-12 text-teal-500 mx-auto mb-4 animate-pulse" />
                    <p className="text-teal-700 font-medium">Extracting financial terms via OCR...</p>
                  </div>
                )}

                {scanResult && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 bg-red-50 p-4 rounded-lg border border-red-200">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                      <div>
                        <h4 className="font-bold text-red-800">High Risk Detected</h4>
                        <p className="text-sm text-red-700">The annualized interest rate calculates to 38%, which exceeds legal caps for micro-loans.</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                      <div>
                        <h4 className="font-bold text-yellow-800">Hidden Processing Fee</h4>
                        <p className="text-sm text-yellow-700">Clause 4b mandates a 5% processing fee deducted upfront.</p>
                      </div>
                    </div>
                    <Button onClick={() => setScanResult(false)} variant="outline" className="w-full mt-4">Scan Another Document</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invest" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Fractional Micro-Investments</CardTitle>
                <CardDescription>Start building wealth with as little as ₹10.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-teal-50 rounded-lg border border-teal-100 mb-6">
                  <h3 className="text-lg font-medium text-teal-800">Portfolio Value</h3>
                  <p className="text-4xl font-bold text-teal-600 mt-2">₹1,245.50</p>
                  <Badge className="mt-2 bg-green-500">+12.4% this year</Badge>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 border rounded-lg hover:border-teal-300 transition-colors cursor-pointer">
                    <h4 className="font-bold">Government Gold Bond</h4>
                    <p className="text-sm text-gray-500 mb-4">Low risk • 2.5% fixed interest</p>
                    <Button size="sm" className="w-full">Invest ₹10+</Button>
                  </div>
                  <div className="p-4 border rounded-lg hover:border-teal-300 transition-colors cursor-pointer">
                    <h4 className="font-bold">Index Mutual Fund</h4>
                    <p className="text-sm text-gray-500 mb-4">Med risk • Tracks Nifty 50</p>
                    <Button size="sm" className="w-full">Invest ₹50+</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversational Expense Auditing</CardTitle>
                <CardDescription>Speak to log your expenses in your native language.</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-teal-100 cursor-pointer transition-colors">
                  <Mic className="w-10 h-10 text-teal-600" />
                </div>
                <h3 className="text-lg font-medium">Tap to Speak</h3>
                <p className="text-gray-500 mt-2">"I spent 50 rupees on milk today..."</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subsidy" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Subsidy Eligibility Engine</CardTitle>
                <CardDescription>Based on your profile, you are eligible for the following schemes.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-bold flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/> PM Kisan Samman Nidhi</h4>
                      <p className="text-sm text-gray-500 mt-1">₹6,000 per year for farmer families.</p>
                    </div>
                    <Button variant="outline" size="sm">Apply Now</Button>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-bold flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/> Ayushman Bharat</h4>
                      <p className="text-sm text-gray-500 mt-1">Health insurance cover up to ₹5 Lakhs.</p>
                    </div>
                    <Button variant="outline" size="sm">Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
