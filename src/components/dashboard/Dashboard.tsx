import React, { useState, useEffect } from 'react';
import {
  Users,
  DollarSign,
  UserMinus,
  Bell,
  Activity,
  AlertCircle,
  TrendingUp,
  Eye,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
} from 'recharts';
import { LoadingSpinner } from '@/components/common';
import { MetricCard } from './MetricCard';
import { fetchPosts } from '@/services/api';

interface DashboardMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

interface ChartData {
  name: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [barData, setBarData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiData, setApiData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch real data only for recent activities
        const postsData = await fetchPosts();
        setApiData(postsData);

        const mockMetrics: DashboardMetric[] = [
          {
            id: '1',
            title: 'Monthly Active Users',
            value: '12.4K',
            change: '+12.5%',
            trend: 'up',
            icon: <Users className="h-5 w-5 text-white" />,
            color: 'bg-blue-500',
          },
          {
            id: '2',
            title: 'Monthly Revenue',
            value: '$48.2K',
            change: '+8.2%',
            trend: 'up',
            icon: <DollarSign className="h-5 w-5 text-white" />,
            color: 'bg-green-500',
          },
          {
            id: '3',
            title: 'Churn Rate',
            value: '3.2%',
            change: '-0.8%',
            trend: 'down',
            icon: <UserMinus className="h-5 w-5 text-white" />,
            color: 'bg-red-500',
          },
          {
            id: '4',
            title: 'Total Revenue',
            value: '$24.5K',
            change: '+15.3%',
            trend: 'up',
            icon: <DollarSign className="h-5 w-5 text-white" />,
            color: 'bg-purple-500',
          },
        ];

        // Mock chart data (similar to previous dashboard)
        const mockChartData: ChartData[] = [
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 300 },
          { name: 'Mar', value: 600 },
          { name: 'Apr', value: 800 },
          { name: 'May', value: 700 },
          { name: 'Jun', value: 900 },
        ];

        const mockBarData: ChartData[] = [
          { name: 'Desktop', value: 4000 },
          { name: 'Mobile', value: 3000 },
          { name: 'Tablet', value: 2000 },
        ];

        setMetrics(mockMetrics);
        setChartData(mockChartData);
        setBarData(mockBarData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const retryFetch = () => {
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Failed to load data
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <button
            onClick={retryFetch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <div className="flex items-center space-x-3">
          <Bell className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
          <Activity className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>
      </div>

      {/* API Data Status */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-blue-700 dark:text-blue-400">
            Live data from JSONPlaceholder API - {apiData.length} posts loaded
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Device Usage
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10B981" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {apiData.slice(0, 5).map((post: any) => (
              <div
                key={post.id}
                className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {post.id}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    User ID: {post.userId} • {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
