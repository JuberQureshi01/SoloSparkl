import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function SmartQuests() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchSmartQuests = async () => {
    try {
      const res = await axios.get("https://solosparklll.onrender.com/api/quest/recommended", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuests(res.data.recommended);
    } catch (err) {
      toast.error("Failed to load smart quests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSmartQuests();
  }, []);

  const assignQuest = async (questId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/user-quest",
        { questId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Quest assigned!");
    } catch (err) {
      toast.error("Assignment failed");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">🧠 AI-Based Suggested Quests</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : quests.length === 0 ? (
        <p className="text-center">No personalized quests found.</p>
      ) : (
        <div className="grid gap-4">
          {quests.map((q) => (
            <div key={q._id} className="bg-white p-4 rounded shadow border">
              <h2 className="text-xl font-semibold">{q.title}</h2>
              <p className="text-sm text-gray-600">{q.description}</p>
              <p className="text-xs text-gray-400">Tags: {q.tags.join(', ')}</p>
              <button
                onClick={() => assignQuest(q._id)}
                className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Assign to Me
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SmartQuests;
