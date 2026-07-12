import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { WifiOff, Activity, MapPin, FileText, Users, ArrowLeft, RadioReceiver, UploadCloud, CheckCircle2, ShieldAlert, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDatabase } from '@/lib/offline-db';

export default function ResQNet() {
  const navigate = useNavigate();
  const [meshActive, setMeshActive] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [logistics, setLogistics] = useState<any[]>([]);

  useEffect(() => {
    const loadLogistics = async () => {
      const db = await getDatabase();
      const sub = db.logistics.find().$.subscribe(data => {
        setLogistics(data.map(d => d.toJSON()));
      });
      return () => sub.unsubscribe();
    };
    loadLogistics();
  }, []);

  const addMockDispatch = async () => {
    const db = await getDatabase();
    await db.logistics.insert({
      id: Math.random().toString(36).substr(2, 9),
      resourceType: 'Emergency Blankets',
      quantity: '100 Units',
      destination: 'Shelter Gamma',
      status: 'Dispatched'
    });
  };

  // Simulate automatic detection of network outage
  useEffect(() => {
    const timer = setTimeout(() => {
      setMeshActive(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSimulateUpload = () => {
    setUploadingImage(true);
    setMatchFound(false);
    setTimeout(() => {
      setUploadingImage(false);
      setMatchFound(true);
    }, 3000); // 3 seconds scanning
  };

  const [scannedDevices, setScannedDevices] = useState<{name: string, id: string}[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const scanForBluetooth = async () => {
    setIsScanning(true);
    try {
      if (!navigator.bluetooth) {
        alert("Web Bluetooth API is not supported in this browser. Please use Chrome/Edge on Desktop or Android.");
        setIsScanning(false);
        return;
      }
      
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true
      });
      
      if (device) {
        setScannedDevices(prev => [...prev, { name: device.name || 'Unknown Node', id: device.id }]);
      }
    } catch (err) {
      console.log("Bluetooth scan cancelled or failed:", err);
    }
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Network Status Header */}
      <div className={`transition-all duration-500 text-white p-2 text-center text-sm font-semibold flex items-center justify-center space-x-2 ${meshActive ? 'bg-orange-600' : 'bg-green-600'}`}>
        {meshActive ? (
          <>
            <WifiOff className="w-4 h-4" />
            <span>CRITICAL: Telecom Outage Detected. Routing via local Bluetooth Mesh Network.</span>
          </>
        ) : (
          <>
            <Activity className="w-4 h-4" />
            <span>Network connection stable.</span>
          </>
        )}
      </div>

      <header className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/modules')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-red-700">ResQNet</h1>
              <p className="text-sm text-gray-500">Disaster Management & Offline Mesh</p>
            </div>
          </div>
          {meshActive && (
            <Badge variant="destructive" className="animate-pulse">
              <RadioReceiver className="w-3 h-3 mr-1" /> Mesh Active
            </Badge>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        <Tabs defaultValue="mesh">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mesh"><RadioReceiver className="w-4 h-4 mr-2 hidden sm:block"/> Mesh Sync</TabsTrigger>
            <TabsTrigger value="map"><MapPin className="w-4 h-4 mr-2 hidden sm:block"/> Damage Map</TabsTrigger>
            <TabsTrigger value="ledger"><FileText className="w-4 h-4 mr-2 hidden sm:block"/> Dispatch Ledger</TabsTrigger>
            <TabsTrigger value="family"><Users className="w-4 h-4 mr-2 hidden sm:block"/> Find Family</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mesh" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Local Peer-to-Peer Routing</CardTitle>
                  <CardDescription>Visualizing nearby devices forwarding your emergency SOS packets.</CardDescription>
                </div>
                <Button onClick={scanForBluetooth} disabled={isScanning} className="bg-orange-600 hover:bg-orange-700">
                  {isScanning ? 'Scanning...' : 'Scan Bluetooth Mesh'}
                </Button>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12 relative overflow-hidden h-96">
                {/* Radar Mockup */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[300px] h-[300px] rounded-full border border-orange-200 animate-[ping_3s_linear_infinite]" />
                  <div className="w-[200px] h-[200px] rounded-full border border-orange-300 animate-[ping_2s_linear_infinite] absolute" />
                  <div className="w-[100px] h-[100px] rounded-full bg-orange-100 absolute flex items-center justify-center">
                    <Activity className="w-8 h-8 text-orange-600" />
                  </div>
                </div>

                {/* Nodes */}
                {scannedDevices.length === 0 && (
                  <>
                    <div className="z-10 absolute top-1/4 left-1/4">
                      <Badge variant="outline" className="bg-white shadow-md text-orange-700 opacity-50"><RadioReceiver className="w-3 h-3 mr-1"/> Disconnected</Badge>
                    </div>
                  </>
                )}

                {scannedDevices.map((dev, i) => (
                  <div key={i} className={`z-10 absolute ${i % 2 === 0 ? 'top-1/4 left-1/4' : 'bottom-1/3 right-1/4'} ${i === 2 ? 'top-1/2 right-1/3 mt-12' : ''}`}>
                    <Badge variant="outline" className="bg-white shadow-md text-orange-700 border-orange-400">
                      <RadioReceiver className="w-3 h-3 mr-1 text-orange-600 animate-pulse"/> {dev.name}
                    </Badge>
                  </div>
                ))}

                <div className="z-10 mt-64 bg-white/80 p-4 rounded text-sm font-medium text-center shadow">
                  <p className="text-orange-800">Connected to {scannedDevices.length} local nodes.</p>
                  <p className="text-gray-600 font-normal">Last packet forwarded: {scannedDevices.length > 0 ? 'Just now' : 'Waiting for connection...'}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="map" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Satellite Damage Mapping</CardTitle>
                <CardDescription>Live overlay of structural failures identified by post-disaster satellite imagery.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-200 h-[400px] rounded-lg relative overflow-hidden flex items-center justify-center border border-slate-300">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                  
                  {/* Fake map routes */}
                  <div className="absolute top-1/2 left-0 right-0 h-4 bg-gray-400 rotate-12" />
                  <div className="absolute top-0 bottom-0 left-1/3 w-4 bg-gray-400 -rotate-6" />

                  {/* Blockages / Hazards */}
                  <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-red-100 p-2 rounded-full border-2 border-red-500 shadow-lg animate-pulse">
                      <ShieldAlert className="w-6 h-6 text-red-600" />
                    </div>
                    <span className="bg-white px-2 py-1 text-xs font-bold rounded shadow mt-1 absolute -left-4 w-32">Bridge Collapsed</span>
                  </div>

                  <div className="absolute top-1/4 right-1/4">
                    <div className="bg-yellow-100 p-2 rounded-full border-2 border-yellow-500 shadow-lg">
                      <MapPin className="w-6 h-6 text-yellow-600" />
                    </div>
                    <span className="bg-white px-2 py-1 text-xs font-bold rounded shadow mt-1 absolute -left-4 w-32 text-center">Relief Camp Alpha</span>
                  </div>

                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ledger" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Dispatch Ledger</CardTitle>
                <CardDescription>Transparent coordination for food, medicine, and rescue drops.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3">Resource Type</th>
                        <th className="px-6 py-3">Quantity</th>
                        <th className="px-6 py-3">Destination</th>
                        <th className="px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logistics.length === 0 ? (
                        <tr><td colSpan={4} className="text-center py-4">No data available.</td></tr>
                      ) : (
                        logistics.map((item) => (
                          <tr key={item.id} className="bg-white border-b">
                            <td className="px-6 py-4 font-medium text-gray-900">{item.resourceType}</td>
                            <td className="px-6 py-4">{item.quantity}</td>
                            <td className="px-6 py-4">{item.destination}</td>
                            <td className="px-6 py-4">
                              <Badge className={
                                item.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                item.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }>{item.status}</Badge>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button size="sm" variant="outline" onClick={addMockDispatch}>
                    <Plus className="w-4 h-4 mr-2" /> Add Mock Dispatch
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="family" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Missing Person Matching</CardTitle>
                <CardDescription>Upload a photo of a missing family member. Our CV engine will cross-reference shelter registries.</CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadingImage && !matchFound && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={handleSimulateUpload}>
                    <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Tap to upload a photo</p>
                    <p className="text-sm text-gray-500 mt-1">Simulated Computer Vision Analysis</p>
                  </div>
                )}

                {uploadingImage && (
                  <div className="border-2 border-solid border-blue-200 rounded-lg p-12 text-center bg-blue-50">
                    <Activity className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
                    <p className="text-blue-700 font-medium animate-pulse">Running facial landmark vectors across 12,000 camp records...</p>
                  </div>
                )}

                {matchFound && (
                  <div className="border border-green-200 rounded-lg p-6 bg-green-50 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-green-900 mb-1">High Confidence Match (98.2%)</h3>
                      <p className="text-green-800">A person matching the uploaded photo is currently safely registered at <span className="font-bold">Relief Camp Alpha</span>.</p>
                      <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white" onClick={() => setMatchFound(false)}>
                        Upload Another Photo
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
