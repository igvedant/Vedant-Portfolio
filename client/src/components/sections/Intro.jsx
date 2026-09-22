import React from 'react';

export const Intro = ({ hero }) => {
  const name = hero?.name || 'Vedant Singh';
  const title = hero?.title || 'Full-Stack Web Developer & MERN Architect';
  const paragraphs = hero?.bioParagraphs || [
    'I am a dedicated Software Engineer and Computer Science student specializing in full-stack web application development. I specialize in building responsive, high-performance web solutions using React.js, Node.js, Express.js, and MongoDB, while designing resilient RESTful architectures, secure JWT authentication lifecycles, and cutting-edge AI Agent integrations.',
    'With hands-on experience serving as Team Lead at Infosys Springboard and completing rigorous production builds at 3Skill Platform, I focus on clean coding standards, scalable component patterns, and low-latency database queries.',
  ];

  return (
    <section id="introduction" className="content-section">
      <div className="section-header">
        <div className="hero-badge-pill">
          <span className="ping-dot">
            <span className="ping-circle"></span>
            <span className="ping-solid"></span>
          </span>
          {hero?.statusBadge || 'Open to Software Engineering & Full-Stack Roles'}
        </div>
        <h1 className="section-title">{name}</h1>
        <h2 className="section-subtitle">{title}</h2>
      </div>

      {paragraphs.map((p, idx) => (
        <p key={idx} className="section-body-text">
          {p}
        </p>
      ))}

      <div className="hero-actions">
        <a href="#projects" className="btn btn-primary">
          <span>View Featured Projects</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </a>

        <a href="#contact" className="btn btn-outline">
          <span>Get in Touch</span>
        </a>

        <a
          href="mailto:igvedant01@gmail.com"
          className="btn btn-secondary"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          <span>Email Me</span>
        </a>
      </div>
    </section>
  );
};
