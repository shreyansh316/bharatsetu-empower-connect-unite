import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Navigation, MapPin, Calendar, Zap, Shield, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Pariwahan() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-teal-600 border-b shadow-sm sticky top-0 z-10 text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-teal-700" onClick={() => navigate('/modules')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Pariwahan</h1>
              <p className="text-sm text-teal-100">Rural Transit Network</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        <Tabs defaultValue="ride">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ride"><Navigation className="w-4 h-4 mr-2 hidden sm:block"/> Ride</TabsTrigger>
            <TabsTrigger value="bus"><Calendar className="w-4 h-4 mr-2 hidden sm:block"/> Bus</TabsTrigger>
            <TabsTrigger value="charge"><Zap className="w-4 h-4 mr-2 hidden sm:block"/> Charge</TabsTrigger>
            <TabsTrigger value="pay"><Shield className="w-4 h-4 mr-2 hidden sm:block"/> Pay</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ride" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>E-Rickshaw Pooling</CardTitle>
                <CardDescription>Find shared e-rickshaws traveling along your route in tier-3 cities and villages.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-4 shadow-sm mb-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 flex justify-center"><div className="w-3 h-3 bg-teal-600 rounded-full"></div></div>
                      <input type="text" placeholder="Pickup location (e.g. Village Square)" className="flex-1 border-b pb-2 text-sm focus:outline-none focus:border-teal-600" />
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 flex justify-center"><MapPin className="w-4 h-4 text-gray-400" /></div>
                      <input type="text" placeholder="Drop location (e.g. District Hospital)" className="flex-1 border-b pb-2 text-sm focus:outline-none focus:border-teal-600" />
                    </div>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700"><Search className="w-4 h-4 mr-2"/> Find Shared Rides</Button>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-700 mb-3">Available Vehicles Nearby</h4>
                <div className="space-y-3">
                  <div className="border rounded-lg p-4 flex justify-between items-center hover:border-teal-300 transition-colors">
                    <div>
                      <h4 className="font-bold text-teal-900">UP32-EV-8472</h4>
                      <p className="text-sm text-gray-500">2 Seats Available • 3 mins away</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-teal-700">₹15</p>
                      <Button size="sm" className="bg-teal-600 mt-1">Book Seat</Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 flex justify-between items-center hover:border-teal-300 transition-colors">
                    <div>
                      <h4 className="font-bold text-teal-900">UP32-EV-1024</h4>
                      <p className="text-sm text-gray-500">1 Seat Available • 8 mins away</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-teal-700">₹10</p>
                      <Button size="sm" className="bg-teal-600 mt-1">Book Seat</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bus" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Rural Bus Schedules</CardTitle>
                <CardDescription>Live GPS tracking and offline timetables for state transport buses.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                   <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                   <h3 className="text-lg font-medium text-gray-700">Select your district</h3>
                   <p className="text-gray-500 mt-2 max-w-sm mx-auto">Download the complete bus timetable for your district so you can access it even without internet.</p>
                   <div className="mt-6 flex justify-center max-w-sm mx-auto">
                     <select className="border rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                        <option>Lucknow Rural</option>
                        <option>Kanpur Dehat</option>
                        <option>Sitapur</option>
                     </select>
                     <Button className="rounded-l-none bg-teal-600 hover:bg-teal-700 text-white">Download</Button>
                   </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charge" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>EV Charging Network</CardTitle>
                <CardDescription>Find crowdsourced solar and grid charging stations for your E-Rickshaw.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="bg-slate-200 h-64 rounded-lg flex flex-col items-center justify-center border border-slate-300 relative overflow-hidden">
                   <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                   <div className="absolute top-1/3 left-1/3 text-center">
                     <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-teal-500 z-10 relative">
                       <Zap className="w-4 h-4 text-teal-600" />
                     </div>
                     <span className="bg-white px-2 py-1 text-xs font-bold rounded shadow mt-1 absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20">Ramu's Solar Hub (Available)</span>
                   </div>
                   <div className="absolute top-1/2 right-1/4 text-center">
                     <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-red-500 z-10 relative opacity-70">
                       <Zap className="w-4 h-4 text-red-600" />
                     </div>
                     <span className="bg-white px-2 py-1 text-xs font-bold rounded shadow mt-1 absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20">Village Panchayat (In Use)</span>
                   </div>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pay" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Offline Digital Wallet</CardTitle>
                <CardDescription>Pay for transit tickets offline using Bluetooth/NFC token exchange.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-lg p-6 text-white shadow-md mb-6">
                  <h3 className="text-sm font-medium opacity-90">Transit Balance</h3>
                  <p className="text-4xl font-bold mt-1">₹340</p>
                  <div className="mt-4 flex justify-between items-center text-sm opacity-90 border-t border-white/20 pt-4">
                    <span>Last Sync: 2 hours ago</span>
                    <Button size="sm" variant="outline" className="bg-transparent text-white border-white hover:bg-white/20">Add Funds</Button>
                  </div>
                </div>
                <div className="flex flex-col items-center py-6 border-2 border-dashed border-teal-200 bg-teal-50 rounded-lg">
                  <Shield className="w-12 h-12 text-teal-400 mb-2" />
                  <p className="text-teal-800 font-medium">Ready to pay via Bluetooth</p>
                  <p className="text-xs text-teal-600 mt-1">Hold near driver's device</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
