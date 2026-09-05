import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiZap,
  FiShield,
  FiCode,
  FiCommand,
  FiGithub,
  FiLinkedin,
  FiArrowRight
} from 'react-icons/fi';
import BrandLogo from './BrandLogo';

export default function About() {
  const corePillars = [
    {
      icon: <FiZap size={22} className="text-primary" />,
      title: 'Zero Latency Performance',
      desc: 'All text transformations, formatting calculations, and telemetry occur locally in milliseconds without blocking the UI thread.'
    },
    {
      icon: <FiShield size={22} className="text-success" />,
      title: '100% Client-Side Privacy',
      desc: 'Your documents, sensitive tokens, JSON payloads, and private notes never leave your browser. Zero tracking, zero telemetry logging.'
    },
    {
      icon: <FiCode size={22} className="text-info" />,
      title: 'Developer First Utilities',
      desc: 'Built with essential engineering tools including JSON formatting, Base64 encoding, URL conversion, slugification, and casing converters.'
    },
    {
      icon: <FiCommand size={22} className="text-warning" />,
      title: 'Keyboard-Driven Velocity',
      desc: 'Navigate and execute any transformation with command palette shortcuts, undo/redo stacks, and quick find-and-replace controls.'
    }
  ];

  const shortcuts = [
    { key: 'Ctrl / ⌘ + K', action: 'Open Global Command Palette' },
    { key: 'Ctrl / ⌘ + F', action: 'Toggle Find & Replace Bar' },
    { key: 'Ctrl / ⌘ + Z', action: 'Undo Last Action' },
    { key: 'Ctrl / ⌘ + Y', action: 'Redo Last Action' },
    { key: 'Ctrl / ⌘ + Shift + Z', action: 'Redo (Alternative shortcut)' },
    { key: 'Ctrl / ⌘ + S', action: 'Save Current Draft to Snippets' },
    { key: 'Escape', action: 'Close Active Bar / Palette' }
  ];

  return (
    <div className="container py-5">
      {/* Hero Intro */}
      <div className="text-center mb-5 pb-3">
        <BrandLogo size={48} showWordmark={false} className="mb-3" />
        <h1 className="display-5 fw-bold mb-3">About Textora Studio</h1>
        <p className="text-secondary mx-auto lead" style={{ maxWidth: '720px' }}>
          Textora is a precision text workspace and developer productivity studio designed for engineers,
          technical writers, and creators who demand speed, craftsmanship, and uncompromising privacy.
        </p>
        <div className="d-flex justify-content-center gap-2 mt-4">
          <Link to="/" className="btn-textora btn-textora-primary px-4 py-2">
            <span>Launch Workspace</span>
            <FiArrowRight size={15} />
          </Link>
          <a
            href="https://github.com/amandubey923/textUtils"
            target="_blank"
            rel="noreferrer"
            className="btn-textora btn-textora-secondary px-3 py-2"
          >
            <FiGithub size={15} />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="row g-4 mb-5">
        {corePillars.map((p) => (
          <div className="col-md-6 col-12" key={p.title}>
            <div className="textora-card h-100 p-4">
              <div
                className="d-inline-flex p-3 rounded-3 mb-3"
                style={{ background: 'var(--bg-surface)' }}
              >
                {p.icon}
              </div>
              <h5 className="fw-bold mb-2">{p.title}</h5>
              <p className="text-secondary m-0" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Keyboard Shortcuts Cheatsheet */}
      <div className="textora-card p-4 mb-5">
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <div>
            <h5 className="fw-bold m-0 d-flex align-items-center gap-2">
              <FiCommand className="text-primary" />
              <span>Keyboard Shortcuts Cheatsheet</span>
            </h5>
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>
              Operate at the speed of thought without leaving your keyboard
            </span>
          </div>
          <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-3 py-2">
            Active in Workspace
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-borderless m-0 align-middle">
            <tbody>
              {shortcuts.map((s) => (
                <tr
                  key={s.key}
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                >
                  <td style={{ width: '260px', padding: '12px 8px' }}>
                    <span className="kbd-shortcut" style={{ fontSize: '0.82rem', padding: '4px 8px' }}>
                      {s.key}
                    </span>
                  </td>
                  <td className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    {s.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Creator & Privacy Banner */}
      <div
        className="p-4 p-md-5 rounded-4 text-center position-relative overflow-hidden mb-5"
        style={{
          background: 'var(--accent-gradient)',
          color: '#FFFFFF'
        }}
      >
        <h3 className="fw-bold mb-2">Designed & Engineered by Aman Dubey</h3>
        <p className="opacity-90 mx-auto mb-4" style={{ maxWidth: '580px' }}>
          Open-source software crafted with modern React, pure text algorithms, and high-performance design principles.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <a
            href="https://github.com/amandubey923"
            target="_blank"
            rel="noreferrer"
            className="btn btn-light fw-semibold d-inline-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-sm text-dark"
          >
            <FiGithub size={16} />
            <span>GitHub Profile</span>
          </a>

          <a
            href="https://www.linkedin.com/in/aman-kr-dubey"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-light fw-semibold d-inline-flex align-items-center gap-2 px-3 py-2 rounded-3"
          >
            <FiLinkedin size={16} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}
