import React, { useState, useMemo } from 'react';
import {
  FileText, Send, Check, IndianRupee, Globe, Server, Database,
  Smartphone, ShoppingCart, Users, Lock, Bell, MessageCircle,
  BarChart3, Monitor, LayoutDashboard, Mail, Zap, Shield,
  Cloud, Wifi, ChevronRight, Sparkles, ArrowRight, RefreshCw,
  Key, CreditCard, Download
} from 'lucide-react';
import Layout from './Layout';

const formatINR = (amount: number) => '₹' + amount.toLocaleString('en-IN');

// Cost Database
const COSTS = {
  domain: { '.com': 1200, '.in': 999, '.org': 1500, '.net': 1400 },
  hosting: { shared: 3000, vps: 12000, cloud: 25000, dedicated: 50000 },
  database: { mysql: 0, postgresql: 0, mongodb: 8000, sqlserver: 15000 },
  ssl: { basic: 0, premium: 4000 },
  auth: { email: 5000, mobile: 3000, google: 2000, facebook: 2000, biometric: 8000 },
  payment: { razorpay: 10000, phonepay: 8000, upi: 5000, stripe: 12000 },
  notification: { email: 3000, sms: 5000, whatsapp: 8000, push: 6000 },
  admin: { dashboard: 10000, users: 8000, reports: 10000, analytics: 12000, audit: 6000 },
  ai: { chatbot: 30000, quotation: 20000, proposal: 15000, analytics: 25000 },
  modules: {
    login: 5000, adminPanel: 15000, paymentGateway: 10000,
    studentPortal: 25000, crm: 20000, inventory: 25000,
    blog: 8000, seo: 5000, chat: 15000, maps: 8000,
    multiLanguage: 10000, gst: 5000, delivery: 12000,
  },
  dev: { uiDesign: 10000, frontend: 15000, backend: 20000, database: 5000, testing: 5000, deployment: 5000 },
  maintenance: { monthly: 2000, annual: 15000 },
};

const projectTypes = [
  { id: 'website', label: 'Website', icon: Globe, desc: 'Business, portfolio, blog, landing page' },
  { id: 'mobile', label: 'Mobile App', icon: Smartphone, desc: 'Android, iOS, cross-platform apps' },
  { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingCart, desc: 'Online store, marketplace, shopping' },
  { id: 'erp', label: 'ERP / CRM', icon: LayoutDashboard, desc: 'Enterprise resource planning' },
  { id: 'saas', label: 'SaaS Platform', icon: Cloud, desc: 'Subscription-based software service' },
  { id: 'custom', label: 'Custom Software', icon: Monitor, desc: 'Bespoke business software' },
];

const authMethods = [
  { id: 'email', label: 'Email Login', cost: 5000 },
  { id: 'mobile', label: 'Mobile OTP', cost: 3000 },
  { id: 'google', label: 'Google Login', cost: 2000 },
  { id: 'facebook', label: 'Facebook Login', cost: 2000 },
  { id: 'biometric', label: 'Biometric Login', cost: 8000 },
];

const paymentGateways = [
  { id: 'razorpay', label: 'Razorpay', cost: 10000 },
  { id: 'phonepay', label: 'PhonePe', cost: 8000 },
  { id: 'upi', label: 'UPI', cost: 5000 },
  { id: 'stripe', label: 'Stripe', cost: 12000 },
];

const notificationChannels = [
  { id: 'email', label: 'Email', cost: 3000 },
  { id: 'sms', label: 'SMS', cost: 5000 },
  { id: 'whatsapp', label: 'WhatsApp', cost: 8000 },
  { id: 'push', label: 'Push Notification', cost: 6000 },
];

const adminFeatures = [
  { id: 'dashboard', label: 'Dashboard', cost: 10000 },
  { id: 'users', label: 'User Management', cost: 8000 },
  { id: 'reports', label: 'Reports', cost: 10000 },
  { id: 'analytics', label: 'Analytics', cost: 12000 },
  { id: 'audit', label: 'Audit Logs', cost: 6000 },
];

const aiFeatures = [
  { id: 'chatbot', label: 'AI Chatbot', cost: 30000 },
  { id: 'quotation', label: 'AI Quotation Generator', cost: 20000 },
  { id: 'proposal', label: 'AI Proposal Writer', cost: 15000 },
  { id: 'analytics', label: 'AI Analytics', cost: 25000 },
];

