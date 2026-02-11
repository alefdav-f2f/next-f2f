'use client';

import type { SiteSummary } from '@/lib/types';
import { ProgressRing } from '@/components/ui/progress-ring';

interface OverviewStatsProps {
  summaries: SiteSummary[];
}

type StatColor = 'success' | 'warning' | 'danger' | 'info';

interface StatItem {
  label: string;
  value: number;
  total?: number;
  percentage?: number;
  suffix?: string;
  icon: React.ReactNode;
  color: StatColor;
  trend?: string;
  showRing?: boolean;
  pulse?: boolean;
}

export function OverviewStats({ summaries }: OverviewStatsProps) {
  const totalSites = summaries.length;
  const sitesOnline = summaries.filter((s) => s.status === 'online').length;
  const totalOutdated = summaries.reduce((sum, s) => sum + s.outdatedCount, 0);
  const totalPending = summaries.reduce((sum, s) => sum + s.queuePendingCount, 0);
  const totalActivitiesToday = summaries.reduce((sum, s) => sum + s.activityTodayCount, 0);

  const onlinePercentage = totalSites > 0 ? (sitesOnline / totalSites) * 100 : 0;
  const healthScore = totalSites > 0 ? ((sitesOnline - totalOutdated * 0.5) / totalSites) * 100 : 0;

  const stats: StatItem[] = [
    {
      label: 'Sites Online',
      value: sitesOnline,
      total: totalSites,
      percentage: onlinePercentage,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: 'success',
      trend: '+2.5%',
    },
    {
      label: 'Saúde Geral',
      value: Math.round(healthScore),
      suffix: '%',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: (healthScore > 75 ? 'success' : healthScore > 50 ? 'warning' : 'danger') as StatColor,
      showRing: true,
    },
    {
      label: 'Desatualizados',
      value: totalOutdated,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: (totalOutdated > 0 ? 'warning' : 'success') as StatColor,
      trend: totalOutdated > 0 ? `-${totalOutdated}` : '0',
    },
    {
      label: 'Atividades Hoje',
      value: totalActivitiesToday,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M13 10V3L4 14h7v7l9-11h-7z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: 'info',
      trend: '+12',
    },
    {
      label: 'Fila Pendente',
      value: totalPending,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: (totalPending > 5 ? 'warning' : 'info') as StatColor,
      pulse: totalPending > 0,
    },
  ];

  const getColorClass = (color: StatColor) => {
    const colors = {
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
      info: 'text-info',
    };
    return colors[color];
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, i) => {
        return (
          <div
            key={stat.label}
            className="card-elevated p-6 group"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
          {/* Icon & Trend */}
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2 rounded-lg bg-[var(--bg-tertiary)] ${getColorClass(stat.color)} transition-transform group-hover:scale-110`}>
              {stat.icon}
            </div>
            {stat.trend && (
              <span className={`text-xs mono ${getColorClass(stat.color)}`}>
                {stat.trend}
              </span>
            )}
          </div>

          {/* Value */}
          <div className="mb-2">
            {stat.showRing ? (
              <div className="flex items-center gap-4">
                <ProgressRing
                  progress={stat.value}
                  size={60}
                  strokeWidth={6}
                  color={stat.color}
                />
                <div>
                  <div className={`heading-xl ${getColorClass(stat.color)}`}>
                    {stat.value}
                    {stat.suffix}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`heading-xl ${getColorClass(stat.color)} ${stat.pulse ? 'glow-pulse' : ''}`}>
                {stat.value}
                {stat.suffix}
                {stat.total && (
                  <span className="text-sm text-[var(--text-tertiary)] ml-1">
                    / {stat.total}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Label */}
          <div className="text-xs uppercase tracking-wider font-medium text-[var(--text-tertiary)]">
            {stat.label}
          </div>
        </div>
        );
      })}
    </div>
  );
}
