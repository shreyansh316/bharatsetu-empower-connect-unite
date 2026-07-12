import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Zap, Users, FileText, Play, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VidyaSetu() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/modules')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-blue-700">VidyaSetu</h1>
              <p className="text-sm text-gray-500">Universal Education Hub</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        <Tabs defaultValue="courses">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses"><BookOpen className="w-4 h-4 mr-2 hidden sm:block"/> Courses</TabsTrigger>
            <TabsTrigger value="ar-labs"><Zap className="w-4 h-4 mr-2 hidden sm:block"/> AR Labs</TabsTrigger>
            <TabsTrigger value="tutors"><Users className="w-4 h-4 mr-2 hidden sm:block"/> Tutors</TabsTrigger>
            <TabsTrigger value="tests"><FileText className="w-4 h-4 mr-2 hidden sm:block"/> Tests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Vernacular Skill-Building</CardTitle>
                <CardDescription>Download entire courses for offline viewing in 12 regional languages.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg flex justify-between items-center hover:bg-slate-50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <Play className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Advanced Welding Techniques</h4>
                        <p className="text-sm text-gray-500">Language: Hindi • 12 Video Modules</p>
                      </div>
                    </div>
                    <Button variant="outline"><Download className="w-4 h-4 mr-2"/> Download All (450MB)</Button>
                  </div>
                  <div className="p-4 border rounded-lg flex justify-between items-center hover:bg-slate-50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                        <Play className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Organic Farming Basics</h4>
                        <p className="text-sm text-gray-500">Language: Marathi • 8 Video Modules</p>
                      </div>
                    </div>
                    <Button variant="outline" className="text-green-700 bg-green-50 border-green-200"><Download className="w-4 h-4 mr-2"/> Downloaded</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ar-labs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Augmented Reality Classrooms</CardTitle>
                <CardDescription>Interactive 3D models for science and engineering students.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 aspect-video rounded-lg flex items-center justify-center relative overflow-hidden border-2 border-slate-700">
                  <div className="text-center relative z-10">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center p-0 mb-4 mx-auto">
                      <Zap className="w-8 h-8" />
                    </Button>
                    <p className="text-slate-300 font-medium">Launch AR Heart Anatomy Model</p>
                    <p className="text-xs text-slate-500 mt-2">Requires Camera Permission</p>
                  </div>
                  {/* Grid background effect */}
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutors" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Doubt Solving Tutors</CardTitle>
                <CardDescription>Connect with verified educators for 1-on-1 sessions.</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700">No tutors currently online in your district.</h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">You can schedule a session for tomorrow between 4:00 PM and 6:00 PM.</p>
                <Button className="mt-6 bg-blue-600">Schedule Session</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Certification Tests</CardTitle>
                <CardDescription>Take proctored tests offline and sync results when connected.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-bold text-blue-900">Basic Electrical Safety</h4>
                      <p className="text-sm text-blue-700 mt-1">45 Mins • 30 Questions</p>
                      <Button className="w-full mt-4 bg-blue-600">Start Test</Button>
                    </div>
                    <div className="border border-gray-200 p-4 rounded-lg opacity-60">
                      <h4 className="font-bold text-gray-900">Advanced Carpentry</h4>
                      <p className="text-sm text-gray-500 mt-1">Requires completing level 1 course.</p>
                      <Button className="w-full mt-4" variant="outline" disabled>Locked</Button>
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
