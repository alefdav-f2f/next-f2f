'use client';

import { useState } from 'react';
import type { Site, SiteFormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SiteFormProps {
  site?: Site;
  onSubmit: (data: SiteFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function SiteForm({ site, onSubmit, onCancel, isLoading }: SiteFormProps) {
  const [name, setName] = useState(site?.name || '');
  const [url, setUrl] = useState(site?.url || '');
  const [token, setToken] = useState(site?.token || '');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!url.trim()) newErrors.url = 'URL é obrigatória';
    else {
      try {
        new URL(url);
      } catch {
        newErrors.url = 'URL inválida';
      }
    }
    if (!token.trim()) newErrors.token = 'Token é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      name: name.trim(),
      url: url.trim().replace(/\/+$/, ''),
      token: token.trim(),
    });
  };

  const testConnection = async () => {
    if (!url.trim() || !token.trim()) {
      setErrors({ url: !url.trim() ? 'URL é obrigatória' : '', token: !token.trim() ? 'Token é obrigatório' : '' });
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const cleanUrl = url.trim().replace(/\/+$/, '');
      const res = await fetch(`${cleanUrl}/wp-json/f2f-monitor/v1/versions`, {
        headers: { 'Authorization': `Bearer ${token.trim()}` },
        signal: AbortSignal.timeout(10000),
      });
      setTestResult(res.ok ? 'success' : 'error');
    } catch {
      setTestResult('error');
    } finally {
      setTesting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Nome do Site"
        placeholder="Meu Site WordPress"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />

      <Input
        label="URL do WordPress"
        type="url"
        placeholder="https://meu-site.com"
        helper="URL base do site WordPress (sem /wp-json)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        error={errors.url}
      />

      <Input
        label="Token de API"
        placeholder="Token gerado no plugin F2F Monitor"
        helper="Copie o token da página F2F Monitor no admin do WordPress"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        error={errors.token}
      />

      {/* Test connection */}
      <div className="flex items-center gap-3">
        <Button type="button" variant="outline" size="sm" onClick={testConnection} loading={testing}>
          Testar Conexão
        </Button>
        {testResult === 'success' && (
          <span className="flex items-center gap-1.5 text-sm text-success">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
              <path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Conexão OK
          </span>
        )}
        {testResult === 'error' && (
          <span className="flex items-center gap-1.5 text-sm text-danger">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
              <path d="M6 6L14 14M14 6L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Falha na conexão
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={isLoading}>
          {site ? 'Salvar Alterações' : 'Adicionar Site'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
