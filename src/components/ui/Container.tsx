import React from 'react';
import { cn } from '@/src/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
  [key: string]: any;
}

export const Container = ({ children, className, size = 'default' }: ContainerProps) => {
  const sizeClasses = {
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-[1440px]',
    full: 'max-w-full',
  };

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0', sizeClasses[size], className)}>
      {children}
    </div>
  );
};
