'use client';

import Link from 'next/link';
import type { SiteSummary } from '@/lib/types';
import { StatusDot } from '@/components/ui/status-dot';

interface SiteCardProps {
  site: SiteSummary;
  index: number;
}

export function SiteCard({ site, index }: SiteCardProps) {
  return (
    <Link
      href={`/sites/${site.id}`}
      className="gradient-border group relative block overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 hover:border-accent/30 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] truncate group-hover:text-accent transition-colors">
            {site.name}
          </h3>
          <p className="mt-0.5 text-xs text-[var(--text-tertiary)] truncate font-mono">
            {site.url.replace(/^https?:\/\//, '')}
          </p>
        </div>
        <StatusDot status={site.status} size="md" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-[var(--bg-tertiary)] px-3 py-2 text-center">
          <div className={`text-lg font-bold font-heading ${site.outdatedCount > 0 ? 'text-warning' : 'text-success'}`}>
            {site.outdatedCount}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">
            Desatualiz.
          </div>
        </div>
        <div className="rounded-xl bg-[var(--bg-tertiary)] px-3 py-2 text-center">
          <div className="text-lg font-bold font-heading text-accent">
            {site.activityTodayCount}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">
            Atividades
          </div>
        </div>
        <div className="rounded-xl bg-[var(--bg-tertiary)] px-3 py-2 text-center">
          <div className={`text-lg font-bold font-heading ${site.queuePendingCount > 0 ? 'text-info' : 'text-success'}`}>
            {site.queuePendingCount}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">
            Fila
          </div>
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
        <svg className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="none">
          <path d="M8 6L12 10L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}
