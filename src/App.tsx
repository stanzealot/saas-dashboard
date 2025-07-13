// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@/components/common';
import { DashboardLayout } from '@/components/layout';
import { LoadingSpinner } from '@/components/common';
import { useAuth } from '@/hooks';

// Lazy load components for code splitting
const LoginPage = React.lazy(() =>
  import('@/pages/LoginPage').then((module) => ({ default: module.LoginPage }))
);
const Dashboard = React.lazy(() =>
  import('@/components/dashboard/Dashboard').then((module) => ({
    default: module.default,
  }))
);
const Analytics = React.lazy(() =>
  import('@/pages/Analytics').then((module) => ({ default: module.Analytics }))
);
const Settings = React.lazy(() =>
  import('@/pages/Settings').then((module) => ({ default: module.Settings }))
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
