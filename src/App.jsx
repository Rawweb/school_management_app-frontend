import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { Toaster } from 'sonner';

import UserLayout from './layouts/UserLayout';
import AuthLayout from './layouts/AuthLayout';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './dashboard/pages/Dashboard';
import DashboardLayout from './layouts/DashboardLayout';
import Tasks from './dashboard/pages/Tasks';
import Results from './dashboard/pages/Results';
import Courses from './dashboard/pages/Courses';
import Quizzes from './dashboard/pages/Quizzes';
import ProtectedRoute from './routes/ProtectedRoutes';

const App = () => {
  useTheme();
  return (
    <Router>
      <Toaster
        position="top-right"
        expand
        richColors
        toastOptions={{
          style: {
            fontSize: '14px',
          },
        }}
      />
      <Routes>
        {/* PUBLIC */}
        <Route element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* USER DASHBOARD - PROTECTED */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/results" element={<Results />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
