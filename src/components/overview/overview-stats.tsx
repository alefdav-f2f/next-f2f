'use client';

import type { SiteSummary } from '@/lib/types';

interface OverviewStatsProps {
  summaries: SiteSummary[];
}

export function OverviewStats({ summaries }: OverviewStatsProps) {
  const totalSites = summaries.length;
  const sitesOnline = summaries.filter(s => s.status === 'online').length;
  const totalOutdated = summaries.reduce((sum, s) => sum + s.outdatedCount, 0);
  const totalPending = summaries.reduce((sum, s) => sum + s.queuePendingCount, 0);

  const stats = [
    {
      label: 'Total de Sites',
      value: totalSites,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: 'text-accent',
    },
    {
      label: 'Sites Online',
      value: sitesOnline,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: 'text-success',
    },
    {
      label: 'Desatualizados',
      value: totalOutdated,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      color: totalOutdated > 0 ? 'text-warning' : 'text-success',
    },
    {
      label: 'Fila Pendente',
      value: totalPending,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      color: totalPending > 0 ? 'text-info' : 'text-success',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="gradient-border group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/30"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className={`${stat.color} opacity-70`}>{stat.icon}</span>
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
              {stat.label}
            </span>
          </div>
          <div className="gradient-text text-3xl font-bold font-heading">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
