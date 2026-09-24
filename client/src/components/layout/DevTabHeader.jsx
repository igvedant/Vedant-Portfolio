import React, { useRef, useEffect, useState } from 'react';

export const DevTabHeader = ({ sections, activeSection, onSelectSection }) => {
  const tabStripRef = useRef(null);
  const tabRefs = useRef({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const currentSection = sections[currentIndex] || sections[0];
  const progressPercent = Math.round(((currentIndex + 1) / sections.length) * 100);

  // Check if tab strip has overflow to scroll left or right
  const checkScroll = () => {
    const strip = tabStripRef.current;
    if (!strip) return;
    const { scrollLeft, scrollWidth, clientWidth } = strip;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [sections]);

  // Keep active tab in view on mobile/narrow viewports when changing sections from bottom buttons
  useEffect(() => {
    const strip = tabStripRef.current;
    if (!strip) return;

    const ensureActiveTabVisible = () => {
      const activeBtn = tabRefs.current[activeSection];
      if (!activeBtn) return;

      // When approaching the last 1 or 2 sections, scroll all the way to end so Contact is reached
      if (currentIndex >= sections.length - 2) {
        strip.scrollTo({ left: strip.scrollWidth, behavior: 'smooth' });
      } else if (currentIndex === 0) {
        strip.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const stripRect = strip.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();

        const isHiddenRight = btnRect.right > stripRect.right - 16;
        const isHiddenLeft = btnRect.left < stripRect.left + 16;

        if (isHiddenRight) {
          const delta = btnRect.right - stripRect.right + 28;
          strip.scrollTo({ left: strip.scrollLeft + delta, behavior: 'smooth' });
        } else if (isHiddenLeft) {
          const delta = stripRect.left - btnRect.left + 28;
          strip.scrollTo({ left: Math.max(0, strip.scrollLeft - delta), behavior: 'smooth' });
        }
      }

      checkScroll();
    };

    const rId = requestAnimationFrame(ensureActiveTabVisible);
    const timer = setTimeout(checkScroll, 350);

    return () => {
      cancelAnimationFrame(rId);
      clearTimeout(timer);
    };
  }, [activeSection, currentIndex, sections.length]);

  // Convert vertical mouse wheel into horizontal tab scrolling
  const handleWheel = (e) => {
    const strip = tabStripRef.current;
    if (!strip) return;
    if (e.deltaY !== 0) {
      strip.scrollLeft += e.deltaY;
      checkScroll();
    }
  };

  const scrollByAmount = (amount) => {
    const strip = tabStripRef.current;
    if (!strip) return;
    strip.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  return (
    <div className="dev-ide-header">
      {/* Top progress indicator bar */}
      <div className="dev-tab-progress" title={`Navigation Progress: ${progressPercent}%`}>
        <div
          className="dev-tab-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Tab Strip with scroll chevrons */}
      <div className="dev-tab-strip-wrapper">
        {canScrollLeft && (
          <button
            type="button"
            className="dev-tab-scroll-btn left"
            onClick={() => scrollByAmount(-160)}
            aria-label="Scroll tabs left"
            title="Scroll tabs left"
          >
            ‹
          </button>
        )}

        <div
          ref={tabStripRef}
          className="dev-tab-strip"
          onWheel={handleWheel}
          onScroll={checkScroll}
          role="tablist"
          aria-label="Page Tabs"
        >
          {sections.map((section, idx) => {
            const isActive = section.id === activeSection;
            return (
              <button
                key={section.id}
                ref={(el) => (tabRefs.current[section.id] = el)}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`dev-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectSection(section.id)}
                title={`Switch to ${section.title} (${idx + 1}/${sections.length})`}
              >
                {section.icon}
                <span>{section.filename}</span>
                {isActive && <span className="dev-tab-dot" title="Active File" />}
              </button>
            );
          })}
        </div>

        {canScrollRight && (
          <button
            type="button"
            className="dev-tab-scroll-btn right"
            onClick={() => scrollByAmount(160)}
            aria-label="Scroll tabs right"
            title="Scroll tabs right"
          >
            ›
          </button>
        )}
      </div>

      {/* Developer Breadcrumb & Meta Bar */}
      <div className="dev-tab-meta-bar">
        <div className="dev-breadcrumb">
          <span>vedant-portfolio</span>
          <span>/</span>
          <span>src</span>
          <span>/</span>
          <span>pages</span>
          <span>/</span>
          <span className="dev-breadcrumb-active">{currentSection.filename}</span>
        </div>

        <div className="dev-tab-badges">
          <span className="dev-pill-badge info">git:(main)</span>
          <span className="dev-pill-badge success">● 200 OK</span>
          <span className="dev-pill-badge">
            Tab {currentIndex + 1} of {sections.length}
          </span>
        </div>
      </div>
    </div>
  );
};
