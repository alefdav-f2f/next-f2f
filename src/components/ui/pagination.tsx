'use client';

import type { PaginationInfo } from '@/lib/types';

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { page, totalPages } = pagination;

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];

    pages.push(1);

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    if (start > 2) pages.push('ellipsis');

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push('ellipsis');

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const btnBase =
    'flex h-9 min-w-[36px] items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 text-sm font-medium text-[var(--text-primary)] transition-all duration-200';
  const btnHover = 'hover:border-accent hover:text-accent';
  const btnActive = 'bg-accent border-accent text-white';
  const btnDisabled = 'opacity-40 cursor-not-allowed';

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
      <button
        className={`${btnBase} ${page === 1 ? btnDisabled : btnHover}`}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
          <path d="M12 6L8 10L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {getPageNumbers().map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="px-1 text-[var(--text-tertiary)]">
            ...
          </span>
        ) : (
          <button
            key={p}
            className={`${btnBase} ${p === page ? btnActive : btnHover}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        className={`${btnBase} ${page === totalPages ? btnDisabled : btnHover}`}
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
          <path d="M8 6L12 10L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
