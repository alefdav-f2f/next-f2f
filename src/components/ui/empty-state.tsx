import { type ReactNode } from 'react';

interface EmptyStateProps {
  message: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ message, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--bg-secondary)] px-8 py-16 text-center">
      {icon && (
        <div className="mb-4 text-[var(--text-tertiary)]">{icon}</div>
      )}
      <p className="text-lg font-medium text-[var(--text-secondary)]">{message}</p>
      {description && (
        <p className="mt-1 text-sm text-[var(--text-tertiary)]">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