const defaultModules = [
  { id: 'login', label: 'Login System', cost: 5000 },
  { id: 'adminPanel', label: 'Admin Panel', cost: 15000 },
  { id: 'paymentGateway', label: 'Payment Gateway', cost: 10000 },
  { id: 'crm', label: 'CRM Integration', cost: 20000 },
  { id: 'inventory', label: 'Inventory', cost: 25000 },
  { id: 'blog', label: 'Blog / CMS', cost: 8000 },
  { id: 'seo', label: 'SEO', cost: 5000 },
  { id: 'chat', label: 'Chat System', cost: 15000 },
  { id: 'maps', label: 'Google Maps', cost: 8000 },
  { id: 'multiLanguage', label: 'Multi-Language', cost: 10000 },
  { id: 'gst', label: 'GST Invoicing', cost: 5000 },
  { id: 'delivery', label: 'Delivery Tracking', cost: 12000 },
];

interface ProjectForm {
  description: string;
  projectType: string;
  domain: string;
  domainExtension: string;
  needDomain: boolean;
  needHosting: boolean;
  hostingType: string;
  needDatabase: boolean;
  databaseType: string;
  needSSL: boolean;
  sslType: string;
  authMethods: string[];
  paymentGateways: string[];
  notifications: string[];
  adminFeatures: string[];
  aiFeatures: string[];
  modules: string[];
  needMaintenance: boolean;
  pages: number;
}

const initialForm: ProjectForm = {
  description: '',
  projectType: '',
  domain: '',
  domainExtension: '.com',
  needDomain: false,
  needHosting: false,
  hostingType: '',
  needDatabase: false,
  databaseType: '',
  needSSL: false,
  sslType: 'basic',
  authMethods: [],
  paymentGateways: [],
  notifications: [],
  adminFeatures: [],
  aiFeatures: [],
  modules: [],
  needMaintenance: false,
  pages: 5,
};

