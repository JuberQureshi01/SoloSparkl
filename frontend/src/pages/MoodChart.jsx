import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import toast from 'react-hot-toast';

const moodLevels = {
  happy: 5,
  calm: 4,
  okay: 3,
  anxious: 2,
  sad: 1,
};

function MoodChart() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  const fetchMoodData = async () => {
    try {
      const res = await axios.get('https://solosparklll.onrender.com/api/analytics/mood-trend', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const converted = res.data.moodTrend.map((entry) => ({
        date: entry.date,
        moodScore: moodLevels[entry.mood.toLowerCase()] || 0,
        label: entry.mood
      }));
      setData(converted);
    } catch (err) {
      toast.err('Failed to fetch mood trend',err);
    }
  };

  useEffect(() => {
    fetchMoodData();
  }, []);

  if (!token) {
    return <div className="text-center mt-10 text-red-600">Please log in to view mood chart.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">📈 Mood Trend (Last 7 Days)</h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
          <Tooltip formatter={(val, name, props) => [`Mood: ${props.payload.label}`, ""]} />
          <Line type="monotone" dataKey="moodScore" stroke="#4ade80" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MoodChart;
