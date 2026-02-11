'use client';

import Link from 'next/link';
import type { SiteSummary } from '@/lib/types';
import { MiniSparkline } from '@/components/ui/mini-sparkline';

interface SiteCardProps {
  site: SiteSummary;
}

export function SiteCard({ site }: SiteCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'status-online';
      case 'warning':
        return 'status-warning';
      case 'error':
        return 'status-error';
      default:
        return 'status-info';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'warning':
        return 'Atenção';
      case 'error':
        return 'Erro';
      default:
        return 'Desconhecido';
    }
  };

  // Mock data for sparkline (in real app, this would come from API)
  const activityData = [3, 5, 2, 8, 6, 9, site.activityTodayCount];

  return (
    <Link
      href={`/sites/${site.id}`}
      className="card-elevated p-5 group block relative overflow-hidden h-full flex flex-col"
    >
      {/* Status glow effect */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${
          site.status === 'online' ? 'bg-success' : site.outdatedCount > 0 ? 'bg-warning' : 'bg-info'
        }`}
      />

      {/* Header */}
      <div className="mb-4 flex-shrink-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="heading-md text-[var(--text-primary)] truncate group-hover:text-accent transition-colors">
              {site.name}
            </h3>
            <p className="text-xs text-[var(--text-tertiary)] truncate mono mt-0.5">
              {site.url.replace(/^https?:\/\//, '')}
            </p>
          </div>
          <span className={`status-dot ${getStatusColor(site.status)}`} />
        </div>

        {/* Status label */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--text-secondary)] mono">
            {getStatusLabel(site.status)}
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2 mb-4 flex-shrink-0">
        <div className="bg-[var(--bg-tertiary)] rounded-lg p-3 text-center">
          <div
            className={`text-lg font-bold heading-md ${
              site.outdatedCount > 0 ? 'text-warning' : 'text-success'
            }`}
          >
            {site.outdatedCount}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mt-1">
            Desatual.
          </div>
        </div>

        <div className="bg-[var(--bg-tertiary)] rounded-lg p-3 text-center">
          <div className="text-lg font-bold heading-md text-accent">
            {site.activityTodayCount}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mt-1">
            Atividade
          </div>
        </div>

        <div className="bg-[var(--bg-tertiary)] rounded-lg p-3 text-center">
          <div
            className={`text-lg font-bold heading-md ${
              site.queuePendingCount > 5 ? 'text-warning' : site.queuePendingCount > 0 ? 'text-info' : 'text-success'
            }`}
          >
            {site.queuePendingCount}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mt-1">
            Fila
          </div>
        </div>
      </div>

      {/* Activity sparkline - sempre reserva o espaço */}
      <div className="mb-3 flex-shrink-0" style={{ minHeight: '60px' }}>
        {site.activityTodayCount > 0 ? (
          <>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">
                Atividade (7 dias)
              </span>
            </div>
            <MiniSparkline data={activityData} height={30} />
          </>
        ) : (
          <div className="h-full" />
        )}
      </div>

      {/* Hover arrow */}
      <div className="flex items-center justify-end mt-auto">
        <span className="text-xs text-[var(--text-tertiary)] group-hover:text-accent transition-colors mono">
          Ver detalhes
        </span>
        <svg
          className="w-4 h-4 ml-1 text-[var(--text-tertiary)] group-hover:text-accent group-hover:translate-x-1 transition-all"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M7 3l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
}
