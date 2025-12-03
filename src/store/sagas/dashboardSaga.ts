import { put, takeLatest, delay } from 'redux-saga/effects';
import {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} from '../slices/dashboardSlice';
 
function generateMockData() {
  const stats = [
    {
      id: 'tickets',
      title: 'New Tickets',
      value: Math.floor(Math.random() * 50 + 30).toString(),
      change: Math.floor(Math.random() * 15 - 5),
      changeType: 'positive' as const,
    },
    {
      id: 'closed',
      title: 'Closed Today',
      value: Math.floor(Math.random() * 25 + 10).toString(),
      change: Math.floor(Math.random() * 10 - 8),
      changeType: 'negative' as const,
    },
    {
      id: 'replies',
      title: 'New Replies',
      value: Math.floor(Math.random() * 15 + 3).toString(),
      change: Math.floor(Math.random() * 15 - 3),
      changeType: 'positive' as const,
    },
    {
      id: 'followers',
      title: 'Followers',
      value: (Math.random() * 30 + 20).toFixed(1) + 'k',
      change: Math.floor(Math.random() * 8 - 2),
      changeType: 'positive' as const,
    },
    {
      id: 'earnings',
      title: 'Daily Earnings',
      value: '$' + Math.floor(Math.random() * 150 + 50).toString(),
      change: Math.floor(Math.random() * 10 - 5),
      changeType: 'negative' as const,
    },
    {
      id: 'products',
      title: 'Products',
      value: Math.floor(Math.random() * 800 + 400).toString(),
      change: Math.floor(Math.random() * 5 - 3),
      changeType: 'negative' as const,
    },
  ].map((stat) => ({
    ...stat,
    changeType: stat.change >= 0 ? 'positive' as const : 'negative' as const,
  }));

  const activityData = [
    { name: 'Jan', value: Math.floor(Math.random() * 30 + 10) },
    { name: 'Feb', value: Math.floor(Math.random() * 40 + 20) },
    { name: 'Mar', value: Math.floor(Math.random() * 35 + 15) },
    { name: 'Apr', value: Math.floor(Math.random() * 50 + 30) },
    { name: 'May', value: Math.floor(Math.random() * 45 + 25) },
    { name: 'Jun', value: Math.floor(Math.random() * 60 + 35) },
    { name: 'Jul', value: Math.floor(Math.random() * 55 + 40) },
  ];

  const pieChartData = [
    { name: 'Design', value: 37 },
    { name: 'Development', value: 33 },
    { name: 'Marketing', value: 30 },
  ];

  const secondPieChartData = [
    { name: 'Mobile', value: 47.4 },
    { name: 'Desktop', value: 33.1 },
    { name: 'Tablet', value: 10.5 },
    { name: 'Other', value: 9 },
  ];

  const recentActivity = [
    {
      id: '1',
      user: { name: 'Ronald Bradley', avatar: '', initials: 'RB' },
      commit: 'Initial commit',
      date: 'May 6, 2018',
    },
    {
      id: '2',
      user: { name: 'Russell Gibson', avatar: '', initials: 'BM' },
      commit: 'Main structure',
      date: 'April 22, 2018',
    },
    {
      id: '3',
      user: { name: 'Beverly Armstrong', avatar: '', initials: 'BA' },
      commit: 'Left sidebar adjustments',
      date: 'April 15, 2018',
    },
    {
      id: '4',
      user: { name: 'Alex Thompson', avatar: '', initials: 'AT' },
      commit: 'Dashboard widgets update',
      date: 'April 10, 2018',
    },
    {
      id: '5',
      user: { name: 'Sarah Chen', avatar: '', initials: 'SC' },
      commit: 'Fixed responsive issues',
      date: 'April 5, 2018',
    },
  ];

  return { stats, activityData, pieChartData, secondPieChartData, recentActivity };
}

function* handleFetchDashboard() {
  try {
    yield delay(1800); 
    const data = generateMockData();
    yield put(fetchDashboardSuccess(data));
  } catch {
    yield put(fetchDashboardFailure('Failed to load dashboard data'));
  }
}

export default function* dashboardSaga() {
  yield takeLatest(fetchDashboardRequest.type, handleFetchDashboard);
}
