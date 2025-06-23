import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function StatsSection() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://solosparklll.onrender.com/api/analytics/summary",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats(res.data);
      } catch (err) {
        toast.error("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchStats();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600 dark:text-red-400 mb-4">
          Please login to view your stats.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
              Signup
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-300 text-lg mt-6">
        Loading stats...
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Completed Quests" value={stats.completedQuests} />
      <Card title="Total Points Earned" value={stats.totalPoints} />
      <Card title="Mood Logs" value={stats.moodLogs} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-xl p-6 shadow-md bg-white text-black dark:bg-zinc-800 dark:text-white transition hover:scale-105 duration-200">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default StatsSection;
