import React from 'react';
import { Plus, ScrollText, Pin, Star, FileText, UserPlus, Lock } from 'lucide-react';
import type { TabType, WorkspaceType } from './DashboardSidebar';

export interface TemplateItem {
  id: string;
  title: string;
  category: 'email' | 'document' | 'incident' | 'billing';
  updated: string;
  pinned: boolean;
  favorite: boolean;
  workspace: WorkspaceType;
}

interface OverviewTabProps {
  setActiveTab: (tab: TabType) => void;
  templates: TemplateItem[];
  togglePin: (id: string) => void;
  toggleFavorite: (id: string) => void;
  workspace: WorkspaceType;
  searchQuery: string;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  setActiveTab,
  templates,
  togglePin,
  toggleFavorite,
  workspace,
  searchQuery,
}) => {
  // Filter templates based on active workspace and search query
  const filteredTemplates = templates.filter(t => {
    const matchesWorkspace = t.workspace === workspace;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWorkspace && matchesSearch;
  });

  const pinnedTemplates = filteredTemplates.filter(t => t.pinned);
  const favoriteTemplates = filteredTemplates.filter(t => t.favorite && !t.pinned); // Don't duplicate in grids

  const activities = [
    { name: "Sarah Jenkins", action: "locked brand colors", target: "Workspace Styles", time: "10 mins ago", type: "system" },
    { name: "Alex Rivera", action: "exported incident report", target: "INC-889", time: "2 hours ago", type: "export" },
    { name: "Marcus Vance", action: "modified template", target: "Acme Corp Invoice", time: "1 day ago", type: "edit" },
    { name: "Elena Rostova", action: "created new document", target: "Summer Benefit Notice", time: "2 days ago", type: "create" },
  ];

  return (
    <div className="space-y-8 text-left animate-fade-in">
      
      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Deliveries Card */}
        <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#09090c]/40 relative overflow-hidden flex flex-col justify-between h-40">
          <div>
            <div className="flex items-center justify-between text-slate-500 font-bold text-[10px] uppercase tracking-wider">
              <span>Total Deliveries</span>
              <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded text-[8px]">+12.4%</span>
            </div>
            <div className="text-2xl font-heading font-extrabold text-white mt-2">184,290</div>
            <p className="text-[10px] text-slate-500 mt-1">Processed templates delivery nodes</p>
          </div>
          {/* Mini Sparkline Area Chart */}
          <div className="w-full h-12">
            <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-deliv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,20 Q10,12 20,15 T40,8 T60,11 T80,4 T100,6 L100,20 L0,20 Z" fill="url(#gradient-deliv)" />
              <path d="M0,20 Q10,12 20,15 T40,8 T60,11 T80,4 T100,6" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Avg Open Rate Card */}
        <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#09090c]/40 relative overflow-hidden flex flex-col justify-between h-40">
          <div>
            <div className="flex items-center justify-between text-slate-500 font-bold text-[10px] uppercase tracking-wider">
              <span>Avg Open Rate</span>
              <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded text-[8px]">+2.1%</span>
            </div>
            <div className="text-2xl font-heading font-extrabold text-white mt-2">68.2%</div>
            <p className="text-[10px] text-slate-500 mt-1">Across all delivery endpoints</p>
          </div>
          {/* Mini Sparkline Area Chart */}
          <div className="w-full h-12">
            <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-open" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,18 Q15,12 30,14 T60,8 T85,12 T100,4 L100,20 L0,20 Z" fill="url(#gradient-open)" />
              <path d="M0,18 Q15,12 30,14 T60,8 T85,12 T100,4" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Active Templates Card */}
        <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#09090c]/40 relative overflow-hidden flex flex-col justify-between h-40">
          <div>
            <div className="flex items-center justify-between text-slate-500 font-bold text-[10px] uppercase tracking-wider">
              <span>Active Templates</span>
              <span className="text-violet-400 bg-violet-500/10 border border-violet-500/20 px-1.5 py-0.5 rounded text-[8px]">Brand Locked</span>
            </div>
            <div className="text-2xl font-heading font-extrabold text-white mt-2">{filteredTemplates.length} / 120</div>
            <p className="text-[10px] text-slate-500 mt-1">Total visual layouts in current workspace</p>
          </div>
          {/* Mini Sparkline Area Chart */}
          <div className="w-full h-12">
            <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-temp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,15 Q20,15 40,11 T70,8 T100,5 L100,20 L0,20 Z" fill="url(#gradient-temp)" />
              <path d="M0,15 Q20,15 40,11 T70,8 T100,5" fill="none" stroke="#6366f1" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

      </div>

      {/* Quick Actions & Recent Activities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Quick Actions (Left) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1 font-heading">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3.5">
            <button
              onClick={() => setActiveTab('templates')}
              className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-xl hover:border-violet-500/30 hover:bg-white/10 transition-all text-center space-y-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Plus className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-300">Create Template</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-xl hover:border-violet-500/30 hover:bg-white/10 transition-all text-center space-y-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Lock className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-300">Lock Brand color</span>
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-xl hover:border-violet-500/30 hover:bg-white/10 transition-all text-center space-y-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <ScrollText className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-300">View Logs</span>
            </button>
            <button
              className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-xl hover:border-violet-500/30 hover:bg-white/10 transition-all text-center space-y-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <UserPlus className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-300">Invite Member</span>
            </button>
          </div>
        </div>

        {/* Recent Activities (Right) */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1 font-heading">Recent Activities</h3>
          <div className="glass-card rounded-2xl border border-white/5 bg-[#09090c]/40 p-5 divide-y divide-white/5 space-y-3.5">
            {activities.map((a, i) => (
              <div key={i} className={`flex items-start justify-between ${i > 0 ? 'pt-3.5' : ''}`}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase">
                    {a.name[0]}
                  </div>
                  <div>
                    <div className="text-xs text-slate-300">
                      <strong className="text-white">{a.name}</strong> {a.action} <span className="text-violet-400 font-medium">{a.target}</span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono">{a.time}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                  a.type === 'system' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  a.type === 'export' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                  'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                }`}>
                  {a.type}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Templates Lists Sections */}
      <div className="space-y-6">
        
        {/* Pinned Templates Row */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-slate-500">
            <Pin className="h-4 w-4 text-violet-400" />
            <h3 className="text-xs font-bold uppercase tracking-widest font-heading">Pinned Templates</h3>
          </div>
          
          {pinnedTemplates.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 border-dashed text-center text-xs text-slate-500">
              No pinned templates in this workspace. Pin items below for quick access.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pinnedTemplates.map((temp) => (
                <div key={temp.id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between group">
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-violet-400 transition-colors shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-white transition-colors font-heading">{temp.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 capitalize">{temp.category} • {temp.updated}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1 shrink-0">
                    <button
                      onClick={() => togglePin(temp.id)}
                      aria-label="Pin template button"
                      className="p-1.5 rounded-md hover:bg-white/5 text-violet-400 hover:text-slate-300 transition-all cursor-pointer"
                    >
                      <Pin className="h-3.5 w-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(temp.id)}
                      aria-label="Favorite template button"
                      className={`p-1.5 rounded-md hover:bg-white/5 transition-all cursor-pointer ${
                        temp.favorite ? 'text-yellow-500 hover:text-slate-300' : 'text-slate-500 hover:text-yellow-500'
                      }`}
                    >
                      <Star className={`h-3.5 w-3.5 ${temp.favorite ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Favorite Templates Row */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-slate-500">
            <Star className="h-4 w-4 text-yellow-500" />
            <h3 className="text-xs font-bold uppercase tracking-widest font-heading">Favorite Templates</h3>
          </div>

          {favoriteTemplates.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 border-dashed text-center text-xs text-slate-500">
              No starred templates. Click the star icon on templates to highlight them here.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteTemplates.map((temp) => (
                <div key={temp.id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between group">
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-violet-400 transition-colors shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-white transition-colors font-heading">{temp.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 capitalize">{temp.category} • {temp.updated}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1 shrink-0">
                    <button
                      onClick={() => togglePin(temp.id)}
                      aria-label="Pin template button"
                      className={`p-1.5 rounded-md hover:bg-white/5 transition-all cursor-pointer ${
                        temp.pinned ? 'text-violet-400 hover:text-slate-300' : 'text-slate-500 hover:text-violet-400'
                      }`}
                    >
                      <Pin className={`h-3.5 w-3.5 ${temp.pinned ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => toggleFavorite(temp.id)}
                      aria-label="Favorite template button"
                      className="p-1.5 rounded-md hover:bg-white/5 text-yellow-500 hover:text-slate-300 transition-all cursor-pointer"
                    >
                      <Star className="h-3.5 w-3.5 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
