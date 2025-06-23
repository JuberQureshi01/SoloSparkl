import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiUserPlus } from 'react-icons/fi';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing you up...");
    setLoading(true);

    try {
      const res = await axios.post('https://solosparklll.onrender.com/api/signup', form);
      const { token } = res.data;
      localStorage.setItem('token', token);

      toast.success("Signup successful!", { id: toastId });
      navigate('/onboarding');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
<>
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

        {/* 🧠 Solo Sparks Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Solo Sparks</h1>
          <p className="text-zinc-400 mt-1 text-sm">
            Start your personal growth journey by creating your account.
          </p>
        </div>

        {/* 🔐 Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-zinc-800 text-white placeholder-zinc-400"
            required
          />
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
            <FiUserPlus />
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
</>
  );
}

export default Signup;
