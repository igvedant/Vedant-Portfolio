import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const Header = ({ onOpenCmd, onOpenDrawer, isLive }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="header-left">
          <a href="#introduction" className="brand-link">
            <svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m18 16 4-4-4-4"></path>
              <path d="m6 8-4 4 4 4"></path>
              <path d="m14.5 4-5 16"></path>
            </svg>
            <span>vedant.is-dev</span>
          </a>

          <nav className="main-nav" aria-label="Main Navigation">
            <a href="#about" className="nav-link">/About</a>
            <a href="#projects" className="nav-link">/Projects</a>
            <a href="#skills" className="nav-link">/Skills</a>
            <a href="#experience" className="nav-link">/Experience</a>
            <a href="#contact" className="nav-link">/Contact</a>
          </nav>
        </div>

        <div className="header-right">
          {/* Command Palette Trigger */}
          <button
            type="button"
            className="search-btn"
            onClick={onOpenCmd}
            aria-label="Search and Quick Commands"
          >
            <span className="search-btn-inner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <span>Quick Search...</span>
            </span>
            <span className="kbd-shortcut">⌘K</span>
          </button>

          {/* Live Status Pill */}
          <div className="status-pill" title={isLive ? 'MongoDB Atlas Connected' : 'MERN Stack Ready'}>
            <span className="ping-dot">
              <span className="ping-circle"></span>
              <span className="ping-solid"></span>
            </span>
            <span>Open to Work</span>
          </div>

          {/* Theme Switcher */}
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            )}
          </button>

          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            className="icon-btn mobile-menu-btn"
            onClick={onOpenDrawer}
            aria-label="Open Mobile Menu"
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
