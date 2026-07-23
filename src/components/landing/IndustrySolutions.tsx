import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Code, LineChart, BadgeDollarSign, ArrowRight, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';

interface SolutionTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  problem: string;
  solution: string;
  bullets: string[];
  mockup: React.ReactNode;
}

export const IndustrySolutions: React.FC = () => {
  const { setCurrentView } = useNavigation();
  const [activeTab, setActiveTab] = useState('hr');

  const tabs: SolutionTab[] = [
    {
      id: 'hr',
      label: 'HR & Ops',
      icon: <Users className="h-4 w-4" />,
      title: 'Streamline Employee Engagement & Alerts',
      problem: 'Internal announcements feel cold and fragmented across emails, PDFs, and Slack. Styling is inconsistent and branding gets diluted.',
      solution: 'HR teams can design interactive company newsletters, benefits brochures, and policy announcements visually, exporting them directly to email lists or team chats.',
      bullets: [
        'Interactive news feeds & newsletters',
        'Rich media embeds (video, galleries)',
        'Built-in corporate styling & templates',
        'Direct exporting to Outlook, Gmail, & Slack'
      ],
      mockup: (
        <div className="w-full h-full bg-[#0d0d11] rounded-lg p-5 border border-white/5 flex flex-col space-y-4 text-left">
          <div className="flex items-center space-x-2 border-b border-white/5 pb-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
            <span className="text-[10px] font-bold text-slate-300 uppercase font-heading">Internal Announcement</span>
          </div>
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-white font-heading">Welcome to our Q3 Studio Workspace!</h4>
            <p className="text-[11px] text-slate-400">We are transitioning all internal updates to CommsFlow. Here is what is changing this quarter...</p>
          </div>
          <div className="p-3 bg-white/5 border border-white/5 rounded-lg flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[10px] font-semibold text-white">New Health Benefits Guide</div>
              <div className="text-[9px] text-slate-500">PDF Document • 4.2 MB</div>
            </div>
            <div className="px-2.5 py-1 bg-violet-600 rounded text-[9px] text-white font-medium">Download</div>
          </div>
          <div className="pt-2 flex justify-between items-center text-[9px] text-slate-500">
            <span>Sender: HR Operations Team</span>
            <span>Est. read: 3 mins</span>
          </div>
        </div>
      )
    },
    {
      id: 'dev',
      label: 'Developers',
      icon: <Code className="h-4 w-4" />,
      title: 'Automate Incident Reports & Release Notes',
      problem: 'Writing release notes in text files leads to boring user communications, and styling system alerts in raw code takes too much dev time.',
      solution: 'Devs can use pre-built templates for incident updates and product changelogs, keeping technical writing visually aligned with the rest of the company.',
      bullets: [
        'Markdown and JSON data-bind support',
        'Beautiful code blocks & system status badges',
        'Automated CI/CD webhook exports',
        'API-driven delivery integrations'
      ],
      mockup: (
        <div className="w-full h-full bg-[#0b0c10] rounded-lg p-5 border border-white/5 flex flex-col space-y-3.5 text-left font-mono">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[9px] text-yellow-400 font-bold uppercase">• Incident Report [RESOLVED]</span>
            <span className="text-[9px] text-slate-500">API-v2</span>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] text-slate-300 font-bold">CRITICAL: Database Replication Lag</div>
            <p className="text-[10px] text-slate-400 font-sans">
              Our automated replica lag exceeded 2000ms. Operations executed failover cleanly. No data loss reported.
            </p>
          </div>
          <div className="p-2 bg-slate-950 rounded border border-white/5 text-[9px] text-slate-300 overflow-x-auto">
            <code>{`{
  "status": "resolved",
  "incident_id": "INC-883",
  "duration": "14m 22s"
}`}</code>
          </div>
          <div className="text-[9px] text-slate-500 font-sans text-right">
            System status: 100% operational
          </div>
        </div>
      )
    },
    {
      id: 'marketing',
      label: 'Marketing & Sales',
      icon: <LineChart className="h-4 w-4" />,
      title: 'Launch Campaigns & Newsletters Visually',
      problem: 'Relying on developers to code email newsletters slows down market reactivity. Heavy HTML code breaks on Outlook and mobile screens.',
      solution: 'Marketers drag-and-drop elements on a responsive visual builder that automatically writes clean, Outlook-compatible HTML code.',
      bullets: [
        'Vibrant CTA button elements',
        'Mobile responsiveness auto-validation',
        'Clean, non-bloated output HTML',
        'Seamless integration with SendGrid & HubSpot'
      ],
      mockup: (
        <div className="w-full h-full bg-[#0d0d11] rounded-lg p-5 border border-white/5 flex flex-col space-y-4 text-left">
          <div className="h-24 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="z-10 text-center text-white space-y-0.5">
              <h4 className="text-xs font-bold uppercase tracking-wider font-heading">Summer Release Event</h4>
              <p className="text-[9px] text-violet-200">Join the live broadcast next Tuesday</p>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white font-heading">Exclusive Premium Access</h4>
            <p className="text-[10px] text-slate-400">Sign up today and receive priority credits for our upcoming AI designer feature.</p>
          </div>
          <div className="flex justify-center">
            <div className="px-5 py-1.5 bg-white text-black font-bold rounded text-[9px] text-center shadow hover:bg-slate-200">
              RSVP For Free
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'finance',
      label: 'Finance & Ops',
      icon: <BadgeDollarSign className="h-4 w-4" />,
      title: 'Professional Invoices & Quotations',
      problem: 'Sending raw PDF templates or Excel invoice exports looks unprofessional and doesn\'t establish strong corporate credibility.',
      solution: 'Instantly generate stylized invoices, cost breakdowns, and receipts from mock data templates with beautiful typography and clean grids.',
      bullets: [
        'Visual billing table blocks',
        'Custom corporate signature elements',
        'Export to print-ready PDF layouts',
        'Branded color themes for invoices'
      ],
      mockup: (
        <div className="w-full h-full bg-[#0d0d11] rounded-lg p-5 border border-white/5 flex flex-col space-y-4 text-left">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="font-heading font-extrabold text-[10px] text-white">CommsFlow Studio</span>
            <span className="text-[9px] text-slate-500 font-mono">INV-2026-004</span>
          </div>
          <div className="grid grid-cols-2 text-[9px] text-slate-400 gap-y-1">
            <div>Billed To: Acme Corp</div>
            <div className="text-right">Date: July 22, 2026</div>
          </div>
          <div className="border border-white/5 rounded overflow-hidden">
            <table className="w-full text-[9px]">
              <thead className="bg-white/5 text-slate-300">
                <tr>
                  <th className="p-1.5 text-left">Service</th>
                  <th className="p-1.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="text-slate-400">
                <tr className="border-b border-white/5">
                  <td className="p-1.5">Enterprise Studio Plan</td>
                  <td className="p-1.5 text-right">$499.00</td>
                </tr>
                <tr>
                  <td className="p-1.5">Custom Domain Addon</td>
                  <td className="p-1.5 text-right">$49.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end text-[10px] font-bold text-white pr-1">
            <span>Total: $548.00</span>
          </div>
        </div>
      )
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <section id="solutions" className="relative py-20 md:py-32 z-10 bg-[#060608]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 font-heading">
            Tailored workflows for <span className="text-gradient">every department</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
            Pick your team. Discover how CommsFlow AI optimizes communication velocity, brand alignment, and design workflows.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tab Selector Links (Left col) */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar space-x-3 lg:space-x-0 lg:space-y-2 pb-4 lg:pb-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-5 py-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 shrink-0 w-auto lg:w-full ${
                    isActive 
                      ? 'bg-white/5 border-violet-500/30 text-white shadow shadow-violet-500/5' 
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`p-1.5 rounded-lg ${isActive ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400'}`}>
                    {tab.icon}
                  </span>
                  <span className="text-sm font-semibold tracking-wide font-heading">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Solution Presentation Box (Right cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#09090c]/45"
              >
                {/* Details side */}
                <div className="md:col-span-7 flex flex-col items-start text-left space-y-6">
                  <h3 className="text-2xl font-bold text-white tracking-tight font-heading">{currentTab.title}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-heading">Problem</div>
                      <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{currentTab.problem}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-heading">Solution</div>
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-semibold">{currentTab.solution}</p>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {currentTab.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center space-x-2 text-xs text-slate-400">
                        <div className="w-4 h-4 rounded-full bg-violet-600/15 flex items-center justify-center shrink-0">
                          <Check className="h-2.5 w-2.5 text-violet-400" />
                        </div>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 w-full">
                    <Button variant="outline" size="sm" onClick={() => setCurrentView('register')} className="flex items-center space-x-2 group">
                      <span>Explore workflow details</span>
                      <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Live canvas mockup side */}
                <div className="md:col-span-5 h-[230px] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-violet-500/5 rounded-2xl blur-2xl pointer-events-none" />
                  <div className="w-full transform hover:scale-[1.03] transition-transform duration-300 relative z-10">
                    {currentTab.mockup}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
