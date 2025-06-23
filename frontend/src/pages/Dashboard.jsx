import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import toast from "react-hot-toast";
import { IoIosCreate } from "react-icons/io";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import StatsSection from "./Stats";
import { Link } from "react-router-dom";
import { FiBarChart2 } from "react-icons/fi";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const moodLevels = {
  happy: 5,
  calm: 4,
  okay: 3,
  anxious: 2,
  sad: 1,
};

export default function Dashboard() {
  const [suggestions, setSuggestions] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: [],
    difficulty: "easy",
  });
  const [quests, setQuests] = useState([]);
  const [userQuests, setUserQuests] = useState([]);
  const [greeting, setGreeting] = useState("Good Morning");
  const [userId, setUserId] = useState(null);
  const [tab, setTab] = useState("public");
  const chartRef = useRef(null);
  const token = localStorage.getItem("token");

  const tagOptions = [
    "reflection",
    "calm",
    "outdoors",
    "creativity",
    "social",
    "challenge",
  ];

  const updateSuggestions = async () => {
    try {
      const res = await axios.get(
        "https://solosparklll.onrender.com/api/quest/recommended",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuggestions(res.data?.recommended || []);
    } catch (err) {
      toast.error("Failed to load AI suggestions");
    }
  };

  const updateGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good afternoon");
    else if (hour >= 17) setGreeting("Good evening");
    else setGreeting("Good morning");
  };

  const fetchMoodData = async () => {
    try {
      const res = await axios.get(
        "https://solosparklll.onrender.com/api/analytics/mood-trend",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const converted = res.data.moodTrend.map((entry) => ({
        date: entry.date,
        moodScore: moodLevels[entry.mood.toLowerCase()] || 0,
        label: entry.mood,
      }));

      const ctx = document.getElementById("moodChart");
      if (chartRef.current) chartRef.current.destroy();
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: converted.map((d) => d.date),
          datasets: [
            {
              label: "Mood",
              data: converted.map((d) => d.moodScore),
              borderColor: "#4ade80",
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, max: 5, ticks: { stepSize: 1 } },
          },
        },
      });
    } catch (err) {
      toast.error("Failed to fetch mood trend");
    }
  };

  const logMood = () => {
    window.location.href = "/log-mood";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axios.get(
          "https://solosparklll.onrender.com/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserId(profileRes.data.profile._id);

        const questRes = await axios.get("https://solosparklll.onrender.com/api/quest", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuests(questRes.data.quests);

        const userQuestRes = await axios.get(
          "https://solosparklll.onrender.com/api/user-quest",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserQuests(userQuestRes.data.assigned || []);
      } catch (err) {
        toast.error("Failed to load dashboard data");
      }
    };

    fetchData();
    updateSuggestions();
    updateGreeting();
    fetchMoodData();
  }, []);

  const handleCreateQuest = async () => {
    try {
      await axios.post("https://solosparklll.onrender.com/api/quest", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Quest created!");
      setForm({ title: "", description: "", tags: [], difficulty: "easy" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Creation failed");
    }
  };

  const assignQuest = async (questId) => {
    try {
      await axios.post(
        "https://solosparklll.onrender.com/api/user-quest",
        { questId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Quest assigned!");
      updateSuggestions();
    } catch (err) {
      toast.error("Assignment failed");
    }
  };

  const getVisibleQuests = () => {
    if (tab === "my") return quests.filter((q) => q.createdBy?._id === userId);
    return quests.filter((q) => q.createdBy?.email === "juber@gmail.com");
  };

  const toggleTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-all duration-300">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{greeting}, Juber 🌤️</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Let's check in with your mind today.
            </p>
          </div>
          <Link
            to="/timeline"
            className="flex items-center gap-1 hover:text-green-600 dark:hover:text-green-400 transition"
          >
            <FiBarChart2 /> Tract Your Emotion
          </Link>
        </header>
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* AI Suggestions */}
          <div className="bg-zinc-900 p-5 rounded-xl shadow text-white">
            <h2 className="text-xl font-semibold mb-3">✨ AI Suggestions</h2>
            <div className="overflow-y-auto h-60 rounded-2xl pr-1">
              {suggestions.length?suggestions.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-800 transition p-3 rounded mb-2"
                >
                  <strong>{q.title}</strong>
                  <p className="text-sm text-gray-400">{q.description}</p>
                  <button
                    onClick={() => assignQuest(q._id)}
                    className="mt-2 px-3 py-1 text-sm border border-current rounded"
                  >
                    Assign
                  </button>
                </div>
              )):<div>Tell Your Mood Atleast Twice</div>}
            </div>
            <button
              onClick={updateSuggestions}
              className="mt-3 w-full px-4 py-2 border border-current rounded hover:bg-current hover:text-black"
            >
              Generate More
            </button>
          </div>

          {/* Mood Tracker */}
          <div className="bg-zinc-900 p-5 rounded-xl shadow flex flex-col text-white">
            <h2 className="text-xl font-semibold mb-3">📊 Mood Chart</h2>
            <div className="flex-1 h-24">
              <canvas id="moodChart"></canvas>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={logMood}
                className="px-4 py-2 border border-current rounded hover:bg-green-600 hover:text-white"
              >
                Tell Mood
              </button>
            </div>
          </div>

          {/* Create Quest */}
          <div className="bg-white dark:bg-zinc-900 text-black dark:text-white p-5 rounded-xl shadow max-h-[600px] flex flex-col">
            <h2 className="text-xl flex gap-2 items-center font-semibold mb-3">
              <IoIosCreate />
<span> Create Your Own Quest</span>
            </h2>

            <input
              type="text"
              className="w-full p-2 rounded bg-white dark:bg-zinc-800 border border-zinc-600 mb-2"
              placeholder="Quest title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              rows="3"
              className="w-full p-2 rounded bg-white dark:bg-zinc-800 border border-zinc-600 mb-2"
              placeholder="Describe your personal wellness quest..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            ></textarea>

            <div className="flex flex-wrap gap-2 mb-2">
              {tagOptions.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded border text-sm transition-all ${
                    form.tags.includes(tag)
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <select
              value={form.difficulty}
              onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              className="w-full border p-2 rounded mb-3 bg-white dark:bg-zinc-800 dark:text-white"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard"> Hard</option>
            </select>

            <button
              onClick={handleCreateQuest}
              className="bg-black dark:bg-white text-white dark:text-black w-full p-2 font-semibold rounded hover:opacity-90"
            >
              Create Quest
            </button>
          </div>
        </div>

        {/* Quest Tabs */}
        <div className="pt-10">
          <div className="border border-zinc-200 rounded-2xl p-4 bg-white dark:bg-zinc-900">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setTab("public")}
                className={`px-4 py-1 rounded-md font-medium transition-all duration-200 ${
                  tab === "public"
                    ? "bg-white text-black border border-black"
                    : "bg-black text-white"
                }`}
              >
                Public Quests
              </button>
              <button
                onClick={() => setTab("my")}
                className={`px-4 py-1 rounded-md font-medium transition-all duration-200 ${
                  tab === "my"
                    ? "bg-white text-black border border-black"
                    : "bg-black text-white"
                }`}
              >
                My Created
              </button>
            </div>

            <div className="overflow-y-auto mt-6 space-y-4 max-h-[400px] pr-2">
              {getVisibleQuests().map((q, i) => {
                const userQuest = userQuests.find((uq) => {
                  const questId = uq.questId?._id || uq.questId;
                  return String(questId) === String(q._id);
                });
                const isCompleted = userQuest?.status === "completed";
                const progress = isCompleted ? 100 : 0;

                return (
                  <div
                    key={i}
                    className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 text-white"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{q.title}</h4>
                      <span className="text-sm text-gray-400">
                        {progress}% Complete
                      </span>
                    </div>
                    <div className="h-2 bg-zinc-600 mt-2 rounded overflow-hidden">
                      <div
                        className="bg-green-400 h-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    {q._id && (
                      <button
                        onClick={() => assignQuest(q._id)}
                        className="mt-3 px-4 py-1 text-sm border border-white text-white rounded hover:bg-white hover:text-black"
                      >
                        Assign
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12">
          <h2 className="text-3xl gap-2 flex font-bold mb-6 text-center">
            <FaPersonWalkingLuggage className="mt-2" />
            <span>Your Growth Summary</span>
          </h2>
          <StatsSection />
        </div>
      </div>
    </div>
  );
}
