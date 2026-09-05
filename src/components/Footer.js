import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiHeart, FiShield, FiZap } from 'react-icons/fi';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer
      className="mt-auto py-5 border-top"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border-subtle)'
      }}
    >
      <div className="container-fluid px-lg-4 px-3">
        <div className="row g-4 justify-content-between">
          {/* Brand Col */}
          <div className="col-lg-4 col-12">
            <Link to="/" className="text-decoration-none d-inline-block mb-3">
              <BrandLogo size={32} />
            </Link>
            <p className="text-secondary mb-3" style={{ fontSize: '0.88rem', maxWidth: '340px' }}>
              The precision text workspace and developer productivity studio. Zero server latency, 100% private, and crafted for speed.
            </p>
            <div className="d-flex align-items-center gap-3">
              <a
                href="https://github.com/amandubey923/textUtils"
                target="_blank"
                rel="noreferrer"
                className="btn-textora btn-textora-secondary p-2"
                title="GitHub Repository"
              >
                <FiGithub size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/aman-kr-dubey"
                target="_blank"
                rel="noreferrer"
                className="btn-textora btn-textora-secondary p-2"
                title="LinkedIn Profile"
              >
                <FiLinkedin size={16} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-lg-2 col-sm-4 col-6">
            <h6 className="fw-bold mb-3 text-primary" style={{ fontSize: '0.85rem' }}>
              Product
            </h6>
            <div className="d-flex flex-column gap-2" style={{ fontSize: '0.85rem' }}>
              <Link to="/" className="text-secondary text-decoration-none hover-primary">
                Text Workspace
              </Link>
              <Link to="/tools" className="text-secondary text-decoration-none hover-primary">
                All Tools
              </Link>
              <Link to="/about" className="text-secondary text-decoration-none hover-primary">
                About & Architecture
              </Link>
            </div>
          </div>

          {/* Capabilities */}
          <div className="col-lg-3 col-sm-4 col-6">
            <h6 className="fw-bold mb-3 text-primary" style={{ fontSize: '0.85rem' }}>
              Toolkits
            </h6>
            <div className="d-flex flex-column gap-2 text-secondary" style={{ fontSize: '0.85rem' }}>
              <span>Case Transformations</span>
              <span>Whitespace Cleaners</span>
              <span>Developer Encodings</span>
              <span>Multi-format Document Exports</span>
            </div>
          </div>

          {/* Privacy & Trust */}
          <div className="col-lg-3 col-sm-4 col-12">
            <h6 className="fw-bold mb-3 text-primary" style={{ fontSize: '0.85rem' }}>
              Privacy & Performance
            </h6>
            <div className="d-flex flex-column gap-2 text-secondary" style={{ fontSize: '0.85rem' }}>
              <div className="d-flex align-items-center gap-2">
                <FiShield className="text-success" size={14} />
                <span>100% Client-side execution</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FiZap className="text-warning" size={14} />
                <span>Zero server latency</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between pt-4 mt-4 border-top border-secondary-subtle gap-2 text-muted" style={{ fontSize: '0.8rem' }}>
          <div>
            © {new Date().getFullYear()} Textora Studio. Released under MIT License.
          </div>
          <div className="d-flex align-items-center gap-1">
            <span>Engineered with</span>
            <FiHeart className="text-danger mx-1" size={13} />
            <span>by Aman Dubey</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
