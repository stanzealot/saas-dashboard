import React from 'react';

export interface DashboardMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface NavigationItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  count?: number;
}
