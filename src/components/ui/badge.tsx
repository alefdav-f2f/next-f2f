'use client';

import { type ReactNode } from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info';

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
  danger: 'bg-danger-bg text-danger',
  info: 'bg-info-bg text-info',
};

const dotStyles: Record<BadgeVariant, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
};

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  dot?: boolean;
}

export function Badge({ variant, children, dot = true }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide ${variantStyles[variant]}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full animate-pulse-dot ${dotStyles[variant]}`}
        />
      )}
      {children}
    </span>
  );
}
