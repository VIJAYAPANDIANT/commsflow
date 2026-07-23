import React, { useState } from 'react';
import { Search, ShieldAlert, ArrowDownCircle, Plus, Edit3 } from 'lucide-react';

export const ActivitiesTab: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'create' | 'edit' | 'export' | 'system'>('all');
  const [query, setQuery] = useState('');

  const fullLogs = [
    { id: "log-1", name: "Sarah Jenkins", email: "sarah@commsflow.ai", action: "locked global corporate color guidelines", target: "#7c3aed", time: "10 mins ago", type: "system" },
    { id: "log-2", name: "Alex Rivera", email: "alex@commsflow.ai", action: "exported incident changelog layout", target: "INC-889 Database Failure", time: "2 hours ago", type: "export" },
    { id: "log-3", name: "Marcus Vance", email: "marcus@commsflow.ai", action: "modified invoice billing calculations template", target: "Acme Corp Subscription Invoice", time: "1 day ago", type: "edit" },
    { id: "log-4", name: "Elena Rostova", email: "elena@commsflow.ai", action: "created announcement visual section block", target: "Summer Benefits Guide", time: "2 days ago", type: "create" },
    { id: "log-5", name: "Sarah Jenkins", email: "sarah@commsflow.ai", action: "invited new contributor", target: "marcus@commsflow.ai", time: "3 days ago", type: "system" },
    { id: "log-6", name: "Alex Rivera", email: "alex@commsflow.ai", action: "deleted draft block library", target: "Old Footer V1", time: "5 days ago", type: "edit" },
    { id: "log-7", name: "Elena Rostova", email: "elena@commsflow.ai", action: "exported newsletter HTML content", target: "Q3 Release Notes", time: "1 week ago", type: "export" },
  ];

  const filteredLogs = fullLogs.filter(log => {
    const matchesType = filterType === 'all' || log.type === filterType;
    const matchesSearch = log.name.toLowerCase().includes(query.toLowerCase()) || 
                          log.action.toLowerCase().includes(query.toLowerCase()) ||
                          log.target.toLowerCase().includes(query.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'create': return <Plus className="h-4 w-4 text-green-400" />;
      case 'edit': return <Edit3 className="h-4 w-4 text-violet-400" />;
      case 'export': return <ArrowDownCircle className="h-4 w-4 text-cyan-400" />;
      default: return <ShieldAlert className="h-4 w-4 text-red-400" />;
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">Activity Logs</h2>
          <p className="text-xs text-slate-500 mt-1">Audit trail of workspace edits, guidelines lockdowns, and document exports</p>
        </div>
      </div>

      {/* Control Filters bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Type selector */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all' as const, label: 'All Activities' },
            { id: 'create' as const, label: 'Creation' },
            { id: 'edit' as const, label: 'Edits' },
            { id: 'export' as const, label: 'Exports' },
            { id: 'system' as const, label: 'System Defaults' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer shrink-0 ${
                filterType === type.id
                  ? 'bg-white/5 border-violet-500/30 text-white shadow shadow-violet-500/5'
                  : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Local Search input */}
        <div className="relative max-w-xs w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Filter logs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>

      </div>

      {/* Logs Feed Container */}
      {filteredLogs.length === 0 ? (
        <div className="p-16 rounded-2xl bg-[#09090c]/40 border border-white/5 border-dashed text-center text-xs text-slate-500">
          No audit history matches your filter criteria.
        </div>
      ) : (
        <div className="glass-card rounded-2xl border border-white/5 bg-[#09090c]/30 overflow-hidden divide-y divide-white/5">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors"
            >
              {/* Left description */}
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  {getLogIcon(log.type)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-slate-200">
                    <strong className="text-white">{log.name}</strong> <span className="text-slate-400 font-mono text-[10px]">({log.email})</span> {log.action}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-1">
                    Target: <span className="text-violet-400 font-medium">{log.target}</span>
                  </div>
                </div>
              </div>

              {/* Right date/type */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 text-right">
                <span className="text-[9px] text-slate-500 font-mono">{log.time}</span>
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                  log.type === 'system' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  log.type === 'export' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                  log.type === 'edit' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' :
                  'bg-green-500/10 text-green-400 border border-green-500/20'
                }`}>
                  {log.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
