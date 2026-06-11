import React, { useState, useRef, useEffect } from 'react';
import { LogIn, ArrowRight, ArrowLeft, Smartphone, Mail, Shield, Lock, Eye, EyeOff, CheckCircle2, Zap, BarChart3, CloudOff } from 'lucide-react';
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

  return (
    <div className="min-h-screen flex bg-[#f8f6f3] font-['Inter',system-ui,sans-serif]">
      {/* Left Side (Branding) */}
      <div className="hidden md:flex flex-1 flex-col justify-center p-12 lg:p-20 bg-primary-600 text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 text-2xl font-extrabold mb-8">
            <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-xl font-extrabold shadow-sm">
              Q
            </div>
            QuoteFlow AI
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight tracking-tight">
            Welcome back to your business hub
          </h2>
          <p className="text-primary-100 text-[15px] mb-8 leading-relaxed">
            AI-powered quotations, GST billing, WhatsApp sharing, CRM, and marketing — all in one platform.
          </p>
          <ul className="space-y-1">
            {[
              { icon: Zap, text: 'AI generates quotations in 30 seconds' },
              { icon: Smartphone, text: 'One-click WhatsApp sharing' },
              { icon: BarChart3, text: 'Real-time P&L and profit analytics' },
              { icon: CloudOff, text: 'Works offline, syncs automatically' },
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 py-3 text-sm font-medium border-b border-white/10 last:border-none">
                <feature.icon size={18} className="text-primary-200" />
                {feature.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-[400px]">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors mb-6 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to QuoteFlow
          </Link>

          {!showTfa && !showOtp && (
            <>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Sign In</h2>
              <p className="text-sm text-gray-500 mb-7">Access your dashboard to manage your business</p>

              <button onClick={autoFillTest} className="w-full flex items-center gap-3 p-3.5 bg-emerald-50 border border-emerald-200/60 rounded-xl hover:bg-emerald-100/50 transition-colors mb-6 text-left group">
                <div className="w-9 h-9 bg-emerald-100/80 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                  <Lock size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <strong className="block text-sm text-emerald-700 font-bold">Test Credentials Available</strong>
                  <span className="block text-[12px] text-emerald-600/80 mt-0.5">One-click login with demo account (skips 2FA)</span>
                </div>
                <ArrowRight size={18} className="text-emerald-500 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6">
                <button onClick={() => setMode('email')} className={`flex-1 py-2 text-[13px] font-semibold transition-all rounded-lg ${mode === 'email' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  Login with Email
                </button>
                <button onClick={() => setMode('phone')} className={`flex-1 py-2 text-[13px] font-semibold transition-all rounded-lg ${mode === 'phone' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  Login with Phone
                </button>
              </div>

              {mode === 'email' ? (
                <form onSubmit={loginWithEmail} className="space-y-4.5">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 transition-all placeholder-gray-400" placeholder="demo@quoteflow.ai" required />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Password</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 transition-all placeholder-gray-400 pr-10" placeholder="Enter your password" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="text-right -mt-2 mb-2">
                    <button type="button" onClick={() => alert('Password reset link will be sent to your email')} className="text-[13px] font-semibold text-primary-600 hover:text-primary-700">Forgot password?</button>
                  </div>
                  <button type="submit" className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-white font-bold bg-primary-600 hover:bg-primary-700 shadow-sm transition-all text-sm hover:-translate-y-0.5">
                    Sign In with 2FA
                  </button>
                </form>
              ) : (
                <div className="space-y-4.5">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Mobile Number</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 transition-all placeholder-gray-400" placeholder="Enter 10-digit mobile number" />
                  </div>
                  <button onClick={sendOtp} disabled={phone.length !== 10} className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-white font-bold bg-primary-600 hover:bg-primary-700 shadow-sm transition-all text-sm disabled:opacity-50 hover:-translate-y-0.5">
                    Send OTP
                  </button>
                </div>
              )}

              <div className="flex items-center gap-4 my-7">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-[13px] font-medium text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm bg-white hover:border-primary-600 hover:text-primary-600 transition-all" onClick={() => { window.location.href = 'http://localhost:8081/oauth2/authorization/google'; }}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>

              <div className="mt-8 text-center text-sm text-gray-500 font-medium">
                Don't have an account? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold">Register here</Link>
              </div>
            </>
          )}

          {showTfa && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Two-Factor Authentication</h2>
              <p className="text-sm text-gray-500 mb-5">Enter the 6-digit code from your authenticator app.</p>
              
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-3 mb-7 flex items-center gap-2.5 text-xs text-primary-700 font-medium">
                <Shield size={16} className="text-primary-500" />
                <span>Dev mode: use <strong className="font-bold text-primary-800">123456</strong></span>
              </div>

              <div className="mb-7 text-center">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Authentication Code</div>
                <div className="flex gap-2 justify-center">
                  {tfa.map((d, i) => (
                    <input key={i} ref={(el) => { tfaRefs.current[i] = el; }} type="text" maxLength={1} value={d} onChange={(e) => handleOtpChange(i, e.target.value, tfaRefs, setTfa)} className="w-12 h-14 text-center text-xl font-bold bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 transition-all" />
                  ))}
                </div>
              </div>

              <button onClick={verifyTfa} disabled={tfa.join('').length !== 6} className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-white font-bold bg-primary-600 hover:bg-primary-700 shadow-sm transition-all text-sm disabled:opacity-50">
                Verify & Sign In
              </button>
              
              <div className="mt-4 text-center">
                <button onClick={() => navigate('/dashboard')} className="text-[13px] font-semibold text-gray-500 hover:text-gray-700 border border-gray-200 bg-white rounded-lg px-4 py-2 hover:border-gray-300 transition-colors">
                  Skip 2FA (Demo Mode)
                </button>
              </div>

              <div className="mt-6 text-center">
                <button onClick={cancelTfa} className="text-[13px] font-semibold text-primary-600 hover:text-primary-700">Back to sign in</button>
              </div>
            </div>
          )}

          {showOtp && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Verify OTP</h2>
              <p className="text-sm text-gray-500 mb-5">
                OTP sent to <strong className="text-gray-900">{otpPhone}</strong>{' '}
                <button onClick={cancelOtp} className="text-primary-600 font-medium hover:text-primary-700 text-[13px]">Change?</button>
              </p>
              
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-3 mb-7 flex items-center gap-2.5 text-xs text-primary-700 font-medium">
                <Shield size={16} className="text-primary-500" />
                <span>Dev mode: use <strong className="font-bold text-primary-800">123456</strong></span>
              </div>

              <div className="flex gap-2 justify-center mb-7">
                {otp.map((d, i) => (
                  <input key={i} ref={(el) => { otpRefs.current[i] = el; }} type="text" maxLength={1} value={d} onChange={(e) => handleOtpChange(i, e.target.value, otpRefs, setOtp)} className="w-12 h-14 text-center text-xl font-bold bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 transition-all" />
                ))}
              </div>

              <button onClick={verifyOtp} disabled={otp.join('').length !== 6} className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-white font-bold bg-primary-600 hover:bg-primary-700 shadow-sm transition-all text-sm disabled:opacity-50">
                Verify OTP
              </button>
              
              <div className="mt-6 text-center text-[13px] font-medium text-gray-500">
                Didn't receive? <button onClick={sendOtp} className="text-primary-600 font-bold hover:text-primary-700">Resend OTP</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
