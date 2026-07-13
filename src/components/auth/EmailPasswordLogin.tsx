import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EmailPasswordLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const currentTint = '#a78bfa'; // Email tab tint
  const buttonStyle = {
    background: `linear-gradient(135deg, ${currentTint}, ${currentTint}aa)`,
    boxShadow: `0 8px 32px ${currentTint}30`,
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Decryption Successful",
        description: "Welcome back to BharatSetu.",
      });
      setTimeout(() => window.location.href = '/', 1000);
    }, 2000);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-3 relative group">
        <Label htmlFor="email" className="group-focus-within:-translate-y-1 transition-transform inline-block">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4 z-10" />
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-12 h-12 text-base bg-transparent border-0 border-b-2 border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-purple-400 focus-visible:bg-white/[0.02]"
            required
          />
        </div>
      </div>

      <div className="space-y-3 relative group">
        <Label htmlFor="password" className="group-focus-within:-translate-y-1 transition-transform inline-block">Password</Label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4 z-10" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-12 pr-12 h-12 text-base bg-transparent border-0 border-b-2 border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-purple-400 focus-visible:bg-white/[0.02] tracking-widest"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors z-10"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2 cursor-pointer group">
          <div className="relative flex items-center justify-center w-4 h-4">
            <input
              type="checkbox"
              id="remember"
              className="peer appearance-none w-4 h-4 border border-white/20 rounded bg-white/5 checked:bg-purple-500 checked:border-purple-500 transition-colors cursor-pointer"
            />
            <div className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 text-white flex items-center justify-center transition-opacity">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L4 7L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <Label htmlFor="remember" className="text-xs text-white/50 group-hover:text-white/80 transition-colors cursor-pointer uppercase tracking-wider">
            Remember me
          </Label>
        </div>
        <button type="button" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
          Forgot Password?
        </button>
      </div>

      <Button 
        type="submit" 
        disabled={isLoading || !email || !password}
        className="w-full mt-8 py-6 rounded-full text-sm font-semibold tracking-wide relative overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] active:shadow-none"
        style={buttonStyle}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
        <span className="relative z-10 flex items-center">
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {isLoading ? 'Decrypting...' : 'Sign In'}
        </span>
        {!isLoading && <ArrowRight className="w-4 h-4 ml-2 relative z-10" />}
      </Button>
    </form>
  );
};

export default EmailPasswordLogin;
