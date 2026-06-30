import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { researchApi } from '../api';
import { Brain, Database, Search, BarChart3, RefreshCw, Trash2, TrendingUp, Target, BookOpen, CheckCircle } from 'lucide-react';

const LearningAdmin = () => {
  const [tab, setTab] = useState<'stats' | 'patterns' | 'knowledge' | 'corrections'>('stats');
  const [stats, setStats] = useState<any>(null);
  const [learningStats, setLearningStats] = useState<any>(null);
  const [patterns, setPatterns] = useState<any[]>([]);
  const [knowledge, setKnowledge] = useState<any>(null);
  const [corrections, setCorrections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'AI Learning Center | QuoteFlow AI';
  }, []);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      researchApi.getStats().catch(() => ({})),
      researchApi.getLearningStats().catch(() => ({})),
      researchApi.getPatterns().catch(() => []),
      researchApi.getKnowledgeBase().catch(() => ({})),
      researchApi.getCorrections().catch(() => []),
    ]).then(([s, ls, p, k, c]) => {
      setStats(s);
      setLearningStats(ls);
      setPatterns(p);
      setKnowledge(k);
      setCorrections(c);
      setLoading(false);
    });
  };

  useEffect(() => { loadData(); }, []);

  const handleReset = async () => {
    if (!window.confirm('Reset AI learning model? All patterns and training data will be lost.')) return;
    await researchApi.resetModel();
    loadData();
  };

  return (
    <Layout title="AI Learning Center" subtitle="Self-learning AI model - training, patterns, web research & knowledge base">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Brain size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-[24px] font-extrabold text-gray-900">{learningStats?.totalPatterns || 0}</p>
                <p className="text-[12px] text-gray-500 font-medium">Learned Patterns</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <TrendingUp size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-[24px] font-extrabold text-gray-900">{learningStats?.accuracyRate || '0%'}</p>
                <p className="text-[12px] text-gray-500 font-medium">ML Accuracy Rate</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Search size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-[24px] font-extrabold text-gray-900">{stats?.totalSearches || 0}</p>
                <p className="text-[12px] text-gray-500 font-medium">Web Searches</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Database size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-[24px] font-extrabold text-gray-900">{stats?.totalKnowledgeEntries || 0}</p>
                <p className="text-[12px] text-gray-500 font-medium">Knowledge Entries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1">
            <button onClick={() => setTab('stats')} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${tab === 'stats' ? 'bg-purple-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}`}>
              <BarChart3 size={14} className="inline mr-1.5" /> Model Stats
            </button>
            <button onClick={() => setTab('patterns')} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${tab === 'patterns' ? 'bg-purple-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}`}>
              <Brain size={14} className="inline mr-1.5" /> Patterns ({patterns.length})
            </button>
            <button onClick={() => setTab('knowledge')} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${tab === 'knowledge' ? 'bg-purple-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}`}>
              <BookOpen size={14} className="inline mr-1.5" /> Knowledge Base
            </button>
            <button onClick={() => setTab('corrections')} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${tab === 'corrections' ? 'bg-purple-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}`}>
              <Target size={14} className="inline mr-1.5" /> Corrections ({corrections.length})
            </button>
          </div>
          <div className="flex gap-2">
            <button onClick={loadData} className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 text-[13px] font-bold flex items-center gap-1.5">
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={handleReset} className="px-3 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 text-[13px] font-bold flex items-center gap-1.5">
              <Trash2 size={14} /> Reset Model
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {tab === 'stats' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[15px] font-extrabold text-gray-900 mb-3">AI Self-Learning Model</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <StatCard label="Total Predictions" value={learningStats?.totalPredictions || 0} icon={Brain} color="purple" />
                  <StatCard label="Accurate Predictions" value={learningStats?.accuratePredictions || 0} icon={CheckCircle} color="emerald" />
                  <StatCard label="Accuracy Rate" value={learningStats?.accuracyRate || '0%'} icon={TrendingUp} color="green" />
                  <StatCard label="Total Corrections" value={learningStats?.totalCorrections || 0} icon={Target} color="amber" />
                  <StatCard label="Model Version" value={learningStats?.modelVersion || 'v1.0'} icon={Brain} color="indigo" />
                  <StatCard label="Total Patterns" value={learningStats?.totalPatterns || 0} icon={Database} color="blue" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-[15px] font-extrabold text-gray-900 mb-3">Web Research Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <StatCard label="Web Searches" value={stats?.totalSearches || 0} icon={Search} color="blue" />
                  <StatCard label="Knowledge Entries" value={stats?.totalKnowledgeEntries || 0} icon={Database} color="emerald" />
                  <StatCard label="Training Records" value={stats?.totalTrainingRecords || 0} icon={BookOpen} color="purple" />
                  <StatCard label="Accuracy Rate" value={stats?.accuracyRate || '0%'} icon={TrendingUp} color="green" />
                  <StatCard label="Categories" value={stats?.categories?.length || 0} icon={BarChart3} color="amber" />
                  <StatCard label="Cache Size" value={stats?.cacheSize || 0} icon={Database} color="gray" />
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                <h4 className="font-bold text-gray-900 mb-2">How Self-Learning Works</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px] text-gray-600">
                  <div className="flex gap-2">
                    <span className="text-purple-600 font-bold">1.</span>
                    <span><strong>Web Search:</strong> Searches Google/ DuckDuckGo for real-time market pricing when user submits a query</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-purple-600 font-bold">2.</span>
                    <span><strong>Pattern Learning:</strong> ML model stores project type + description + price range. Similar future queries use cached pattern</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-purple-600 font-bold">3.</span>
                    <span><strong>Correction Training:</strong> Admin corrections update the model. Accuracy improves with each correction.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'patterns' && (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-bold text-gray-500 text-[12px] uppercase">Project Type</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 text-[12px] uppercase">Description Key</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 text-[12px] uppercase">Min Price</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 text-[12px] uppercase">Max Price</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 text-[12px] uppercase">Matches</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 text-[12px] uppercase">Confidence</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 text-[12px] uppercase">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {patterns.length === 0 ? (
                    <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">No patterns learned yet. Generate quotations to train the model.</td></tr>
                  ) : patterns.map((p, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{p.projectType}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{p.description}</td>
                      <td className="px-4 py-3 font-bold text-gray-900">₹{(p.minPrice || 0).toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 font-bold text-gray-900">₹{(p.maxPrice || 0).toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3"><span className="font-bold text-gray-900">{p.matchCount}</span></td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-lg text-[11px] font-bold ${parseInt(p.confidence) >= 80 ? 'bg-emerald-100 text-emerald-700' : parseInt(p.confidence) >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>
                          {p.confidence}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-[12px]">{p.lastUpdated ? new Date(p.lastUpdated).toLocaleString('en-IN') : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'knowledge' && (
            <div>
              {knowledge ? (
                <div className="space-y-4">
                  {Object.entries(knowledge).map(([category, entries]: [string, any]) => (
                    <div key={category} className="border border-gray-100 rounded-xl overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                        <h4 className="font-bold text-gray-900 text-[14px]">{category} <span className="text-gray-400 font-medium">({entries?.length || 0} entries)</span></h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[13px]">
                          <thead>
                            <tr className="bg-gray-50/50">
                              <th className="text-left px-4 py-2 font-bold text-gray-500 text-[11px] uppercase">Name</th>
                              <th className="text-left px-4 py-2 font-bold text-gray-500 text-[11px] uppercase">Description</th>
                              <th className="text-left px-4 py-2 font-bold text-gray-500 text-[11px] uppercase">Min Price</th>
                              <th className="text-left px-4 py-2 font-bold text-gray-500 text-[11px] uppercase">Max Price</th>
                              <th className="text-left px-4 py-2 font-bold text-gray-500 text-[11px] uppercase">Source</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(entries || []).map((e: any, i: number) => (
                              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                                <td className="px-4 py-2.5 font-semibold text-gray-900">{e.name}</td>
                                <td className="px-4 py-2.5 text-gray-600 max-w-[300px] truncate">{e.description}</td>
                                <td className="px-4 py-2.5 font-bold text-gray-900">₹{(e.minPrice || 0).toLocaleString('en-IN')}</td>
                                <td className="px-4 py-2.5 font-bold text-gray-900">₹{(e.maxPrice || 0).toLocaleString('en-IN')}</td>
                                <td className="px-4 py-2.5">
                                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${e.source === 'web-search' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {e.source || 'knowledge'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-10">Knowledge base is empty</p>
              )}
            </div>
          )}

          {tab === 'corrections' && (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-bold text-gray-500 text-[12px] uppercase">Project Type</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 text-[12px] uppercase">Description</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 text-[12px] uppercase">Correct Min Price</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 text-[12px] uppercase">Correct Max Price</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 text-[12px] uppercase">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {corrections.length === 0 ? (
                    <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400">No corrections recorded</td></tr>
                  ) : corrections.map((c, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{c.projectType}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-[250px] truncate">{c.description}</td>
                      <td className="px-4 py-3 font-bold text-emerald-600">₹{(c.correctMinPrice || 0).toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 font-bold text-emerald-600">₹{(c.correctMaxPrice || 0).toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-gray-500 text-[12px]">{c.timestamp ? new Date(c.timestamp).toLocaleString('en-IN') : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl text-[12px] text-gray-600">
          <strong className="text-purple-700">How the AI Model Works:</strong>
          <ol className="list-decimal ml-4 mt-1 space-y-1">
            <li>User submits a query → Agent searches the web for real-time pricing data</li>
            <li>Web results are cached (search-cache.json) and added to knowledge base (knowledge-base.json)</li>
            <li>ML model (SelfLearningService) stores every query + result as a learned pattern (self-learning/trained-model.json)</li>
            <li>Similar future queries retrieve cached patterns → faster, more accurate results</li>
            <li>Admin corrections retrain the model → accuracy improves over time (supervised learning)</li>
            <li>No Firebase — all data stored locally on disk</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

const StatCard = ({ label, value, icon: Icon, color }: { label: string; value: any; icon: any; color: string }) => {
  const colorMap: Record<string, string> = {
    purple: 'bg-purple-100 text-purple-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    green: 'bg-green-100 text-green-600',
    amber: 'bg-amber-100 text-amber-600',
    blue: 'bg-blue-100 text-blue-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    gray: 'bg-gray-100 text-gray-600',
  };
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color] || 'bg-gray-100 text-gray-600'}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[18px] font-extrabold text-gray-900">{typeof value === 'string' ? value : value.toLocaleString?.('en-IN') || value}</p>
        <p className="text-[11px] text-gray-500 font-medium">{label}</p>
      </div>
    </div>
  );
};

export default LearningAdmin;
