import React, { useState, useEffect } from 'react';
import {
  FiBookmark,
  FiX,
  FiPlus,
  FiCopy,
  FiTrash2,
  FiArrowRight,
  FiClock
} from 'react-icons/fi';
import { getStoredSnippets, saveSnippet, deleteSnippet } from '../utils/storage';

export default function SnippetsModal({
  isOpen,
  onClose,
  currentText,
  onLoadSnippet,
  showAlert
}) {
  const [snippets, setSnippets] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  const refreshSnippets = () => {
    setSnippets(getStoredSnippets());
  };

  useEffect(() => {
    if (isOpen) {
      refreshSnippets();
      setNewTitle('');
      setFilterQuery('');
    }
  }, [isOpen]);

  const handleSaveCurrent = (e) => {
    e.preventDefault();
    if (!currentText || !currentText.trim()) {
      showAlert('Current workspace is empty. Type some text first.', 'danger');
      return;
    }

    const title = newTitle.trim() || `Draft - ${new Date().toLocaleDateString()}`;
    const saved = saveSnippet(title, currentText);
    if (saved) {
      showAlert(`Snippet "${saved.title}" saved`, 'success');
      setNewTitle('');
      refreshSnippets();
    } else {
      showAlert('Failed to save snippet', 'danger');
    }
  };

  const handleDelete = (id, title) => {
    deleteSnippet(id);
    refreshSnippets();
    showAlert(`Deleted "${title}"`, 'info');
  };

  const handleCopySnippet = (content) => {
    navigator.clipboard.writeText(content);
    showAlert('Snippet copied to clipboard', 'success');
  };

  const filtered = snippets.filter((s) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q);
  });

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="command-palette-container"
        style={{ maxWidth: '640px' }}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary-subtle">
          <div className="d-flex align-items-center gap-2">
            <FiBookmark className="text-primary" size={20} />
            <h5 className="m-0 fw-bold">Saved Snippets & Notes</h5>
          </div>
          <button
            onClick={onClose}
            className="btn-textora btn-textora-ghost p-1"
            title="Close"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Save Current Draft Form */}
        <form onSubmit={handleSaveCurrent} className="p-3 border-bottom border-secondary-subtle">
          <label className="text-secondary mb-1" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
            Save Current Editor Text as Snippet
          </label>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="find-input flex-grow-1"
              placeholder="Snippet title (optional)..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button
              type="submit"
              disabled={!currentText || !currentText.trim()}
              className="btn-textora btn-textora-primary"
            >
              <FiPlus size={15} />
              <span>Save Snippet</span>
            </button>
          </div>
        </form>

        {/* Filter Input */}
        {snippets.length > 0 && (
          <div className="px-3 pt-2">
            <input
              type="text"
              className="find-input w-100"
              placeholder="Search saved snippets..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
          </div>
        )}

        {/* Snippets List */}
        <div className="p-3" style={{ maxHeight: '380px', overflowY: 'auto' }}>
          {snippets.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <FiBookmark size={36} className="mb-2 opacity-50" />
              <p className="mb-1 fw-semibold">No saved snippets yet</p>
              <span style={{ fontSize: '0.8rem' }}>
                Save frequent templates, code blocks, or drafts here for instant retrieval.
              </span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-4 text-muted" style={{ fontSize: '0.85rem' }}>
              No snippets matched "{filterQuery}".
            </div>
          ) : (
            <div className="d-flex flex-column gap-2">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-3"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="fw-bold text-primary" style={{ fontSize: '0.95rem' }}>
                      {item.title}
                    </span>
                    <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '0.75rem' }}>
                      <FiClock size={12} />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <p
                    className="text-secondary mb-3 font-monospace"
                    style={{
                      fontSize: '0.8rem',
                      maxHeight: '52px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {item.content}
                  </p>

                  <div className="d-flex align-items-center justify-content-end gap-2">
                    <button
                      onClick={() => handleCopySnippet(item.content)}
                      className="btn-textora btn-textora-secondary py-1 px-2"
                      style={{ fontSize: '0.78rem' }}
                      title="Copy Snippet"
                    >
                      <FiCopy size={13} />
                      <span>Copy</span>
                    </button>

                    <button
                      onClick={() => {
                        onLoadSnippet(item.content);
                        onClose();
                        showAlert(`Loaded "${item.title}" into workspace`, 'success');
                      }}
                      className="btn-textora btn-textora-primary py-1 px-2"
                      style={{ fontSize: '0.78rem' }}
                      title="Load into Editor"
                    >
                      <FiArrowRight size={13} />
                      <span>Load</span>
                    </button>

                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="btn-textora btn-textora-ghost py-1 px-2 text-danger"
                      style={{ fontSize: '0.78rem' }}
                      title="Delete Snippet"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

