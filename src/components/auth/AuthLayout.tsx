import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { AnimatedBackground } from '../landing/AnimatedBackground';
import { Logo } from '../ui/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  const { setCurrentView } = useNavigation();

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center py-12 px-6 overflow-hidden">
      {/* Reusable Animated Ambient Background */}
      <AnimatedBackground />

      {/* Floating back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => setCurrentView('landing')}
        className="absolute top-6 left-6 inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer z-20 border border-transparent hover:border-white/5"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </motion.button>

      {/* Centered Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-violet-600/5 rounded-2xl blur-3xl pointer-events-none -z-10" />

        {/* Card Body */}
        <div className="glass-card rounded-2xl border border-white/10 p-8 md:p-10 bg-[#09090c]/70 shadow-2xl relative">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center mb-8">
            <button
              onClick={() => setCurrentView('landing')}
              className="w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform duration-300 mb-4 cursor-pointer"
            >
              <Logo className="w-9 h-9" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-white font-heading">{title}</h1>
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          </div>

          {/* Form Content */}
          {children}
        </div>
      </motion.div>
      
      {/* Footer copyright */}
      <div className="mt-8 text-center text-[10px] text-slate-500 z-10 select-none">
        &copy; {new Date().getFullYear()} CommsFlow AI Inc. All rights reserved.
      </div>
    </div>
  );
};
