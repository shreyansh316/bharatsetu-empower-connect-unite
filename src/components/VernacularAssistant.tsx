import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, X, Send, Globe, Bot, Mic, UploadCloud, 
  FileText, ShieldCheck, Zap, Heart, AlertCircle, ScanLine, AudioWaveform
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VernacularAssistantProps {
  schemeName: string;
  accentColor?: string;
}

const LANGUAGES = [
  { code: 'en-IN', label: 'English', greeting: 'How can I help you apply today?' },
  { code: 'hi-IN', label: 'हिन्दी', greeting: 'मैं आपकी कैसे मदद कर सकता हूँ?' },
  { code: 'ta-IN', label: 'தமிழ்', greeting: 'இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?' },
  { code: 'te-IN', label: 'తెలుగు', greeting: 'నేను మీకు ఈరోజు ఎలా సహాయం చేయగలను?' },
];

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  type: 'text' | 'rich_card';
  content?: string;
  cardData?: any;
}

const VernacularAssistant: React.FC<VernacularAssistantProps> = ({
  schemeName,
  accentColor = '#138808', // Default to India Green for active elements
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Advanced Features State
  const [isListening, setIsListening] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [userContext, setUserContext] = useState({ income: null, age: null, occupation: null });
  const [suggestions, setSuggestions] = useState(["Am I eligible?", "What documents do I need?", "Track my application"]);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_0',
      role: 'assistant',
      type: 'text',
      content: `Ask me about eligibility, documents, or the application process for ${schemeName}.`
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle Drag & Drop for Document Parsing
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      simulateDocumentParsing(files[0].name);
    }
  };

  const simulateDocumentParsing = (filename: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', type: 'text', content: `[Uploaded Document: ${filename}]` }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setUserContext(prev => ({ ...prev, income: '₹2.5 Lakhs' }));
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        type: 'text', 
        content: `I've successfully scanned your document using our secure OCR pipeline. I've updated your profile to reflect an annual income of ₹2.5 Lakhs. Shall I find schemes matching this?` 
      }]);
      setSuggestions(["Find matching schemes", "Update my age", "Clear my profile data"]);
      setIsTyping(false);
    }, 2000);
  };

  // Voice Input Simulation
  const toggleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Simulate speech recognition
      setTimeout(() => setInput("I "), 500);
      setTimeout(() => setInput("I want "), 1000);
      setTimeout(() => setInput("I want to start a "), 1500);
      setTimeout(() => setInput("I want to start a business."), 2000);
      setTimeout(() => {
        setIsListening(false);
      }, 2500);
    }
  };

  // Mock NLP Engine
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', type: 'text', content: userMsg }]);
    setIsTyping(true);

    // Simulate Intent Routing & RAG Database Lookup
    setTimeout(() => {
      const lowerInput = userMsg.toLowerCase();
      
      if (lowerInput.includes('business') || lowerInput.includes('shop') || lowerInput.includes('loan')) {
        // Rich UI Response
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'assistant',
          type: 'rich_card',
          text: "Based on your intent to start a business, here is the best match from our database:",
          cardData: {
            schemeId: "mudra-yojana",
            title: "PM Mudra Yojana",
            icon: Zap,
            color: "#fbbf24",
            matchScore: 92,
            matchReason: "Matches your intent 'start a business' and aligns with MSME sector support.",
            deadline: "No Deadline",
            actionLabels: { primary: "Apply Now", secondary: "View Details" }
          }
        }]);
        setSuggestions(["What is the interest rate?", "What documents are required?", "Calculate EMI"]);
      } else if (lowerInput.includes('eligible') || lowerInput.includes('income')) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'assistant',
          type: 'text',
          content: `To check your exact eligibility for ${schemeName}, I need to know your annual family income. You can type it, or just drag and drop your Income Certificate here for automatic extraction.`
        }]);
        setSuggestions(["Below ₹1 Lakh", "₹1-3 Lakhs", "Above ₹3 Lakhs"]);
      } else {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'assistant',
          type: 'text',
          content: `I am currently analyzing your request against our database of 50+ government welfare schemes. (Simulated Response)`
        }]);
      }
      setIsTyping(false);
    }, 1500);
  };

  // Widget Renderers
  const renderRichCard = (data: any) => {
    const Icon = data.icon;
    return (
      <div className="glass rounded-xl p-4 mt-2 mb-1 border border-white/10 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at top right, ${data.color}, transparent)` }} />
        
        <div className="flex justify-between items-start mb-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${data.color}20` }}>
              <Icon className="w-5 h-5" style={{ color: data.color }} />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">{data.title}</h4>
              <p className="text-white/40 text-[10px] uppercase tracking-wider">{data.deadline}</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <circle cx="20" cy="20" r="18" fill="none" stroke="#138808" strokeWidth="3" strokeDasharray={`${(data.matchScore / 100) * 113} 113`} className="transition-all duration-1000 ease-out" />
              </svg>
              <span className="text-xs font-bold text-white relative z-10">{data.matchScore}%</span>
            </div>
            <span className="text-[9px] text-white/40 mt-1">Match</span>
          </div>
        </div>
        
        <p className="text-white/60 text-xs mb-4 relative z-10">{data.matchReason}</p>
        
        <div className="flex gap-2 relative z-10">
          <Button className="flex-1 h-8 text-[11px] bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/5">
            {data.actionLabels.secondary}
          </Button>
          <Button className="flex-1 h-8 text-[11px] text-white rounded-lg shadow-lg" style={{ background: `linear-gradient(135deg, ${data.color}, ${data.color}dd)` }}>
            {data.actionLabels.primary}
          </Button>
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl group"
        style={{
          background: `linear-gradient(135deg, ${accentColor}, #000080)`, // Saffron to Navy
          boxShadow: `0 8px 32px rgba(19, 136, 8, 0.4)`,
        }}
      >
        <Bot className="w-6 h-6 text-white" />
        <span className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] animate-scale-in">
      <div 
        className="glass-strong rounded-3xl overflow-hidden flex flex-col relative" 
        style={{ height: '560px', background: 'rgba(5, 5, 7, 0.75)', backdropFilter: 'blur(24px) saturate(150%)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        
        {/* Drag Overlay */}
        {isDragging && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-3xl border-2 border-dashed border-green-500/50">
            <div className="text-center p-6 animate-pulse">
              <ScanLine className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Drop Document to Scan</h3>
              <p className="text-white/50 text-sm">Aadhaar, PAN, or Income Certificate</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-white/5" style={{ background: 'linear-gradient(135deg, rgba(0, 0, 128, 0.4), rgba(0, 0, 128, 0.1))' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30" />
              <Bot className="w-5 h-5 text-white relative z-10" />
            </div>
            <div>
              <p className="text-white/90 text-sm font-semibold flex items-center gap-2">
                Sahaayak AI
                <Badge className="bg-green-500/20 text-green-400 text-[9px] px-1.5 py-0 border-0 h-4">v2.0</Badge>
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-white/40 text-[10px] tracking-wider uppercase">Context Aware Mode</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setShowLangPicker(!showLangPicker)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
              <Globe className="w-4 h-4" />
            </button>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Language Picker Dropdown */}
        {showLangPicker && (
          <div className="absolute top-16 left-4 right-4 z-40 animate-fade-in">
            <div className="glass rounded-xl p-2 grid grid-cols-2 gap-1 border border-white/10 shadow-2xl">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setSelectedLang(lang); setShowLangPicker(false); }}
                  className={`text-xs px-3 py-2 rounded-lg transition-all text-left ${selectedLang.code === lang.code ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}
                >
                  {lang.label} ({lang.code})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Profile Context Bar (Active Memory) */}
        {(userContext.income || userContext.age) && (
          <div className="px-4 py-2 bg-white/[0.02] border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="text-[9px] text-white/30 uppercase tracking-widest mr-1 flex-shrink-0">Memory:</span>
            {userContext.income && <Badge variant="outline" className="text-[10px] bg-white/5 border-white/10 text-white/60 py-0 flex-shrink-0">Income: {userContext.income}</Badge>}
            {userContext.age && <Badge variant="outline" className="text-[10px] bg-white/5 border-white/10 text-white/60 py-0 flex-shrink-0">Age: {userContext.age}</Badge>}
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          
          <div className="flex gap-3 animate-float-up">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-500/20">
              <Bot className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="glass rounded-2xl rounded-tl-sm p-3 max-w-[85%] border border-white/5">
              <p className="text-white/80 text-[13px] leading-relaxed">{selectedLang.greeting}</p>
            </div>
          </div>

          {messages.map((msg, i) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-float-up`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-500/20">
                  <Bot className="w-3.5 h-3.5 text-blue-400" />
                </div>
              )}
              
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'flex justify-end' : ''}`}>
                {msg.type === 'text' && (
                  <div className={`rounded-2xl p-3 ${msg.role === 'user' ? 'bg-white/10 text-white rounded-tr-sm' : 'glass border border-white/5 text-white/80 rounded-tl-sm'}`}>
                    <p className="text-[13px] leading-relaxed">{msg.content}</p>
                  </div>
                )}
                
                {msg.type === 'rich_card' && (
                  <div className="w-full">
                    {msg.text && (
                      <div className="glass border border-white/5 rounded-2xl rounded-tl-sm p-3 mb-2">
                         <p className="text-white/80 text-[13px] leading-relaxed">{msg.text}</p>
                      </div>
                    )}
                    {renderRichCard(msg.cardData)}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* AI Thinking Nodes Indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-float-up">
               <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-500/20">
                <Bot className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 border border-white/5 h-10 flex items-center">
                <div className="flex gap-2">
                  <div className="ai-thinking-node" style={{ animationDelay: '0ms' }} />
                  <div className="ai-thinking-node" style={{ animationDelay: '150ms' }} />
                  <div className="ai-thinking-node" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {suggestions.length > 0 && !isTyping && (
          <div className="px-3 pb-2 pt-1 flex gap-2 overflow-x-auto scrollbar-hide">
            {suggestions.map((sug, i) => (
              <button 
                key={i} 
                onClick={() => { setInput(sug); setTimeout(handleSend, 100); }}
                className="whitespace-nowrap px-3 py-1.5 rounded-full glass border border-white/10 text-white/60 text-[11px] hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="p-3 bg-black/20 backdrop-blur-md border-t border-white/10">
          <div className={`relative flex items-end gap-2 p-1.5 rounded-2xl border transition-all duration-300 ${isListening ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 bg-white/5 focus-within:border-white/30'}`}>
            
            {/* Voice Mic Button */}
            <button 
              onClick={toggleVoiceInput}
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isListening ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'text-white/40 hover:bg-white/10 hover:text-white'}`}
            >
              <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
            </button>

            {/* Input / Waveform */}
            <div className="flex-1 relative min-h-[36px] flex items-center">
              {isListening ? (
                <div className="w-full flex items-center gap-1 h-full px-2">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-green-500 rounded-full animate-pulse" 
                      style={{ height: `${20 + Math.random() * 60}%`, animationDuration: `${0.3 + Math.random() * 0.5}s` }} 
                    />
                  ))}
                  <span className="text-green-400 text-xs ml-2 italic">{input || "Listening..."}</span>
                </div>
              ) : (
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask anything or drop a document..."
                  className="w-full max-h-[100px] py-2 px-1 bg-transparent text-[13px] text-white placeholder:text-white/30 focus:outline-none resize-none overflow-y-auto scrollbar-hide"
                  rows={1}
                />
              )}
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={!input.trim() || isListening}
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${input.trim() && !isListening ? 'bg-white/10 text-white hover:bg-white/20' : 'text-white/20'}`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VernacularAssistant;
