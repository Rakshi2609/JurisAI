import React, { useState } from 'react';
import './Blog.css';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: 'AI in Business: A Legal Revolution',
      preview: 'Discover how AI is transforming business operations...',
      content: 'AI is revolutionizing how businesses manage legal risk. Tools like Juris AI automate contract analysis, compliance checks, and legal research. These solutions save time and reduce human error in legal operations.',
      author: 'Juris AI Expert',
      date: 'April 12, 2025'
    },
    {
      id: 2,
      title: 'Securing Your Business in the Digital Era',
      preview: 'Explore strategies to keep your business legally sound...',
      content: 'Digital transformation brings new legal responsibilities. Learn how to protect your business against cyber threats, maintain data compliance, and prevent intellectual property breaches using AI-powered tools.',
      author: 'Cybersecurity Consultant',
      date: 'April 10, 2025'
    },
    {
      id: 3,
      title: 'How Juris AI Simplifies Legal Compliance',
      preview: 'Struggling with compliance? Juris AI can help...',
      content: 'Compliance with GDPR, HIPAA, and other frameworks can be challenging. Juris AI simplifies this by automating policy checks, generating compliance reports, and offering legal summaries for businesses.',
      author: 'Legal Analyst',
      date: 'April 9, 2025'
    },
    {
      id: 4,
      title: 'Preventing Legal Risks with Predictive AI',
      preview: 'Learn how predictive tools can reduce risk...',
      content: 'Predictive AI analyzes historical data and flags high-risk contracts or employee behavior that might lead to legal disputes. Businesses can now act before problems escalate.',
      author: 'Risk Management Expert',
      date: 'April 7, 2025'
    },
    {
      id: 5,
      title: 'Cybercrime Laws Every Startup Should Know',
      preview: 'Startups are vulnerable — learn the laws...',
      content: 'From data theft to phishing, startups face several cyber threats. This blog explains the key IPC sections related to cybercrime and how Juris AI helps identify legal actions against offenders.',
      author: 'Startup Legal Advisor',
      date: 'April 5, 2025'
    },
    {
      id: 6,
      title: 'Contract Automation: A Game-Changer for SMEs',
      preview: 'SMEs can now automate contracts legally...',
      content: 'Small businesses often overlook the legal fine print. Juris AI helps draft, review, and flag issues in contracts using AI-based legal reasoning. No more costly legal mistakes.',
      author: 'Legal Tech Specialist',
      date: 'April 4, 2025'
    },
    {
      id: 7,
      title: 'Understanding Digital Evidence in Indian Law',
      preview: 'Digital evidence can be tricky to validate...',
      content: 'Courts in India accept digital evidence if it follows Section 65B of the Indian Evidence Act. Learn how Juris AI helps validate and format digital evidence for legal use.',
      author: 'Criminal Law Professor',
      date: 'April 2, 2025'
    },
    {
      id: 8,
      title: 'Why AI Can’t Fully Replace Human Lawyers (Yet)',
      preview: 'AI is powerful, but has its limits...',
      content: 'While AI tools like Juris AI enhance productivity, they lack human judgment, empathy, and court experience. The future is a partnership between legal professionals and smart AI.',
      author: 'Ethics in AI Researcher',
      date: 'March 31, 2025'
    },
    {
      id: 9,
      title: 'Legal Chatbots: Changing Client Interaction',
      preview: 'Chatbots make legal help accessible...',
      content: 'Legal chatbots are available 24/7 and simplify basic legal consultations. Juris AI personalizes responses based on user queries, offering step-by-step guidance for complaints, FIRs, and more.',
      author: 'UX Researcher',
      date: 'March 29, 2025'
    },
    {
      id: 10,
      title: 'The Role of AI in Cybercrime Detection',
      preview: 'AI helps track and predict cyber attacks...',
      content: 'AI tools monitor network behavior and predict unusual activity that may indicate a cybercrime. Juris AI connects this detection to appropriate legal frameworks for swift action.',
      author: 'Network Security Analyst',
      date: 'March 27, 2025'
    },
    {
      id: 11,
      title: 'Juris AI: Behind the Scenes',
      preview: 'How does Juris AI actually work?',
      content: 'Juris AI is built using natural language processing and legal ontologies. It maps user input to relevant legal databases, IPC sections, and case laws to deliver context-aware legal support.',
      author: 'Lead Developer',
      date: 'March 25, 2025'
    },
    {
      id: 12,
      title: 'Digital Footprint and Legal Consequences',
      preview: 'Your online presence can be used in court...',
      content: 'Public social media posts, old comments, and leaked data can lead to defamation or privacy lawsuits. Juris AI helps identify risky digital traces and recommends safe actions.',
      author: 'Privacy Law Consultant',
      date: 'March 24, 2025'
    },
    {
      id: 13,
      title: 'AI-Powered Document Review for Legal Teams',
      preview: 'Reviewing documents just got faster...',
      content: 'Legal teams spend hours reviewing documents. Juris AI accelerates this process by flagging clauses, identifying inconsistencies, and comparing with past rulings for relevance.',
      author: 'Corporate Law Advisor',
      date: 'March 22, 2025'
    },
    {
      id: 14,
      title: 'Legal Tech Trends to Watch in 2025',
      preview: 'What’s next for legal technology?',
      content: '2025 will see growth in smart legal assistants, automated dispute resolution, and blockchain notarization. Juris AI is at the forefront of integrating AI into legal workflows.',
      author: 'Tech Policy Analyst',
      date: 'March 20, 2025'
    },
    {
      id: 15,
      title: 'Filing a Cybercrime Complaint: Step-by-Step',
      preview: 'Don’t know how to file a cyber complaint?',
      content: 'Learn how Juris AI guides users through the cybercrime complaint process — from gathering evidence and identifying IPC sections to submitting complaints through government portals.',
      author: 'Digital Rights Advocate',
      date: 'March 18, 2025'
    }
  ];


  return (
    <div className="blog-container">
      <h1 className="blog-title">AI & Cybersecurity Insights Blog</h1>

      {selectedPost ? (
        <div className="blog-popup">
          <button className="back-btn" onClick={() => setSelectedPost(null)}>← </button>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.content}</p>
          <div className="blog-meta">
            <span>By {selectedPost.author}</span>
            <span>{selectedPost.date}</span>
          </div>
        </div>
      ) : (
        blogPosts.map(post => (
          <div key={post.id} className="blog-post" onClick={() => setSelectedPost(post)}>
            <h2>{post.title}</h2>
            <p>{post.preview}</p>
            <div className="blog-meta">
              <span>By {post.author}</span>
              <span>{post.date}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Blog;
