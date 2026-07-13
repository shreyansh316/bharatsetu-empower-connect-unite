import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, ArrowRight, CheckCircle, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// ─── API Config ──────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_OTP_API_URL || 'http://localhost:5000';

// ─── API Calls ───────────────────────────────────────────────────
async function apiSendOTP(phone: string) {
  const res = await fetch(`${API_BASE}/api/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone_number: phone }),
  });
  return res.json();
}

async function apiVerifyOTP(sessionId: string, otp: string) {
  const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId, otp }),
  });
  return res.json();
}

// ─── Component ───────────────────────────────────────────────────
const PhoneOTPLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState(5);
  const { toast } = useToast();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Custom button styling
  const currentTint = '#22d3ee';
  const buttonStyle = {
    background: `linear-gradient(135deg, ${currentTint}, ${currentTint}aa)`,
    boxShadow: `0 8px 32px ${currentTint}30`,
  };

  // ─── Send OTP (Real API) ────────────────────────────────────────
  const handleSendOTP = useCallback(async () => {
    if (!phoneNumber || phoneNumber.length !== 10) return;

    setIsLoading(true);
    setError('');

    try {
      const data = await apiSendOTP(phoneNumber);

      if (data.success) {
        setSessionId(data.session_id);
        setIsOtpSent(true);
        setCountdown(59);
        setAttemptsRemaining(5);
        toast({
          title: '📱 OTP Sent!',
          description: data.message || `Real SMS sent to +91 ${phoneNumber}`,
        });
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      } else {
        setError(data.error || 'Failed to send OTP');
        toast({
          title: 'Send Failed',
          description: data.error,
          variant: 'destructive',
        });
      }
    } catch (err) {
      setError('Cannot reach OTP server. Make sure the server is running on port 5000.');
      toast({
        title: 'Connection Error',
        description: 'OTP server not reachable. Run: cd server && npm run server',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [phoneNumber, toast]);

  // ─── Countdown Timer ────────────────────────────────────────────
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // ─── OTP Input Handlers ─────────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste (e.g., from SMS auto-read)
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  // ─── Verify OTP (Real API) ──────────────────────────────────────
  const handleVerifyOTP = useCallback(async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6 || !sessionId) return;

    setIsLoading(true);
    setError('');

    try {
      const data = await apiVerifyOTP(sessionId, fullOtp);

      if (data.success) {
        // ✅ Verified!
        setIsVerified(true);

        // Store auth token
        if (data.token) {
          localStorage.setItem('bharatsetu_token', data.token);
          localStorage.setItem('bharatsetu_phone', data.phone || `+91${phoneNumber}`);
          localStorage.setItem('bharatsetu_user', JSON.stringify(data.user));
        }

        toast({
          title: '✅ Verified!',
          description: 'Login successful. Welcome to BharatSetu!',
        });

        // Redirect after animation
        setTimeout(() => {
          window.location.href = '/account';
        }, 1500);
      } else {
        setAttemptsRemaining(data.attempts_remaining ?? attemptsRemaining - 1);
        setError(data.error || 'Invalid OTP');
        // Shake the OTP inputs
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError('Verification server unreachable. Check your connection.');
    } finally {
      setIsLoading(false);
    }
  }, [otp, sessionId, phoneNumber, toast, attemptsRemaining]);

  // ─── Verified State ─────────────────────────────────────────────
  if (isVerified) {
    return (
      <div className="text-center py-8 animate-scale-in">
        <div
          className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
          style={{ background: '#4ade8020', boxShadow: '0 0 40px #4ade8020' }}
        >
          <ShieldCheck className="w-10 h-10 text-green-400" />
        </div>
        <h3 className="text-white text-lg font-bold mb-2">Identity Verified</h3>
        <p className="text-white/40 text-xs">Redirecting to your dashboard...</p>
        <div className="mt-4">
          <div className="w-32 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-green-400 rounded-full"
              style={{ animation: 'fill-bar 1.5s ease-out forwards' }}
            />
          </div>
        </div>
        <style>{`
          @keyframes fill-bar {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  // ─── Render ─────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Error display */}
      {error && (
        <div className="glass rounded-xl p-3 flex items-start gap-3 border border-red-500/20 animate-float-up">
          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-red-300/80">{error}</p>
        </div>
      )}

      {!isOtpSent ? (
        <>
          <div className="space-y-3 relative group">
            <Label
              htmlFor="phone"
              className="group-focus-within:-translate-y-1 transition-transform inline-block"
            >
              Mobile Number
            </Label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-cyan-400 font-mono-stat text-sm z-10">
                +91
              </span>
              <Input
                id="phone"
                type="tel"
                placeholder="98765 43210"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
                }
                onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
                className="pl-14 h-12 text-lg tracking-widest bg-transparent border-0 border-b-2 border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-cyan-400 focus-visible:bg-white/[0.02]"
                maxLength={10}
                autoComplete="tel"
              />
            </div>
            {phoneNumber.length > 0 && phoneNumber.length < 10 && (
              <p className="text-white/20 text-[10px] font-mono-stat">
                {10 - phoneNumber.length} digits remaining
              </p>
            )}
          </div>

          <Button
            onClick={handleSendOTP}
            disabled={isLoading || phoneNumber.length !== 10}
            className="w-full mt-8 py-6 rounded-full text-sm font-semibold tracking-wide relative overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] active:shadow-none"
            style={buttonStyle}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative z-10 flex items-center">
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Phone className="w-4 h-4 mr-2" />
              )}
              {isLoading ? 'Sending Real SMS...' : 'Send OTP via SMS'}
            </span>
            {!isLoading && <ArrowRight className="w-4 h-4 ml-2 relative z-10" />}
          </Button>

          {/* Info */}
          <p className="text-center text-white/15 text-[10px] mt-2">
            A real 6-digit OTP will be sent to your phone via SMS
          </p>
        </>
      ) : (
        <div className="animate-fade-in space-y-8">
          <div className="text-center space-y-2">
            <CheckCircle
              className="w-8 h-8 text-cyan-400 mx-auto mb-4"
              style={{ filter: 'drop-shadow(0 0 12px rgba(34,211,238,0.5))' }}
            />
            <p className="text-sm text-white/50 tracking-wider">
              OTP sent to{' '}
              <span className="text-cyan-400 font-mono-stat">
                +91 {phoneNumber.slice(0, 3)}****{phoneNumber.slice(7)}
              </span>
            </p>
            <p className="text-white/20 text-[10px]">
              Check your phone for the SMS • {attemptsRemaining} attempts remaining
            </p>
          </div>

          {/* OTP Input boxes */}
          <div className="flex justify-between gap-2 px-2" onPaste={handleOtpPaste}>
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
                className={`w-12 h-14 text-center text-2xl bg-white/[0.04] border-white/10 rounded-xl focus-visible:ring-0 focus-visible:border-cyan-400 focus-visible:bg-white/[0.08] ${
                  error ? 'border-red-500/30 animate-shake' : ''
                }`}
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
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ShieldCheck className="w-4 h-4 mr-2" />
                )}
                {isLoading ? 'Verifying...' : 'Verify & Login'}
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
                  Resend OTP
                </button>
              ) : (
                <span className="text-white/20">Resend OTP</span>
              )}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setIsOtpSent(false);
                  setOtp(['', '', '', '', '', '']);
                  setError('');
                  setSessionId('');
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

export default PhoneOTPLogin;
