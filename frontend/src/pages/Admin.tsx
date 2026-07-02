import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { adminApi, trackingApi } from '../api';
import { Users, MapPin, Activity, Eye, RefreshCw, Trash2, Smartphone, Laptop, Search } from 'lucide-react';

interface TrackedUser {
  userId: string;
  ip: string;
  lastLocation: string;
  latitude: number;
  longitude: number;
  browser: string;
  os: string;
  device: string;
  lastSeen: string;
  locationCount: number;
}

interface ActivityEntry {
  userId: string;
  action: string;
  page: string;
  details: string;
  ip: string;
  timestamp: string;
}

const Admin = () => {
  const [tab, setTab] = useState<'users' | 'locations' | 'activity'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [trackedUsers, setTrackedUsers] = useState<TrackedUser[]>([]);
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [allLocations, setAllLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    document.title = 'Admin Panel | QuoteFlow AI';
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      adminApi.getUsers().catch(() => []),
      adminApi.getCompanies().catch(() => []),
      trackingApi.getSummary().catch(() => ({})),
      trackingApi.getAllLocations().catch(() => []),
      trackingApi.getAllActivities().catch(() => []),
    ]).then(([u, c, s, locs, acts]) => {
      setUsers(u as any[]);
      setSummary(s);
      setAllLocations(locs as any[]);
      setActivities(acts as ActivityEntry[]);
      if (s && typeof s === 'object' && 'users' in s) setTrackedUsers((s as { users: TrackedUser[] }).users);
      setLoading(false);
    });
  }, [refreshKey]);

  const handleClearData = async () => {
    if (!window.confirm('Clear all tracking data? This cannot be undone.')) return;
    await trackingApi.clearData();
    setRefreshKey(k => k + 1);
  };

  const getDeviceIcon = (device: string) => {
    if (device === 'Mobile') return <Smartphone size={14} />;
    if (device === 'Tablet') return <Smartphone size={14} />;
    return <Laptop size={14} />;
  };

  const formatTime = (ts: string) => {
    try {
      return new Date(ts).toLocaleString('en-IN');
    } catch {
      return ts;
    }
  };

  const filteredUsers = users.filter(u =>
    !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTracked = trackedUsers.filter(u =>
    !search || u.userId?.toLowerCase().includes(search.toLowerCase()) || u.ip?.includes(search) || u.lastLocation?.toLowerCase().includes(search)
  );

  const filteredActivities = activities.filter(a =>
    !search || a.action?.toLowerCase().includes(search.toLowerCase()) || a.userId?.toLowerCase().includes(search.toLowerCase()) || a.page?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Admin Panel" subtitle="System administration, user tracking & permissions">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-[24px] font-extrabold text-gray-900">{users.length}</p>
                <p className="text-[12px] text-gray-500 font-medium">Registered Users</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <MapPin size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-[24px] font-extrabold text-gray-900">{summary?.totalLocations || 0}</p>
                <p className="text-[12px] text-gray-500 font-medium">Location Records</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Activity size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-[24px] font-extrabold text-gray-900">{summary?.totalActivities || 0}</p>
                <p className="text-[12px] text-gray-500 font-medium">Activity Logs</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Eye size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-[24px] font-extrabold text-gray-900">{summary?.totalUsers || 0}</p>
                <p className="text-[12px] text-gray-500 font-medium">Tracked Sessions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1">
            <button onClick={() => setTab('users')} className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${tab === 'users' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
              <Users size={14} className="inline mr-1.5" /> Users ({users.length})
            </button>
            <button onClick={() => setTab('locations')} className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${tab === 'locations' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
              <MapPin size={14} className="inline mr-1.5" /> Locations ({trackedUsers.length})
            </button>
            <button onClick={() => setTab('activity')} className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${tab === 'activity' ? 'bg-purple-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
              <Activity size={14} className="inline mr-1.5" /> Activity ({activities.length})
            </button>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-9 pr-3 py-2 text-[13px] border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-56" />
            </div>
            <button onClick={() => setRefreshKey(k => k + 1)} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
              <RefreshCw size={16} />
            </button>
            <button onClick={handleClearData} className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 text-[13px] font-bold transition-all">
              <Trash2 size={14} /> Clear Tracking
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {tab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Name</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Email</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Role</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Company</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Phone</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr><td colSpan={7} className="px-5 py-10 text-center text-gray-400">No users found</td></tr>
                  ) : filteredUsers.map((u: any) => (
                    <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-5 py-3.5 font-semibold text-gray-900">{u.name || 'N/A'}</td>
                      <td className="px-5 py-3.5 text-gray-600">{u.email || 'N/A'}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : u.role === 'MANAGER' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                          {u.role || 'USER'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">{u.company?.name || '-'}</td>
                      <td className="px-5 py-3.5 text-gray-600">{u.phone || '-'}</td>
                      <td className="px-5 py-3.5">
                        <span className={`flex items-center gap-1.5 text-[12px] font-semibold ${u.enabled !== false ? 'text-emerald-600' : 'text-red-500'}`}>
                          <span className={`w-2 h-2 rounded-full ${u.enabled !== false ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                          {u.enabled !== false ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <button className="text-blue-600 hover:text-blue-800 text-[12px] font-bold">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'locations' && (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">User</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">IP Address</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Location</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Coordinates</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Device</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Browser / OS</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Last Seen</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Visits</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTracked.length === 0 ? (
                    <tr><td colSpan={8} className="px-5 py-10 text-center text-gray-400">No location data tracked yet</td></tr>
                  ) : filteredTracked.map((u, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-5 py-3.5 font-semibold text-gray-900">{u.userId}</td>
                      <td className="px-5 py-3.5 text-gray-600 font-mono text-[12px]">{u.ip}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-emerald-500" />
                          <span>{u.lastLocation}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 font-mono text-[12px]">
                        {u.latitude !== 0 ? `${u.latitude?.toFixed(4)}, ${u.longitude?.toFixed(4)}` : 'Not available'}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          {getDeviceIcon(u.device)}
                          <span>{u.device}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600 text-[12px]">
                        {u.browser} / {u.os}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 text-[12px]">{formatTime(u.lastSeen)}</td>
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-gray-900">{u.locationCount}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'activity' && (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Timestamp</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">User</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Action</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Page</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">Details</th>
                    <th className="text-left px-5 py-3 font-bold text-gray-500 text-[12px] uppercase tracking-wider">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.length === 0 ? (
                    <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400">No activity logged yet</td></tr>
                  ) : [...filteredActivities].reverse().map((a, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-5 py-3.5 text-gray-500 text-[12px] whitespace-nowrap">{formatTime(a.timestamp)}</td>
                      <td className="px-5 py-3.5 font-semibold text-gray-900">{a.userId}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                          a.action === 'page_view' ? 'bg-blue-100 text-blue-700' :
                          a.action === 'login' ? 'bg-emerald-100 text-emerald-700' :
                          a.action === 'estimate' || a.action === 'generate_quotation' ? 'bg-amber-100 text-amber-700' :
                          a.action === 'download' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {a.action}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">{a.page}</td>
                      <td className="px-5 py-3.5 text-gray-500 text-[12px] max-w-[200px] truncate">{a.details || '-'}</td>
                      <td className="px-5 py-3.5 text-gray-500 font-mono text-[12px]">{a.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tracking Notice */}
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-[12px] text-amber-700">
          <strong>Note:</strong> User tracking activates automatically after cookie consent is accepted. Location is obtained via browser Geolocation API (no prompt if grant already given) and IP geolocation fallback. All data stored locally on disk in <code className="bg-amber-100 px-1.5 py-0.5 rounded">backend/tracking-data/</code>.
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
