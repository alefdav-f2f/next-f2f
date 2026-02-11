'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export function useAutoRefresh(callback: () => void | Promise<void>, intervalMs: number = 30000) {
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const callbackRef = useRef(callback);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  callbackRef.current = callback;

  const refresh = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await callbackRef.current();
      setLastRefresh(new Date());
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(async () => {
        if (document.visibilityState === 'visible') {
          await callbackRef.current();
          setLastRefresh(new Date());
        }
      }, intervalMs);
    };

    startInterval();

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        callbackRef.current();
        setLastRefresh(new Date());
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [intervalMs]);

  return { lastRefresh, isRefreshing, refresh };
}
