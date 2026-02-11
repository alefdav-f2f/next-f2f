'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface OverviewHeaderProps {
  lastRefresh: Date | null;
  onRefresh: () => void;
  isRefreshing: boolean;
  totalSites: number;
}

export function OverviewHeader({
  lastRefresh,
  onRefresh,
  isRefreshing,
  totalSites,
}: OverviewHeaderProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="heading-xl gradient-text mb-2">
          Command Center
        </h1>
        <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)]">
          <span className="flex items-center gap-2">
            <span className="status-dot status-online" />
            <span className="mono">{totalSites} sites monitorados</span>
          </span>
          {lastRefresh && (
            <>
              <span className="hidden sm:inline">•</span>
              <span className="mono">
                Última atualização: {formatTime(lastRefresh)}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/sites/manage">
          <Button variant="outline">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            Gerenciar
          </Button>
        </Link>
        <Button onClick={onRefresh} disabled={isRefreshing}>
          <svg
            className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C12.7 3 15.0301 4.69 16 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M16 3V7H12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Atualizar
        </Button>
      </div>
    </div>
  );
}
