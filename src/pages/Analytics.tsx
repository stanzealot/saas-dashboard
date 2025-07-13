import React from 'react';
import { BarChart } from 'lucide-react';

export const Analytics: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
      Analytics
    </h1>
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="text-center">
        <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Advanced Analytics
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Detailed analytics and insights will be available here.
        </p>
      </div>
    </div>
  </div>
);
