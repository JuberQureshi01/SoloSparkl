import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiActivity, FiHome, FiBookOpen, FiBarChart2 } from "react-icons/fi";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!token) return null;

  return (
    <nav className="relative bg-white dark:bg-zinc-900 shadow-md px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
      {/* Main Nav */}
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <ul className="flex gap-6 text-sm font-medium items-center text-zinc-800 dark:text-zinc-200">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-green-600 dark:hover:text-green-400 transition"
            >
              <FiHome /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/my-quests"
              className="flex items-center gap-1 hover:text-green-600 dark:hover:text-green-400 transition"
            >
              <FiBookOpen /> My Quests
            </Link>
          </li>
          <li>

          </li>
        </ul>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded transition text-sm"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
