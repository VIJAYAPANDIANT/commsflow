import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';

export const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('annually');

  const plans = [
    {
      name: "Starter",
      description: "For small teams and individual content creators starting out.",
      price: { monthly: 0, annually: 0 },
      buttonText: "Start Building",
      buttonVariant: "outline" as const,
      features: [
        "Single workspace folder",
        "Drag & drop document builder",
        "Standard templates",
        "Export to HTML format",
        "Community support"
      ]
    },
    {
      name: "Professional",
      description: "For scaling departments requiring brand controls and sharing.",
      price: { monthly: 59, annually: 47 },
      buttonText: "Get Started Free",
      buttonVariant: "primary" as const,
      popular: true,
      features: [
        "Up to 5 team workspaces",
        "Unlock all Unlayer Elements",
        "Brand style guide enforcement",
        "Reusable template blocks library",
        "Export to HTML, Markdown, & PDF",
        "Priority Slack & Email support"
      ]
    },
    {
      name: "Enterprise",
      description: "For organizations seeking programmatic delivery and integrations.",
      price: { monthly: 249, annually: 199 },
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      features: [
        "Unlimited workspaces",
        "CI/CD webhook auto-exports",
        "Custom API delivery nodes",
        "SSO / SAML authentication",
        "Dedicated account success manager",
        "99.9% uptime SLA guarantee"
      ]
    }
  ];

  return (
    <section id="pricing" className="relative py-20 md:py-32 z-10 bg-[#060608]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">Pricing Plans</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight font-heading">
            Simple, <span className="text-gradient">predictable pricing</span>
          </h2>
          
          <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
            Start completely free. Upgrade to unlock unified workspace templates, custom API nodes, and brand lockdowns.
          </p>

          {/* Billing Period Toggle */}
          <div className="inline-flex items-center justify-center p-1 bg-white/5 rounded-xl border border-white/10 relative">
            <button
              type="button"
              onClick={() => setBillingPeriod('monthly')}
              className={`relative z-10 px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${
                billingPeriod === 'monthly' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod('annually')}
              className={`relative z-10 px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${
                billingPeriod === 'annually' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual Billing
            </button>
            
            {/* Sliding backdrop */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute inset-y-1 bg-white/10 border border-white/10 rounded-lg"
              style={{
                left: billingPeriod === 'monthly' ? '4px' : 'calc(50% + 2px)',
                right: billingPeriod === 'monthly' ? 'calc(50% + 2px)' : '4px',
              }}
            />
            
            {/* Discount Badge */}
            <span className="absolute -top-3.5 -right-16 px-2 py-0.5 rounded bg-violet-600 border border-violet-400/20 text-white font-mono text-[9px] font-bold tracking-wider">
              SAVE 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {plans.map((plan) => {
            const displayPrice = billingPeriod === 'annually' ? plan.price.annually : plan.price.monthly;
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`glass-card rounded-2xl p-8 flex flex-col justify-between text-left relative overflow-hidden bg-[#09090c]/30 ${
                  plan.popular ? 'border-violet-500/40 ring-1 ring-violet-500/30' : ''
                }`}
              >
                {/* Popular Glow Effect */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/15 blur-3xl pointer-events-none rounded-full" />
                )}

                <div>
                  {/* Top Bar for Popular badge */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white font-heading">{plan.name}</h3>
                    {plan.popular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-400 text-[10px] font-extrabold tracking-wider font-heading">
                        MOST POPULAR
                      </span>
                    )}
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Price display */}
                  <div className="flex items-baseline space-x-1.5 mb-8">
                    <span className="text-4xl font-extrabold text-white font-heading">${displayPrice}</span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/5 mb-8" />

                  {/* Feature Checklist */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start space-x-3 text-xs text-slate-300">
                        <div className="w-4.5 h-4.5 rounded-full bg-violet-600/10 border border-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-violet-400" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call-to-action button */}
                <Button
                  variant={plan.buttonVariant}
                  size="md"
                  className="w-full font-bold uppercase tracking-wider text-[11px]"
                >
                  {plan.buttonText}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