const Estimation = () => {
  const [mode, setMode] = useState<'chat' | 'wizard'>('chat');
  const [form, setForm] = useState<ProjectForm>(initialForm);
  const [showQuotation, setShowQuotation] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);

  const update = (field: keyof ProjectForm, value: any) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const toggleArray = (field: keyof ProjectForm, value: string) =>
    setForm(prev => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value],
      };
    });

  const costs = useMemo(() => {
    let domainCost = form.needDomain ? (COSTS.domain[form.domainExtension as keyof typeof COSTS.domain] || 1200) : 0;
    let hostingCost = form.needHosting ? (COSTS.hosting[form.hostingType as keyof typeof COSTS.hosting] || 0) : 0;
    let dbCost = form.needDatabase ? (COSTS.database[form.databaseType as keyof typeof COSTS.database] || 0) : 0;
    let sslCost = form.needSSL ? (COSTS.ssl[form.sslType as keyof typeof COSTS.ssl] || 0) : 0;
    let authCost = form.authMethods.reduce((sum, id) => sum + (COSTS.auth[id as keyof typeof COSTS.auth] || 0), 0);
    let paymentCost = form.paymentGateways.reduce((sum, id) => sum + (COSTS.payment[id as keyof typeof COSTS.payment] || 0), 0);
    let notifCost = form.notifications.reduce((sum, id) => sum + (COSTS.notification[id as keyof typeof COSTS.notification] || 0), 0);
    let adminCost = form.adminFeatures.reduce((sum, id) => sum + (COSTS.admin[id as keyof typeof COSTS.admin] || 0), 0);
    let aiCost = form.aiFeatures.reduce((sum, id) => sum + (COSTS.ai[id as keyof typeof COSTS.ai] || 0), 0);
    let moduleCost = form.modules.reduce((sum, id) => sum + (COSTS.modules[id as keyof typeof COSTS.modules] || 0), 0);
    let devCost = COSTS.dev.uiDesign + COSTS.dev.frontend + COSTS.dev.backend + COSTS.dev.database + COSTS.dev.testing + COSTS.dev.deployment;
    let maintenanceCost = form.needMaintenance ? COSTS.maintenance.annual : 0;

    let devSubtotal = devCost + authCost + paymentCost + notifCost + adminCost + aiCost + moduleCost;
    let infraSubtotal = domainCost + hostingCost + dbCost + sslCost;
    let totalCost = devSubtotal + infraSubtotal + maintenanceCost;
    let profitMargin = 0.30;
    let profitAmount = Math.round(totalCost * profitMargin);
    let finalTotal = Math.round(totalCost + profitAmount);

    return {
      domain: domainCost,
      hosting: hostingCost,
      database: dbCost,
      ssl: sslCost,
      auth: authCost,
      payment: paymentCost,
      notification: notifCost,
      admin: adminCost,
      ai: aiCost,
      modules: moduleCost,
      development: devCost,
      maintenance: maintenanceCost,
      totalCost,
      profitAmount,
      finalTotal,
    };
  }, [form]);

  const simulateAI = () => {
    if (!form.description.trim()) return;
    setAiProcessing(true);
    setTimeout(() => {
      const desc = form.description.toLowerCase();
      if (desc.includes('school') || desc.includes('college') || desc.includes('education')) {
        update('projectType', 'website');
        update('modules', ['login', 'adminPanel', 'paymentGateway', 'studentPortal']);
        update('needDomain', true);
        update('needHosting', true);
        update('hostingType', 'cloud');
        update('needDatabase', true);
        update('databaseType', 'postgresql');
        update('authMethods', ['email', 'mobile']);
        update('paymentGateways', ['razorpay', 'upi']);
        update('adminFeatures', ['dashboard', 'users', 'reports']);
      } else if (desc.includes('ecommerce') || desc.includes('shop') || desc.includes('store')) {
        update('projectType', 'ecommerce');
        update('modules', ['login', 'adminPanel', 'paymentGateway', 'inventory', 'gst', 'delivery']);
        update('needDomain', true);
        update('needHosting', true);
        update('hostingType', 'cloud');
        update('needDatabase', true);
        update('authMethods', ['email', 'google']);
        update('paymentGateways', ['razorpay', 'upi', 'stripe']);
        update('adminFeatures', ['dashboard', 'users', 'reports', 'analytics']);
      } else if (desc.includes('mobile') || desc.includes('app') || desc.includes('android') || desc.includes('ios')) {
        update('projectType', 'mobile');
        update('modules', ['login', 'paymentGateway', 'chat', 'maps']);
        update('needHosting', true);
        update('hostingType', 'cloud');
        update('needDatabase', true);
        update('authMethods', ['email', 'mobile', 'google']);
        update('paymentGateways', ['razorpay', 'upi']);
        update('notifications', ['push', 'email']);
      } else {
        update('projectType', 'website');
        update('modules', ['login', 'adminPanel']);
        update('needDomain', true);
        update('needHosting', true);
        update('hostingType', 'shared');
        update('needDatabase', true);
        update('authMethods', ['email']);
      }
      setAiProcessing(false);
    }, 1500);
  };

  const resetForm = () => {
    setForm(initialForm);
    setShowQuotation(false);
  };

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-[28px] font-extrabold text-gray-900 tracking-tight">AI Quotation Builder</h2>
            <p className="text-[14px] text-gray-500 font-medium mt-1">Describe your project — AI calculates everything automatically.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setMode('chat'); resetForm(); }}
              className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${mode === 'chat' ? 'bg-brand-gold-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-[#e8e2d8]'}`}
            >
              <Sparkles size={14} className="inline mr-1.5" />AI Describe
            </button>
            <button
              onClick={() => { setMode('wizard'); resetForm(); }}
              className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${mode === 'wizard' ? 'bg-brand-gold-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-[#e8e2d8]'}`}
            >
              <Monitor size={14} className="inline mr-1.5" />Wizard
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Describe Mode */}
            {mode === 'chat' && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-6">
                <h3 className="text-[16px] font-extrabold text-gray-900 mb-2">Describe Your Project</h3>
                <p className="text-[13px] text-gray-500 mb-4">Type your requirements naturally. AI will detect everything automatically.</p>
                <textarea
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  rows={5}
                  placeholder='e.g. "I need a school management website with student login, attendance tracking, fee management, payment gateway, admin panel and Android app. My domain is schoolabc.com"'
                  className="w-full px-4 py-3.5 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none transition-all resize-none"
                />
                <button
                  onClick={simulateAI}
                  disabled={aiProcessing || !form.description.trim()}
                  className="mt-4 flex items-center gap-2 px-6 py-3 bg-brand-gold-600 text-white font-bold text-[13px] rounded-xl hover:bg-brand-gold-700 transition-all disabled:opacity-40 shadow-sm"
                >
                  {aiProcessing ? (
                    <><RefreshCw size={16} className="animate-spin" /> Analyzing...</>
                  ) : (
                    <><Zap size={16} /> Analyze & Auto-Fill</>
                  )}
                </button>

                {/* Quick Examples */}
                <div className="mt-5 pt-5 border-t border-[#e8e2d8]">
                  <p className="text-[12px] text-gray-400 font-bold uppercase tracking-wider mb-2.5">Try an example</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'School management website with fees portal',
                      'Ecommerce store with payment gateway',
                      'Mobile app for food delivery',
                      'CRM system for real estate',
                    ].map((ex, i) => (
                      <button
                        key={i}
                        onClick={() => update('description', ex)}
                        className="px-3.5 py-2 text-[12px] font-semibold text-gray-500 bg-gray-50 rounded-xl border border-[#e8e2d8] hover:border-brand-gold-500 hover:text-brand-gold-700 transition-all"
                      >
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Wizard Mode */}
            {mode === 'wizard' && (
              <>
                {/* Step 1: Project Type */}
                <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-6">
                  <h3 className="text-[16px] font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-gold-500 text-white text-[11px] font-bold flex items-center justify-center">1</span>
                    Project Type
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {projectTypes.map(pt => {
                      const Icon = pt.icon;
                      const selected = form.projectType === pt.id;
                      return (
                        <button
                          key={pt.id}
                          onClick={() => update('projectType', pt.id === form.projectType ? '' : pt.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            selected
                              ? 'border-brand-gold-500 bg-brand-gold-500/5'
                              : 'border-[#e8e2d8] hover:border-gray-300 bg-white'
                          }`}
                        >
                          <Icon size={22} className={`mb-2 ${selected ? 'text-brand-gold-600' : 'text-gray-400'}`} />
                          <p className="text-[13px] font-bold text-gray-900">{pt.label}</p>
                          <p className="text-[11px] text-gray-400">{pt.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Infrastructure */}
                <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-6">
                  <h3 className="text-[16px] font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-gold-500 text-white text-[11px] font-bold flex items-center justify-center">2</span>
                    Infrastructure
                  </h3>
                  <div className="space-y-4">
                    {/* Domain */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-[#e8e2d8]">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={form.needDomain} onChange={e => update('needDomain', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-brand-gold-600 focus:ring-brand-gold-500" />
                        <div>
                          <span className="text-[13px] font-bold text-gray-900">Domain Name</span>
                          <span className="text-[12px] text-gray-400 ml-2">(+{formatINR(COSTS.domain[form.domainExtension as keyof typeof COSTS.domain] || 1200)})</span>
                        </div>
                      </label>
                      {form.needDomain && (
                        <div className="mt-3 pl-8 space-y-2">
                          <input type="text" value={form.domain} onChange={e => update('domain', e.target.value)} placeholder="yourdomain.com" className="w-full px-3.5 py-2 rounded-lg border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none" />
                          <div className="flex gap-2">
                            {['.com', '.in', '.org', '.net'].map(ext => (
                              <button
                                key={ext}
                                onClick={() => update('domainExtension', ext)}
                                className={`px-3 py-1.5 rounded-lg text-[12px] font-bold border transition-all ${
                                  form.domainExtension === ext ? 'border-brand-gold-500 bg-brand-gold-500/10 text-brand-gold-700' : 'border-[#e8e2d8] text-gray-500 hover:border-gray-300'
                                }`}
                              >
                                {ext} (₹{COSTS.domain[ext as keyof typeof COSTS.domain]})
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hosting */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-[#e8e2d8]">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={form.needHosting} onChange={e => update('needHosting', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-brand-gold-600 focus:ring-brand-gold-500" />
                        <div>
                          <span className="text-[13px] font-bold text-gray-900">Web Hosting</span>
                          <span className="text-[12px] text-gray-400 ml-2">(+{formatINR(COSTS.hosting[form.hostingType as keyof typeof COSTS.hosting] || 0)})</span>
                        </div>
                      </label>
                      {form.needHosting && (
                        <div className="mt-3 pl-8 flex flex-wrap gap-2">
                          {[
                            { id: 'shared', label: 'Shared', cost: 3000 },
                            { id: 'vps', label: 'VPS', cost: 12000 },
                            { id: 'cloud', label: 'Cloud', cost: 25000 },
                            { id: 'dedicated', label: 'Dedicated', cost: 50000 },
                          ].map(h => (
                            <button
                              key={h.id}
                              onClick={() => update('hostingType', h.id)}
                              className={`px-3.5 py-2 rounded-lg text-[12px] font-bold border transition-all text-left ${
                                form.hostingType === h.id ? 'border-brand-gold-500 bg-brand-gold-500/10 text-brand-gold-700' : 'border-[#e8e2d8] text-gray-500 bg-white hover:border-gray-300'
                              }`}
                            >
                              <div>{h.label}</div>
                              <div className="text-[11px] font-medium opacity-70">{formatINR(h.cost)}/yr</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Database */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-[#e8e2d8]">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={form.needDatabase} onChange={e => update('needDatabase', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-brand-gold-600 focus:ring-brand-gold-500" />
                        <div>
                          <span className="text-[13px] font-bold text-gray-900">Database</span>
                          <span className="text-[12px] text-gray-400 ml-2">(+{formatINR(COSTS.database[form.databaseType as keyof typeof COSTS.database] || 0)})</span>
                        </div>
                      </label>
                      {form.needDatabase && (
                        <div className="mt-3 pl-8 flex flex-wrap gap-2">
                          {[
                            { id: 'mysql', label: 'MySQL', cost: 0 },
                            { id: 'postgresql', label: 'PostgreSQL', cost: 0 },
                            { id: 'mongodb', label: 'MongoDB', cost: 8000 },
                            { id: 'sqlserver', label: 'SQL Server', cost: 15000 },
                          ].map(d => (
                            <button
                              key={d.id}
                              onClick={() => update('databaseType', d.id)}
                              className={`px-3.5 py-2 rounded-lg text-[12px] font-bold border transition-all ${
                                form.databaseType === d.id ? 'border-brand-gold-500 bg-brand-gold-500/10 text-brand-gold-700' : 'border-[#e8e2d8] text-gray-500 bg-white hover:border-gray-300'
                              }`}
                            >
                              {d.label} {d.cost > 0 ? `(${formatINR(d.cost)})` : '(Free)'}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* SSL */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-[#e8e2d8]">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={form.needSSL} onChange={e => update('needSSL', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-brand-gold-600 focus:ring-brand-gold-500" />
                        <div>
                          <span className="text-[13px] font-bold text-gray-900">SSL Certificate</span>
                          <span className="text-[12px] text-gray-400 ml-2">(+{formatINR(COSTS.ssl[form.sslType as keyof typeof COSTS.ssl] || 0)})</span>
                        </div>
                      </label>
                      {form.needSSL && (
                        <div className="mt-3 pl-8 flex gap-2">
                          <button onClick={() => update('sslType', 'basic')} className={`px-3.5 py-2 rounded-lg text-[12px] font-bold border ${form.sslType === 'basic' ? 'border-brand-gold-500 bg-brand-gold-500/10 text-brand-gold-700' : 'border-[#e8e2d8] text-gray-500 bg-white'}`}>
                            Free SSL (₹0)
                          </button>
                          <button onClick={() => update('sslType', 'premium')} className={`px-3.5 py-2 rounded-lg text-[12px] font-bold border ${form.sslType === 'premium' ? 'border-brand-gold-500 bg-brand-gold-500/10 text-brand-gold-700' : 'border-[#e8e2d8] text-gray-500 bg-white'}`}>
                            Premium SSL (₹4,000)
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 3: Features */}
                <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-6">
                  <h3 className="text-[16px] font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-gold-500 text-white text-[11px] font-bold flex items-center justify-center">3</span>
                    Features & Modules
                  </h3>

                  <div className="space-y-6">
                    {/* Authentication */}
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-700 mb-2.5 flex items-center gap-1.5">
                        <Lock size={14} className="text-gray-400" /> Login Methods
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {authMethods.map(a => (
                          <label key={a.id} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border cursor-pointer transition-all text-[12px] font-semibold ${
                            form.authMethods.includes(a.id)
                              ? 'border-brand-gold-500 bg-brand-gold-500/10 text-brand-gold-700'
                              : 'border-[#e8e2d8] bg-white text-gray-500 hover:border-gray-300'
                          }`}>
                            <input type="checkbox" checked={form.authMethods.includes(a.id)} onChange={() => toggleArray('authMethods', a.id)} className="sr-only" />
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${form.authMethods.includes(a.id) ? 'bg-brand-gold-500 border-brand-gold-500' : 'border-gray-300'}`}>
                              {form.authMethods.includes(a.id) && <Check size={10} className="text-white" strokeWidth={3} />}
                            </div>
                            {a.label}
                            <span className="text-[11px] opacity-70">({formatINR(a.cost)})</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Payment */}
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-700 mb-2.5 flex items-center gap-1.5">
                        <CreditCard size={14} className="text-gray-400" /> Payment Gateway
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {paymentGateways.map(p => (
                          <label key={p.id} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border cursor-pointer transition-all text-[12px] font-semibold ${
                            form.paymentGateways.includes(p.id)
                              ? 'border-brand-gold-500 bg-brand-gold-500/10 text-brand-gold-700'
                              : 'border-[#e8e2d8] bg-white text-gray-500 hover:border-gray-300'
                          }`}>
                            <input type="checkbox" checked={form.paymentGateways.includes(p.id)} onChange={() => toggleArray('paymentGateways', p.id)} className="sr-only" />
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${form.paymentGateways.includes(p.id) ? 'bg-brand-gold-500 border-brand-gold-500' : 'border-gray-300'}`}>
                              {form.paymentGateways.includes(p.id) && <Check size={10} className="text-white" strokeWidth={3} />}
                            </div>
                            {p.label}
                            <span className="text-[11px] opacity-70">({formatINR(p.cost)})</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Notifications */}
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-700 mb-2.5 flex items-center gap-1.5">
                        <Bell size={14} className="text-gray-400" /> Notifications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {notificationChannels.map(n => (
                          <label key={n.id} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border cursor-pointer transition-all text-[12px] font-semibold ${
                            form.notifications.includes(n.id)
                              ? 'border-brand-gold-500 bg-brand-gold-500/10 text-brand-gold-700'
                              : 'border-[#e8e2d8] bg-white text-gray-500 hover:border-gray-300'
                          }`}>
                            <input type="checkbox" checked={form.notifications.includes(n.id)} onChange={() => toggleArray('notifications', n.id)} className="sr-only" />
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${form.notifications.includes(n.id) ? 'bg-brand-gold-500 border-brand-gold-500' : 'border-gray-300'}`}>
                              {form.notifications.includes(n.id) && <Check size={10} className="text-white" strokeWidth={3} />}
                            </div>
                            {n.label}
                            <span className="text-[11px] opacity-70">({formatINR(n.cost)})</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Admin Features */}
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-700 mb-2.5 flex items-center gap-1.5">
                        <LayoutDashboard size={14} className="text-gray-400" /> Admin Panel Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {adminFeatures.map(a => (
                          <label key={a.id} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border cursor-pointer transition-all text-[12px] font-semibold ${
                            form.adminFeatures.includes(a.id)
                              ? 'border-brand-gold-500 bg-brand-gold-500/10 text-brand-gold-700'
                              : 'border-[#e8e2d8] bg-white text-gray-500 hover:border-gray-300'
                          }`}>
                            <input type="checkbox" checked={form.adminFeatures.includes(a.id)} onChange={() => toggleArray('adminFeatures', a.id)} className="sr-only" />
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${form.adminFeatures.includes(a.id) ? 'bg-brand-gold-500 border-brand-gold-500' : 'border-gray-300'}`}>
                              {form.adminFeatures.includes(a.id) && <Check size={10} className="text-white" strokeWidth={3} />}
                            </div>
                            {a.label}
                            <span className="text-[11px] opacity-70">({formatINR(a.cost)})</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* AI Features */}
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-700 mb-2.5 flex items-center gap-1.5">
                        <Sparkles size={14} className="text-gray-400" /> AI Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {aiFeatures.map(a => (
                          <label key={a.id} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border cursor-pointer transition-all text-[12px] font-semibold ${
                            form.aiFeatures.includes(a.id)
                              ? 'border-brand-gold-500 bg-brand-gold-500/10 text-brand-gold-700'
                              : 'border-[#e8e2d8] bg-white text-gray-500 hover:border-gray-300'
                          }`}>
                            <input type="checkbox" checked={form.aiFeatures.includes(a.id)} onChange={() => toggleArray('aiFeatures', a.id)} className="sr-only" />
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${form.aiFeatures.includes(a.id) ? 'bg-brand-gold-500 border-brand-gold-500' : 'border-gray-300'}`}>
                              {form.aiFeatures.includes(a.id) && <Check size={10} className="text-white" strokeWidth={3} />}
                            </div>
                            {a.label}
                            <span className="text-[11px] opacity-70">({formatINR(a.cost)})</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Additional Modules */}
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-700 mb-2.5 flex items-center gap-1.5">
                        <BarChart3 size={14} className="text-gray-400" /> Additional Modules
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {defaultModules.map(m => (
                          <label key={m.id} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-all text-[12px] font-semibold ${
                            form.modules.includes(m.id)
                              ? 'border-brand-gold-500 bg-brand-gold-500/10 text-brand-gold-700'
                              : 'border-[#e8e2d8] bg-white text-gray-500 hover:border-gray-300'
                          }`}>
                            <input type="checkbox" checked={form.modules.includes(m.id)} onChange={() => toggleArray('modules', m.id)} className="sr-only" />
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${form.modules.includes(m.id) ? 'bg-brand-gold-500 border-brand-gold-500' : 'border-gray-300'}`}>
                              {form.modules.includes(m.id) && <Check size={10} className="text-white" strokeWidth={3} />}
                            </div>
                            <span className="truncate">{m.label}</span>
                            <span className="text-[11px] opacity-70 ml-auto">({formatINR(m.cost)})</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Maintenance */}
                <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-6">
                  <h3 className="text-[16px] font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-gold-500 text-white text-[11px] font-bold flex items-center justify-center">4</span>
                    Maintenance & Support
                  </h3>
                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-[#e8e2d8] cursor-pointer">
                    <input type="checkbox" checked={form.needMaintenance} onChange={e => update('needMaintenance', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-brand-gold-600 focus:ring-brand-gold-500" />
                    <div>
                      <span className="text-[13px] font-bold text-gray-900">Annual Maintenance Contract (AMC)</span>
                      <p className="text-[12px] text-gray-400">Includes monthly support, updates, backups & security patches — {formatINR(COSTS.maintenance.annual)}/year</p>
                    </div>
                  </label>
                  <button
                    onClick={() => setShowQuotation(true)}
                    className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 bg-brand-gold-600 text-white font-bold text-[14px] rounded-xl hover:bg-brand-gold-700 shadow-lg transition-all"
                  >
                    <FileText size={18} /> Generate Quotation
                  </button>
                </div>
              </>
            )}

            {/* Chat mode: Generate Quotation button */}
            {mode === 'chat' && form.projectType && (
              <button
                onClick={() => setShowQuotation(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-gold-600 text-white font-bold text-[14px] rounded-xl hover:bg-brand-gold-700 shadow-lg transition-all"
              >
                <FileText size={18} /> Generate Quotation
              </button>
            )}
          </div>

          {/* Right: Live Cost Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-6 sticky top-24">
              <h3 className="text-[15px] font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                <IndianRupee size={18} className="text-brand-gold-600" />
                Live Cost Estimate
              </h3>

              <div className="space-y-2.5 text-[13px] mb-5">
                <CostRow label="Development" cost={costs.development} icon={Monitor} />
                <CostRow label="Domain" cost={costs.domain} icon={Globe} />
                <CostRow label="Hosting" cost={costs.hosting} icon={Server} />
                <CostRow label="Database" cost={costs.database} icon={Database} />
                <CostRow label="SSL" cost={costs.ssl} icon={Shield} />
                <CostRow label="Authentication" cost={costs.auth} icon={Lock} />
                <CostRow label="Payment" cost={costs.payment} icon={CreditCard} />
                <CostRow label="Notifications" cost={costs.notification} icon={Bell} />
                <CostRow label="Admin Panel" cost={costs.admin} icon={LayoutDashboard} />
                <CostRow label="AI Features" cost={costs.ai} icon={Sparkles} />
                <CostRow label="Modules" cost={costs.modules} icon={BarChart3} />
                <CostRow label="Maintenance" cost={costs.maintenance} icon={RefreshCw} />
              </div>

              <div className="pt-4 border-t border-[#e8e2d8] space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Cost</span>
                  <span className="font-bold text-gray-900">{formatINR(costs.totalCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Profit Margin (30%)</span>
                  <span className="font-bold text-emerald-600">{formatINR(costs.profitAmount)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-brand-gold-500">
                <div className="flex justify-between items-center">
                  <span className="text-[15px] font-black text-gray-900">Final Quote</span>
                  <span className="text-[22px] font-black text-brand-gold-600">{formatINR(costs.finalTotal)}</span>
                </div>
              </div>

              {!showQuotation && (mode === 'wizard' || (mode === 'chat' && form.projectType)) && (
                <button
                  onClick={() => setShowQuotation(true)}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-3 bg-brand-gold-600 text-white font-bold text-[13px] rounded-xl hover:bg-brand-gold-700 shadow-sm transition-all"
                >
                  <FileText size={16} /> Generate Quotation
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quotation Result */}
        {showQuotation && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Check size={24} className="text-emerald-600" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[20px] font-extrabold text-gray-900">Quotation Generated</h3>
                  <p className="text-[13px] text-gray-500">QuoteFlow AI Enterprise &middot; QT-{Date.now().toString().slice(-8)}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={resetForm} className="px-4 py-2 text-[13px] font-bold text-gray-600 border border-[#e8e2d8] rounded-xl hover:bg-gray-50 transition-all">
                  <RefreshCw size={14} className="inline mr-1.5" /> New Quote
                </button>
                <button className="px-4 py-2 text-[13px] font-bold text-white bg-brand-gold-600 rounded-xl hover:bg-brand-gold-700 shadow-sm transition-all">
                  <Download size={14} className="inline mr-1.5" /> Download PDF
                </button>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-gradient-to-br from-brand-gold-500 to-brand-gold-700 rounded-2xl p-8 text-white mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-[13px] opacity-80 mb-1">Development Cost</p>
                  <p className="text-[28px] font-black">{formatINR(costs.totalCost)}</p>
                </div>
                <div>
                  <p className="text-[13px] opacity-80 mb-1">Profit Margin (30%)</p>
                  <p className="text-[28px] font-black">{formatINR(costs.profitAmount)}</p>
                </div>
                <div>
                  <p className="text-[13px] opacity-80 mb-1">Final Quotation</p>
                  <p className="text-[32px] font-black">{formatINR(costs.finalTotal)}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Detailed Breakdown */}
              <div className="bg-gray-50 rounded-xl p-5 border border-[#e8e2d8]">
                <h4 className="text-[13px] font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                  <BarChart3 size={16} className="text-brand-gold-600" /> Cost Breakdown
                </h4>
                <div className="space-y-2 text-[13px]">
                  <BreakdownRow label="UI/UX Design" cost={COSTS.dev.uiDesign} />
                  <BreakdownRow label="Frontend Development" cost={COSTS.dev.frontend} />
                  <BreakdownRow label="Backend Development" cost={COSTS.dev.backend} />
                  <BreakdownRow label="Database Setup" cost={COSTS.dev.database} />
                  <BreakdownRow label="Testing & QA" cost={COSTS.dev.testing} />
                  <BreakdownRow label="Deployment" cost={COSTS.dev.deployment} />
                  {costs.domain > 0 && <BreakdownRow label="Domain Registration" cost={costs.domain} />}
                  {costs.hosting > 0 && <BreakdownRow label={`Hosting (${form.hostingType})`} cost={costs.hosting} />}
                  {costs.database > 0 && <BreakdownRow label={`Database (${form.databaseType})`} cost={costs.database} />}
                  {costs.ssl > 0 && <BreakdownRow label="SSL Certificate" cost={costs.ssl} />}
                  {costs.auth > 0 && <BreakdownRow label="Authentication" cost={costs.auth} />}
                  {costs.payment > 0 && <BreakdownRow label="Payment Gateway" cost={costs.payment} />}
                  {costs.notification > 0 && <BreakdownRow label="Notifications" cost={costs.notification} />}
                  {costs.admin > 0 && <BreakdownRow label="Admin Panel" cost={costs.admin} />}
                  {costs.ai > 0 && <BreakdownRow label="AI Features" cost={costs.ai} />}
                  {costs.modules > 0 && <BreakdownRow label="Additional Modules" cost={costs.modules} />}
                  {costs.maintenance > 0 && <BreakdownRow label="Annual Maintenance" cost={costs.maintenance} />}
                </div>
              </div>

              {/* Included Features */}
              <div className="bg-gray-50 rounded-xl p-5 border border-[#e8e2d8]">
                <h4 className="text-[13px] font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                  <Check size={16} className="text-emerald-600" /> Included Deliverables
                </h4>
                <div className="space-y-2 text-[13px]">
                  <FeatureItem included text="Responsive Design" />
                  <FeatureItem included text={form.needDomain ? `Domain (${form.domain || form.domainExtension})` : 'Domain Not Required'} />
                  <FeatureItem included text={form.needHosting ? `Hosting (${form.hostingType})` : 'Hosting Not Required'} />
                  <FeatureItem included text={form.needDatabase ? `Database (${form.databaseType})` : 'Database Not Required'} />
                  <FeatureItem included text={form.needSSL ? 'SSL Certificate' : 'SSL Not Required'} />
                  {form.authMethods.map(a => {
                    const label = authMethods.find(x => x.id === a)?.label || a;
                    return <FeatureItem key={a} included text={`${label}`} />;
                  })}
                  {form.paymentGateways.map(p => {
                    const label = paymentGateways.find(x => x.id === p)?.label || p;
                    return <FeatureItem key={p} included text={`${label} Integration`} />;
                  })}
                  {form.notifications.map(n => {
                    const label = notificationChannels.find(x => x.id === n)?.label || n;
                    return <FeatureItem key={n} included text={`${label} Notifications`} />;
                  })}
                  {form.adminFeatures.map(a => {
                    const label = adminFeatures.find(x => x.id === a)?.label || a;
                    return <FeatureItem key={a} included text={`Admin: ${label}`} />;
                  })}
                  {form.aiFeatures.map(a => {
                    const label = aiFeatures.find(x => x.id === a)?.label || a;
                    return <FeatureItem key={a} included text={`${label}`} />;
                  })}
                  {form.modules.map(m => {
                    const label = defaultModules.find(x => x.id === m)?.label || m;
                    return <FeatureItem key={m} included text={`${label}`} />;
                  })}
                  {form.needMaintenance && <FeatureItem included text="Annual Maintenance (AMC)" />}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-[#e8e2d8] flex flex-wrap gap-3 justify-end">
              <button className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold text-gray-700 bg-white border border-[#e8e2d8] rounded-xl hover:bg-gray-50 transition-all">
                <FileText size={16} /> View Proposal
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold text-white bg-brand-gold-600 rounded-xl hover:bg-brand-gold-700 shadow-sm transition-all">
                <Send size={16} /> Send to Client
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-sm transition-all">
                <Download size={16} /> Download Quotation
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

const CostRow = ({ label, cost, icon: Icon }: { label: string; cost: number; icon: any }) => (
  <div className="flex items-center justify-between py-1">
    <div className="flex items-center gap-2">
      <Icon size={13} className="text-gray-400" />
      <span className="text-gray-600">{label}</span>
    </div>
    <span className={`font-bold ${cost > 0 ? 'text-gray-900' : 'text-gray-300'}`}>
      {cost > 0 ? formatINR(cost) : '—'}
    </span>
  </div>
);

const BreakdownRow = ({ label, cost }: { label: string; cost: number }) => (
  <div className="flex justify-between items-center py-1.5 border-b border-[#e8e2d8]/50 last:border-0">
    <span className="text-gray-600">{label}</span>
    <span className="font-semibold text-gray-900">{formatINR(cost)}</span>
  </div>
);

const FeatureItem = ({ included, text }: { included: boolean; text: string }) => (
  <div className="flex items-center gap-2 py-1">
    <span className={included ? 'text-emerald-600' : 'text-red-400'}>
      {included ? '✓' : '✗'}
    </span>
    <span className={included ? 'text-gray-700' : 'text-gray-400'}>{text}</span>
  </div>
);

export default Estimation;
