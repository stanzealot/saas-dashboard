import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, AuthProvider } from '@/contexts';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
