import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const MobileDrawer = ({ isOpen, onClose, activeSection }) => {
  const { theme, toggleTheme } = useTheme();

  const links = [
    { id: 'introduction', label: '/Introduction' },
    { id: 'about', label: '/About Me' },
    { id: 'projects', label: '/Projects' },
    { id: 'skills', label: '/Skills & Tools' },
    { id: 'experience', label: '/Experience' },
    { id: 'education', label: '/Education' },
    { id: 'contact', label: '/Contact' },
  ];

  return (
    <>
      <div
        className={`drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div>
          <div className="drawer-header">
            <span style={{ fontWeight: 600, fontSize: '1rem', letterSpacing: '-0.02em' }}>
              vedant.is-dev
            </span>
            <button
              type="button"
              className="icon-btn"
              onClick={onClose}
              aria-label="Close navigation drawer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <ul className="drawer-menu">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`drawer-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={onClose}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="drawer-footer">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Appearance</span>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <a
              href="https://github.com/igvedant"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              style={{ flex: 1 }}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/igvedant/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              style={{ flex: 1 }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
