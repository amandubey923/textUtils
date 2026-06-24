import React from 'react';
import { motion } from 'framer-motion';
import {
  FaRocket,
  FaBolt,
  FaBrain,
  FaChartLine,
  FaCode,
  FaUsers,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';

export default function About({ mode }) {
  const textColor =
    mode === 'dark' ? '#F8FAFC' : '#0F172A';

  const subColor =
    mode === 'dark' ? '#94A3B8' : '#64748B';

  const cardBg =
    mode === 'dark'
      ? 'rgba(255,255,255,0.05)'
      : 'rgba(255,255,255,0.9)';

  const features = [
    {
      icon: <FaBolt />,
      title: 'Lightning Fast',
      desc: 'Process and transform text instantly.'
    },
    {
      icon: <FaBrain />,
      title: 'AI Ready',
      desc: 'Built for future AI integrations.'
    },
    {
      icon: <FaChartLine />,
      title: 'Advanced Analytics',
      desc: 'Powerful insights from your text.'
    },
    {
      icon: <FaCode />,
      title: 'Developer Friendly',
      desc: 'Modern React architecture.'
    }
  ];

  const benefits = [
    'Improve productivity',
    'Save editing time',
    'Professional writing workflow',
    'Beautiful user experience',
    'Cross-device compatibility',
    'Future AI capabilities'
  ];

  const timeline = [
    {
      year: '2025',
      title: 'TextUtils Started'
    },
    {
      year: '2026',
      title: 'TextPro AI Launch'
    },
    {
      year: 'Future',
      title: 'AI Writing Suite'
    }
  ];

  return (
    <div className="container py-5">

      <section className="text-center mb-5">

        <span
          style={{
            color: '#3B82F6',
            fontWeight: 700,
            letterSpacing: '1px'
          }}
        >
          ABOUT TEXTPRO AI
        </span>

        <h1
          className="mt-3"
          style={{
            fontSize: 'clamp(2.5rem,6vw,4.5rem)',
            fontWeight: 900,
            color: textColor
          }}
        >
          Modern Text Workspace
          <br />

          <span className="gradient-text">
            Built For Productivity
          </span>
        </h1>

        <p
          className="mx-auto mt-4"
          style={{
            maxWidth: '800px',
            color: subColor,
            fontSize: '1.1rem'
          }}
        >
          TextPro AI transforms ordinary text tools
          into a premium productivity platform with
          modern design, analytics and future-ready
          AI experiences.
        </p>

      </section>

      <section
        className="p-4 p-lg-5 mb-5"
        style={{
          borderRadius: '32px',
          background:
            'linear-gradient(135deg,#3B82F6,#8B5CF6)',
          color: '#fff'
        }}
      >
        <div className="row align-items-center">

          <div className="col-lg-8">

            <h2 className="fw-bold">
              Our Mission
            </h2>

            <p
              className="mb-0 mt-3"
              style={{
                fontSize: '1.1rem',
                opacity: 0.95
              }}
            >
              To create the most elegant and useful
              text workspace for developers, students,
              creators and professionals.
            </p>

          </div>

          <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">

            <FaRocket size={80} />

          </div>

        </div>

      </section>

      <section className="mb-5">

        <h2
          className="mb-4"
          style={{
            color: textColor
          }}
        >
          Features
        </h2>

        <div className="row g-4">

          {features.map((feature) => (
            <div
              className="col-md-6 col-lg-3"
              key={feature.title}
            >
              <motion.div
                whileHover={{
                  y: -10
                }}
                style={{
                  background: cardBg,
                  borderRadius: '24px',
                  padding: '28px',
                  height: '100%',
                  backdropFilter: 'blur(20px)',
                  border:
                    mode === 'dark'
                      ? '1px solid rgba(255,255,255,0.08)'
                      : '1px solid rgba(15,23,42,0.08)'
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    background:
                      'linear-gradient(135deg,#3B82F6,#8B5CF6)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    marginBottom: 18
                  }}
                >
                  {feature.icon}
                </div>

                <h5
                  style={{
                    color: textColor
                  }}
                >
                  {feature.title}
                </h5>

                <p
                  style={{
                    color: subColor
                  }}
                >
                  {feature.desc}
                </p>

              </motion.div>
            </div>
          ))}

        </div>

      </section>

      <section className="mb-5">

        <div className="row g-4">

          <div className="col-lg-6">

            <div
              style={{
                background: cardBg,
                borderRadius: '24px',
                padding: '32px',
                height: '100%'
              }}
            >
              <h3
                style={{
                  color: textColor
                }}
              >
                Benefits
              </h3>

              <div className="mt-4">

                {benefits.map((item) => (
                  <div
                    key={item}
                    className="d-flex align-items-center mb-3"
                  >
                    <FaCheckCircle
                      color="#22C55E"
                      className="me-3"
                    />

                    <span
                      style={{
                        color: subColor
                      }}
                    >
                      {item}
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </div>

          <div className="col-lg-6">

            <div
              style={{
                background: cardBg,
                borderRadius: '24px',
                padding: '32px',
                height: '100%'
              }}
            >
              <h3
                style={{
                  color: textColor
                }}
              >
                Platform Stats
              </h3>

              <div className="row g-4 mt-2">

                <div className="col-6">
                  <h2
                    style={{
                      color: '#3B82F6'
                    }}
                  >
                    15+
                  </h2>
                  <p style={{ color: subColor }}>
                    Text Tools
                  </p>
                </div>

                <div className="col-6">
                  <h2
                    style={{
                      color: '#8B5CF6'
                    }}
                  >
                    100%
                  </h2>
                  <p style={{ color: subColor }}>
                    Responsive
                  </p>
                </div>

                <div className="col-6">
                  <h2
                    style={{
                      color: '#3B82F6'
                    }}
                  >
                    AI
                  </h2>
                  <p style={{ color: subColor }}>
                    Ready
                  </p>
                </div>

                <div className="col-6">
                  <h2
                    style={{
                      color: '#8B5CF6'
                    }}
                  >
                    React 18
                  </h2>
                  <p style={{ color: subColor }}>
                    Powered
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <section>

        <h2
          className="mb-4"
          style={{
            color: textColor
          }}
        >
          Journey
        </h2>

        <div className="row g-4">

          {timeline.map((item) => (
            <div
              className="col-md-4"
              key={item.year}
            >
              <motion.div
                whileHover={{
                  y: -8
                }}
                style={{
                  background: cardBg,
                  borderRadius: '24px',
                  padding: '28px',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    color: '#3B82F6',
                    fontWeight: 800,
                    fontSize: '1.2rem'
                  }}
                >
                  {item.year}
                </div>

                <h5
                  className="mt-3"
                  style={{
                    color: textColor
                  }}
                >
                  {item.title}
                </h5>

                <FaArrowRight
                  className="mt-3"
                  color="#8B5CF6"
                />

              </motion.div>
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}