import React from 'react';

export default function AnalyticsCards({ stats }) {
  return (
    <div className="telemetry-bar">
      {/* Primary Metrics Group */}
      <div className="d-flex align-items-center flex-wrap gap-3">
        <div className="telemetry-item">
          <span className="telemetry-num">{stats.words.toLocaleString()}</span>
          <span>words</span>
        </div>

        <div className="telemetry-divider d-none d-sm-block" />

        <div className="telemetry-item">
          <span className="telemetry-num">{stats.characters.toLocaleString()}</span>
          <span>chars</span>
          <span className="text-muted" style={{ fontSize: '0.72rem' }}>
            ({stats.charactersNoSpaces.toLocaleString()} no spaces)
          </span>
        </div>

        <div className="telemetry-divider d-none d-md-block" />

        <div className="telemetry-item d-none d-md-inline-flex">
          <span className="telemetry-num">{stats.sentences.toLocaleString()}</span>
          <span>sentences</span>
        </div>

        <div className="telemetry-divider d-none d-md-block" />

        <div className="telemetry-item d-none d-md-inline-flex">
          <span className="telemetry-num">{stats.paragraphs.toLocaleString()}</span>
          <span>paragraphs</span>
        </div>

        <div className="telemetry-divider d-none d-lg-block" />

        <div className="telemetry-item d-none d-lg-inline-flex">
          <span>Reading:</span>
          <span className="telemetry-num">~{stats.readingTime} min</span>
        </div>
      </div>

      {/* Quality Badge (Flesch Score) */}
      <div className="d-flex align-items-center gap-2">
        <span
          className="badge rounded-pill"
          style={{
            background: 'var(--bg-surface)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.72rem',
            fontWeight: 600,
            padding: '4px 8px'
          }}
          title={`Flesch Reading Ease score: ${stats.readingScore}/100`}
        >
          Ease: {stats.readingScore}/100 • {stats.readingLevel.split('(')[0].trim()}
        </span>
      </div>
    </div>
  );
}

