import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, PlusCircle, Activity, Phone, FileText, Camera, Navigation, Focus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ArogyaDoot() {
  const navigate = useNavigate();
  const [cameraActive, setCameraActive] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      setPhotoCaptured(null);
      setDiagnosis(null);
    } catch (err) {
      alert("Could not access camera. Please allow permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setPhotoCaptured(canvas.toDataURL('image/png'));
        stopCamera();
        simulateScan();
      }
    }
  };

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setDiagnosis("Analysis Complete: Minor skin abrasion detected. Apply antiseptic cream and keep dry. Confidence: 94%");
    }, 2500);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-rose-600 border-b shadow-sm sticky top-0 z-10 text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-rose-700" onClick={() => navigate('/modules')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">ArogyaDoot</h1>
              <p className="text-sm text-rose-100">Telemedicine & Rural Health</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        <Tabs defaultValue="check">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="check"><Activity className="w-4 h-4 mr-2 hidden sm:block"/> AI Check</TabsTrigger>
            <TabsTrigger value="consult"><Phone className="w-4 h-4 mr-2 hidden sm:block"/> Consult</TabsTrigger>
            <TabsTrigger value="pharmacy"><PlusCircle className="w-4 h-4 mr-2 hidden sm:block"/> Pharmacy</TabsTrigger>
            <TabsTrigger value="records"><FileText className="w-4 h-4 mr-2 hidden sm:block"/> Records</TabsTrigger>
          </TabsList>
          
          <TabsContent value="check" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Symptom Checker (Offline Triage)</CardTitle>
                <CardDescription>Scan skin conditions or enter symptoms to get immediate first-aid advice.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 rounded-lg aspect-video flex flex-col items-center justify-center border-2 border-slate-700 relative overflow-hidden">
                  
                  {!cameraActive && !photoCaptured && (
                    <>
                      <Camera className="w-12 h-12 text-slate-400 mb-4" />
                      <p className="text-slate-300 font-medium">Scan using Camera</p>
                      <Button className="mt-4 bg-rose-600 hover:bg-rose-700" onClick={startCamera}>Start Scanner</Button>
                    </>
                  )}

                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className={`absolute inset-0 w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                  />
                  
                  {cameraActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
                      <div className="w-48 h-48 border-2 border-green-500 rounded-lg mb-8 relative">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-400"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400"></div>
                      </div>
                      <Button className="bg-rose-600 hover:bg-rose-700 mb-2" onClick={capturePhoto}>
                        <Focus className="w-4 h-4 mr-2"/> Capture & Analyze
                      </Button>
                    </div>
                  )}

                  {photoCaptured && (
                    <div className="absolute inset-0 w-full h-full">
                      <img src={photoCaptured} className="w-full h-full object-cover" alt="Captured" />
                      {scanning && (
                        <div className="absolute inset-0 bg-blue-900/40 flex flex-col items-center justify-center backdrop-blur-sm">
                          <Activity className="w-12 h-12 text-white animate-pulse mb-4" />
                          <p className="text-white font-bold tracking-widest uppercase">Analyzing Pixels...</p>
                          <div className="w-64 h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                            <div className="h-full bg-blue-400 animate-[pulse_1s_ease-in-out_infinite] w-full" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {photoCaptured && !scanning && (
                  <div className="mt-4 flex justify-between">
                     <Button variant="outline" onClick={startCamera}>Retake Photo</Button>
                  </div>
                )}

                <div className="mt-4 p-4 border rounded-lg bg-rose-50 border-rose-200 text-center">
                  <p className="text-sm text-rose-800 font-medium">
                    {diagnosis || "No active symptoms detected. Please scan an area to analyze."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consult" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Remote Doctor Consultations</CardTitle>
                <CardDescription>Connect with specialists via low-bandwidth video or audio calls.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 flex justify-between items-center hover:border-rose-300 transition-colors">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-4">
                        <Activity className="w-6 h-6 text-rose-600" />
                      </div>
                      <div>
                        <h4 className="font-bold">General Physician</h4>
                        <p className="text-sm text-gray-500">Wait time: ~5 mins</p>
                      </div>
                    </div>
                    <Button className="bg-rose-600 hover:bg-rose-700">Join Queue</Button>
                  </div>
                  <div className="border rounded-lg p-4 flex justify-between items-center hover:border-rose-300 transition-colors">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <Activity className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold">Pediatrician</h4>
                        <p className="text-sm text-gray-500">Wait time: ~12 mins</p>
                      </div>
                    </div>
                    <Button className="bg-rose-600 hover:bg-rose-700">Join Queue</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pharmacy" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Drone Medicine Delivery</CardTitle>
                <CardDescription>Emergency vaccines and anti-venom dispatched via autonomous drones.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 h-64 rounded-lg flex flex-col items-center justify-center border border-gray-300 relative overflow-hidden">
                  {/* Fake Drone animation */}
                  <div className="absolute w-full h-full">
                    <div className="absolute top-1/2 left-1/4 w-32 border-b-2 border-dashed border-gray-400"></div>
                    <Navigation className="absolute top-1/2 left-1/4 transform -translate-y-1/2 text-rose-600 w-8 h-8 animate-pulse" />
                    <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2">
                      <MapPin className="w-6 h-6 text-green-600" />
                      <p className="text-xs font-bold absolute -bottom-4 -left-4 w-20 text-center">Your Location</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">Active Dispatch: Snake Anti-Venom</h4>
                      <p className="text-sm text-gray-500">ETA: 14 Minutes</p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">In Flight</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
                <CardDescription>Your complete medical records synced securely with your ABHA ID.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h4 className="text-gray-600 font-medium">No records found</h4>
                    <p className="text-gray-400 text-sm mt-1">Sync your ABHA ID to import your history.</p>
                    <Button variant="outline" className="mt-4">Sync ABHA Profile</Button>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
