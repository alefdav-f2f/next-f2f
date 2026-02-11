'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { Topbar } from '@/components/layout/topbar';
import { SiteHeader } from '@/components/detail/site-header';
import { SiteStats } from '@/components/detail/site-stats';
import { SiteTabs } from '@/components/detail/site-tabs';
import { VersionsTable } from '@/components/detail/versions-table';
import { ActivityTable } from '@/components/detail/activity-table';
import { QueueStats } from '@/components/detail/queue-stats';
import { TableSkeleton, CardSkeleton } from '@/components/ui/skeleton';
import { useSiteVersions, useSiteActivity, useSiteQueue } from '@/hooks/use-site-data';
import { useAutoRefresh } from '@/hooks/use-auto-refresh';
import type { Site } from '@/lib/types';

type TabKey = 'versions' | 'activity' | 'queue';

const tabTitles: Record<TabKey, string> = {
  versions: 'Versões',
  activity: 'Atividades',
  queue: 'Fila',
};

export default function SiteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const siteId = Number(id);

  const [site, setSite] = useState<Site | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('versions');
  const [activityPage, setActivityPage] = useState(1);

  const { data: versions, isLoading: versionsLoading, refresh: refreshVersions } = useSiteVersions(siteId);
  const { data: activities, pagination, isLoading: activityLoading, refresh: refreshActivity } = useSiteActivity(siteId, activityPage);
  const { data: queue, isLoading: queueLoading, refresh: refreshQueue } = useSiteQueue(siteId);

  useEffect(() => {
    fetch(`/api/sites/${siteId}`)
      .then(res => res.json())
      .then(setSite)
      .catch(console.error);
  }, [siteId]);

  const triggerVersionCheck = useCallback(async () => {
    try {
      await fetch(`/api/sites/${siteId}/versions/check`, { method: 'POST' });
      // Wait for WordPress to process the check
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch {
      // Silently fail - we'll still refresh the data
    }
  }, [siteId]);

  const refreshAll = useCallback(async () => {
    await triggerVersionCheck();
    await Promise.all([refreshVersions(), refreshActivity(), refreshQueue()]);
  }, [triggerVersionCheck, refreshVersions, refreshActivity, refreshQueue]);

  const { lastRefresh, isRefreshing, refresh: doRefresh } = useAutoRefresh(refreshAll);

  const isLoading = versionsLoading || activityLoading || queueLoading;

  return (
    <div>
      <Topbar
        title={tabTitles[activeTab]}
        lastRefresh={lastRefresh}
        onRefresh={doRefresh}
        isRefreshing={isRefreshing}
      />

      <div className="space-y-6 p-6 lg:p-8">
        {site && <SiteHeader site={site} />}

        {!isLoading && (
          <SiteStats
            versions={versions}
            activities={activities}
            queue={queue}
          />
        )}

        <SiteTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'versions' && (
          versionsLoading ? <TableSkeleton /> : <VersionsTable versions={versions} />
        )}

        {activeTab === 'activity' && (
          activityLoading ? <TableSkeleton /> : (
            <ActivityTable
              activities={activities}
              pagination={pagination}
              onPageChange={setActivityPage}
            />
          )
        )}

        {activeTab === 'queue' && (
          queueLoading ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[1,2,3,4].map(i => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <QueueStats queue={queue} />
          )
        )}
      </div>
    </div>
  );
}
