import React from 'react';
import { motion } from 'framer-motion';
import { Move, ShieldCheck, Download, FolderGit, BookOpen, BarChart3 } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card glow-border rounded-xl p-6 md:p-8 flex flex-col items-start text-left relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-glow opacity-30 pointer-events-none rounded-full" />
      <div className="w-12 h-12 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-6 text-violet-400">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-bold text-white mb-3 font-heading">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

export const Features: React.FC = () => {
  const featuresList = [
    {
      icon: <Move className="h-6 w-6" />,
      title: "Visual Drag & Drop",
      description: "Build premium newsletters, HR notifications, and release notes easily. Place spacers, columns, images, and buttons in seconds."
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Brand Guardrails",
      description: "Lockdown logos, fonts, and colors globally. Ensure every document sent by HR or Support adheres to the brand book guidelines."
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Clean Export Pipeline",
      description: "Export directly to responsive HTML, PDF, or raw Markdown. Ready to paste into Mailchimp, SendGrid, Zendesk, or Slack."
    },
    {
      icon: <FolderGit className="h-6 w-6" />,
      title: "Team Workspaces",
      description: "Isolate projects into HR, Engineering, Operations, and Finance folders. Manage permissions and template access with ease."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Dynamic Component Library",
      description: "Save custom footers, headers, or warning cards. Let any department import your pre-approved blocks with a single click."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Real-time Metrics",
      description: "Track click-throughs, read times, and open rates for all external newsletters and internal HR announcements in one hub."
    }
  ];

  return (
    <section id="features" className="relative py-20 md:py-32 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">Features</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight font-heading"
          >
            Everything you need to <span className="text-gradient">streamline business messaging</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg leading-relaxed"
          >
            Empower every department to produce pixel-perfect, on-brand emails and documents. No more duplicate work, fragmented templates, or broken layouts.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuresList.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
