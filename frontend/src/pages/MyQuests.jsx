import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiCheck, FiEye, FiUpload } from "react-icons/fi";
import { GoGoal } from "react-icons/go";
function MyQuests() {
  const [assigned, setAssigned] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchAssigned = async () => {
    try {
      const res = await axios.get("https://solosparklll.onrender.com/api/user-quest", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssigned(res.data.assigned);
    } catch (err) {
      toast.error("Failed to load your quests",err);
    } finally {
      setLoading(false);
    }
  };

  const completeQuest = async (userQuestId) => {
    try {
      await axios.post(
        "https://solosparklll.onrender.com/api/user-quest/complete",
        { userQuestId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Quest completed!");
      fetchAssigned(); // Refresh the list
    } catch {
      toast.error("Failed to complete quest");
    }
  };

  useEffect(() => {
    fetchAssigned();
  }, []);

  if (!token) {
    return (
      <p className="text-center mt-10 text-zinc-800 dark:text-white">
        Please log in first.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-zinc-900 dark:text-zinc-100">
      <h1 className="text-3xl flex items-center gap-5 font-bold mb-6 text-center">
        <GoGoal className="mt-2" />

        <span>Your Assigned Quests</span>
      </h1>

      {loading ? (
        <p className="text-center text-zinc-500 dark:text-zinc-400">
          Loading quests...
        </p>
      ) : assigned.length === 0 ? (
        <p className="text-center text-zinc-500 dark:text-zinc-400">
          No quests assigned yet.
        </p>
      ) : (
        <div className="grid gap-6">
          {assigned.map((a) => (
            <div
              key={a._id}
              className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-1">{a.questId?.title}</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3">
                {a.questId?.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <span
                  className={`text-xs px-3 py-1 rounded-full border font-medium ${
                    a.status === "completed"
                      ? "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-white"
                      : a.status === "skipped"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200"
                      : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                  }`}
                >
                  {a.status.toUpperCase()}
                </span>
                <span className="text-xs text-zinc-500">
                  Assigned: {new Date(a.assignedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {a.reflectionSubmitted ? (
                  <button
                    onClick={() => navigate(`/watch-reflection/${a._id}`)}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                  >
                    <FiEye />
                    Watch Submission
                  </button>
                ) : (
                  <>
                    {a.status === "assigned" && (
                      <button
                        onClick={() => completeQuest(a._id)}
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded bg-black text-white hover:bg-zinc-800 transition"
                      >
                        <FiCheck />
                        Mark as Complete
                      </button>
                    )}

                    {a.status === "completed" && (
                      <>
                        <button
                          onClick={() =>
                            navigate("/submit-reflection", {
                              state: { userQuestId: a._id },
                            })
                          }
                          className="flex items-center gap-2 text-sm px-4 py-2 rounded bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white hover:opacity-90 transition"
                        >
                          <FiUpload />
                          Submit Photo / Audio
                        </button>

                        <button
                          onClick={() => navigate(`/watch-reflection/${a._id}`)}
                          className="flex items-center gap-2 text-sm px-4 py-2 rounded border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                        >
                          <FiEye />
                          Watch Submission
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyQuests;
