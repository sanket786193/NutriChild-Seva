import React, { useState } from 'react';
import {
  Bell, AlertOctagon, Syringe, Calendar, RefreshCw,
  Check, CheckCheck, Trash2, ArrowRight, ShieldCheck
} from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'SAM' | 'VAX' | 'APPT' | 'SYNC';
  read: boolean;
}

export const NotificationsView: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'SAM'>('ALL');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'CRITICAL SAM ALERT: Priyanka Soren (NC-2026-102)',
      desc: 'MUAC arm measurement recorded at 11.1 cm with bilateral pitting edema. Immediate transfer to Rayagada NRC advised.',
      time: '12 minutes ago',
      type: 'SAM',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Upcoming Vaccination Due: Aarav Kumar',
      desc: 'MR-1 (Measles-Rubella) dose is scheduled for administration on November 15, 2026 at Kalyanpur AWC.',
      time: '2 hours ago',
      type: 'VAX',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Tele-Consultation Confirmed: Dr. Rajesh Patra',
      desc: 'Virtual pediatric review scheduled for Monday, Nov 2, 2026 at 10:30 AM with Sunita Devi.',
      time: '4 hours ago',
      type: 'APPT',
      read: false,
    },
    {
      id: 'notif-4',
      title: 'Offline Sync Reconciliation Complete',
      desc: '18 new anthropometry records and 4 immunization batches successfully synchronized to central grid.',
      time: '1 day ago',
      type: 'SYNC',
      read: true,
    },
  ]);

  const toggleRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filtered = notifications.filter(n => {
    if (filter === 'UNREAD') return !n.read;
    if (filter === 'SAM') return n.type === 'SAM';
    return true;
  });

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                OPERATIONAL FEED
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Notifications &amp; Clinical Alerts
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time alerts for severe malnutrition triggers, overdue immunizations, and tele-consults.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={markAllRead}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 transition shadow-xs cursor-pointer"
              >
                <CheckCheck size={14} className="text-teal-600" />
                <span>Mark all as read</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              filter === 'ALL'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            All Alerts ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('UNREAD')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              filter === 'UNREAD'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Unread ({notifications.filter(n => !n.read).length})
          </button>
          <button
            onClick={() => setFilter('SAM')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              filter === 'SAM'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-rose-600 dark:text-rose-400 hover:text-rose-700'
            }`}
          >
            Critical SAM Alerts
          </button>
        </div>

        {/* Notification Cards */}
        <div className="space-y-3">
          {filtered.map(notif => (
            <div
              key={notif.id}
              onClick={() => toggleRead(notif.id)}
              className={`p-5 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-4 ${
                notif.read
                  ? 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-500'
                  : 'bg-white dark:bg-slate-900 border-teal-600/30 dark:border-teal-400/30 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                    notif.type === 'SAM'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      : notif.type === 'VAX'
                      ? 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
                      : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                  }`}
                >
                  {notif.type === 'SAM' ? (
                    <AlertOctagon size={18} />
                  ) : notif.type === 'VAX' ? (
                    <Syringe size={18} />
                  ) : notif.type === 'APPT' ? (
                    <Calendar size={18} />
                  ) : (
                    <RefreshCw size={18} />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`text-xs sm:text-sm font-bold ${notif.read ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-teal-600" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-1.5">
                    {notif.desc}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono">{notif.time}</span>
                </div>
              </div>

              <button
                onClick={e => {
                  e.stopPropagation();
                  toggleRead(notif.id);
                }}
                className="text-[10px] font-bold text-slate-400 hover:text-teal-700 dark:hover:text-teal-300 shrink-0"
              >
                {notif.read ? 'Mark unread' : 'Mark read'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
