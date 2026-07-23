import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Undo2, Redo2, Monitor, Tablet, Smartphone, 
  Share2, History, Download, Save, Sparkles, X, 
  Check, LayoutGrid, Type, ImageIcon, Palette, Heart, 
  ChevronRight, Lock, ShieldCheck, CheckCircle2,
  Trash2, Link2, Settings, Layers
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { Button } from '../ui/Button';

// Left sidebar tab options
type LeftTab = 'categories' | 'blocks' | 'assets' | 'icons' | 'brand';

// Historical Version structure
interface VersionItem {
  id: string;
  version: string;
  author: string;
  time: string;
  desc: string;
}

export const DocumentEditor: React.FC = () => {
  const { setCurrentView, editingTemplate } = useNavigation();

  // Viewport states
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Left sidebar state
  const [activeLeftTab, setActiveLeftTab] = useState<LeftTab>('categories');

  // Properties state (Right Sidebar controls)
  const [bgColor, setBgColor] = useState('#0b0b0e');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(13);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [fontFamily, setFontFamily] = useState('Outfit');
  const [padding, setPadding] = useState(24);
  const [margin, setMargin] = useState(0);
  const [borderRadius, setBorderRadius] = useState(12);

  // Overlay Modals / Drawers states
  const [shareOpen, setShareOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Auto save simulation state
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving'>('saved');

  // Mock Uploaded Assets
  const [assets, setAssets] = useState<string[]>([
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=200&auto=format&fit=crop&q=60',
  ]);

  // Version History mock logs
  const versions: VersionItem[] = [
    { id: 'v-3', version: 'v1.3.0', author: 'Sarah Jenkins', time: '10 mins ago', desc: 'Locked brand guideline variables.' },
    { id: 'v-2', version: 'v1.2.0', author: 'Alex Rivera', time: '4 hours ago', desc: 'Updated incident block layout alignments.' },
    { id: 'v-1', version: 'v1.1.0', author: 'Jane Doe', time: '1 day ago', desc: 'Scaffolded initial workspace layout.' },
  ];

  // Auto-save interval simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setAutoSaveStatus('saving');
      setTimeout(() => {
        setAutoSaveStatus('saved');
      }, 1000);
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleTriggerSave = () => {
    setSaveLoading(true);
    setSaveSuccess(false);

    setTimeout(() => {
      setSaveLoading(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 1000);
  };

  const handleAssetUploadMock = () => {
    // Append a mock design illustration image
    const mockImages = [
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=60'
    ];
    const chosen = mockImages[Math.floor(Math.random() * mockImages.length)];
    setAssets(prev => [chosen, ...prev]);
  };

  const renderActiveLeftContent = () => {
    switch (activeLeftTab) {
      case 'blocks':
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-heading">Structural Blocks</div>
            <div className="space-y-2">
              {[
                { title: 'Standard Header', desc: 'Logo left, contact links right' },
                { title: 'Hero Banner Layout', desc: 'Centered text with CTA button' },
                { title: 'Double Column Feature', desc: 'Side-by-side feature bullet points' },
                { title: 'Itemized Invoice Grid', desc: 'Pricing data table framework' },
                { title: 'Standard Legal Footer', desc: 'Unsubscribe link & copyright notice' },
              ].map((block, i) => (
                <div 
                  key={i} 
                  className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-violet-500/30 hover:bg-white/10 transition-all cursor-grab flex items-center justify-between group"
                >
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-slate-200 group-hover:text-white font-heading">{block.title}</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">{block.desc}</div>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-violet-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'assets':
        return (
          <div className="space-y-4 animate-fade-in text-left">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-heading">Asset Repository</div>
            
            {/* Upload Zone */}
            <div 
              onClick={handleAssetUploadMock}
              className="border border-dashed border-white/10 rounded-xl p-4 bg-white/5 hover:bg-white/10 hover:border-violet-500/30 cursor-pointer text-center space-y-2 transition-all"
            >
              <ImageIcon className="h-6 w-6 text-violet-400 mx-auto" />
              <div className="text-[10px] font-bold text-slate-300 font-heading">Upload Image Asset</div>
              <p className="text-[8px] text-slate-500 max-w-[160px] mx-auto">Supports JPG, PNG, SVG up to 5MB (Mock Upload)</p>
            </div>

            {/* Grid of uploaded items */}
            <div className="grid grid-cols-2 gap-2">
              {assets.map((src, index) => (
                <div key={index} className="aspect-square bg-[#0b0b0e] border border-white/5 rounded-lg overflow-hidden relative group">
                  <img src={src} alt={`Asset ${index}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#000000]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1.5">
                    <button 
                      onClick={() => setAssets(prev => prev.filter((_, i) => i !== index))}
                      className="p-1 rounded bg-red-500/25 text-red-400 hover:bg-red-500/40 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'icons':
        return (
          <div className="space-y-4 animate-fade-in text-left">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-heading">Lucide Icon Swatches</div>
            <input
              type="text"
              placeholder="Search icons..."
              className="w-full px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[10px] text-white focus:outline-none focus:border-violet-500"
            />
            <div className="grid grid-cols-4 gap-2 text-slate-400">
              {[
                <Sparkles className="h-4.5 w-4.5" />, <Save className="h-4.5 w-4.5" />, <Palette className="h-4.5 w-4.5" />, <Heart className="h-4.5 w-4.5" />,
                <LayoutGrid className="h-4.5 w-4.5" />, <Type className="h-4.5 w-4.5" />, <ImageIcon className="h-4.5 w-4.5" />, <Share2 className="h-4.5 w-4.5" />,
                <Monitor className="h-4.5 w-4.5" />, <Tablet className="h-4.5 w-4.5" />, <Smartphone className="h-4.5 w-4.5" />, <Download className="h-4.5 w-4.5" />
              ].map((icon, index) => (
                <div key={index} className="aspect-square bg-white/5 border border-white/5 hover:border-violet-500/30 hover:bg-white/10 rounded-lg flex items-center justify-center cursor-pointer text-slate-400 hover:text-white transition-colors">
                  {icon}
                </div>
              ))}
            </div>
          </div>
        );

      case 'brand':
        return (
          <div className="space-y-4 animate-fade-in text-left">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-heading">Corporate Brand Kit</div>
            
            <div className="p-3 bg-violet-600/10 border border-violet-500/20 rounded-xl flex items-center space-x-2 text-violet-400">
              <Lock className="h-4 w-4 shrink-0" />
              <div className="text-[9px] leading-snug">
                <span className="font-bold">Guidelines Lockdown Active</span><br />
                <span className="text-slate-400">Style palette colors locked by Admin Sarah J.</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-heading">Corporate Accent Swatches</span>
                <div className="flex space-x-2 mt-1.5">
                  {['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setBgColor(color)}
                      className="w-6 h-6 rounded-full border border-white/10 cursor-pointer shadow-md transition-transform hover:scale-110 relative"
                      style={{ backgroundColor: color }}
                    >
                      {bgColor === color && <Check className="h-3 w-3 text-white absolute inset-0 m-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-heading">Approved Font Families</span>
                <div className="space-y-1.5 mt-1.5">
                  {['Outfit', 'Inter', 'Roboto'].map((font) => (
                    <button
                      key={font}
                      onClick={() => setFontFamily(font)}
                      className={`w-full p-2 rounded-lg border text-left text-[10px] transition-colors cursor-pointer flex items-center justify-between ${
                        fontFamily === font 
                          ? 'bg-violet-600/10 border-violet-500 text-white' 
                          : 'bg-[#09090c] border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{font} (Standard)</span>
                      {fontFamily === font && <Check className="h-3.5 w-3.5 text-violet-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'categories':
      default:
        return (
          <div className="space-y-4 animate-fade-in text-left">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-heading">Template Categories</div>
            <div className="space-y-1.5">
              {[
                { title: 'Email Newsletters', count: 12 },
                { title: 'Incident Response alerts', count: 8 },
                { title: 'Corporate HR letters', count: 15 },
                { title: 'Invoices & Billing', count: 5 },
                { title: 'Operations summaries', count: 7 }
              ].map((cat, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left bg-white/5 border border-white/5 hover:border-violet-500/20 hover:bg-white/10 transition-colors text-slate-400 hover:text-white cursor-pointer"
                >
                  <span className="text-[11px] font-semibold font-heading truncate">{cat.title}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 text-slate-500 font-bold">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  // Pre-load dynamic mock preview depending on template category
  const renderVisualDocumentCanvasContent = () => {
    const title = editingTemplate ? editingTemplate.title : 'Standard Invoice';
    const category = editingTemplate ? editingTemplate.category : 'Invoice';
    const normalized = category.toLowerCase();
    
    // Apply properties dynamically to mockup elements
    const dynamicCanvasStyle = {
      fontFamily: fontFamily,
      fontSize: `${fontSize}px`,
      lineHeight: lineHeight,
    };

    if (normalized.includes('invoice') || normalized.includes('receipt') || normalized.includes('quotation') || normalized.includes('order')) {
      return (
        <div 
          className="border border-white/10 p-6 space-y-6 text-left transition-all duration-300"
          style={{ 
            ...dynamicCanvasStyle, 
            backgroundColor: bgColor, 
            color: textColor,
            padding: `${padding}px`,
            margin: `${margin}px`,
            borderRadius: `${borderRadius}px`
          }}
        >
          <div className="flex justify-between border-b border-white/10 pb-4">
            <div>
              <div className="font-heading font-extrabold text-base tracking-tight">CommsFlow AI Inc.</div>
              <div className="text-[10px] text-slate-500 mt-1">100 Enterprise Way, Suite 400<br />San Francisco, CA 94107</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Document Type</div>
              <div className="font-heading font-bold text-sm mt-0.5 capitalize">{category}</div>
              <div className="font-mono text-[9px] text-slate-500 mt-1">Ref: CF-2026-904</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[9px] text-slate-500 uppercase tracking-wider">Billed To</div>
              <div className="font-bold text-slate-300 mt-1">Acme Global Corporation</div>
              <div className="text-[10px] text-slate-500 mt-0.5 font-mono">billing@acme.com</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-slate-500 uppercase tracking-wider">Issue Date</div>
              <div className="font-bold text-slate-300 mt-1">July 23, 2026</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Payment Terms: Net 30</div>
            </div>
          </div>

          <div className="border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-white/5 text-slate-300 font-bold">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="p-3 font-semibold">Enterprise Visual Builder License</td>
                  <td className="p-3 text-center">12</td>
                  <td className="p-3 text-right">$49.00</td>
                  <td className="p-3 text-right">$588.00</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Corporate Brand Guardrails Setup</td>
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

    if (normalized.includes('release') || normalized.includes('changelog') || normalized.includes('sprint') || normalized.includes('report') || normalized.includes('minutes') || normalized.includes('summary') || normalized.includes('incident') || normalized.includes('maintenance')) {
      return (
        <div 
          className="border border-white/10 p-6 space-y-6 text-left transition-all duration-300"
          style={{ 
            ...dynamicCanvasStyle, 
            backgroundColor: bgColor, 
            color: textColor,
            padding: `${padding}px`,
            margin: `${margin}px`,
            borderRadius: `${borderRadius}px`
          }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
              <span className="font-heading font-extrabold uppercase text-xs tracking-wider">{category}</span>
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
              <div className="font-bold border-l-2 border-violet-500 pl-2">🚀 New Features Added</div>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>Dynamic elements layout auto-scaling on mobile browser viewports.</li>
                <li>Enabled role-based guidelines overrides inside setting nodes.</li>
                <li>Integrated direct HubSpot campaign newsletter HTML uploads.</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Default Email / Letter / General layout
    return (
      <div 
        className="border border-white/10 p-6 space-y-6 text-left transition-all duration-300"
        style={{ 
          ...dynamicCanvasStyle, 
          backgroundColor: bgColor, 
          color: textColor,
          padding: `${padding}px`,
          margin: `${margin}px`,
          borderRadius: `${borderRadius}px`
        }}
      >
        <div className="text-center border-b border-white/10 pb-4">
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
            Hi there, this is a premium responsive layout constructed visually in the designer studio. Modify sidebar metrics to update line spacing or margins.
          </p>

          <div className="flex justify-center pt-2">
            <span 
              className="px-4 py-1.5 bg-violet-600 text-[10px] text-white font-semibold shadow shadow-violet-500/25 transition-all"
              style={{ borderRadius: `${borderRadius}px` }}
            >
              Activate Offer Now
            </span>
          </div>
        </div>

        <div className="text-center border-t border-white/10 pt-4 text-[9px] text-slate-500">
          You are receiving this because you subscribed to our studio updates.<br />
          100 Enterprise Way, SF • <a href="#" className="text-violet-400 hover:underline">Unsubscribe</a>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen bg-[#030303] text-slate-100 flex flex-col justify-between overflow-hidden relative z-50 animate-fade-in font-sans">
      
      {/* 1. TOP TOOLBAR PANEL */}
      <nav className="h-14 border-b border-white/5 bg-[#09090c] px-4 md:px-6 flex items-center justify-between shrink-0 relative z-30">
        
        {/* Left Side: Back & metadata */}
        <div className="flex items-center space-x-4 min-w-0">
          <button
            onClick={handleBackToDashboard}
            aria-label="Back to dashboard button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </button>
          
          <div className="w-px h-6 bg-white/5 shrink-0" />

          <div className="min-w-0 text-left">
            <div className="flex items-center space-x-2">
              <h2 className="text-xs font-bold text-white font-heading truncate max-w-[120px] md:max-w-xs">
                {editingTemplate ? editingTemplate.title : 'Unsaved Layout Document'}
              </h2>
              {/* Auto Save status */}
              <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-slate-400 shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full ${autoSaveStatus === 'saved' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
                <span>{autoSaveStatus === 'saved' ? 'Saved' : 'Saving...'}</span>
              </div>
            </div>
            <p className="text-[9px] text-slate-500 truncate capitalize mt-0.5">Category: {editingTemplate ? editingTemplate.category : 'General'}</p>
          </div>
        </div>

        {/* Middle Side: Undo/Redo & Viewport Switchers */}
        <div className="flex items-center space-x-5">
          {/* Undo/Redo */}
          <div className="flex items-center bg-white/5 p-0.5 rounded-xl border border-white/5">
            <button className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
              <Undo2 className="h-3.5 w-3.5" />
            </button>
            <button className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
              <Redo2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Viewport device switcher */}
          <div className="flex items-center bg-white/5 p-0.5 rounded-xl border border-white/5">
            <button 
              onClick={() => setViewportMode('desktop')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewportMode === 'desktop' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button 
              onClick={() => setViewportMode('tablet')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewportMode === 'tablet' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Tablet className="h-3.5 w-3.5" />
            </button>
            <button 
              onClick={() => setViewportMode('mobile')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewportMode === 'mobile' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right Side: Preview, Save, Share, Export */}
        <div className="flex items-center space-x-3 shrink-0">
          
          {/* Share button */}
          <Button
            variant="glass"
            size="sm"
            onClick={() => setShareOpen(true)}
            className="flex items-center space-x-1 py-1 px-3 text-[10px] tracking-wider uppercase font-bold"
          >
            <Share2 className="h-3 w-3" />
            <span className="hidden sm:inline">Share</span>
          </Button>

          {/* Version history */}
          <button
            onClick={() => setHistoryOpen(true)}
            aria-label="Open version history log"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer shrink-0"
          >
            <History className="h-4 w-4" />
          </button>

          {/* Export */}
          <Button
            variant="glass"
            size="sm"
            onClick={() => setExportOpen(true)}
            className="flex items-center space-x-1.5 py-1 px-3 text-[10px] tracking-wider uppercase font-bold"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <div className="w-px h-6 bg-white/5 shrink-0" />

          {/* Save button */}
          <Button
            variant="primary"
            size="sm"
            disabled={saveLoading || saveSuccess}
            onClick={handleTriggerSave}
            className="flex items-center space-x-1.5 text-[10px] tracking-wider uppercase font-bold"
          >
            {saveLoading ? (
              <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : saveSuccess ? (
              <Check className="h-3.5 w-3.5 text-white" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            <span>{saveSuccess ? 'Saved' : 'Save'}</span>
          </Button>
        </div>

      </nav>

      {/* Save Success Toast alert */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs flex items-center space-x-2 font-heading shadow-xl shadow-green-500/5"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Document design locked and saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THREE COLUMN EDITOR INNER CONTAINER */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* ======================================================== */}
        {/* COLUMN A: LEFT SIDEBAR (Draggables & Assets picker) */}
        {/* ======================================================== */}
        <div className="w-80 border-r border-white/5 bg-[#07070a]/40 backdrop-blur-md flex overflow-hidden shrink-0 z-20">
          
          {/* Vertical Tabs bar */}
          <div className="w-16 border-r border-white/5 flex flex-col items-center py-4 space-y-4 bg-[#09090c]/40">
            {[
              { id: 'categories' as const, label: 'Docs', icon: <FolderIcon className="h-4.5 w-4.5" /> },
              { id: 'blocks' as const, label: 'Blocks', icon: <LayoutGrid className="h-4.5 w-4.5" /> },
              { id: 'assets' as const, label: 'Assets', icon: <ImageIcon className="h-4.5 w-4.5" /> },
              { id: 'icons' as const, label: 'Icons', icon: <Type className="h-4.5 w-4.5" /> }, // using type for icon list
              { id: 'brand' as const, label: 'Brand', icon: <Palette className="h-4.5 w-4.5" /> }
            ].map((tab) => {
              const isActive = activeLeftTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveLeftTab(tab.id)}
                  aria-label={`${tab.label} toolbox tab`}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                    isActive 
                      ? 'bg-violet-600/15 border border-violet-500/30 text-violet-400' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab.icon}
                  <span className="text-[8px] font-bold tracking-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab contents viewport */}
          <div className="flex-1 p-5 overflow-y-auto no-scrollbar bg-[#08080b]/30">
            {renderActiveLeftContent()}
          </div>
        </div>

        {/* ======================================================== */}
        {/* COLUMN B: CENTER CANVAS (Visual sandbox) */}
        {/* ======================================================== */}
        <div className="flex-1 bg-[#0b0b0e] p-6 md:p-10 overflow-y-auto flex items-start justify-center relative">
          
          {/* Grid canvas background dots */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          <div 
            className={`w-full transition-all duration-300 ${
              viewportMode === 'mobile' ? 'max-w-xs' :
              viewportMode === 'tablet' ? 'max-w-lg' :
              'max-w-2xl'
            }`}
          >
            {/* Editor Canvas Container wrapper */}
            <div className="glass-card bg-[#09090c]/50 rounded-2xl p-6 border border-white/5 shadow-2xl relative overflow-hidden">
              {/* Canva-like absolute select handles */}
              <div className="absolute top-2 left-2 flex space-x-1 opacity-60 hover:opacity-100 transition-opacity">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              </div>
              <div className="absolute top-2 right-2 w-2 h-2 border-r-2 border-t-2 border-violet-400" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-l-2 border-b-2 border-violet-400" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-r-2 border-b-2 border-violet-400" />

              {/* Renders document layouts reflecting properties controls */}
              {renderVisualDocumentCanvasContent()}
            </div>
            
            <p className="text-[10px] text-slate-500 text-center mt-4">
              Canvas viewport dimensions: {viewportMode === 'desktop' ? '768px' : viewportMode === 'tablet' ? '512px' : '320px'} width
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* COLUMN C: RIGHT SIDEBAR (Properties inspector panel) */}
        {/* ======================================================== */}
        <div className="w-72 border-l border-white/5 bg-[#07070a]/40 backdrop-blur-md p-5 overflow-y-auto shrink-0 z-20 text-left space-y-6">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2 font-heading flex items-center justify-between">
            <span>Inspector Options</span>
            <Settings className="h-3.5 w-3.5 text-slate-500" />
          </div>

          <div className="space-y-5 divide-y divide-white/5">
            
            {/* Typography Section */}
            <div className="space-y-3 pt-0">
              <h4 className="text-xs font-bold text-slate-300 font-heading">Typography</h4>
              
              <div className="space-y-3 text-xs">
                {/* Font Size slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Font Size</span>
                    <span>{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="32"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>

                {/* Line Height slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Line Height</span>
                    <span>{lineHeight}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.2"
                    max="2"
                    step="0.1"
                    value={lineHeight}
                    onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>
              </div>
            </div>

            {/* Colors Section */}
            <div className="space-y-3 pt-4">
              <h4 className="text-xs font-bold text-slate-300 font-heading">Colors</h4>
              
              <div className="grid grid-cols-2 gap-3 text-[10px]">
                {/* Canvas Background Color */}
                <div className="space-y-1.5">
                  <label className="text-slate-500 font-mono">Background</label>
                  <div className="flex items-center space-x-1.5 bg-[#0b0b0e] p-1.5 rounded-lg border border-white/5">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-5 h-5 rounded border border-white/10 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-slate-300 uppercase truncate text-[9px]">{bgColor}</span>
                  </div>
                </div>

                {/* Text Color */}
                <div className="space-y-1.5">
                  <label className="text-slate-500 font-mono">Text Base</label>
                  <div className="flex items-center space-x-1.5 bg-[#0b0b0e] p-1.5 rounded-lg border border-white/5">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-5 h-5 rounded border border-white/10 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-slate-300 uppercase truncate text-[9px]">{textColor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Spacing & Layout Section */}
            <div className="space-y-3 pt-4">
              <h4 className="text-xs font-bold text-slate-300 font-heading">Spacing & Radius</h4>
              
              <div className="space-y-3 text-xs">
                {/* Padding slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Padding</span>
                    <span>{padding}px</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="48"
                    value={padding}
                    onChange={(e) => setPadding(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>

                {/* Corner Radius slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Corner Radius</span>
                    <span>{borderRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>

                {/* Margin slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Margin Top</span>
                    <span>{margin}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={margin}
                    onChange={(e) => setMargin(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>
              </div>
            </div>

            {/* Locked Guidelines check */}
            <div className="pt-4">
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center space-x-2 text-slate-400 text-xs">
                <ShieldCheck className="h-4 w-4 text-violet-400 shrink-0" />
                <div className="text-[9px] leading-relaxed">
                  <span className="font-bold text-slate-300">Layout Validated</span><br />
                  <span>Aligned with active global branding guidelines.</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* --- DIALOG MODALS & OVERLAYS REGISTRY --- */}
      
      <AnimatePresence>
        
        {/* 1. SHARE OVERLAY DIALOG */}
        {shareOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="fixed inset-0 bg-[#030303]/80 backdrop-blur-sm" onClick={() => setShareOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md relative z-10 glass-card rounded-2xl border border-white/10 p-6 md:p-8 bg-[#09090c] shadow-2xl space-y-5 text-left"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center space-x-2">
                  <Share2 className="h-4.5 w-4.5 text-violet-400" />
                  <h3 className="text-sm font-bold text-white font-heading">Share Document</h3>
                </div>
                <button
                  onClick={() => setShareOpen(false)}
                  className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Invite members */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold tracking-wider text-slate-500 font-heading">Invite Contributors</label>
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      placeholder="Enter contributor email..."
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                    />
                    <Button variant="primary" size="sm" className="px-4">
                      Invite
                    </Button>
                  </div>
                </div>

                <div className="w-full h-px bg-white/5" />

                {/* Share settings */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-heading">Permissions Swatches</span>
                  <div className="flex items-center justify-between p-2.5 bg-white/5 border border-white/5 rounded-xl">
                    <div className="flex items-center space-x-2.5">
                      <Link2 className="h-4 w-4 text-violet-400" />
                      <div>
                        <div className="text-[11px] font-bold text-slate-300 font-heading">Restricted Access</div>
                        <div className="text-[9px] text-slate-500">Only invited workspace members can edit.</div>
                      </div>
                    </div>
                    <button className="text-[10px] font-bold text-violet-400 hover:underline cursor-pointer">Change</button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-white/5">
                <Button variant="outline" size="sm" onClick={() => setShareOpen(false)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* 2. EXPORT OVERLAY DIALOG */}
        {exportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="fixed inset-0 bg-[#030303]/80 backdrop-blur-sm" onClick={() => setExportOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md relative z-10 glass-card rounded-2xl border border-white/10 p-6 md:p-8 bg-[#09090c] shadow-2xl space-y-5 text-left"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center space-x-2">
                  <Download className="h-4.5 w-4.5 text-violet-400" />
                  <h3 className="text-sm font-bold text-white font-heading">Export Studio Template</h3>
                </div>
                <button
                  onClick={() => setExportOpen(false)}
                  className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs text-slate-400 leading-relaxed">
                <p>Compile and download design assets for <strong className="text-white font-heading">{editingTemplate ? editingTemplate.title : 'Layout'}</strong>.</p>
                
                <div className="space-y-2 pt-2">
                  <Button 
                    variant="glass" 
                    size="sm" 
                    onClick={() => { setExportOpen(false); alert('Mock HTML ZIP export triggered.'); }}
                    className="w-full flex items-center justify-between p-3 rounded-lg text-left"
                  >
                    <span>ZIP Archive (HTML + SVG Assets)</span>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </Button>
                  <Button 
                    variant="glass" 
                    size="sm" 
                    onClick={() => { setExportOpen(false); alert('Mock PDF document export triggered.'); }}
                    className="w-full flex items-center justify-between p-3 rounded-lg text-left"
                  >
                    <span>PDF Document Format</span>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-white/5">
                <Button variant="outline" size="sm" onClick={() => setExportOpen(false)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* 3. VERSION HISTORY DRAW PANEL */}
        {historyOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="fixed inset-0 bg-[#030303]/60 backdrop-blur-xs" onClick={() => setHistoryOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-80 h-full relative z-10 border-l border-white/5 bg-[#09090c] p-6 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-6 text-left">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center space-x-2">
                    <History className="h-4.5 w-4.5 text-violet-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Version Snapshots</h3>
                  </div>
                  <button
                    onClick={() => setHistoryOpen(false)}
                    className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {versions.map((ver) => (
                    <div 
                      key={ver.id} 
                      onClick={() => { alert(`Restoring layout to version: ${ver.version}`); setHistoryOpen(false); }}
                      className="p-3 bg-white/5 border border-white/5 hover:border-violet-500/30 hover:bg-white/10 rounded-xl transition-all cursor-pointer space-y-1.5 text-xs text-left"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-heading font-extrabold text-white">{ver.version}</span>
                        <span className="text-[9px] text-slate-500 font-mono">{ver.time}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-snug">{ver.desc}</p>
                      <div className="text-[9px] text-slate-500">Editor: {ver.author}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 text-left">
                <Button variant="outline" size="sm" onClick={() => setHistoryOpen(false)} className="w-full">
                  Close History
                </Button>
              </div>
            </motion.div>
          </div>
        )}

      </AnimatePresence>

    </div>
  );
};

// Lightweight custom icons to avoid duplicates
const FolderIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);
