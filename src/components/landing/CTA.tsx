import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';

export const CTA: React.FC = () => {
  const { setCurrentView } = useNavigation();
  return (
    <section className="relative py-16 md:py-24 z-10 px-6">
      <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden glass-card border border-white/10 p-8 md:p-16 text-center bg-[#09090c]/40">
        
        {/* Radial Purple Glow Behind */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,transparent_60%)] -z-10" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto space-y-8 relative z-10"
        >
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-[11px] font-semibold text-slate-300">Ready to align your organization?</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-heading">
            Empower your team to <br />
            <span className="text-gradient">communicate with absolute confidence</span>
          </h2>

          {/* Paragraph */}
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Design on-brand newsletters, changelogs, invoices, and releases visually. Set up your workspace folders in under 5 minutes.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="primary" size="lg" onClick={() => setCurrentView('register')} className="w-full sm:w-auto flex items-center space-x-2 group">
              <span>Get Started Free</span>
              <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="lg" onClick={() => setCurrentView('register')} className="w-full sm:w-auto">
              Schedule Enterprise Demo
            </Button>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-6 text-xs text-slate-500 font-semibold">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-violet-400" />
              <span>Free forever Starter plan</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-violet-400" />
              <span>Cancel or upgrade anytime</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-violet-400" />
              <span>Full Unlayer Elements integration</span>
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
