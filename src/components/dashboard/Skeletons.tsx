import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const StatCardSkeleton = ({ className }: { className?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={cn(
      'bg-card rounded-lg border border-border p-4 card-shadow',
      className
    )}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="h-4 w-16 skeleton-shimmer rounded" />
      <div className="h-4 w-10 skeleton-shimmer rounded" />
    </div>
    <div className="h-8 w-20 skeleton-shimmer rounded" />
    <div className="h-3 w-24 skeleton-shimmer rounded mt-2" />
  </motion.div>
);

export const ChartSkeleton = ({ className }: { className?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={cn(
      'bg-card rounded-lg border border-border p-6 card-shadow',
      className
    )}
  >
    <div className="h-5 w-40 skeleton-shimmer rounded mb-4" />
    <div className="h-4 w-24 skeleton-shimmer rounded mb-6" />
    <div className="h-32 w-full skeleton-shimmer rounded" />
  </motion.div>
);

export const TableSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-card rounded-lg border border-border card-shadow overflow-hidden"
  >
    <div className="p-4 border-b border-border">
      <div className="h-5 w-36 skeleton-shimmer rounded" />
    </div>
    <div className="divide-y divide-border">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="p-4 flex items-center gap-4">
          <div className="h-10 w-10 skeleton-shimmer rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 skeleton-shimmer rounded" />
            <div className="h-3 w-24 skeleton-shimmer rounded" />
          </div>
          <div className="h-4 w-20 skeleton-shimmer rounded" />
        </div>
      ))}
    </div>
  </motion.div>
);

export const SidebarSkeleton = () => (
  <div className="space-y-2 p-4">
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-2">
        <div className="h-5 w-5 skeleton-shimmer rounded" />
        <div className="h-4 w-24 skeleton-shimmer rounded" />
      </div>
    ))}
  </div>
);
