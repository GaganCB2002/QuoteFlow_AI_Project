const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8081';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `HTTP ${res.status}`);
  }

  return res.json();
}

export interface AiQuotationRequest {
  description: string;
  customerName?: string;
  customerEmail?: string;
  customerCompany?: string;
  customerPhone?: string;
}

export interface AiAnalysisResult {
  projectType: string;
  projectName: string;
  description: string;
  summary: string;
  detectedModules: string[];
  detectedFeatures: string[];
  infrastructure: {
    domain: boolean;
    domainName: string;
    hosting: boolean;
    hostingType: string;
    database: boolean;
    databaseType: string;
    ssl: boolean;
  };
  costBreakdown: {
    developmentCost: number;
    infrastructureCost: number;
    totalCost: number;
    profitMargin: number;
    finalQuote: number;
    items: Array<{
      category: string;
      name: string;
      amount: number;
      type: string;
    }>;
  };
  items: Array<{
    itemName: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  deliverables: string[];
  termsConditions: string[];
  technologyStack: string;
  timeline: {
    totalDays: number;
    phases: Array<{ name: string; days: number }>;
  };
  confidence: number;
}

export interface QuotationDto {
  id: string;
  quoteNo: string;
  companyId: string;
  customerId: string;
  createdById: string;
  items: Array<{
    itemName: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    taxRate: number;
    total: number;
  }>;
  subtotal: number;
  discountType: string;
  discountValue: number;
  taxType: string;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  status: string;
  aiGenerated: boolean;
  aiConfidence: number;
  notes: string;
  termsConditions: string;
}

export interface AiAgentResponse {
  quoteNo: string;
  projectType: string;
  projectName: string;
  description: string;
  summary: string;
  confidenceScore: number;
  marketResearch: {
    marketDemand: string;
    complexity: string;
    timelineEstimate: string;
    marketPriceRange: string;
    marketMinPrice: number;
    marketMaxPrice: number;
    competitivePrice: number;
    detectedModules: string[];
    modulePrices: Array<{ name: string; price: number }>;
  };
  costBreakdown: {
    totalModuleCost: number;
    infrastructureCost: number;
    totalProjectCost: number;
    profitMargin: number;
    finalQuote: number;
    gstAmount: number;
    grandTotal: number;
    recommendedTier?: string;
    items: Array<{ category: string; name: string; amount: number; type: string }>;
  };
  tieredPricing: {
    basic: TierInfo;
    standard: TierInfo;
    premium: TierInfo;
    recommendation: string;
    costPrice: number;
  };
  featureSuggestions: {
    highPriorityFeatures: SuggestedFeature[];
    mediumPriorityFeatures: SuggestedFeature[];
    totalPotentialRevenue: number;
    totalPotentialProfit: number;
    totalCustomerValue: number;
  };
  lineItems: Array<{
    itemName: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
    hsn: string;
    editable?: boolean;
  }>;
  deliverables: string[];
  paymentTerms: Array<{ milestone: string; percentage: number; condition: string }>;
  timeline: Array<{ phase: string; duration: string; details: string }>;
  competitorComparison: Array<{ provider: string; price: string; priceValue: number; isRecommended?: boolean }>;
  marketInsights: Record<string, string>;
  storage: {
    quoteNo: string;
    folderPath: string;
    files: string[];
    metadata: Record<string, any>;
  };
}

export interface TierInfo {
  name: string;
  description: string;
  marginPct: number;
  totalCost: number;
  profit: number;
  priceBeforeGst: number;
  gstAmount: number;
  grandTotal: number;
  customerSavings: number;
  targetCustomer: string;
  adminRevenuePerSale: number;
  breakdown: Record<string, any>;
}

export interface SuggestedFeature {
  name: string;
  id: string;
  category: string;
  sellingPrice: number;
  costPrice: number;
  adminProfit: number;
  profitMarginPct: number;
  description: string;
  priority: string;
  businessValue: string;
  estimatedSavings: string;
  recommendationReason: string;
}

export interface QuotationSummary {
  quoteNo: string;
  projectType: string;
  projectName: string;
  companyName: string;
  createdAt: string;
  folderPath: string;
}

async function downloadBlob(endpoint: string, filename: string) {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${endpoint}`, { headers });
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const aiApi = {
  analyze: (data: AiQuotationRequest) =>
    request<AiAnalysisResult>('/api/ai/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  generateQuotation: (data: AiQuotationRequest) =>
    request<QuotationDto>('/api/ai/generate-quotation', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const trackingApi = {
  trackLocation: (data: any) =>
    request<any>('/api/tracking/location', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logActivity: (data: any) =>
    request<any>('/api/tracking/activity', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAllLocations: () =>
    request<any[]>('/api/tracking/locations'),

  getAllActivities: () =>
    request<any[]>('/api/tracking/activities'),

  getSummary: () =>
    request<any>('/api/tracking/summary'),

  clearData: () =>
    request<any>('/api/tracking/clear', { method: 'DELETE' }),
};

export const adminApi = {
  getUsers: () =>
    request<any[]>('/api/admin/users'),

  getCompanies: () =>
    request<any[]>('/api/admin/companies'),

  getAuditLogs: () =>
    request<any[]>('/api/admin/audit-logs'),

  getAnalytics: () =>
    request<any>('/api/admin/analytics'),

  updateSubscription: (companyId: string, data: any) =>
    request<any>(`/api/admin/subscription/${companyId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

export const agentApi = {
  analyze: (data: AiQuotationRequest) =>
    request<AiAgentResponse>('/api/agent/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getHistory: () =>
    request<QuotationSummary[]>('/api/agent/history'),

  getQuotation: (quoteNo: string) =>
    request<any>(`/api/agent/quotations/${quoteNo}`),

  editItems: (quoteNo: string, items: any[]) =>
    request<any>(`/api/agent/quotations/${quoteNo}/items`, {
      method: 'PUT',
      body: JSON.stringify(items),
    }),

  addFeature: (quoteNo: string, feature: { name: string; description: string; price: number }) =>
    request<any>(`/api/agent/quotations/${quoteNo}/features`, {
      method: 'POST',
      body: JSON.stringify(feature),
    }),

  removeFeature: (quoteNo: string, itemName: string) =>
    request<any>(`/api/agent/quotations/${quoteNo}/features/${encodeURIComponent(itemName)}`, {
      method: 'DELETE',
    }),

  overridePrice: (quoteNo: string, itemName: string, price: number) =>
    request<any>(`/api/agent/quotations/${quoteNo}/items/${encodeURIComponent(itemName)}/price`, {
      method: 'PUT',
      body: JSON.stringify({ price }),
    }),

  applyTier: (quoteNo: string, tier: string) =>
    request<any>(`/api/agent/quotations/${quoteNo}/tier`, {
      method: 'PUT',
      body: JSON.stringify({ tier }),
    }),

  getSuggestions: (projectType: string, description: string, budget: number) =>
    request<any>(`/api/agent/suggestions?projectType=${projectType}&description=${encodeURIComponent(description)}&budget=${budget}`),

  downloadQuotation: (quoteNo: string) =>
    downloadBlob(`/api/agent/quotations/${quoteNo}/download`, `${quoteNo}-quotation.json`),

  downloadAll: (quoteNo: string) =>
    downloadBlob(`/api/agent/quotations/${quoteNo}/download/all`, `${quoteNo}-complete.json`),
};

export const researchApi = {
  searchWeb: (query: string, category: string = 'CUSTOM') =>
    request<any[]>(`/api/research/search?query=${encodeURIComponent(query)}&category=${category}`),

  getMarketPricing: (projectType: string, description: string = '') =>
    request<any>(`/api/research/market-pricing?projectType=${projectType}&description=${encodeURIComponent(description)}`),

  recordTraining: (data: { query: string; category: string; results: any[]; accurate: boolean }) =>
    request<any>('/api/research/train', { method: 'POST', body: JSON.stringify(data) }),

  getStats: () =>
    request<any>('/api/research/stats'),

  getKnowledgeBase: () =>
    request<any>('/api/research/knowledge'),

  getTrainingData: () =>
    request<any[]>('/api/research/training'),

  predictPrice: (projectType: string, description: string) =>
    request<any>(`/api/research/learning/predict?projectType=${projectType}&description=${encodeURIComponent(description)}`),

  learnFromResult: (data: { projectType: string; description: string; minPrice: number; maxPrice: number; accurate: boolean }) =>
    request<any>('/api/research/learning/learn', { method: 'POST', body: JSON.stringify(data) }),

  correctPrediction: (data: { projectType: string; description: string; correctMinPrice: number; correctMaxPrice: number }) =>
    request<any>('/api/research/learning/correct', { method: 'POST', body: JSON.stringify(data) }),

  getLearningStats: () =>
    request<any>('/api/research/learning/stats'),

  getPatterns: () =>
    request<any[]>('/api/research/learning/patterns'),

  getCorrections: () =>
    request<any[]>('/api/research/learning/corrections'),

  resetModel: () =>
    request<any>('/api/research/learning/reset', { method: 'DELETE' }),
};
