import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiX, FiCamera, FiMic } from 'react-icons/fi';

function SubmitReflection() {
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState([]);
  const [audio, setAudio] = useState([]);
  const [show, setShow] = useState(false);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const userQuestId = location.state?.userQuestId;

  useEffect(() => {
    if (userQuestId && token) setShow(true);
  }, [userQuestId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
const toastId = toast.loading("Uploading...");
    const form = new FormData();
    form.append('text', text);
    form.append('userQuestId', userQuestId);
    for (let i = 0; i < photos.length; i++) {
      form.append('photos', photos[i]);
    }
    for (let i = 0; i < audio.length; i++) {
      form.append('audio', audio[i]);
    }

    try {
      await axios.post('https://solosparklll.onrender.com/api/reflection', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
        toast.success("Uploaded successfully!", {
    id: toastId
  });
      navigate('/'); // redirect after submission
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit reflection');
    }
  };

  const handleClose = () => {
    setShow(false);
    navigate(-1); // go back to previous page
  };

  if (!token || !userQuestId || !show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-full max-w-xl mx-auto bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-lg shadow-lg p-6">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          aria-label="Close modal"
        >
          <FiX size={20} />
        </button>

        <h1 className="text-2xl font-bold mb-4">Submit Your Proof of Quest Completion</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What did you feel, think, or learn?"
            className="w-full p-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded resize-none h-32"
            required
          />

          <div>
            <label className="block font-semibold mb-1">Upload Photos</label>
            <label
              htmlFor="photo-upload"
              className="inline-flex cursor-pointer items-center gap-2 rounded bg-zinc-200 dark:bg-zinc-800 px-4 py-2 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
            >
              <FiCamera className="text-zinc-600 dark:text-zinc-300" size={18} />
              Choose Photos
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setPhotos(e.target.files)}
              className="hidden"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Upload Audio (Optional)</label>
            <label
              htmlFor="audio-upload"
              className="inline-flex cursor-pointer items-center gap-2 rounded bg-zinc-200 dark:bg-zinc-800 px-4 py-2 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
            >
              <FiMic className="text-zinc-600 dark:text-zinc-300" size={18} />
              Choose Audio
            </label>
            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              multiple
              onChange={(e) => setAudio(e.target.files)}
              className="hidden"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitReflection;
