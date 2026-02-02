import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Home from './pages/Home';
import UserLayout from './layouts/UserLayout';
import Login from './pages/Login';
import { Toaster } from 'sonner';


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
        <Route path="/login" element={<Login />} />

        {/* USER DASHBOARD - PROTECTED */}
      </Routes>
    </Router>
  );
};

export default App;
