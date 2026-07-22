import React from 'react';
import { motion } from 'framer-motion';

export const TrustedCompanies: React.FC = () => {
  const companies = [
    { name: 'Stripe', logo: 'Stripe' },
    { name: 'Vercel', logo: 'Vercel' },
    { name: 'Linear', logo: 'Linear' },
    { name: 'Notion', logo: 'Notion' },
    { name: 'Figma', logo: 'Figma' },
    { name: 'Supabase', logo: 'Supabase' },
    { name: 'Airbnb', logo: 'Airbnb' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="relative py-12 md:py-16 overflow-hidden z-10 border-y border-white/5 bg-[#030303]/40 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-heading">
          Trusted by high-growth product teams worldwide
        </h2>
      </div>

      {/* Mask Gradient for Fade Edges */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-20 pointer-events-none" />
        
        {/* Right Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-20 pointer-events-none" />

        {/* Rolling Container */}
        <div className="flex w-max space-x-16 animate-infinite-scroll py-2">
          {/* First loop */}
          {companies.concat(companies).map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex items-center space-x-2 text-slate-500 hover:text-slate-300 transition-colors duration-300 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center font-bold font-heading text-[10px] text-slate-400">
                {company.name[0]}
              </div>
              <span className="font-heading font-bold text-sm tracking-tight">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
