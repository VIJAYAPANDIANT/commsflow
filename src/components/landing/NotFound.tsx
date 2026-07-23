import React from 'react';
import { motion } from 'framer-motion';
import { FileQuestion, ArrowLeft, Terminal } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { Button } from '../ui/Button';

export const NotFound: React.FC = () => {
  const { setCurrentView } = useNavigation();

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg relative z-10 glass-card rounded-3xl border border-white/10 p-8 md:p-10 bg-[#09090c]/80 shadow-2xl text-center space-y-6"
      >
        {/* Glow indicator */}
        <div className="w-16 h-16 rounded-full bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mx-auto animate-pulse">
          <FileQuestion className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          {/* Large Gradient text */}
          <h1 className="text-6xl font-heading font-extrabold tracking-tighter bg-gradient-premium bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-lg font-heading font-bold text-white">Document Node Not Found</h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
            The workspace subdirectory or layout template file you are trying to access has been archived or relocated.
          </p>
        </div>

        {/* Mock terminal code log */}
        <div className="bg-[#030303] border border-white/5 rounded-xl p-4 font-mono text-[10px] text-left text-slate-500 space-y-1">
          <div className="flex items-center space-x-1.5 text-violet-400 font-bold mb-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>COMMSFLOW CORE SHELL</span>
          </div>
          <div>$ lookup template-node --ref=CF-2026-904</div>
          <div className="text-red-400/80">ERROR: Directory entry resolved to null</div>
          <div>$ status-code --log</div>
          <div>404: OBJECT_NOT_FOUND (main-sandbox-node)</div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            variant="primary"
            onClick={() => setCurrentView('landing')}
            className="flex items-center space-x-2 mx-auto font-bold uppercase tracking-wider text-xs px-6 py-2.5"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            <span>Return to Studio Home</span>
          </Button>
        </div>

      </motion.div>
    </div>
  );
};
