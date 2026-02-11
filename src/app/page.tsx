'use client';

import Link from 'next/link';
import { Topbar } from '@/components/layout/topbar';
import { OverviewStats } from '@/components/overview/overview-stats';
import { SiteCard } from '@/components/overview/site-card';
import { EmptyState } from '@/components/ui/empty-state';
import { CardSkeleton } from '@/components/ui/skeleton';
import { useSiteSummaries } from '@/hooks/use-site-data';
import { useAutoRefresh } from '@/hooks/use-auto-refresh';
import { Button } from '@/components/ui/button';

export default function OverviewPage() {
  const { data: summaries, isLoading, refresh } = useSiteSummaries();
  const { lastRefresh, isRefreshing, refresh: doRefresh } = useAutoRefresh(refresh);

  return (
    <div>
      <Topbar
        title="Overview"
        lastRefresh={lastRefresh}
        onRefresh={doRefresh}
        isRefreshing={isRefreshing}
      />

      <div className="space-y-6 p-6 lg:p-8">
        {!isLoading && summaries.length > 0 && (
          <OverviewStats summaries={summaries} />
        )}

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : summaries.length === 0 ? (
          <EmptyState
            message="Nenhum site cadastrado"
            description="Adicione seu primeiro site WordPress para começar o monitoramento."
            icon={
              <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
              </svg>
            }
            action={
              <Link href="/sites/manage">
                <Button>Adicionar Site</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {summaries.map((site, i) => (
              <SiteCard key={site.id} site={site} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
