import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#030303]">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-80" />

      {/* Radial Gradient Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.25),rgba(0,0,0,0)_60%)]" />

      {/* Floating Glowing Orbs */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] mix-blend-screen"
      />

      <motion.div
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 80, -50, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px] mix-blend-screen"
      />

      <motion.div
        animate={{
          x: [0, 30, -50, 0],
          y: [0, 40, -40, 0],
          scale: [1, 1.1, 0.85, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/3 w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[100px] mix-blend-screen"
      />
    </div>
  );
};
