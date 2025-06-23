import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiUserCheck, FiActivity, FiArrowLeft } from 'react-icons/fi';
import { TbChecklist, TbSend } from 'react-icons/tb';

function Onboarding() {
  const [introvert, setIntrovert] = useState(true);
  const [openness, setOpenness] = useState("medium");
  const [preferred, setPreferred] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const questOptions = ["reflection", "outdoors", "creativity", "social"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://solosparklll.onrender.com/api/user/personality", {
        introvert,
        openness,
        preferredQuestTypes: preferred
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Profile saved!");
      setSubmitted(true);
      navigate("/");
    } catch (err) {
      toast.error("Failed to save profile");
    }
  };

  const toggleQuest = (tag) => {
    setPreferred((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  if (submitted) return null;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-lg shadow mt-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition"
      >
        <FiArrowLeft size={18} />
        Back
      </button>

      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <FiUserCheck />
        Personality Onboarding
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Introvert Question */}
        <div>
          <label className="font-semibold flex items-center gap-2 mb-1">
            <FiActivity />
            Are you more introverted?
          </label>
          <select
            value={introvert ? "yes" : "no"}
            onChange={(e) => setIntrovert(e.target.value === "yes")}
            className="w-full border border-zinc-300 dark:border-zinc-700 rounded p-2 bg-white dark:bg-zinc-800"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Openness */}
        <div>
          <label className="font-semibold flex items-center gap-2 mb-1">
            <TbChecklist />
            How open are you to new experiences?
          </label>
          <select
            value={openness}
            onChange={(e) => setOpenness(e.target.value)}
            className="w-full border border-zinc-300 dark:border-zinc-700 rounded p-2 bg-white dark:bg-zinc-800"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Quest Tags */}
        <div>
          <label className="font-semibold flex items-center gap-2 mb-2">
            <TbChecklist />
            Preferred Quest Types:
          </label>
          <div className="flex flex-wrap gap-2">
            {questOptions.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleQuest(tag)}
                className={`px-3 py-1 rounded-full text-sm transition font-medium ${
                  preferred.includes(tag)
                    ? "bg-green-600 text-white"
                    : "bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          <TbSend />
          Save & Continue
        </button>
      </form>
    </div>
  );
}

export default Onboarding;
