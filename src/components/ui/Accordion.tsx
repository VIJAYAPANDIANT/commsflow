import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface AccordionItemProps {
  id: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  trigger,
  children,
  isOpen = false,
  onToggle,
}) => {
  return (
    <div className="border-b border-white/5 py-4">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left font-medium text-slate-200 hover:text-white transition-colors duration-200 group py-2"
      >
        <span className="text-base md:text-lg pr-4 font-semibold font-heading">{trigger}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-400 group-hover:text-white transition-colors"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: { height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.25 } }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: { height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.15 } }
            }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-4 text-slate-400 text-sm md:text-base leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AccordionProps {
  items: {
    id: string;
    trigger: React.ReactNode;
    content: React.ReactNode;
  }[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className={clsx("w-full max-w-3xl mx-auto", className)}>
      {items.map(item => (
        <AccordionItem
          key={item.id}
          id={item.id}
          trigger={item.trigger}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
