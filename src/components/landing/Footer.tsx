import React, { useState } from 'react';
import { Layers, Send, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const footerLinks = {
    product: [
      { name: 'Visual Studio', href: '#' },
      { name: 'Unlayer Elements', href: '#' },
      { name: 'Brand Lockdowns', href: '#' },
      { name: 'Analytics Hub', href: '#' },
      { name: 'Changelog', href: '#' },
    ],
    solutions: [
      { name: 'HR & Ops', href: '#solutions' },
      { name: 'Software Developers', href: '#solutions' },
      { name: 'Product Managers', href: '#solutions' },
      { name: 'Marketing Teams', href: '#solutions' },
      { name: 'Customer Support', href: '#solutions' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Design Templates', href: '#' },
      { name: 'Email Best Practices', href: '#' },
      { name: 'System Status', href: '#' },
      { name: 'Help Center', href: '#' },
    ],
    company: [
      { name: 'About Us', href: 'https://www.linkedin.com/in/vijayapandian-t' },
      { name: 'Careers', href: 'https://github.com/VIJAYAPANDIANT' },
      { name: 'Blog', href: 'https://x.com/Vijayapand33371' },
      { name: 'Security Policy', href: 'mailto:vijayapandian112007@gmail.com' },
      { name: 'Press Kit', href: 'https://github.com/VIJAYAPANDIANT' },
    ],
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#030303]/60 backdrop-blur-md z-10 pt-16 pb-8 px-6 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[150px] bg-gradient-glow opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Brand Left Column */}
        <div className="md:col-span-4 flex flex-col space-y-6">
          <a href="#" className="flex items-center space-x-2 w-max">
            <div className="w-8 h-8 rounded-lg bg-gradient-premium flex items-center justify-center">
              <Layers className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-heading font-extrabold text-lg tracking-tight text-white">
              Comms<span className="text-violet-400">Flow</span>
            </span>
          </a>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Centralize, visual-edit, and lockdown corporate messages in one workspace. Build uniform layouts for newsletters, reports, and alerts with ease.
          </p>
          
          {/* Newsletter signup form */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-semibold text-slate-300">Subscribe to our newsletter</div>
            
            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  key="subscribe-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex max-w-sm rounded-lg overflow-hidden border border-white/10 bg-white/5 p-1 focus-within:border-violet-500/50 transition-colors"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent px-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none w-full"
                  />
                  <button
                    type="submit"
                    className="px-3 bg-violet-600 rounded-md hover:bg-violet-500 transition-colors flex items-center justify-center text-white cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="subscribe-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-lg text-left"
                >
                  ✓ Subscribed! Welcome to CommsFlow.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Link Columns (Right) */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">Product</h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">Solutions</h4>
            <ul className="space-y-2.5">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">Resources</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/5 my-8" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} CommsFlow AI Inc. All rights reserved.
        </div>
        
        {/* Social Links */}
        <div className="flex space-x-4">
          <a 
            href="https://x.com/Vijayapand33371" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Twitter" 
            className="hover:text-slate-300 transition-colors"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a 
            href="https://github.com/VIJAYAPANDIANT" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Github" 
            className="hover:text-slate-300 transition-colors"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.646.64.699 1.026 1.592 1.026 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
          <a 
            href="https://www.linkedin.com/in/vijayapandian-t" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn" 
            className="hover:text-slate-300 transition-colors"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a 
            href="mailto:vijayapandian112007@gmail.com" 
            aria-label="Email" 
            className="hover:text-slate-300 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
          </a>
        </div>

        <div className="flex space-x-4">
          <a href="https://www.linkedin.com/in/vijayapandian-t" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="https://github.com/VIJAYAPANDIANT" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          <a href="https://x.com/Vijayapand33371" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">GDPR compliance</a>
        </div>
      </div>
    </footer>
  );
};
