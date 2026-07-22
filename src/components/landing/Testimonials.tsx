import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  text: string;
  avatarInitials: string;
  avatarBg: string;
  rating: number;
  delay: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  company,
  text,
  avatarInitials,
  avatarBg,
  rating,
  delay
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-xl p-6 md:p-8 flex flex-col justify-between text-left relative overflow-hidden bg-[#09090c]/30 hover:bg-[#0d0d12]/50"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-glow opacity-25 pointer-events-none rounded-full" />
      
      <div>
        {/* Stars */}
        <div className="flex space-x-1 mb-5">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-500/80 text-yellow-500/80" />
          ))}
        </div>
        
        {/* Review text */}
        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 italic">
          "{text}"
        </p>
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-3 border-t border-white/5 pt-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white uppercase tracking-wider shrink-0 bg-gradient-to-br ${avatarBg}`}>
          {avatarInitials}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white truncate font-heading">{name}</div>
          <div className="text-xs text-slate-500 truncate">
            {role} • <span className="text-slate-400">{company}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "VP of People Operations",
      company: "Acme Corp",
      text: "CommsFlow completely solved our internal newsletter issues. We designed a beautiful, interactive update template and now every department uses it. Engagement is up 40%!",
      avatarInitials: "SJ",
      avatarBg: "from-purple-500 to-indigo-600",
      rating: 5
    },
    {
      name: "Alex Rivera",
      role: "Lead Platform Engineer",
      company: "Supabase Labs",
      text: "We automate our public release notes and incident updates through the CommsFlow API. It translates markdown into stunning HTML templates that render perfectly in any mail app.",
      avatarInitials: "AR",
      avatarBg: "from-emerald-500 to-teal-600",
      rating: 5
    },
    {
      name: "Marcus Vance",
      role: "Director of Product Marketing",
      company: "Linear Inc",
      text: "We wanted clean, Vercel-style typography and dark mode defaults. CommsFlow gave us the visual controls to enforce branding guidelines across multiple regional marketing units.",
      avatarInitials: "MV",
      avatarBg: "from-rose-500 to-orange-500",
      rating: 5
    },
    {
      name: "Elena Rostova",
      role: "Head of Customer Support",
      company: "CloudFlare",
      text: "With saved block libraries, my support reps can insert pre-approved system warning notices and instructions into customer responses instantly. Saving us hours of rework daily.",
      avatarInitials: "ER",
      avatarBg: "from-blue-500 to-cyan-500",
      rating: 5
    },
    {
      name: "Devon Carter",
      role: "Chief Financial Officer",
      company: "Stripe Flow",
      text: "Our invoicing and custom price quote sheets now have clean grids, beautiful typography, and consistent logos. It makes our enterprise billing operations feel incredibly premium.",
      avatarInitials: "DC",
      avatarBg: "from-fuchsia-500 to-pink-500",
      rating: 5
    },
    {
      name: "Lando Griffin",
      role: "Head of Communications",
      company: "Vercel Systems",
      text: "Our global newsletter styling is finally locked down. Product teams compose their segments visually, and our design team is confident that the styling never breaks.",
      avatarInitials: "LG",
      avatarBg: "from-violet-500 to-fuchsia-600",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="relative py-20 md:py-32 z-10">
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
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">Testimonials</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight font-heading"
          >
            Loved by creators, <span className="text-gradient">approved by enterprise</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg leading-relaxed"
          >
            Read how global communication, HR, and development teams centralize visual layouts and elevate their daily operations.
          </motion.p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, index) => (
            <TestimonialCard
              key={t.name}
              name={t.name}
              role={t.role}
              company={t.company}
              text={t.text}
              avatarInitials={t.avatarInitials}
              avatarBg={t.avatarBg}
              rating={t.rating}
              delay={index * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
