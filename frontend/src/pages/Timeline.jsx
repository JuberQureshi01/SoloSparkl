import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const moodScoreMap = {
  sad: 1,
  anxious: 2,
  okay: 3,
  calm: 4,
  happy: 5
};

const moodColorMap = {
  happy: "#10b981",
  calm: "#06b6d4",
  okay: "#facc15",
  anxious: "#f97316",
  sad: "#ef4444"
};

const moodDescriptionMap = {
  happy: "Feeling joyful, satisfied, and uplifted.",
  calm: "A sense of peace and relaxation.",
  okay: "Neutral or balanced emotional state.",
  anxious: "Feeling nervous, uneasy, or worried.",
  sad: "Experiencing sorrow, disappointment, or grief."
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const entry = payload[0].payload;
    return (
      <div className="bg-white dark:bg-zinc-800 text-sm text-black dark:text-white p-3 rounded shadow-md">
        <p><strong>Date:</strong> {new Date(label).toDateString()}</p>
        <p><strong>Mood:</strong> {entry.mood}</p>
        {entry.notes && <p><strong>Note:</strong> {entry.notes}</p>}
        <p className="mt-1 text-xs italic text-zinc-500 dark:text-zinc-400">
          {moodDescriptionMap[entry.mood] || ""}
        </p>
      </div>
    );
  }
  return null;
};

const CustomDot = ({ cx, cy, payload }) => {
  const color = moodColorMap[payload.mood] || "#999";
  return <circle cx={cx} cy={cy} r={5} stroke={color} fill={color} />;
};

function Timeline() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/analytics/emotion-timeline", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const mapped = res.data.timeline.map(entry => ({
          date: entry.date,
          moodScore: moodScoreMap[entry.mood] || 0,
          mood: entry.mood,
          notes: entry.notes
        }));
        setData(mapped);
      } catch {
        console.error("Timeline fetch failed");
      }
    };
    fetchTimeline();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto text-zinc-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">🌈 Emotional Journey Timeline</h1>
      <p className="text-sm text-center mb-6 text-zinc-600 dark:text-zinc-400">
        This timeline reflects your emotional well-being based on your logged moods over time. 
        Each point represents how you felt on a specific day, helping you track mental health patterns.
      </p>
      {data.length === 0 ? (
        <p className="text-center">No mood data yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="moodScore"
              stroke="#4ade80"
              strokeWidth={3}
              dot={<CustomDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Timeline;
