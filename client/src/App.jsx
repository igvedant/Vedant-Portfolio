import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { CommandPalette } from './components/ui/CommandPalette';
import { AdminModal } from './components/admin/AdminModal';
import { Toast } from './components/ui/Toast';

import { Intro } from './components/sections/Intro';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';

import { fetchPortfolioData, fallbackPortfolioData } from './services/api';

export function App() {
  const [data, setData] = useState(fallbackPortfolioData);
  const [activeSection, setActiveSection] = useState('introduction');
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLive, setIsLive] = useState(false);

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

  // Active section observer
  useEffect(() => {
    const sections = document.querySelectorAll('section.content-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, [data]);

  return (
    <>
      {/* Top Header */}
      <Header
        onOpenCmd={() => setIsCmdOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        isLive={isLive}
      />

      {/* Main Two-Column Layout */}
      <div className="site-wrapper">
        <Sidebar activeSection={activeSection} />

        <main className="main-content">
          <Intro hero={data.hero} />
          <About metrics={data.metrics} />
          <Projects projects={data.projects} />
          <Skills />
          <Experience experience={data.experience} />
          <Education education={data.education} certifications={data.certifications} />
          <Contact onShowToast={setToastMessage} />

          {/* Footer */}
          <footer
            style={{
              marginTop: '4rem',
              paddingTop: '2rem',
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
              <a href="#introduction" style={{ color: 'var(--foreground)' }}>
                ↑ Back to top
              </a>
            </div>
          </footer>
        </main>
      </div>

      {/* Mobile Slide-Out Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeSection={activeSection}
      />

      {/* ⌘K Command Palette */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onShowToast={setToastMessage}
        onOpenAdmin={() => setIsAdminOpen(true)}
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
