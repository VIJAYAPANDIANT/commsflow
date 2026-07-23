import React from 'react';
import { BarChart, LineChart } from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const stats = [
    { label: "Delivery Volume", value: "184,290", change: "+12.4%", trend: "up" },
    { label: "Avg Open Rate", value: "68.2%", change: "+2.1%", trend: "up" },
    { label: "Bounce Rate", value: "0.14%", change: "-0.08%", trend: "down" },
    { label: "Unsubscribe Rate", value: "0.45%", change: "-0.02%", trend: "down" },
  ];

  const tableData = [
    { dept: "Marketing & Campaigns", templates: 12, deliveries: "84,290", score: "94/100" },
    { dept: "HR & Communications", templates: 8, deliveries: "42,000", score: "89/100" },
    { dept: "Engineering Logs & Alerts", templates: 15, deliveries: "52,000", score: "97/100" },
    { dept: "Finance Billing Ops", templates: 5, deliveries: "6,000", score: "91/100" },
  ];

  return (
    <div className="space-y-8 text-left animate-fade-in">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white font-heading">Analytics Reports</h2>
        <p className="text-xs text-slate-500 mt-1">Real-time template delivery metrics, engagement ratios, and bounce scores</p>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 border border-white/5 bg-[#09090c]/40">
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

      {/* Graphical Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Delivery Volumes (SVG Bar Chart) */}
        <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#09090c]/25 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2 font-heading">
              <BarChart className="h-4 w-4 text-violet-400" />
              <span>Monthly Delivery Volume</span>
            </h3>
            <span className="text-[9px] font-bold text-slate-500">Last 6 Months</span>
          </div>

          <div className="h-48 flex items-end justify-between px-2 pt-4 relative">
            {/* Chart Grid Lines */}
            <div className="absolute inset-x-0 top-4 border-t border-white/5" />
            <div className="absolute inset-x-0 top-16 border-t border-white/5" />
            <div className="absolute inset-x-0 top-28 border-t border-white/5" />
            
            {/* Bars */}
            {[
              { month: "Jan", val: "30%", height: "h-[30%]", amount: "32K" },
              { month: "Feb", val: "45%", height: "h-[45%]", amount: "48K" },
              { month: "Mar", val: "70%", height: "h-[70%]", amount: "75K" },
              { month: "Apr", val: "55%", height: "h-[55%]", amount: "58K" },
              { month: "May", val: "85%", height: "h-[85%]", amount: "91K" },
              { month: "Jun", val: "100%", height: "h-[100%]", amount: "108K" },
            ].map((bar, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 w-12 group z-10">
                <span className="text-[8px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.amount}
                </span>
                <div className="w-6 bg-white/5 border border-white/5 hover:border-violet-500/40 hover:bg-violet-600/20 rounded-t transition-all flex items-end justify-center relative overflow-hidden h-32">
                  <div className={`w-full bg-gradient-premium rounded-t ${bar.height} transition-all duration-1000`} />
                </div>
                <span className="text-[9px] font-bold text-slate-400 font-heading">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Trends (SVG Line Chart) */}
        <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#09090c]/25 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2 font-heading">
              <LineChart className="h-4 w-4 text-cyan-400" />
              <span>Avg Open Rates Trend</span>
            </h3>
            <span className="text-[9px] font-bold text-slate-500">Weekly Tracker</span>
          </div>

          <div className="h-48 relative flex flex-col justify-between pt-4">
            {/* Grid background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

            {/* SVG Line path */}
            <svg className="w-full h-32 mt-4" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-line" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Fill path */}
              <path d="M0,25 Q15,20 30,12 T60,18 T85,5 T100,2 L100,30 L0,30 Z" fill="url(#gradient-line)" />
              {/* Stroke line */}
              <path d="M0,25 Q15,20 30,12 T60,18 T85,5 T100,2" fill="none" stroke="#06b6d4" strokeWidth="1.2" />
              
              {/* Highlight dots */}
              <circle cx="30" cy="12" r="1" fill="#ffffff" />
              <circle cx="85" cy="5" r="1" fill="#ffffff" />
            </svg>
            
            <div className="flex justify-between text-[9px] font-bold text-slate-500 font-heading px-1">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </div>

      </div>

      {/* Comparative Table report */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1 font-heading">Workspace Performance metrics</h3>
        <div className="glass-card rounded-2xl border border-white/5 bg-[#09090c]/40 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/5 text-slate-300 font-bold font-heading">
              <tr>
                <th className="p-4">Department / Workspace</th>
                <th className="p-4 text-center">Active Layouts</th>
                <th className="p-4 text-right">Deliveries Executed</th>
                <th className="p-4 text-right">Performance Score</th>
              </tr>
            </thead>
            <tbody className="text-slate-400 divide-y divide-white/5">
              {tableData.map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-white font-heading">{row.dept}</td>
                  <td className="p-4 text-center">{row.templates} layouts</td>
                  <td className="p-4 text-right font-mono">{row.deliveries}</td>
                  <td className="p-4 text-right text-violet-400 font-bold">{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
