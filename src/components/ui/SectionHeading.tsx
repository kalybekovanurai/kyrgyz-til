import React from 'react';
import { cn } from '@/src/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = false, 
  className 
}: SectionHeadingProps) => {
  return (
    <div className={cn('space-y-3 sm:space-y-4 mb-8 md:mb-12', centered && 'text-center', className)}>
      <div className={cn('flex items-center gap-3 sm:gap-4', centered && 'justify-center')}>
        <div className="h-1 w-8 sm:w-12 bg-brand-primary shrink-0" />
        {subtitle && (
          <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.16em] sm:tracking-[0.22em] text-brand-primary leading-snug">
            {subtitle}
          </p>
        )}
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-brand-primary uppercase tracking-normal leading-tight">
        {title}
      </h2>
    </div>
  );
};
