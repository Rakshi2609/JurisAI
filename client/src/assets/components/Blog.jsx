
import React from 'react';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Cybercrime Awareness',
      content: 'Learn how to protect yourself from cyber threats and scams in the digital world.',
      author: 'Admin',
      date: 'March 2, 2025'
    },
    {
      id: 2,
      title: 'Online Safety Tips',
      content: 'Discover the best practices to ensure your safety while browsing online.',
      author: 'Cyber Expert',
      date: 'March 1, 2025'
    },
    {
      id: 3,
      title: 'The Rise of AI-Powered Cyber Attacks',
      content: 'Explore how artificial intelligence is being used by cybercriminals and how to defend against these sophisticated threats.',
      author: 'AI Specialist',
      date: 'March 10, 2025'
    },
    {
      id: 4,
      title: 'Securing Your Digital Identity in 2025',
      content: 'Learn about the latest techniques to protect your personal information and maintain privacy in an increasingly connected world.',
      author: 'Identity Protection Expert',
      date: 'March 15, 2025'
    },
    {
      id: 5,
      title: 'The Impact of 5G on Cybersecurity',
      content: 'Understand the security implications of widespread 5G adoption and how it affects your online safety.',
      author: 'Network Security Analyst',
      date: 'March 20, 2025'
    },
    {
      id: 6,
      title: 'Navigating the Zero-Trust Security Model',
      content: 'Discover why organizations are adopting zero-trust architecture and what it means for individual users.',
      author: 'Security Architect',
      date: 'March 22, 2025'
    }
  ];


  return (
    <div className="blog-container">
      <h1 className="blog-title">Cybercrime Awareness Blog</h1>
      {blogPosts.map(post => (
        <div key={post.id} className="blog-post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className="blog-meta">
            <span>By {post.author}</span>
            <span>{post.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;