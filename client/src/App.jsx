import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { CommandPalette } from './components/ui/CommandPalette';
import { AdminModal } from './components/admin/AdminModal';
import { Toast } from './components/ui/Toast';
import { DevTabHeader } from './components/layout/DevTabHeader';
import { DevPagination } from './components/layout/DevPagination';

import { Intro } from './components/sections/Intro';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';

import { fetchPortfolioData, fallbackPortfolioData } from './services/api';

const SECTIONS = [
  {
    id: 'introduction',
    label: '/Introduction',
    title: 'Introduction',
    filename: 'Intro.tsx',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
  },
  {
    id: 'about',
    label: '/About Me',
    title: 'About Me',
    filename: 'About.tsx',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
  },
  {
    id: 'projects',
    label: '/Projects',
    title: 'Projects',
    filename: 'Projects.tsx',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
  },
  {
    id: 'skills',
    label: '/Skills & Tools',
    title: 'Skills & Tools',
    filename: 'Skills.tsx',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m18 16 4-4-4-4"></path>
        <path d="m6 8-4 4 4 4"></path>
        <path d="m14.5 4-5 16"></path>
      </svg>
    ),
  },
  {
    id: 'experience',
    label: '/Experience',
    title: 'Experience',
    filename: 'Experience.tsx',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
        <path d="M16 3v4"></path>
        <path d="M8 3v4"></path>
        <path d="M3 11h18"></path>
      </svg>
    ),
  },
  {
    id: 'education',
    label: '/Education',
    title: 'Education',
    filename: 'Education.tsx',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
      </svg>
    ),
  },
  {
    id: 'contact',
    label: '/Contact',
    title: 'Contact',
    filename: 'Contact.tsx',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    ),
  },
];

export function App() {
  const [data, setData] = useState(fallbackPortfolioData);
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      const found = SECTIONS.some((s) => s.id === hash);
      if (found) return hash;
    }
    return 'introduction';
  });

  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLive, setIsLive] = useState(false);

  // Smooth tab navigation handler
  const handleSelectSection = (id) => {
    if (!SECTIONS.some((s) => s.id === id)) return;
    setActiveSection(id);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (SECTIONS.some((s) => s.id === hash)) {
        setActiveSection(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard navigation: Left/Right Arrow & PageUp/PageDown
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isCmdOpen || isAdminOpen || isDrawerOpen) return;
      const tag = e.target.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable) {
        return;
      }

      const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (currentIndex < SECTIONS.length - 1) {
          e.preventDefault();
          handleSelectSection(SECTIONS[currentIndex + 1].id);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          e.preventDefault();
          handleSelectSection(SECTIONS[currentIndex - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isCmdOpen, isAdminOpen, isDrawerOpen]);

  // Load portfolio data from MongoDB Atlas via REST API
  useEffect(() => {
    let isMounted = true;
    fetchPortfolioData().then((res) => {
      if (isMounted && res) {
        setData(res);
        if (res.isLive) setIsLive(true);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Top Header */}
      <Header
        onOpenCmd={() => setIsCmdOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        isLive={isLive}
        onSelectSection={handleSelectSection}
      />

      {/* Main Two-Column Layout */}
      <div className="site-wrapper">
        <Sidebar
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
        />

        <main className="main-content">
          <div className="dev-tab-wrapper">
            {/* Top IDE File Tabs & Breadcrumbs Bar */}
            <DevTabHeader
              sections={SECTIONS}
              activeSection={activeSection}
              onSelectSection={handleSelectSection}
            />

            {/* Active Tab Screen */}
            <div key={activeSection} className="dev-tab-container">
              {activeSection === 'introduction' && (
                <Intro hero={data.hero} onNavigate={handleSelectSection} />
              )}
              {activeSection === 'about' && (
                <About metrics={data.metrics} />
              )}
              {activeSection === 'projects' && (
                <Projects projects={data.projects} />
              )}
              {activeSection === 'skills' && (
                <Skills />
              )}
              {activeSection === 'experience' && (
                <Experience experience={data.experience} />
              )}
              {activeSection === 'education' && (
                <Education
                  education={data.education}
                  certifications={data.certifications}
                />
              )}
              {activeSection === 'contact' && (
                <Contact onShowToast={setToastMessage} />
              )}
            </div>

            {/* Developer Bottom Navigation Controls */}
            <DevPagination
              sections={SECTIONS}
              activeSection={activeSection}
              onSelectSection={handleSelectSection}
            />
          </div>

          {/* Footer */}
          <footer
            style={{
              marginTop: '3.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.8125rem',
              color: 'var(--muted-foreground)',
              gap: '1rem',
            }}
          >
            <div>
              Designed & Engineered with the <strong>MERN Stack</strong> by Vedant Singh.
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => handleSelectSection('introduction')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 'inherit',
                }}
              >
                ↑ Back to Intro
              </button>
            </div>
          </footer>
        </main>
      </div>

      {/* Mobile Slide-Out Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      {/* ⌘K Command Palette */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onShowToast={setToastMessage}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectSection={handleSelectSection}
      />

      {/* Owner-Only Admin Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onShowToast={setToastMessage}
      />

      {/* Toast Feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </>
  );
}

