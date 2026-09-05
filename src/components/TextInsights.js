import React, { useState } from 'react';
import {
  FiChevronDown,
  FiChevronUp,
  FiBarChart2,
  FiHash,
  FiEdit3,
  FiLayers
} from 'react-icons/fi';
import { extractFrequencyInsights } from '../utils/textOperations';

export default function TextInsights({ text }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasContent = Boolean(text && text.trim().length > 0);
  const { topWords, topChars, keywords } = extractFrequencyInsights(text);
  const maxWordCount = topWords.length > 0 ? topWords[0][1] : 1;
  const maxCharCount = topChars.length > 0 ? topChars[0][1] : 1;

  return (
    <div className="insights-drawer">
      {/* Header Bar / Toggle */}
      <div
        className="insights-drawer-header"
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
      >
        <div className="d-flex align-items-center gap-2">
          <FiLayers size={16} className="text-primary" />
          <span className="fw-semibold" style={{ fontSize: '0.88rem' }}>
            Vocabulary & Frequency Insights
          </span>
          {hasContent && (
            <span className="badge rounded-pill bg-secondary-subtle text-secondary ms-1" style={{ fontSize: '0.7rem' }}>
              {keywords.length} keywords detected
            </span>
          )}
        </div>

        <div className="d-flex align-items-center gap-2 text-secondary" style={{ fontSize: '0.8rem' }}>
          <span>{isOpen ? 'Hide' : 'Expand'}</span>
          {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        </div>
      </div>

      {/* Collapsible Body */}
      {isOpen && (
        <div className="p-3 border-top border-secondary-subtle">
          {!hasContent ? (
            /* Beautiful empty state */
            <div className="py-4 text-center text-muted">
              <div
                className="d-inline-flex p-3 rounded-circle mb-2"
                style={{ background: 'var(--bg-surface-subtle)' }}
              >
                <FiEdit3 size={24} className="text-secondary opacity-60" />
              </div>
              <p className="fw-semibold mb-1" style={{ fontSize: '0.9rem' }}>
                Start typing or paste text to unlock vocabulary distribution
              </p>
              <span className="text-muted" style={{ fontSize: '0.78rem' }}>
                Word occurrences, character density, and extracted subject tags will populate here automatically.
              </span>
            </div>
          ) : (
            <div className="row g-3">
              {/* Word frequency */}
              <div className="col-md-6 col-12">
                <div className="p-3 rounded-3" style={{ background: 'var(--bg-surface-subtle)' }}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="fw-semibold" style={{ fontSize: '0.82rem' }}>
                      Word Frequency
                    </span>
                    <FiBarChart2 className="text-primary" size={14} />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    {topWords.map(([word, count]) => {
                      const pct = Math.round((count / maxWordCount) * 100);
                      return (
                        <div key={word}>
                          <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.78rem' }}>
                            <span className="font-monospace fw-semibold">{word}</span>
                            <span className="text-muted">{count}x</span>
                          </div>
                          <div className="w-100 rounded-pill overflow-hidden" style={{ height: 4, background: 'var(--bg-surface)' }}>
                            <div className="h-100 rounded-pill" style={{ width: `${pct}%`, background: 'var(--accent-primary)' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Character frequency */}
              <div className="col-md-6 col-12">
                <div className="p-3 rounded-3" style={{ background: 'var(--bg-surface-subtle)' }}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="fw-semibold" style={{ fontSize: '0.82rem' }}>
                      Character Frequency
                    </span>
                    <FiBarChart2 className="text-info" size={14} />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    {topChars.map(([char, count]) => {
                      const pct = Math.round((count / maxCharCount) * 100);
                      return (
                        <div key={char}>
                          <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.78rem' }}>
                            <span className="font-monospace fw-semibold">'{char}'</span>
                            <span className="text-muted">{count}x</span>
                          </div>
                          <div className="w-100 rounded-pill overflow-hidden" style={{ height: 4, background: 'var(--bg-surface)' }}>
                            <div className="h-100 rounded-pill" style={{ width: `${pct}%`, background: '#06B6D4' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Keywords */}
              <div className="col-12">
                <div className="p-3 rounded-3" style={{ background: 'var(--bg-surface-subtle)' }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <FiHash className="text-primary" size={14} />
                    <span className="fw-semibold" style={{ fontSize: '0.82rem' }}>
                      Subject Keywords (Stop-words excluded)
                    </span>
                  </div>
                  {keywords.length === 0 ? (
                    <span className="text-muted" style={{ fontSize: '0.78rem' }}>
                      No distinctive subject keywords extracted yet.
                    </span>
                  ) : (
                    <div className="d-flex flex-wrap gap-1 mt-2">
                      {keywords.map(({ word, count }) => (
                        <span
                          key={word}
                          className="px-2 py-1 rounded"
                          style={{
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-subtle)',
                            fontSize: '0.75rem',
                            color: 'var(--accent-primary)',
                            fontWeight: 500
                          }}
                        >
                          #{word} <span className="text-muted font-monospace">({count})</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

