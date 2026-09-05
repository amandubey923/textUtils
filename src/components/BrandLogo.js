import React from 'react';

/**
 * Textora Brand Logo & Mark
 * A precision geometric mark representing text manipulation, structured blocks, and velocity.
 */
export default function BrandLogo({ size = 32, showWordmark = true, className = '' }) {
  return (
    <div className={`d-inline-flex align-items-center gap-2 ${className}`} style={{ userSelect: 'none' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="textoraGrad" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="textoraAccent" x1="12" y1="8" x2="28" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.65" />
          </linearGradient>
        </defs>

        {/* Outer Rounded Container with subtle border glow */}
        <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#textoraGrad)" />
        
        {/* Modern Precision T-Hex/Prism Text Glyphs */}
        {/* Top bar of the precision 'T' */}
        <path
          d="M10 13.5C10 12.6716 10.6716 12 11.5 12H28.5C29.3284 12 30 12.6716 30 13.5C30 14.3284 29.3284 15 28.5 15H11.5C10.6716 15 10 14.3284 10 13.5Z"
          fill="url(#textoraAccent)"
        />
        {/* Vertical cursor stem */}
        <path
          d="M18.5 16H21.5C22.3284 16 23 16.6716 23 17.5V27.5C23 28.3284 22.3284 29 21.5 29H18.5C17.6716 29 17 28.3284 17 27.5V17.5C17 16.6716 17.6716 16 18.5 16Z"
          fill="url(#textoraAccent)"
        />
        {/* High-speed command brackets / transformation diamond dot */}
        <circle cx="28" cy="24" r="2" fill="#06B6D4" />
        <rect x="8" y="22" width="4" height="4" rx="1" fill="#FFFFFF" fillOpacity="0.8" />
      </svg>

      {showWordmark && (
        <span className="brand-wordmark">
          <span className="brand-name">Textora</span>
          <span className="brand-badge">STUDIO</span>
        </span>
      )}
    </div>
  );
}

