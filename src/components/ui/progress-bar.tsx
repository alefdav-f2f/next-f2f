type ProgressVariant = 'success' | 'warning' | 'danger' | 'info';

const variantColors: Record<ProgressVariant, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
};

interface ProgressBarProps {
  value: number;
  variant?: ProgressVariant;
  label?: string;
  showPercent?: boolean;
}

export function ProgressBar({
  value,
  variant = 'info',
  label,
  showPercent = true,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="space-y-1">
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="text-[var(--text-secondary)]">{label}</span>}
          {showPercent && (
            <span className="font-mono text-[var(--text-tertiary)]">
              {clampedValue.toFixed(1)}%
            </span>
          )}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${variantColors[variant]}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
