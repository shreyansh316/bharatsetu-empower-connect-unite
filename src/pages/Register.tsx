import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Building2, Phone, ChevronRight, Loader2, Landmark, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/* ─────────────────────────────────────────────
   Ashoka Chakra Watermark SVG
   ───────────────────────────────────────────── */
const AshokaChakraWatermark = () => (
  <svg
    viewBox="0 0 100 100"
    className="fixed -bottom-32 -right-32 w-[600px] h-[600px] text-slate-400 opacity-5 pointer-events-none select-none z-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="50" cy="50" r="46" />
    <circle cx="50" cy="50" r="8" fill="currentColor" />
    {Array.from({ length: 24 }).map((_, i) => (
      <line
        key={i}
        x1="50"
        y1="50"
        x2={50 + 46 * Math.cos((i * 15 * Math.PI) / 180)}
        y2={50 + 46 * Math.sin((i * 15 * Math.PI) / 180)}
        strokeWidth="1"
      />
    ))}
  </svg>
);

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<'mobile' | 'digilocker'>('mobile');
  
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [digiLockerId, setDigiLockerId] = useState('');
  
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Focus management for OTP
  const otpRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !/^[6-9]\d{9}$/.test(mobileNumber)) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      toast({
        title: 'OTP Sent Successfully',
        description: `Sent to +91 ${mobileNumber.slice(0, 3)}XXXXX${mobileNumber.slice(8)}`,
      });
      // Focus first OTP input
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }, 1200);
  };

  const handleDigiLockerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!digiLockerId.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }, 1500);
  };

  const handleOtpChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const arr = otp.split('');
    arr[i] = v;
    setOtp(arr.join(''));
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const p = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    setOtp(p);
    otpRefs.current[Math.min(p.length, 5)]?.focus();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden font-sans">
      {/* ── Tricolor Accent Bar ── */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-green-600 fixed top-0 left-0 z-50 shadow-sm" />

      <AshokaChakraWatermark />

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        
        {/* ── Official Branding Header ── */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-slate-200 flex items-center justify-center text-[#000080]">
              <Landmark className="w-8 h-8" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            BharatSetu
          </h1>
          <p className="text-slate-600 text-sm font-medium">
            National Civic Access Portal <span className="mx-2 text-slate-300">|</span> 
            <span className="font-serif ml-1">राष्ट्रीय नागरिक पहुँच पोर्टल</span>
          </p>
        </div>

        {/* ── Register Card ── */}
        <div className="w-full max-w-[440px] bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          
          <div className="bg-slate-50 border-b border-slate-200 px-8 py-5 text-center">
             <h2 className="text-lg font-bold text-slate-900">Citizen Registration</h2>
             <p className="text-xs text-slate-500 mt-1">Create your unified government identity</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-white">
            <button
              onClick={() => { setActiveTab('mobile'); setOtpSent(false); setOtp(''); }}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === 'mobile' ? 'text-[#000080]' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Mobile / Aadhaar
              </div>
              {activeTab === 'mobile' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#000080]" />
              )}
            </button>
            <button
              onClick={() => { setActiveTab('digilocker'); }}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === 'digilocker' ? 'text-[#000080]' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Building2 className="w-4 h-4" />
                DigiLocker
              </div>
              {activeTab === 'digilocker' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#000080]" />
              )}
            </button>
          </div>

          <div className="p-8">
            {/* ──────── MOBILE / AADHAAR TAB ──────── */}
            {activeTab === 'mobile' && (
              <div>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name (as per Aadhaar)
                      </label>
                      <div className="relative">
                         <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-shadow placeholder:text-slate-400"
                          autoComplete="name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="mobile" className="block text-sm font-semibold text-slate-700 mb-2">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-14 flex items-center justify-center border-r border-slate-300 bg-slate-50 text-slate-500 font-medium text-sm rounded-l-lg">
                          +91
                        </div>
                        <input
                          id="mobile"
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                          placeholder="Enter 10-digit number"
                          className="w-full pl-16 pr-4 py-3 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-shadow placeholder:text-slate-400"
                          autoComplete="off"
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                        An OTP will be sent to this number for verification. It should be linked to your Aadhaar.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || mobileNumber.length !== 10 || !fullName.trim()}
                      className="w-full bg-[#000080] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#000080]/10"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>Generate OTP <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="text-center mb-6">
                      <p className="text-sm text-slate-600">Enter the 6-digit OTP sent to</p>
                      <p className="font-semibold text-slate-900 mt-1">
                        +91 {mobileNumber.slice(0, 3)} •••• {mobileNumber.slice(7)}
                      </p>
                    </div>

                    <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <input
                          key={i}
                          ref={(el) => { otpRefs.current[i] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={otp[i] || ''}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKey(i, e)}
                          className="w-11 h-12 text-center text-xl font-bold rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-shadow bg-white"
                        />
                      ))}
                    </div>

                    <div className="text-center text-xs text-slate-500">
                      Didn't receive the code?{' '}
                      <button type="button" className="text-[#000080] font-semibold hover:underline">
                        Resend OTP
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      className="w-full bg-[#000080] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#000080]/10"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>Verify & Register <ShieldCheck className="w-4 h-4" /></>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => { setOtpSent(false); setOtp(''); }}
                      className="w-full text-center text-sm text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      Edit details
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ──────── DIGILOCKER TAB ──────── */}
            {activeTab === 'digilocker' && (
              <form onSubmit={handleDigiLockerRegister} className="space-y-6">
                <div>
                  <label htmlFor="digilockerId" className="block text-sm font-semibold text-slate-700 mb-2">
                    DigiLocker Username / Aadhaar
                  </label>
                  <input
                    id="digilockerId"
                    type="text"
                    value={digiLockerId}
                    onChange={(e) => setDigiLockerId(e.target.value)}
                    placeholder="Enter your registered ID"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-shadow placeholder:text-slate-400"
                  />
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    You will be redirected to DigiLocker to authorize access and fetch your KYC details automatically.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || !digiLockerId.trim()}
                  className="w-full bg-[#000080] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#000080]/10"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Register via DigiLocker <Building2 className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>
          
          {/* Sign In Link */}
          <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="text-[#000080] font-semibold hover:underline">
                Sign In
              </button>
            </p>
          </div>
        </div>

        {/* ── Official Trust Footer ── */}
        <div className="mt-10 flex flex-col md:flex-row items-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Secured by 256-bit Encryption</span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300" />
          <div className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" className="w-4 h-5 opacity-60 grayscale" />
            <span>An Initiative of the Government of India</span>
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default Register;
