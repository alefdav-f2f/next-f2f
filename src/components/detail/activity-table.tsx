'use client';

import type { ActivityItem, PaginationInfo } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';

interface ActivityTableProps {
  activities: ActivityItem[];
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

const actionMap: Record<string, { label: string; variant: 'success' | 'warning' | 'info' | 'danger' }> = {
  plugin_activated: { label: 'Plugin Ativado', variant: 'success' },
  plugin_deactivated: { label: 'Plugin Desativado', variant: 'warning' },
  theme_switched: { label: 'Tema Alterado', variant: 'info' },
  user_login: { label: 'Login', variant: 'info' },
  user_logout: { label: 'Logout', variant: 'info' },
  core_updated: { label: 'WP Atualizado', variant: 'success' },
  option_updated: { label: 'Opção Atualizada', variant: 'warning' },
};

function getActionBadge(action: string) {
  const mapped = actionMap[action];
  if (mapped) return mapped;
  return { label: action, variant: 'info' as const };
}

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

export function ActivityTable({ activities, pagination, onPageChange }: ActivityTableProps) {
  if (!activities || activities.length === 0) {
    return <EmptyState message="Nenhuma atividade registrada" />;
  }

  return (
    <div>
      <Card>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Data</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Usuário</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Ação</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Objeto</th>
                <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">IP</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((item, idx) => {
                const { label, variant } = getActionBadge(item.action);
                return (
                  <tr
                    key={`${item.id || idx}`}
                    className="group relative border-b border-[var(--border-color)] last:border-0 transition-colors hover:bg-[var(--bg-hover)]"
                  >
                    <td className="py-3 pr-4 text-xs text-[var(--text-tertiary)] whitespace-nowrap">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="py-3 pr-4 font-medium text-[var(--text-primary)]">
                      {item.user_login}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant={variant}>{label}</Badge>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-[var(--text-primary)]">{item.object_name}</span>
                      {item.object_type && (
                        <span className="ml-1 text-xs text-[var(--text-tertiary)]">
                          ({item.object_type})
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-right text-xs font-mono text-[var(--text-tertiary)]">
                      {item.ip_address || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </div>
  );
}
