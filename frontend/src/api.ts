import { apiRequest, downloadBlob } from './utils';
import type { AiQuotationRequest, AiAnalysisResult, QuotationDto, AiAgentResponse, QuotationSummary } from './types';

export const aiApi = {
  analyze: (data: AiQuotationRequest) =>
    apiRequest<AiAnalysisResult>('/api/ai/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  generateQuotation: (data: AiQuotationRequest) =>
    apiRequest<QuotationDto>('/api/ai/generate-quotation', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const trackingApi = {
  trackLocation: (data: unknown) =>
    apiRequest<unknown>('/api/tracking/location', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logActivity: (data: unknown) =>
    apiRequest<unknown>('/api/tracking/activity', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAllLocations: () =>
    apiRequest<unknown[]>('/api/tracking/locations'),

  getAllActivities: () =>
    apiRequest<unknown[]>('/api/tracking/activities'),

  getSummary: () =>
    apiRequest<unknown>('/api/tracking/summary'),

  clearData: () =>
    apiRequest<unknown>('/api/tracking/clear', { method: 'DELETE' }),
};

export const adminApi = {
  getUsers: () =>
    apiRequest<unknown[]>('/api/admin/users'),

  getCompanies: () =>
    apiRequest<unknown[]>('/api/admin/companies'),

  getAuditLogs: () =>
    apiRequest<unknown[]>('/api/admin/audit-logs'),

  getAnalytics: () =>
    apiRequest<unknown>('/api/admin/analytics'),

  updateSubscription: (companyId: string, data: unknown) =>
    apiRequest<unknown>(`/api/admin/subscription/${companyId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

export const agentApi = {
  analyze: (data: AiQuotationRequest) =>
    apiRequest<AiAgentResponse>('/api/agent/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getHistory: () =>
    apiRequest<QuotationSummary[]>('/api/agent/history'),

  getQuotation: (quoteNo: string) =>
    apiRequest<unknown>(`/api/agent/quotations/${quoteNo}`),

  editItems: (quoteNo: string, items: unknown[]) =>
    apiRequest<unknown>(`/api/agent/quotations/${quoteNo}/items`, {
      method: 'PUT',
      body: JSON.stringify(items),
    }),

  addFeature: (quoteNo: string, feature: { name: string; description: string; price: number }) =>
    apiRequest<unknown>(`/api/agent/quotations/${quoteNo}/features`, {
      method: 'POST',
      body: JSON.stringify(feature),
    }),

  removeFeature: (quoteNo: string, itemName: string) =>
    apiRequest<unknown>(`/api/agent/quotations/${quoteNo}/features/${encodeURIComponent(itemName)}`, {
      method: 'DELETE',
    }),

  overridePrice: (quoteNo: string, itemName: string, price: number) =>
    apiRequest<unknown>(`/api/agent/quotations/${quoteNo}/items/${encodeURIComponent(itemName)}/price`, {
      method: 'PUT',
      body: JSON.stringify({ price }),
    }),

  applyTier: (quoteNo: string, tier: string) =>
    apiRequest<unknown>(`/api/agent/quotations/${quoteNo}/tier`, {
      method: 'PUT',
      body: JSON.stringify({ tier }),
    }),

  getSuggestions: (projectType: string, description: string, budget: number) =>
    apiRequest<unknown>(`/api/agent/suggestions?projectType=${projectType}&description=${encodeURIComponent(description)}&budget=${budget}`),

  downloadQuotation: (quoteNo: string) =>
    downloadBlob(`/api/agent/quotations/${quoteNo}/download`, `${quoteNo}-quotation.json`),

  downloadAll: (quoteNo: string) =>
    downloadBlob(`/api/agent/quotations/${quoteNo}/download/all`, `${quoteNo}-complete.json`),
};

export const researchApi = {
  searchWeb: (query: string, category: string = 'CUSTOM') =>
    apiRequest<unknown[]>(`/api/research/search?query=${encodeURIComponent(query)}&category=${category}`),

  getMarketPricing: (projectType: string, description: string = '') =>
    apiRequest<unknown>(`/api/research/market-pricing?projectType=${projectType}&description=${encodeURIComponent(description)}`),

  recordTraining: (data: { query: string; category: string; results: unknown[]; accurate: boolean }) =>
    apiRequest<unknown>('/api/research/train', { method: 'POST', body: JSON.stringify(data) }),

  getStats: () =>
    apiRequest<unknown>('/api/research/stats'),

  getKnowledgeBase: () =>
    apiRequest<unknown>('/api/research/knowledge'),

  getTrainingData: () =>
    apiRequest<unknown[]>('/api/research/training'),

  predictPrice: (projectType: string, description: string) =>
    apiRequest<unknown>(`/api/research/learning/predict?projectType=${projectType}&description=${encodeURIComponent(description)}`),

  learnFromResult: (data: { projectType: string; description: string; minPrice: number; maxPrice: number; accurate: boolean }) =>
    apiRequest<unknown>('/api/research/learning/learn', { method: 'POST', body: JSON.stringify(data) }),

  correctPrediction: (data: { projectType: string; description: string; correctMinPrice: number; correctMaxPrice: number }) =>
    apiRequest<unknown>('/api/research/learning/correct', { method: 'POST', body: JSON.stringify(data) }),

  getLearningStats: () =>
    apiRequest<unknown>('/api/research/learning/stats'),

  getPatterns: () =>
    apiRequest<unknown[]>('/api/research/learning/patterns'),

  getCorrections: () =>
    apiRequest<unknown[]>('/api/research/learning/corrections'),

  resetModel: () =>
    apiRequest<unknown>('/api/research/learning/reset', { method: 'DELETE' }),
};
