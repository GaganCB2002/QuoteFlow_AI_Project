import React, { useState, useRef, useEffect } from 'react';
import { LogIn, ArrowLeft, Smartphone, Mail, Shield, Eye, EyeOff, Zap, BarChart3, CloudOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8081';

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

  useEffect(() => {
    document.title = 'Sign In | QuoteFlow AI';
  }, []);

  const handleOtpChange = (idx: number, val: string, refs: React.MutableRefObject<(HTMLInputElement | null)[]>, stateFn: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (val.length > 1) return;
    stateFn((prev) => { const n = [...prev]; n[idx] = val; return n; });
    if (val && idx < 5) refs.current[idx + 1]?.focus();
  };

  const setAuthSession = () => {
    const token = 'demo-token-' + Date.now();
    localStorage.setItem('token', token);
    localStorage.setItem('userId', 'demo-user-' + Date.now());
    localStorage.setItem('userName', 'Rahul Kumar');
    localStorage.setItem('userEmail', email || 'demo@quoteflow.ai');
    localStorage.setItem('companyName', 'Demo Company');
    localStorage.setItem('userCompany', 'Demo Company');
  };

  const autoFillTest = () => {
    setEmail('demo@quoteflow.ai');
    setPassword('demo123');
    setPhone('9876543210');
    setMode('email');
    setAuthSession();
    setTimeout(() => navigate('/dashboard'), 600);
  };

  const loginWithEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setAuthSession();
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
    setAuthSession();
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

              {/* Mode Tabs */}
              <div className="flex bg-white rounded-xl p-1 border border-gray-200 mb-6">
                <button
                  onClick={() => setMode('email')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    mode === 'email' ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Mail size={16} /> Email
                </button>
                <button
                  onClick={() => setMode('phone')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    mode === 'phone' ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Smartphone size={16} /> Phone
                </button>
              </div>

              {mode === 'email' ? (
                <form onSubmit={loginWithEmail} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-sm transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-sm transition-all"
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Link to="/register" className="text-xs font-semibold text-primary-600 hover:text-primary-700">
                      Forgot password?
                    </Link>
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-sm text-sm">
                    <LogIn size={16} /> Sign In
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">+91</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => { const v = e.target.value.replace(/\D/g, ''); if (v.length <= 10) setPhone(v); }}
                        placeholder="9876543210"
                        maxLength={10}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-sm transition-all"
                      />
                    </div>
                  </div>
                  <button
                    onClick={sendOtp}
                    disabled={phone.length !== 10}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-sm text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Smartphone size={16} /> Send OTP
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-400 text-center mb-3 font-medium">Or continue with</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { window.location.href = `${API_BASE}/oauth2/authorization/google`; }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Google
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </button>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700">
                  Register
                </Link>
              </p>

              {/* Demo Mode */}
              <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100">
                <p className="text-xs font-semibold text-primary-600 mb-2 flex items-center gap-1.5">
                  <Shield size={14} /> Demo Mode
                </p>
                <button
                  onClick={autoFillTest}
                  className="w-full py-2.5 text-sm font-bold text-primary-700 bg-white border border-primary-200 rounded-xl hover:bg-primary-100 transition-all"
                >
                  Auto-fill & Login as Demo User
                </button>
              </div>
            </>
          )}

          {/* TFA / OTP Screens */}
          {showTfa && !showOtp && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-primary-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Two-Factor Auth</h2>
              <p className="text-sm text-gray-500 mb-6">Enter the 6-digit code sent to your email</p>
              <div className="flex gap-2 justify-center mb-6">
                  {tfa.map((d, i) => (
                  <input key={i} ref={(el: HTMLInputElement | null) => { tfaRefs.current[i] = el; }} type="text" maxLength={1} value={d}
                    onChange={e => handleOtpChange(i, e.target.value, tfaRefs, setTfa)}
                    className="w-11 h-12 text-center text-lg font-bold border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                  />
                ))}
              </div>
              <button onClick={verifyTfa} disabled={tfa.join('').length !== 6}
                className="w-full py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-sm mb-3 disabled:opacity-40">
                Verify & Sign In
              </button>
              <button onClick={() => navigate('/dashboard')}
                className="w-full py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700">
                Skip 2FA (Demo Mode)
              </button>
              <button onClick={cancelTfa}
                className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 mt-2">
                Back to Sign In
              </button>
            </div>
          )}

          {showOtp && !showTfa && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <Smartphone size={32} className="text-emerald-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">OTP Verification</h2>
              <p className="text-sm text-gray-500 mb-2">Code sent to <span className="font-bold text-gray-700">+91 {otpPhone}</span></p>
              <p className="text-xs text-gray-400 mb-6">Test: Enter any 6 digits</p>
              <div className="flex gap-2 justify-center mb-6">
                {otp.map((d, i) => (
                  <input key={i} ref={(el: HTMLInputElement | null) => { otpRefs.current[i] = el; }} type="text" maxLength={1} value={d}
                    onChange={e => handleOtpChange(i, e.target.value, otpRefs, setOtp)}
                    className="w-11 h-12 text-center text-lg font-bold border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                  />
                ))}
              </div>
              <button onClick={verifyOtp} disabled={otp.join('').length !== 6}
                className="w-full py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-sm mb-3 disabled:opacity-40">
                Verify OTP
              </button>
              <button onClick={cancelOtp}
                className="w-full py-2 text-xs text-gray-400 hover:text-gray-600">
                Change Phone Number
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
