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
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/modules')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-fuchsia-700">DivyangSahayak</h1>
              <p className="text-sm text-gray-500">Universal Assistive Hub</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        <Tabs defaultValue="translate">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="translate"><Video className="w-4 h-4 mr-2 hidden sm:block"/> Sign Translate</TabsTrigger>
            <TabsTrigger value="jobs"><Briefcase className="w-4 h-4 mr-2 hidden sm:block"/> Jobs</TabsTrigger>
            <TabsTrigger value="therapy"><Activity className="w-4 h-4 mr-2 hidden sm:block"/> Therapy</TabsTrigger>
            <TabsTrigger value="routing"><MapPin className="w-4 h-4 mr-2 hidden sm:block"/> Routing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="translate" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-Time Sign Language Translation</CardTitle>
                <CardDescription>Uses your device camera and Edge AI to translate Indian Sign Language (ISL) to spoken text.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Camera feed mockup */}
                  <div className="flex-1 bg-slate-900 rounded-lg aspect-video flex flex-col items-center justify-center relative overflow-hidden border-2 border-slate-700">
                    {!translating ? (
                      <div className="text-center">
                        <Button onClick={() => setTranslating(true)} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-full w-16 h-16 flex items-center justify-center p-0 mb-4">
                          <Play className="w-8 h-8 ml-1" />
                        </Button>
                        <p className="text-slate-400">Start Camera</p>
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center opacity-50">
                          <span className="text-slate-500">Camera Active</span>
                        </div>
                        {/* Pose estimation lines mockup */}
                        <div className="absolute w-32 h-32 border-t-2 border-l-2 border-fuchsia-400 top-1/4 left-1/4 animate-pulse"></div>
                        <div className="absolute w-32 h-32 border-b-2 border-r-2 border-fuchsia-400 bottom-1/4 right-1/4 animate-pulse"></div>
                        <Button 
                          onClick={() => setTranslating(false)} 
                          variant="destructive" 
                          className="absolute bottom-4 right-4"
                          size="sm"
                        >
                          Stop
                        </Button>
                      </>
                    )}
                  </div>
                  
                  {/* Translation Output */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg flex items-center mb-4"><MessageSquare className="w-5 h-5 mr-2 text-fuchsia-600"/> Translation Output</h3>
                    <div className="flex-1 bg-fuchsia-50 rounded-lg border border-fuchsia-200 p-4 relative min-h-[200px]">
                      {translating ? (
                        <div className="space-y-3">
                          <p className="text-gray-800 text-lg">"Hello, how are you today?"</p>
                          <p className="text-gray-800 text-lg">"I need assistance filling out this form."</p>
                          <div className="flex space-x-1 items-center h-6">
                            <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-400 italic">Translation will appear here...</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Accessible Job Boards</CardTitle>
                <CardDescription>Curated opportunities from employers dedicated to inclusive hiring practices.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:border-fuchsia-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-fuchsia-900">Data Entry Specialist (Remote)</h4>
                        <p className="text-sm text-gray-600 mt-1">TechVision India</p>
                      </div>
                      <Badge className="bg-fuchsia-100 text-fuchsia-800">Visual Impairment Friendly</Badge>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <BriefcaseIcon className="w-4 h-4 mr-2" />
                      Screen-reader compatible software provided.
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg hover:border-fuchsia-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-fuchsia-900">Customer Support Executive</h4>
                        <p className="text-sm text-gray-600 mt-1">Global Services</p>
                      </div>
                      <Badge className="bg-fuchsia-100 text-fuchsia-800">Wheelchair Accessible</Badge>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <BriefcaseIcon className="w-4 h-4 mr-2" />
                      100% accessible office space in Bangalore.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="therapy" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Remote Physical Therapy Coaching</CardTitle>
                <CardDescription>Computer vision powered pose tracking to ensure you are doing prescribed exercises correctly at home.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 rounded-lg aspect-video flex flex-col items-center justify-center border-2 border-dashed border-slate-300">
                  <Activity className="w-12 h-12 text-slate-400 mb-4" />
                  <h3 className="font-semibold text-slate-700">Posture Tracking Camera Offline</h3>
                  <Button className="mt-4" variant="outline">Start Exercise: Shoulder Mobility</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Crowdsourced Routing</CardTitle>
                <CardDescription>Find routes that are mapped for wheelchair accessibility and visually impaired navigation.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 h-64 rounded-lg flex flex-col items-center justify-center border border-gray-300">
                  <Navigation className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">Accessible Map Interface</p>
                </div>
                <div className="mt-4 p-4 bg-fuchsia-50 rounded-lg border border-fuchsia-100">
                  <h4 className="font-semibold text-fuchsia-800">Community Alert</h4>
                  <p className="text-sm text-gray-600 mt-1">The ramp at MG Road Metro Station Gate B is currently under repair. The app has automatically rerouted you to Gate A.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
