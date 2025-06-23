import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyQuests from "./pages/MyQuests";
import SubmitReflection from "./pages/SubmitReflection";
import MoodChart from "./pages/MoodChart";
import Navbar from "./components/Navbar";
import LogMood from "./pages/LogMood";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Timeline from "./pages/Timeline";
import WatchReflection from "./pages/WatchReflection";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/logmood" element={<LogMood />} />
        <Route path="/my-quests" element={<MyQuests />} />
        <Route path="/watch-reflection/:id" element={<WatchReflection />} />
        <Route path="/submit-reflection" element={<SubmitReflection />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/mood-chart" element={<MoodChart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
