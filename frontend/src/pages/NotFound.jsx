import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { TbMapSearch } from "react-icons/tb";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-zinc-900 text-center">
      <div className="text-green-600 dark:text-green-400 text-7xl font-bold mb-2">404</div>

      <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 text-lg font-medium mb-4">
        <TbMapSearch className="text-2xl" />
        <p>Page not found — maybe you're lost in a solo quest?</p>
      </div>

      <Link
        to="/"
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium transition"
      >
        <FiHome />
        Return to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
