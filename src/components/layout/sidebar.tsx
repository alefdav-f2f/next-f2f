'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { SidebarSiteList } from './sidebar-site-list';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed') === 'true';
    setCollapsed(saved);
  }, []);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('sidebar-collapsed', String(next));
  };

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navLinkClass = (path: string) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
    ${isActive(path)
      ? 'bg-white/15 text-white shadow-lg shadow-accent/10'
      : 'text-white/60 hover:bg-white/8 hover:text-white/90'}`;

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen flex-col bg-gradient-to-b from-sidebar to-sidebar-light transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden" onClick={onMobileClose}>
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
              🛡️
            </span>
            {!collapsed && (
              <span className="whitespace-nowrap font-heading text-base font-bold text-white">
                F2F Monitor
              </span>
            )}
          </Link>
          <button
            onClick={toggleCollapse}
            className="hidden h-8 w-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white lg:flex"
            aria-label="Toggle Sidebar"
          >
            <svg
              className={`h-4 w-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M12 6L8 10L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <div className={`mb-3 ${collapsed ? 'px-0 text-center' : 'px-3'}`}>
            <span className="text-[10px] font-medium uppercase tracking-wider text-white/30">
              {collapsed ? '...' : 'Menu'}
            </span>
          </div>

          <Link href="/" className={navLinkClass('/')} onClick={onMobileClose}>
            <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
            </svg>
            {!collapsed && <span>Overview</span>}
          </Link>

          <Link href="/sites/manage" className={navLinkClass('/sites/manage')} onClick={onMobileClose}>
            <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {!collapsed && <span>Gerenciar Sites</span>}
          </Link>

          {/* Sites section */}
          {!collapsed && (
            <div className="mt-6">
              <div className="mb-3 px-3">
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/30">
                  Sites
                </span>
              </div>
              <SidebarSiteList onNavigate={onMobileClose} />
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className={`flex items-center border-t border-white/10 p-3 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          <ThemeToggle />
          {!collapsed && (
            <span className="text-[10px] text-white/30">v2.0</span>
          )}
        </div>
      </aside>
    </>
  );
}
