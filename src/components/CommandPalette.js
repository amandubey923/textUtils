import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX, FiCheck } from 'react-icons/fi';

export default function CommandPalette({ isOpen, onClose, commands }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.label.toLowerCase().includes(q) ||
      (cmd.category && cmd.category.toLowerCase().includes(q)) ||
      (cmd.keywords && cmd.keywords.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : Math.max(0, filteredCommands.length - 1)
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="command-palette-container" role="dialog" aria-modal="true">
        {/* Search Header */}
        <div className="command-input-wrapper">
          <FiSearch size={18} className="text-secondary" />
          <input
            ref={inputRef}
            type="text"
            className="command-input"
            placeholder="Type a command or search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={onClose}
            className="btn-textora btn-textora-ghost p-1"
            title="Close (Esc)"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Command List */}
        <div className="command-list" ref={listRef}>
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-muted" style={{ fontSize: '0.9rem' }}>
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => (
              <div
                key={cmd.id || cmd.label}
                className={`command-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={() => {
                  cmd.action();
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="d-flex align-items-center gap-3">
                  <span
                    style={{
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      color: idx === selectedIndex ? 'var(--accent-primary)' : 'var(--text-secondary)'
                    }}
                  >
                    {cmd.icon || <FiCheck />}
                  </span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{cmd.label}</div>
                    {cmd.desc && (
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {cmd.desc}
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  {cmd.category && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: 'var(--bg-surface)',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {cmd.category}
                    </span>
                  )}
                  {cmd.shortcut && (
                    <span className="kbd-shortcut">{cmd.shortcut}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div
          className="p-2 px-3 border-top border-secondary-subtle d-flex align-items-center justify-content-between text-muted"
          style={{ fontSize: '0.75rem' }}
        >
          <div>Use ↑ ↓ to navigate, Enter to select</div>
          <div>ESC to exit</div>
        </div>
      </div>
    </div>
  );
}

