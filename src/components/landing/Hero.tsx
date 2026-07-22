import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Layout, Type, Image, Mail, FileText, CheckCircle2, Layers } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';

export const Hero: React.FC = () => {
  const { setCurrentView } = useNavigation();
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden flex flex-col items-center justify-center text-center px-6">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-gradient-glow opacity-60 pointer-events-none" />

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto z-10">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-violet-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-slate-300">
            Introducing CommsFlow AI ✦ Visual Document Studio
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] font-heading"
        >
          <span className="text-white">Design Once.</span><br />
          <span className="text-gradient">Communicate Everywhere.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Centralize your newsletters, incident reports, invoices, and executive docs in one workspace. Visually craft consistent business assets with Unlayer Elements.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <Button variant="primary" size="lg" onClick={() => setCurrentView('register')} className="w-full sm:w-auto flex items-center space-x-2 group">
            <span>Start Building for Free</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="glass" size="lg" className="w-full sm:w-auto flex items-center space-x-2">
            <Play className="h-4 w-4 fill-white text-white" />
            <span>Book a Demo</span>
          </Button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-20 text-xs font-semibold text-slate-500"
        >
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="h-4 w-4 text-violet-400" />
            <span>No credit card required</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="h-4 w-4 text-violet-400" />
            <span>14-day free trial</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="h-4 w-4 text-violet-400" />
            <span>Self-serve onboarding</span>
          </span>
        </motion.div>
      </div>

      {/* Editor Mockup Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mx-auto z-10 relative"
      >
        {/* Glow effect behind the editor */}
        <div className="absolute inset-0 bg-violet-600/10 rounded-2xl blur-3xl -z-10 transform scale-90" />
        
        {/* Browser Mockup */}
        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-[#09090b]/80">
          {/* Browser Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d11]/80 border-b border-white/5">
            {/* Window Dots */}
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* Window URL bar */}
            <div className="px-10 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] text-slate-500 font-mono tracking-wider">
              commsflow.ai/studio/new-project
            </div>
            {/* Spacer */}
            <div className="w-12" />
          </div>

          {/* Editor Grid Layout */}
          <div className="grid grid-cols-12 h-[340px] md:h-[480px] text-left text-xs text-slate-400">
            {/* Left sidebar: Elements Selector */}
            <div className="col-span-3 border-r border-white/5 bg-[#0b0b0e] p-4 hidden md:flex flex-col space-y-4">
              <div className="font-semibold text-slate-300 uppercase tracking-wider text-[9px] mb-2">Unlayer Elements</div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-white/5 border border-white/5 rounded-lg hover:border-violet-500/30 hover:bg-white/10 cursor-pointer flex flex-col items-center justify-center space-y-1.5 transition-colors">
                  <Layout className="h-4 w-4 text-violet-400" />
                  <span className="text-[10px] text-slate-300">Columns</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/5 rounded-lg hover:border-violet-500/30 hover:bg-white/10 cursor-pointer flex flex-col items-center justify-center space-y-1.5 transition-colors">
                  <Type className="h-4 w-4 text-violet-400" />
                  <span className="text-[10px] text-slate-300">Heading</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/5 rounded-lg hover:border-violet-500/30 hover:bg-white/10 cursor-pointer flex flex-col items-center justify-center space-y-1.5 transition-colors">
                  <Image className="h-4 w-4 text-violet-400" />
                  <span className="text-[10px] text-slate-300">Image</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/5 rounded-lg hover:border-violet-500/30 hover:bg-white/10 cursor-pointer flex flex-col items-center justify-center space-y-1.5 transition-colors">
                  <Mail className="h-4 w-4 text-violet-400" />
                  <span className="text-[10px] text-slate-300">Button</span>
                </div>
              </div>
              
              <div className="font-semibold text-slate-300 uppercase tracking-wider text-[9px] mt-4 mb-2">Saved Blocks</div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 p-2 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 cursor-pointer">
                  <FileText className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-[10px] text-slate-300">HR Announcement Template</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 cursor-pointer">
                  <FileText className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-[10px] text-slate-300">Release Notes Header</span>
                </div>
              </div>
            </div>

            {/* Central Designing Canvas */}
            <div className="col-span-12 md:col-span-6 bg-[#030303] p-6 overflow-y-auto flex flex-col items-center justify-start space-y-4 relative">
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-mono animate-pulse">
                • Visual Editor Live
              </div>
              
              {/* Email Content Frame */}
              <div className="w-full max-w-md bg-[#0d0d11] border border-white/5 rounded-lg p-5 shadow-lg space-y-4">
                {/* Header branding */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-5 h-5 rounded bg-gradient-premium flex items-center justify-center">
                      <Layers className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-heading font-extrabold text-[11px] text-white">CommsFlow</span>
                  </div>
                  <span className="text-[10px] text-slate-500">July 2026</span>
                </div>
                
                {/* Visual Banner placeholder */}
                <div className="relative h-28 bg-gradient-premium rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),rgba(0,0,0,0))]" />
                  <div className="z-10 text-center space-y-1">
                    <div className="text-xs font-bold text-white uppercase tracking-wider font-heading">Product Update</div>
                    <div className="text-[9px] text-violet-200">Introducing Advanced Dynamic Fields</div>
                  </div>
                </div>

                {/* Newsletter Text */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-white font-heading">Hey team,</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    We've just pushed a major release to the Visual Document Studio. You can now build layouts with nested grids and live database integration in just two clicks.
                  </p>
                </div>

                {/* Dynamic Button element inside canvas */}
                <div className="flex justify-center pt-2">
                  <div className="px-4 py-1.5 bg-violet-600 rounded text-[10px] text-white font-medium cursor-pointer shadow shadow-violet-500/30 hover:bg-violet-500 border border-violet-400/20 text-center">
                    Explore New Dashboard
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar: Inspector / Style Editor */}
            <div className="col-span-3 border-l border-white/5 bg-[#0b0b0e] p-4 hidden md:flex flex-col space-y-4">
              <div className="font-semibold text-slate-300 uppercase tracking-wider text-[9px] mb-2">Style Inspector</div>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Element: Button</label>
                  <div className="px-2 py-1.5 bg-white/5 border border-white/5 rounded text-[10px] text-white">
                    Explore New Dashboard
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Background Color</label>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded bg-violet-600 border border-white/10" />
                    <span className="font-mono text-[9px] text-slate-300">#7c3aed</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Padding</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[9px] text-slate-300 flex justify-between">
                      <span className="text-slate-500">Top/Bottom</span>
                      <span>8px</span>
                    </div>
                    <div className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[9px] text-slate-300 flex justify-between">
                      <span className="text-slate-500">Left/Right</span>
                      <span>16px</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Border Radius</label>
                  <div className="flex items-center justify-between px-2 py-1 bg-white/5 border border-white/5 rounded text-[9px] text-slate-300">
                    <span>Rounded Corners</span>
                    <span>6px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
