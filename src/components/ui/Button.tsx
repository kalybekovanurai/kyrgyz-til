import React from 'react';
import { cn } from '@/src/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'ink';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-ink',
    secondary: 'bg-white text-brand-primary shadow-sm hover:shadow-md border border-gray-100',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
    ghost: 'text-brand-primary hover:bg-slate-50',
    ink: 'bg-brand-ink text-white hover:bg-brand-primary',
  };

  const sizes = {
    sm: 'px-4 sm:px-5 py-2 text-[11px]',
    md: 'px-5 sm:px-7 py-3 text-[11px] sm:text-xs',
    lg: 'px-7 sm:px-10 py-4 text-xs sm:text-sm',
  };

  return (
    <button
      className={cn(
        'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 sm:gap-3 font-black uppercase tracking-[0.12em] sm:tracking-widest leading-tight text-center transition-all rounded-md disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </button>
  );
};
