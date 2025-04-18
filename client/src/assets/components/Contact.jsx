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


        <div className="contact-info">
          <div className="contact-box">
            <h2>Address</h2>
            <p>VIT Chennai, <br />Vandalur-Kelambakkam Road,<br /> Chennai, Tamil Nadu</p>
          </div>
          <div className="contact-box">
            <h2>Contact Us @ </h2>
            <p>+1800 001 1582</p>
            <p>+91 8213151301</p>
          </div>
          <div className="contact-box">
            <h2>Email</h2>
            <p>jurisai@proton.me</p>
          </div>
          <div className="contact-box">
            <h2>Team Members</h2>
            <p>Rakshith Ganjimuth (24BRS1301)</p>
            <p>Tanush Bhootra (24BRS1282)</p>
            <p>Nirvik Goswami (24BRS1315)</p>
          </div>
        </div>


        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>

          <div className="faq">
            <h3>How can I get legal advice using Juris AI?</h3>
            <p>You can use our chatbot to ask legal queries, and it will suggest relevant laws and legal actions.</p>
          </div>

          <div className="faq">
            <h3>Is my data secure when using Juris AI?</h3>
            <p>Yes, we prioritize your privacy and follow strict security measures to protect your data.</p>
          </div>

          <div className="faq">
            <h3>How can I contact support?</h3>
            <p>You can reach us via email, or connect with our team members listed above.</p>
          </div>


          <div className="faq">
            <h3>What kind of legal issues can Juris AI help with?</h3>
            <p>Juris AI can assist with cybercrime, consumer rights, labor laws, and general legal queries.</p>
          </div>



          <div className="faq">
            <h3>Does Juris AI store my conversations?</h3>
            <p>No, your chats are not stored unless explicitly allowed for follow-up or legal documentation purposes.</p>
          </div>

          <div className="faq">
            <h3>Is Juris AI available in regional languages?</h3>
            <p>Currently, Juris AI works in English, but support for Hindi and other regional languages is coming soon.</p>
          </div>



          <div className="faq">
            <h3>Is Juris AI a replacement for a lawyer?</h3>
            <p>No, Juris AI offers guidance and legal information but is not a substitute for professional legal counsel.</p>
          </div>

          <div className="faq">
            <h3>How often is Juris AI updated with new laws?</h3>
            <p>We update the system regularly to reflect recent amendments and new legislation.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact
