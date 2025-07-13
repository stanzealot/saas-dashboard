import React from 'react';
import { TrendingDown } from 'lucide-react';
import { DashboardMetric } from '@/types';

interface MetricCardProps {
  metric: DashboardMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${metric.color}`}>{metric.icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {metric.title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {metric.value}
          </p>
        </div>
      </div>
      <div
        className={`flex items-center space-x-1 text-sm ${
          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        <span>{metric.change}</span>
        {metric.trend === 'up' ? (
          <TrendingDown className="h-4 w-4 rotate-180" />
        ) : (
          <TrendingDown className="h-4 w-4" />
        )}
      </div>
    </div>
  </div>
);
