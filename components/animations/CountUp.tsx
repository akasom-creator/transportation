'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({ end, duration = 2, suffix = '', prefix = '', className }: CountUpProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState('0');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const animation = animate(count, end, { duration });
    
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest.toLocaleString());
    });

    return () => {
      animation.stop();
      unsubscribe();
    };
  }, [end, duration, count, rounded]);

  if (!mounted) {
    return <span className={className}>{prefix}0{suffix}</span>;
  }

  return (
    <span className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
