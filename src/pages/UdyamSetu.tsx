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
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/modules')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-indigo-700">UdyamSetu</h1>
              <p className="text-sm text-gray-500">MSME Acceleration & B2B Hub</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        <Tabs defaultValue="invoice">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="invoice"><FileText className="w-4 h-4 mr-2 hidden sm:block"/> Invoice Finance</TabsTrigger>
            <TabsTrigger value="freight"><Truck className="w-4 h-4 mr-2 hidden sm:block"/> Freight Matcher</TabsTrigger>
            <TabsTrigger value="gst"><Calculator className="w-4 h-4 mr-2 hidden sm:block"/> GST Compliance</TabsTrigger>
            <TabsTrigger value="export"><Globe className="w-4 h-4 mr-2 hidden sm:block"/> Global Trade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="invoice" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Smart Invoice Financing</CardTitle>
                <CardDescription>Upload unpaid invoices to get instant micro-loans for working capital.</CardDescription>
              </CardHeader>
              <CardContent>
                {financingState === 'idle' && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-indigo-50 transition-colors cursor-pointer" onClick={handleUploadInvoice}>
                    <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Upload Invoice (PDF/JPG)</p>
                    <p className="text-sm text-gray-500 mt-1">Get up to 80% advance instantly</p>
                  </div>
                )}
                
                {financingState === 'uploading' && (
                  <div className="border-2 border-solid border-indigo-200 rounded-lg p-12 text-center bg-indigo-50">
                    <FileText className="w-12 h-12 text-indigo-500 mx-auto mb-4 animate-bounce" />
                    <p className="text-indigo-700 font-medium animate-pulse">Verifying invoice against GSTN registry...</p>
                  </div>
                )}

                {financingState === 'approved' && (
                  <div className="border border-green-200 rounded-lg p-6 bg-green-50 text-center">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-900 mb-2">Advance Approved!</h3>
                    <p className="text-green-800 mb-4">Invoice #INV-2024-089 verified. An advance of <span className="font-bold">₹45,000</span> is ready for disbursal.</p>
                    <div className="flex justify-center space-x-4">
                      <Button className="bg-green-600 hover:bg-green-700">Accept & Disburse to Bank</Button>
                      <Button variant="outline" onClick={() => setFinancingState('idle')}>Upload Another</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="freight" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Dynamic Freight Matcher</CardTitle>
                <CardDescription>Bundle your partial shipments with other local MSMEs to cut logistics costs.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg bg-white shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-indigo-900">Delhi → Mumbai Route</h4>
                      <Badge className="bg-blue-100 text-blue-800">Leaving Today</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Truck Capacity: 80% Full. Add your shipment to share costs.</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Package className="w-4 h-4 mr-2" />
                      <span>Available Space: 500 kg</span>
                    </div>
                    <Button className="w-full">Book Shared Space (Est. ₹2,400)</Button>
                  </div>
                  <div className="p-4 border rounded-lg bg-white shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-indigo-900">Surat → Bangalore Route</h4>
                      <Badge className="bg-yellow-100 text-yellow-800">Leaving Tomorrow</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Truck Capacity: 40% Full. Ideal for bulk textiles.</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Package className="w-4 h-4 mr-2" />
                      <span>Available Space: 2,000 kg</span>
                    </div>
                    <Button className="w-full">Book Shared Space (Est. ₹5,800)</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gst" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Automated GST Compliance</CardTitle>
                <CardDescription>Scan a product to automatically find the correct HSN code and GST rate.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 bg-gray-100 h-48 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <span className="text-gray-500">Camera Viewfinder Mockup</span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="font-semibold text-lg">Analysis Result</h3>
                    <div className="p-3 bg-white border rounded shadow-sm">
                      <span className="text-xs text-gray-500">Detected Item</span>
                      <p className="font-medium">Cotton Woven Fabric</p>
                    </div>
                    <div className="p-3 bg-white border rounded shadow-sm">
                      <span className="text-xs text-gray-500">Suggested HSN Code</span>
                      <p className="font-medium">5208</p>
                    </div>
                    <div className="p-3 bg-indigo-50 border border-indigo-100 rounded shadow-sm">
                      <span className="text-xs text-indigo-500">Applicable GST Rate</span>
                      <p className="font-bold text-indigo-700 text-xl">5%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Global Trade Advisor</CardTitle>
                <CardDescription>AI-powered translation and localized marketing for rural artisans reaching global markets.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2 text-gray-700">Your Product Description (Hindi)</h4>
                    <div className="p-4 bg-gray-50 rounded-lg border h-32 font-medium">
                      "यह हाथ से बुनी हुई खादी की शॉल है, जो सर्दियों के लिए बहुत अच्छी है।"
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-indigo-700">AI Global Translation (English - Premium)</h4>
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 h-32 relative">
                      <SparklesIcon className="absolute top-2 right-2 w-4 h-4 text-indigo-400" />
                      "Authentic hand-woven Khadi shawl. Crafted by traditional artisans, offering premium warmth and sustainable elegance for the winter season."
                    </div>
                  </div>
                </div>
                <Button className="mt-6 w-full md:w-auto">List on ONDC Global Hub</Button>
              </CardContent>
            </Card>
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
