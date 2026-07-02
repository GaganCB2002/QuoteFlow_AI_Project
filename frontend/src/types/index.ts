export interface AiQuotationRequest {
  description: string;
  customerName?: string;
  customerEmail?: string;
  customerCompany?: string;
  customerPhone?: string;
}

export interface CostBreakdownItem {
  category: string;
  name: string;
  amount: number;
  type: string;
}

export interface CostBreakdown {
  developmentCost: number;
  infrastructureCost: number;
  totalCost: number;
  profitMargin: number;
  finalQuote: number;
  items: CostBreakdownItem[];
}

export interface LineItem {
  itemName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  hsn?: string;
  editable?: boolean;
}

export interface Timeline {
  totalDays: number;
  phases: Array<{ name: string; days: number }>;
}

export interface Infrastructure {
  domain: boolean;
  domainName: string;
  hosting: boolean;
  hostingType: string;
  database: boolean;
  databaseType: string;
  ssl: boolean;
}

export interface AiAnalysisResult {
  projectType: string;
  projectName: string;
  description: string;
  summary: string;
  detectedModules: string[];
  detectedFeatures: string[];
  infrastructure: Infrastructure;
  costBreakdown: CostBreakdown;
  items: LineItem[];
  deliverables: string[];
  termsConditions: string[];
  technologyStack: string;
  timeline: Timeline;
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
  breakdown: Record<string, unknown>;
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
    items: CostBreakdownItem[];
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
  lineItems: LineItem[];
  deliverables: string[];
  paymentTerms: Array<{ milestone: string; percentage: number; condition: string }>;
  timeline: Array<{ phase: string; duration: string; details: string }>;
  competitorComparison: Array<{ provider: string; price: string; priceValue: number; isRecommended?: boolean }>;
  marketInsights: Record<string, string>;
  storage: {
    quoteNo: string;
    folderPath: string;
    files: string[];
    metadata: Record<string, unknown>;
  };
}

export interface QuotationSummary {
  quoteNo: string;
  projectType: string;
  projectName: string;
  companyName: string;
  createdAt: string;
  folderPath: string;
}
