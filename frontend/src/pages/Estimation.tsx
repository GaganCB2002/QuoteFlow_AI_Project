import React, { useState, useMemo, useEffect } from 'react';
import {
  FileText, Send, Check, IndianRupee, Globe, Server, Database,
  Smartphone, ShoppingCart, Lock, Bell,
  BarChart3, Monitor, LayoutDashboard, Zap, Shield,
  Cloud, RefreshCw,
  CreditCard, Download, AlertCircle, Sparkles, Edit3, Share2
} from 'lucide-react';
import ShareDialog from '../components/ShareDialog';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { aiApi, agentApi } from '../api';

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

interface AgentResult {
  quoteNo: string;
  projectType: string;
  projectName: string;
  summary: string;
  confidenceScore: number;
  marketResearch: any;
  costBreakdown: any;
  tieredPricing: any;
  featureSuggestions: any;
  lineItems: any[];
  deliverables: string[];
  competitorComparison: any[];
  marketInsights: Record<string, string>;
  storage: { folderPath: string; files: string[]; quoteNo: string };
  timeline: any[];
  paymentTerms: any[];
}

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
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'AI Project Estimation | QuoteFlow AI';
  }, []);
  const [mode, setMode] = useState<'chat' | 'wizard' | 'agent'>('chat');
  const [form, setForm] = useState<ProjectForm>(initialForm);
  const [showQuotation, setShowQuotation] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiConfidence, setAiConfidence] = useState<number | null>(null);
  const [agentResult, setAgentResult] = useState<AgentResult | null>(null);
  const [showShare, setShowShare] = useState(false);

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

  const mapAiResultToForm = (result: any) => {
    const projectTypeMap: Record<string, string> = {
      WEBSITE: 'website', MOBILE_APP: 'mobile', ERP: 'erp',
      CRM: 'erp', E_COMMERCE: 'ecommerce', BILLING_SOFTWARE: 'saas',
      CUSTOM_SOFTWARE: 'custom',
    };

    const pt = result.projectType || '';
    update('projectType', projectTypeMap[pt] || 'website');

    if (result.infrastructure) {
      update('needDomain', result.infrastructure.domain || false);
      if (result.infrastructure.domainName) update('domain', result.infrastructure.domainName);
      update('needHosting', result.infrastructure.hosting || false);
      if (result.infrastructure.hostingType) {
        const ht = result.infrastructure.hostingType.toLowerCase();
        update('hostingType', ['shared','vps','cloud','dedicated'].includes(ht) ? ht : 'cloud');
      }
      update('needDatabase', result.infrastructure.database || false);
      if (result.infrastructure.databaseType) {
        update('databaseType', result.infrastructure.databaseType.toLowerCase());
      }
      update('needSSL', result.infrastructure.ssl || false);
    }

    const feat = result.detectedFeatures || [];
    const mods = result.detectedModules || [];

    const moduleMap: Record<string, string> = {
      'Student Management': 'studentPortal', 'Fee Management': 'paymentGateway',
      'Attendance': 'login', 'Exam Management': 'seo',
      'Result Management': 'seo', 'Teacher Management': 'adminPanel',
      'Inventory': 'inventory', 'HR': 'adminPanel', 'Accounts': 'gst',
      'Lead Management': 'crm', 'Contact Management': 'crm',
    };

    const mappedModules = new Set<string>();
    mods.forEach((m: string) => {
      const key = Object.keys(moduleMap).find(k => m.toLowerCase().includes(k.toLowerCase()));
      if (key && moduleMap[key]) mappedModules.add(moduleMap[key]);
    });
    feat.forEach((f: string) => {
      if (f === 'adminPanel') mappedModules.add('adminPanel');
      if (f === 'paymentGateway') mappedModules.add('paymentGateway');
      if (f === 'inventory') mappedModules.add('inventory');
      if (f === 'gstSupport' || f === 'gst') mappedModules.add('gst');
      if (f === 'crm' || f === 'leadManagement') mappedModules.add('crm');
      if (f === 'chat') mappedModules.add('chat');
      if (f === 'maps') mappedModules.add('maps');
      if (f === 'multiLanguage') mappedModules.add('multiLanguage');
      if (f === 'blog') mappedModules.add('blog');
      if (f === 'seo') mappedModules.add('seo');
    });

    if (mappedModules.size === 0) {
      mappedModules.add('login');
      mappedModules.add('adminPanel');
    }

    update('modules', Array.from(mappedModules));

    if (feat.includes('adminPanel')) update('adminFeatures', ['dashboard', 'users', 'reports']);
    if (feat.includes('paymentGateway') || feat.includes('razorpay')) {
      update('paymentGateways', ['razorpay', 'upi']);
    }
    if (feat.includes('emailIntegration') || feat.includes('google')) {
      const methods = ['email'];
      if (feat.includes('google')) methods.push('google');
      if (feat.includes('mobile') || feat.includes('sms')) methods.push('mobile');
      update('authMethods', methods);
    } else if (feat.includes('mobile') || feat.includes('sms')) {
      update('authMethods', ['email', 'mobile']);
    }
    if (feat.includes('pushNotifications')) update('notifications', ['push', 'email']);
    if (feat.includes('analytics')) update('aiFeatures', ['analytics']);
    if (feat.includes('chatbot')) update('aiFeatures', ['chatbot']);
  };

  const simulateAI = async () => {
    if (!form.description.trim()) return;
    setAiProcessing(true);
    setAiError(null);
    setAiConfidence(null);

    try {
      const result = await aiApi.analyze({ description: form.description });
      mapAiResultToForm(result);
      if (result.confidence) setAiConfidence(result.confidence);
    } catch (err: any) {
      console.warn('AI API unavailable, using rule-based estimation:', err.message);
      setAiError('AI service unavailable. Using rule-based estimation.');
      setTimeout(() => setAiError(null), 5000);

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
    }
    setAiProcessing(false);
  };

  const analyzeWithAgent = async () => {
    if (!form.description.trim()) return;
    setAiProcessing(true);
    setAgentResult(null);
    setAiError(null);

    try {
      const result = await agentApi.analyze({
        description: form.description,
        customerName: localStorage.getItem('userName') || 'Client',
        customerCompany: localStorage.getItem('companyName') || localStorage.getItem('userCompany') || 'Client Company'
      });
      setAgentResult(result);
      setAiConfidence(result.confidenceScore);
      setShowQuotation(true);
    } catch (err: any) {
      console.error('Agent analysis error:', err);
      setAiError('Agent analysis failed. Using local estimation instead.');
      setTimeout(() => setAiError(null), 6000);
    }
    setAiProcessing(false);
  };

  const resetForm = () => {
    setForm(initialForm);
    setShowQuotation(false);
    setAiError(null);
    setAiConfidence(null);
    setAgentResult(null);
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
            <button
              onClick={() => { setMode('agent'); resetForm(); }}
              className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${mode === 'agent' ? 'bg-purple-600 text-white shadow-sm' : 'bg-white text-purple-600 border border-purple-300'}`}
            >
              <Zap size={14} className="inline mr-1.5" />AI Agent
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
                    <><Zap size={16} /> Analyze with AI</>
                  )}
                </button>

                {aiConfidence !== null && (
                  <div className="mt-3 flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-[12px]">
                    <Check size={14} className="text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">AI Analysis Complete</span>
                    <span className="text-emerald-500">·</span>
                    <span className="text-emerald-600 font-bold">{aiConfidence}% confidence</span>
                  </div>
                )}

                {aiError && (
                  <div className="mt-3 flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-[12px]">
                    <AlertCircle size={14} className="text-amber-600" />
                    <span className="text-amber-700">{aiError}</span>
                  </div>
                )}

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

            {/* Agent Mode */}
            {mode === 'agent' && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Zap size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-extrabold text-gray-900">AI Agent Analysis</h3>
                    <p className="text-[13px] text-gray-500">Comprehensive market research + intelligent quotation generation</p>
                  </div>
                </div>
                <textarea
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  rows={5}
                  placeholder='e.g. "I need a complete school ERP system with student management, fee tracking, attendance, exam management, teacher portal, SMS notifications, and mobile app access"'
                  className="w-full px-4 py-3.5 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all resize-none"
                />
                <button
                  onClick={analyzeWithAgent}
                  disabled={aiProcessing || !form.description.trim()}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-purple-600 text-white font-bold text-[14px] rounded-xl hover:bg-purple-700 transition-all disabled:opacity-40 shadow-sm"
                >
                  {aiProcessing ? (
                    <><RefreshCw size={18} className="animate-spin" /> AI Agent is Researching & Analyzing...</>
                  ) : (
                    <><Zap size={18} /> Launch AI Agent</>
                  )}
                </button>
                <p className="mt-3 text-[12px] text-gray-400 text-center">Agent will research market pricing, analyze competitors, and generate a complete quotation with all details saved locally.</p>
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
                onClick={async () => {
                  setShowQuotation(true);
                  try {
                    await aiApi.generateQuotation({ description: form.description });
                  } catch (e) {
                    console.warn('Could not save quotation to server, showing locally:', e);
                  }
                }}
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
              {mode === 'agent' && (
                <div className="mt-5 p-3 bg-purple-50 border border-purple-200 rounded-xl text-center">
                  <p className="text-[12px] text-purple-700 font-semibold">Use the Agent panel above to generate a comprehensive quotation with market research.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Agent Result */}
        {agentResult && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Check size={24} className="text-purple-600" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[20px] font-extrabold text-gray-900">AI Agent Complete</h3>
                  <p className="text-[13px] text-gray-500">
                    {agentResult.projectName} &middot; {agentResult.quoteNo} &middot;
                    <span className="text-purple-600 font-bold ml-1">{agentResult.confidenceScore}% confidence</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={resetForm} className="px-4 py-2 text-[13px] font-bold text-gray-600 border border-[#e8e2d8] rounded-xl hover:bg-gray-50 transition-all">
                  <RefreshCw size={14} className="inline mr-1.5" /> New
                </button>
                <button onClick={() => setShowShare(true)} className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-sm transition-all">
                  <Share2 size={14} /> Share
                </button>
                <button onClick={() => agentApi.downloadAll(agentResult.quoteNo)} className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-white bg-purple-600 rounded-xl hover:bg-purple-700 shadow-sm transition-all">
                  <Download size={14} /> Download All
                </button>
                <button onClick={() => navigate(`/my-quotations/${agentResult.quoteNo}/edit`)}
                  className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-purple-700 bg-white border-2 border-purple-300 rounded-xl hover:bg-purple-50 shadow-sm transition-all">
                  <Edit3 size={14} /> Edit Quotation
                </button>
              </div>
            </div>

            {/* Market Research Banner */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-8 text-white mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-[12px] opacity-80 mb-1">Market Demand</p>
                  <p className="text-[14px] font-black">{agentResult.marketResearch?.marketDemand?.split(' - ')[0] || 'HIGH'}</p>
                </div>
                <div>
                  <p className="text-[12px] opacity-80 mb-1">Complexity</p>
                  <p className="text-[14px] font-black">{agentResult.marketResearch?.complexity || 'MODERATE'}</p>
                </div>
                <div>
                  <p className="text-[12px] opacity-80 mb-1">Market Range</p>
                  <p className="text-[14px] font-black">{agentResult.marketResearch?.marketPriceRange || '-'}</p>
                </div>
                <div>
                  <p className="text-[12px] opacity-80 mb-1">Timeline</p>
                  <p className="text-[14px] font-black">{agentResult.marketResearch?.timelineEstimate || '-'}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200 text-center">
                <p className="text-[12px] text-emerald-700 font-bold mb-1">Total Project Cost</p>
                <p className="text-[24px] font-black text-emerald-700">{formatINR(agentResult.costBreakdown?.totalProjectCost || 0)}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 text-center">
                <p className="text-[12px] text-amber-700 font-bold mb-1">Final Quote (excl. GST)</p>
                <p className="text-[24px] font-black text-amber-700">{formatINR(agentResult.costBreakdown?.finalQuote || 0)}</p>
              </div>
              <div className="bg-brand-gold-50 rounded-xl p-5 border border-brand-gold-300 text-center">
                <p className="text-[12px] text-brand-gold-700 font-bold mb-1">Grand Total (incl. GST)</p>
                <p className="text-[28px] font-black text-brand-gold-700">{formatINR(agentResult.costBreakdown?.grandTotal || 0)}</p>
              </div>
            </div>

            {/* Tiered Pricing */}
            {agentResult.tieredPricing?.basic && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {['basic', 'standard', 'premium'].map(tierKey => {
                  const t = agentResult.tieredPricing[tierKey];
                  if (!t) return null;
                  const isRec = tierKey === 'standard';
                  return (
                    <div key={tierKey}
                      className={`rounded-xl border-2 p-4 ${isRec ? 'border-purple-400 bg-purple-50' : 'border-[#e8e2d8] bg-white'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[14px] font-extrabold text-gray-900">{t.name}</h4>
                        {isRec && <span className="px-2 py-0.5 bg-purple-200 text-purple-800 text-[10px] font-bold rounded-full">Best Value</span>}
                      </div>
                      <p className="text-[11px] text-gray-500 mb-2">{t.description}</p>
                      <p className="text-[22px] font-black text-gray-900">{formatINR(t.grandTotal)}</p>
                      <div className="mt-2 space-y-1 text-[12px]">
                        <div className="flex justify-between"><span className="text-gray-500">Admin earns</span><span className="font-bold text-emerald-600">+{formatINR(t.adminRevenuePerSale)}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Customer pays</span><span className="font-bold">{formatINR(t.grandTotal)}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Margin</span><span className="font-bold">{t.marginPct?.toFixed(0)}%</span></div>
                        {t.customerSavings > 0 && (
                          <div className="flex justify-between"><span className="text-gray-500">Saves customer</span><span className="font-bold text-emerald-600">{formatINR(t.customerSavings)}</span></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Feature Suggestions */}
            {agentResult.featureSuggestions?.highPriorityFeatures?.length > 0 && (
              <div className="bg-white rounded-xl border border-purple-200 p-5 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[14px] font-extrabold text-gray-900 flex items-center gap-2">
                    <Zap size={16} className="text-purple-600" /> AI-Recommended Add-Ons
                  </h4>
                  <div className="flex gap-3 text-[12px]">
                    <span className="text-purple-700 font-bold">+{formatINR(agentResult.featureSuggestions.totalPotentialRevenue)} revenue</span>
                    <span className="text-emerald-600 font-bold">+{formatINR(agentResult.featureSuggestions.totalPotentialProfit)} profit</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {agentResult.featureSuggestions.highPriorityFeatures.map((s: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-gray-900">{s.name}</p>
                        <p className="text-[12px] text-gray-500">{s.recommendationReason}</p>
                      </div>
                      <div className="text-right text-[12px] shrink-0 ml-3">
                        <p className="font-bold text-gray-900">{formatINR(s.sellingPrice)}</p>
                        <p className="text-emerald-600 font-bold">+{formatINR(s.adminProfit)} admin</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Modules & Items */}
              <div className="bg-gray-50 rounded-xl p-5 border border-[#e8e2d8]">
                <h4 className="text-[13px] font-bold text-gray-900 mb-3">Detected Modules & Pricing</h4>
                <div className="space-y-2 text-[13px]">
                  {agentResult.marketResearch?.detectedModules?.map((m: string, i: number) => {
                    const mp = agentResult.marketResearch?.modulePrices?.find((p: any) => p.name === m);
                    return (
                      <div key={i} className="flex justify-between items-center py-1.5 border-b border-[#e8e2d8]/50 last:border-0">
                        <span className="text-gray-700">{m}</span>
                        <span className="font-semibold text-gray-900">{mp ? formatINR(mp.price) : '-'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Competitor Comparison */}
              <div className="bg-gray-50 rounded-xl p-5 border border-[#e8e2d8]">
                <h4 className="text-[13px] font-bold text-gray-900 mb-3">Market Competitor Comparison</h4>
                <div className="space-y-2 text-[13px]">
                  {agentResult.competitorComparison?.map((c: any, i: number) => (
                    <div key={i} className={`flex justify-between items-center py-1.5 border-b border-[#e8e2d8]/50 last:border-0 ${c.isRecommended ? 'bg-purple-50 -mx-3 px-3 rounded-lg' : ''}`}>
                      <span className={`${c.isRecommended ? 'text-purple-700 font-bold' : 'text-gray-600'}`}>
                        {c.isRecommended ? '★ ' : ''}{c.provider}
                      </span>
                      <span className={`font-semibold ${c.isRecommended ? 'text-purple-700' : 'text-gray-900'}`}>{c.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverables */}
            {agentResult.deliverables?.length > 0 && (
              <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-[#e8e2d8]">
                <h4 className="text-[13px] font-bold text-gray-900 mb-3">Deliverables</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {agentResult.deliverables.map((d: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-[#e8e2d8] text-[12px]">
                      <Check size={12} className="text-emerald-600 shrink-0" />
                      <span className="text-gray-700">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Terms */}
            {agentResult.paymentTerms?.length > 0 && (
              <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-[#e8e2d8]">
                <h4 className="text-[13px] font-bold text-gray-900 mb-3">Payment Milestones</h4>
                <div className="space-y-2 text-[13px]">
                  {agentResult.paymentTerms.map((pt: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 py-2 border-b border-[#e8e2d8]/50 last:border-0">
                      <div className="w-20 text-center">
                        <span className="px-2 py-1 bg-brand-gold-100 text-brand-gold-700 font-bold text-[12px] rounded-md">{pt.percentage}%</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{pt.milestone}</p>
                        <p className="text-gray-500 text-[12px]">{pt.condition}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            {agentResult.timeline?.length > 0 && (
              <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-[#e8e2d8]">
                <h4 className="text-[13px] font-bold text-gray-900 mb-3">Project Timeline</h4>
                <div className="space-y-2 text-[13px]">
                  {agentResult.timeline.map((t: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-[#e8e2d8]/50 last:border-0">
                      <div className="w-2 h-2 rounded-full bg-brand-gold-500 mt-1.5 shrink-0" />
                      <div>
                        <p className="font-bold text-gray-900">{t.phase}</p>
                        <p className="text-gray-500 text-[12px]">{t.duration} - {t.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Market Insights */}
            {agentResult.marketInsights && Object.keys(agentResult.marketInsights).length > 0 && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-[13px] text-amber-800">
                <p className="font-bold mb-2">Market Insights</p>
                {Object.entries(agentResult.marketInsights).map(([key, value]) => (
                  <p key={key} className="text-[12px] mb-1"><span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value}</p>
                ))}
              </div>
            )}

            {/* Storage Info */}
            {agentResult.storage && (
              <div className="mt-4 p-4 bg-gray-50 border border-[#e8e2d8] rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-bold text-gray-900 mb-1">Saved Locally</p>
                    <p className="text-[11px] text-gray-500 font-mono break-all">{agentResult.storage.folderPath}</p>
                  </div>
                  <button onClick={() => agentApi.downloadAll(agentResult.quoteNo)} className="flex items-center gap-2 px-3 py-2 text-[12px] font-bold text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 transition-all shrink-0 ml-4">
                    <Download size={13} /> Download Files
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quotation Result (non-agent mode) */}
        {showQuotation && !agentResult && (
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
                <button onClick={() => setShowShare(true)} className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-sm transition-all">
                  <Share2 size={14} /> Share
                </button>
                <button onClick={resetForm} className="px-4 py-2 text-[13px] font-bold text-gray-600 border border-[#e8e2d8] rounded-xl hover:bg-gray-50 transition-all">
                  <RefreshCw size={14} className="inline mr-1.5" /> New Quote
                </button>
              </div>
            </div>

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

            <div className="mt-8 pt-6 border-t border-[#e8e2d8] flex flex-wrap gap-3 justify-end">
              <button onClick={() => navigate('/my-quotations')} className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold text-gray-700 bg-white border border-[#e8e2d8] rounded-xl hover:bg-gray-50 transition-all">
                <FileText size={16} /> View Proposal
              </button>
              <button onClick={() => navigate('/quotations/new')} className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold text-white bg-brand-gold-600 rounded-xl hover:bg-brand-gold-700 shadow-sm transition-all">
                <Send size={16} /> Send to Client
              </button>
              <button onClick={() => { const blob = new Blob([JSON.stringify({ description: form.description, costs }, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `quotation-${Date.now()}.json`; a.click(); URL.revokeObjectURL(url); }} className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-sm transition-all">
                <Download size={16} /> Download Quotation
              </button>
            </div>
          </div>
        )}
      </div>

      <ShareDialog
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        quotationText={`Project Estimation from QuoteFlow AI - ${form.projectType || 'Custom'} - Total: ${formatINR(costs.finalTotal)}`}
      />
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
