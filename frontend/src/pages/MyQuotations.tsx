import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FolderOpen, Calendar, Tag, Building2, ExternalLink, Clock, Search, ArrowLeft, Edit3, Share2 } from 'lucide-react';
import ShareDialog from '../components/ShareDialog';
import Layout from './Layout';
import { agentApi } from '../api';
import type { QuotationSummary } from '../types';
import { formatINR } from '../utils/format';

const MyQuotations = () => {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState<QuotationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [showShare, setShowShare] = useState(false);
  const [shareQuote, setShareQuote] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'My Quotations | QuoteFlow AI';
    loadQuotations();
  }, []);

  const loadQuotations = async () => {
    setLoading(true);
    try {
      const data = await agentApi.getHistory();
      setQuotations(data);
    } catch {
      setQuotations([]);
    }
    setLoading(false);
  };

  const viewQuotation = async (quoteNo: string) => {
    setError('');
    try {
      const data = await agentApi.getQuotation(quoteNo);
      setSelectedQuote(data);
    } catch {
      setError('Could not load quotation');
    }
  };

  const filtered = quotations.filter(q =>
    !search || q.quoteNo.toLowerCase().includes(search.toLowerCase()) ||
    q.projectName?.toLowerCase().includes(search.toLowerCase()) ||
    q.companyName?.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedQuote) {
    const q = selectedQuote.quotation || {};
    const cb = q.costSummary || {};
    return (
      <Layout>
        <div className="p-8 max-w-6xl mx-auto">
          <button onClick={() => setSelectedQuote(null)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-[13px] font-bold">
            <ArrowLeft size={16} /> Back to Quotations
          </button>
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[22px] font-extrabold text-gray-900">{q.executiveSummary?.projectName || 'Quotation'}</h2>
                <p className="text-[13px] text-gray-500 mt-1">{q.executiveSummary?.projectType} · {q.executiveSummary?.description?.substring(0, 100)}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setShareQuote(selectedQuote); setShowShare(true); }} className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-bold text-[13px] rounded-xl hover:bg-emerald-700 shadow-sm transition-all">
                  <Share2 size={15} /> Share
                </button>
                <button onClick={() => agentApi.downloadAll(selectedQuote.metadata?.quoteNo || '')} className="flex items-center gap-2 px-4 py-2.5 bg-brand-gold-600 text-white font-bold text-[13px] rounded-xl hover:bg-brand-gold-700 shadow-sm transition-all">
                  <Download size={15} /> Download All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {q.marketAnalysis && (
                <div className="bg-gray-50 rounded-xl p-5 border border-[#e8e2d8]">
                  <h3 className="text-[14px] font-extrabold text-gray-900 mb-4">Market Research</h3>
                  <div className="space-y-2.5 text-[13px]">
                    <InfoRow label="Market Demand" value={q.marketAnalysis.marketDemand} />
                    <InfoRow label="Complexity" value={q.marketAnalysis.complexity} />
                    <InfoRow label="Timeline" value={q.marketAnalysis.timelineEstimate} />
                    <InfoRow label="Market Price Range" value={q.marketAnalysis.marketPriceRange} />
                    <InfoRow label="Skill Availability" value={q.marketAnalysis.skillAvailability} />
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-5 border border-[#e8e2d8]">
                <h3 className="text-[14px] font-extrabold text-gray-900 mb-4">Cost Summary</h3>
                <div className="space-y-2.5 text-[13px]">
                  <InfoRow label="Total Module Cost" value={cb.totalModuleCost ? formatINR(cb.totalModuleCost) : '-'} />
                  <InfoRow label="Infrastructure" value={cb.infrastructureCost ? formatINR(cb.infrastructureCost) : '-'} />
                  <InfoRow label="Total Project Cost" value={cb.totalProjectCost ? formatINR(cb.totalProjectCost) : '-'} />
                  <InfoRow label="Recommended Quote" value={cb.recommendedQuote ? formatINR(cb.recommendedQuote) : '-'} />
                  <InfoRow label="GST (18%)" value={cb.gstApplicable || 'Applicable'} />
                </div>
              </div>
            </div>

            {q.moduleBreakdown && q.moduleBreakdown.length > 0 && (
              <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-[#e8e2d8]">
                <h3 className="text-[14px] font-extrabold text-gray-900 mb-4">Module Breakdown</h3>
                <div className="space-y-2 text-[13px]">
                  {q.moduleBreakdown.map((m: any, i: number) => (
                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-[#e8e2d8]/50 last:border-0">
                      <span className="text-gray-700">{m.module}</span>
                      <span className="font-semibold text-gray-900">{m.estimatedCost}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-[13px] text-amber-800">
              <p className="font-bold mb-1">Storage Location</p>
              <p className="font-mono text-[12px] break-all">{selectedQuote.metadata?.folderPath || selectedQuote.storage?.folderPath || 'N/A'}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-[28px] font-extrabold text-gray-900 tracking-tight">My Quotations</h2>
            <p className="text-[14px] text-gray-500 font-medium mt-1">All AI-generated quotations with market research saved locally.</p>
          </div>
          <button onClick={loadQuotations} className="px-4 py-2 text-[13px] font-bold text-gray-600 border border-[#e8e2d8] rounded-xl hover:bg-gray-50 transition-all">
            <Clock size={14} className="inline mr-1.5" /> Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-[13px] text-red-700 font-medium">{error}</div>
        )}

        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by quote, project, or company..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e8e2d8] rounded-xl text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none transition-all"
          />
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400 text-[14px] font-medium">Loading quotations...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <FolderOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-[16px] font-bold text-gray-400">No quotations found</p>
            <p className="text-[13px] text-gray-400 mt-1">Generate your first AI quotation from the Estimation page.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((q) => (
              <div key={q.quoteNo} className="bg-white rounded-xl border border-[#e8e2d8] p-5 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <Tag size={14} className="text-brand-gold-600 shrink-0" />
                      <span className="text-[13px] font-bold text-brand-gold-700 font-mono">{q.quoteNo}</span>
                      <span className="px-2 py-0.5 bg-brand-gold-50 text-brand-gold-700 text-[11px] font-bold rounded-md">{q.projectType}</span>
                    </div>
                    <p className="text-[15px] font-bold text-gray-900 mt-1">{q.projectName}</p>
                    <div className="flex items-center gap-4 mt-2 text-[12px] text-gray-500">
                      <span className="flex items-center gap-1"><Building2 size={12} /> {q.companyName}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {q.createdAt}</span>
                      <span className="flex items-center gap-1"><FolderOpen size={12} /> {q.folderPath}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4 shrink-0">
                    <button onClick={() => { setShareQuote(q); setShowShare(true); }}
                      className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold text-emerald-600 border border-emerald-300 rounded-lg hover:bg-emerald-50 transition-all" title="Share">
                      <Share2 size={13} /> Share
                    </button>
                    <button onClick={() => navigate(`/my-quotations/${q.quoteNo}/edit`)}
                      className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 transition-all" title="Edit">
                      <Edit3 size={13} /> Edit
                    </button>
                    <button onClick={() => agentApi.downloadQuotation(q.quoteNo)} className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold text-gray-600 border border-[#e8e2d8] rounded-lg hover:bg-gray-50 transition-all" title="Download">
                      <Download size={13} /> JSON
                    </button>
                    <button onClick={() => viewQuotation(q.quoteNo)} className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold text-brand-gold-600 border border-brand-gold-300 rounded-lg hover:bg-brand-gold-50 transition-all" title="View">
                      <ExternalLink size={13} /> View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ShareDialog
        isOpen={showShare}
        onClose={() => { setShowShare(false); setShareQuote(null); }}
        quotationText={shareQuote ? `Quotation ${shareQuote.quoteNo} - ${shareQuote.projectName} from QuoteFlow AI` : 'Check out this quotation from QuoteFlow AI'}
      />
    </Layout>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start gap-2">
    <span className="text-gray-500 shrink-0">{label}</span>
    <span className="text-gray-800 font-semibold text-right">{value}</span>
  </div>
);

export default MyQuotations;
