import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PhoneOTPRegister = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const currentTint = '#22d3ee'; // Phone tab tint
  const buttonStyle = {
    background: `linear-gradient(135deg, ${currentTint}, ${currentTint}aa)`,
    boxShadow: `0 8px 32px ${currentTint}30`,
  };

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsOtpSent(true);
      setIsLoading(false);
      setCountdown(59);
      toast({
        title: "Registration OTP Sent",
        description: `Secure payload sent to +91 ${phoneNumber}`,
      });
      // Focus first OTP input
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }, 1500);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1); // Only take last char if multiple pasted
    if (!/^\d*$/.test(value)) return; // Only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account Created",
        description: "Welcome to the BharatSetu ecosystem.",
      });
      setTimeout(() => window.location.href = '/', 1000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {!isOtpSent ? (
        <>
          <div className="space-y-3 relative group">
            <Label htmlFor="phone" className="group-focus-within:-translate-y-1 transition-transform inline-block">Mobile Number</Label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-cyan-400 font-mono-stat text-sm z-10">+91</span>
              <Input
                id="phone"
                type="tel"
                placeholder="98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="pl-14 h-12 text-lg tracking-widest bg-transparent border-0 border-b-2 border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-cyan-400 focus-visible:bg-white/[0.02]"
                maxLength={10}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleSendOTP} 
            disabled={isLoading || phoneNumber.length !== 10}
            className="w-full mt-8 py-6 rounded-full text-sm font-semibold tracking-wide relative overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] active:shadow-none"
            style={buttonStyle}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative z-10 flex items-center">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {isLoading ? 'Encrypting Payload...' : 'Send OTP'}
            </span>
            {!isLoading && <ArrowRight className="w-4 h-4 ml-2 relative z-10" />}
          </Button>
        </>
      ) : (
        <div className="animate-fade-in space-y-8">
          <div className="text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-cyan-400 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 12px rgba(34,211,238,0.5))' }} />
            <p className="text-sm text-white/50 tracking-wider">
              Secure code transmitted to <span className="text-cyan-400 font-mono-stat">+91 {phoneNumber}</span>
            </p>
          </div>

          <div className="flex justify-between gap-2 px-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl bg-white/[0.04] border-white/10 rounded-xl focus-visible:ring-0 focus-visible:border-cyan-400 focus-visible:bg-white/[0.08]"
              />
            ))}
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleVerifyOTP} 
              disabled={isLoading || otp.join('').length !== 6}
              className="w-full py-6 rounded-full text-sm font-semibold tracking-wide relative overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] active:shadow-none"
              style={buttonStyle}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative z-10 flex items-center">
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {isLoading ? 'Verifying Signature...' : 'Verify & Register'}
              </span>
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2 relative z-10" />}
            </Button>

            <div className="flex items-center justify-between text-xs px-2">
              <span className="text-white/30 font-mono-stat">
                00:{countdown.toString().padStart(2, '0')}
              </span>
              {countdown === 0 ? (
                <button 
                  onClick={handleSendOTP}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Resend Code
                </button>
              ) : (
                <span className="text-white/20">Resend Code</span>
              )}
            </div>
            
            <div className="text-center pt-2">
              <button 
                onClick={() => {
                  setIsOtpSent(false);
                  setOtp(['', '', '', '', '', '']);
                }}
                className="text-[10px] text-white/30 hover:text-white/70 uppercase tracking-widest transition-colors"
              >
                Change Number
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneOTPRegister;
