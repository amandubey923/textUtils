import React, { useState, useEffect } from 'react';
import { FiSearch, FiRepeat, FiX, FiCheck } from 'react-icons/fi';

export default function FindReplaceBar({
  text,
  onReplaceAll,
  onReplaceNext,
  onClose,
  showAlert
}) {
  const [findStr, setFindStr] = useState('');
  const [replaceStr, setReplaceStr] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [matchCount, setMatchCount] = useState(0);

  useEffect(() => {
    if (!findStr) {
      setMatchCount(0);
      return;
    }

    try {
      let flags = caseSensitive ? 'g' : 'gi';
      let pattern = findStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (wholeWord) {
        pattern = `\\b${pattern}\\b`;
      }
      const regex = new RegExp(pattern, flags);
      const matches = text.match(regex);
      setMatchCount(matches ? matches.length : 0);
    } catch (e) {
      setMatchCount(0);
    }
  }, [text, findStr, caseSensitive, wholeWord]);

  const handleExecuteReplaceAll = () => {
    if (!findStr) {
      showAlert('Enter text to find', 'danger');
      return;
    }

    try {
      let flags = caseSensitive ? 'g' : 'gi';
      let pattern = findStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (wholeWord) {
        pattern = `\\b${pattern}\\b`;
      }
      const regex = new RegExp(pattern, flags);
      const count = (text.match(regex) || []).length;
      if (count === 0) {
        showAlert('No occurrences found', 'info');
        return;
      }
      const newText = text.replace(regex, replaceStr);
      onReplaceAll(newText, `Replaced ${count} occurrence${count > 1 ? 's' : ''}`);
    } catch (e) {
      showAlert('Invalid replacement pattern', 'danger');
    }
  };

  const handleExecuteReplaceNext = () => {
    if (!findStr) {
      showAlert('Enter text to find', 'danger');
      return;
    }

    try {
      let flags = caseSensitive ? '' : 'i';
      let pattern = findStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (wholeWord) {
        pattern = `\\b${pattern}\\b`;
      }
      const regex = new RegExp(pattern, flags);
      if (!regex.test(text)) {
        showAlert('No match found', 'info');
        return;
      }
      const newText = text.replace(regex, replaceStr);
      onReplaceNext(newText, 'Match replaced');
    } catch (e) {
      showAlert('Invalid replacement pattern', 'danger');
    }
  };

  return (
    <div className="find-replace-bar animate__animated animate__fadeIn">
      <div className="d-flex align-items-center gap-2 flex-grow-1 flex-wrap">
        {/* Find Input */}
        <div className="d-flex align-items-center gap-2">
          <FiSearch className="text-secondary" size={15} />
          <input
            type="text"
            className="find-input"
            placeholder="Find in text..."
            value={findStr}
            onChange={(e) => setFindStr(e.target.value)}
            autoFocus
          />
        </div>

        {/* Replace Input */}
        <div className="d-flex align-items-center gap-2">
          <FiRepeat className="text-secondary" size={15} />
          <input
            type="text"
            className="find-input"
            placeholder="Replace with..."
            value={replaceStr}
            onChange={(e) => setReplaceStr(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleExecuteReplaceAll();
            }}
          />
        </div>

        {/* Match Count Pill */}
        {findStr && (
          <span className="status-pill">
            <span className="status-pill-val">{matchCount}</span>
            <span>{matchCount === 1 ? 'match' : 'matches'}</span>
          </span>
        )}

        {/* Options */}
        <div className="d-flex align-items-center gap-3 ms-2">
          <label className="d-flex align-items-center gap-1 text-secondary" style={{ fontSize: '0.78rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="form-check-input m-0"
              style={{ width: '13px', height: '13px' }}
            />
            <span>Match Case (Aa)</span>
          </label>

          <label className="d-flex align-items-center gap-1 text-secondary" style={{ fontSize: '0.78rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={wholeWord}
              onChange={(e) => setWholeWord(e.target.checked)}
              className="form-check-input m-0"
              style={{ width: '13px', height: '13px' }}
            />
            <span>Whole Word (\b)</span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
        <button
          onClick={handleExecuteReplaceNext}
          disabled={!findStr || matchCount === 0}
          className="btn-textora btn-textora-secondary py-1 px-2"
          style={{ fontSize: '0.8rem' }}
        >
          Replace
        </button>

        <button
          onClick={handleExecuteReplaceAll}
          disabled={!findStr || matchCount === 0}
          className="btn-textora btn-textora-primary py-1 px-3"
          style={{ fontSize: '0.8rem' }}
        >
          <FiCheck size={13} />
          <span>Replace All</span>
        </button>

        <button
          onClick={onClose}
          className="btn-textora btn-textora-ghost p-1 ms-1"
          title="Close Find & Replace (Esc)"
        >
          <FiX size={16} />
        </button>
      </div>
    </div>
  );
}

