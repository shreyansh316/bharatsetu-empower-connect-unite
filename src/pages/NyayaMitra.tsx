import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Scale, Bot, Users, FileText, Calendar, UploadCloud, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NyayaMitra() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-slate-900 border-b shadow-sm sticky top-0 z-10 text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800" onClick={() => navigate('/modules')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">NyayaMitra</h1>
              <p className="text-sm text-slate-400">Accessible Legal Aid</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        <Tabs defaultValue="ask-ai">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ask-ai"><Bot className="w-4 h-4 mr-2 hidden sm:block"/> Ask AI</TabsTrigger>
            <TabsTrigger value="lawyers"><Users className="w-4 h-4 mr-2 hidden sm:block"/> Lawyers</TabsTrigger>
            <TabsTrigger value="docs"><FileText className="w-4 h-4 mr-2 hidden sm:block"/> Documents</TabsTrigger>
            <TabsTrigger value="status"><Calendar className="w-4 h-4 mr-2 hidden sm:block"/> Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ask-ai" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Legal Assistant</CardTitle>
                <CardDescription>Ask questions about property laws, tenant rights, or labor laws in your own language.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 border rounded-lg p-4 h-64 flex flex-col justify-end">
                  <div className="space-y-4 mb-4 overflow-y-auto flex-1">
                    <div className="flex justify-end">
                      <div className="bg-slate-900 text-white p-3 rounded-lg rounded-br-none max-w-[80%]">
                        <p className="text-sm">What happens if my landlord tries to evict me without notice?</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white border p-3 rounded-lg rounded-bl-none max-w-[80%]">
                        <p className="text-sm text-gray-800">Under the Rent Control Act, a landlord cannot evict you without giving a valid legal notice (usually 30 days depending on the state). Would you like me to generate a standard response letter for you?</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Type your question..." className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
                    <Button className="bg-slate-900"><MessageSquare className="w-4 h-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lawyers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pro-Bono Matcher</CardTitle>
                <CardDescription>Connect with verified volunteer lawyers offering free remote consultations.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-slate-200 rounded-full mb-3 flex items-center justify-center">
                      <Users className="w-8 h-8 text-slate-500" />
                    </div>
                    <h4 className="font-bold">Adv. Priya Sharma</h4>
                    <p className="text-sm text-gray-500">Specializes in Property & Land Disputes</p>
                    <p className="text-xs text-green-600 font-medium mt-1">Available Today at 4:00 PM</p>
                    <Button className="mt-4 w-full" variant="outline">Book Consultation</Button>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-slate-200 rounded-full mb-3 flex items-center justify-center">
                      <Users className="w-8 h-8 text-slate-500" />
                    </div>
                    <h4 className="font-bold">Adv. R.K. Desai</h4>
                    <p className="text-sm text-gray-500">Specializes in Labor & Employment Rights</p>
                    <p className="text-xs text-green-600 font-medium mt-1">Available Tomorrow at 10:00 AM</p>
                    <Button className="mt-4 w-full" variant="outline">Book Consultation</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Legal Document Simplifier</CardTitle>
                <CardDescription>Upload complex legal notices to get a simplified summary in your preferred language.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center text-center bg-slate-50">
                  <UploadCloud className="w-12 h-12 text-slate-400 mb-4" />
                  <h4 className="font-medium text-slate-700">Upload Document or Take a Photo</h4>
                  <p className="text-sm text-slate-500 mt-1 max-w-sm">Supports PDF, JPG, and PNG formats up to 10MB.</p>
                  <Button className="mt-4 bg-slate-900 text-white">Select File</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Court Date & Status Tracker</CardTitle>
                <CardDescription>Sync your eCourts case number to get SMS reminders for upcoming hearings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-6">
                  <input type="text" placeholder="Enter Case Number (e.g. CNR Number)" className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
                  <Button className="bg-slate-900">Track Case</Button>
                </div>
                
                <div className="border-l-2 border-slate-300 ml-3 pl-4 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[23px] top-1 w-3 h-3 bg-slate-900 rounded-full border-2 border-white"></div>
                    <p className="text-xs text-slate-500 font-medium">12th August, 2026</p>
                    <h4 className="font-semibold text-slate-800">Next Hearing</h4>
                    <p className="text-sm text-slate-600">District Court, Room No. 14. Ensure all original documents are present.</p>
                  </div>
                  <div className="relative opacity-50">
                    <div className="absolute -left-[23px] top-1 w-3 h-3 bg-slate-400 rounded-full border-2 border-white"></div>
                    <p className="text-xs text-slate-500 font-medium">4th July, 2026</p>
                    <h4 className="font-semibold text-slate-800">Previous Hearing</h4>
                    <p className="text-sm text-slate-600">Respondent filed reply. Court granted 4 weeks for rejoinder.</p>
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
