import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StatCard {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: 'positive' | 'negative';
}

export interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  commit: string;
  date: string;
}

export interface ChartData {
  name: string;
  value: number;
}

interface DashboardState {
  stats: StatCard[];
  activityData: ChartData[];
  pieChartData: ChartData[];
  secondPieChartData: ChartData[];
  recentActivity: ActivityItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: [],
  activityData: [],
  pieChartData: [],
  secondPieChartData: [],
  recentActivity: [],
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchDashboardSuccess: (
      state,
      action: PayloadAction<{
        stats: StatCard[];
        activityData: ChartData[];
        pieChartData: ChartData[];
        secondPieChartData: ChartData[];
        recentActivity: ActivityItem[];
      }>
    ) => {
      state.isLoading = false;
      state.stats = action.payload.stats;
      state.activityData = action.payload.activityData;
      state.pieChartData = action.payload.pieChartData;
      state.secondPieChartData = action.payload.secondPieChartData;
      state.recentActivity = action.payload.recentActivity;
    },
    fetchDashboardFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateStat: (state, action: PayloadAction<{ id: string; value: string; change: number }>) => {
      const stat = state.stats.find((s) => s.id === action.payload.id);
      if (stat) {
        stat.value = action.payload.value;
        stat.change = action.payload.change;
        stat.changeType = action.payload.change >= 0 ? 'positive' : 'negative';
      }
    },
  },
});

export const {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure,
  updateStat,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
