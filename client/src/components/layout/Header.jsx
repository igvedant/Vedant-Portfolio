import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const Header = ({ onOpenCmd, onOpenDrawer, isLive, onSelectSection }) => {
  const { theme, toggleTheme } = useTheme();
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="header-left">
          <a
            href="#introduction"
            className="brand-link"
            onClick={(e) => {
              e.preventDefault();
              if (onSelectSection) onSelectSection('introduction');
            }}
          >
            <svg
              className="brand-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 5H19V11"></path>
              <path d="M19 5L5 19"></path>
            </svg>
            <span>vedant.is-dev</span>
          </a>

          <nav className="main-nav" aria-label="Main Navigation">
            <a
              href="#introduction"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                if (onSelectSection) onSelectSection('introduction');
              }}
            >
              Home
            </a>
            <a
              href="https://linkedin.com/in/vedant-singh-sde"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              LinkedIn
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </a>
            <a
              href="https://github.com/igvedant"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              GitHub
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </a>
            <a
              href="#contact"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                if (onSelectSection) onSelectSection('contact');
              }}
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="header-right">
          {/* Command Palette Trigger */}
          <button
            type="button"
            className="search-btn"
            onClick={onOpenCmd}
            aria-label="Search sections (⌘K)"
            title="Search sections (⌘K)"
          >
            <div className="search-btn-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <span className="search-text-desktop">Search sections...</span>
              <span className="search-text-mobile">Search...</span>
            </div>
            <kbd className="kbd-shortcut">
              <span>⌘</span>K
            </kbd>
          </button>

          {/* Live Local Time Status */}
          <div
            className="status-pill"
            title={isLive ? 'MongoDB Atlas Connected • Local Time' : 'Local Time'}
          >
            <div className="ping-dot">
              <span className="ping-circle"></span>
              <span className="ping-solid"></span>
            </div>
            <span>{time}</span>
          </div>

          {/* Theme Switcher */}
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            )}
          </button>

          {/* GitHub Profile External Link */}
          <a
            href="https://github.com/igvedant"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            className="icon-btn mobile-menu-btn"
            onClick={onOpenDrawer}
            aria-label="Open Mobile Menu"
            title="Open navigation"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
