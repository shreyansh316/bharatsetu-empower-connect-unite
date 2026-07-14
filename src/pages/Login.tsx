import React, { useState, useEffect, useRef, FormEvent, KeyboardEvent, ClipboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Building2, Phone, ChevronRight, Loader2, Landmark, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/* ─────────────────────────────────────────────
   Translations Dictionary
   ───────────────────────────────────────────── */
const TRANSLATIONS = {
  en: {
    appTitle: "BharatSetu",
    appSubtitle: "National Civic Access Portal | राष्ट्रीय नागरिक पहुँच पोर्टल",
    tabMobile: "Mobile / Aadhaar",
    tabDigilocker: "DigiLocker",
    mobileLabel: "Mobile Number",
    mobilePlaceholder: "Enter 10-digit number",
    mobileHint: "An OTP will be sent to your Aadhaar-linked mobile number for verification.",
    mobileError: "Please enter a valid 10-digit mobile number.",
    generateOtp: "Generate OTP",
    otpPrompt1: "Enter the 6-digit OTP sent to",
    otpResendWait: "Resend OTP in",
    otpResendPrompt: "Didn't receive the code?",
    otpResendBtn: "Resend OTP",
    authenticateBtn: "Authenticate",
    changeMobileBtn: "Change mobile number",
    digiLabel: "DigiLocker Username / Aadhaar",
    digiPlaceholder: "Enter your registered ID",
    digiHint: "You will be redirected to DigiLocker to authorize access.",
    digiBtn: "Proceed to DigiLocker",
    registerPrompt: "Don't have an account?",
    registerBtn: "Register Here",
    trustEncryption: "Secured by 256-bit Encryption",
    trustGov: "An Initiative of the Government of India",
    otpSentToast: "OTP Sent Successfully"
  },
  hi: {
    appTitle: "भारतसेतु",
    appSubtitle: "National Civic Access Portal | राष्ट्रीय नागरिक पहुँच पोर्टल",
    tabMobile: "मोबाइल / आधार",
    tabDigilocker: "डिजीलॉकर",
    mobileLabel: "मोबाइल नंबर",
    mobilePlaceholder: "10 अंकों का नंबर दर्ज करें",
    mobileHint: "सत्यापन के लिए आपके आधार से जुड़े मोबाइल नंबर पर एक ओटीपी भेजा जाएगा।",
    mobileError: "कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें।",
    generateOtp: "ओटीपी जनरेट करें",
    otpPrompt1: "भेजा गया 6-अंकीय ओटीपी दर्ज करें",
    otpResendWait: "ओटीपी फिर से भेजें:",
    otpResendPrompt: "क्या आपको कोड नहीं मिला?",
    otpResendBtn: "ओटीपी फिर से भेजें",
    authenticateBtn: "प्रमाणित करें",
    changeMobileBtn: "मोबाइल नंबर बदलें",
    digiLabel: "डिजीलॉकर उपयोगकर्ता नाम / आधार",
    digiPlaceholder: "अपनी पंजीकृत आईडी दर्ज करें",
    digiHint: "आपको पहुंच को अधिकृत करने के लिए डिजीलॉकर पर पुनर्निर्देशित किया जाएगा।",
    digiBtn: "डिजीलॉकर पर जाएं",
    registerPrompt: "क्या आपके पास खाता नहीं है?",
    registerBtn: "यहाँ रजिस्टर करें",
    trustEncryption: "256-बिट एन्क्रिप्शन द्वारा सुरक्षित",
    trustGov: "भारत सरकार की एक पहल",
    otpSentToast: "ओटीपी सफलतापूर्वक भेजा गया"
  }
};

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
    aria-hidden="true"
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

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const t = TRANSLATIONS[lang];

  const [activeTab, setActiveTab] = useState<'mobile' | 'digilocker'>('mobile');
  
  // Mobile Form State
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileTouched, setMobileTouched] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Resend Timer State
  const [countdown, setCountdown] = useState(30);

  // DigiLocker Form State
  const [digiLockerId, setDigiLockerId] = useState('');

  // Refs
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Validation
  const isValidMobile = /^[6-9]\d{9}$/.test(mobileNumber);
  const showMobileError = mobileTouched && !isValidMobile && mobileNumber.length > 0;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, countdown]);

  const handleSendOtp = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!isValidMobile) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setCountdown(30);
      toast({
        title: t.otpSentToast,
        description: `+91 ${mobileNumber.slice(0, 3)}XXXXX${mobileNumber.slice(8)}`,
      });
      // Focus first OTP input
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }, 1000);
  };

  const handleVerifyOtp = (e: FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }, 1200);
  };

  const handleDigiLockerLogin = (e: FormEvent) => {
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

  const handleOtpKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const p = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    setOtp(p);
    otpRefs.current[Math.min(p.length, 5)]?.focus();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden font-sans">
      {/* ── Tricolor Accent Bar ── */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-green-600 fixed top-0 left-0 z-50 shadow-sm" aria-hidden="true" />

      {/* ── Header & Language Toggle ── */}
      <div className="absolute top-4 right-6 z-50">
        <button
          onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-offset-2 focus:ring-offset-slate-50"
          aria-label="Toggle language between English and Hindi"
        >
          <Globe className="w-4 h-4 text-[#000080]" />
          <span>{lang === 'en' ? 'A / अ' : 'अ / A'}</span>
        </button>
      </div>

      <AshokaChakraWatermark />

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        
        {/* ── Official Branding Header ── */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-slate-200 flex items-center justify-center text-[#000080]" aria-hidden="true">
              <Landmark className="w-8 h-8" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2" aria-label={t.appTitle}>
            {t.appTitle}
          </h1>
          <p className="text-slate-600 text-sm font-medium" aria-label="National Civic Access Portal">
            {lang === 'en' ? (
              <>National Civic Access Portal <span className="mx-2 text-slate-300">|</span> <span className="font-serif ml-1">राष्ट्रीय नागरिक पहुँच पोर्टल</span></>
            ) : (
              <><span className="font-serif">राष्ट्रीय नागरिक पहुँच पोर्टल</span> <span className="mx-2 text-slate-300">|</span> <span className="ml-1">National Civic Access Portal</span></>
            )}
          </p>
        </div>

        {/* ── Login Card ── */}
        <div className="w-full max-w-[440px] bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/50" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'mobile'}
              onClick={() => { setActiveTab('mobile'); setOtpSent(false); setOtp(''); }}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === 'mobile' ? 'text-[#000080]' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                {t.tabMobile}
              </div>
              {activeTab === 'mobile' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#000080]" />
              )}
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'digilocker'}
              onClick={() => { setActiveTab('digilocker'); }}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === 'digilocker' ? 'text-[#000080]' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Building2 className="w-4 h-4" />
                {t.tabDigilocker}
              </div>
              {activeTab === 'digilocker' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#000080]" />
              )}
            </button>
          </div>

          <div className="p-8">
            {/* ──────── MOBILE / AADHAAR TAB ──────── */}
            {activeTab === 'mobile' && (
              <div role="tabpanel">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-6" noValidate>
                    <div>
                      <label htmlFor="mobile" className="block text-sm font-semibold text-slate-700 mb-2">
                        {t.mobileLabel}
                      </label>
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-14 flex items-center justify-center border-r border-slate-300 bg-slate-50 text-slate-500 font-medium text-sm rounded-l-lg" aria-hidden="true">
                          +91
                        </div>
                        <input
                          id="mobile"
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                          onBlur={() => setMobileTouched(true)}
                          placeholder={t.mobilePlaceholder}
                          aria-invalid={showMobileError}
                          aria-describedby={showMobileError ? "mobile-error" : "mobile-hint"}
                          className={`w-full pl-16 pr-4 py-3 rounded-lg border text-slate-900 text-sm focus:outline-none focus:ring-1 transition-shadow placeholder:text-slate-400
                            ${showMobileError 
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                              : 'border-slate-300 focus:border-[#000080] focus:ring-[#000080]'
                            }`}
                          autoComplete="off"
                        />
                      </div>
                      {showMobileError ? (
                        <p id="mobile-error" className="mt-2 text-xs text-red-500 font-medium" role="alert">
                          {t.mobileError}
                        </p>
                      ) : (
                        <p id="mobile-hint" className="mt-2 text-xs text-slate-500">
                          {t.mobileHint}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !isValidMobile}
                      aria-disabled={loading || !isValidMobile}
                      className="w-full bg-[#000080] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#000080]/10"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      ) : (
                        <>{t.generateOtp} <ChevronRight className="w-4 h-4" aria-hidden="true" /></>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="text-center mb-6">
                      <p className="text-sm text-slate-600">{t.otpPrompt1}</p>
                      <p className="font-semibold text-slate-900 mt-1" dir="ltr">
                        +91 {mobileNumber.slice(0, 3)} •••• {mobileNumber.slice(7)}
                      </p>
                    </div>

                    <div 
                      className="flex justify-center gap-2" 
                      onPaste={handleOtpPaste}
                      role="group"
                      aria-label="OTP Input"
                    >
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
                          aria-label={`Digit ${i + 1} of OTP`}
                          className="w-11 h-12 text-center text-xl font-bold rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-shadow bg-white"
                        />
                      ))}
                    </div>

                    <div className="text-center text-xs text-slate-500 flex flex-col items-center gap-1 mt-2">
                      <span>{t.otpResendPrompt}</span>
                      {countdown > 0 ? (
                        <span className="font-medium text-slate-600" aria-live="polite">
                          {t.otpResendWait} 00:{countdown.toString().padStart(2, '0')}
                        </span>
                      ) : (
                        <button 
                          type="button" 
                          onClick={() => handleSendOtp()}
                          className="text-[#000080] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-offset-2 rounded px-1"
                        >
                          {t.otpResendBtn}
                        </button>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      aria-disabled={loading || otp.length !== 6}
                      className="w-full bg-[#000080] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#000080]/10"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      ) : (
                        <>{t.authenticateBtn} <ShieldCheck className="w-4 h-4" aria-hidden="true" /></>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => { setOtpSent(false); setOtp(''); setCountdown(30); setMobileTouched(false); }}
                      className="w-full text-center text-sm text-slate-500 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-offset-2 rounded"
                    >
                      {t.changeMobileBtn}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ──────── DIGILOCKER TAB ──────── */}
            {activeTab === 'digilocker' && (
              <div role="tabpanel">
                <form onSubmit={handleDigiLockerLogin} className="space-y-6" noValidate>
                  <div>
                    <label htmlFor="digilockerId" className="block text-sm font-semibold text-slate-700 mb-2">
                      {t.digiLabel}
                    </label>
                    <input
                      id="digilockerId"
                      type="text"
                      value={digiLockerId}
                      onChange={(e) => setDigiLockerId(e.target.value)}
                      placeholder={t.digiPlaceholder}
                      aria-describedby="digilocker-hint"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-shadow placeholder:text-slate-400"
                    />
                    <p id="digilocker-hint" className="mt-2 text-xs text-slate-500">
                      {t.digiHint}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !digiLockerId.trim()}
                    aria-disabled={loading || !digiLockerId.trim()}
                    className="w-full bg-[#000080] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#000080]/10"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    ) : (
                      <>{t.digiBtn} <Building2 className="w-4 h-4" aria-hidden="true" /></>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
          
          {/* Create Account Link */}
          <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              {t.registerPrompt}{' '}
              <button 
                onClick={() => navigate('/register')} 
                className="text-[#000080] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-offset-2 rounded px-1"
              >
                {t.registerBtn}
              </button>
            </p>
          </div>
        </div>

        {/* ── Official Trust Footer ── */}
        <div className="mt-10 flex flex-col md:flex-row items-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>{t.trustEncryption}</span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem of India" className="w-4 h-5 opacity-60 grayscale" />
            <span>{t.trustGov}</span>
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default Login;
