import React from 'react'
import './Business.css'
const Business = () => {
  return (
    <div className="business-section">
      <div className="business-container">
        <h1 className="business-title">Welcome to <span>Juris AI for Business</span></h1>
        <p className="business-desc">
          Juris AI offers AI-powered legal assistance tailored for businesses. From contract analysis to compliance checks,
          our chatbot ensures that your business stays legally sound in the digital world.
        </p>

        <div className="features">
          <h2>🔹 Key Benefits for Businesses</h2>
          <ul>
            <li>📜 <b>Contract Analysis:</b> Get AI-driven insights into business contracts.</li>
            <li>🛡 <b>Compliance Assistance:</b> Ensure your company adheres to cyber laws and regulations.</li>
            <li>⚖ <b>Legal Risk Assessment:</b> Identify potential legal risks before they become issues.</li>
            <li>🤖 <b>AI-Powered Consultations:</b> Get instant legal guidance 24/7.</li>
            <li>🔍 <b>Fraud Prevention:</b> Protect your business from cyber fraud and legal pitfalls.</li>
          </ul>
        </div>

        <div className="how-it-works">
          <h2>🚀 How It Works</h2>
          <ol>
            <li>Enter your legal query or upload a contract.</li>
            <li>Our AI chatbot processes the data and provides legal insights.</li>
            <li>Receive actionable recommendations for compliance and legal safety.</li>
          </ol>
        </div>

        <div className="footer">
          <h2>Empower Your Business with <span>Juris AI</span> Today!</h2>
        </div>
      </div>
    </div>
  )
}

export default Business;
