import React from 'react';

export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}></div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <LoadingSkeleton className="h-4 w-24 mb-4" />
      <LoadingSkeleton className="h-8 w-full mb-2" />
      <LoadingSkeleton className="h-4 w-3/4" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <LoadingSkeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <LoadingSkeleton className="h-4 w-3/4" />
            <LoadingSkeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
      <LoadingSkeleton className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
        </div>
      </div>
    </div>
  );
}

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`animate-spin rounded-full border-b-2 border-primary-600 ${sizeClasses[size]}`}></div>
  );
}
