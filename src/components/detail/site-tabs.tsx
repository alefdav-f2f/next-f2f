'use client';

type TabKey = 'versions' | 'activity' | 'queue';

interface SiteTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  {
    key: 'versions',
    label: 'Versões',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" />
        <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: 'activity',
    label: 'Atividades',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'queue',
    label: 'Fila',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" />
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" />
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export function SiteTabs({ activeTab, onTabChange }: SiteTabsProps) {
  return (
    <div className="flex gap-1 rounded-xl bg-[var(--bg-tertiary)] p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200
            ${activeTab === tab.key
              ? 'bg-[var(--bg-secondary)] text-accent shadow-sm'
              : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
            }`}
        >
          {tab.icon}
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
