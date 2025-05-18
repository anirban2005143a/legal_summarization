import { cn } from '@/lib/utils';
import React from 'react';

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200/70 dark:bg-gray-700/40",
        className
      )}
      {...props}
    />
  );
}
