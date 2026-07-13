import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Chrome, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GoogleLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const currentTint = '#f472b6'; // Google tab tint (pink)
  const buttonStyle = {
    background: `linear-gradient(135deg, ${currentTint}, ${currentTint}aa)`,
    boxShadow: `0 8px 32px ${currentTint}30`,
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "OAuth Initiated",
        description: "Redirecting to Google Workspace...",
      });
      
      setTimeout(() => {
        toast({
          title: "Login Successful",
          description: "Authenticated via Google",
        });
        window.location.href = '/';
      }, 2000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 pt-4">
        <div 
          className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center relative group"
          style={{ background: `${currentTint}15`, border: `1px solid ${currentTint}30` }}
        >
          <div className="absolute inset-0 rounded-2xl animate-pulse" style={{ boxShadow: `0 0 20px ${currentTint}40` }} />
          <Chrome className="w-8 h-8 relative z-10" style={{ color: currentTint }} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white/90 mb-2 tracking-wide">
            Google Auth
          </h3>
          <p className="text-xs text-white/40 leading-relaxed max-w-xs mx-auto">
            Enterprise-grade federated identity protocol.
          </p>
        </div>
      </div>

      <div className="glass rounded-2xl p-4 border border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <div className="flex items-start space-x-3 relative z-10">
          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: currentTint }} />
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-white/80 uppercase tracking-wider">Security Handshake</h4>
            <ul className="space-y-1.5 text-white/40 font-mono-stat">
              <li>{'>'} Biometric capable</li>
              <li>{'>'} Zero password transmission</li>
              <li>{'>'} SSO integration active</li>
            </ul>
          </div>
        </div>
      </div>

      <Button 
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full mt-6 py-6 rounded-full text-sm font-semibold tracking-wide relative overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] active:shadow-none"
        style={buttonStyle}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
        <span className="relative z-10 flex items-center">
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {isLoading ? 'Connecting Workspace...' : 'Continue with Google'}
        </span>
        {!isLoading && <ArrowRight className="w-4 h-4 ml-2 relative z-10" />}
      </Button>
    </div>
  );
};

export default GoogleLogin;
