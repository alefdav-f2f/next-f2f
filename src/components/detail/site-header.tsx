'use client';

import Link from 'next/link';
import type { Site } from '@/lib/types';
import { StatusDot } from '@/components/ui/status-dot';

interface SiteHeaderProps {
  site: Site;
  status?: 'online' | 'offline' | 'error';
}

export function SiteHeader({ site, status = 'online' }: SiteHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/"
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] transition-colors hover:border-accent hover:text-accent"
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
          <path d="M12 6L8 10L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <div className="flex items-center gap-3">
        <StatusDot status={status} size="md" />
        <div>
          <h2 className="font-heading text-lg font-bold text-[var(--text-primary)]">
            {site.name}
          </h2>
          <p className="text-xs font-mono text-[var(--text-tertiary)]">
            {site.url.replace(/^https?:\/\//, '')}
          </p>
        </div>
      </div>
    </div>
  );
}
