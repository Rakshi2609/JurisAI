import React from 'react'
import './Business.css'

const Business = () => {
  return (
    <div className="business-section">
      <div className="business-container">
        <h1 className="business-title">Welcome to <span>Juris AI for Business</span></h1>
        <p className="business-desc">
          Juris AI provides intelligent legal support specifically designed for businesses. From analyzing contracts to ensuring regulatory compliance, our AI-driven chatbot helps your organization stay legally secure in today's fast-paced digital environment.
        </p>

        <div className="features">
          <h2>Key Benefits for Businesses</h2>
          <ul>
            <li><b>Contract Analysis:</b> Gain quick, AI-powered insights into complex legal agreements.</li>
            <li><b>Compliance Assistance:</b> Stay aligned with evolving cyber laws and data protection standards.</li>
            <li><b>Legal Risk Assessment:</b> Proactively identify and mitigate potential legal threats.</li>
            <li><b>AI Consultations:</b> Access instant, automated legal guidance around the clock.</li>
            <li><b>Fraud Detection:</b> Safeguard your operations against fraudulent practices and legal loopholes.</li>
          </ul>
        </div>

        <div className="how-it-works">
          <h2>How It Works</h2>
          <ol>
            <li>Submit a legal query or upload your business contract.</li>
            <li>Juris AI processes the input and delivers accurate legal insights.</li>
            <li>Receive personalized, actionable recommendations to maintain compliance and legal integrity.</li>
          </ol>
        </div>

        <div className="footer">
          <h2>Empower Your Business with <span>Juris AI</span> Today</h2>
        </div>
      </div>
    </div>
  )
}

export default Business;
