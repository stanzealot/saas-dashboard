import React from 'react';
import { ErrorBoundary } from '@/components/common';
import { DashboardLayout } from '@/components/layout';
import { LoginPage } from '@/pages';
import { useAuth } from '@/hooks';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <ErrorBoundary>
      {isAuthenticated ? <DashboardLayout /> : <LoginPage />}
    </ErrorBoundary>
  );
};

export default App;
