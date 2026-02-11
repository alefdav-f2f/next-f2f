'use client';

interface MiniSparklineProps {
  data: number[];
  height?: number;
  color?: string;
}

export function MiniSparkline({
  data,
  height = 40,
  color = 'var(--color-accent)',
}: MiniSparklineProps) {
  if (data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const width = data.length * 20;
  const padding = 4;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
      const y = height - ((value - min) / range) * (height - padding * 2) - padding;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <div className="relative">
      <svg
        width={width}
        height={height}
        className="w-full"
        preserveAspectRatio="none"
      >
        {/* Area gradient */}
        <defs>
          <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <polyline
          points={areaPoints}
          fill="url(#sparklineGradient)"
        />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
          const y = height - ((value - min) / range) * (height - padding * 2) - padding;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={color}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          );
        })}
      </svg>
    </div>
  );
}
