import React from 'react';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaFont,
  FaHashtag,
  FaChartBar
} from 'react-icons/fa';

export default function TextInsights({
  mode,
  text
}) {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  const wordFrequency = {};

  words.forEach((word) => {
    wordFrequency[word] =
      (wordFrequency[word] || 0) + 1;
  });

  const topWords = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const charFrequency = {};

  text
    .replace(/\s/g, '')
    .split('')
    .forEach((char) => {
      charFrequency[char] =
        (charFrequency[char] || 0) + 1;
    });

  const topChars = Object.entries(charFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const cardStyle = {
    background:
      mode === 'dark'
        ? 'rgba(255,255,255,0.05)'
        : 'rgba(255,255,255,0.9)',
    border:
      mode === 'dark'
        ? '1px solid rgba(255,255,255,0.08)'
        : '1px solid rgba(15,23,42,0.08)',
    borderRadius: '24px',
    padding: '24px',
    backdropFilter: 'blur(20px)',
    height: '100%'
  };

  return (
    <div className="row g-4 mt-2">

      <div className="col-lg-6">
        <motion.div
          whileHover={{ y: -6 }}
          style={cardStyle}
        >
          <div className="d-flex align-items-center gap-2 mb-3">
            <FaChartBar color="#3B82F6" />
            <h5
              className="mb-0"
              style={{
                color:
                  mode === 'dark'
                    ? '#F8FAFC'
                    : '#0F172A'
              }}
            >
              Top Word Frequency
            </h5>
          </div>

          {topWords.length > 0 ? (
            topWords.map(([word, count]) => (
              <div
                key={word}
                className="d-flex justify-content-between mb-2"
              >
                <span>{word}</span>
                <strong>{count}</strong>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </motion.div>
      </div>

      <div className="col-lg-6">
        <motion.div
          whileHover={{ y: -6 }}
          style={cardStyle}
        >
          <div className="d-flex align-items-center gap-2 mb-3">
            <FaFont color="#8B5CF6" />
            <h5
              className="mb-0"
              style={{
                color:
                  mode === 'dark'
                    ? '#F8FAFC'
                    : '#0F172A'
              }}
            >
              Character Frequency
            </h5>
          </div>

          {topChars.length > 0 ? (
            topChars.map(([char, count]) => (
              <div
                key={char}
                className="d-flex justify-content-between mb-2"
              >
                <span>{char}</span>
                <strong>{count}</strong>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </motion.div>
      </div>

      <div className="col-lg-12">
        <motion.div
          whileHover={{ y: -6 }}
          style={cardStyle}
        >
          <div className="d-flex align-items-center gap-2 mb-3">
            <FaSearch color="#3B82F6" />
            <h5
              className="mb-0"
              style={{
                color:
                  mode === 'dark'
                    ? '#F8FAFC'
                    : '#0F172A'
              }}
            >
              Keyword Finder
            </h5>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap'
            }}
          >
            {[...new Set(words)]
              .slice(0, 20)
              .map((word) => (
                <span
                  key={word}
                  style={{
                    background:
                      'rgba(59,130,246,0.12)',
                    color: '#3B82F6',
                    padding: '8px 12px',
                    borderRadius: '999px',
                    fontSize: '.9rem'
                  }}
                >
                  <FaHashtag className="me-1" />
                  {word}
                </span>
              ))}
          </div>
        </motion.div>
      </div>

    </div>
  );
}