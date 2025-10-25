import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleChatBotClick = (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    if (user && user.verified) return navigate("/JurisBot");
    return navigate("/verify");
  };

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="logo">
        <Link to="/" className="logo-link" aria-label="Home">JurisAI</Link>
      </div>
      <ul className="nav-links" role="navigation">
        <li>
          <Link to="/home" className="nav-item" aria-label="About Us">About</Link>
        </li>
        <li>
          {/* ChatBot Button Always Visible, but Redirects Based on Login */}
          <Link to="#" onClick={handleChatBotClick} className="nav-item" aria-label="ChatBot">ChatBot</Link>
        </li>
        <li>
          <Link to="/business" className="nav-item" aria-label="Business Services">Business</Link>
        </li>
        <li>
          <Link to="/blog" className="nav-item" aria-label="Blog Articles">Blog</Link>
        </li>
        <li>
          <Link to="/contact" className="nav-item" aria-label="Contact Us">Contact</Link>
        </li>
      </ul>

      {/* Authentication Links */}
      <div className="navbar-auth">
        {user ? (
          <>
            <span className="navbar-user" aria-live="polite">Welcome, {user.name}</span>
            <button
              className="logout-btn"
              onClick={handleLogout}
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login nav-item" aria-label="Login">Login</Link>
            <Link to="/register" className="sign-up nav-item" aria-label="Signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;