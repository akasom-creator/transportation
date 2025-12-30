import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: CardProps) {
  return (
    <h3
      className={cn('text-lg font-semibold text-gray-900 dark:text-white', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn('px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50', className)}
      {...props}
    >
      {children}
    </div>
  );
}
