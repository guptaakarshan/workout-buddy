import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function AppContent() {
  const { user } = useAuthContext();
  const location = useLocation();

  // Show navbar only on /home
  const showNavbar =
    location.pathname === "/home" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {showNavbar && <Navbar />}

      <div className="pages">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/home" />}
          />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
