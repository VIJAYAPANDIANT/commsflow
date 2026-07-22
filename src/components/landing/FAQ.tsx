import React from 'react';
import { motion } from 'framer-motion';
import { Accordion } from '../ui/Accordion';

export const FAQ: React.FC = () => {
  const faqItems = [
    {
      id: "faq-1",
      trigger: "What is CommsFlow AI?",
      content: "CommsFlow AI is a centralized business communication studio that allows non-designers across all departments (HR, Engineering, Support, Marketing) to visually build beautiful corporate documents and emails using Unlayer Elements."
    },
    {
      id: "faq-2",
      trigger: "How do the Brand Guardrails work?",
      content: "Administrators can pre-configure system brand guides containing approved color HEX codes, specific typography files, official logos, and header/footer blocks. Once locked, other team members can only select from these approved styles, preventing inconsistent branding."
    },
    {
      id: "faq-3",
      trigger: "What export formats are supported?",
      content: "You can export assets as clean, responsive HTML emails (optimized to prevent rendering issues in Outlook, Apple Mail, and Gmail), print-ready PDFs, or standard Markdown files for knowledge bases or Slack announcements."
    },
    {
      id: "faq-4",
      trigger: "Can we integrate CommsFlow with our existing stack?",
      content: "Yes. CommsFlow fits into your pipeline. You can export directly into HubSpot, Salesforce, Mailchimp, or Zendesk. Enterprise customers can use webhooks or programmatic API nodes to automate document exports from CI/CD systems."
    },
    {
      id: "faq-5",
      trigger: "Is there a free trial?",
      content: "Absolutely. We offer a 14-day free trial on our Professional plan, with no credit card required. If you decide not to upgrade, you can continue using our Starter plan for free indefinitely."
    },
    {
      id: "faq-6",
      trigger: "Is my organization's data secure?",
      content: "Yes, security is a priority. We don't store your sensitive customer databases or delivery logs. Everything is processed client-side and saved in encrypted mock stores, adhering to modern compliance benchmarks."
    }
  ];

  return (
    <section id="faq" className="relative py-20 md:py-32 z-10">
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
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">Questions</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight font-heading"
          >
            Frequently asked <span className="text-gradient">questions</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg leading-relaxed"
          >
            Have queries about workspaces, API nodes, billing policies, or visual template editing? Here are quick answers.
          </motion.p>
        </div>

        {/* Accordion container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Accordion items={faqItems} />
        </motion.div>

      </div>
    </section>
  );
};
