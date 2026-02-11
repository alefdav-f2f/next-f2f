'use client';

import type { VersionItem, ActivityItem, QueueStatusItem } from '@/lib/types';

interface SiteStatsProps {
  versions: VersionItem[];
  activities: ActivityItem[];
  queue: QueueStatusItem[];
}

export function SiteStats({ versions, activities, queue }: SiteStatsProps) {
  const outdated = versions.filter(v => v.is_outdated).length;
  const today = new Date().toISOString().split('T')[0];
  const todayCount = activities.filter(a => a.created_at.startsWith(today)).length;
  const pending = queue.find(q => q.status === 'pending');
  const pendingCount = pending ? pending.count : 0;

  const stats = [
    { label: 'Desatualizados', value: outdated, color: outdated > 0 ? 'text-warning' : 'text-success' },
    { label: 'Atividades Hoje', value: todayCount, color: 'text-accent' },
    { label: 'Fila Pendente', value: pendingCount, color: pendingCount > 0 ? 'text-info' : 'text-success' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="gradient-border relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
            {stat.label}
          </span>
          <div className={`mt-2 gradient-text text-3xl font-bold font-heading`}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
