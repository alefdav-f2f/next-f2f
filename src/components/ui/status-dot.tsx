type StatusType = 'online' | 'offline' | 'error';

const statusColors: Record<StatusType, string> = {
  online: 'bg-success',
  offline: 'bg-[var(--text-tertiary)]',
  error: 'bg-danger',
};

const pulseColors: Record<StatusType, string> = {
  online: 'bg-success/50',
  offline: '',
  error: 'bg-danger/50',
};

interface StatusDotProps {
  status: StatusType;
  size?: 'sm' | 'md';
}

export function StatusDot({ status, size = 'sm' }: StatusDotProps) {
  const dotSize = size === 'sm' ? 'h-2 w-2' : 'h-2.5 w-2.5';
  const pulseSize = size === 'sm' ? 'h-2 w-2' : 'h-2.5 w-2.5';

  return (
    <span className="relative inline-flex">
      {status !== 'offline' && (
        <span
          className={`absolute inline-flex ${pulseSize} animate-ping rounded-full opacity-75 ${pulseColors[status]}`}
        />
      )}
      <span
        className={`relative inline-flex ${dotSize} rounded-full ${statusColors[status]}`}
      />
    </span>
  );
}
