import React from 'react';
import { cn, getSeverityColor } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  severity,
  children,
  ...props
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
    success: 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400',
    danger: 'bg-danger-100 text-danger-800 dark:bg-danger-900/20 dark:text-danger-400',
    warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400',
    info: 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const severityClass = severity ? getSeverityColor(severity) : '';

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        sizeClasses[size],
        severity ? severityClass : variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
