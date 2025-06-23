import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import { FaSmile, FaMeh, FaFrown, FaAngry, FaSmileBeam } from "react-icons/fa";

function LogMood() {
  const [mood, setMood] = useState("happy");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/mood",
        { mood, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Hope We Will Improve your Mood");
      navigate("/");
    } catch (err) {
      toast.error("Failed to log mood");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <p className="text-center mt-10 text-red-600 dark:text-red-400">
        Please login first
      </p>
    );
  }

  // Map moods to icon components + labels
  const moodOptions = [
    { value: "happy", label: "Happy", icon: <FaSmileBeam className="inline text-yellow-400" /> },
    { value: "calm", label: "Calm", icon: <FaSmile className="inline text-blue-400" /> },
    { value: "okay", label: "Okay", icon: <FaMeh className="inline text-zinc-400" /> },
    { value: "anxious", label: "Anxious", icon: <FaAngry className="inline text-red-500" /> },
    { value: "sad", label: "Sad", icon: <FaFrown className="inline text-indigo-600" /> },
  ];

  return (
    <div className="p-6 max-w-md mx-auto mt-6 bg-white dark:bg-zinc-900 rounded shadow-md text-zinc-900 dark:text-zinc-100 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium"
        aria-label="Go back"
      >
        <FiArrowLeft size={20} />
        Back
      </button>

      <h1 className="text-2xl font-bold mb-4 text-center flex justify-center items-center gap-2">
        <FaSmileBeam />
        Tell Us About Your Mood
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-medium block mb-2">How do you feel?</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full border border-zinc-300 dark:border-zinc-700 p-3 rounded mt-1 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
          >
            {moodOptions.map(({ value, label, icon }) => (
              <option key={value} value={value}>
                {label} {/* Icons don't show in option dropdown, so only label here */}
              </option>
            ))}
          </select>
          <div className="mt-2 flex gap-4 justify-center text-2xl">
            {/* Show icons below select as mood previews */}
            {moodOptions.map(({ value, icon }) => (
              <span
                key={value}
                className={`cursor-pointer transition-transform hover:scale-125 ${
                  mood === value ? "scale-150" : "opacity-50"
                }`}
                onClick={() => setMood(value)}
                title={value}
              >
                {icon}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="font-medium block mb-2">Write a note (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-zinc-300 dark:border-zinc-700 p-3 rounded mt-1 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 h-24 resize-none"
            placeholder="Why do you feel this way?"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded w-full flex justify-center items-center gap-2 font-semibold disabled:opacity-70 disabled:cursor-not-allowed transition"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-label="loading"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Mood"
          )}
        </button>
      </form>
    </div>
  );
}

export default LogMood;
