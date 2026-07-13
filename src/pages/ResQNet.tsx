import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { WifiOff, Activity, MapPin, FileText, Users, ArrowLeft, RadioReceiver, UploadCloud, CheckCircle2, ShieldAlert, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDatabase } from '@/lib/offline-db';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Webpack/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons for our Anti-Gravity Aesthetic
const hazardIcon = L.divIcon({
  className: 'custom-hazard-icon',
  html: `<div style="background-color: rgba(239, 68, 68, 0.2); padding: 8px; border-radius: 50%; border: 1px solid rgba(239, 68, 68, 0.5); box-shadow: 0 0 20px rgba(239, 68, 68, 0.5); width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

const reliefIcon = L.divIcon({
  className: 'custom-relief-icon',
  html: `<div style="background-color: rgba(34, 211, 238, 0.2); padding: 8px; border-radius: 50%; border: 1px solid rgba(34, 211, 238, 0.5); box-shadow: 0 0 20px rgba(34, 211, 238, 0.5); width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

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

  const mapCenter: [number, number] = [28.6139, 77.2090]; // New Delhi

  return (
    <div className="min-h-screen aurora-bg aurora-animated noise-overlay relative pb-12 overflow-hidden">
      {/* Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-gradient-hero" style={{ fontSize: '15vw', fontWeight: 100, opacity: 0.03 }}>
          RES_Q_NET
        </span>
      </div>

      {/* Network Status Header */}
      <div className={`transition-all duration-500 text-white p-2 text-center text-xs font-mono-stat flex items-center justify-center space-x-2 relative z-30 uppercase tracking-widest ${meshActive ? 'bg-red-500/20 backdrop-blur-md border-b border-red-500/30 text-red-100' : 'bg-cyan-500/10 backdrop-blur-md border-b border-cyan-500/20 text-cyan-100'}`}>
        {meshActive ? (
          <>
            <WifiOff className="w-4 h-4 text-red-400 animate-pulse" />
            <span>Telecom Outage Detected. Routing via local Bluetooth Mesh.</span>
          </>
        ) : (
          <>
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Network connection stable.</span>
          </>
        )}
      </div>

      <header className="glass-strong border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/modules')} className="text-white/50 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white/90">ResQNet</h1>
              <p className="text-xs text-white/40 tracking-widest uppercase mt-0.5">Disaster Management & Offline Mesh</p>
            </div>
          </div>
          {meshActive && (
            <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.4)]">
              <RadioReceiver className="w-3 h-3 mr-1" /> Mesh Active
            </Badge>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 relative z-10">
        <Tabs defaultValue="mesh">
          <TabsList className="grid w-full grid-cols-4 glass rounded-2xl p-1 mb-8">
            <TabsTrigger value="mesh" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><RadioReceiver className="w-4 h-4 mr-2 hidden sm:block"/> Sync</TabsTrigger>
            <TabsTrigger value="map" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><MapPin className="w-4 h-4 mr-2 hidden sm:block"/> Map</TabsTrigger>
            <TabsTrigger value="ledger" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><FileText className="w-4 h-4 mr-2 hidden sm:block"/> Ledger</TabsTrigger>
            <TabsTrigger value="family" className="rounded-xl data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50"><Users className="w-4 h-4 mr-2 hidden sm:block"/> Find</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mesh" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="flex flex-row items-center justify-between mb-8 border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white/90">Local Peer-to-Peer Routing</h2>
                  <p className="text-sm text-white/50 mt-2">Visualizing nearby devices forwarding your emergency SOS packets.</p>
                </div>
                <Button onClick={scanForBluetooth} disabled={isScanning} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 rounded-full text-xs uppercase tracking-wider font-mono-stat">
                  {isScanning ? 'Scanning...' : 'Scan Mesh'}
                </Button>
              </div>
              <div className="flex flex-col items-center justify-center py-12 relative overflow-hidden h-96 bg-black/40 rounded-2xl border border-white/5">
                {/* Radar Mockup */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[300px] h-[300px] rounded-full border border-cyan-400/20 animate-[ping_3s_linear_infinite]" />
                  <div className="w-[200px] h-[200px] rounded-full border border-cyan-400/40 animate-[ping_2s_linear_infinite] absolute" />
                  <div className="w-[100px] h-[100px] rounded-full bg-cyan-400/10 absolute flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                    <Activity className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>

                {/* Nodes */}
                {scannedDevices.length === 0 && (
                  <>
                    <div className="z-10 absolute top-1/4 left-1/4">
                      <Badge variant="outline" className="bg-black/50 backdrop-blur-md border-red-500/30 text-red-400/70"><RadioReceiver className="w-3 h-3 mr-1"/> Disconnected</Badge>
                    </div>
                  </>
                )}

                {scannedDevices.map((dev, i) => (
                  <div key={i} className={`z-10 absolute ${i % 2 === 0 ? 'top-1/4 left-1/4' : 'bottom-1/3 right-1/4'} ${i === 2 ? 'top-1/2 right-1/3 mt-12' : ''}`}>
                    <Badge variant="outline" className="bg-black/60 backdrop-blur-md border-cyan-400/50 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                      <RadioReceiver className="w-3 h-3 mr-1 text-cyan-400 animate-pulse"/> {dev.name}
                    </Badge>
                  </div>
                ))}

                <div className="z-10 mt-64 glass p-4 rounded-xl text-sm font-medium text-center shadow-lg border-white/10">
                  <p className="text-cyan-400">Connected to {scannedDevices.length} local nodes.</p>
                  <p className="text-white/40 font-mono-stat text-xs mt-1">Last packet forwarded: {scannedDevices.length > 0 ? 'Just now' : 'Waiting for connection...'}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">AI Satellite Damage Mapping</h2>
                <p className="text-sm text-white/50 mt-2">Live overlay of structural failures identified by post-disaster satellite imagery.</p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.1)] relative z-0">
                <MapContainer center={mapCenter} zoom={13} style={{ height: '400px', width: '100%', background: '#050505' }}>
                  {/* CartoDB Dark Matter TileLayer for dark theme map */}
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  />
                  
                  {/* Hazard Marker */}
                  <Marker position={[28.6100, 77.2000]} icon={hazardIcon}>
                    <Popup className="dark-popup">
                      <div className="font-mono-stat text-red-500 font-bold tracking-wider">STRUCTURAL FAILURE</div>
                      <div className="text-sm mt-1">Bridge Collapsed</div>
                    </Popup>
                  </Marker>
                  <Circle center={[28.6100, 77.2000]} radius={500} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.1 }} />

                  {/* Relief Camp Marker */}
                  <Marker position={[28.6200, 77.2200]} icon={reliefIcon}>
                    <Popup className="dark-popup">
                      <div className="font-mono-stat text-cyan-500 font-bold tracking-wider">RELIEF CAMP ALPHA</div>
                      <div className="text-sm mt-1">Status: Operational</div>
                      <div className="text-sm">Capacity: 450/500</div>
                    </Popup>
                  </Marker>
                  <Circle center={[28.6200, 77.2200]} radius={800} pathOptions={{ color: '#22d3ee', fillColor: '#22d3ee', fillOpacity: 0.1 }} />
                </MapContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ledger" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Resource Dispatch Ledger</h2>
                <p className="text-sm text-white/50 mt-2">Transparent coordination for food, medicine, and rescue drops.</p>
              </div>
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-white/70">
                    <thead className="text-xs text-white/40 font-mono-stat tracking-wider uppercase border-b border-white/10 bg-white/5">
                      <tr>
                        <th className="px-6 py-4 rounded-tl-xl">Resource Type</th>
                        <th className="px-6 py-4">Quantity</th>
                        <th className="px-6 py-4">Destination</th>
                        <th className="px-6 py-4 rounded-tr-xl">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logistics.length === 0 ? (
                        <tr><td colSpan={4} className="text-center py-8 text-white/30">No dispatch data found.</td></tr>
                      ) : (
                        logistics.map((item) => (
                          <tr key={item.id} className="border-b border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                            <td className="px-6 py-4 font-medium text-white/90">{item.resourceType}</td>
                            <td className="px-6 py-4 font-mono-stat">{item.quantity}</td>
                            <td className="px-6 py-4 text-cyan-400/80">{item.destination}</td>
                            <td className="px-6 py-4">
                              <Badge className={
                                item.status === 'Delivered' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                item.status === 'In Transit' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                              }>{item.status}</Badge>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button size="sm" variant="outline" onClick={addMockDispatch} className="rounded-full bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white font-mono-stat tracking-widest uppercase text-xs">
                    <Plus className="w-4 h-4 mr-2" /> Add Mock Dispatch
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="family" className="mt-0">
            <div className="glass spotlight-border rounded-3xl p-8 tilt-card transition-transform duration-500 hover:scale-[1.01]">
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-xl font-semibold text-white/90">Missing Person Matching</h2>
                <p className="text-sm text-white/50 mt-2">Upload a photo of a missing family member. Our CV engine will cross-reference shelter registries.</p>
              </div>
              <div>
                {!uploadingImage && !matchFound && (
                  <div className="border border-dashed border-white/20 bg-white/5 rounded-2xl p-12 text-center hover:bg-white/10 transition-colors cursor-pointer" onClick={handleSimulateUpload}>
                    <UploadCloud className="w-12 h-12 text-white/30 mx-auto mb-4" />
                    <p className="text-white/80 font-medium tracking-wide">Tap to upload a photo</p>
                    <p className="text-xs font-mono-stat text-white/40 mt-2 uppercase tracking-widest">Simulated Computer Vision</p>
                  </div>
                )}

                {uploadingImage && (
                  <div className="border border-cyan-400/30 rounded-2xl p-12 text-center bg-cyan-400/5 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                    <Activity className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-spin" />
                    <p className="text-cyan-400 font-mono-stat text-sm animate-pulse tracking-widest uppercase">Scanning 12,000 camp records...</p>
                  </div>
                )}

                {matchFound && (
                  <div className="border border-green-500/30 rounded-2xl p-6 bg-green-500/10 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex-shrink-0 flex items-center justify-center border border-green-500/40 relative">
                      <div className="absolute inset-0 rounded-full animate-ping bg-green-500/20" />
                      <CheckCircle2 className="w-12 h-12 text-green-400 relative z-10" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-green-400 mb-1 tracking-wide">High Confidence Match (98.2%)</h3>
                      <p className="text-white/70 text-sm">A person matching the uploaded photo is safely registered at <span className="font-bold text-white">Relief Camp Alpha</span>.</p>
                      <Button className="mt-4 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30 text-xs font-mono-stat uppercase tracking-widest" onClick={() => setMatchFound(false)}>
                        Scan Next
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
