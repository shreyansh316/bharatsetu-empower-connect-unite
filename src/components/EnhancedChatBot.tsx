import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Mic, MicOff, Minimize2, Sparkles, User, Volume2, VolumeX, Brain } from 'lucide-react';
import { useSchemeStore } from '../store/schemeStore';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
}

const EnhancedChatBot = () => {
  // Pull RAG context from the global store
  const activeSchemeId = useSchemeStore((state) => state.activeSchemeId);
  const getSchemeById = useSchemeStore((state) => state.getSchemeById);
  const activeScheme = activeSchemeId ? getSchemeById(activeSchemeId) : null;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I am Sahaayak AI. I can guide you through BharatSetu schemes. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // If the user navigates to a specific scheme page, the AI Assistant proactively offers help
  useEffect(() => {
    if (activeScheme) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: `I see you are looking at ${activeScheme.title}. Let me know if you need help understanding the eligibility criteria or documents required!`,
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
      // Optional: auto-open the chat when viewing a scheme (can be annoying, keeping it false for now)
    }
  }, [activeScheme]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
    }
  }, []);

  const simulateGPT4Response = async (userMessage: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const lower = userMessage.toLowerCase();
    
    // RAG Context Injection: if activeScheme exists, the AI prioritizes answering about it
    if (activeScheme) {
      if (lower.includes('eligibility') || lower.includes('who can apply')) {
        return `For ${activeScheme.title}, the eligibility criteria are: \n• ${activeScheme.eligibility.join('\n• ')}`;
      }
      if (lower.includes('document') || lower.includes('paper')) {
        return `To apply for ${activeScheme.title}, you need: \n• ${activeScheme.documentsRequired.join('\n• ')}`;
      }
      if (lower.includes('benefit') || lower.includes('what do i get')) {
        return `The benefits of ${activeScheme.title} include: \n• ${activeScheme.benefits.join('\n• ')}`;
      }
    }

    // Generic Responses
    if (lower.includes('loan')) return 'I can help you find farming or business loans. Try filtering by the "Finance" category on the Explore page.';
    if (lower.includes('health')) return 'For health schemes, try searching for "SwasthyaMitra" or filter by the Health pillar.';
    
    return 'I can help you understand the requirements and benefits of any government scheme. Try asking me "what are the documents required for this scheme?" while viewing a scheme page!';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await simulateGPT4Response(inputMessage);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      }]);
    } catch (e) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: 'I encountered a neural link error. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 group">
        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-30 group-hover:opacity-50 transition-opacity"></div>
        <Button
          aria-label="Open AI Assistant"
          onClick={() => setIsMinimized(false)}
          className="relative rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-500 border border-blue-400/50 shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all hover:scale-110 flex items-center justify-center p-0"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-700 to-cyan-400 opacity-50 pointer-events-none"></div>
          <Brain className="relative z-10 w-6 h-6 text-white animate-pulse" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)]">
      <Card className="shadow-2xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl rounded-2xl overflow-hidden">
        
        {/* Header */}
        <CardHeader className="p-4 bg-white/5 border-b border-white/5 relative overflow-hidden">
          {/* Accent Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-bs-saffron/20 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-bs-navy/40 rounded-full flex items-center justify-center border border-white/10">
                <Sparkles className="w-5 h-5 text-bs-saffron" />
              </div>
              <div>
                <CardTitle className="text-white text-base font-bold">Sahaayak AI</CardTitle>
                <div className="flex items-center text-xs text-white/50 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-bs-green mr-1.5 animate-pulse" />
                  {activeScheme ? 'Context: Active' : 'Online'}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsMinimized(true)} className="text-white/50 hover:text-white hover:bg-white/10 rounded-xl">
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Chat Area */}
        <CardContent className="p-0">
          <ScrollArea className="h-[350px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-bs-navy to-bs-green text-white rounded-tr-sm border border-white/10'
                        : 'bg-white/5 text-white/90 rounded-tl-sm border border-white/5'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap font-vernacular">{message.content}</p>
                    
                    <div className="flex items-center justify-between mt-2 opacity-50">
                      <span className="text-[10px]">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.sender === 'bot' && (
                        <button onClick={() => isSpeaking ? stopSpeaking() : speakMessage(message.content)} className="hover:text-bs-saffron transition-colors">
                          {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-sm border border-white/5">
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-bs-saffron rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-bs-green rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                      <div className="w-1.5 h-1.5 bg-bs-navy rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input Area */}
          <div className="p-3 bg-black/40 border-t border-white/5">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-xl p-1 pr-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleVoiceInput}
                className={`rounded-lg ${isListening ? 'text-red-400 bg-red-400/10' : 'text-white/40 hover:text-white'}`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={activeScheme ? `Ask about ${activeScheme.title}...` : "Type a message..."}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-sm text-white placeholder:text-white/30 h-10 px-2"
              />
              
              <Button 
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-bs-saffron hover:bg-bs-saffron/90 text-black rounded-lg h-8 w-8 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedChatBot;
