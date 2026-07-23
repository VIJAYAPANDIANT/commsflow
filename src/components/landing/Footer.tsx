import React, { useState } from 'react';
import { Layers, Send, MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';

export const Footer: React.FC = () => {
  const { setCurrentView } = useNavigation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState('');

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

  const handleLinkClick = (e: React.MouseEvent, topic: string) => {
    e.preventDefault();
    setActiveTopic(topic);
    setModalOpen(true);
  };

  const getTopicContent = (topic: string) => {
    switch (topic) {
      case 'About Us':
        return {
          title: "About CommsFlow AI",
          subtitle: "Visual Document & Communication Studio",
          icon: <Layers className="h-5 w-5 text-violet-400" />,
          content: (
            <div className="space-y-4 text-slate-300 text-xs md:text-sm leading-relaxed text-left">
              <p>
                CommsFlow AI is a premium visual document editor designed to align organization-wide communications. We believe enterprise updates shouldn't feel fragmented, boring, or take hours to code.
              </p>
              <p>
                With CommsFlow, departments like HR, Support, Operations, and Engineering drag-and-drop elements on a unified, on-brand canvas, ensuring absolute guidelines lockdown and direct responsive exporting.
              </p>
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-slate-500 text-[10px]">
                <span>Creator & Developer: <strong>Vijayapandian T</strong></span>
                <a href="https://www.linkedin.com/in/vijayapandian-t" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">Connect on LinkedIn</a>
              </div>
            </div>
          )
        };
      case 'Careers':
        return {
          title: "Careers at CommsFlow",
          subtitle: "Help us shape the future of visual builder pipelines",
          icon: <Layers className="h-5 w-5 text-violet-400" />,
          content: (
            <div className="space-y-4 text-xs md:text-sm leading-relaxed text-left">
              <p className="text-slate-300">
                We are a product-first, fully remote engineering and design squad building the future of document layout builders.
              </p>
              <div className="space-y-2.5 pt-2">
                {[
                  { role: "Lead UI Engineer (React / Tailwind)", type: "Full-Time • Remote", salary: "$140k - $170k" },
                  { role: "Visual Canvas Editor Architect", type: "Full-Time • Remote", salary: "$150k - $190k" },
                  { role: "Developer Relations Specialist", type: "Contract • Remote", salary: "$80k - $100k" },
                ].map((job, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center hover:border-violet-500/20 transition-colors">
                    <div className="text-left">
                      <div className="font-bold text-white font-heading">{job.role}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{job.type}</div>
                    </div>
                    <span className="text-[10px] font-mono text-violet-400 font-semibold">{job.salary}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        };
      case 'Blog':
        return {
          title: "CommsFlow Engineering Blog",
          subtitle: "Latest release notes, editor engineering, and brand guides updates",
          icon: <Layers className="h-5 w-5 text-violet-400" />,
          content: (
            <div className="space-y-4 text-xs md:text-sm leading-relaxed text-left">
              <div className="space-y-3.5">
                {[
                  { title: "The Death of Raw HTML Code in Newsletters", date: "July 20, 2026", desc: "Why writing custom email tables in 2026 is a massive waste of developer hours." },
                  { title: "How Brand kit Guardrails Saves Corporate Credibility", date: "June 14, 2026", desc: "Locking fonts and colors globally reduces visual errors and enforces corporate guidelines." },
                  { title: "Visual Builders vs. Document Version Snapshots", date: "May 28, 2026", desc: "How client-side draft auto-saves and rollback timelines optimize layout revisions." },
                ].map((post, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-1 hover:border-violet-500/20 transition-colors text-left cursor-pointer">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                      <span>{post.date}</span>
                      <span className="text-violet-400 font-mono">Read Post</span>
                    </div>
                    <h4 className="text-xs font-bold text-white font-heading mt-0.5">{post.title}</h4>
                    <p className="text-[10px] text-slate-400 leading-snug">{post.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        };
      case 'Security Policy':
        return {
          title: "Enterprise Security Policy",
          subtitle: "SOC2 Compliance, Guardrails Lockdown, and Data Encryption",
          icon: <Layers className="h-5 w-5 text-violet-400" />,
          content: (
            <div className="space-y-4 text-slate-300 text-xs md:text-sm leading-relaxed text-left">
              <p>
                CommsFlow operates on a **zero-trust client-side workspace model**. We prioritize data containment and identity security:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                <li>**Local Processing:** Templates, data bindings, and layouts are processed directly in your local browser sandbox.</li>
                <li>**Branding Lockdown:** Admins can enforce global HEX restrictions, preventing custom style overrides.</li>
                <li>**Secure APIs:** API keys and pipeline webhooks are cryptographically locked in browser LocalStorage.</li>
              </ul>
              <p className="text-slate-500 text-[10px] pt-1">
                For complete SOC2 audit logs or reporting vulnerabilities, please contact: <a href="mailto:vijayapandian112007@gmail.com" className="text-violet-400 hover:underline">vijayapandian112007@gmail.com</a>
              </p>
            </div>
          )
        };
      case 'Press Kit':
        return {
          title: "Branding & Press Kit",
          subtitle: "Vector assets, logos, and media guidelines",
          icon: <Layers className="h-5 w-5 text-violet-400" />,
          content: (
            <div className="space-y-4 text-slate-300 text-xs md:text-sm leading-relaxed text-left">
              <p>
                Our press kit includes approved media assets, high-res visual mockups, and corporate guidelines vectors to showcase CommsFlow AI in publications.
              </p>
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-3.5 text-center">
                <div className="text-[11px] font-bold text-slate-400">CommsFlow Vector Assets Package (2.4 MB)</div>
                <button onClick={() => alert('Download triggered successfully.')} className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 transition-colors text-[10px] font-bold uppercase tracking-wider text-white rounded-md cursor-pointer">
                  Download Assets ZIP
                </button>
              </div>
              <p className="text-[10px] text-slate-500">
                Please adhere to our brand guide guidelines (locked colors and Outfit fonts) when utilizing our vectors.
              </p>
            </div>
          )
        };
      case 'Privacy Policy':
        return {
          title: "Privacy Policy Guidelines",
          subtitle: "Client-only visual processing declaration",
          icon: <Layers className="h-5 w-5 text-violet-400" />,
          content: (
            <div className="space-y-4 text-slate-300 text-xs md:text-sm leading-relaxed text-left">
              <p>
                Your privacy is paramount. CommsFlow AI is built on a **local-first visual architecture**. 
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                <li>We do **not** transmit your template copy, newsletters, billing tables, or layout data to external servers.</li>
                <li>Workspace folders, active tab configurations, and draft saves reside solely in your browser storage.</li>
                <li>Cookie trackers are completely disabled across our visual editor console.</li>
              </ul>
              <p className="text-[10px] text-slate-500 font-mono">
                Created and audited under compliance regulations. For questions, email: <a href="mailto:vijayapandian112007@gmail.com" className="text-violet-400 hover:underline">vijayapandian112007@gmail.com</a>
              </p>
            </div>
          )
        };
      case 'Terms of Service':
        return {
          title: "Terms of Service Agreement",
          subtitle: "Fair-use document visual editor guidelines",
          icon: <Layers className="h-5 w-5 text-violet-400" />,
          content: (
            <div className="space-y-4 text-slate-300 text-xs md:text-sm leading-relaxed text-left">
              <p>
                By accessing the CommsFlow document builder and studio workspaces, you agree to our standard terms of use:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                <li>**Workspace Ownership:** You retain full copyrights for any compiled HTML, Markdown, or PDF newsletters exported from our editor.</li>
                <li>**Brand Lockdown:** You agree not to reverse-engineer color restrictions set by your workspace administrator.</li>
                <li>**No Liability:** Because templates are processed client-side, CommsFlow is not responsible for any data loss occurring from cleared browser caches.</li>
              </ul>
            </div>
          )
        };
      case 'GDPR compliance':
        return {
          title: "GDPR Compliance Registry",
          subtitle: "User privacy, rights, and local containment data nodes",
          icon: <Layers className="h-5 w-5 text-violet-400" />,
          content: (
            <div className="space-y-4 text-slate-300 text-xs md:text-sm leading-relaxed text-left">
              <p>
                CommsFlow AI is fully aligned with the **General Data Protection Regulation (GDPR)**:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                <li>**Right to Erasure:** Because all workspace configurations, history logs, and layout drafts are stored inside your browser's local sandbox, clearing your history completely deletes all your data from the universe.</li>
                <li>**Data Containment:** We do not collect, process, or sell personal identifiable information (PII).</li>
                <li>**Consent:** No marketing cookie trackers are injected into active editing canvas layers.</li>
              </ul>
            </div>
          )
        };
      case 'Help Center':
      case 'Documentation':
      case 'Design Templates':
      case 'Email Best Practices':
      case 'System Status':
        return {
          title: `${topic} Resource Portal`,
          subtitle: "Self-serve support documentation & guides",
          icon: <Layers className="h-5 w-5 text-violet-400" />,
          content: (
            <div className="space-y-4 text-slate-300 text-xs md:text-sm leading-relaxed text-left">
              <p>
                Welcome to our self-serve resource hub. Here you can find standard guidance on styling layouts, automating email deployments, and locking down corporate branding rules.
              </p>
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-2">
                <div className="font-bold text-white font-heading">Quick FAQ Accordion</div>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  To lockdown branding guidelines, navigate to **Studio Settings &gt; Brand Kit** and toggle **Enforce Global Palette Rules**. This prevents contributors from using custom colors or unauthorized fonts in the canvas editor.
                </div>
              </div>
            </div>
          )
        };
      default:
        return {
          title: "Information Page",
          subtitle: "CommsFlow Visual Studio",
          icon: <Layers className="h-5 w-5 text-violet-400" />,
          content: <p className="text-slate-300 text-xs">Content is currently under revision. Please return shortly.</p>
        };
    }
  };

  const activeContent = getTopicContent(activeTopic);

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
                  <button 
                    onClick={() => setCurrentView('register')} 
                    className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.name}
                  </button>
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
                  <a 
                    href="#" 
                    onClick={(e) => handleLinkClick(e, link.name)} 
                    className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
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
                  <a 
                    href={link.href} 
                    onClick={(e) => handleLinkClick(e, link.name)} 
                    className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
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
          <a href="#" onClick={(e) => handleLinkClick(e, 'Privacy Policy')} className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</a>
          <a href="#" onClick={(e) => handleLinkClick(e, 'Terms of Service')} className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</a>
          <a href="#" onClick={(e) => handleLinkClick(e, 'GDPR compliance')} className="hover:text-slate-300 transition-colors cursor-pointer">GDPR compliance</a>
        </div>
      </div>
      {/* Dynamic Info Modal */}
      <AnimatePresence>
        {modalOpen && activeContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-[#030303]/85 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg relative z-10 glass-card rounded-2xl border border-white/10 p-6 md:p-8 bg-[#09090c] shadow-2xl space-y-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                    {activeContent.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-extrabold text-white font-heading">{activeContent.title}</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">{activeContent.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer shrink-0"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto max-h-[360px] no-scrollbar">
                {activeContent.content}
              </div>

              {/* Actions Footer */}
              <div className="flex justify-end pt-3 border-t border-white/5">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold cursor-pointer border border-white/5"
                >
                  Dismiss Guide
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </footer>
  );
};
