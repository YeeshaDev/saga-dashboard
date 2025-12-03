import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDashboardRequest } from '@/store/slices/dashboardSlice';
import { logout } from '@/store/slices/authSlice';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import StatCard from '@/components/dashboard/StatCard';
import ActivityChart from '@/components/dashboard/ActivityChart';
import PieChartCard from '@/components/dashboard/PieChartCard';
import ActivityTable from '@/components/dashboard/ActivityTable';
import { StatCardSkeleton, ChartSkeleton, TableSkeleton } from '@/components/dashboard/Skeletons';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { stats, activityData, pieChartData, secondPieChartData, recentActivity, isLoading } =
    useAppSelector((state) => state.dashboard);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchDashboardRequest());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleRefresh = () => {
    dispatch(fetchDashboardRequest());
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader user={user} onLogout={handleLogout} />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
            <button
              onClick={handleRefresh}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Refresh data
            </button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <StatCardSkeleton key={i} className={`stagger-${i + 1}`} />
                ))
              : stats.map((stat, i) => (
                  <StatCard key={stat.id} stat={stat} index={i} />
                ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      
            {isLoading ? (
              <ChartSkeleton className="lg:col-span-1" />
            ) : (
              <ActivityChart data={activityData} />
            )}

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary/5 border border-primary/20 rounded-lg p-4"
              >
                <p className="text-sm">
                  <span className="font-medium text-primary">Read our documentation</span>{' '}
                  <span className="text-muted-foreground">with code samples.</span>
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isLoading ? (
                  <>
                    <ChartSkeleton className="h-64" />
                    <ChartSkeleton className="h-64" />
                  </>
                ) : (
                  <>
                    <PieChartCard data={pieChartData} title="Chart 1" />
                    <PieChartCard data={secondPieChartData} title="Chart 2" showPercentages />
                  </>
                )}
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <ActivityTable data={recentActivity} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
