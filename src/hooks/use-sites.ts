'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Site, SiteFormData } from '@/lib/types';

export function useSites() {
  const [sites, setSites] = useState<Site[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSites = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/sites');
      if (!res.ok) throw new Error('Failed to fetch sites');
      const data = await res.json();
      setSites(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  return { sites, isLoading, error, mutate: fetchSites };
}

export function useCreateSite() {
  const [isLoading, setIsLoading] = useState(false);

  const createSite = async (data: SiteFormData): Promise<Site> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create site');
      }
      return await res.json();
    } finally {
      setIsLoading(false);
    }
  };

  return { createSite, isLoading };
}

export function useUpdateSite() {
  const [isLoading, setIsLoading] = useState(false);

  const updateSite = async (id: number, data: Partial<SiteFormData>): Promise<Site> => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/sites/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update site');
      }
      return await res.json();
    } finally {
      setIsLoading(false);
    }
  };

  return { updateSite, isLoading };
}

export function useDeleteSite() {
  const [isLoading, setIsLoading] = useState(false);

  const deleteSite = async (id: number): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/sites/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete site');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteSite, isLoading };
}
