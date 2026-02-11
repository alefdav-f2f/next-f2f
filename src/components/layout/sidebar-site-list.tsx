'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSites } from '@/hooks/use-sites';
import { StatusDot } from '@/components/ui/status-dot';

interface SidebarSiteListProps {
  onNavigate?: () => void;
}

export function SidebarSiteList({ onNavigate }: SidebarSiteListProps) {
  const { sites, isLoading } = useSites();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="space-y-1 px-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-9 animate-pulse rounded-lg bg-white/5" />
        ))}
      </div>
    );
  }

  if (sites.length === 0) {
    return (
      <p className="px-3 text-xs text-white/30">Nenhum site cadastrado</p>
    );
  }

  return (
    <div className="space-y-0.5">
      {sites.map((site) => {
        const isActive = pathname === `/sites/${site.id}`;
        return (
          <Link
            key={site.id}
            href={`/sites/${site.id}`}
            onClick={onNavigate}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-200
              ${isActive
                ? 'bg-white/12 text-white'
                : 'text-white/50 hover:bg-white/6 hover:text-white/80'
              }`}
          >
            <StatusDot status="online" size="sm" />
            <span className="truncate">{site.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
