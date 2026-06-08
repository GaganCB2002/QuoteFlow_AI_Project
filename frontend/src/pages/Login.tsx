import React, { useState, useRef, useEffect } from 'react';
import { LogIn, ArrowRight, ArrowLeft, Smartphone, Mail, Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showTfa, setShowTfa] = useState(false);
  const [otpPhone, setOtpPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [tfa, setTfa] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const tfaRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (idx: number, val: string, refs: React.MutableRefObject<(HTMLInputElement | null)[]>, stateFn: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (val.length > 1) return;
    stateFn((prev) => { const n = [...prev]; n[idx] = val; return n; });
    if (val && idx < 5) refs.current[idx + 1]?.focus();
  };

  const autoFillTest = () => {
    setEmail('demo@quoteflow.ai');
    setPassword('demo123');
    setPhone('9876543210');
    setMode('email');
    setTimeout(() => navigate('/dashboard'), 600);
  };

  const loginWithEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setShowTfa(true);
  };

  const verifyTfa = () => {
    const code = tfa.join('');
    if (code.length !== 6) return;
    if (code === '123456') {
      navigate('/dashboard');
    }
  };

  const sendOtp = () => {
    if (phone.length !== 10) return;
    setOtpPhone(phone);
    setShowOtp(true);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const verifyOtp = () => {
    const code = otp.join('');
    if (code.length !== 6) return;
    navigate('/dashboard');
  };

  const cancelOtp = () => {
    setShowOtp(false);
  };

  const cancelTfa = () => {
    setShowTfa(false);
  };

  if (showTfa) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 shadow-lg mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Two-Factor Authentication</h2>
            <p className="text-indigo-200 mt-2 text-sm">Enter the 6-digit code from your authenticator app</p>
          </div>
          <div className="bg-indigo-800/30 border border-indigo-500/30 rounded-xl p-3 mb-6 text-xs text-indigo-300 flex items-center gap-2">
            <Shield size={14} />
            Dev mode: use <strong className="text-white">123456</strong>
          </div>
          <div className="text-center mb-6">
            <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-4">Authentication Code</p>
            <div className="flex gap-2 justify-center">
              {tfa.map((d, i) => (
                <input key={i} ref={(el) => { tfaRefs.current[i] = el; }} type="text" maxLength={1} value={d} onChange={(e) => handleOtpChange(i, e.target.value, tfaRefs, setTfa)} className="w-11 h-12 text-center text-xl font-bold bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
              ))}
            </div>
          </div>
          <button onClick={verifyTfa} disabled={tfa.join('').length !== 6} className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg transition-all disabled:opacity-50">
            Verify & Sign In <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <button onClick={() => navigate('/dashboard')} className="w-full mt-3 py-2 px-4 rounded-xl border border-white/20 text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
            Skip 2FA (Demo Mode)
          </button>
          <p className="mt-4 text-center text-sm text-indigo-200">
            <button onClick={cancelTfa} className="text-purple-400 hover:text-purple-300">Back to sign in</button>
          </p>
        </div>
      </div>
    );
  }

  if (showOtp) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 shadow-lg mb-4">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Verify OTP</h2>
            <p className="text-indigo-200 mt-2 text-sm">OTP sent to <strong className="text-white">{otpPhone}</strong></p>
          </div>
          <div className="bg-indigo-800/30 border border-indigo-500/30 rounded-xl p-3 mb-6 text-xs text-indigo-300 flex items-center gap-2">
            <Shield size={14} />
            Dev mode: use <strong className="text-white">123456</strong>
          </div>
          <div className="flex gap-2 justify-center mb-6">
            {otp.map((d, i) => (
              <input key={i} ref={(el) => { otpRefs.current[i] = el; }} type="text" maxLength={1} value={d} onChange={(e) => handleOtpChange(i, e.target.value, otpRefs, setOtp)} className="w-11 h-12 text-center text-xl font-bold bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
            ))}
          </div>
          <button onClick={verifyOtp} disabled={otp.join('').length !== 6} className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg transition-all disabled:opacity-50">
            Verify OTP <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <p className="mt-4 text-center text-sm text-indigo-200">
            Didn't receive? <button onClick={sendOtp} className="text-purple-400 hover:text-purple-300">Resend OTP</button>
            <br /><button onClick={cancelOtp} className="text-purple-400 hover:text-purple-300 text-xs mt-1">Change phone number?</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-white mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to QuoteFlow
        </Link>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg mb-4">
            <span className="text-2xl font-bold text-white">QF</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Sign In</h2>
          <p className="text-indigo-200 mt-2">Access your dashboard to manage your business</p>
        </div>

        <button onClick={autoFillTest} className="w-full flex items-center gap-3 p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/30 hover:bg-emerald-800/40 transition-all mb-5 text-left group">
          <Lock size={20} className="text-emerald-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <strong className="block text-sm text-emerald-400">Test Credentials Available</strong>
            <span className="text-xs text-indigo-300">One-click login with demo account</span>
          </div>
          <ArrowRight size={18} className="text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
        </button>

        <div className="flex gap-1 p-1 rounded-xl bg-black/20 mb-6">
          <button onClick={() => setMode('email')} className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${mode === 'email' ? 'bg-white/15 text-white shadow-sm' : 'text-indigo-300 hover:text-white'}`}>
            <Mail size={14} className="inline mr-1.5 -mt-0.5" /> Email
          </button>
          <button onClick={() => setMode('phone')} className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${mode === 'phone' ? 'bg-white/15 text-white shadow-sm' : 'text-indigo-300 hover:text-white'}`}>
            <Smartphone size={14} className="inline mr-1.5 -mt-0.5" /> Phone
          </button>
        </div>

        {mode === 'email' ? (
          <form onSubmit={loginWithEmail} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-indigo-100 mb-1">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" placeholder="demo@quoteflow.ai" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-indigo-100 mb-1">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-10" placeholder="Enter your password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <button type="button" onClick={() => alert('Password reset link will be sent to your email')} className="text-sm text-purple-400 hover:text-purple-300">Forgot password?</button>
            </div>
            <button type="submit" className="group w-full flex justify-center items-center py-3 px-4 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg transition-all hover:-translate-y-0.5">
              Sign In with 2FA <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        ) : (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-indigo-100 mb-1">Mobile Number</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" placeholder="Enter 10-digit mobile number" />
            </div>
            <button onClick={sendOtp} disabled={phone.length !== 10} className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg transition-all disabled:opacity-50">
              Send OTP <Smartphone className="ml-2 w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-sm text-indigo-200/60">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-all font-medium" onClick={() => alert('Google OAuth coming soon')}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-indigo-200">
          Don't have an account? <Link to="/register" className="font-semibold text-purple-400 hover:text-purple-300">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
