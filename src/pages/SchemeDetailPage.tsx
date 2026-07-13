import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSchemeStore } from '../store/schemeStore';
import { ArrowLeft, CheckCircle2, Shield, FileText, Globe, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import { DynamicApplicationForm, FormFieldSchema } from '../components/DynamicApplicationForm';
import { SCHEMES_DB } from '../data/mockSchemes';

const SchemeDetailPage: React.FC = () => {
  const { schemeId } = useParams<{ schemeId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'benefits' | 'eligibility' | 'documents' | 'application'>('benefits');

  const getSchemeById = useSchemeStore((state) => state.getSchemeById);
  const setActiveSchemeId = useSchemeStore((state) => state.setActiveSchemeId);
  const schemes = useSchemeStore((state) => state.schemes);

  // Robust slug matching logic
  const findScheme = () => {
    if (!schemeId) return undefined;
    const normalizedSlug = decodeURIComponent(schemeId).trim().toLowerCase();

    // 1. Check original global store
    const fromStore = getSchemeById(normalizedSlug) || 
                      Object.values(schemes).find(s => s.id.toLowerCase() === normalizedSlug);
    if (fromStore) return fromStore;

    // 2. Check centralized 300-scheme mock DB
    const fromDB = SCHEMES_DB.find(s => s.id.toLowerCase() === normalizedSlug);
    return fromDB;
  };

  const scheme = findScheme();

  // Mount/Unmount effect for RAG context
  useEffect(() => {
    if (scheme) {
      setActiveSchemeId(scheme.id);
    }
    return () => {
      setActiveSchemeId(null);
    };
  }, [scheme, setActiveSchemeId]);

  if (!scheme) {
    if (Object.keys(schemes).length === 0) {
      return (
        <div className="min-h-screen bg-[#050507] font-sans flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-bs-saffron/20 border-t-bs-saffron rounded-full animate-spin mb-4" />
            <p className="text-white/60 font-vernacular">Loading scheme data...</p>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-[#050507] font-sans flex items-center justify-center">
        <div className="glass rounded-3xl p-12 text-center max-w-md border border-white/5">
          <AlertCircle className="w-16 h-16 text-white/30 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-3">Scheme Not Found</h1>
          <p className="text-white/50 text-sm mb-6">
            The scheme you're looking for doesn't exist or hasn't been loaded into the cache yet.
          </p>
          <Button
            onClick={() => navigate('/explore')}
            className="bg-bs-navy hover:bg-bs-navy/80 text-white rounded-full px-8"
          >
            Back to Explore
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] font-sans pb-32">
      <Header />
      
      {/* Background Ambience based on scheme category */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-bs-navy blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-bs-green blur-[150px]" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 lg:pt-32">
        {/* Back Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-white/50 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Schemes
        </button>

        {/* Hero Section */}
        <div className="glass rounded-3xl p-8 md:p-12 mb-8 border border-white/10 relative overflow-hidden">
          {/* Subtle glow behind the card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-bs-saffron/20 to-transparent rounded-full blur-[80px]" />
          
          <div className="relative z-10">
            <div className="flex flex-wrap gap-3 mb-6 font-vernacular">
              {scheme.pillar && (
                <Badge className="bg-bs-navy/40 text-blue-300 border border-blue-500/30 hover:bg-bs-navy/50">
                  {scheme.pillar}
                </Badge>
              )}
              {scheme.department && (
                <Badge className="bg-white/5 text-white/70 border border-white/10 hover:bg-white/10">
                  {scheme.department}
                </Badge>
              )}
              {/* If it's a LauncherScheme, we can show metric text here as a badge */}
              {(scheme as any).metricValue && (
                <Badge className="bg-bs-green/20 text-bs-green border border-bs-green/30 hover:bg-bs-green/30 font-bold">
                  {(scheme as any).metricValue} {(scheme as any).metricText}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight font-vernacular">
              {(scheme as any).titleEnglish || scheme.title}
            </h1>
            
            {(scheme as any).titleHindi && (
              <h2 className="text-xl md:text-2xl font-medium text-white/60 mb-6 font-vernacular">
                {(scheme as any).titleHindi}
              </h2>
            )}
            
            <p className="text-lg text-white/70 leading-relaxed max-w-3xl mb-8 font-vernacular">
              {scheme.description}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Button 
                onClick={() => setActiveTab('application')}
                className="bg-gradient-to-r from-bs-navy to-bs-green hover:opacity-90 text-white rounded-full px-8 py-6 shadow-[0_0_20px_rgba(30,58,138,0.3)] group relative overflow-hidden transition-all"
              >
                <span className="relative z-10 flex items-center font-bold">
                  Apply Native <ExternalLink className="w-4 h-4 ml-2" />
                </span>
              </Button>
              <div className="flex items-center text-white/50 text-sm ml-4 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <Shield className="w-4 h-4 mr-2 text-bs-green" />
                Verified Govt Source
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Content Tabs */}
        <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-2xl w-fit border border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'benefits' 
                ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            Benefits & Overview
          </button>
          <button
            onClick={() => setActiveTab('eligibility')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'eligibility' 
                ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            Eligibility
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'documents' 
                ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            Documents Required
          </button>
          <button
            onClick={() => setActiveTab('application')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'application' 
                ? 'bg-bs-green/20 text-bs-green shadow-lg border border-bs-green/30' 
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            Apply Natively
          </button>
        </div>

        {/* Tab Content Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Benefits Tab */}
            {activeTab === 'benefits' && (
              <div className="glass rounded-3xl p-8 border border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500 font-vernacular">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Sparkles className="w-5 h-5 text-bs-saffron mr-3" />
                  Key Benefits
                </h3>
                {scheme.benefits && scheme.benefits.length > 0 ? (
                  <ul className="space-y-4">
                    {scheme.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                        <CheckCircle2 className="w-5 h-5 text-bs-green mt-0.5 mr-4 flex-shrink-0" />
                        <span className="text-white/80 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/50 italic">Benefits detail not provided. Refer to the official document.</p>
                )}
              </div>
            )}

            {/* Eligibility Tab */}
            {activeTab === 'eligibility' && (
              <div className="glass rounded-3xl p-8 border border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500 font-vernacular">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Shield className="w-5 h-5 text-blue-400 mr-3" />
                  Eligibility Criteria
                </h3>
                {scheme.eligibility && scheme.eligibility.length > 0 ? (
                  <ul className="space-y-4">
                    {scheme.eligibility.map((criteria, idx) => (
                      <li key={idx} className="flex items-start bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-4 flex-shrink-0" />
                        <span className="text-white/80 leading-relaxed">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/50 italic">Eligibility detail not provided. Refer to the official document.</p>
                )}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="glass rounded-3xl p-8 border border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500 font-vernacular">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <FileText className="w-5 h-5 text-emerald-400 mr-3" />
                  Required Documents
                </h3>
                {scheme.documentsRequired && scheme.documentsRequired.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {scheme.documentsRequired.map((doc, idx) => (
                      <div key={idx} className="flex items-center bg-white/[0.03] p-4 rounded-2xl border border-white/5 hover:bg-white/[0.06] transition-colors cursor-default">
                        <FileText className="w-4 h-4 text-white/40 mr-3 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/50 italic">No specific documents listed.</p>
                )}
              </div>
            )}

            {/* Application Tab */}
            {activeTab === 'application' && (
              <div className="glass rounded-3xl p-8 border border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500 font-vernacular">
                <div className="mb-8 border-b border-white/10 pb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                    <Shield className="w-6 h-6 text-bs-green mr-3" />
                    Native Application Engine
                  </h3>
                  <p className="text-white/60">
                    Apply directly for <strong className="text-white">{scheme.title}</strong> without leaving the platform. Your data is encrypted locally using AES-GCM before submission.
                  </p>
                </div>
                
                <DynamicApplicationForm
                  schemeId={scheme.id}
                  onSubmitSuccess={(data) => console.log('Successfully submitted natively!', data)}
                  fields={[
                    { id: 'fullName', label: 'Full Legal Name', type: 'text', required: true, placeholder: 'e.g. Rahul Sharma' },
                    { id: 'mobile', label: 'Mobile Number', type: 'number', required: true, placeholder: '10-digit mobile number' },
                    { id: 'email', label: 'Email Address', type: 'email', required: false, placeholder: 'Optional email' },
                    { id: 'aadhaar', label: 'Aadhaar Card Number', type: 'aadhaar', required: true, placeholder: '12-digit Aadhaar' },
                    { id: 'pan', label: 'PAN Card Number', type: 'pan', required: true, placeholder: 'e.g. ABCDE1234F' }
                  ]}
                />
              </div>
            )}
          </div>

          {/* Right Sidebar - RAG CTA */}
          <div className="lg:col-span-1">
            <div className="glass rounded-3xl p-6 border border-bs-saffron/20 bg-gradient-to-b from-bs-saffron/5 to-transparent relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-bs-saffron/20 rounded-full blur-[50px] group-hover:bg-bs-saffron/30 transition-all" />
              
              <h3 className="text-lg font-bold text-white mb-2 relative z-10">Need Clarification?</h3>
              <p className="text-white/60 text-sm mb-6 relative z-10 leading-relaxed font-vernacular">
                Ask Sahaayak AI specific questions about <strong>{scheme.title}</strong>. It knows all the details about this scheme.
              </p>
              
              <Button 
                onClick={() => {
                  // Simulate opening the AI Chat window
                  // In a real implementation, you'd toggle a global state for the chat
                  const chatBtn = document.querySelector('[aria-label="Open AI Assistant"]') as HTMLButtonElement;
                  if (chatBtn) chatBtn.click();
                }}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl relative z-10"
              >
                <Sparkles className="w-4 h-4 mr-2 text-bs-saffron" />
                Ask Sahaayak AI
              </Button>
            </div>
            
            <div className="mt-6 glass rounded-3xl p-6 border border-white/5">
              <h4 className="text-white/40 text-xs font-bold uppercase tracking-wider mb-4">Scheme Tags</h4>
              <div className="flex flex-wrap gap-2">
                {scheme.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-lg text-xs text-white/60 font-vernacular">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SchemeDetailPage;
