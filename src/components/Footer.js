import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaBolt,
  FaRobot,
  FaFileAlt,
  FaHeart,
  FaArrowRight
} from 'react-icons/fa';

export default function Footer({ mode }) {
  const textColor =
    mode === 'dark' ? '#F8FAFC' : '#0F172A';

  const subColor =
    mode === 'dark' ? '#94A3B8' : '#64748B';

  return (
    <footer
      style={{
        marginTop: '100px',
        background:
          mode === 'dark'
            ? '#0B1120'
            : '#ffffff',
        borderTop:
          mode === 'dark'
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(15,23,42,0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle,#3B82F620 0%,transparent 70%)',
          top: '-120px',
          right: '-120px'
        }}
      />

      <div className="container py-5">

        <div className="row g-5">

          <div className="col-lg-4">

            <h2 className="gradient-text fw-bold">
              TextPro AI
            </h2>

            <p
              className="mt-3"
              style={{
                color: subColor,
                lineHeight: '1.8'
              }}
            >
              Premium AI-inspired text workspace
              built for developers, students,
              creators and professionals.
            </p>

            <div className="d-flex gap-3 mt-4">

              <motion.a
                whileHover={{
                  y: -5,
                  scale: 1.1
                }}
                href="https://github.com/amandubey923/textUtils"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'linear-gradient(135deg,#3B82F6,#8B5CF6)',
                  color: '#fff'
                }}
              >
                <FaGithub />
              </motion.a>

              <motion.a
                whileHover={{
                  y: -5,
                  scale: 1.1
                }}
                href="https://www.linkedin.com/in/aman-kr-dubey"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'linear-gradient(135deg,#3B82F6,#8B5CF6)',
                  color: '#fff'
                }}
              >
                <FaLinkedin />
              </motion.a>

            </div>

          </div>

          <div className="col-lg-2">

            <h5
              style={{
                color: textColor,
                marginBottom: 20
              }}
            >
              Quick Links
            </h5>

            <div className="d-flex flex-column gap-3">

              <Link
                to="/"
                style={{
                  color: subColor
                }}
              >
                Home
              </Link>

              <Link
                to="/about"
                style={{
                  color: subColor
                }}
              >
                About
              </Link>

            </div>

          </div>

          <div className="col-lg-3">

            <h5
              style={{
                color: textColor,
                marginBottom: 20
              }}
            >
              Features
            </h5>

            <div
              className="d-flex flex-column gap-3"
              style={{
                color: subColor
              }}
            >

              <span>
                <FaBolt className="me-2" />
                Text Utilities
              </span>

              <span>
                <FaRobot className="me-2" />
                AI Workspace
              </span>

              <span>
                <FaFileAlt className="me-2" />
                Export Tools
              </span>

            </div>

          </div>

          <div className="col-lg-3">

            <h5
              style={{
                color: textColor,
                marginBottom: 20
              }}
            >
              Resources
            </h5>

            <div
              className="d-flex flex-column gap-3"
              style={{
                color: subColor
              }}
            >

              <span>
                Documentation
              </span>

              <span>
                Roadmap
              </span>

              <span>
                Changelog
              </span>

            </div>

            <div
              className="mt-4 p-3"
              style={{
                borderRadius: 18,
                background:
                  mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(15,23,42,0.04)'
              }}
            >
              <div
                className="d-flex align-items-center gap-2"
                style={{
                  color: textColor,
                  fontWeight: 600
                }}
              >
                <FaEnvelope />
                Contact
              </div>

              <div
                className="mt-2"
                style={{
                  color: subColor,
                  fontSize: '.95rem'
                }}
              >
                kumaraman19137@gmail.com
              </div>
            </div>

          </div>

        </div>

        <hr
          style={{
            marginTop: 50,
            marginBottom: 30,
            opacity: 0.15
          }}
        />

        <div className="row align-items-center">

          <div className="col-md-6">
            <p
              className="mb-0"
              style={{
                color: subColor
              }}
            >
              © 2026 TextPro AI. All Rights Reserved.
            </p>
          </div>

          <div className="col-md-6 text-md-end mt-3 mt-md-0">

            <span
              style={{
                color: subColor
              }}
            >
              Built with
              <FaHeart
                style={{
                  color: '#EF4444',
                  marginLeft: 8,
                  marginRight: 8
                }}
              />
              React
              <FaArrowRight
                style={{
                  marginLeft: 10
                }}
              />
            </span>

          </div>

        </div>

      </div>
    </footer>
  );
}