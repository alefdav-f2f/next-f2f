'use client';

import { useState } from 'react';
import { Topbar } from '@/components/layout/topbar';
import { SiteList } from '@/components/manage/site-list';
import { SiteForm } from '@/components/manage/site-form';
import { DeleteConfirmModal } from '@/components/manage/delete-confirm-modal';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSites, useCreateSite, useUpdateSite, useDeleteSite } from '@/hooks/use-sites';
import type { Site, SiteFormData } from '@/lib/types';

export default function ManageSitesPage() {
  const { sites, isLoading, mutate } = useSites();
  const { createSite, isLoading: creating } = useCreateSite();
  const { updateSite, isLoading: updating } = useUpdateSite();
  const { deleteSite, isLoading: deleting } = useDeleteSite();

  const [showForm, setShowForm] = useState(false);
  const [editingSite, setEditingSite] = useState<Site | null>(null);
  const [deletingSite, setDeletingSite] = useState<Site | null>(null);

  const handleCreate = async (data: SiteFormData) => {
    await createSite(data);
    setShowForm(false);
    mutate();
  };

  const handleUpdate = async (data: SiteFormData) => {
    if (!editingSite) return;
    await updateSite(editingSite.id, data);
    setEditingSite(null);
    mutate();
  };

  const handleDelete = async () => {
    if (!deletingSite) return;
    await deleteSite(deletingSite.id);
    setDeletingSite(null);
    mutate();
  };

  return (
    <div className="space-y-8 py-8">
      <Topbar
        title="Gerenciar Sites"
        actions={
          <Button onClick={() => setShowForm(true)}>
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Adicionar Site
          </Button>
        }
      />

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <SiteList
          sites={sites}
          onEdit={(site) => setEditingSite(site)}
          onDelete={(site) => setDeletingSite(site)}
        />
      )}

      {/* Add Site Modal */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title="Adicionar Site"
      >
        <SiteForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
          isLoading={creating}
        />
      </Modal>

      {/* Edit Site Modal */}
      <Modal
        open={!!editingSite}
        onClose={() => setEditingSite(null)}
        title="Editar Site"
      >
        {editingSite && (
          <SiteForm
            site={editingSite}
            onSubmit={handleUpdate}
            onCancel={() => setEditingSite(null)}
            isLoading={updating}
          />
        )}
      </Modal>

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        site={deletingSite}
        open={!!deletingSite}
        onClose={() => setDeletingSite(null)}
        onConfirm={handleDelete}
        isLoading={deleting}
      />
    </div>
  );
}
