import React from 'react';
import {
  FiType,
  FiFileText,
  FiAlignLeft,
  FiClock,
  FiActivity,
  FiList
} from 'react-icons/fi';

export default function AnalyticsCards({ stats }) {
  const cards = [
    {
      title: 'Words',
      value: stats.words.toLocaleString(),
      sub: `${stats.charactersNoSpaces.toLocaleString()} chars (no space)`,
      icon: <FiType />
    },
    {
      title: 'Characters',
      value: stats.characters.toLocaleString(),
      sub: `Across ${stats.lines.toLocaleString()} lines`,
      icon: <FiFileText />
    },
    {
      title: 'Sentences',
      value: stats.sentences.toLocaleString(),
      sub: `${stats.paragraphs.toLocaleString()} paragraphs`,
      icon: <FiAlignLeft />
    },
    {
      title: 'Reading Time',
      value: `${stats.readingTime} min`,
      sub: `~${stats.speakingTime} min speaking`,
      icon: <FiClock />
    },
    {
      title: 'Avg Word Length',
      value: `${stats.avgWordLength} chars`,
      sub: 'Per vocabulary token',
      icon: <FiList />
    },
    {
      title: 'Reading Ease',
      value: `${stats.readingScore}/100`,
      sub: stats.readingLevel,
      icon: <FiActivity />
    }
  ];

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="fw-bold m-0 d-flex align-items-center gap-2">
          <FiActivity className="text-primary" />
          <span>Real-time Text Intelligence</span>
        </h5>
        <span className="text-muted font-monospace" style={{ fontSize: '0.8rem' }}>
          Live telemetry
        </span>
      </div>

      <div className="row g-3">
        {cards.map((card) => (
          <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6" key={card.title}>
            <div className="metric-card">
              <div>
                <div className="metric-icon-box">{card.icon}</div>
                <div className="metric-label">{card.title}</div>
                <div className="metric-value">{card.value}</div>
              </div>
              <div
                className="text-muted mt-2 pt-2 border-top border-secondary-subtle"
                style={{ fontSize: '0.72rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                title={card.sub}
              >
                {card.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
