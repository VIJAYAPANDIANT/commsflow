import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, TrendingUp, Check, X, 
  ArrowUpRight, ArrowDownRight, CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/Button';

type SubTab = 'overview' | 'templates' | 'departments' | 'communication' | 'timeline';

interface PopularTemplate {
  title: string;
  category: string;
  uses: number;
  openRate: string;
  trend: 'up' | 'down';
  score: string;
}

export const AnalyticsTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('overview');
  const [exportOpen, setExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'json'>('csv');
  const [exporting, setExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);

  const stats = [
    { label: "Total Deliveries", value: "184,290", change: "+12.4%", trend: "up" },
    { label: "Avg Open Rate", value: "68.2%", change: "+2.1%", trend: "up" },
    { label: "Bounce Ratio", value: "0.14%", change: "-0.08%", trend: "down" },
    { label: "Unsubscribe Rate", value: "0.45%", change: "-0.02%", trend: "down" },
  ];

  const popularTemplates: PopularTemplate[] = [
    { title: "INC-901 Incident Resolution", category: "Incident Report", uses: 48, openRate: "97.5%", trend: "up", score: "98/100" },
    { title: "Release Notes V3.0", category: "Release Notes", uses: 42, openRate: "94.2%", trend: "up", score: "96/100" },
    { title: "Monthly Subscription Invoice", category: "Invoice", uses: 38, openRate: "88.7%", trend: "down", score: "91/100" },
    { title: "Senior Engineer Offer Letter", category: "Offer Letter", uses: 24, openRate: "92.0%", trend: "up", score: "93/100" },
    { title: "Weekly Engagement Newsletter", category: "Newsletter", uses: 15, openRate: "64.1%", trend: "down", score: "82/100" },
  ];

  const departmentUsage = [
    { name: "Engineering Hub", count: 18, deliveries: "52,000", pct: 30, color: "bg-blue-500" },
    { name: "Marketing Hub", count: 12, deliveries: "84,290", pct: 40, color: "bg-violet-500" },
    { name: "HR & Legal", count: 8, deliveries: "42,000", pct: 15, color: "bg-pink-500" },
    { name: "Finance & Billing", count: 5, deliveries: "6,000", pct: 15, color: "bg-emerald-500" },
  ];

  const timelineEvents = [
    { title: "Export Pipeline Completed", desc: "Alex R. exported 'INC-901 Incident' to HubSpot webhook.", time: "10 mins ago", type: "export" },
    { title: "Brand color lockdown enforced", desc: "Settings modified: restrict accent swatches to approved kit.", time: "2 hours ago", type: "system" },
    { title: "Template Duplicated", desc: "Elena R. cloned 'Monthly Subscription Invoice' layout.", time: "1 day ago", type: "edit" },
    { title: "New Document Approved", desc: "Jane D. created 'Senior Engineer Offer Letter' template.", time: "2 days ago", type: "create" },
    { title: "System Updates Logged", desc: "Deliveries volume node cleared 12,000 billing outputs.", time: "3 days ago", type: "system" },
  ];

  const handleExportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExporting(true);
    setExportDone(false);

    setTimeout(() => {
      setExporting(false);
      setExportDone(true);
      setTimeout(() => {
        setExportDone(false);
        setExportOpen(false);
      }, 1500);
    }, 2000);
  };

  const renderActiveSubContent = () => {
    switch (activeSubTab) {
      case 'templates':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-heading">Popular Templates Performance</h3>
              <span className="text-[10px] text-slate-500 font-mono">Sorted by usage counts</span>
            </div>

            <div className="glass-card rounded-2xl border border-white/5 bg-[#09090c]/40 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/5 text-slate-300 font-bold font-heading">
                  <tr>
                    <th className="p-4">Template Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-center">Uses This Month</th>
                    <th className="p-4 text-right">Avg Open Rate</th>
                    <th className="p-4 text-right">Health Score</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400 divide-y divide-white/5">
                  {popularTemplates.map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-white font-heading">{row.title}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[8.5px] font-bold uppercase tracking-wider bg-violet-600/10 border border-violet-500/20 text-violet-400">
                          {row.category}
                        </span>
                      </td>
                      <td className="p-4 text-center font-mono">{row.uses} times</td>
                      <td className="p-4 text-right font-mono flex items-center justify-end space-x-1.5">
                        <span>{row.openRate}</span>
                        {row.trend === 'up' ? (
                          <ArrowUpRight className="h-3.5 w-3.5 text-green-400" />
                        ) : (
                          <ArrowDownRight className="h-3.5 w-3.5 text-red-400" />
                        )}
                      </td>
                      <td className="p-4 text-right text-violet-400 font-bold">{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'departments':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Donut Chart (Left) */}
            <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-white/5 bg-[#09090c]/25 flex flex-col items-center justify-center space-y-6">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Donut Usage Allocation</h3>
              
              {/* Custom SVG Donut Chart */}
              <div className="relative w-44 h-44">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle cx="50" cy="50" r="35" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="10" />
                  
                  {/* Marketing: 40% (dasharray = 88, offset = 0) */}
                  <circle 
                    cx="50" cy="50" r="35" fill="transparent" 
                    stroke="#8b5cf6" strokeWidth="10" 
                    strokeDasharray="88 220" strokeDashoffset="0"
                  />
                  {/* Engineering: 30% (dasharray = 66, offset = -88) */}
                  <circle 
                    cx="50" cy="50" r="35" fill="transparent" 
                    stroke="#3b82f6" strokeWidth="10" 
                    strokeDasharray="66 220" strokeDashoffset="-88"
                  />
                  {/* HR: 15% (dasharray = 33, offset = -154) */}
                  <circle 
                    cx="50" cy="50" r="35" fill="transparent" 
                    stroke="#ec4899" strokeWidth="10" 
                    strokeDasharray="33 220" strokeDashoffset="-154"
                  />
                  {/* Finance: 15% (dasharray = 33, offset = -187) */}
                  <circle 
                    cx="50" cy="50" r="35" fill="transparent" 
                    stroke="#10b981" strokeWidth="10" 
                    strokeDasharray="33 220" strokeDashoffset="-187"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-extrabold text-white font-heading">6 Depts</span>
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest mt-0.5">Workspace</span>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[10px] text-slate-400">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded bg-violet-500" />
                  <span>Marketing (40%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded bg-blue-500" />
                  <span>Engineering (30%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded bg-pink-500" />
                  <span>HR & Legal (15%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                  <span>Finance (15%)</span>
                </div>
              </div>
            </div>

            {/* Department usage lists (Right) */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1 font-heading">Department activity detail</h3>
              <div className="glass-card rounded-2xl border border-white/5 bg-[#09090c]/40 p-5 space-y-4">
                {departmentUsage.map((dept, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 font-bold text-white font-heading">
                        <span className={`w-1.5 h-1.5 rounded-full ${dept.color}`} />
                        <span>{dept.name}</span>
                      </div>
                      <span className="text-slate-500 font-mono">{dept.deliveries} deliveries ({dept.pct}%)</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${dept.color}`}
                        style={{ width: `${dept.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'communication':
        return (
          <div className="space-y-8 animate-fade-in text-left">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1 font-heading">Communication statistics ratio</h3>
            
            {/* SVG Line Graph comparing Open vs Click ratios */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#09090c]/25 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-heading">Weekly Open vs Click Rate (Average)</span>
                <div className="flex space-x-4 text-[9px] font-bold">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-1 bg-cyan-400 rounded" />
                    <span className="text-slate-400">Open Rate (68.2%)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-1 bg-violet-500 rounded" />
                    <span className="text-slate-400">Click Rate (24.1%)</span>
                  </div>
                </div>
              </div>

              <div className="h-48 relative flex flex-col justify-between pt-4">
                <svg className="w-full h-32 mt-4" viewBox="0 0 100 30" preserveAspectRatio="none">
                  {/* Open Rate Line (Cyan) */}
                  <path d="M0,20 Q20,15 40,8 T70,12 T100,3" fill="none" stroke="#06b6d4" strokeWidth="1.2" />
                  {/* Click Rate Line (Violet) */}
                  <path d="M0,28 Q20,24 40,19 T70,22 T100,14" fill="none" stroke="#8b5cf6" strokeWidth="1.2" />
                  
                  {/* dots */}
                  <circle cx="40" cy="8" r="0.8" fill="#ffffff" />
                  <circle cx="40" cy="19" r="0.8" fill="#ffffff" />
                </svg>
                
                <div className="flex justify-between text-[9px] font-bold text-slate-500 font-heading px-1">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                </div>
              </div>
            </div>

            {/* Additional comms variables */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs">
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Spam Complaint Index</div>
                <div className="text-xl font-extrabold text-white mt-1.5 font-heading">0.02%</div>
                <p className="text-[9px] text-green-400 mt-1">Excellent (limit: 0.1%)</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Inbox Placement Rate</div>
                <div className="text-xl font-extrabold text-white mt-1.5 font-heading">99.6%</div>
                <p className="text-[9px] text-green-400 mt-1">Verified on 24 servers</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Avg Response Latency</div>
                <div className="text-xl font-extrabold text-white mt-1.5 font-heading">45ms</div>
                <p className="text-[9px] text-slate-500 mt-1">SMTP edge delivery node</p>
              </div>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-6 max-w-xl mx-auto text-left animate-fade-in">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1 font-heading">Recent activity history</h3>
            
            <div className="relative pl-6 border-l border-white/5 space-y-6">
              {timelineEvents.map((ev, i) => (
                <div key={i} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full bg-violet-500 border border-[#030303] shadow" />
                  
                  <div className="glass-card rounded-xl p-4 border border-white/5 bg-[#09090c]/40 space-y-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-100 font-heading">{ev.title}</h4>
                      <span className="text-[9px] text-slate-500 font-mono">{ev.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'overview':
      default:
        return (
          <div className="space-y-8 animate-fade-in text-left">
            {/* Monthly Activity volume chart */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#09090c]/25 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2 font-heading">
                  <TrendingUp className="h-4.5 w-4.5 text-violet-400" />
                  <span>Monthly Deliveries Activity</span>
                </h3>
                <span className="text-[9px] font-bold text-slate-500">Jan - Jun 2026</span>
              </div>

              {/* Area graph */}
              <div className="h-48 relative flex flex-col justify-between pt-4">
                <svg className="w-full h-32 mt-4" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient-deliv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,20 Q10,12 20,15 T40,8 T60,11 T80,4 T100,6 L100,20 L0,20 Z" fill="url(#gradient-deliv)" />
                  <path d="M0,20 Q10,12 20,15 T40,8 T60,11 T80,4 T100,6" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
                </svg>
                <div className="flex justify-between text-[9px] font-bold text-slate-500 font-heading px-1">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>

            {/* General performance score index */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl p-5 border border-white/5 bg-[#09090c]/40 flex items-center justify-between">
                <div>
                  <h4 className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Templates Usage Score</h4>
                  <div className="text-xl font-heading font-extrabold text-white mt-1.5">94.2 / 100</div>
                  <p className="text-[9.5px] text-slate-400 mt-0.5">Top performing workspace overall</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 font-heading font-extrabold text-xs">
                  94
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-white/5 bg-[#09090c]/40 flex items-center justify-between">
                <div>
                  <h4 className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">SMTP Deliverability</h4>
                  <div className="text-xl font-heading font-extrabold text-white mt-1.5">99.86%</div>
                  <p className="text-[9.5px] text-slate-400 mt-0.5">Clearing bounces nodes logs</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-600/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0 font-heading font-extrabold text-xs">
                  A+
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      
      {/* Title & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">Analytics Center</h2>
          <p className="text-xs text-slate-500 mt-1">Real-time template delivery metrics, engagement ratios, and bounce scores</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExportOpen(true)}
          className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[10px]"
        >
          <Download className="h-4 w-4" />
          <span>Export Analytics</span>
        </Button>
      </div>

      {/* Stats Cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 border border-white/5 bg-[#09090c]/45">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{s.label}</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xl font-heading font-extrabold text-white">{s.value}</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                s.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
              }`}>{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sub tabs navigation */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1 border-b border-white/5">
        {[
          { id: 'overview' as const, label: 'Overview' },
          { id: 'templates' as const, label: 'Templates Used' },
          { id: 'departments' as const, label: 'Department Usage' },
          { id: 'communication' as const, label: 'Communication Stats' },
          { id: 'timeline' as const, label: 'Activity Timeline' },
        ].map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'border-violet-500 text-white'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Render active sub content */}
      <div className="pt-2">
        {renderActiveSubContent()}
      </div>

      {/* --- OVERLAYS REGISTRY --- */}

      <AnimatePresence>
        
        {/* EXPORT DIALOG MODAL */}
        {exportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="fixed inset-0 bg-[#030303]/80 backdrop-blur-sm" onClick={() => setExportOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md relative z-10 glass-card rounded-2xl border border-white/10 p-6 md:p-8 bg-[#09090c] shadow-2xl space-y-6 text-left"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center space-x-2">
                  <Download className="h-4.5 w-4.5 text-violet-400" />
                  <h3 className="text-sm font-bold text-white font-heading">Export Reports</h3>
                </div>
                <button
                  onClick={() => setExportOpen(false)}
                  className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {exportDone ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-green-400 mx-auto animate-bounce" />
                  <h4 className="text-xs font-bold text-white font-heading">Report Download Started</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs mx-auto">
                    CSV analytics summaries compiled and downloading successfully.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleExportSubmit} className="space-y-4">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Select target pipeline to compile active metrics, department allocation donut logs, and templates usage scores:
                  </p>

                  <div className="space-y-2.5">
                    {[
                      { id: 'csv' as const, label: 'Standard CSV Ledger', desc: 'Raw rows suitable for Excel audits.' },
                      { id: 'pdf' as const, label: 'Executive PDF Summary', desc: 'Vector layout report charts ready for print.' },
                      { id: 'json' as const, label: 'Raw JSON Stream', desc: 'Structured logs payload for server API inputs.' }
                    ].map((fmt) => (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => setExportFormat(fmt.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border text-left cursor-pointer ${
                          exportFormat === fmt.id
                            ? 'bg-violet-600/10 border-violet-500 text-white'
                            : 'bg-transparent border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold font-heading">{fmt.label}</div>
                          <div className="text-[9px] text-slate-500">{fmt.desc}</div>
                        </div>
                        {exportFormat === fmt.id && <Check className="h-3.5 w-3.5 text-violet-400 shrink-0" />}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-3 pt-3 border-t border-white/5">
                    <Button variant="outline" size="sm" type="button" onClick={() => setExportOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      disabled={exporting}
                      className="flex items-center space-x-1.5"
                    >
                      {exporting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                          <span>Generating Report...</span>
                        </>
                      ) : (
                        <span>Generate & Export</span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}

      </AnimatePresence>

    </div>
  );
};
