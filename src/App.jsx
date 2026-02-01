import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Home from './pages/Home';
import UserLayout from './layouts/UserLayout';

const App = () => {
  useTheme();
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* AUTH */}

        {/* USER DASHBOARD - PROTECTED */}
      </Routes>
    </Router>
  );
};

export default App;
