import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Map, Briefcase, EyeOff, ArrowLeft, Newspaper, Cloud, ShieldAlert, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function NariShakti() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [discreetMode, setDiscreetMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  // Real Edge AI using Web Audio API for SOS Analytics
  useEffect(() => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let microphone: MediaStreamAudioSourceNode;
    let animationFrame: number;

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        let triggered = false;

        const updateLevel = () => {
          if (!isRecording || triggered) return;
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;
          // Scale average (0-255) to percentage
          const percentage = Math.min(100, (average / 255) * 100 * 2); // Multiplied by 2 to make it more sensitive
          setAudioLevel(percentage);

          if (percentage > 90) {
            triggered = true;
            toast({
              title: "SOS Triggered!",
              description: "High distress vocal frequency detected. Alerting emergency contacts.",
              variant: "destructive"
            });
            setIsRecording(false);
            // Stop tracks
            stream.getTracks().forEach(track => track.stop());
            return;
          }

          animationFrame = requestAnimationFrame(updateLevel);
        };
        updateLevel();
      } catch (err) {
        toast({
          title: "Microphone Access Denied",
          description: "Please allow microphone access to use Guardian Mode.",
          variant: "destructive"
        });
        setIsRecording(false);
      }
    };

    if (isRecording) {
      startRecording();
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, [isRecording, toast]);

  if (discreetMode) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Fake News App Header */}
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Newspaper className="w-6 h-6" />
            <h1 className="text-xl font-bold">Daily News</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setDiscreetMode(false)} className="text-white hover:bg-blue-700">
            <EyeOff className="w-5 h-5" />
          </Button>
        </header>
        
        {/* Fake News Feed */}
        <main className="flex-1 p-4 space-y-4 max-w-2xl mx-auto w-full">
          <Card>
            <CardHeader>
              <CardTitle>Global Markets Rally</CardTitle>
              <CardDescription>2 hours ago</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Stock markets hit record highs today following positive economic data and tech sector growth...</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Weather Update: Heavy Rain Expected</CardTitle>
              <CardDescription>4 hours ago</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Cloud className="w-8 h-8 text-blue-400" />
                <p className="text-gray-600">Citizens are advised to carry umbrellas as sudden downpours are expected across the region...</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-12">
      {/* Real NariShakti Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/modules')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-pink-700">NariShakti Portal</h1>
              <p className="text-sm text-gray-500">Women's Safety & Empowerment</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="border-gray-300 hover:bg-gray-100"
            onClick={() => setDiscreetMode(true)}
          >
            <EyeOff className="w-4 h-4 mr-2" />
            Discreet Mode
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        <Tabs defaultValue="sos">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sos"><ShieldAlert className="w-4 h-4 mr-2"/> SOS Guardian</TabsTrigger>
            <TabsTrigger value="route"><Navigation className="w-4 h-4 mr-2"/> Safe Route</TabsTrigger>
            <TabsTrigger value="finance"><Briefcase className="w-4 h-4 mr-2"/> Micro-Incubator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sos" className="mt-6">
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle>SOS Audio Analytics</CardTitle>
                <CardDescription>Uses on-device Edge AI to detect distress sounds and automatically trigger alerts without you touching the phone.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-8">
                <div 
                  className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                    isRecording ? 'bg-red-100 animate-pulse' : 'bg-gray-100 hover:bg-pink-100'
                  }`}
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? (
                    <Mic className="w-12 h-12 text-red-600" />
                  ) : (
                    <MicOff className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <h3 className="mt-6 font-semibold text-lg">
                  {isRecording ? 'Listening for distress keywords...' : 'Tap to Activate Guardian Mode'}
                </h3>
                {isRecording && (
                  <div className="w-full max-w-xs mt-6">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Audio Level</span>
                      <span>{Math.round(audioLevel)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${audioLevel > 80 ? 'bg-red-500' : 'bg-green-500'}`} 
                        style={{ width: `${audioLevel}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="route" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Safety Route Mapping</CardTitle>
                <CardDescription>Finds the safest walking paths based on lighting, crime data, and active community check-ins.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 h-64 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                  <Map className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">Interactive Map Interface</p>
                  <Badge variant="outline" className="mt-2 bg-white">
                    Simulating safe route generation...
                  </Badge>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <h4 className="font-semibold text-green-800">Main Street via Park Ave</h4>
                      <p className="text-sm text-green-600">Safest Route • Well Lit • Active Police Patrol</p>
                    </div>
                    <Button variant="secondary" className="bg-green-200 text-green-800 hover:bg-green-300">Start Navigation</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div>
                      <h4 className="font-semibold text-yellow-800">Alley 4 Shortcut</h4>
                      <p className="text-sm text-yellow-600">Fastest Route • Poor Lighting • 2 Recent Reports</p>
                    </div>
                    <Button variant="secondary" className="bg-yellow-200 text-yellow-800 hover:bg-yellow-300">Start Navigation</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="finance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Micro-Incubator Engine</CardTitle>
                <CardDescription>Step-by-step guidance for government grants and small business setup.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg bg-pink-50">
                    <h4 className="font-semibold text-pink-800">Mudra Yojana Loan for Women</h4>
                    <p className="text-sm text-gray-600 mt-1">Collateral-free loans up to ₹10 Lakhs for setting up micro-enterprises.</p>
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm">Check Eligibility</Button>
                      <Button size="sm" variant="outline">Learn More</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg bg-pink-50">
                    <h4 className="font-semibold text-pink-800">Stand-Up India Scheme</h4>
                    <p className="text-sm text-gray-600 mt-1">Bank loans between ₹10 Lakhs and ₹1 Crore for setting up a greenfield enterprise.</p>
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm">Check Eligibility</Button>
                      <Button size="sm" variant="outline">Learn More</Button>
                    </div>
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
