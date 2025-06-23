import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function StatsSection() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://solosparklll.onrender.com/api/analytics/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        toast.error("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (!token) {
    return (
      <p className="text-center text-red-600 dark:text-red-400 mt-10">
        Please login to view your stats.
      </p>
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
