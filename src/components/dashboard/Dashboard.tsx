import React, { useState, useEffect } from 'react';
import {
  Users,
  DollarSign,
  UserMinus,
  Bell,
  Activity,
  AlertCircle,
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
import { DashboardMetric, ChartData } from '@/types';
import { LoadingSpinner } from '@/components/common';
import { MetricCard } from './MetricCard';

// API Service
const apiService = {
  async fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },

  async fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },
};

export const Dashboard: React.FC = () => {
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
        // Real API calls
        const [postsData, usersData] = await Promise.all([
          apiService.fetchPosts(),
          apiService.fetchUsers(),
        ]);

        setApiData(postsData);

        // Process real data into metrics
        const mockMetrics: DashboardMetric[] = [
          {
            id: '1',
            title: 'Total Posts',
            value: postsData.length.toString(),
            change: '+12.5%',
            trend: 'up',
            icon: <Users className="h-5 w-5 text-white" />,
            color: 'bg-blue-500',
          },
          {
            id: '2',
            title: 'Active Users',
            value: usersData.length.toString(),
            change: '+8.2%',
            trend: 'up',
            icon: <DollarSign className="h-5 w-5 text-white" />,
            color: 'bg-green-500',
          },
          {
            id: '3',
            title: 'Avg Posts/User',
            value: (postsData.length / usersData.length).toFixed(1),
            change: '-0.8%',
            trend: 'down',
            icon: <UserMinus className="h-5 w-5 text-white" />,
            color: 'bg-red-500',
          },
        ];

        // Generate chart data based on real data
        const userPostCounts = usersData.map((user: any) => ({
          name: user.name.split(' ')[0], // First name only
          value: postsData.filter((post: any) => post.userId === user.id)
            .length,
        }));

        const mockChartData: ChartData[] = [
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 300 },
          { name: 'Mar', value: 600 },
          { name: 'Apr', value: 800 },
          { name: 'May', value: 700 },
          { name: 'Jun', value: 900 },
        ];

        setMetrics(mockMetrics);
        setChartData(mockChartData);
        setBarData(userPostCounts.slice(0, 6)); // Show first 6 users
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
    // Re-trigger useEffect
    window.location.reload();
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

      {/* API Data Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-blue-700 dark:text-blue-400">
            Live data from JSONPlaceholder API - {apiData.length} posts loaded
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Posts by User (Live Data)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10B981" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent API Data */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Posts (Live API Data)
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
                  User ID: {post.userId}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
