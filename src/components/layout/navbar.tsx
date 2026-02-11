'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import Image from 'next/image';

interface NavBarProps {
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export function NavBar({ mobileMenuOpen, onToggleMobileMenu }: NavBarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: '/', label: 'Overview', icon: 'dashboard' },
    { href: '/sites/manage', label: 'Gerenciar Sites', icon: 'settings' },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--glass-border)]">
        <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-32 h-12 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="https://agenciaf2f.com/wp-content/themes/agenciaf2f/assets/images/logos/logo.png"
                  alt="F2F Monitor"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block h-8 w-px bg-[var(--border-color)]" />
              <div className="hidden sm:flex flex-col">
                <span className="heading-md text-[var(--text-primary)]">Monitor</span>
                <span className="text-xs text-[var(--text-tertiary)] mono">v3.0</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? 'text-[var(--color-accent)] bg-[var(--bg-hover)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={onToggleMobileMenu}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all"
                aria-label="Toggle Menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onToggleMobileMenu}
          />
          <div className="fixed top-20 left-0 right-0 z-50 mx-4 rounded-2xl glass border border-[var(--glass-border)] shadow-2xl lg:hidden animate-fade-in-up">
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onToggleMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? 'text-[var(--color-accent)] bg-[var(--bg-hover)] glow-accent'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
