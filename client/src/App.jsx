import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./assets/components/Home";
import Signup from "./assets/components/Signup";
import Login from "./assets/components/Login";
import Landing from "./assets/components/Landing";
import Blog from "./assets/components/Blog";
import Business from "./assets/components/Business";
import AboutUs from "./assets/components/AboutUs";
import "bootstrap/dist/css/bootstrap.min.css";
import Contact from "./assets/components/Contact";
import Navbar from "./assets/components/Navbar";
import JurisBot from "./assets/components/JurisBot";
import AboutFooter from "./assets/components/Footer";

function App() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("user") !== null;

  const hiddenNavbarRoutes = ["/login", "/register"];
  const hiddenFooterRoutes = ["/login", "/register", "/JurisBot"];

  return (
    <div>
      {!hiddenNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/business" element={<Business />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Route for JurisBot */}
        <Route
          path="/JurisBot"
          element={isLoggedIn ? <JurisBot /> : <Navigate to="/login" />}
        />
      </Routes>

      {!hiddenFooterRoutes.includes(location.pathname) && <AboutFooter />}
    </div>
  );
}

export default App;
