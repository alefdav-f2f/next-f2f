import type { Site, VersionItem, ActivityItem, QueueStatusItem, SiteSummary } from './types';

async function wpFetch(
  site: Site,
  endpoint: string,
  params?: Record<string, string>,
  method: 'GET' | 'POST' = 'GET'
): Promise<{ data: unknown; headers: Headers }> {
  const url = new URL(`${site.url}/wp-json/f2f-monitor/v1${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Authorization': `Bearer ${site.token}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { data, headers: response.headers };
  } finally {
    clearTimeout(timeout);
  }
}

export async function getVersions(site: Site): Promise<VersionItem[]> {
  const { data } = await wpFetch(site, '/versions');

  if (Array.isArray(data)) {
    return data as VersionItem[];
  }

  // Some WP endpoints may wrap the array in an object
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    // Check common wrapper keys
    const obj = data as Record<string, unknown>;
    for (const key of ['data', 'items', 'versions']) {
      if (Array.isArray(obj[key])) {
        return obj[key] as VersionItem[];
      }
    }
  }

  return [];
}

export async function getActivity(
  site: Site,
  page: number = 1,
  perPage: number = 20
): Promise<{ data: ActivityItem[]; total: number; totalPages: number }> {
  const { data, headers } = await wpFetch(site, '/activity', {
    page: String(page),
    per_page: String(perPage),
  });

  let items: ActivityItem[] = [];
  if (Array.isArray(data)) {
    items = data as ActivityItem[];
  } else if (data && typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    for (const key of ['data', 'items', 'activity']) {
      if (Array.isArray(obj[key])) {
        items = obj[key] as ActivityItem[];
        break;
      }
    }
  }

  return {
    data: items,
    total: parseInt(headers.get('X-WP-Total') || '0', 10),
    totalPages: parseInt(headers.get('X-WP-TotalPages') || '0', 10),
  };
}

export async function getQueueStatus(site: Site): Promise<QueueStatusItem[]> {
  const { data } = await wpFetch(site, '/queue/status');

  // Handle different response formats: array or object with statuses
  let items: QueueStatusItem[];
  if (Array.isArray(data)) {
    items = data;
  } else if (data && typeof data === 'object') {
    // If it's an object like { pending: 5, processing: 2, ... }, convert to array
    items = Object.entries(data).map(([status, count]) => ({
      status: status as QueueStatusItem['status'],
      count: typeof count === 'string' ? parseInt(count, 10) : Number(count),
    }));
  } else {
    items = [];
  }

  return items.map(item => ({
    ...item,
    count: typeof item.count === 'string' ? parseInt(String(item.count), 10) : item.count,
  }));
}

export async function checkVersions(site: Site): Promise<{ success: boolean; queued_tasks?: number }> {
  const { data } = await wpFetch(site, '/versions/check', undefined, 'POST');

  if (data && typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    return {
      success: !!obj.success,
      queued_tasks: (obj.data as Record<string, unknown>)?.queued_tasks as number | undefined,
    };
  }

  return { success: false };
}

export async function getSiteSummary(
  site: Site
): Promise<Omit<SiteSummary, 'id' | 'name' | 'url'>> {
  try {
    const [versions, activity, queue] = await Promise.allSettled([
      getVersions(site),
      getActivity(site, 1, 100),
      getQueueStatus(site),
    ]);

    let outdatedCount = 0;
    if (versions.status === 'fulfilled') {
      outdatedCount = versions.value.filter(v => v.is_outdated).length;
    }

    let activityTodayCount = 0;
    if (activity.status === 'fulfilled') {
      const today = new Date().toISOString().split('T')[0];
      activityTodayCount = activity.value.data.filter(
        a => a.created_at.startsWith(today)
      ).length;
    }

    let queuePendingCount = 0;
    if (queue.status === 'fulfilled') {
      const pending = queue.value.find(q => q.status === 'pending');
      queuePendingCount = pending ? pending.count : 0;
    }

    const anyFailed = [versions, activity, queue].some(r => r.status === 'rejected');

    return {
      status: anyFailed ? 'error' : 'online',
      outdatedCount,
      activityTodayCount,
      queuePendingCount,
    };
  } catch {
    return {
      status: 'offline',
      outdatedCount: 0,
      activityTodayCount: 0,
      queuePendingCount: 0,
    };
  }
}
