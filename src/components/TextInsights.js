import React from 'react';
import { FiBarChart2, FiPieChart, FiTag, FiHash } from 'react-icons/fi';
import { extractFrequencyInsights } from '../utils/textOperations';

export default function TextInsights({ text }) {
  const { topWords, topChars, keywords } = extractFrequencyInsights(text);
  const maxWordCount = topWords.length > 0 ? topWords[0][1] : 1;
  const maxCharCount = topChars.length > 0 ? topChars[0][1] : 1;

  if (!text || !text.trim()) {
    return (
      <div
        className="p-4 rounded-3 text-center text-muted"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <FiBarChart2 size={32} className="mb-2 opacity-40" />
        <p className="m-0 fw-semibold">Frequency & Keyword Insights</p>
        <span style={{ fontSize: '0.8rem' }}>
          Type or paste content in the workspace to reveal statistical distribution and key topic tags.
        </span>
      </div>
    );
  }

  return (
    <div className="row g-3">
      {/* Top Word Frequency with visual progress bars */}
      <div className="col-lg-6 col-12">
        <div className="textora-card h-100">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2">
              <FiBarChart2 className="text-primary" size={17} />
              <h6 className="m-0 fw-bold">Top Word Frequency</h6>
            </div>
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>
              Top occurrences
            </span>
          </div>

          <div className="d-flex flex-column gap-3">
            {topWords.map(([word, count]) => {
              const pct = Math.round((count / maxWordCount) * 100);
              return (
                <div key={word}>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-semibold font-monospace" style={{ fontSize: '0.85rem' }}>
                      {word}
                    </span>
                    <span className="text-muted font-monospace" style={{ fontSize: '0.78rem' }}>
                      {count}x
                    </span>
                  </div>
                  <div
                    className="w-100 rounded-pill overflow-hidden"
                    style={{ height: '6px', background: 'var(--bg-surface-hover)' }}
                  >
                    <div
                      className="h-100 rounded-pill"
                      style={{
                        width: `${pct}%`,
                        background: 'var(--accent-gradient)',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Character Distribution */}
      <div className="col-lg-6 col-12">
        <div className="textora-card h-100">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2">
              <FiPieChart className="text-info" size={17} />
              <h6 className="m-0 fw-bold">Character Distribution</h6>
            </div>
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>
              Density breakdown
            </span>
          </div>

          <div className="d-flex flex-column gap-3">
            {topChars.map(([char, count]) => {
              const pct = Math.round((count / maxCharCount) * 100);
              return (
                <div key={char}>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold font-monospace px-2 py-0 rounded" style={{ fontSize: '0.85rem', background: 'var(--bg-surface-hover)' }}>
                      '{char}'
                    </span>
                    <span className="text-muted font-monospace" style={{ fontSize: '0.78rem' }}>
                      {count} occurrences
                    </span>
                  </div>
                  <div
                    className="w-100 rounded-pill overflow-hidden"
                    style={{ height: '6px', background: 'var(--bg-surface-hover)' }}
                  >
                    <div
                      className="h-100 rounded-pill"
                      style={{
                        width: `${pct}%`,
                        background: 'linear-gradient(90deg, #06B6D4, #3B82F6)',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Extracted Topic Keywords (Cleaned) */}
      <div className="col-12">
        <div className="textora-card">
          <div className="d-flex align-items-center gap-2 mb-3">
            <FiTag className="text-primary" size={17} />
            <h6 className="m-0 fw-bold">Significant Keywords & Subject Tags</h6>
            <span className="text-muted ms-auto" style={{ fontSize: '0.75rem' }}>
              Filtered against 150+ common stop-words
            </span>
          </div>

          {keywords.length === 0 ? (
            <div className="text-muted" style={{ fontSize: '0.85rem' }}>
              No significant subject keywords detected yet.
            </div>
          ) : (
            <div className="d-flex flex-wrap gap-2">
              {keywords.map(({ word, count }) => (
                <span
                  key={word}
                  className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill"
                  style={{
                    background: 'var(--bg-badge)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    color: 'var(--accent-primary)',
                    fontSize: '0.82rem',
                    fontWeight: 600
                  }}
                >
                  <FiHash size={12} />
                  <span>{word}</span>
                  <span className="opacity-60 ms-1 font-monospace" style={{ fontSize: '0.75rem' }}>
                    ({count})
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
