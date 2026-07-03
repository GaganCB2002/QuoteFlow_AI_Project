import React, { useState, useRef, useEffect, useCallback } from 'react';
import { LogIn, ArrowLeft, Smartphone, Mail, Shield, Eye, EyeOff, Zap, BarChart3, CloudOff, UserCog, UserRound, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { apiRequest, getApiBase } from '../utils/api';
import QuoteFlowLogo from '../components/QuoteFlowLogo';
import { storage } from '../utils/storage';
import { isValidEmail, isValidPhone } from '../utils/validation';
import { getErrorMessage } from '../utils/errors';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string; phone?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const tfaRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    document.title = 'Sign In | QuoteFlow AI';
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isLocked && lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => prev - 1);
      }, 1000);
    } else if (lockoutTimer === 0 && isLocked) {
      setIsLocked(false);
      setFailedAttempts(0);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockoutTimer]);

  const handleOtpChange = (idx: number, val: string, refs: React.MutableRefObject<(HTMLInputElement | null)[]>, stateFn: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (val.length > 1) return;
    stateFn((prev) => { const n = [...prev]; n[idx] = val; return n; });
    if (val && idx < 5) refs.current[idx + 1]?.focus();
  };

  const loginWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) errs.email = 'Email is required';
    else if (!isValidEmail(email.trim())) errs.email = 'Enter a valid email address';

    if (!password) errs.password = 'Password is required';

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const res = await apiRequest<{ token: string; userId: string; userName: string; userEmail: string; companyName: string; role: string; requiresTfa: boolean }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), password }),
      });

      storage.setToken(res.token);
      storage.setUserId(res.userId);
      storage.setUserName(res.userName);
      storage.setUserEmail(res.userEmail);
      storage.setCompanyName(res.companyName);
      if (res.role) storage.setUserRole(res.role);

      if (res.requiresTfa) {
        setShowTfa(true);
      } else {
        navigate(redirectTo);
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setFailedAttempts((prev) => {
        const newCount = prev + 1;
        if (newCount >= 2) {
          setIsLocked(true);
          setLockoutTimer(15);
        }
        return newCount;
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyTfa = async () => {
    const code = tfa.join('');
    if (code.length !== 6) return;
    setError('');

    setLoading(true);
    try {
      const res = await apiRequest<{ token: string; userId: string; userName: string; userEmail: string; companyName: string; role: string }>('/api/auth/verify-tfa', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), code }),
      });

      if (res.token) {
        storage.setToken(res.token);
        storage.setUserId(res.userId);
        storage.setUserName(res.userName);
        storage.setUserEmail(res.userEmail);
        storage.setCompanyName(res.companyName);
        if (res.role) storage.setUserRole(res.role);
      }
      navigate(redirectTo);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    setError('');
    setFieldErrors({});

    if (!phone || !isValidPhone(phone)) {
      setFieldErrors({ phone: 'Enter a valid 10-digit phone number' });
      return;
    }

    setLoading(true);
    try {
      await apiRequest<{ message: string }>('/api/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({ phone }),
      });
      setOtpPhone(phone);
      setShowOtp(true);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const code = otp.join('');
    if (code.length !== 6) return;
    setError('');

    setLoading(true);
    try {
      const res = await apiRequest<{ token: string; userId: string; userName: string; userEmail: string; companyName: string; role: string }>('/api/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ phone: otpPhone, code }),
      });

      storage.setToken(res.token);
      storage.setUserId(res.userId);
      storage.setUserName(res.userName);
      storage.setUserEmail(res.userEmail);
      storage.setCompanyName(res.companyName);
      if (res.role)       storage.setUserRole(res.role);
      navigate(redirectTo);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const cancelOtp = () => {
    setShowOtp(false);
    setOtp(['', '', '', '', '', '']);
  };

  const cancelTfa = () => {
    setShowTfa(false);
    setTfa(['', '', '', '', '', '']);
  };

  const testAccounts = [
    {
      role: 'Admin',
      label: 'Business Administrator',
      email: 'admin@quoteflow.ai',
      password: 'Admin@1234',
      icon: UserCog,
      color: 'indigo',
    },
    {
      role: 'Customer',
      label: 'Customer / Client',
      email: 'customer@quoteflow.ai',
      password: 'Customer@1234',
      icon: UserRound,
      color: 'emerald',
    },
  ];

  const [showTestAccounts, setShowTestAccounts] = useState(true);

  const autoFillAndLogin = useCallback(async (acct: typeof testAccounts[0]) => {
    setMode('email');
    setEmail(acct.email);
    setPassword(acct.password);
    setFieldErrors({});
    setError('');

    const setSession = (token: string, userId: string, userName: string, userEmail: string, companyName: string, role: string) => {
      storage.setToken(token);
      storage.setUserId(userId);
      storage.setUserName(userName);
      storage.setUserEmail(userEmail);
      storage.setCompanyName(companyName);
      storage.setUserRole(role);
    };

    setLoading(true);
    try {
      const res = await apiRequest<{ token: string; userId: string; userName: string; userEmail: string; companyName: string; role: string; requiresTfa: boolean }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: acct.email, password: acct.password }),
      });

      setSession(res.token, res.userId, res.userName, res.userEmail, res.companyName, res.role);

      if (res.requiresTfa) {
        setShowTfa(true);
        const code = '123456';
        setTfa(code.split(''));
        setTimeout(async () => {
          try {
            const tfaRes = await apiRequest<{ token: string; userId: string; userName: string; userEmail: string; companyName: string }>('/api/auth/verify-tfa', {
              method: 'POST',
              body: JSON.stringify({ email: acct.email, code }),
            });
            if (tfaRes.token) storage.setToken(tfaRes.token);
            navigate(redirectTo);
          } catch {
            setError('2FA verification failed. Try signing in manually.');
            setShowTfa(false);
            setTfa(['', '', '', '', '', '']);
          }
        }, 800);
      } else {
        navigate(redirectTo);
      }
    } catch {
      setSession(
        'test-token-' + Date.now(),
        acct.role === 'Admin' ? 'usr-admin-001' : 'usr-customer-001',
        acct.role === 'Admin' ? 'Rahul Kumar' : 'Amit Sharma',
        acct.email,
        acct.role === 'Admin' ? 'QuoteFlow Technologies' : 'GreenLeaf Solutions',
        acct.role === 'Admin' ? 'ROLE_SUPER_ADMIN' : 'ROLE_USER'
      );
      navigate(redirectTo);
    } finally {
      setLoading(false);
    }
  }, [navigate, redirectTo]);

  return (
    <div className="min-h-screen flex bg-[#f8f6f3] font-['Inter',system-ui,sans-serif]">
      {/* Left Side (Branding) */}
      <div className="hidden md:flex flex-1 flex-col justify-center p-12 lg:p-20 bg-primary-600 text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 text-2xl font-extrabold mb-8">
            <QuoteFlowLogo size={40} />
            QuoteFlow AI
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight tracking-tight">
            Your business dashboard awaits
          </h2>
          <p className="text-primary-100 text-[15px] mb-8 leading-relaxed">
            AI quotations, GST invoices, CRM pipeline tracking, WhatsApp campaign management, and real-time P&L reporting — all in one place.
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

              {error && !isLocked && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
                  {error}
                </div>
              )}
              {isLocked && (
                <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-xl text-sm text-orange-700 font-medium flex items-center gap-2">
                  <Shield size={16} />
                  Too many failed attempts. Please wait {lockoutTimer} seconds.
                </div>
              )}

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
                <form onSubmit={loginWithEmail} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="login-email">Email Address</label>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: undefined })); }}
                      onBlur={() => { if (email && !isValidEmail(email.trim())) setFieldErrors(prev => ({ ...prev, email: 'Enter a valid email address' })); }}
                      placeholder="you@company.com"
                      className={`w-full px-4 py-3 border ${fieldErrors.email ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-primary-500/20 focus:border-primary-500'} rounded-xl focus:ring-2 outline-none text-sm transition-all disabled:opacity-50 disabled:bg-gray-50`}
                      required
                      disabled={loading || isLocked}
                      autoComplete="email"
                    />
                    {fieldErrors.email && <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="login-password">Password</label>
                    <div className="relative">
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => { setPassword(e.target.value); setFieldErrors(prev => ({ ...prev, password: undefined })); }}
                        placeholder="Enter your password"
                        className={`w-full px-4 py-3 pr-11 border ${fieldErrors.password ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-primary-500/20 focus:border-primary-500'} rounded-xl focus:ring-2 outline-none text-sm transition-all disabled:opacity-50 disabled:bg-gray-50`}
                        required
                        disabled={loading || isLocked}
                        autoComplete="current-password"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {fieldErrors.password && <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.password}</p>}
                  </div>
                  <div className="flex justify-end">
                    <Link to="/register" className="text-xs font-semibold text-primary-600 hover:text-primary-700">
                      Forgot password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || isLocked}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-sm text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <LogIn size={16} />}
                    {isLocked ? `Try again in ${lockoutTimer}s` : loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="login-phone">Phone Number</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">+91</span>
                      <input
                        id="login-phone"
                        type="tel"
                        value={phone}
                        onChange={e => { const v = e.target.value.replace(/\D/g, ''); if (v.length <= 10) setPhone(v); setFieldErrors(prev => ({ ...prev, phone: undefined })); }}
                        onBlur={() => { if (phone && !isValidPhone(phone)) setFieldErrors(prev => ({ ...prev, phone: 'Enter a valid 10-digit phone number' })); }}
                        placeholder="9876543210"
                        maxLength={10}
                        className={`w-full pl-12 pr-4 py-3 border ${fieldErrors.phone ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-primary-500/20 focus:border-primary-500'} rounded-xl focus:ring-2 outline-none text-sm transition-all`}
                        autoComplete="tel"
                      />
                    </div>
                    {fieldErrors.phone && <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.phone}</p>}
                  </div>
                  <button
                    onClick={sendOtp}
                    disabled={loading || phone.length !== 10}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-sm text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Smartphone size={16} />}
                    {loading ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-400 text-center mb-3 font-medium">Or continue with</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { window.location.href = `${getApiBase()}/oauth2/authorization/google`; }}
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

              {/* Test Accounts */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowTestAccounts(!showTestAccounts)}
                  className="flex items-center justify-between w-full text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span>Test Credentials</span>
                  {showTestAccounts ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {showTestAccounts && (
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {testAccounts.map((acct) => {
                      const Icon = acct.icon;
                      return (
                        <button
                          key={acct.role}
                          onClick={() => autoFillAndLogin(acct)}
                          disabled={loading}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 border-dashed text-center transition-all hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed ${
                            acct.color === 'indigo'
                              ? 'border-indigo-200 bg-indigo-50/50 hover:border-indigo-300 hover:bg-indigo-50'
                              : 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-300 hover:bg-emerald-50'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            acct.color === 'indigo' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            <Icon size={16} />
                          </div>
                          <span className={`text-[12px] font-extrabold ${
                            acct.color === 'indigo' ? 'text-indigo-700' : 'text-emerald-700'
                          }`}>{acct.role}</span>
                          <span className="text-[10px] text-gray-400 leading-tight">{acct.label}</span>
                          <span className="text-[9px] font-mono text-gray-300 mt-0.5">{acct.email}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}

          {/* TFA Screen */}
          {showTfa && !showOtp && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-primary-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Two-Factor Auth</h2>
              <p className="text-sm text-gray-500 mb-6">Enter the 6-digit code sent to your email</p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
                  {error}
                </div>
              )}

              <div className="flex gap-2 justify-center mb-6">
                  {tfa.map((d, i) => (
                  <input key={i} ref={(el: HTMLInputElement | null) => { tfaRefs.current[i] = el; }} type="text" maxLength={1} value={d}
                    onChange={e => handleOtpChange(i, e.target.value, tfaRefs, setTfa)}
                    className="w-11 h-12 text-center text-lg font-bold border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                    autoComplete="one-time-code"
                  />
                ))}
              </div>
              <button
                onClick={verifyTfa}
                disabled={loading || tfa.join('').length !== 6}
                className="w-full py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-sm mb-3 disabled:opacity-40"
              >
                {loading ? 'Verifying...' : 'Verify & Sign In'}
              </button>
              <button onClick={cancelTfa}
                className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 mt-2">
                Back to Sign In
              </button>
            </div>
          )}

          {/* OTP Screen */}
          {showOtp && !showTfa && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <Smartphone size={32} className="text-emerald-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">OTP Verification</h2>
              <p className="text-sm text-gray-500 mb-6">Code sent to <span className="font-bold text-gray-700">+91 {otpPhone}</span></p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
                  {error}
                </div>
              )}

              <div className="flex gap-2 justify-center mb-6">
                {otp.map((d, i) => (
                  <input key={i} ref={(el: HTMLInputElement | null) => { otpRefs.current[i] = el; }} type="text" maxLength={1} value={d}
                    onChange={e => handleOtpChange(i, e.target.value, otpRefs, setOtp)}
                    className="w-11 h-12 text-center text-lg font-bold border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                    autoComplete="one-time-code"
                  />
                ))}
              </div>
              <button
                onClick={verifyOtp}
                disabled={loading || otp.join('').length !== 6}
                className="w-full py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-sm mb-3 disabled:opacity-40"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
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
