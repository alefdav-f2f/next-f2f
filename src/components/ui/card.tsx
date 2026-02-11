import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 shadow-sm transition-all duration-300
        ${hover ? 'gradient-border cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/30' : ''}
        ${className}`}
    >
      {children}
    </div>
  );
}
