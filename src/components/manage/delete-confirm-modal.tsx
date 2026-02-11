'use client';

import type { Site } from '@/lib/types';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface DeleteConfirmModalProps {
  site: Site | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeleteConfirmModal({ site, open, onClose, onConfirm, isLoading }: DeleteConfirmModalProps) {
  if (!site) return null;

  return (
    <Modal open={open} onClose={onClose} title="Confirmar Exclusão">
      <p className="text-sm text-[var(--text-secondary)] mb-2">
        Tem certeza que deseja excluir o site <strong className="text-[var(--text-primary)]">{site.name}</strong>?
      </p>
      <p className="text-xs text-[var(--text-tertiary)] mb-6">
        Esta ação é irreversível. O site será removido do monitoramento.
      </p>
      <div className="flex gap-3">
        <Button variant="danger" onClick={onConfirm} loading={isLoading}>
          Excluir Site
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
