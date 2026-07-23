import React from 'react';
import { motion } from 'framer-motion';

interface CompanyItem {
  name: string;
  logo: React.ReactNode;
}

export const TrustedCompanies: React.FC = () => {
  const companies: CompanyItem[] = [
    { 
      name: 'Stripe', 
      logo: (
        <svg className="w-5 h-5 mr-2 text-[#635BFF] fill-current" viewBox="0 0 24 24">
          <path d="M13.962 10.3c0-1.8-1.5-2.5-4.1-2.5-2.8 0-4.8.9-4.8 3.5 0 2.9 3.8 2.4 3.7 3.7 0 .5-.5.8-1.3.8-1.2 0-2.5-.5-3.3-1l-.8 3.1c1 .5 2.6.9 4.1.9 4.2 0 4.9-2.2 4.9-3.5 0-3.3-3.6-2.5-3.6-3.8 0-.4.4-.7 1.1-.7 1-.1 2.2.3 3 .7l1-3.2z"/>
        </svg>
      )
    },
    { 
      name: 'Vercel', 
      logo: (
        <svg className="w-4.5 h-4.5 mr-2 text-white fill-current" viewBox="0 0 24 24">
          <path d="M24 22.525H0L12 1.475L24 22.525Z" />
        </svg>
      )
    },
    { 
      name: 'Linear', 
      logo: (
        <svg className="w-4.5 h-4.5 mr-2 text-[#5E6AD2] fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      )
    },
    { 
      name: 'Notion', 
      logo: (
        <svg className="w-4.5 h-4.5 mr-2 text-white fill-current" viewBox="0 0 24 24">
          <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-15zM6.75 6v10.5L9.6 14v-6L14.4 15V6.75l-2.85 2.25v6L6.75 6z" />
        </svg>
      )
    },
    { 
      name: 'Figma', 
      logo: (
        <svg className="w-4 h-5 mr-2" viewBox="0 0 12 18" fill="currentColor">
          <path fill="#F24E1E" d="M3 9a3 3 0 1 1 0-6h3v6H3z"/>
          <path fill="#A259FF" d="M3 15a3 3 0 1 1 0-6h3v6H3z"/>
          <path fill="#0ACF83" d="M3 15a3 3 0 0 1 3-3v3a3 3 0 0 1-3 3z"/>
          <path fill="#1ABC9C" d="M9 9a3 3 0 0 1-3-3V3a3 3 0 0 1 3 3v3z"/>
          <path fill="#19BCFE" d="M9 9a3 3 0 1 1 0-6h-3v6h3z"/>
        </svg>
      )
    },
    { 
      name: 'Supabase', 
      logo: (
        <svg className="w-4.5 h-4.5 mr-2 text-[#3ECF8E] fill-current" viewBox="0 0 24 24">
          <path d="M21.36 11.23l-8.62 10.78a.63.63 0 0 1-1-.77l3.22-7.58H5.64a.63.63 0 0 1-.49-1L13.78 2a.63.63 0 0 1 1 .77L11.57 10.3h8.3a.63.63 0 0 1 .49.93z" />
        </svg>
      )
    },
    { 
      name: 'Airbnb', 
      logo: (
        <svg className="w-4.5 h-4.5 mr-2 text-[#FF5A5F] fill-current" viewBox="0 0 24 24">
          <path d="M12 2c-.3 0-.6.1-.8.4l-9 15.6c-.3.5-.3 1.1 0 1.6.3.5.8.8 1.4.8h17c.5 0 1-.3 1.3-.8s.3-1.1 0-1.6l-9-15.6c-.2-.3-.5-.4-.9-.4zm0 2.8l7.6 13.2h-15.2l7.6-13.2zm0 6.2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      )
    },
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
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 font-heading">
          Trusted by high-growth product teams worldwide
        </h2>
      </div>

      {/* Mask Gradient for Fade Edges */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-20 pointer-events-none" />
        
        {/* Right Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-20 pointer-events-none" />

        {/* Rolling Container */}
        <div className="flex w-max space-x-24 animate-infinite-scroll py-2">
          {/* Loop twice for infinite effect */}
          {companies.concat(companies).map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex items-center text-slate-500 hover:text-white transition-colors duration-300 cursor-pointer select-none group"
            >
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {company.logo}
              </div>
              <span className="font-heading font-bold text-sm tracking-tight ml-1">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
