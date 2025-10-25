import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { avatarUrls, getAvatarUrlByName } from "../icons/avatars";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const profileRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    setProfileOpen(false);
    setMenuOpen(false);
  };

  const handleChatBotClick = (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    if (user.verified) return navigate("/JurisBot");
    return navigate("/verify");
  };

  // Close menu and profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
      if (profileOpen && profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, profileOpen]);

  // Prevent body scroll on mobile menu open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = menuOpen ? "hidden" : originalStyle;
    return () => (document.body.style.overflow = originalStyle);
  }, [menuOpen]);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/" className="logo-link">JurisAI</Link>
      </div>

      {/* Hamburger */}
      <button
        ref={toggleRef}
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((s) => !s)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`} ref={menuRef}>
        <li><Link to="/home" className="nav-item" onClick={() => setMenuOpen(false)}>About</Link></li>
        <li>
          <Link to="#" className="nav-item" onClick={(e) => { handleChatBotClick(e); setMenuOpen(false); }}>
            ChatBot
          </Link>
        </li>
        <li><Link to="/business" className="nav-item" onClick={() => setMenuOpen(false)}>Business</Link></li>
        <li><Link to="/blog" className="nav-item" onClick={() => setMenuOpen(false)}>Blog</Link></li>
        <li><Link to="/contact" className="nav-item" onClick={() => setMenuOpen(false)}>Contact</Link></li>

        {/* Mobile auth buttons */}
        {/* <li className="mobile-auth">
          {user ? (
            <>
              <Link to="/profile" className="nav-item" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="login nav-item" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="sign-up nav-item" onClick={() => setMenuOpen(false)}>Signup</Link>
            </>
          )}
        </li> */}
      </ul>

      {/* Desktop Auth */}
      <div className="navbar-auth" ref={profileRef}>
        {user ? (
          <div className="profile-menu">
            <button
              className="profile-toggle"
              onClick={() => setProfileOpen((s) => !s)}
            >
              {user.avatar
                ? <img src={getAvatarUrlByName(user.avatar) || avatarUrls[user.avatarIndex] || avatarUrls[0]} className="profile-avatar" alt="avatar" />
                : <span className="profile-initial">{(user.name || "U")[0].toUpperCase()}</span>}
              <span className="profile-name">{user.name}</span>
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                <Link to="/profile" className="dropdown-item" onClick={() => setProfileOpen(false)}>Profile</Link>
                <button className="dropdown-item signout" onClick={handleLogout}>Sign out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="login nav-item">Login</Link>
            <Link to="/register" className="sign-up nav-item">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
