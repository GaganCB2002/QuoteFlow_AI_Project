import React, { useState } from 'react';
import { LogIn, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phone, setPhone] = useState('1234567890');
  const [password, setPassword] = useState('password123');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement actual auth
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative overflow-hidden">
      
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg mb-4">
            <span className="text-2xl font-bold text-white">QF</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">QuoteFlow AI</h2>
          <p className="text-indigo-200 mt-2">Sign in to your smart workspace</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-indigo-100 mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="+91 9876543210"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-100 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-indigo-200 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-white/20 bg-black/20 text-purple-500 focus:ring-purple-500" />
              Remember me
            </label>
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="group w-full flex justify-center items-center py-3 px-4 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg transform transition-all hover:-translate-y-0.5"
          >
            Sign In
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-indigo-200">
          Don't have an account? <a href="#" className="font-semibold text-purple-400 hover:text-purple-300">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
