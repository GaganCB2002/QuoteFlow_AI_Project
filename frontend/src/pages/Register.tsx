import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft, Eye, EyeOff, Zap, Smartphone, BarChart3, CloudOff } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('ROLE_COMPANY_ADMIN');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !password) return;
    if (phone.length !== 10) return;
    if (password.length < 6) return;
    if (password !== confirm) return;
    const users = JSON.parse(localStorage.getItem('qf_users') || '[]');
    if (users.some((u: any) => u.phone === phone || u.email === email)) return;
    users.push({ name, phone, email, password, role });
    localStorage.setItem('qf_users', JSON.stringify(users));
    navigate('/login');
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
            Start growing your business today
          </h2>
          <p className="text-primary-100 text-[15px] mb-8 leading-relaxed">
            Join thousands of businesses streamlining their quotations, CRM, and finance with QuoteFlow AI.
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
        <div className="w-full max-w-[440px]">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors mb-6 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to QuoteFlow
          </Link>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Create your account</h2>
          <p className="text-sm text-gray-500 mb-7">Free forever. No credit card needed.</p>

          <form onSubmit={handleRegister} className="space-y-4.5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 transition-all placeholder-gray-400" placeholder="Your full name" required />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 transition-all placeholder-gray-400" placeholder="9876543210" required />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 transition-all placeholder-gray-400" placeholder="you@company.com" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 transition-all placeholder-gray-400 pr-10" placeholder="Min. 6 chars" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input type={showConfirm ? 'text' : 'password'} value={confirm} onChange={(e) => setConfirm(e.target.value)} minLength={6} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 transition-all placeholder-gray-400 pr-10" placeholder="Re-enter password" required />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Business Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 transition-all">
                <option value="ROLE_COMPANY_ADMIN">Business Owner / Admin</option>
                <option value="ROLE_SALES_EXECUTIVE">Sales Executive</option>
                <option value="ROLE_ACCOUNTANT">Accountant</option>
              </select>
            </div>

            <p className="text-[11px] text-gray-500 font-medium leading-relaxed mt-2">
              By registering, you agree to our <a href="#" className="text-primary-600 hover:text-primary-700 font-bold">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-700 font-bold">Privacy Policy</a>.
            </p>

            <button type="submit" className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-white font-bold bg-primary-600 hover:bg-primary-700 shadow-sm transition-all text-sm hover:-translate-y-0.5 mt-4">
              <UserPlus className="mr-2 w-5 h-5" />
              Create Free Account
            </button>
          </form>

          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[13px] font-medium text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm bg-white hover:border-primary-600 hover:text-primary-600 transition-all" onClick={() => { window.location.href = 'http://localhost:8081/oauth2/authorization/google'; }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Sign up with Google
          </button>

          <div className="mt-8 text-center text-sm text-gray-500 font-medium">
            Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-700 font-bold">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
