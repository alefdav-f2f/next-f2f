'use client';

import { useMobileMenu } from './app-shell';

interface TopbarProps {
  title: string;
  subtitle?: string;
  lastRefresh?: Date | null;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  actions?: React.ReactNode;
}

export function Topbar({
  title,
  subtitle,
  lastRefresh,
  onRefresh,
  isRefreshing,
  actions,
}: TopbarProps) {
  const { toggle: mobileMenuToggle } = useMobileMenu();
  const formatTime = (date: Date) => {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <header className="sticky top-0 z-30 flex min-h-[72px] items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/80 px-6 backdrop-blur-xl lg:px-8">
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        {mobileMenuToggle && (
          <button
            onClick={mobileMenuToggle}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] transition-colors hover:border-accent hover:text-accent lg:hidden"
            aria-label="Toggle Menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}

        <div>
          <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            {title}
          </h1>
          {(subtitle || lastRefresh) && (
            <p className="text-sm text-[var(--text-tertiary)]">
              {subtitle || (lastRefresh ? `Atualizado: ${formatTime(lastRefresh)}` : '')}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {actions}
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-medium text-white transition-all hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C12.7 3 15.0301 4.69 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 3V7H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Atualizar</span>
          </button>
        )}
      </div>
    </header>
  );
}
