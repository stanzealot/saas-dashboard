# SaaS Dashboard

A production-grade React TypeScript SaaS dashboard with authentication, metrics, and settings management.

## Features

- 🔐 **Authentication**: Mock auth with local storage persistence
- 📊 **Dashboard**: Metrics cards and interactive charts
- 🎨 **Theme Support**: Light/Dark mode toggle
- 📱 **Responsive Design**: Mobile-first approach
- 🗂️ **Sidebar Navigation**: Collapsible with active states
- ⚙️ **Settings Page**: Profile management and theme preferences
- 🚀 **Code Splitting**: Lazy loading for performance
- 🛡️ **Error Boundaries**: Graceful error handling
- 💾 **TypeScript**: Full type safety

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── index.ts
│   ├── dashboard/
│   │   ├── MetricCard.tsx
│   │   ├── Dashboard.tsx
│   │   └── index.ts
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── DashboardLayout.tsx
│   │   └── index.ts
│   └── index.ts
├── pages/
│   ├── LoginPage.tsx
│   ├── Analytics.tsx
│   ├── Settings.tsx
│   └── index.ts
├── contexts/
│   ├── ThemeContext.tsx
│   ├── AuthContext.tsx
│   └── index.ts
├── hooks/
│   ├── useTheme.ts
│   ├── useAuth.ts
│   └── index.ts
├── types/
│   ├── user.ts
│   ├── dashboard.ts
│   └── index.ts
├── utils/
│   ├── constants.ts
│   └── index.ts
├── services/
│   ├
│   └── api.ts
├── App.tsx
├── index.tsx
└── main.tsx (for Vite) or index.tsx (for CRA)
```

## Getting Started

1. **Install dependencies**

   ```bash
   yarn  or npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## Key Design Decisions

### Architecture

- **Separation of Concerns**: Each component has a single responsibility
- **Context Pattern**: Used for global state (auth, theme) instead of heavy state management
- **Custom Hooks**: Abstracted context logic for better reusability
- **TypeScript**: Full type safety throughout the application

### API Integration

The dashboard integrates with multiple real APIs:

- **JSONPlaceholder API**: For posts, users, and comments data
- **CoinDesk API**: For cryptocurrency price data
- **Quotable API**: For quotes and content analysis
  All API calls include proper error handling and fallback mechanisms.

### Performance

- **Code Splitting**: Pages are lazy-loaded for better performance
- **Error Boundaries**: Graceful error handling with fallback UI
- **Efficient State Management**: Local storage for persistence, React state for UI

### User Experience

- **Responsive Design**: Mobile-first approach with collapsible sidebar
- **Theme Support**: Persistent dark/light mode preference
- **Loading States**: Proper loading indicators for better UX
- **Accessibility**: Semantic HTML and proper ARIA attributes

### Trade-offs Made

1. **Component Structure**: Balanced between reusability and simplicity
2. **State Management**: Used React Context instead of Redux/Zustand for lighter footprint

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## Environment Requirements

- Node.js 18+
- npm 7+

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
