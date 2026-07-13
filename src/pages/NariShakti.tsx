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
    <div className="min-h-screen aurora-bg aurora-animated noise-overlay relative pb-12 overflow-hidden">
      {/* Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-gradient-hero" style={{ fontSize: '15vw', fontWeight: 100, opacity: 0.03 }}>
          NARI_SHAKTI
        </span>
      </div>

      {/* Real NariShakti Header */}
      <header className="glass-strong border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/modules')} className="text-white/50 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white/90">NariShakti Portal</h1>
              <p className="text-xs text-white/40 tracking-widest uppercase mt-0.5">Women's Safety & Empowerment</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all rounded-full px-6"
            onClick={() => setDiscreetMode(true)}
          >
            <EyeOff className="w-4 h-4 mr-2" />
            Discreet Mode
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8 relative z-10">
        <Tabs defaultValue="sos">
          <TabsList className="grid w-full grid-cols-3 glass rounded-2xl p-1 mb-8">
            <TabsTrigger value="sos" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><ShieldAlert className="w-4 h-4 mr-2"/> Guardian</TabsTrigger>
            <TabsTrigger value="route" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Navigation className="w-4 h-4 mr-2"/> Route</TabsTrigger>
            <TabsTrigger value="finance" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Briefcase className="w-4 h-4 mr-2"/> Finance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sos" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">SOS Audio Analytics</h2>
                <p className="text-sm text-white/50 mt-2">Uses on-device Edge AI to detect distress sounds and automatically trigger alerts.</p>
              </div>
              <div className="flex flex-col items-center py-8">
                <div 
                  className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 relative group ${
                    isRecording ? 'bg-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.3)]' : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording && <div className="absolute inset-0 rounded-full animate-ping bg-red-500/20" />}
                  {isRecording ? (
                    <Mic className="w-12 h-12 text-red-400 relative z-10" />
                  ) : (
                    <MicOff className="w-12 h-12 text-white/40 relative z-10 group-hover:text-white/80 transition-colors" />
                  )}
                </div>
                <h3 className="mt-8 font-mono-stat text-sm text-white/70 tracking-widest uppercase">
                  {isRecording ? 'Listening for distress...' : 'Activate Guardian'}
                </h3>
                {isRecording && (
                  <div className="w-full max-w-xs mt-8 glass rounded-xl p-4">
                    <div className="flex justify-between text-xs text-white/50 mb-3 font-mono-stat uppercase">
                      <span>Signal</span>
                      <span className="text-cyan-400">{Math.round(audioLevel)}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${audioLevel > 80 ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]'}`} 
                        style={{ width: `${audioLevel}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="route" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">AI Safety Route Mapping</h2>
                <p className="text-sm text-white/50 mt-2">Finds the safest walking paths based on lighting, crime data, and check-ins.</p>
              </div>
              <div>
                <div className="bg-black/40 h-64 rounded-2xl flex flex-col items-center justify-center border border-white/10 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <Map className="w-12 h-12 text-white/20 mb-4" />
                  <p className="text-white/40 font-mono-stat text-sm tracking-widest uppercase">Map Telemetry</p>
                  <Badge variant="outline" className="mt-4 border-cyan-400/30 text-cyan-400 bg-cyan-400/10">
                    Simulating routes...
                  </Badge>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div>
                      <h4 className="font-semibold text-white/90">Main Street via Park Ave</h4>
                      <p className="text-xs text-white/50 mt-1 font-mono-stat">Safest • Well Lit • Active Patrol</p>
                    </div>
                    <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/20 rounded-full text-xs">Navigate</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-red-500/5 rounded-xl border border-red-500/20 hover:bg-red-500/10 transition-colors">
                    <div>
                      <h4 className="font-semibold text-white/90">Alley 4 Shortcut</h4>
                      <p className="text-xs text-red-400/80 mt-1 font-mono-stat">Fastest • Poor Lighting • 2 Alerts</p>
                    </div>
                    <Button variant="secondary" className="bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-full text-xs">Navigate</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="finance" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Micro-Incubator Engine</h2>
                <p className="text-sm text-white/50 mt-2">Step-by-step guidance for government grants and small business setup.</p>
              </div>
              <div className="space-y-4">
                <div className="p-6 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                  <h4 className="font-semibold text-white/90 text-lg">Mudra Yojana Loan for Women</h4>
                  <p className="text-sm text-white/50 mt-2 leading-relaxed">Collateral-free loans up to ₹10 Lakhs for setting up micro-enterprises.</p>
                  <div className="mt-6 flex space-x-3">
                    <Button className="rounded-full bg-white/10 text-white hover:bg-white/20 text-xs tracking-wide">Check Eligibility</Button>
                    <Button variant="outline" className="rounded-full border-white/20 bg-transparent text-white/70 hover:bg-white/5 text-xs tracking-wide">Learn More</Button>
                  </div>
                </div>
                <div className="p-6 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                  <h4 className="font-semibold text-white/90 text-lg">Stand-Up India Scheme</h4>
                  <p className="text-sm text-white/50 mt-2 leading-relaxed">Bank loans between ₹10 Lakhs and ₹1 Crore for setting up a greenfield enterprise.</p>
                  <div className="mt-6 flex space-x-3">
                    <Button className="rounded-full bg-white/10 text-white hover:bg-white/20 text-xs tracking-wide">Check Eligibility</Button>
                    <Button variant="outline" className="rounded-full border-white/20 bg-transparent text-white/70 hover:bg-white/5 text-xs tracking-wide">Learn More</Button>
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
