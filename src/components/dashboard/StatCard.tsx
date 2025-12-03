import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { StatCard as StatCardType } from '@/store/slices/dashboardSlice';
import { cn } from '@/lib/utils';

interface StatCardProps {
  stat: StatCardType;
  index: number;
}

const StatCard = ({ stat, index }: StatCardProps) => {
  const isPositive = stat.changeType === 'positive';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-card rounded-lg border border-border p-4 card-shadow hover:border-primary/20 transition-colors"
    >
      <div className="flex items-start justify-between mb-1">
        <span
          className={cn(
            'text-xs font-medium px-1.5 py-0.5 rounded',
            isPositive
              ? 'text-stat-positive bg-stat-positive/10'
              : 'text-stat-negative bg-stat-negative/10'
          )}
        >
          {isPositive ? '+' : ''}
          {stat.change}%
          {isPositive ? (
            <TrendingUp className="inline-block w-3 h-3 ml-0.5" />
          ) : (
            <TrendingDown className="inline-block w-3 h-3 ml-0.5" />
          )}
        </span>
      </div>
      <div className="text-3xl font-semibold text-foreground mb-1">{stat.value}</div>
      <div className="text-sm text-muted-foreground">{stat.title}</div>
    </motion.div>
  );
};

export default StatCard;
