import React from 'react';
import { motion } from 'framer-motion';
import {
  FaRobot,
  FaLanguage,
  FaSpellCheck,
  FaPenFancy
} from 'react-icons/fa';

export default function AIToolsSection({ mode }) {
  const tools = [
    {
      title: 'AI Summarizer',
      icon: <FaRobot />,
      description:
        'Generate concise summaries from long content.',
      status: 'Coming Soon'
    },
    {
      title: 'AI Rewriter',
      icon: <FaPenFancy />,
      description:
        'Rewrite text with improved clarity and tone.',
      status: 'Coming Soon'
    },
    {
      title: 'AI Translator',
      icon: <FaLanguage />,
      description:
        'Translate content into multiple languages.',
      status: 'Coming Soon'
    },
    {
      title: 'Grammar Checker',
      icon: <FaSpellCheck />,
      description:
        'Detect grammar issues and writing mistakes.',
      status: 'Coming Soon'
    }
  ];

  return (
    <section className="mt-5">
      <div className="mb-4">

        <span
          style={{
            color: '#3B82F6',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          AI Workspace
        </span>

        <h2
          style={{
            marginTop: 12,
            color:
              mode === 'dark'
                ? '#F8FAFC'
                : '#0F172A'
          }}
        >
          Next Generation AI Tools
        </h2>

        <p
          style={{
            color:
              mode === 'dark'
                ? '#94A3B8'
                : '#64748B'
          }}
        >
          Premium AI features planned for future releases.
        </p>

      </div>

      <div className="row g-4">

        {tools.map((tool) => (
          <div
            className="col-lg-3 col-md-6"
            key={tool.title}
          >
            <motion.div
              whileHover={{
                y: -10,
                scale: 1.02
              }}
              style={{
                height: '100%',
                padding: '28px',
                borderRadius: '24px',
                background:
                  mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(255,255,255,0.9)',
                border:
                  mode === 'dark'
                    ? '1px solid rgba(255,255,255,0.08)'
                    : '1px solid rgba(15,23,42,0.08)',
                backdropFilter: 'blur(20px)',
                boxShadow:
                  '0 20px 40px rgba(0,0,0,0.08)'
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'linear-gradient(135deg,#3B82F6,#8B5CF6)',
                  color: '#fff',
                  fontSize: '1.3rem',
                  marginBottom: 20
                }}
              >
                {tool.icon}
              </div>

              <h5
                style={{
                  color:
                    mode === 'dark'
                      ? '#F8FAFC'
                      : '#0F172A'
                }}
              >
                {tool.title}
              </h5>

              <p
                style={{
                  color:
                    mode === 'dark'
                      ? '#94A3B8'
                      : '#64748B',
                  minHeight: 70
                }}
              >
                {tool.description}
              </p>

              <span
                style={{
                  padding: '8px 12px',
                  borderRadius: '999px',
                  background:
                    'rgba(59,130,246,0.12)',
                  color: '#3B82F6',
                  fontSize: '.85rem',
                  fontWeight: 700
                }}
              >
                {tool.status}
              </span>
            </motion.div>
          </div>
        ))}

      </div>
    </section>
  );
}