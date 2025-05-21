import { cn } from '@/lib/utils';
import React from 'react';

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-500/20 ",
        className
      )}
      {...props}
    />
  );
}
