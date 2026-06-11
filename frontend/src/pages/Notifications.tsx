import React, { useState } from 'react';
import { Bell, Search, CheckCheck, BellRing, FileText, Receipt, Users, Megaphone, AlertTriangle, Info, DollarSign, Calendar } from 'lucide-react';
import Layout from './Layout';

const notificationsData = [
  { id: 1, icon: Receipt, color: 'bg-emerald-50 text-emerald-600', title: 'Payment Received', desc: '₹1,85,000 received from Ravi Constructions', time: '2 hours ago', read: false },
  { id: 2, icon: FileText, color: 'bg-blue-50 text-blue-600', title: 'Quotation Approved', desc: 'GreenLeaf Solutions approved quotation Q-103', time: '4 hours ago', read: false },
  { id: 3, icon: AlertTriangle, color: 'bg-red-50 text-red-500', title: 'Invoice Overdue', desc: 'INV-2026-003 for ₹92,000 is overdue by 3 days', time: '5 hours ago', read: false },
  { id: 4, icon: Users, color: 'bg-purple-50 text-purple-600', title: 'New Lead Added', desc: 'Vikram Singh from Metro Services - potential value ₹78,000', time: '6 hours ago', read: false },
  { id: 5, icon: DollarSign, color: 'bg-brand-gold-500/10 text-brand-gold-600', title: 'Invoice Paid', desc: 'Bharat Electronics paid INV-2026-007 for ₹3,15,000', time: '1 day ago', read: true },
  { id: 6, icon: Megaphone, color: 'bg-amber-50 text-amber-600', title: 'Campaign Completed', desc: 'CRM Upgrade Offer campaign completed with 72 conversions', time: '1 day ago', read: true },
  { id: 7, icon: Info, color: 'bg-gray-100 text-gray-600', title: 'System Update', desc: 'QuoteFlow AI v2.0 will be deployed on 15 Jun 2026', time: '2 days ago', read: true },
  { id: 8, icon: Calendar, color: 'bg-cyan-50 text-cyan-600', title: 'Meeting Reminder', desc: 'Client meeting with Agarwal & Sons at 3:00 PM tomorrow', time: '2 days ago', read: true },
];

const Notifications = () => {
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');
  const [notifications, setNotifications] = useState(notificationsData);

  const filtered = filter === 'All' ? notifications : notifications.filter(n => !n.read);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <Layout title="Notifications" subtitle="Stay updated with your business activity">
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              <button onClick={() => setFilter('All')} className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all ${filter === 'All' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>All</button>
              <button onClick={() => setFilter('Unread')} className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all ${filter === 'Unread' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Unread ({unreadCount})</button>
            </div>
          </div>
          <button onClick={markAllRead} className="flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-bold text-brand-gold-600 hover:text-brand-gold-700 transition-colors">
            <CheckCheck size={14} /> Mark All Read
          </button>
        </div>

        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Bell size={48} className="mx-auto mb-3 opacity-40" />
              <p className="font-medium">No notifications</p>
              <p className="text-[13px]">You're all caught up!</p>
            </div>
          )}
          {filtered.map(n => {
            const Icon = n.icon;
            return (
              <div key={n.id} className={`bg-white rounded-xl border border-[#e8e2d8] p-4 hover:shadow-sm transition-all ${!n.read ? 'border-l-4 border-l-brand-gold-500 bg-brand-gold-500/[0.02]' : ''}`}>
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-[14px] font-bold text-gray-900">{n.title}</h4>
                        <p className="text-[13px] text-gray-500 mt-0.5">{n.desc}</p>
                      </div>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-brand-gold-500 shrink-0 mt-2" />}
                    </div>
                    <p className="text-[12px] text-gray-400 mt-1.5">{n.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
