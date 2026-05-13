import React from 'react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  [key: string]: any; // Allow key and other props
}

export const Card = ({ 
  children, 
  className, 
  hoverEffect = true,
  padding = 'md' 
}: CardProps) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-5 sm:p-6 md:p-8',
    lg: 'p-6 sm:p-8 md:p-10 lg:p-12',
    xl: 'p-8 sm:p-10 md:p-12 lg:p-16',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'bg-white rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm transition-all',
        hoverEffect && 'hover:shadow-xl hover:-translate-y-1',
        paddings[padding],
        className
      )}
    >
      {children}
    </motion.div>
  );
};
