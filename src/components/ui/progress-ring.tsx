'use client';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: 'success' | 'warning' | 'danger' | 'info' | 'accent';
}

export function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 8,
  color = 'accent',
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const colorMap = {
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    danger: 'var(--color-danger)',
    info: 'var(--color-info)',
    accent: 'var(--color-accent)',
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="progress-ring"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          className="text-[var(--border-color)]"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className="progress-ring-circle"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          stroke={colorMap[color]}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            filter: `drop-shadow(0 0 8px ${colorMap[color]})`,
          }}
        />
      </svg>
    </div>
  );
}
