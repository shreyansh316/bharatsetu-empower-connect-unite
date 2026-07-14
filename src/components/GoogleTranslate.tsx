
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Languages, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'hi,en,bn,te,mr,ta,gu,kn,ml,pa,or,as,ne,sd,ur,ks,ko,ja,zh,es,fr,de,ru,ar,pt,it',
        layout: 1, // window.google.translate.TranslateElement.InlineLayout.HORIZONTAL
        autoDisplay: false,
        multilanguagePage: true
      }, 'google_translate_element');
      setIsLoaded(true);
    };

    // Add custom styles for Google Translate (Phase 5 Dark Mode Gen-Z overhaul)
    const addCustomStyles = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        .google-translate-container .goog-te-gadget {
          font-family: inherit !important;
          font-size: 12px !important;
          color: rgba(255, 255, 255, 0.6) !important;
        }
        .google-translate-container .goog-te-gadget-simple {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px !important;
          padding: 8px 12px !important;
          font-size: 14px !important;
          transition: all 0.3s ease !important;
        }
        .google-translate-container .goog-te-gadget-simple:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          box-shadow: 0 0 15px rgba(255, 153, 51, 0.2) !important;
        }
        .google-translate-container .goog-te-gadget-simple .goog-te-menu-value {
          color: rgba(255, 255, 255, 0.9) !important;
          font-family: inherit !important;
        }
        .google-translate-container .goog-te-gadget-icon {
          background-image: none !important;
          display: none !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        /* Overriding Google's iframe tooltip */
        .goog-tooltip {
          display: none !important;
        }
        .goog-tooltip:hover {
          display: none !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }
        body {
          top: 0 !important;
        }
      `;
      document.head.appendChild(style);
    };

    if (!window.google) {
      addScript();
      addCustomStyles();
    } else if (window.google.translate) {
      window.googleTranslateElementInit();
      addCustomStyles();
    }

    return () => {
      // Cleanup
      const script = document.querySelector('script[src*="translate.google.com"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'as', name: 'অসমীয়া', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        <Globe className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-gray-700">Translate:</span>
      </div>
      
      {!isLoaded ? (
        <div className="flex items-center space-x-2">
          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          <span className="text-xs text-gray-500">Loading...</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <div 
            id="google_translate_element" 
            className="google-translate-container"
          />
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
            <Languages className="w-3 h-3 mr-1" />
            {languages.length}+ Languages
          </Badge>
        </div>
      )}
    </div>
  );
};

export default GoogleTranslate;
