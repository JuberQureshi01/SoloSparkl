import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiLogIn } from 'react-icons/fi';
import Navbar from '../components/Navbar';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging you in...");
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success("Login successful!", { id: toastId });
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
        <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl p-8 space-y-6">
          
          {/* 🔙 Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center text-zinc-400 hover:text-green-500 gap-2 text-sm font-medium"
          >
            <FiArrowLeft /> Back
          </button>

          {/* 🔑 Login Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Solo Sparks</h1>
            <p className="text-zinc-400 mt-1 text-sm">
              Welcome back! Log in to continue your self-growth journey.
            </p>
          </div>

          {/* 📝 Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-zinc-800 text-white placeholder-zinc-400"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-zinc-800 text-white placeholder-zinc-400"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FiLogIn />
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
