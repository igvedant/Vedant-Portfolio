import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const CommandPalette = ({ isOpen, onClose, onShowToast, onOpenAdmin }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const allItems = [
    {
      group: 'Navigation',
      id: 'nav-intro',
      title: 'Go to Introduction',
      badge: 'Section',
      action: () => scrollTo('#introduction'),
    },
    {
      group: 'Navigation',
      id: 'nav-about',
      title: 'Go to About Me',
      badge: 'Section',
      action: () => scrollTo('#about'),
    },
    {
      group: 'Navigation',
      id: 'nav-projects',
      title: 'Go to Projects',
      badge: 'Section',
      action: () => scrollTo('#projects'),
    },
    {
      group: 'Navigation',
      id: 'nav-skills',
      title: 'Go to Skills & Tools',
      badge: 'Section',
      action: () => scrollTo('#skills'),
    },
    {
      group: 'Navigation',
      id: 'nav-experience',
      title: 'Go to Work Experience',
      badge: 'Section',
      action: () => scrollTo('#experience'),
    },
    {
      group: 'Navigation',
      id: 'nav-education',
      title: 'Go to Education & Certifications',
      badge: 'Section',
      action: () => scrollTo('#education'),
    },
    {
      group: 'Navigation',
      id: 'nav-contact',
      title: 'Go to Contact',
      badge: 'Section',
      action: () => scrollTo('#contact'),
    },
    {
      group: 'Actions',
      id: 'act-theme',
      title: `Toggle Theme (Current: ${theme === 'dark' ? 'Dark' : 'Light'})`,
      badge: 'Theme',
      action: () => {
        toggleTheme();
        onShowToast('Theme switched!');
      },
    },
    {
      group: 'Actions',
      id: 'act-email',
      title: 'Copy Email Address (igvedant01@gmail.com)',
      badge: 'Clipboard',
      action: () => {
        navigator.clipboard.writeText('igvedant01@gmail.com');
        onShowToast('Email copied to clipboard!');
      },
    },
    {
      group: 'Social',
      id: 'soc-github',
      title: 'Open GitHub Profile',
      badge: 'External',
      action: () => window.open('https://github.com/igvedant', '_blank'),
    },
    {
      group: 'Social',
      id: 'soc-linkedin',
      title: 'Open LinkedIn Profile',
      badge: 'External',
      action: () => window.open('https://www.linkedin.com/in/igvedant/', '_blank'),
    },
    {
      group: 'Admin',
      id: 'admin-login',
      title: 'Owner Control Center (igvedant01@gmail.com)',
      badge: 'Owner Only',
      action: () => onOpenAdmin(),
    },
  ];

  const filteredItems = allItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase().trim())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredItems[selectedIndex];
      if (current) {
        onClose();
        current.action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`cmd-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className="cmd-box">
        <div className="cmd-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or jump to section..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="kbd-shortcut"
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          >
            ESC
          </button>
        </div>

        <div className="cmd-list">
          {filteredItems.length === 0 ? (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
              No matching commands found.
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className={`cmd-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={() => {
                  onClose();
                  item.action();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="cmd-item-left">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                  <span>{item.title}</span>
                </div>
                <span className="cmd-item-badge">{item.badge}</span>
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span>Navigate with arrows</span>
          <div className="cmd-footer-shortcuts">
            <span>↑↓ to select</span>
            <span>↵ to execute</span>
          </div>
        </div>
      </div>
    </div>
  );
};
