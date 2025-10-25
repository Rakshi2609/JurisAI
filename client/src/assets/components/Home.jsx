import React from "react";
import "./About1.css";

const About1 = () => {
  return (
    <section className="about-section">
      <div className="containerr">
        <h1 className="about-title"><span>Juris AI</span> Your Virtual Cyber Lawyer</h1>
        <p className="about-desc">
          Juris AI is an advanced AI-powered legal chatbot specializing in cyber law. Whether you're dealing with
          online fraud, hacking, identity theft, or cyberbullying, Juris AI helps you understand applicable laws
          and suggest s possible legal actions.
        </p>

        <div className="features1">
          <h2>Why Choose Juris AI?</h2>
          <ul>
            <li><strong>Legal Awareness:</strong> Get instant insights on cyber laws.</li>
            <li><strong>Cybersecurity Protection:</strong> Learn how to legally protect yourself from cyber threats.</li>
            <li><strong>Quick & Reliable:</strong> Get legal guidance 24/7.</li>
            <li><strong>AI-Powered Precision:</strong> NLP-based chatbot for accurate legal assistance.</li>
            <li><strong>Easy-to-Use Interface:</strong> A simple, interactive chatbot designed for all users.</li>
            <li><strong>Location-Based Assistance:</strong> Find nearby cybercrime helplines and legal authorities.</li>
          </ul>
        </div>

        <div className="features1">
          <h2>Key Features</h2>
          <ul>
            <li><strong>Cyber Law Guidance:</strong> Learn about laws and penalties for cyber offenses.</li>
            <li><strong>Automated Legal Assistance:</strong> Step-by-step guidance on filing complaints.</li>
            <li><strong>Case-Specific Suggestions:</strong> Get relevant laws based on your query.</li>
            <li><strong>Police & Helpline Directory:</strong> Find cybercrime helplines and legal authorities.</li>
            <li><strong>24/7 Availability:</strong> Access instant legal help anytime.</li>
            <li><strong>Legal Documentation Support:</strong> Learn how to prepare necessary legal documents.</li>
          </ul>
        </div>

        <div className="how-it-works1">
          <h2>How Does Juris AI Work?</h2>
          <ol>
            <li><strong>User Input:</strong> Describe your cyber-related issue.</li>
            <li><strong>AI Processing:</strong> Juris AI analyzes your case and finds relevant laws.</li>
            <li><strong>Legal Suggestions:</strong> Get applicable laws, penalties, and actions.</li>
            <li><strong>Next Steps:</strong> Learn how to file complaints or contact authorities.</li>
            <li><strong>Case Study & References:</strong> Get example cases and past legal references.</li>
            <li><strong>Multilingual Support:</strong> Available in multiple languages for better accessibility.</li>
          </ol>
        </div>

        <div className="additional-info1">
          <h2>Who Can Benefit from Juris AI?</h2>
          <p>Juris AI is designed for a wide range of users, including:</p>
          <ul>
            <li><strong>Individuals:</strong> Victims of cybercrime seeking legal awareness.</li>
            <li><strong>Businesses:</strong> Companies needing cybersecurity compliance support.</li>
            <li><strong>Law Students:</strong> Those studying cyber law and digital rights.</li>
            <li><strong>Law Enforcement:</strong> Officials looking for quick legal references.</li>
          </ul>
        </div>


      </div>
    </section>
  );
};


export default About1;

