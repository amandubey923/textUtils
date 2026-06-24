import React from 'react';
import { motion } from 'framer-motion';
import {
  FaBolt,
  FaRocket,
  FaMagic,
  FaArrowRight,
  FaCheckCircle,
  FaGithub,
  FaLinkedin,
  FaChevronDown
} from 'react-icons/fa';

export default function Hero({ mode }) {
  const features = [
    {
      icon: <FaBolt size={30} />,
      title: 'Lightning Fast',
      text: 'Instant text processing with modern performance.'
    },
    {
      icon: <FaMagic size={30} />,
      title: 'Smart Utilities',
      text: 'Clean, optimize and transform content effortlessly.'
    },
    {
      icon: <FaRocket size={30} />,
      title: 'Built For Productivity',
      text: 'A premium workspace for students and developers.'
    }
  ];

  const scrollToEditor = () => {
    const editor = document.getElementById('text-editor-section');

    if (editor) {
      editor.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section
      className="position-relative overflow-hidden"
      style={{
        minHeight: '100vh',
        paddingTop: '120px',
        paddingBottom: '100px'
      }}
    >
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 12
        }}
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle,#3B82F655 0%,transparent 70%)',
          top: '-120px',
          left: '-120px',
          filter: 'blur(20px)'
        }}
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 15
        }}
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle,#8B5CF655 0%,transparent 70%)',
          bottom: '-150px',
          right: '-100px',
          filter: 'blur(30px)'
        }}
      />

      <div className="container position-relative">

        <motion.div
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8
          }}
          className="text-center"
        >
          <motion.div
            animate={{
              y: [0, -8, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3
            }}
            className="d-inline-flex align-items-center gap-2 mb-4"
            style={{
              padding: '12px 22px',
              borderRadius: '999px',
              background: 'rgba(59,130,246,0.12)',
              border: '1px solid rgba(59,130,246,0.25)',
              color: '#3B82F6',
              fontWeight: '600',
              backdropFilter: 'blur(15px)'
            }}
          >
            <FaRocket />
            AI Powered Text Workspace
          </motion.div>

          <h1
            style={{
              fontSize: 'clamp(3rem,7vw,5.8rem)',
              fontWeight: '800',
              lineHeight: '1.05',
              color:
                mode === 'dark'
                  ? '#F8FAFC'
                  : '#0F172A'
            }}
          >
            Write Better
            <br />

            <span
              style={{
                background:
                  'linear-gradient(135deg,#3B82F6,#8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Think Faster
            </span>
          </h1>

          <p
            className="mx-auto mt-4"
            style={{
              maxWidth: '760px',
              fontSize: '1.15rem',
              color:
                mode === 'dark'
                  ? '#CBD5E1'
                  : '#475569'
            }}
          >
            Premium AI-inspired text workspace with powerful
            formatting, analytics, productivity tools and
            modern SaaS experience designed for developers,
            students, writers and creators.
          </p>

          <div className="d-flex justify-content-center flex-wrap gap-3 mt-5">

            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={scrollToEditor}
              className="btn"
              style={{
                background:
                  'linear-gradient(135deg,#3B82F6,#8B5CF6)',
                color: '#fff',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '14px',
                fontWeight: '700',
                boxShadow:
                  '0 20px 40px rgba(59,130,246,0.25)'
              }}
            >
              Start Writing
              <FaArrowRight className="ms-2" />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="btn"
              style={{
                padding: '14px 28px',
                borderRadius: '14px',
                fontWeight: '700',
                border:
                  mode === 'dark'
                    ? '1px solid rgba(255,255,255,0.12)'
                    : '1px solid rgba(15,23,42,0.12)',
                color:
                  mode === 'dark'
                    ? '#F8FAFC'
                    : '#0F172A',
                backdropFilter: 'blur(20px)'
              }}
            >
              Explore Features
            </motion.button>

          </div>

          <div className="d-flex justify-content-center flex-wrap gap-4 mt-5">

            <div className="d-flex align-items-center gap-2">
              <FaCheckCircle color="#22C55E" />
              <span>Free Forever</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <FaCheckCircle color="#22C55E" />
              <span>No Login Required</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <FaCheckCircle color="#22C55E" />
              <span>Instant Processing</span>
            </div>

          </div>

          <div className="d-flex justify-content-center gap-4 mt-4">

            <a
              href="https://github.com/amandubey923/textUtils"
              target="_blank"
              rel="noreferrer"
              style={{
                color:
                  mode === 'dark'
                    ? '#CBD5E1'
                    : '#475569'
              }}
            >
              <FaGithub size={24} />
            </a>

            <a
              href="https://www.linkedin.com/in/aman-kr-dubey"
              target="_blank"
              rel="noreferrer"
              style={{
                color:
                  mode === 'dark'
                    ? '#CBD5E1'
                    : '#475569'
              }}
            >
              <FaLinkedin size={24} />
            </a>

          </div>

        </motion.div>

        <div className="row mt-5 g-4">

          {features.map((item, index) => (
            <div
              className="col-lg-4"
              key={index}
            >
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.03
                }}
                style={{
                  borderRadius: '24px',
                  padding: '30px',
                  height: '100%',
                  background:
                    mode === 'dark'
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(255,255,255,0.8)',
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
                    color: '#3B82F6',
                    marginBottom: '18px'
                  }}
                >
                  {item.icon}
                </div>

                <h4
                  style={{
                    color:
                      mode === 'dark'
                        ? '#F8FAFC'
                        : '#0F172A'
                  }}
                >
                  {item.title}
                </h4>

                <p
                  className="mb-0"
                  style={{
                    color:
                      mode === 'dark'
                        ? '#CBD5E1'
                        : '#64748B'
                  }}
                >
                  {item.text}
                </p>
              </motion.div>
            </div>
          ))}

        </div>

        <motion.div
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 2
          }}
          className="text-center mt-5"
        >
          <button
            onClick={scrollToEditor}
            style={{
              border: 'none',
              background: 'transparent',
              color:
                mode === 'dark'
                  ? '#CBD5E1'
                  : '#475569'
            }}
          >
            <FaChevronDown size={24} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}