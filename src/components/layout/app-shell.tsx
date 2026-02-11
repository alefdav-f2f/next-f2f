'use client';

import { useState } from 'react';
import { NavBar } from './navbar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-highlight/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <NavBar
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
