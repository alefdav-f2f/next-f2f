'use client';

import { useState, useEffect, useCallback } from 'react';
import type { VersionItem, ActivityItem, QueueStatusItem, SiteSummary, PaginationInfo } from '@/lib/types';

export function useSiteVersions(siteId: number | null) {
  const [data, setData] = useState<VersionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch_ = useCallback(async () => {
    if (!siteId) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/sites/${siteId}/versions`);
      if (!res.ok) throw new Error('Failed to fetch versions');
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [siteId]);

  useEffect(() => { fetch_(); }, [fetch_]);

  return { data, isLoading, error, refresh: fetch_ };
}

export function useSiteActivity(siteId: number | null, page: number = 1) {
  const [data, setData] = useState<ActivityItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1, perPage: 20, total: 0, totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch_ = useCallback(async () => {
    if (!siteId) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/sites/${siteId}/activity?page=${page}&per_page=20`);
      if (!res.ok) throw new Error('Failed to fetch activity');
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
      setPagination({
        page,
        perPage: 20,
        total: parseInt(res.headers.get('X-WP-Total') || '0', 10),
        totalPages: parseInt(res.headers.get('X-WP-TotalPages') || '0', 10),
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [siteId, page]);

  useEffect(() => { fetch_(); }, [fetch_]);

  return { data, pagination, isLoading, error, refresh: fetch_ };
}

export function useSiteQueue(siteId: number | null) {
  const [data, setData] = useState<QueueStatusItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch_ = useCallback(async () => {
    if (!siteId) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/sites/${siteId}/queue`);
      if (!res.ok) throw new Error('Failed to fetch queue');
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [siteId]);

  useEffect(() => { fetch_(); }, [fetch_]);

  return { data, isLoading, error, refresh: fetch_ };
}

export function useSiteSummaries() {
  const [data, setData] = useState<SiteSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch_ = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/sites/summary');
      if (!res.ok) throw new Error('Failed to fetch summaries');
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  return { data, isLoading, error, refresh: fetch_ };
}
