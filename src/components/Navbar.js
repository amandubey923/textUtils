import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiMoon, FiCommand, FiBookmark, FiGrid, FiEdit3, FiInfo } from 'react-icons/fi';
import BrandLogo from './BrandLogo';

export default function Navbar({ mode, toggleMode, onOpenCommandPalette, onOpenSnippets }) {
  const location = useLocation();

  return (
    <nav className="textora-navbar">
      <div className="container-fluid px-lg-4 px-3">
        <div className="d-flex align-items-center justify-content-between">
          {/* Brand Logo */}
          <Link to="/" className="text-decoration-none">
            <BrandLogo size={34} />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="d-none d-md-flex align-items-center gap-1">
            <Link
              to="/"
              className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              <FiEdit3 size={15} />
              <span>Workspace</span>
            </Link>

            <Link
              to="/tools"
              className={`nav-link-item ${location.pathname === '/tools' ? 'active' : ''}`}
            >
              <FiGrid size={15} />
              <span>Tools</span>
            </Link>

            <button
              onClick={onOpenSnippets}
              className="btn-textora-ghost btn-textora py-1 px-2"
              title="Saved Snippets"
            >
              <FiBookmark size={15} />
              <span>Snippets</span>
            </button>

            <Link
              to="/about"
              className={`nav-link-item ${location.pathname === '/about' ? 'active' : ''}`}
            >
              <FiInfo size={15} />
              <span>About</span>
            </Link>
          </div>

          {/* Actions: Command Palette & Theme Toggle */}
          <div className="d-flex align-items-center gap-2">
            {/* Quick Command Palette Button */}
            <button
              onClick={onOpenCommandPalette}
              className="btn-textora btn-textora-secondary py-1 px-2 d-none d-sm-inline-flex"
              title="Open Command Palette (Ctrl+K or ⌘K)"
              style={{ fontSize: '0.8rem' }}
            >
              <FiCommand size={13} />
              <span className="d-none d-md-inline">Commands</span>
              <span className="kbd-shortcut ms-1">⌘K</span>
            </button>

            {/* Snippets Mobile Icon */}
            <button
              onClick={onOpenSnippets}
              className="btn-textora btn-textora-ghost p-2 d-md-none"
              title="Saved Snippets"
              aria-label="Saved Snippets"
            >
              <FiBookmark size={18} />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleMode}
              className="btn-textora btn-textora-secondary p-2"
              title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
              style={{ borderRadius: '10px' }}
            >
              {mode === 'dark' ? (
                <FiSun size={17} style={{ color: '#F59E0B' }} />
              ) : (
                <FiMoon size={17} style={{ color: '#6366F1' }} />
              )}
            </button>

            {/* Mobile Menu Toggler */}
            <button
              className="btn-textora btn-textora-ghost p-2 d-md-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#textoraMobileNav"
              aria-controls="textoraMobileNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className="collapse d-md-none mt-3 pt-2 border-top border-secondary-subtle" id="textoraMobileNav">
          <div className="d-flex flex-column gap-2 pb-2">
            <Link
              to="/"
              className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              <FiEdit3 size={16} />
              <span>Workspace</span>
            </Link>

            <Link
              to="/tools"
              className={`nav-link-item ${location.pathname === '/tools' ? 'active' : ''}`}
            >
              <FiGrid size={16} />
              <span>Tools Directory</span>
            </Link>

            <button
              onClick={() => {
                onOpenSnippets();
                const collapseEl = document.getElementById('textoraMobileNav');
                if (collapseEl && window.bootstrap) {
                  const bsCollapse = window.bootstrap.Collapse.getInstance(collapseEl);
                  if (bsCollapse) bsCollapse.hide();
                }
              }}
              className="nav-link-item text-start bg-transparent border-0"
            >
              <FiBookmark size={16} />
              <span>Saved Snippets</span>
            </button>

            <Link
              to="/about"
              className={`nav-link-item ${location.pathname === '/about' ? 'active' : ''}`}
            >
              <FiInfo size={16} />
              <span>About Textora</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
