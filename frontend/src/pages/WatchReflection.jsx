import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft, FiEye, FiMapPin, FiBook, FiCalendar, FiCheckCircle } from "react-icons/fi";

function WatchReflection() {
  const { id } = useParams(); // userQuestId
  const [current, setCurrent] = useState(null);
  const [others, setOthers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReflections = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reflection/view/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrent(res.data.current);
        setOthers(res.data.others);
      } catch (err) {
        toast.error("Failed to load reflection");
      }
    };
    fetchReflections();
  }, [id, token]);

  // Larger card for current reflection
  const renderCurrentReflection = (r) => (
    <div
      key={r._id}
      className="bg-white dark:bg-zinc-900 rounded-xl p-8 border border-zinc-300 dark:border-zinc-700 shadow-lg mb-8"
    >
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        {r.userQuestId?.questId?.title || "Untitled Quest"}
      </h2>
      <p className="text-lg text-zinc-800 dark:text-zinc-300 mb-6">{r.text}</p>

      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {r.photos?.length > 0 && (
          <div className="w-full md:w-1/2 rounded overflow-hidden max-h-[400px]">
            <img
              src={r.photos[0]}
              alt="Reflection"
              className="w-full h-full object-cover rounded-md border border-zinc-200 dark:border-zinc-700"
            />
          </div>
        )}

        {r.audio?.length > 0 && (
          <div className="w-full md:w-1/2">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Audio Entry:</p>
            <audio controls src={r.audio[0]} className="w-full h-12" />
          </div>
        )}
      </div>

      <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-6 space-y-1 italic">
        {r.userQuestId?.assignedAt && (
          <p className="flex items-center gap-1">
            <FiCalendar /> Assigned: {new Date(r.userQuestId.assignedAt).toLocaleDateString()}
          </p>
        )}
        {r.userQuestId?.completedAt && (
          <p className="flex items-center gap-1">
            <FiCheckCircle /> Completed: {new Date(r.userQuestId.completedAt).toLocaleDateString()}
          </p>
        )}
        <p className="text-zinc-400">Reflection ID: {r._id}</p>
      </div>
    </div>
  );

  // Smaller cards for other reflections
  const renderOtherReflection = (r) => (
    <div
      key={r._id}
      className="bg-white dark:bg-zinc-900 flex border border-zinc-300 dark:border-zinc-700 justify-between rounded-xl p-5 shadow-sm space-y-3 transition hover:shadow-md mb-4"
    >
      <div className="flex-1 pr-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-1">
            <FiMapPin />
            {r.userQuestId?.questId?.title || "Untitled Quest"}
          </h2>
          <button
            onClick={() => navigate(`/watch-reflection/${r.userQuestId?._id}`)}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1"
          >
            <FiEye />
            Watch This
          </button>
        </div>

        <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-2">{r.text}</p>

        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-4 space-y-1 italic">
          {r.userQuestId?.assignedAt && (
            <p className="flex items-center gap-1">
              <FiCalendar /> Assigned: {new Date(r.userQuestId.assignedAt).toLocaleDateString()}
            </p>
          )}
          {r.userQuestId?.completedAt && (
            <p className="flex items-center gap-1">
              <FiCheckCircle /> Completed: {new Date(r.userQuestId.completedAt).toLocaleDateString()}
            </p>
          )}
          <p className="text-zinc-400 flex items-center gap-1">
            <FiBook /> Reflection ID: {r._id}
          </p>
        </div>
      </div>

      <div className="h-full w-[180px] flex flex-col items-center">
        {r.photos?.length > 0 && (
          <div className="rounded overflow-hidden h-[140px] w-full mb-3">
            <img
              src={r.photos[0]}
              alt="Reflection"
              className="w-full h-full object-cover rounded-md border border-zinc-200 dark:border-zinc-700"
            />
          </div>
        )}

        {r.audio?.length > 0 && (
          <div className="w-full">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Audio Entry:</p>
            <audio controls src={r.audio[0]} className="w-full" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium"
        aria-label="Go back"
      >
        <FiArrowLeft size={20} />
        Back
      </button>

      <h1 className="text-2xl font-bold text-center mb-6 text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-2">
        <FiEye />
        Quest Viewer
      </h1>

      <h2 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-400 flex items-center gap-2">
        <FiMapPin />
        The Proof That You Completed This Quest
      </h2>

      {current ? renderCurrentReflection(current) : (
        <p className="text-center text-zinc-500 dark:text-zinc-400">No Proof found for this quest.</p>
      )}

      <h2 className="text-xl font-semibold mt-10 mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
        <FiBook />
        Watch Other Quest
      </h2>

      {others.length === 0 ? (
        <p className="text-center text-zinc-400 dark:text-zinc-500">No other Media Available.</p>
      ) : (
        others.map(renderOtherReflection)
      )}
    </div>
  );
}

export default WatchReflection;
