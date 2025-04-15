import React from 'react';
import './Landing.css'
import { Link } from 'react-router-dom';



//import hackerImg from "../hacker2.jpeg";
const Landing = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Security Made Easy <br /> Efficient and Affordable</h1>
          <p>
            We have built an all-in-one cybersecurity platform <br />
            designed to protect what matters the most to you.
          </p>
          <div className="cta-buttons">
            <button className="cta-btn primary">Get Started</button>
            <button className="cta-btn secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/hacker2.jpg" alt="Hacker Illustration" />


        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Real-Time Threat Detection</h3>
            <p>Our AI-powered system detects and prevents cyber threats before they happen.</p>
          </div>
          <div className="feature-item">
            <h3>Secure Your Digital Identity</h3>
            <p>Protect your online presence from hacking, phishing, and fraud.</p>
          </div>
          <div className="feature-item">
            <h3>Encrypted Cloud Storage</h3>
            <p>Safeguard your sensitive files with top-tier encryption.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <br></br>
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Scan for Vulnerabilities</h3>
            <p>Our system analyzes your digital footprint and identifies weak points.</p>
          </div>
          <div className="step">
            <h3>2. Implement Security Measures</h3>
            <p>We provide AI-driven solutions to strengthen your cybersecurity.</p>
          </div>
          <div className="step">
            <h3>3. Monitor and Stay Protected</h3>
            <p>Enjoy 24/7 monitoring and real-time updates against new threats.</p>
          </div>
        </div>
      </section>
      <br></br>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-card">
          <p>"This platform saved my company from a major data breach!"</p>
          <span>- Sarah J., IT Manager</span>
        </div>
        <div className="testimonial-card">
          <p>"Finally, a cybersecurity tool that's easy to use and incredibly effective."</p>
          <span>- Alex R., Software Engineer</span>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Secure Your Digital World?</h2>
        <p>Sign up today and get the best cybersecurity protection available.</p>
        <Link to="/register" className="cta-btn primary">Start Now</Link>
      </section>
    </>
  );
};

export default Landing;
