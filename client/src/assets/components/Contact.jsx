import React from 'react'
import './ContactUs.css'
const Contact = () => {
  return (
    <div className="contact-section">
      <div className="contact-container">
        <h1 className="contact-title">
          Get in <span>Touch</span> with Us
        </h1>
        <p className="contact-desc">
          Have questions? Need support? Contact us for any inquiries related to Juris AI, business partnerships, or customer support.
        </p>

        {/* Contact Information */}
        <div className="contact-info">
          <div className="contact-box">
            <h2>📍 Address</h2>
            <p>123 AI Street, Cyber City, TechLand, 456789</p>
          </div>
          <div className="contact-box">
            <h2>📞 Phone</h2>
            <p>+1 234 567 890</p>
          </div>
          <div className="contact-box">
            <h2>✉ Email</h2>
            <p>support@jurisai.com</p>
          </div>
          <div className="contact-box">
            <h2>💬 Live Chat</h2>
            <p>Available 24/7 for assistance</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>📩 Send Us a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Social Media Links */}
        <div className="social-media">
          <h2>🔗 Connect with Us</h2>
          <div className="social-icons">
            <a href="#" className="social-icon">📘 Facebook</a>
            <a href="#" className="social-icon">🐦 Twitter</a>
            <a href="#" className="social-icon">📸 Instagram</a>
            <a href="#" className="social-icon">💼 LinkedIn</a>
          </div>
        </div>

        {/* FAQs */}
        <div className="faq-section">
          <h2>❓ Frequently Asked Questions</h2>
          <div className="faq">
            <h3>🔹 How can I get legal advice using Juris AI?</h3>
            <p>You can use our chatbot to ask legal queries, and it will suggest relevant laws and legal actions.</p>
          </div>
          <div className="faq">
            <h3>🔹 Is my data secure when using Juris AI?</h3>
            <p>Yes, we prioritize your privacy and follow strict security measures to protect your data.</p>
          </div>
          <div className="faq">
            <h3>🔹 How can I contact support?</h3>
            <p>You can reach us via email, phone, or our 24/7 live chat for immediate assistance.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;
