import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Layers, Layout, Folder, Settings, FileText, CheckCircle2, ChevronRight, User } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { Button } from '../ui/Button';

export const Dashboard: React.FC = () => {
  const { setCurrentView, tempEmail, setTempEmail } = useNavigation();

  const handleSignOut = () => {
    setTempEmail('');
    setCurrentView('landing');
  };

  const drafts = [
    { title: "Q3 Product Announcement", type: "Newsletter", updated: "2 hours ago", status: "Draft" },
    { title: "INC-889 Database Failure Alert", type: "Incident Report", updated: "1 day ago", status: "Locked" },
    { title: "Acme Corp Subscription Invoice", type: "Invoice Sheet", updated: "3 days ago", status: "Sent" },
    { title: "August Benefits Enrollment Updates", type: "HR Notice", updated: "1 week ago", status: "Draft" }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navigation Header */}
      <header className="border-b border-white/5 bg-[#07070a]/60 backdrop-blur-md relative z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-premium flex items-center justify-center">
            <Layers className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-heading font-extrabold text-lg tracking-tight text-white">
            Comms<span className="text-violet-400">Flow</span>
            <span className="text-[10px] font-bold ml-1.5 px-2 py-0.5 rounded bg-violet-600/10 border border-violet-500/20 text-violet-400">STUDIO</span>
          </span>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
            <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
              {tempEmail ? tempEmail[0] : 'U'}
            </div>
            <span className="text-xs text-slate-300 truncate max-w-[150px] font-mono">
              {tempEmail || 'guest@company.com'}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center space-x-1.5 text-slate-400 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex relative z-10">
        
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-[#07070a]/30 hidden md:flex flex-col p-4 justify-between">
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Workspace</div>
              <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-white/5 text-white font-medium text-xs">
                <Layout className="h-4 w-4 text-violet-400" />
                <span>Documents Studio</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs">
                <Folder className="h-4 w-4" />
                <span>Templates Hub</span>
              </a>
            </div>

            <div className="space-y-1">
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Manage</div>
              <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs">
                <User className="h-4 w-4" />
                <span>Team Folder</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs">
                <Settings className="h-4 w-4" />
                <span>Studio Settings</span>
              </a>
            </div>
          </div>

          <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-center space-y-2">
            <div className="text-[10px] font-bold text-violet-400 font-heading">Pro Plan Active</div>
            <p className="text-[9px] text-slate-500">Enforcing Brand Lockdowns on all projects.</p>
          </div>
        </aside>

        {/* Dashboard Main Content Panel */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-6xl">
          
          {/* Welcome Alert */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-violet-600/10 border border-violet-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-violet-600/20 flex items-center justify-center shrink-0 text-violet-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white font-heading">Authentication Successful!</h2>
                <p className="text-xs text-slate-400">You are logged into the CommsFlow business communication studio mockup.</p>
              </div>
            </div>
            
            <button
              onClick={() => setCurrentView('landing')}
              className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-xs font-semibold self-start sm:self-center transition-colors cursor-pointer"
            >
              Return to Landing Page
            </button>
          </motion.div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-left">
            <div className="glass-card rounded-xl p-5 border border-white/5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Documents</span>
              <div className="text-2xl font-bold text-white mt-1 font-heading">18 drafts</div>
            </div>
            <div className="glass-card rounded-xl p-5 border border-white/5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lockdowns Enforced</span>
              <div className="text-2xl font-bold text-violet-400 mt-1 font-heading">Brand Guide v2.1</div>
            </div>
            <div className="glass-card rounded-xl p-5 border border-white/5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">API Sync Node</span>
              <div className="text-2xl font-bold text-green-400 mt-1 font-heading">Operational</div>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-extrabold text-base text-white">Recent Workspace Drafts</h3>
              <button className="text-xs text-violet-400 hover:text-violet-300 font-semibold cursor-pointer">
                View all drafts
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drafts.map((d) => (
                <div
                  key={d.title}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-violet-400 transition-colors">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-white transition-colors font-heading">{d.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">{d.type} • Updated {d.updated}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      d.status === 'Draft' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                      d.status === 'Locked' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' :
                      'bg-green-500/10 text-green-400 border border-green-500/20'
                    }`}>
                      {d.status}
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};
