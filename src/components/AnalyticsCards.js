import React from 'react';
import { motion } from 'framer-motion';
import {
  FaFont,
  FaKeyboard,
  FaAlignLeft,
  FaClock,
  FaParagraph,
  FaChartLine
} from 'react-icons/fa';

export default function AnalyticsCards({
  mode,
  words,
  characters,
  sentences,
  readingTime,
  paragraphs,
  avgWordLength
}) {
  const stats = [
    {
      title: 'Words',
      value: words,
      icon: <FaFont />
    },
    {
      title: 'Characters',
      value: characters,
      icon: <FaKeyboard />
    },
    {
      title: 'Sentences',
      value: sentences,
      icon: <FaAlignLeft />
    },
    {
      title: 'Reading Time',
      value: `${readingTime} min`,
      icon: <FaClock />
    },
    {
      title: 'Paragraphs',
      value: paragraphs,
      icon: <FaParagraph />
    },
    {
      title: 'Avg Word Length',
      value: avgWordLength,
      icon: <FaChartLine />
    }
  ];

  return (
    <div className="row g-4">
      {stats.map((item) => (
        <div
          className="col-lg-4 col-md-6"
          key={item.title}
        >
          <motion.div
            whileHover={{
              y: -8,
              scale: 1.02
            }}
            style={{
              borderRadius: '24px',
              padding: '24px',
              height: '100%',
              background:
                mode === 'dark'
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(20px)',
              border:
                mode === 'dark'
                  ? '1px solid rgba(255,255,255,0.08)'
                  : '1px solid rgba(15,23,42,0.08)',
              boxShadow:
                '0 20px 40px rgba(0,0,0,0.08)'
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                  'linear-gradient(135deg,#3B82F6,#8B5CF6)',
                color: '#fff',
                marginBottom: 16
              }}
            >
              {item.icon}
            </div>

            <div
              style={{
                color:
                  mode === 'dark'
                    ? '#94A3B8'
                    : '#64748B'
              }}
            >
              {item.title}
            </div>

            <h2
              style={{
                marginTop: 10,
                fontWeight: 800,
                color:
                  mode === 'dark'
                    ? '#F8FAFC'
                    : '#0F172A'
              }}
            >
              {item.value}
            </h2>
          </motion.div>
        </div>
      ))}
    </div>
  );
}