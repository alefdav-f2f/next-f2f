'use client';

import type { QueueStatusItem } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { EmptyState } from '@/components/ui/empty-state';

interface QueueStatsProps {
  queue: QueueStatusItem[];
}

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info'; progressVariant: 'success' | 'warning' | 'danger' | 'info' }> = {
  pending: { label: 'Pendente', variant: 'warning', progressVariant: 'warning' },
  processing: { label: 'Processando', variant: 'info', progressVariant: 'info' },
  completed: { label: 'Concluído', variant: 'success', progressVariant: 'success' },
  failed: { label: 'Falhou', variant: 'danger', progressVariant: 'danger' },
};

export function QueueStats({ queue }: QueueStatsProps) {
  if (!queue || queue.length === 0) {
    return <EmptyState message="Nenhuma tarefa na fila" />;
  }

  const total = queue.reduce((sum, q) => {
    const count = typeof q.count === 'number' ? q.count : parseInt(String(q.count) || '0', 10);
    return sum + (isNaN(count) ? 0 : count);
  }, 0);

  if (total === 0) {
    return <EmptyState message="Fila vazia - nenhuma tarefa pendente" />;
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {queue.map((item) => {
          const config = statusConfig[item.status] || statusConfig.pending;
          const count = typeof item.count === 'number' ? item.count : parseInt(String(item.count) || '0', 10);
          const safeCount = isNaN(count) ? 0 : count;
          return (
            <div
              key={item.status}
              className="gradient-border overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
            >
              <Badge variant={config.variant}>{config.label}</Badge>
              <div className="mt-3 gradient-text text-3xl font-bold font-heading">
                {safeCount}
              </div>
            </div>
          );
        })}
      </div>

      {/* Details table */}
      <Card>
        <h3 className="mb-4 font-heading text-lg font-bold text-[var(--text-primary)]">
          Detalhes da Fila
        </h3>
        <div className="space-y-4">
          {queue.map((item) => {
            const config = statusConfig[item.status] || statusConfig.pending;
            const count = typeof item.count === 'number' ? item.count : parseInt(String(item.count) || '0', 10);
            const safeCount = isNaN(count) ? 0 : count;
            const percentage = total > 0 ? (safeCount / total) * 100 : 0;

            return (
              <div key={item.status} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={config.variant}>{config.label}</Badge>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{safeCount}</span>
                </div>
                <ProgressBar value={percentage} variant={config.progressVariant} />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
