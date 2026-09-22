import React, { useState } from 'react';

export const Projects = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'MERN', 'AI', 'Full-Stack'];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="content-section">
      <div className="section-header">
        <h2 className="section-title">Featured Projects</h2>
        <h3 className="section-subtitle">Real-world applications engineered for scale, reliability, and security!</h3>
      </div>

      {/* Category Filter Chips */}
      <div className="filter-tabs" role="tablist" aria-label="Filter Projects by Stack">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            role="tab"
            aria-selected={activeCategory === cat}
          >
            {cat} {cat === 'All' ? `(${projects?.length || 0})` : ''}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project._id || project.title} className="project-card">
            <div>
              <div className="project-header-top">
                <h4 className="project-title">{project.title}</h4>
                <span className="project-role-badge">{project.role}</span>
              </div>

              <p className="project-desc">{project.description}</p>

              <div className="project-tags">
                {project.tags?.map((tag, idx) => (
                  <span key={idx} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="project-footer-links">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <span>Live Demo</span>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  <span>View Code on GitHub</span>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
