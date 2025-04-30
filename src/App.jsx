import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import EventCalendar from "./pages/Calendar.jsx";
import Navbar from "./pages/Navbar.jsx";
import Event2 from "./pages/Event2.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="" element={<Navigate to={"/calendar"} />} />
        <Route path="/calendar" element={<EventCalendar />} />
        <Route path="/event2" element={<Event2 />} />
      </Routes>
    </Router>
  );
}

export default App;
