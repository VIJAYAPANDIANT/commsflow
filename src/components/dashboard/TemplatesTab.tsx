import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Pin, Star, Check, X, MoreVertical, 
  Eye, Edit2, Copy, Trash2, Download, AlertTriangle, 
  Layers, FileText, CheckCircle2
} from 'lucide-react';
import type { TemplateItem, WorkspaceType } from '../../types';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';

interface TemplatesTabProps {
  templates: TemplateItem[];
  setTemplates: React.Dispatch<React.SetStateAction<TemplateItem[]>>;
  togglePin: (id: string) => void;
  toggleFavorite: (id: string) => void;
  duplicateTemplate: (id: string) => void;
  deleteTemplate: (id: string) => void;
  workspace: WorkspaceType;
  searchQuery: string;
}

export const TemplatesTab: React.FC<TemplatesTabProps> = ({
  templates,
  setTemplates,
  togglePin,
  toggleFavorite,
  duplicateTemplate,
  deleteTemplate,
  workspace,
  searchQuery,
}) => {
  const { setCurrentView, setEditingTemplate } = useNavigation();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Email');

  // Modal Detail states
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const [exportTemplate, setExportTemplate] = useState<TemplateItem | null>(null);
  const [deleteConfirmTemplate, setDeleteConfirmTemplate] = useState<TemplateItem | null>(null);

  // Export mock states
  const [exportFormat, setExportFormat] = useState<'html' | 'pdf' | 'markdown'>('html');
  const [exporting, setExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);

  // List categories based on active workspace templates
  const filteredTemplates = templates.filter(t => {
    const matchesWorkspace = t.workspace === workspace;
    const matchesCategory = activeCategory === 'all' || 
                            t.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
                            (activeCategory === 'email' && t.category.toLowerCase().includes('email')) ||
                            (activeCategory === 'document' && (t.category.toLowerCase().includes('letter') || t.category.toLowerCase().includes('certificate') || t.category.toLowerCase().includes('report') || t.category.toLowerCase().includes('minutes')));
    
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWorkspace && matchesCategory && matchesSearch;
  });

  const getWorkspaceCategories = () => {
    switch (workspace) {
      case 'engineering':
        return [
          { id: 'all', label: 'All Layouts' },
          { id: 'release', label: 'Release Notes' },
          { id: 'api', label: 'API Changelogs' },
          { id: 'sprint', label: 'Sprint Summaries' },
          { id: 'incident', label: 'Incidents' },
        ];
      case 'hr':
        return [
          { id: 'all', label: 'All HR Docs' },
          { id: 'offer', label: 'Offer Letters' },
          { id: 'certificate', label: 'Certificates' },
          { id: 'joining', label: 'Joining Letters' },
        ];
      case 'finance':
        return [
          { id: 'all', label: 'All Billing' },
          { id: 'invoice', label: 'Invoices' },
          { id: 'receipt', label: 'Receipts' },
          { id: 'quotation', label: 'Quotations' },
        ];
      case 'marketing':
        return [
          { id: 'all', label: 'All Emails' },
          { id: 'newsletter', label: 'Newsletters' },
          { id: 'campaign', label: 'Campaigns' },
          { id: 'promotion', label: 'Promos' },
        ];
      case 'support':
        return [
          { id: 'all', label: 'All Tickets' },
          { id: 'resolution', label: 'Resolutions' },
          { id: 'update', label: 'Updates' },
          { id: 'refund', label: 'Refunds' },
        ];
      case 'operations':
        return [
          { id: 'all', label: 'All Operations' },
          { id: 'report', label: 'Reports' },
          { id: 'minutes', label: 'Minutes' },
          { id: 'summary', label: 'Summaries' },
        ];
      default:
        return [{ id: 'all', label: 'All' }];
    }
  };

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTemp: TemplateItem = {
      id: `temp-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      updated: 'Just now',
      pinned: false,
      favorite: false,
      workspace: workspace,
      previewColor: 'from-violet-600/30 to-indigo-600/30' // default premium gradient
    };

    setTemplates(prev => [newTemp, ...prev]);
    setNewTitle('');
    setCreateModalOpen(false);
  };


  const handleExportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExporting(true);
    setExportDone(false);

    setTimeout(() => {
      setExporting(false);
      setExportDone(true);
      setTimeout(() => {
        setExportDone(false);
        setExportTemplate(null);
      }, 1500);
    }, 2000);
  };

  const executeDelete = () => {
    if (deleteConfirmTemplate) {
      deleteTemplate(deleteConfirmTemplate.id);
      setDeleteConfirmTemplate(null);
    }
  };

  // Pre-load dynamic content preview mockups based on category
  const renderMockDocumentContent = (category: string, title: string) => {
    const normalized = category.toLowerCase();
    
    if (normalized.includes('invoice') || normalized.includes('receipt') || normalized.includes('quotation') || normalized.includes('purchase order')) {
      return (
        <div className="bg-[#0b0b0e] border border-white/5 rounded-xl p-6 font-sans space-y-6 text-slate-300 text-xs">
          <div className="flex justify-between border-b border-white/5 pb-4">
            <div>
              <div className="font-heading font-extrabold text-white text-base">CommsFlow AI Inc.</div>
              <div className="text-[10px] text-slate-500 mt-1">100 Enterprise Way, Suite 400<br />San Francisco, CA 94107</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Document Type</div>
              <div className="font-heading font-bold text-white text-sm mt-0.5 capitalize">{category}</div>
              <div className="font-mono text-[9px] text-slate-500 mt-1">Ref: CF-2026-904</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[9px] text-slate-500 uppercase tracking-wider">Billed To</div>
              <div className="font-bold text-slate-200 mt-1">Acme Global Corporation</div>
              <div className="text-[10px] text-slate-500 mt-0.5 font-mono">billing@acme.com</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-slate-500 uppercase tracking-wider">Issue Date</div>
              <div className="font-bold text-slate-200 mt-1">July 23, 2026</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Payment Terms: Net 30</div>
            </div>
          </div>

          <div className="border border-white/5 rounded-lg overflow-hidden">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-white/5 text-slate-300 font-bold">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-3 font-semibold text-white">Enterprise Visual Builder License</td>
                  <td className="p-3 text-center">12</td>
                  <td className="p-3 text-right">$49.00</td>
                  <td className="p-3 text-right">$588.00</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Corporate Brand Guardrails Setup</td>
                  <td className="p-3 text-center">1</td>
                  <td className="p-3 text-right">$299.00</td>
                  <td className="p-3 text-right">$299.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-[10px] text-slate-500">Thank you for your business.</div>
            <div className="text-right space-y-1">
              <div className="text-[10px] text-slate-400">Subtotal: $887.00</div>
              <div className="text-sm font-bold text-white">Total: $887.00</div>
            </div>
          </div>
        </div>
      );
    }

    if (normalized.includes('release') || normalized.includes('changelog') || normalized.includes('sprint') || normalized.includes('report') || normalized.includes('minutes') || normalized.includes('summary')) {
      return (
        <div className="bg-[#0b0b0e] border border-white/5 rounded-xl p-6 font-sans space-y-6 text-slate-300 text-xs">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
              <span className="font-heading font-extrabold text-white uppercase text-xs tracking-wider">{category}</span>
            </div>
            <span className="text-[9px] font-mono text-slate-500">v3.4.0-stable</span>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white font-heading">{title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                This document outlines the core functional revisions, api logs, and sprint outcomes locked in our production server workspace this week.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="font-bold text-slate-200 border-l-2 border-violet-500 pl-2">🚀 New Features Added</div>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>Dynamic elements layout auto-scaling on mobile browser viewports.</li>
                <li>Enabled role-based guidelines overrides inside setting nodes.</li>
                <li>Integrated direct HubSpot campaign newsletter HTML uploads.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-200 border-l-2 border-red-500 pl-2">⚠️ Bug Fixes & Adjustments</div>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>Fixed accordion height clipping issues on nested custom layouts.</li>
                <li>Resolved ref compilation errors on OTP input elements.</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (normalized.includes('letter') || normalized.includes('certificate')) {
      return (
        <div className="bg-[#0b0b0e] border border-white/5 rounded-xl p-6 font-sans space-y-6 text-slate-300 text-xs text-left">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div className="flex items-center space-x-1.5">
              <div className="w-6 h-6 rounded bg-gradient-premium flex items-center justify-center">
                <Layers className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-heading font-extrabold text-[10px] text-white">CommsFlow Studio</span>
            </div>
            <span className="text-[9px] text-slate-500 font-mono">Date: July 23, 2026</span>
          </div>

          <div className="space-y-4 leading-relaxed text-slate-400">
            <div>
              <div className="font-bold text-white">TO WHOM IT MAY CONCERN</div>
              <div className="text-[10px] text-slate-500 mt-1 font-mono">Recipient: Jane Doe • San Francisco Office</div>
            </div>

            <p>
              This official document serves as a verified template representing the {category} issued by CommsFlow AI Corporation. All terms, details, and signatures enclosed are locked and fully integrated.
            </p>

            <p>
              The recipient is authorized to present this template as verification of credentials. All visual assets and styling elements comply with global corporate guidelines.
            </p>

            <div className="pt-6 flex justify-between items-end">
              <div className="space-y-1">
                <div className="w-24 h-px bg-white/10" />
                <div className="text-[9px] text-slate-500">Corporate Seal (Verified)</div>
              </div>
              <div className="text-right">
                <div className="font-heading font-bold text-white italic">Sarah Jenkins</div>
                <div className="text-[9px] text-slate-500">VP of HR Operations</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default Email/Newsletter preview
    return (
      <div className="bg-[#0b0b0e] border border-white/5 rounded-xl p-6 font-sans space-y-6 text-slate-300 text-xs">
        <div className="text-center border-b border-white/5 pb-4">
          <div className="inline-flex items-center space-x-1.5">
            <div className="w-5 h-5 rounded bg-gradient-premium flex items-center justify-center">
              <Layers className="w-3 h-3 text-white" />
            </div>
            <span className="font-heading font-bold text-[10px] text-white">CommsFlow Campaign</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h4 className="text-sm font-bold text-white font-heading">{title}</h4>
            <span className="text-[9px] text-slate-500 font-mono">Topic: {category}</span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed text-center">
            Hi there, this is a premium responsive email template constructed visually. Click below to inspect our summer campaign update nodes.
          </p>

          <div className="flex justify-center pt-2">
            <span className="px-4 py-1.5 bg-violet-600 rounded-lg text-[10px] text-white font-semibold shadow shadow-violet-500/25">
              Activate Offer Now
            </span>
          </div>
        </div>

        <div className="text-center border-t border-white/5 pt-4 text-[9px] text-slate-500">
          You are receiving this because you subscribed to our studio updates.<br />
          100 Enterprise Way, SF • <a href="#" className="text-violet-400 hover:underline">Unsubscribe</a>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      
      {/* Title Bar & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-heading capitalize">{workspace} Workspace</h2>
          <p className="text-xs text-slate-500 mt-1">Craft, duplicate, filter, and export professional templates tailored for this department</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[10px]"
        >
          <Plus className="h-4 w-4" />
          <span>Create Template</span>
        </Button>
      </div>

      {/* Category filters */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
        {getWorkspaceCategories().map((c) => {
          const isActive = activeCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-white/5 border-violet-500/30 text-white shadow shadow-violet-500/5'
                  : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Templates Grid Catalog */}
      {filteredTemplates.length === 0 ? (
        <div className="p-16 rounded-2xl bg-[#09090c]/40 border border-white/5 border-dashed text-center text-xs text-slate-500">
          No templates found matching your search. Try adjusting your query or create a new template.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((temp) => (
            <div
              key={temp.id}
              className="glass-card rounded-2xl border border-white/5 bg-[#09090c]/25 hover:bg-[#09090c]/45 flex flex-col justify-between overflow-hidden relative group"
            >
              {/* Preview Image Placeholder Gradient Box */}
              <div className={`h-28 w-full bg-gradient-to-br ${temp.previewColor} relative flex items-center justify-center transition-all duration-300 group-hover:opacity-90`}>
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="w-16 h-16 rounded-lg bg-[#030303]/60 backdrop-blur border border-white/10 flex items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-300">
                  <FileText className="h-6 w-6 text-violet-400" />
                </div>
              </div>

              {/* Template details */}
              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-violet-600/10 border border-violet-500/20 text-violet-400">
                      {temp.category}
                    </span>
                    
                    {/* Stars / Pins */}
                    <div className="flex space-x-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => togglePin(temp.id)}
                        aria-label="Pin template button"
                        className={`p-1 hover:bg-white/5 rounded transition-all cursor-pointer ${
                          temp.pinned ? 'text-violet-400' : 'text-slate-500 hover:text-white'
                        }`}
                      >
                        <Pin className={`h-3 w-3 ${temp.pinned ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => toggleFavorite(temp.id)}
                        aria-label="Favorite template button"
                        className={`p-1 hover:bg-white/5 rounded transition-all cursor-pointer ${
                          temp.favorite ? 'text-yellow-500' : 'text-slate-500 hover:text-yellow-500'
                        }`}
                      >
                        <Star className={`h-3 w-3 ${temp.favorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-slate-100 group-hover:text-white font-heading truncate leading-snug">
                    {temp.title}
                  </h3>
                  <div className="text-[10px] text-slate-500 font-mono">Updated {temp.updated}</div>
                </div>

                {/* Dropdown Action Controls */}
                <div className="flex items-center justify-between border-t border-white/5 pt-3.5 relative">
                  
                  {/* Primary Trigger button */}
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => setPreviewTemplate(temp)}
                    className="flex items-center space-x-1 py-1 px-3 text-[10px]"
                  >
                    <Eye className="h-3 w-3" />
                    <span>Quick View</span>
                  </Button>

                  {/* Actions Dropdown Trigger */}
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === temp.id ? null : temp.id)}
                      aria-label="Open template action menu"
                      className="p-1 rounded-md hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {activeMenuId === temp.id && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setActiveMenuId(null)} />
                        <div className="absolute bottom-[110%] right-0 z-50 w-36 p-1 bg-[#09090c] border border-white/10 rounded-xl shadow-2xl space-y-0.5 text-xs text-slate-300 font-heading">
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              setPreviewTemplate(temp);
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white transition-colors text-left cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5 text-slate-400" />
                            <span>Preview Layout</span>
                          </button>
                           <button
                            onClick={() => {
                              setActiveMenuId(null);
                              setEditingTemplate(temp);
                              setCurrentView('editor');
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white transition-colors text-left cursor-pointer"
                          >
                            <Edit2 className="h-3.5 w-3.5 text-slate-400" />
                            <span>Edit Canvas</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              duplicateTemplate(temp.id);
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white transition-colors text-left cursor-pointer"
                          >
                            <Copy className="h-3.5 w-3.5 text-slate-400" />
                            <span>Duplicate</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              setExportTemplate(temp);
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white transition-colors text-left cursor-pointer"
                          >
                            <Download className="h-3.5 w-3.5 text-slate-400" />
                            <span>Export...</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              setDeleteConfirmTemplate(temp);
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors text-left cursor-pointer border-t border-white/5"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-500/60" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- OVERLAY MODALS REGISTRY --- */}

      <AnimatePresence>
        
        {/* 0. CREATE TEMPLATE DIALOG MODAL */}
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="fixed inset-0 bg-[#030303]/80 backdrop-blur-sm" onClick={() => setCreateModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md relative z-10 glass-card rounded-2xl border border-white/10 p-6 md:p-8 bg-[#09090c] shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-heading">
                  <Plus className="h-4.5 w-4.5 text-violet-400" />
                  <span>Create Template Layout</span>
                </h3>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleCreateTemplate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Template Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Release Announcement V3"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Template Category</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Release Notes, Invoice, Offer Letter"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-3 border-t border-white/5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setCreateModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                  >
                    Generate Layout
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* 1. PREVIEW DIALOG MODAL */}
        {previewTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="fixed inset-0 bg-[#030303]/80 backdrop-blur-sm" onClick={() => setPreviewTemplate(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-2xl relative z-10 glass-card rounded-3xl border border-white/10 p-6 bg-[#09090c] shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4.5 w-4.5 text-violet-400" />
                  <h3 className="text-sm font-bold text-white font-heading">Template Preview</h3>
                </div>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Renders styled HTML based on categories */}
              <div className="max-h-[380px] overflow-y-auto pr-1">
                {renderMockDocumentContent(previewTemplate.category, previewTemplate.title)}
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-white/5">
                <Button variant="outline" size="sm" onClick={() => setPreviewTemplate(null)}>
                  Close Preview
                </Button>
                <Button variant="primary" size="sm" onClick={() => { setEditingTemplate(previewTemplate); setCurrentView('editor'); setPreviewTemplate(null); }}>
                  Open in Editor
                </Button>
              </div>
            </motion.div>
          </div>
        )}


        {/* 3. EXPORT DIALOG MODAL */}
        {exportTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="fixed inset-0 bg-[#030303]/80 backdrop-blur-sm" onClick={() => setExportTemplate(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md relative z-10 glass-card rounded-2xl border border-white/10 p-6 md:p-8 bg-[#09090c] shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center space-x-2">
                  <Download className="h-4.5 w-4.5 text-violet-400" />
                  <h3 className="text-sm font-bold text-white font-heading">Export Studio Template</h3>
                </div>
                <button
                  onClick={() => setExportTemplate(null)}
                  className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {exportDone ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-green-400 mx-auto animate-bounce" />
                  <h4 className="text-xs font-bold text-white font-heading">Download Initiated</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs mx-auto">
                    Export package generated. Your file is downloading.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleExportSubmit} className="space-y-4 text-left">
                  <div className="text-xs text-slate-400 leading-relaxed mb-4">
                    Generate production-ready assets for <strong className="text-white font-heading">{exportTemplate.title}</strong>.
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold tracking-wider text-slate-500 font-heading">Export Pipeline Formats</label>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setExportFormat('html')}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border text-left cursor-pointer ${
                          exportFormat === 'html' 
                            ? 'bg-violet-600/10 border-violet-500 text-white' 
                            : 'bg-transparent border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold font-heading">Responsive HTML Email</div>
                          <div className="text-[9px] text-slate-500">ZIP container containing inline-styled HTML and SVG tags.</div>
                        </div>
                        {exportFormat === 'html' && <Check className="h-4 w-4 text-violet-400 shrink-0" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setExportFormat('pdf')}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border text-left cursor-pointer ${
                          exportFormat === 'pdf' 
                            ? 'bg-violet-600/10 border-violet-500 text-white' 
                            : 'bg-transparent border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold font-heading">Print-ready PDF Document</div>
                          <div className="text-[9px] text-slate-500">High-fidelity vector layout optimized for print distribution.</div>
                        </div>
                        {exportFormat === 'pdf' && <Check className="h-4 w-4 text-violet-400 shrink-0" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setExportFormat('markdown')}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border text-left cursor-pointer ${
                          exportFormat === 'markdown' 
                            ? 'bg-violet-600/10 border-violet-500 text-white' 
                            : 'bg-transparent border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold font-heading">Raw Markdown Text</div>
                          <div className="text-[9px] text-slate-500">Unstyled markup layout suitable for wikis or team alerts.</div>
                        </div>
                        {exportFormat === 'markdown' && <Check className="h-4 w-4 text-violet-400 shrink-0" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit buttons */}
                  <div className="flex justify-end space-x-3 pt-3 border-t border-white/5">
                    <Button variant="outline" size="sm" type="button" onClick={() => setExportTemplate(null)}>
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
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <span>Generate & Download</span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}

        {/* 4. DELETE CONFIRMATION DIALOG MODAL */}
        {deleteConfirmTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="fixed inset-0 bg-[#030303]/80 backdrop-blur-sm" onClick={() => setDeleteConfirmTemplate(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-sm relative z-10 glass-card rounded-2xl border border-white/10 p-6 bg-[#09090c] shadow-2xl space-y-5"
            >
              <div className="flex items-center space-x-3 text-red-400 border-b border-white/5 pb-3">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <h3 className="text-sm font-bold font-heading">Delete Template</h3>
              </div>

              <div className="text-xs text-slate-400 leading-relaxed text-left">
                Are you absolutely sure you want to delete <strong className="text-white">{deleteConfirmTemplate.title}</strong>? This action will permanently remove it from the workspace folder and cannot be undone.
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <Button variant="outline" size="sm" onClick={() => setDeleteConfirmTemplate(null)}>
                  Cancel
                </Button>
                <Button variant="outline" size="sm" onClick={executeDelete} className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/25 hover:text-red-300">
                  Delete Permanently
                </Button>
              </div>
            </motion.div>
          </div>
        )}

      </AnimatePresence>

    </div>
  );
};

// Helper Loader spinner component
const Loader2 = ({ className }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);
