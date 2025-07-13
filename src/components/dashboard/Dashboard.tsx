import React, { useState, useEffect } from 'react';
import { Users, DollarSign, UserMinus, Bell, Activity } from 'lucide-react';
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

export const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [barData, setBarData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);
      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
      ];

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
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
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
            Device Usage
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
    </div>
  );
};
