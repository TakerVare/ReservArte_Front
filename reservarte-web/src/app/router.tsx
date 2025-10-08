import { createBrowserRouter } from 'react-router-dom';

// Placeholder pages
const DashboardPage = () => <div>Dashboard</div>;
const LoginPage = () => <div>Login</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
