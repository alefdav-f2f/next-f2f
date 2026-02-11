'use client';

import type { Site } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';

interface SiteListProps {
  sites: Site[];
  onEdit: (site: Site) => void;
  onDelete: (site: Site) => void;
}

export function SiteList({ sites, onEdit, onDelete }: SiteListProps) {
  if (sites.length === 0) {
    return (
      <EmptyState
        message="Nenhum site cadastrado"
        description="Adicione seu primeiro site WordPress para começar."
      />
    );
  }

  return (
    <Card>
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border-color)]">
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Nome</th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">URL</th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Adicionado</th>
              <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.id} className="border-b border-[var(--border-color)] last:border-0 transition-colors hover:bg-[var(--bg-hover)]">
                <td className="py-3 pr-4 font-medium text-[var(--text-primary)]">
                  {site.name}
                </td>
                <td className="py-3 pr-4 font-mono text-xs text-[var(--text-tertiary)]">
                  {site.url.replace(/^https?:\/\//, '')}
                </td>
                <td className="py-3 pr-4 text-xs text-[var(--text-tertiary)]">
                  {new Date(site.created_at).toLocaleDateString('pt-BR')}
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(site)}>
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(site)} className="text-danger hover:text-danger-light">
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
