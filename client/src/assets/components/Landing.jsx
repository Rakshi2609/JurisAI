import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import SplineScene from './SplineScene';

const Landing = () => {
  return (
    <>


      <section className="hero" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          <h1>Chat Your Way to Cyber Safety <br /> Smart, Instant & Reliable</h1>
          <p>
            Meet your personal cybersecurity assistant—<br />
            Get expert advice and actions, right when you need them.
          </p>
          <div className="cta-buttons">
            <Link to="/JurisBot" className="cta-btn primary">Chat Now</Link>


            <Link to="/contact" className="cta-btn secondary">Connet With US</Link>

          </div>
        </div>
        <div className="hero-image">
          <div style={{ width: 440, maxWidth: '100%', height: 440, maxHeight: '100%' }}>
            <SplineScene className="hero-canvas" interactive={true} />
          </div>
        </div>
      </section>


      <section className="features">
        <h2>Why Use Our Chatbot?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Instant Cyber Help</h3>
            <p>Ask any cybersecurity question and get quick, accurate solutions tailored to your issue.</p>
          </div>
          <div className="feature-item">
            <h3>Action-Oriented Guidance</h3>
            <p>From threat removal to system hardening, get step-by-step instructions you can follow right away.</p>
          </div>
          <div className="feature-item">
            <h3>AI-Powered Intelligence</h3>
            <p>Our chatbot is trained on real-world cyber threats to give you smart, reliable advice.</p>
          </div>
        </div>
      </section>

      <br></br>
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Ask Your Cyber Question</h3>
            <p>Type any security-related concern—malware, phishing, data loss, you name it.</p>
          </div>
          <div className="step">
            <h3>2. Get Solutions + Actions</h3>
            <p>The chatbot offers a detailed answer and shows you exactly what to do next.</p>
          </div>
          <div className="step">
            <h3>3. Stay Secure, Stay Informed</h3>
            <p>Keep chatting for updates, best practices, and ongoing protection tips.</p>
          </div>
        </div>
      </section>
      <br></br>


      <section className="cta-section">
        <h2 className='ques'>Got a Cyber Question? We've Got Your Back.</h2>
        <p>Start chatting now and take control of your digital safety.</p>
        <Link to="/JurisBot" className="cta-btn primary">Talk to the BOT</Link>
      </section>
    </>
  );
};

export default Landing;
