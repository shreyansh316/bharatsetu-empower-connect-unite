import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Mic, MicOff } from 'lucide-react';
import { useSchemeStore } from '../store/schemeStore';

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const SemanticSearchBar: React.FC = () => {
  const [localQuery, setLocalQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const setSearchQuery = useSchemeStore((state) => state.setSearchQuery);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [localQuery, setSearchQuery]);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setLocalQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8 group">
      {/* Animated glowing border backdrop */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-bs-navy via-bs-green to-bs-saffron rounded-full blur transition duration-1000 ${isListening ? 'opacity-75 animate-pulse' : 'opacity-25 group-hover:opacity-50 group-hover:duration-200'}`} />
      
      <div className="relative flex items-center bg-[#050507] rounded-full px-6 py-4 border border-white/10 shadow-2xl overflow-hidden glass">
        <Search className="w-6 h-6 text-white/40 mr-4 shrink-0" />
        
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Try searching 'farm loan' or 'women entrepreneur'..."
          className="bg-transparent border-none outline-none text-white w-full text-lg placeholder:text-white/30 focus:ring-0 pr-20"
        />

        <div className="absolute right-4 flex items-center gap-2">
          {/* Voice Search Toggle */}
          <button 
            onClick={toggleListen}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${isListening ? 'bg-bs-saffron/20 border-bs-saffron text-bs-saffron' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}
          >
            {isListening ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
          </button>
          
          {/* AI Sparkle Icon indicating NLP search */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-bs-saffron animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
