import { useState } from 'react';
import logo from '../assets/logo.png';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
  const [matricNumber, setMatricNumber] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault(); // stop page reload on button click

    // validate input
    if (!matricNumber || !password) {
      toast.error('All fields are required');
      return;
    }

    // show loading toast
    toast.loading('Signing you in...', {
      id: 'login',
    });

    try {
      // send request to backend
      const res = await api.post('/auth/login', {
        identifier: matricNumber,
        password,
      });

      // save token
      localStorage.setItem('token', res.data.token);

      // save student info - optional but useful
      localStorage.setItem('student', JSON.stringify(res.data.student));

      // success feedback
      toast.success('Login successful', {
        id: 'login',
      });

      // navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed', { id: 'login' });
    }
  };

  return (
    <div className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-lg p-8">
      {/* header */}
      <div className="text-center mb-8">
        <Link to="/">
          <img
            src={logo}
            alt="CampusHub Logo"
            className="h-10 w-10 mx-auto mb-4"
          />
        </Link>

        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-text-muted text-sm">
          Sign in to continue to CampusHub
        </p>
      </div>

      {/* form*/}
      <form className="space-y-5" onSubmit={handleLogin}>
        {/* Matric Number */}
        <div>
          <label className="block text-sm mb-2">Matric Number</label>
          <input
            type="text"
            placeholder="Enter your reg no"
            value={matricNumber}
            onChange={e => setMatricNumber(e.target.value)}
            className="w-full px-4 py-3 bg-bg border border-border focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-bg border border-border focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 font-semibold hover:bg-primary-hover
              transition-colors"
        >
          Sign In
        </button>

        {/* Quote / Notice */}
        <p className="text-center text-xs md:text-sm text-text-muted mt-6 italic">
          “Access to this portal is provided by this team.”
        </p>
      </form>
    </div>
  );
};

export default Login;
