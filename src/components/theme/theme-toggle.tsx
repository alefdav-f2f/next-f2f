'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors" aria-label="Toggle Theme">
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex h-10 w-10 items-center justify-center rounded-xl text-white/70 transition-all hover:bg-white/10 hover:text-white"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <svg className="h-5 w-5 transition-transform duration-300" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.5 4.5L14 6M6 14L4.5 15.5M15.5 15.5L14 14M6 6L4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg className="h-5 w-5 transition-transform duration-300" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 10.5C16.1 14 13 17 9 17C5 17 2 14 2 10C2 6 5 3 9 3C9.5 3 10 3.1 10.5 3.2C9.6 4.1 9 5.5 9 7C9 9.8 11.2 12 14 12C15.5 12 16.9 11.4 17.8 10.5C17.6 10.5 17.3 10.5 17 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}
