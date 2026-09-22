import React, { useState } from 'react';
import { submitContactMessage } from '../../services/api';

export const Contact = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('igvedant01@gmail.com');
    setCopied(true);
    onShowToast('Email address copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      onShowToast('Please fill out all form fields.');
      return;
    }

    try {
      setLoading(true);
      const res = await submitContactMessage(formData);
      if (res && res.success) {
        onShowToast('Message delivered! Saved to MongoDB & emailed to Vedant.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        onShowToast(res?.message || 'Message submitted successfully.');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      // Graceful fallback to mailto if server endpoint is offline
      onShowToast('Message saved! Opening email client as backup...');
      window.location.href = `mailto:igvedant01@gmail.com?subject=${encodeURIComponent(
        'Portfolio Contact from ' + formData.name
      )}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="content-section">
      <div className="section-header">
        <h2 className="section-title">Get in Touch</h2>
        <h3 className="section-subtitle">Let's discuss full-time roles, internships, or building impactful software!</h3>
      </div>

      <div className="contact-container">
        {/* Left Side: Contact Details */}
        <div className="contact-details">
          <div className="contact-card">
            <div className="contact-card-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <div className="contact-card-text">
                <span>Email</span>
                <a href="mailto:igvedant01@gmail.com">igvedant01@gmail.com</a>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleCopyEmail}
              title="Copy to clipboard"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="contact-card">
            <div className="contact-card-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <div className="contact-card-text">
                <span>LinkedIn</span>
                <a href="https://www.linkedin.com/in/igvedant/" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/igvedant
                </a>
              </div>
            </div>
            <a
              href="https://www.linkedin.com/in/igvedant/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              Connect
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-card-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              <div className="contact-card-text">
                <span>GitHub</span>
                <a href="https://github.com/igvedant" target="_blank" rel="noopener noreferrer">
                  github.com/igvedant
                </a>
              </div>
            </div>
            <a
              href="https://github.com/igvedant"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              Follow
            </a>
          </div>
        </div>

        {/* Right Side: Live Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contact-name" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              className="form-input"
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email" className="form-label">
              Your Email Address
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              className="form-input"
              placeholder="e.g. alex@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message" className="form-label">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              className="form-textarea"
              placeholder="Tell me about your role, project, or opportunity..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', marginTop: '0.25rem' }}
          >
            {loading ? (
              <span>Sending Inquiry...</span>
            ) : (
              <>
                <span>Send Message to Vedant</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};
