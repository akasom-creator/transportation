'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { slideInVariants } from '@/lib/animations';

interface SlideInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function SlideIn ({ children, delay = 0, className }: SlideInProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInVariants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
