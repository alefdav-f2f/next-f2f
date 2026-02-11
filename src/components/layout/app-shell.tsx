'use client';

import { useState, createContext, useContext } from 'react';
import { Sidebar } from './sidebar';

const MobileMenuContext = createContext<{
  open: boolean;
  toggle: () => void;
}>({ open: false, toggle: () => {} });

export function useMobileMenu() {
  return useContext(MobileMenuContext);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <MobileMenuContext.Provider value={{ open: mobileOpen, toggle: () => setMobileOpen(v => !v) }}>
      <div className="flex min-h-screen">
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        <main className="flex-1 lg:ml-64 transition-all duration-300 min-h-screen bg-[var(--bg-primary)]">
          {children}
        </main>
      </div>
    </MobileMenuContext.Provider>
  );
}
