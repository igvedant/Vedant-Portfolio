import React from 'react';

export const DevPagination = ({ sections, activeSection, onSelectSection }) => {
  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  return (
    <nav className="dev-pagination" aria-label="Page Navigation">
      {/* Previous Page Button */}
      {prevSection ? (
        <button
          type="button"
          className="dev-pagination-btn prev"
          onClick={() => onSelectSection(prevSection.id)}
          title={`Previous: ${prevSection.title} (Press ←)`}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          <div className="btn-text-group">
            <span className="btn-sublabel">Previous Tab</span>
            <span className="btn-mainlabel">{prevSection.label}</span>
          </div>
        </button>
      ) : (
        <div style={{ flex: 1 }} />
      )}

      {/* Center Developer Terminal Status */}
      <div className="dev-pagination-center">
        <div className="dev-terminal-prompt">
          <span>$</span>
          <span>navigate --to="{activeSection}"</span>
          <span className="dev-terminal-cursor"></span>
        </div>
        <div className="dev-key-hint">
          <span>Tab {currentIndex + 1} of {sections.length}</span>
          <span>•</span>
          <span>Use <kbd>←</kbd> <kbd>→</kbd> keys</span>
        </div>
      </div>

      {/* Next Page Button */}
      {nextSection ? (
        <button
          type="button"
          className="dev-pagination-btn next"
          onClick={() => onSelectSection(nextSection.id)}
          title={`Next: ${nextSection.title} (Press →)`}
        >
          <div className="btn-text-group">
            <span className="btn-sublabel">Next Tab</span>
            <span className="btn-mainlabel">{nextSection.label}</span>
          </div>
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      ) : (
        <button
          type="button"
          className="dev-pagination-btn next"
          onClick={() => onSelectSection('introduction')}
          title="Return to Introduction (Press →)"
        >
          <div className="btn-text-group">
            <span className="btn-sublabel">Completed</span>
            <span className="btn-mainlabel">↺ Back to Start</span>
          </div>
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 12 4-4 4 4"></path>
            <path d="M7 8v7a4 4 0 0 0 8 0V8"></path>
          </svg>
        </button>
      )}
    </nav>
  );
};
