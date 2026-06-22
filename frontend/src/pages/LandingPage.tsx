import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TechStackSection from '../components/TechStackSection';
import {
  Star, Menu, X, BarChart3, Users, FileText, Bell,
  TrendingUp, Target, ShoppingBag, CreditCard, Receipt,
  Smartphone, Shield, Sparkles, Circle,
  LayoutDashboard, ArrowRight, Check, MessageCircle, Lock,
  Calendar, CalendarDays, IndianRupee, Clock, Gift, Zap
} from 'lucide-react';

const featuresData = [
  { icon: FileText, color: 'bg-indigo-100 text-indigo-600', title: 'AI Estimation Engine', desc: 'Describe your project in plain English or use the step-by-step wizard. AI analyzes requirements and generates accurate cost estimates instantly.' },
  { icon: FileText, color: 'bg-red-50 text-red-500', title: 'Quotations', desc: 'Create, manage, and track professional quotations. AI-powered suggestions, status tracking, and one-click client sharing via WhatsApp.' },
  { icon: ShoppingBag, color: 'bg-emerald-50 text-emerald-600', title: 'Products & Services', desc: 'Manage your complete product and service catalog with pricing, GST, HSN/SAC codes, stock tracking, and active/inactive status control.' },
  { icon: CreditCard, color: 'bg-indigo-100 text-indigo-600', title: 'GST Invoicing', desc: 'Generate GST, tax, and proforma invoices with auto-calculated CGST/SGST/IGST. Track paid, partial, unpaid, and overdue invoices easily.' },
  { icon: Receipt, color: 'bg-emerald-50 text-emerald-600', title: 'Receipts & Payments', desc: 'Record and track all payment receipts with multiple modes — bank transfer, UPI, cheque, cash. Payment reconciliation made simple.' },
  { icon: Users, color: 'bg-amber-50 text-amber-600', title: 'Customer Management', desc: 'Complete customer profiles with contact details, GST info, credit scores, spending history, and total lifetime value at a glance.' },
  { icon: LayoutDashboard, color: 'bg-indigo-100 text-indigo-600', title: 'Sierra CRM', desc: 'Full CRM with lead tracking, Kanban deal pipeline, credit scoring, auto-follow-ups, and call logging. Never miss a business opportunity.' },
  { icon: MessageCircle, color: 'bg-red-50 text-red-500', title: 'Marketing Campaigns', desc: 'WhatsApp bulk messaging, email campaigns, SMS blasts, and festival automation. Track open rates, delivery, and campaign conversions.' },
  { icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600', title: 'Finance & Analytics', desc: 'Comprehensive financial dashboard with income tracking, expense management, P&L reports, GST reconciliation, and real-time cash flow insights.' },
  { icon: FileText, color: 'bg-indigo-100 text-indigo-600', title: 'Document Management', desc: 'All your business documents in one place — quotations, invoices, receipts, and uploads organized by category with preview and download.' },
  { icon: Bell, color: 'bg-amber-50 text-amber-600', title: 'Notifications & Alerts', desc: 'Real-time notifications for payment received, invoice overdue, new leads, deal wins, and campaign completions. Always stay informed.' },
  { icon: Users, color: 'bg-red-50 text-red-500', title: 'Visitor Tracking', desc: 'Track website visitors in real-time, capture leads with contact forms, and monitor conversion rates. Know exactly how visitors find you.' },
];

const techData = [
  { icon: Monitor, color: 'bg-indigo-100 text-indigo-600', title: 'Spring Boot 4.0.6', desc: 'Latest Spring Framework 7.x with auto-configuration and Actuator' },
  { icon: Layers, color: 'bg-red-50 text-red-500', title: 'Java 21', desc: 'Records, pattern matching, virtual threads, and modern features' },
  { icon: Database, color: 'bg-emerald-50 text-emerald-600', title: 'PostgreSQL 16', desc: 'ACID compliance, JSONB, full-text search for data integrity' },
  { icon: Server, color: 'bg-amber-50 text-amber-600', title: 'Redis 7', desc: 'In-memory caching, session management, rate limiting' },
  { icon: Star, color: 'bg-indigo-100 text-indigo-600', title: 'OpenAI + Gemini', desc: 'Dual AI for quotations, profit optimization, and proposals' },
  { icon: Shield, color: 'bg-indigo-100 text-indigo-600', title: 'JWT Security', desc: 'Stateless auth, role-based access, token refresh' },
  { icon: Database, color: 'bg-emerald-50 text-emerald-600', title: 'Flyway Migrations', desc: 'Version-controlled DB schema, rollback, seed data' },
  { icon: Smartphone, color: 'bg-red-50 text-red-500', title: 'Flutter Mobile', desc: 'iOS and Android apps with full feature parity' },
];

const pricingPlans = [
  {
    name: 'Starter', price: '₹0', period: '/month', desc: 'Good for trying the platform', featured: false,
    features: [
      { text: '100 quotations/month', included: true },
      { text: 'Basic invoices', included: true },
      { text: 'WhatsApp sharing', included: true },
      { text: 'PDF generation', included: true },
      { text: 'AI quotation generator', included: false },
      { text: 'Marketing campaigns', included: false },
    ]
  },
  {
    name: 'Professional', price: '₹499', period: '/month', desc: 'For serious business owners', featured: true, badge: 'Most Popular',
    features: [
      { text: 'Unlimited quotations', included: true },
      { text: 'GST / Tax / Proforma invoices', included: true },
      { text: 'AI quotation generator', included: true },
      { text: 'AI profit optimizer', included: true },
      { text: 'Voice quotations', included: true },
      { text: 'CRM & follow-ups', included: true },
      { text: 'Customer credit score', included: true },
      { text: 'Marketing campaigns', included: false },
    ]
  },
  {
    name: 'Business', price: '₹999', period: '/month', desc: 'For teams and agencies', featured: false,
    features: [
      { text: 'Everything in Professional', included: true },
      { text: 'Up to 10 users', included: true },
      { text: 'WhatsApp campaigns', included: true },
      { text: 'Email & SMS campaigns', included: true },
      { text: 'Festival automation', included: true },
      { text: 'API access', included: true },
      { text: 'Priority support', included: true },
    ]
  },
  {
    name: 'Enterprise', price: '₹4,999', period: '/month', desc: 'For large organizations', featured: false,
    features: [
      { text: 'Everything in Business', included: true },
      { text: 'Unlimited users', included: true },
      { text: 'Franchise management', included: true },
      { text: 'White label', included: true },
      { text: 'Dedicated manager', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'SLA guarantee', included: true },
    ]
  },
];

const testimonials = [
  { initials: 'RK', name: 'Rahul Kumar', role: 'Digital Agency Owner, Mumbai', text: '"QuoteFlow AI has completely transformed how we create quotations. The AI generator saves us hours every week, and WhatsApp sharing is a game-changer for our clients."' },
  { initials: 'PS', name: 'Priya Sharma', role: 'Freelance Developer, Bangalore', text: '"The profit optimizer alone is worth the subscription. I can see exactly what to charge and how much discount I can offer without losing money."' },
  { initials: 'AV', name: 'Amit Verma', role: 'Accountant, Delhi', text: '"We manage 200+ customers and hundreds of invoices. QuoteFlow made our billing process 10x faster. GST compliance is perfect and support is incredibly responsive."' },
];

function Monitor(props: any) { return (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>); }
function Layers(props: any) { return (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>); }
function Database(props: any) { return (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>); }
function Server(props: any) { return (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>); }

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [generating, setGenerating] = useState(false);
  const [demoTab, setDemoTab] = useState<'ai' | 'wizard'>('ai');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const simulateAIAnalysis = () => {
    if (!aiInput.trim()) return;
    setGenerating(true);
    setAiResult('');
    setTimeout(() => {
      const items = [
        { name: 'Website Design', desc: 'Responsive, 5 pages', rate: 25000 },
        { name: 'Web Development', desc: 'Frontend + Backend', rate: 35000 },
        { name: 'SEO Package', desc: 'On-page + Off-page', rate: 15000 },
        { name: 'Hosting (Annual)', desc: 'Shared + SSL', rate: 5000 },
      ];
      const sub = items.reduce((s, i) => s + i.rate, 0);
      const tax = Math.round(sub * 0.18);
      const total = Math.round(sub + tax);
      let html = '<div class="mb-2.5 font-bold text-gray-900">Generated Quotation</div>';
      items.forEach(i => {
        html += `<div class="flex justify-between py-1.5 border-b border-gray-100 text-sm text-gray-600"><span>${i.name} <span class="opacity-50">(${i.desc})</span></span><span class="font-semibold text-gray-800">₹${i.rate.toLocaleString()}</span></div>`;
      });
      html += `<div class="flex justify-between py-1.5 border-b border-gray-100 text-sm opacity-50"><span>Subtotal</span><span>₹${sub.toLocaleString()}</span></div>`;
      html += `<div class="flex justify-between py-1.5 border-b border-gray-100 text-sm opacity-50"><span>GST @ 18%</span><span>₹${tax.toLocaleString()}</span></div>`;
      html += `<div class="flex justify-between pt-2 font-bold text-base text-indigo-600"><span>Grand Total</span><span>₹${total.toLocaleString()}</span></div>`;
      html += '<div class="mt-2.5 flex gap-2 flex-wrap"><span class="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded text-xs font-semibold">AI Confidence: 94%</span><span class="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded text-xs font-semibold">Timeline: 4 weeks</span></div>';
      setAiResult(html);
      setGenerating(false);
    }, 1200);
  };

  const genWizard = (type: string) => {
    const data: Record<string, { items: { name: string; desc: string; rate: number }[] }> = {
      website: { items: [{ name: 'Website Design', desc: '5 pages responsive', rate: 25000 }, { name: 'Web Development', desc: 'Frontend + Backend + CMS', rate: 35000 }, { name: 'SEO Package', desc: 'On-page + Off-page', rate: 15000 }, { name: 'Domain + Hosting', desc: '1 year + SSL', rate: 5000 }] },
      mobile: { items: [{ name: 'App Design', desc: 'UI/UX iOS + Android', rate: 40000 }, { name: 'App Development', desc: 'Cross-platform Flutter', rate: 80000 }, { name: 'Backend API', desc: 'REST + Database', rate: 35000 }, { name: 'App Store Publishing', desc: 'Play + App Store', rate: 10000 }] },
      seo: { items: [{ name: 'SEO Audit', desc: 'Full website + competitors', rate: 10000 }, { name: 'On-Page SEO', desc: 'Meta, content, structure', rate: 15000 }, { name: 'Off-Page SEO', desc: 'Links, guest posts', rate: 15000 }, { name: 'Monthly Reports', desc: 'Rankings, traffic', rate: 5000 }] },
    };
    const d = data[type] || data.website;
    const sub = d.items.reduce((s, i) => s + i.rate, 0);
    const tax = Math.round(sub * 0.18);
    const total = Math.round(sub + tax);
    let html = `<div class="mb-2.5 font-bold text-gray-900">${type.charAt(0).toUpperCase() + type.slice(1)} Quotation</div>`;
    d.items.forEach(i => {
      html += `<div class="flex justify-between py-1.5 border-b border-gray-100 text-sm text-gray-600"><span>${i.name} <span class="opacity-50">(${i.desc})</span></span><span class="font-semibold text-gray-800">₹${i.rate.toLocaleString()}</span></div>`;
    });
    html += `<div class="flex justify-between py-1.5 border-b border-gray-100 text-sm opacity-50"><span>Subtotal</span><span>₹${sub.toLocaleString()}</span></div>`;
    html += `<div class="flex justify-between py-1.5 border-b border-gray-100 text-sm opacity-50"><span>GST @ 18%</span><span>₹${tax.toLocaleString()}</span></div>`;
    html += `<div class="flex justify-between pt-2 font-bold text-base text-indigo-600"><span>Grand Total</span><span>₹${total.toLocaleString()}</span></div>`;
    html += `<div class="mt-2.5 flex gap-2 flex-wrap"><span class="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded text-xs font-semibold">AI Confidence: 96%</span><span class="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded text-xs font-semibold">Timeline: ${type === 'mobile' ? '8' : '4'} weeks</span></div>`;
    setAiResult(html);
    setGenerating(false);
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] text-[#3d3d4a] font-['Inter',system-ui,sans-serif] overflow-x-hidden">
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes blob { 0%,100% { transform:translate(0,0) scale(1) } 25% { transform:translate(20px,-30px) scale(1.05) } 50% { transform:translate(-20px,20px) scale(0.95) } 75% { transform:translate(30px,10px) scale(1.02) } }
        .animate-fade-in-up { animation:fadeInUp 0.5s ease forwards }
        .animate-fade-in-up-d1 { animation:fadeInUp 0.5s ease 0.1s forwards; opacity:0 }
        .animate-fade-in-up-d2 { animation:fadeInUp 0.5s ease 0.2s forwards; opacity:0 }
        .animate-fade-in-up-d3 { animation:fadeInUp 0.5s ease 0.3s forwards; opacity:0 }
        .animate-fade-in-up-d4 { animation:fadeInUp 0.5s ease 0.4s forwards; opacity:0 }
        .animate-fade-in { animation:fadeIn 0.5s ease forwards }
        .animate-blob { animation:blob 7s infinite }
        .animation-delay-2000 { animation-delay:2s }
        .animation-delay-4000 { animation-delay:4s }
        .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none }
        .scrollbar-hide::-webkit-scrollbar { display:none }
      `}</style>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transition-all duration-200 ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-[1120px] mx-auto px-5 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 text-xl font-bold text-gray-900">
            <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-base font-extrabold">Q</span>
            QuoteFlow
          </Link>
          <button className="md:hidden flex flex-col gap-1 cursor-pointer bg-none border-none p-1.5 rounded hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={20} className="text-gray-500" /> : <Menu size={20} className="text-gray-500" />}
          </button>
          <ul className={`${menuOpen ? 'flex' : 'hidden'} md:flex absolute md:static top-16 left-0 right-0 bg-white md:bg-transparent flex-col md:flex-row items-center gap-0.5 p-3 md:p-0 border-b md:border-b-0 border-gray-200 md:border-none shadow-md md:shadow-none list-none`}>
            {[
              { label: 'Features', href: '#features' },
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Try Demo', href: '#demo' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Reviews', href: '#testimonials' },
            ].map(link => (
              <li key={link.href} className="w-full md:w-auto">
                <a href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href.slice(1)); }} className="block px-3.5 py-2 text-sm font-medium text-gray-500 rounded hover:text-gray-900 hover:bg-gray-100 md:inline transition-all">{link.label}</a>
              </li>
            ))}
            <li className="flex items-center gap-1.5 ml-0 md:ml-2 mt-2 md:mt-0 w-full md:w-auto">
              <button onClick={() => navigate('/login')} className="flex-1 md:flex-none text-center px-3.5 py-1.5 text-sm font-medium text-gray-500 rounded hover:text-gray-900 hover:bg-gray-100 transition-all">Sign In</button>
              <button onClick={() => navigate('/login')} className="flex-1 md:flex-none text-center px-3.5 py-1.5 text-sm font-bold text-white rounded bg-gradient-to-r from-red-500 to-red-600 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">Free Trial</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Banner */}
      <div className="bg-indigo-600 py-2 text-center relative z-40 mt-16">
        <div className="max-w-[1120px] mx-auto px-5">
          <p className="text-white/85 text-xs sm:text-sm font-medium flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            <strong className="text-white">QuoteFlow AI v2.0</strong> &mdash; Trusted by 12,000+ Indian businesses.
            <span className="inline-flex items-center gap-1.5 bg-white/15 px-2.5 py-0.5 rounded-full text-xs">
              <Circle size={10} className="fill-current" /> <strong>0</strong> visitors today
            </span>
          </p>
        </div>
      </div>

      {/* Hero */}
      <section className="py-[100px] md:py-[100px] md:pb-16 relative z-10">
        <div className="max-w-[1120px] mx-auto px-5 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 rounded text-xs font-semibold text-indigo-600 mb-4">
              🏆 India's #1 AI Business Platform
            </div>
            <h1 className="text-[clamp(28px,3.8vw,44px)] font-extrabold leading-[1.15] tracking-tight text-gray-900 mb-3.5">
              Replace 5 Tools With<br /><span className="text-red-500">One AI Platform</span>
            </h1>
            <p className="text-base text-gray-500 leading-relaxed mb-6 max-w-[500px]">
              Stop jumping between Excel, billing software, CRM, WhatsApp, and project estimators. QuoteFlow brings everything into one dashboard. Create quotations in 30 seconds, send invoices, track leads, and grow your business.
            </p>
            <div className="flex gap-2.5 flex-wrap">
              <button onClick={() => navigate('/login')} className="inline-flex items-center justify-center gap-2 px-[30px] py-3.5 bg-indigo-600 text-white font-semibold text-sm rounded-lg hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                Start Free &mdash; No Card Needed
              </button>
              <a href="#demo" onClick={(e) => { e.preventDefault(); scrollTo('demo'); }} className="inline-flex items-center justify-center gap-2 px-[30px] py-3.5 bg-white text-gray-900 font-semibold text-sm rounded-lg border-2 border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all">Watch Live Demo</a>
            </div>
            <div className="flex gap-6 sm:gap-9 mt-8 pt-5 border-t border-gray-200">
              {[
                { value: '30s', label: 'AI quotations' },
                { value: '5 in 1', label: 'Platform' },
                { value: '₹0', label: 'Free plan' },
                { value: '12K+', label: 'Users' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">{s.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-fade-in-up-d2">
            <div className="bg-white rounded-2xl shadow-xl p-7 border border-gray-200">
              <div className="flex items-center justify-between mb-4 pb-3.5 border-b border-gray-100">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400">AI-Generated Quotation</h4>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">AI Generated</span>
              </div>
              {[
                { dot: 'bg-emerald-500', name: 'Website Design (5 Pages)', desc: 'Responsive, mobile-friendly', price: '₹25,000' },
                { dot: 'bg-amber-500', name: 'SEO Package (3 Months)', desc: 'On-page + Off-page', price: '₹15,000' },
                { dot: 'bg-indigo-600', name: 'Web Hosting (1 Year)', desc: 'Shared hosting + SSL', price: '₹5,000' },
              ].map((row, i) => (
                <div key={i} className={`flex items-center gap-2.5 py-3 ${i < 2 ? 'border-b border-gray-100' : ''}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${row.dot} shrink-0`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 m-0">{row.name}</p>
                    <span className="text-xs text-gray-400">{row.desc}</span>
                  </div>
                  <span className="font-bold text-sm text-gray-900">{row.price}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3.5 mt-2.5 border-t-2 border-gray-200 font-bold text-base text-indigo-600">
                <span>Total Amount</span>
                <span>₹53,100</span>
              </div>
            </div>
            <div className="hidden md:flex absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-md border border-gray-200 items-center gap-2.5">
              <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                <BarChart3 size={18} />
              </div>
              <div>
                <strong className="text-sm text-gray-900">Profit Margin: 32%</strong>
                <p className="text-xs text-gray-400 m-0">AI-optimized pricing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain/Solution */}
      <section className="py-[72px] md:py-[72px] relative z-10" id="pain-solution">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 rounded text-xs font-semibold text-indigo-600 mb-3.5">The Problem</div>
            <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-tight text-gray-900">Running a business shouldn't mean<br />juggling <span className="text-red-500">5 different tools</span></h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-[540px] mx-auto mt-2.5 leading-relaxed">QuoteFlow replaces your entire software stack with one unified platform. One login, one dashboard, no more context switching.</p>
          </div>
          <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-gray-200 animate-fade-in">
            <div className="bg-white p-8 sm:p-10">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2.5 text-gray-900">✗ Without QuoteFlow</h3>
              {[
                { strong: 'Excel for quotations', text: 'Manual entries, formatting issues, clients get wrong versions' },
                { strong: 'Separate billing software', text: 'Expensive, complex setup, not GST-ready' },
                { strong: 'CRM nobody uses', text: 'Complicated, needs training, doesn\'t talk to billing' },
                { strong: 'Manual WhatsApp sharing', text: 'Download, open app, find contact, attach, send — 5 minutes each' },
                { strong: 'Guessing project costs', text: 'No pricing data, underquoting by 30-50%, losing money' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-none">
                  <span className="w-6 h-6 rounded flex items-center justify-center shrink-0 text-sm font-bold bg-red-50 text-red-500 mt-0.5">✗</span>
                  <span className="text-sm text-gray-500 leading-relaxed"><strong className="text-gray-900">{item.strong}</strong> — {item.text}</span>
                </div>
              ))}
            </div>
            <div className="bg-indigo-50 p-8 sm:p-10">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2.5 text-gray-900">✓ With QuoteFlow AI</h3>
              {[
                { strong: 'AI generates quotations in 30s', text: 'Describe once, AI creates scope, pricing, timeline' },
                { strong: 'Built-in GST billing', text: 'Auto CGST/SGST/IGST, tax invoices, proforma, payment tracking' },
                { strong: 'CRM that works', text: 'Lead pipeline, auto-follow-ups, credit scoring, zero setup' },
                { strong: 'One-click WhatsApp share', text: 'Quote done, click WhatsApp, delivered. Client replies there' },
                { strong: 'AI profit optimizer', text: 'Enter cost, AI tells optimal price, margin, max discount' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-indigo-100 last:border-none">
                  <span className="w-6 h-6 rounded flex items-center justify-center shrink-0 text-sm font-bold bg-emerald-50 text-emerald-600 mt-0.5">✓</span>
                  <span className="text-sm text-gray-500 leading-relaxed"><strong className="text-gray-900">{item.strong}</strong> — {item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-[72px] md:py-[72px] relative z-10 bg-[#f0ede8]" id="how-it-works">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 rounded text-xs font-semibold text-indigo-600 mb-3.5">Simple Workflow</div>
            <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-tight text-gray-900">Three steps from <span className="text-red-500">description to payment</span></h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-[540px] mx-auto mt-2.5 leading-relaxed">No training required. Works exactly how you'd expect.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-[360px] md:max-w-none mx-auto">
            {[
              { num: '1', title: 'Describe what you offer', desc: 'Type naturally like "Website for a school with 5 pages and SEO" or use the wizard to pick project type and options.' },
              { num: '2', title: 'AI generates everything', desc: 'AI creates a complete quotation with itemized pricing, scope, timeline, and profit analysis. Review and adjust in seconds.' },
              { num: '3', title: 'Send and get paid', desc: 'Share via WhatsApp in one click. Customer signs digitally. Pay via UPI QR. Everything tracked in your dashboard.' },
            ].map((step, i) => (
              <div key={i} className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all hover:shadow-md hover:border-indigo-600 ${i === 0 ? 'animate-fade-in-up' : i === 1 ? 'animate-fade-in-up-d1' : 'animate-fade-in-up-d2'}`}>
                <span className="inline-flex w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 items-center justify-center text-base font-extrabold mb-3.5">{step.num}</span>
                <h3 className="text-base font-bold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Features */}
      <section className="py-[72px] md:py-[72px] relative z-10" id="features">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 rounded text-xs font-semibold text-indigo-600 mb-3.5">What You Get</div>
            <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-tight text-gray-900">Everything your business needs<br /><span className="text-red-500">in one dashboard</span></h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-[540px] mx-auto mt-2.5 leading-relaxed">12 modules working together. No integrations to set up. No data to move between tools.</p>
          </div>
          {[
            {
              tag: 'AI-Powered', title: 'AI Quotation Generator', desc: 'Describe your service in plain English. AI generates a complete professional quotation with itemized pricing, scope, deliverables, and timeline. Supports websites, mobile apps, SEO, marketing, AMC, and more.',
              benefits: ['30-second generation from natural language', '10+ project types with pre-built templates', 'Auto-calculated pricing with profit analysis', 'Review, edit, and regenerate as needed'],
              stats: [
                { value: '30s', label: 'Generation time' },
                { value: '10+', label: 'Project types' },
                { value: '94%', label: 'AI accuracy' },
                { value: '35+', label: 'Feature modules' },
              ],
              reverse: false,
            },
            {
              tag: 'Finance', title: 'GST Billing & Invoicing', desc: 'Generate GST-compliant tax invoices, proforma invoices, and payment receipts. Auto-calculated CGST, SGST, and IGST. Track paid, due, and overdue invoices. Send via WhatsApp with one click.',
              benefits: ['Auto GST (CGST + SGST / IGST)', 'Tax invoices, proforma, receipts', 'Invoice status tracking', 'WhatsApp delivery in one click'],
              stats: [
                { value: '100%', label: 'GST compliant' },
                { value: '1-clk', label: 'WhatsApp send' },
                { value: '3', label: 'Invoice types' },
                { value: 'Auto', label: 'Tax calculation' },
              ],
              reverse: true,
            },
            {
              tag: 'Growth', title: 'CRM & Marketing Automation', desc: 'Track leads through a kanban pipeline. Log customer interactions. AI auto-follow-ups. Run WhatsApp campaigns, email newsletters, and festival wishes. All from one place.',
              benefits: ['Kanban pipeline with lead management', 'Customer credit scoring (Green/Yellow/Red)', 'WhatsApp, email, and SMS campaigns', 'Automated festival and birthday wishes'],
              stats: [
                { value: 'Kanban', label: 'Pipeline view' },
                { value: '3', label: 'Campaign channels' },
                { value: 'Auto', label: 'Follow-ups' },
                { value: 'Smart', label: 'Scoring' },
              ],
              reverse: false,
            },
            {
              tag: 'Intelligence', title: 'Analytics & Project Estimation', desc: 'Real-time P&L, GST reconciliation, revenue reports, cash flow. The estimation engine covers 10 project types with 35+ features, pricing tiers, and underquoting detection.',
              benefits: ['P&L, revenue, and cash flow reports', 'Cost estimation with AI optimization', 'Profit margin analysis (20%/30%/50% tiers)', 'Underquoting detection with alerts'],
              stats: [
                { value: 'Real-time', label: 'P&L' },
                { value: '35+', label: 'Costed features' },
                { value: '3', label: 'Profit tiers' },
                { value: 'Auto', label: 'Alerts' },
              ],
              reverse: true,
            },
          ].map((item, idx) => (
            <div key={idx} className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center py-10 ${idx < 3 ? 'border-b border-gray-200' : ''} ${item.reverse ? 'md:direction-rtl' : ''} ${idx === 0 ? 'animate-fade-in-up' : 'animate-fade-in-up-d1'}`} style={item.reverse ? { direction: 'rtl' } : undefined}>
              <div style={item.reverse ? { direction: 'ltr' } : undefined}>
                <span className="inline-block px-2.5 py-0.5 bg-indigo-50 rounded text-xs font-semibold text-indigo-600 mb-2.5">{item.tag}</span>
                <h3 className="text-xl sm:text-2xl font-bold mb-2.5 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3.5">{item.desc}</p>
                <ul className="list-none">
                  {item.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2.5 py-1.5 text-sm text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />{b}</li>
                  ))}
                </ul>
              </div>
              <div style={item.reverse ? { direction: 'ltr' } : undefined} className="bg-[#f0ede8] rounded-2xl p-8 border border-gray-200 min-h-[240px] flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-3">
                  {item.stats.map((s, i) => (
                    <div key={i} className="text-center p-4 bg-white rounded border border-gray-100">
                      <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 leading-tight">{s.value}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Features Grid */}
      <section className="py-[72px] md:py-[72px] relative z-10 bg-[#f0ede8]">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 rounded text-xs font-semibold text-indigo-600 mb-3.5">All Features</div>
            <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-tight text-gray-900">Every tool your business needs<br /><span className="text-red-500">in one place</span></h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-[540px] mx-auto mt-2.5 leading-relaxed">14 integrated modules. No third-party dependencies. One seamless experience.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuresData.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-200 transition-all hover:shadow hover:border-indigo-600 animate-fade-in-up" style={{ animationDelay: `${(i % 6) * 50}ms` }}>
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-3.5 ${f.color}`}>
                  <f.icon size={20} />
                </div>
                <h3 className="text-sm font-bold mb-1.5 text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <section className="py-[72px] md:py-[72px] relative z-10" id="demo">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 rounded text-xs font-semibold text-indigo-600 mb-3.5">Try It Yourself</div>
            <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-tight text-gray-900">See the AI quotation generator<br /><span className="text-red-500">in action</span></h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-[540px] mx-auto mt-2.5 leading-relaxed">Type any service below and watch QuoteFlow AI create a complete professional quotation instantly.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 sm:p-9 border border-gray-200 max-w-[700px] mx-auto animate-fade-in">
            <div className="flex gap-1 mb-5 bg-gray-100 rounded p-1">
              <button onClick={() => setDemoTab('ai')} className={`flex-1 py-2.5 px-4 text-center rounded text-sm font-semibold transition-all ${demoTab === 'ai' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>AI Natural Language</button>
              <button onClick={() => { setDemoTab('wizard'); setAiResult(''); }} className={`flex-1 py-2.5 px-4 text-center rounded text-sm font-semibold transition-all ${demoTab === 'wizard' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>Quick Pick</button>
            </div>
            {demoTab === 'ai' ? (
              <div>
                <p className="text-sm text-gray-400 mb-3">Describe your project in plain English. The AI understands context and pricing.</p>
                <div className="flex gap-2.5 mb-3.5 flex-col sm:flex-row">
                  <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && simulateAIAnalysis()} placeholder='e.g. "Build a website for a school with 5 pages and SEO"' className="flex-1 px-4 py-3 rounded border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-indigo-600 focus:bg-white placeholder-gray-400" />
                  <button onClick={simulateAIAnalysis} disabled={generating} className="px-6 py-3 rounded border-none bg-indigo-600 text-white font-semibold text-sm cursor-pointer hover:bg-indigo-700 transition-all whitespace-nowrap disabled:opacity-50">{generating ? 'Generating...' : 'Generate'}</button>
                </div>
                {(aiResult || generating) && (
                  <div className={`bg-gray-50 rounded p-4 border border-gray-100 text-sm leading-relaxed ${aiResult ? '' : ''}`} dangerouslySetInnerHTML={generating ? undefined : { __html: aiResult }}>
                    {generating && <div className="text-center py-3 opacity-60">Generating...</div>}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-400 mb-3">Select a project type and AI generates a complete quotation.</p>
                <div className="flex gap-2 flex-wrap mb-3.5">
                  {[
                    { label: 'Website', type: 'website' },
                    { label: 'Mobile App', type: 'mobile' },
                    { label: 'SEO Services', type: 'seo' },
                  ].map(b => (
                    <button key={b.type} onClick={() => { setGenerating(true); genWizard(b.type); setDemoTab('wizard'); }} className="px-3.5 py-1.5 text-sm font-semibold text-gray-900 bg-white rounded border-2 border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all">
                      {b.label}
                    </button>
                  ))}
                </div>
                {(aiResult || generating) && (
                  <div className={`bg-gray-50 rounded p-4 border border-gray-100 text-sm leading-relaxed`} dangerouslySetInnerHTML={generating ? undefined : { __html: aiResult }}>
                    {generating && <div className="text-center py-3 opacity-60">Generating...</div>}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Test Credentials */}
      <section className="py-[72px] md:py-[72px] relative z-10 bg-[#f0ede8] border-b border-gray-200">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 rounded text-xs font-semibold text-indigo-600 mb-3.5">Test Login</div>
            <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-tight text-gray-900">Try the full dashboard <span className="text-red-500">right now</span></h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-[540px] mx-auto mt-2.5 leading-relaxed">No registration required. Use these credentials to explore every feature.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 sm:p-9 border border-gray-200 max-w-[640px] mx-auto shadow animate-fade-in">
            <h3 className="text-lg font-bold mb-4.5 flex items-center gap-2.5 text-gray-900">
              <Lock size={20} /> Test Credentials
              <span className="inline-block px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-semibold ml-2">Free Access</span>
            </h3>
            <div className="grid gap-2.5">
              {[
                { label: 'Application URL', value: 'http://localhost:5173', highlight: false },
                { label: 'Login Page', value: '/login', isLink: true },
                { label: 'Dashboard', value: '/dashboard', isLink: true },
                { label: 'Email', value: 'demo@quoteflow.ai', highlight: true },
                { label: 'Password', value: 'demo123', highlight: true },
              ].map((row, i) => (
                <div key={i} className={`flex items-center justify-between px-4 py-3 rounded ${row.highlight ? 'bg-indigo-50' : 'bg-gray-50'}`}>
                  <span className={`text-sm font-medium ${row.highlight ? 'text-indigo-600 font-semibold' : 'text-gray-400'}`}>{row.label}</span>
                  {row.isLink ? (
                    <Link to={row.value} className="text-sm font-semibold text-indigo-600">{row.value}</Link>
                  ) : (
                    <span className={`text-sm font-semibold ${row.highlight ? 'text-indigo-600' : 'text-gray-900'}`}>{row.value}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-2.5">
              <button onClick={() => navigate('/login')} className="flex-1 flex justify-center py-3 px-4 bg-indigo-600 text-white font-semibold text-sm rounded-lg hover:bg-indigo-700 transition-all">Launch Dashboard</button>
              <button onClick={() => navigate('/dashboard')} className="flex-1 flex justify-center py-3 px-4 bg-white text-gray-900 font-semibold text-sm rounded-lg border-2 border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all">Preview Dashboard</button>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-[72px] md:py-[72px] relative z-10">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 rounded text-xs font-semibold text-indigo-600 mb-3.5">Technology</div>
            <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-tight text-gray-900">Built with <span className="text-red-500">modern technology</span></h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-[540px] mx-auto mt-2.5 leading-relaxed">Enterprise-grade stack that scales with your business.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techData.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-200 text-center transition-all hover:shadow hover:border-indigo-600 animate-fade-in-up" style={{ animationDelay: `${(i % 4) * 50}ms` }}>
                <div className={`w-13 h-13 mx-auto mb-3.5 rounded-xl flex items-center justify-center ${t.color}`}>
                  <t.icon size={26} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{t.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <div className="max-w-[1120px] mx-auto px-5 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-white rounded-2xl border border-gray-200 overflow-hidden animate-fade-in">
          {[
            { value: '90+', label: 'Java source files' },
            { value: '13', label: 'JPA entities' },
            { value: '11', label: 'REST controllers' },
            { value: '5/5', label: 'Tests passing' },
          ].map((m, i) => (
            <div key={i} className={`py-7 px-5 text-center ${i > 0 ? 'border-l border-gray-200 max-sm:border-l-0 max-sm:[&:nth-child(2)]:border-l max-sm:[&:nth-child(3)]:border-t max-sm:[&:nth-child(4)]:border-t' : ''}`}>
              <div className="text-2xl sm:text-[28px] font-extrabold text-indigo-600 leading-tight">{m.value}</div>
              <div className="text-sm text-gray-400 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI-Powered Insights */}
      <section className="py-[72px] md:py-[72px] relative z-10 bg-indigo-50">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 rounded text-xs font-semibold text-indigo-600 mb-3 bg-white/60">AI-Powered Insights</div>
            <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-tight text-gray-900">Smart Assessments for Your Business</h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-[540px] mx-auto mt-2.5 leading-relaxed">QuoteFlow AI analyzes your quotations, invoices, and customer data to deliver actionable business insights.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, gradient: 'from-indigo-600 to-blue-500', title: 'Conversion Intelligence', desc: 'AI analyzes your quote-to-close ratio and suggests optimal follow-up times, pricing adjustments, and service bundles to improve win rates.' },
              { icon: Target, gradient: 'from-red-500 to-orange-500', title: 'Profit Health Monitor', desc: 'Real-time margin tracking across projects. AI flags underquoted deals before you send them and recommends optimal pricing tiers.' },
              { icon: Sparkles, gradient: 'from-emerald-600 to-emerald-400', title: 'Lead Scoring Engine', desc: 'AI prioritizes leads by purchase intent, engagement history, and budget fit so your team focuses on the deals most likely to convert.' },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-200 text-center animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-13 h-13 mx-auto mb-4 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow`}>
                  <card.icon size={24} className="text-white" />
                </div>
                <h4 className="text-base font-bold mb-2 text-gray-900">{card.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => navigate('/register')} className="inline-flex items-center justify-center gap-2 px-[30px] py-3.5 bg-indigo-600 text-white font-semibold text-sm rounded-lg hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              Get Your AI Assessment <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Cost Projection Calculator */}
      <section className="py-[72px] md:py-[72px] relative z-10" id="projection">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 rounded text-xs font-semibold text-indigo-600 mb-3.5">Cost Projection</div>
            <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-tight text-gray-900">Month & Year <span className="text-red-500">Cost Projection</span></h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-[540px] mx-auto mt-2.5 leading-relaxed">Estimate your costs and savings with monthly and annual projections. See how much you save by choosing yearly billing.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 sm:p-9 border border-gray-200 max-w-[800px] mx-auto shadow-sm animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Monthly Projection */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl p-6 border border-indigo-100">
                <div className="flex items-center gap-2.5 mb-4">
                  <Calendar size={20} className="text-indigo-600" />
                  <h3 className="text-lg font-bold text-gray-900">Monthly Projection</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-indigo-200/50">
                    <span className="text-sm text-gray-600">Starter Plan</span>
                    <span className="font-bold text-gray-900">₹0</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-indigo-200/50">
                    <span className="text-sm text-gray-600">Professional Plan</span>
                    <span className="font-bold text-indigo-600">₹499</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-indigo-200/50">
                    <span className="text-sm text-gray-600">Business Plan</span>
                    <span className="font-bold text-indigo-600">₹999</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Enterprise Plan</span>
                    <span className="font-bold text-indigo-600">₹4,999</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-indigo-200">
                  <p className="text-xs text-gray-500">* All plans include 7-day free trial</p>
                </div>
              </div>

              {/* Yearly Projection */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-100">
                <div className="flex items-center gap-2.5 mb-4">
                  <CalendarDays size={20} className="text-emerald-600" />
                  <h3 className="text-lg font-bold text-gray-900">Yearly Projection</h3>
                  <span className="px-2 py-0.5 bg-emerald-500 text-white rounded text-[10px] font-bold uppercase tracking-wider ml-auto">Save 20%</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-emerald-200/50">
                    <span className="text-sm text-gray-600">Starter Plan</span>
                    <span className="font-bold text-gray-900">₹0</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-emerald-200/50">
                    <div>
                      <span className="text-sm text-gray-600">Professional Plan</span>
                      <span className="block text-[11px] text-emerald-600 font-medium">₹4,790/yr (was ₹5,988)</span>
                    </div>
                    <span className="font-bold text-emerald-600">₹399/mo</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-emerald-200/50">
                    <div>
                      <span className="text-sm text-gray-600">Business Plan</span>
                      <span className="block text-[11px] text-emerald-600 font-medium">₹9,590/yr (was ₹11,988)</span>
                    </div>
                    <span className="font-bold text-emerald-600">₹799/mo</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <span className="text-sm text-gray-600">Enterprise Plan</span>
                      <span className="block text-[11px] text-emerald-600 font-medium">₹47,990/yr (was ₹59,988)</span>
                    </div>
                    <span className="font-bold text-emerald-600">₹3,999/mo</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-200">
                  <p className="text-xs text-gray-500">* Save up to ₹11,998/year with annual billing</p>
                </div>
              </div>
            </div>

            {/* Savings Summary */}
            <div className="mt-6 bg-indigo-600 rounded-xl p-5 text-white">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                  <IndianRupee size={22} className="text-indigo-200" />
                  <div>
                    <p className="text-sm font-bold">Yearly Savings Estimate</p>
                    <p className="text-xs text-indigo-200">Based on Professional plan with 20% annual discount</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black">₹1,198</p>
                  <p className="text-xs text-indigo-200">saved per year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-[72px] md:py-[72px] relative z-10 bg-[#f0ede8]" id="pricing">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 rounded text-xs font-semibold text-indigo-600 mb-3.5">Pricing</div>
            <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-tight text-gray-900">Fair pricing for <span className="text-red-500">every business</span></h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-[540px] mx-auto mt-2.5 leading-relaxed">Start free. Upgrade as you grow. No hidden fees, no contracts, cancel anytime.</p>
            
            {/* Billing Cycle Toggle */}
            <div className="flex items-center justify-center gap-4.5 mb-2 mt-8">
              <span className={`text-sm font-semibold transition-colors ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>Monthly Billing</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-13 h-7 bg-indigo-600 rounded-full relative transition-colors duration-200 outline-none flex items-center px-1"
                aria-label="Toggle billing cycle"
              >
                <span className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 shadow-sm ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-400'}`}>
                Yearly Billing
                <span className="px-2 py-0.5 bg-emerald-500 text-white rounded text-[10px] font-bold uppercase tracking-wider">Save 20%</span>
              </span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[360px] sm:max-w-none mx-auto">
            {pricingPlans.map((plan, i) => {
              const basePriceStr = plan.price.replace(/[₹,]/g, '');
              const basePrice = parseInt(basePriceStr, 10);
              let displayPrice = plan.price;
              let displayPeriod = plan.period;
              if (billingCycle === 'yearly' && basePrice > 0) {
                const discountedPrice = Math.round(basePrice * 0.8);
                displayPrice = '₹' + discountedPrice.toLocaleString('en-IN');
                displayPeriod = '/month (billed yearly)';
              }
              return (
                <div key={i} className={`bg-white rounded-2xl p-8 border relative transition-all hover:shadow-md hover:border-indigo-600 animate-fade-in-up ${plan.featured ? 'border-indigo-600 shadow-[0_0_0_2px_#4f46e5,0_4px_12px_rgba(0,0,0,0.08)]' : 'border-gray-200'}`} style={{ animationDelay: `${i * 80}ms` }}>
                  {plan.badge ? (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-indigo-600 text-white rounded-full text-xs font-semibold whitespace-nowrap">{plan.badge}</div>
                  ) : (
                    i < 3 && <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">7-day trial</div>
                  )}
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{plan.name}</div>
                  <div className="text-[30px] font-extrabold text-gray-900 leading-tight mb-0.5">{displayPrice}<span className="text-sm font-normal text-gray-400">{displayPeriod}</span></div>
                  <p className="text-sm text-gray-500 mb-4.5">{plan.desc}</p>
                  <ul className="list-none mb-5">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className={`flex items-center gap-2 py-1.5 text-sm border-b border-gray-100 last:border-none ${f.included ? 'text-gray-500' : 'text-gray-400'}`}>
                        {f.included ? <Check size={14} className="text-emerald-600 shrink-0 font-bold" /> : <span className="text-gray-300 shrink-0 text-sm">✗</span>}
                        {f.text}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigate('/register')} className={`w-full flex justify-center py-2.5 px-4 text-sm font-semibold rounded transition-all ${plan.featured ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-indigo-600 hover:text-indigo-600'}`}>
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-[72px] md:py-[72px] relative z-10" id="testimonials">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 rounded text-xs font-semibold text-indigo-600 mb-3.5">Testimonials</div>
            <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-tight text-gray-900">What business owners <span className="text-red-500">are saying</span></h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-[540px] mx-auto mt-2.5 leading-relaxed">Join 12,000+ businesses that have transformed their operations with QuoteFlow AI.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-200 transition-all hover:shadow hover:border-indigo-600 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex gap-0.5 mb-2.5 text-amber-500">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={15} className="fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4.5 italic">{t.text}</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">{t.initials}</div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[72px] md:py-[72px] relative z-10">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="bg-indigo-600 rounded-2xl py-12 px-8 sm:px-10 text-center">
            <h2 className="text-[clamp(22px,2.8vw,32px)] font-extrabold text-white mb-2.5">Stop juggling 5 tools. Start one.</h2>
            <p className="text-sm sm:text-base text-white/75 mb-6 max-w-[460px] mx-auto">Join 12,000+ businesses using QuoteFlow AI. Start free, no credit card required.</p>
            <div className="flex gap-2.5 justify-center flex-wrap">
              <button onClick={() => navigate('/login')} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-indigo-600 font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                Start Free &mdash; No Credit Card
              </button>
              <button onClick={() => scrollTo('demo')} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold text-sm rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/50 transition-all">
                Try Live Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-gray-200 py-12 pb-6">
        <div className="max-w-[1120px] mx-auto px-5 grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 sm:gap-10">
          <div className="footer-brand">
            <Link to="/" className="flex items-center gap-2.5 text-xl font-bold text-gray-900 mb-2.5">
              <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-base font-extrabold">Q</span>
              QuoteFlow
            </Link>
            <p className="text-sm leading-relaxed max-w-[260px] text-gray-400">AI-powered quotation, billing, CRM, marketing, and project estimation platform for Indian SMBs. Built with Spring Boot 4.0.6, Java 21, and AI.</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-3.5">Product</h4>
            <ul className="list-none">
              {[
                { label: 'Features', href: '#features' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Live Demo', href: '#demo' },
                { label: 'Pricing', href: '#pricing' },
              ].map(l => (
                <li key={l.href} className="mb-1.5">
                  <a href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href.slice(1)); }} className="text-sm text-gray-400 hover:text-indigo-600 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-3.5">Company</h4>
            <ul className="list-none">
              {[
                { label: 'Test Access', href: '#test-credentials' },
                { label: 'Reviews', href: '#testimonials' },
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Privacy', href: '/' },
              ].map(l => (
                <li key={l.label} className="mb-1.5">
                  {l.href.startsWith('/') ? (
                    <Link to={l.href} className="text-sm text-gray-400 hover:text-indigo-600 transition-colors">{l.label}</Link>
                  ) : (
                    <a href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href.slice(1)); }} className="text-sm text-gray-400 hover:text-indigo-600 transition-colors">{l.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-3.5">Support</h4>
            <ul className="list-none">
              {[
                { label: 'Help Center', href: '/' },
                { label: 'API Docs', href: '/' },
                { label: 'Status', href: '/' },
                { label: 'support@quoteflow.ai', href: 'mailto:support@quoteflow.ai' },
              ].map(l => (
                <li key={l.label} className="mb-1.5">
                  <a href={l.href} className="text-sm text-gray-400 hover:text-indigo-600 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-[1120px] mx-auto px-5 mt-7 pt-4.5 border-t border-gray-200 flex justify-between text-sm text-gray-400 flex-wrap gap-2.5">
          <span>&copy; 2026 QuoteFlow AI. All rights reserved. Made in India.</span>
          <span>v2.0 &middot; AI-Powered Business Platform</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
