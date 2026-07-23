import React, { useState } from 'react';
import { Search, Bell, User, LogOut, Settings, HelpCircle } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

interface DashboardHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  activeTab: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  notifications,
  setNotifications,
  activeTab,
}) => {
  const { setCurrentView, setTempEmail } = useNavigation();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleNotifRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const handleSignOut = () => {
    setTempEmail('');
    setCurrentView('landing');
  };

  return (
    <header className="border-b border-white/5 bg-[#07070a]/30 backdrop-blur-md relative z-20 px-6 py-4 flex items-center justify-between">
      
      {/* Page Title & Search Bar */}
      <div className="flex items-center space-x-6 flex-1 max-w-xl">
        <h2 className="text-sm font-bold text-white capitalize hidden sm:block font-heading">
          {activeTab === 'overview' ? 'Studio Overview' : activeTab}
        </h2>
        
        {/* Search Input */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search templates, changelogs, logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/5 hover:border-white/10 rounded-xl text-xs text-white placeholder-slate-500 transition-all focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
          />
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center space-x-4">
        
        {/* Notification Bell Panel */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="Toggle notifications panel"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer relative"
          >
            <Bell className="h-4.5 w-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            )}
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
              <div className="absolute top-[125%] right-0 z-50 w-80 p-2 bg-[#09090c] border border-white/10 rounded-2xl shadow-2xl space-y-2 animate-fade-in text-left">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5">
                  <span className="text-xs font-bold text-white font-heading">Studio Alerts</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[10px] font-semibold text-violet-400 hover:text-violet-300 cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto space-y-1.5 pr-0.5">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500">No alerts today</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => toggleNotifRead(n.id)}
                        className={`p-2.5 rounded-xl border transition-colors cursor-pointer flex items-start space-x-2.5 ${
                          n.read 
                            ? 'bg-transparent border-transparent text-slate-500' 
                            : 'bg-white/5 border-white/5 text-slate-300'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${n.read ? 'bg-transparent' : 'bg-violet-400'}`} />
                        <div className="min-w-0">
                          <div className="text-[11px] font-bold truncate font-heading">{n.title}</div>
                          <div className="text-[10px] leading-relaxed text-slate-400 mt-0.5">{n.desc}</div>
                          <div className="text-[8px] text-slate-500 font-mono mt-1">{n.time}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            aria-label="Toggle profile details"
            className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase shadow shrink-0">
              A
            </div>
            <span className="text-xs text-slate-400 hidden sm:block font-medium">Admin</span>
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute top-[125%] right-0 z-50 w-48 p-1 bg-[#09090c] border border-white/10 rounded-xl shadow-2xl space-y-0.5 animate-fade-in text-left text-xs text-slate-300">
                <a href="#" className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors">
                  <User className="h-4 w-4 text-slate-400" />
                  <span>Profile Settings</span>
                </a>
                <a href="#" className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors">
                  <Settings className="h-4 w-4 text-slate-400" />
                  <span>Billing & Tier</span>
                </a>
                <a href="#" className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors border-t border-white/5">
                  <HelpCircle className="h-4 w-4 text-slate-400" />
                  <span>Help Docs</span>
                </a>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  <LogOut className="h-4 w-4 text-red-500/60" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
};
