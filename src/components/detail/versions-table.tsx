'use client';

import type { VersionItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';

interface VersionsTableProps {
  versions: VersionItem[];
}

const groupLabels: Record<string, string> = {
  plugin: 'Plugins',
  theme: 'Temas',
  wordpress: 'WordPress',
  php: 'Sistema',
};

const groupIcons: Record<string, React.ReactNode> = {
  plugin: (
    <svg className="h-5 w-5 text-highlight" viewBox="0 0 24 24" fill="none">
      <path d="M10 20L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 8L22 12L18 16M6 8L2 12L6 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  theme: (
    <svg className="h-5 w-5 text-highlight" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  wordpress: (
    <svg className="h-5 w-5 text-highlight" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M2 12h20" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  php: (
    <svg className="h-5 w-5 text-highlight" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

function getComponentName(item: VersionItem): string {
  try {
    const details = JSON.parse(item.details);
    return details.name || item.component_slug;
  } catch {
    return item.component_slug;
  }
}

export function VersionsTable({ versions }: VersionsTableProps) {
  if (!versions || versions.length === 0) {
    return <EmptyState message="Nenhum dado de versão disponível" />;
  }

  const groups: Record<string, VersionItem[]> = {};
  versions.forEach((v) => {
    const type = v.component_type;
    if (!groups[type]) groups[type] = [];
    groups[type].push(v);
  });

  return (
    <div className="space-y-6">
      {Object.entries(groups).map(([type, items]) => (
        <Card key={type}>
          <div className="mb-4 flex items-center gap-2">
            {groupIcons[type] || groupIcons.plugin}
            <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
              {groupLabels[type] || type}
            </h3>
            <span className="ml-auto text-xs text-[var(--text-tertiary)]">
              {items.length} {items.length === 1 ? 'item' : 'itens'}
            </span>
          </div>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Nome</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Atual</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Disponível</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Status</th>
                  <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Verificado</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr
                    key={`${item.component_slug}-${idx}`}
                    className="group relative border-b border-[var(--border-color)] last:border-0 transition-colors hover:bg-[var(--bg-hover)]"
                  >
                    <td className="py-3 pr-4 font-medium text-[var(--text-primary)]">
                      {getComponentName(item)}
                    </td>
                    <td className="py-3 pr-4">
                      <code className="rounded bg-[var(--bg-tertiary)] px-1.5 py-0.5 text-xs font-mono text-[var(--text-primary)]">
                        {item.current_version}
                      </code>
                    </td>
                    <td className="py-3 pr-4">
                      <code className="rounded bg-[var(--bg-tertiary)] px-1.5 py-0.5 text-xs font-mono text-[var(--text-primary)]">
                        {item.latest_version}
                      </code>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant={item.is_outdated ? 'danger' : 'success'}>
                        {item.is_outdated ? 'Desatualizado' : 'Atualizado'}
                      </Badge>
                    </td>
                    <td className="py-3 text-right text-xs text-[var(--text-tertiary)]">
                      {formatDate(item.last_checked)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ))}
    </div>
  );
}
