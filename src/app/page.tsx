'use client';

import Link from 'next/link';
import { OverviewHeader } from '@/components/overview/overview-header';
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
    <div className="space-y-8 py-8">
      {/* Header with refresh controls */}
      <OverviewHeader
        lastRefresh={lastRefresh}
        onRefresh={doRefresh}
        isRefreshing={isRefreshing}
        totalSites={summaries.length}
      />

      {/* Stats Grid */}
      {!isLoading && summaries.length > 0 && (
        <div className="animate-fade-in-up">
          <OverviewStats summaries={summaries} />
        </div>
      )}

      {/* Sites Grid */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : summaries.length === 0 ? (
        <div className="animate-fade-in-up">
          <EmptyState
            message="Nenhum site cadastrado"
            description="Adicione seu primeiro site WordPress para começar o monitoramento em tempo real."
            icon={
              <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            action={
              <Link href="/sites/manage">
                <Button>
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Adicionar Primeiro Site
                </Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
          {summaries.map((site, i) => (
            <div
              key={site.id}
              className="animate-fade-in-up h-full"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <SiteCard site={site} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
