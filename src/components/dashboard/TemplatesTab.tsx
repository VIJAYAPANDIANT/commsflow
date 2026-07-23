import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pin, Star, Check, Sparkles, X } from 'lucide-react';
import type { TemplateItem } from './OverviewTab';
import type { WorkspaceType } from './DashboardSidebar';
import { Button } from '../ui/Button';

interface TemplatesTabProps {
  templates: TemplateItem[];
  setTemplates: React.Dispatch<React.SetStateAction<TemplateItem[]>>;
  togglePin: (id: string) => void;
  toggleFavorite: (id: string) => void;
  workspace: WorkspaceType;
  searchQuery: string;
}

export const TemplatesTab: React.FC<TemplatesTabProps> = ({
  templates,
  setTemplates,
  togglePin,
  toggleFavorite,
  workspace,
  searchQuery,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'email' | 'document' | 'incident' | 'billing'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  
  // New template form fields
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'email' | 'document' | 'incident' | 'billing'>('email');

  const categories = [
    { id: 'all' as const, label: 'All Layouts' },
    { id: 'email' as const, label: 'Emails' },
    { id: 'document' as const, label: 'Documents' },
    { id: 'incident' as const, label: 'Incident Reports' },
    { id: 'billing' as const, label: 'Billing & Invoices' },
  ];

  // Filter templates
  const filteredTemplates = templates.filter(t => {
    const matchesWorkspace = t.workspace === workspace;
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWorkspace && matchesCategory && matchesSearch;
  });

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
      workspace: workspace
    };

    setTemplates(prev => [newTemp, ...prev]);
    setNewTitle('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      
      {/* Title Bar & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">Templates Hub</h2>
          <p className="text-xs text-slate-500 mt-1">Manage, compose, and catalog visual templates in this workspace folder</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[10px]"
        >
          <Plus className="h-4 w-4" />
          <span>New Template</span>
        </Button>
      </div>

      {/* Category filters */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((c) => {
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
          No templates found matching filters. Click 'New Template' to start crafting layouts.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((temp) => (
            <div
              key={temp.id}
              className="glass-card rounded-2xl border border-white/5 bg-[#09090c]/25 hover:bg-[#09090c]/45 p-5 flex flex-col justify-between h-44 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-glow opacity-15 pointer-events-none rounded-full" />
              
              <div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                    temp.category === 'email' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                    temp.category === 'document' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' :
                    temp.category === 'incident' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    'bg-green-500/10 text-green-400 border border-green-500/20'
                  }`}>
                    {temp.category}
                  </span>
                  
                  {/* Actions overlay */}
                  <div className="flex space-x-1">
                    <button
                      onClick={() => togglePin(temp.id)}
                      aria-label="Pin template button"
                      className={`p-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer ${
                        temp.pinned ? 'text-violet-400' : 'text-slate-500 hover:text-white'
                      }`}
                    >
                      <Pin className={`h-3.5 w-3.5 ${temp.pinned ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => toggleFavorite(temp.id)}
                      aria-label="Favorite template button"
                      className={`p-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer ${
                        temp.favorite ? 'text-yellow-500' : 'text-slate-500 hover:text-yellow-500'
                      }`}
                    >
                      <Star className={`h-3.5 w-3.5 ${temp.favorite ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-100 group-hover:text-white mt-4 font-heading leading-tight truncate">
                  {temp.title}
                </h3>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[10px] text-slate-500">
                <span className="font-mono">Updated {temp.updated}</span>
                <span className="text-violet-400 font-semibold group-hover:underline flex items-center space-x-1 cursor-pointer">
                  <span>Edit Layout</span>
                  <Plus className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create New Template Popup Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-[#030303]/80 backdrop-blur-sm" onClick={() => setModalOpen(false)} />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md relative z-10 glass-card rounded-2xl border border-white/10 p-6 md:p-8 bg-[#09090c] shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-heading">
                <Sparkles className="h-4.5 w-4.5 text-violet-400" />
                <span>Create Studio Layout</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <form onSubmit={handleCreateTemplate} className="space-y-4">
              {/* Template Title */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Template Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q3 Investor Announcement"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              {/* Template Category */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Category Node</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'email' as const, label: 'Email Layout' },
                    { id: 'document' as const, label: 'PDF Document' },
                    { id: 'incident' as const, label: 'Incident Report' },
                    { id: 'billing' as const, label: 'Invoice / Receipt' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setNewCategory(cat.id)}
                      className={`px-3 py-2 rounded-lg text-[10px] font-semibold border text-left flex items-center justify-between cursor-pointer ${
                        newCategory === cat.id
                          ? 'bg-violet-600/10 border-violet-500 text-white'
                          : 'bg-transparent border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {newCategory === cat.id && <Check className="h-3 w-3 text-violet-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-3 border-t border-white/5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                >
                  Generate Template
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};
