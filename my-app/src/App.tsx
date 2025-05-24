import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/login";
import Register from "./components/Register";
import HomePage2 from "./components/HomePage2";
import Games from "./components/Games";
import GamePage from "./components/GamePage";
import EnvironmentPage from "./components/EnvironmentPage";

const AppContent: React.FC = () => {
  const location = useLocation();

  // Hide Navbar & Footer on GamePage and EnvironmentPage
  const hideNavFooter = ["/GamePage", "/environmentpage"].includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Show Navbar only if not on excluded pages */}
      {!hideNavFooter && <Navbar />}

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games" element={<Games />} />
          <Route path="/GamePage" element={<GamePage />} />
          <Route path="/homepage2" element={<HomePage2 />} />
          <Route path="/environmentpage" element={<EnvironmentPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>

      {/* Show Footer only if not on excluded pages */}
      {!hideNavFooter && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router basename="/MentalHealthSupport">
      <AppContent />
    </Router>
  );
};

export default App;
