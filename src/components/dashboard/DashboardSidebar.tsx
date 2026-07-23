import React, { useState } from 'react';
import { Layers, Layout, Folder, BarChart3, Clock, Settings, ChevronDown, LogOut, Check, Building2, ShieldCheck } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export type TabType = 'overview' | 'templates' | 'analytics' | 'activities' | 'settings';
export type WorkspaceType = 'marketing' | 'hr' | 'dev' | 'finance';

interface DashboardSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeWorkspace: WorkspaceType;
  setActiveWorkspace: (workspace: WorkspaceType) => void;
  brandLocked: boolean;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  setActiveTab,
  activeWorkspace,
  setActiveWorkspace,
  brandLocked,
}) => {
  const { setCurrentView, tempEmail, setTempEmail } = useNavigation();
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  const workspaces = [
    { id: 'marketing' as const, name: 'Marketing Hub', desc: 'Campaigns & Newsletters' },
    { id: 'hr' as const, name: 'HR & Legal', desc: 'Announcements & Policies' },
    { id: 'dev' as const, name: 'Engineering Docs', desc: 'Changelogs & Incidents' },
    { id: 'finance' as const, name: 'Finance & Billing', desc: 'Invoices & Quotations' },
  ];

  const currentWorkspaceInfo = workspaces.find(w => w.id === activeWorkspace) || workspaces[0];

  const menuItems = [
    { id: 'overview' as const, label: 'Overview', icon: <Layout className="h-4.5 w-4.5" /> },
    { id: 'templates' as const, label: 'Templates Hub', icon: <Folder className="h-4.5 w-4.5" /> },
    { id: 'analytics' as const, label: 'Analytics Reports', icon: <BarChart3 className="h-4.5 w-4.5" /> },
    { id: 'activities' as const, label: 'Activity Logs', icon: <Clock className="h-4.5 w-4.5" /> },
    { id: 'settings' as const, label: 'Studio Settings', icon: <Settings className="h-4.5 w-4.5" /> },
  ];

  const handleSignOut = () => {
    setTempEmail('');
    setCurrentView('landing');
  };

  return (
    <aside className="w-64 border-r border-white/5 bg-[#07070a]/40 backdrop-blur-md flex flex-col justify-between p-4 h-full relative z-30 shrink-0">
      <div className="space-y-6">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-2.5 px-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-premium flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Layers className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-heading font-extrabold text-base tracking-tight text-white flex items-center">
            Comms<span className="text-violet-400">Flow</span>
            <span className="text-[9px] font-bold ml-1.5 px-1.5 py-0.5 rounded bg-violet-600/10 border border-violet-500/20 text-violet-400">3.0</span>
          </span>
        </div>

        {/* Workspace Switcher */}
        <div className="relative">
          <button
            onClick={() => setWorkspaceOpen(!workspaceOpen)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 text-left transition-all hover:bg-white/10 cursor-pointer"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center shrink-0 text-violet-400">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate font-heading">{currentWorkspaceInfo.name}</div>
                <div className="text-[9px] text-slate-500 truncate">{currentWorkspaceInfo.desc}</div>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-500 shrink-0 ml-1" />
          </button>

          {/* Workspace dropdown list */}
          {workspaceOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setWorkspaceOpen(false)} />
              <div className="absolute top-[105%] left-0 right-0 z-50 p-1.5 bg-[#09090c] border border-white/10 rounded-xl shadow-2xl space-y-1 animate-fade-in">
                {workspaces.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => {
                      setActiveWorkspace(w.id);
                      setWorkspaceOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
                      activeWorkspace === w.id 
                        ? 'bg-violet-600/10 text-white' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold font-heading">{w.name}</div>
                      <div className="text-[9px] text-slate-500 truncate">{w.desc}</div>
                    </div>
                    {activeWorkspace === w.id && <Check className="h-4 w-4 text-violet-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Sidebar Nav Links */}
        <div className="space-y-1">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2 font-heading">Studio Console</div>
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-semibold text-xs text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/5 border border-white/5 text-white shadow shadow-violet-500/5'
                    : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={isActive ? 'text-violet-400' : 'text-slate-400'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Area: User details + Sign Out */}
      <div className="space-y-3">
        {brandLocked && (
          <div className="p-3 bg-violet-600/10 border border-violet-500/20 rounded-xl flex items-center space-x-2 text-violet-400">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <div className="text-[9.5px] leading-tight text-left">
              <span className="font-bold">Lockdown Active</span><br />
              <span className="text-slate-400">Admin forced styling guide</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-2.5 bg-white/5 border border-white/5 rounded-xl">
          <div className="flex items-center space-x-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase shrink-0">
              {tempEmail ? tempEmail[0] : 'U'}
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-white truncate font-heading">Active Administrator</div>
              <div className="text-[9px] text-slate-500 truncate font-mono">{tempEmail || 'admin@commsflow.ai'}</div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            aria-label="Logout button"
            className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
