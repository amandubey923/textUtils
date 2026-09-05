import React, { useState, useEffect, useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import {
  FiFileText,
  FiUpload,
  FiCopy,
  FiEye,
  FiCode,
  FiSliders,
  FiSave
} from 'react-icons/fi';

import ToolBar from './ToolBar';
import AnalyticsCards from './AnalyticsCards';
import TextInsights from './TextInsights';
import FindReplaceBar from './FindReplaceBar';
import { getStoredDraft, saveDraft } from '../utils/storage';
import {
  toUppercase,
  toLowercase,
  toTitleCase,
  toSentenceCase,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toInvertCase,
  slugify,
  removeExtraSpaces,
  trimLines,
  removeEmptyLines,
  removeDuplicateLines,
  sortLinesAZ,
  sortLinesZA,
  reverseLines,
  reverseEntireText,
  addLineNumbers,
  stripLineNumbers,
  formatJSON,
  minifyJSON,
  urlEncode,
  urlDecode,
  base64Encode,
  base64Decode,
  htmlEntityEncode,
  htmlEntityDecode,
  calculateStatistics
} from '../utils/textOperations';

export default function TextForm({ showAlert, onOpenSnippets, onOpenCommandPalette }) {
  // Main Text & History Stack
  const [text, setText] = useState(() => getStoredDraft());
  const [history, setHistory] = useState(() => [getStoredDraft()]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Editor View Controls
  const [isMono, setIsMono] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isFindReplaceOpen, setIsFindReplaceOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Speech Controls
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-save draft on change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft(text);
    }, 400);
    return () => clearTimeout(timer);
  }, [text]);

  // Push new state into undo/redo history
  const pushHistory = useCallback((newText) => {
    setHistory((prev) => {
      const sliced = prev.slice(0, historyIndex + 1);
      if (sliced[sliced.length - 1] === newText) return prev;
      const updated = [...sliced, newText].slice(-40); // keep up to 40 states
      setHistoryIndex(updated.length - 1);
      return updated;
    });
  }, [historyIndex]);

  // Text updater helper
  const applyTransformation = (newText, message) => {
    if (newText === text) {
      if (message) showAlert('Text is already in this format', 'info');
      return;
    }
    setText(newText);
    pushHistory(newText);
    if (message) showAlert(message, 'success');
  };

  // Undo / Redo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setText(history[prevIndex]);
      showAlert('Undo applied', 'info');
    }
  }, [history, historyIndex, showAlert]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setText(history[nextIndex]);
      showAlert('Redo applied', 'info');
    }
  }, [history, historyIndex, showAlert]);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        document.activeElement &&
        document.activeElement.tagName === 'INPUT' &&
        document.activeElement.type === 'text'
      ) {
        if (e.key === 'Escape') {
          setIsFindReplaceOpen(false);
        }
        return;
      }

      const isMeta = e.metaKey || e.ctrlKey;

      if (isMeta && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if (isMeta && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (isMeta && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setIsFindReplaceOpen((prev) => !prev);
      } else if (isMeta && e.key.toLowerCase() === 's') {
        e.preventDefault();
        onOpenSnippets();
      } else if (e.key === 'Escape') {
        if (isFindReplaceOpen) {
          setIsFindReplaceOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, isFindReplaceOpen, onOpenSnippets]);

  // Copy to clipboard
  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    showAlert('Copied text to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  // Clear workspace
  const handleClear = () => {
    if (!text) return;
    applyTransformation('', 'Workspace cleared');
  };

  // File Upload Handling
  const handleFileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      applyTransformation(content, `Imported file "${file.name}"`);
    };
    reader.onerror = () => {
      showAlert('Failed to read file', 'danger');
    };
    reader.readAsText(file);
  };

  // Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Speech Synthesis
  const handleSpeak = () => {
    if (!window.speechSynthesis) {
      showAlert('Speech synthesis is not supported on this browser', 'danger');
      return;
    }
    if (!text.trim()) {
      showAlert('Enter some text to listen', 'info');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    showAlert('Speaking text...', 'info');
  };

  const handleStopSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      showAlert('Speech playback stopped', 'info');
    }
  };

  // Voice Recognition (Speech to Text)
  const handleStartVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showAlert('Speech recognition is not supported in this browser (use Chrome or Edge)', 'danger');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        showAlert('Listening... Speak into your microphone', 'info');
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((res) => res[0].transcript)
          .join(' ');
        setText((prev) => {
          const updated = prev ? `${prev} ${transcript}` : transcript;
          pushHistory(updated);
          return updated;
        });
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        showAlert(`Speech error: ${event.error || 'recognition failed'}`, 'danger');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      showAlert('Unable to initialize microphone speech', 'danger');
    }
  };

  const handleStopVoice = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      showAlert('Microphone listening stopped', 'info');
    }
  };

  // Document Exports
  const downloadBlob = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showAlert(`Downloaded "${filename}"`, 'success');
  };

  const exportTxt = () => downloadBlob(text, 'textora-document.txt', 'text/plain;charset=utf-8');
  const exportMarkdown = () => downloadBlob(text, 'textora-document.md', 'text/markdown;charset=utf-8');
  const exportHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Textora Document</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #1e293b; }
    pre { background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; overflow-x: auto; white-space: pre-wrap; font-family: monospace; }
  </style>
</head>
<body>
  <pre>${text.replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]))}</pre>
</body>
</html>`;
    downloadBlob(htmlContent, 'textora-document.html', 'text/html;charset=utf-8');
  };

  const exportJSON = () => {
    try {
      const parsed = JSON.parse(text);
      downloadBlob(JSON.stringify(parsed, null, 2), 'textora-data.json', 'application/json');
    } catch (e) {
      const payload = {
        title: 'Textora Document',
        timestamp: new Date().toISOString(),
        content: text
      };
      downloadBlob(JSON.stringify(payload, null, 2), 'textora-data.json', 'application/json');
    }
  };

  // Multi-page wrapped PDF Export
  const exportPDF = () => {
    try {
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 40;
      const maxWidth = pageWidth - margin * 2;
      const lineHeight = 16;
      let cursorY = margin + 20;

      // Header Banner
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(79, 70, 229);
      pdf.text('Textora Document Export', margin, margin);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(148, 163, 184);
      pdf.text(`Generated on ${new Date().toLocaleString()}`, margin, margin + 14);

      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(1);
      pdf.line(margin, margin + 22, pageWidth - margin, margin + 22);

      cursorY = margin + 45;

      // Split text to fit page width
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10.5);
      pdf.setTextColor(30, 41, 59);

      const lines = pdf.splitTextToSize(text || 'Empty Document', maxWidth);

      for (let i = 0; i < lines.length; i++) {
        if (cursorY + lineHeight > pageHeight - margin) {
          pdf.addPage();
          cursorY = margin;
        }
        pdf.text(lines[i], margin, cursorY);
        cursorY += lineHeight;
      }

      pdf.save('textora-document.pdf');
      showAlert('PDF Document Downloaded', 'success');
    } catch (err) {
      showAlert('Failed to generate PDF', 'danger');
    }
  };

  // JSON format/minify wrapper with error catching
  const handleJSONFormat = () => {
    try {
      applyTransformation(formatJSON(text), 'JSON Prettified & Validated');
    } catch (e) {
      showAlert(`Invalid JSON syntax: ${e.message}`, 'danger');
    }
  };

  const handleJSONMinify = () => {
    try {
      applyTransformation(minifyJSON(text), 'JSON Compressed');
    } catch (e) {
      showAlert(`Invalid JSON syntax: ${e.message}`, 'danger');
    }
  };

  const handleURLDecode = () => {
    try {
      applyTransformation(urlDecode(text), 'URL Decoded');
    } catch (e) {
      showAlert(e.message, 'danger');
    }
  };

  const handleBase64Decode = () => {
    try {
      applyTransformation(base64Decode(text), 'Base64 Decoded');
    } catch (e) {
      showAlert(e.message, 'danger');
    }
  };

  // Stats calculation
  const stats = calculateStatistics(text);

  return (
    <section className="container-fluid px-lg-4 px-3 py-4 position-relative">
      {/* Hidden File Picker */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".txt,.md,.json,.csv,.js,.html,.css"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
          }
        }}
      />

      {/* Main Workspace Frame */}
      <div className="workspace-wrapper mb-4">
        {/* Workspace Header Strip */}
        <div className="workspace-header">
          {/* Document indicator */}
          <div className="d-flex align-items-center gap-2">
            <FiFileText className="text-primary" size={17} />
            <span className="fw-bold" style={{ fontSize: '0.95rem' }}>
              Text Document
            </span>
            <span
              className="d-none d-sm-inline-flex align-items-center gap-1 text-muted"
              style={{ fontSize: '0.75rem' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
              Auto-saved
            </span>
          </div>

          {/* Quick Toolbar Controls: Monospace, Preview, Import, Save Snippet */}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsMono((prev) => !prev)}
              className={`btn-textora ${isMono ? 'btn-textora-primary' : 'btn-textora-secondary'} py-1 px-2`}
              title="Toggle Monospace Code Font"
              style={{ fontSize: '0.8rem' }}
            >
              <FiCode size={13} />
              <span className="d-none d-sm-inline">{isMono ? 'Mono' : 'Sans'}</span>
            </button>

            <button
              onClick={() => setShowPreview((prev) => !prev)}
              className={`btn-textora ${showPreview ? 'btn-textora-primary' : 'btn-textora-secondary'} py-1 px-2`}
              title="Toggle Live Side-by-Side Preview"
              style={{ fontSize: '0.8rem' }}
            >
              <FiEye size={13} />
              <span className="d-none d-sm-inline">Preview</span>
            </button>

            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="btn-textora btn-textora-secondary py-1 px-2"
              title="Upload text or code file (.txt, .md, .json)"
              style={{ fontSize: '0.8rem' }}
            >
              <FiUpload size={13} />
              <span className="d-none d-sm-inline">Import</span>
            </button>

            <button
              onClick={onOpenSnippets}
              className="btn-textora btn-textora-secondary py-1 px-2"
              title="Save to Snippets (Ctrl+S)"
              style={{ fontSize: '0.8rem' }}
            >
              <FiSave size={13} />
              <span className="d-none d-sm-inline">Save</span>
            </button>
          </div>
        </div>

        {/* Inline Find & Replace Bar */}
        {isFindReplaceOpen && (
          <FindReplaceBar
            text={text}
            onReplaceAll={(newText, msg) => applyTransformation(newText, msg)}
            onReplaceNext={(newText, msg) => applyTransformation(newText, msg)}
            onClose={() => setIsFindReplaceOpen(false)}
            showAlert={showAlert}
          />
        )}

        {/* Text Area & Optional Preview Split */}
        <div className="row g-0">
          <div className={`${showPreview ? 'col-lg-6 border-end border-secondary-subtle' : 'col-12'}`}>
            <div
              className={`editor-textarea-container ${isDragOver ? 'border border-primary' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  pushHistory(e.target.value);
                }}
                className={`textora-textarea ${isMono ? 'mono-mode' : ''}`}
                placeholder="Type or paste your text here, drag & drop a file, or hit ⌘K for command palette..."
                rows={14}
                spellCheck="true"
              />
            </div>
          </div>

          {showPreview && (
            <div className="col-lg-6">
              <div
                className="p-3 h-100"
                style={{
                  background: 'var(--bg-surface)',
                  maxHeight: '480px',
                  overflowY: 'auto'
                }}
              >
                <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom border-secondary-subtle">
                  <span className="fw-semibold text-muted" style={{ fontSize: '0.8rem' }}>
                    Live Formatted Output Preview
                  </span>
                  <button
                    onClick={handleCopy}
                    disabled={!text}
                    className="btn-textora btn-textora-secondary py-1 px-2"
                    style={{ fontSize: '0.75rem' }}
                  >
                    <FiCopy size={12} />
                    <span>Copy Output</span>
                  </button>
                </div>
                <div
                  style={{
                    fontSize: '0.92rem',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    color: 'var(--text-primary)'
                  }}
                >
                  {text || (
                    <span className="text-muted fst-italic">
                      Preview updates instantly as you transform or edit text.
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Status Strip */}
        <div className="workspace-status-strip">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className="status-pill">
              <span className="status-pill-val">{stats.words}</span>
              <span>words</span>
            </span>

            <span className="status-pill">
              <span className="status-pill-val">{stats.characters}</span>
              <span>chars</span>
            </span>

            <span className="status-pill d-none d-sm-inline-flex">
              <span className="status-pill-val">{stats.lines}</span>
              <span>lines</span>
            </span>

            <span className="status-pill d-none d-md-inline-flex">
              <span>Reading:</span>
              <span className="status-pill-val">{stats.readingTime}m</span>
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <span className="text-muted d-none d-sm-inline" style={{ fontSize: '0.75rem' }}>
              Press <kbd className="kbd-shortcut">Ctrl</kbd> + <kbd className="kbd-shortcut">K</kbd> for commands
            </span>
            <button
              onClick={onOpenCommandPalette}
              className="btn-textora btn-textora-ghost p-1"
              title="Command Palette"
            >
              <FiSliders size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Structured Tool Suites */}
      <div className="mb-4">
        <ToolBar
          onUppercase={() => applyTransformation(toUppercase(text), 'Transformed to UPPERCASE')}
          onLowercase={() => applyTransformation(toLowercase(text), 'Transformed to lowercase')}
          onTitleCase={() => applyTransformation(toTitleCase(text), 'Transformed to Title Case')}
          onSentenceCase={() => applyTransformation(toSentenceCase(text), 'Transformed to Sentence case')}
          onCamelCase={() => applyTransformation(toCamelCase(text), 'Converted to camelCase')}
          onSnakeCase={() => applyTransformation(toSnakeCase(text), 'Converted to snake_case')}
          onKebabCase={() => applyTransformation(toKebabCase(text), 'Converted to kebab-case')}
          onPascalCase={() => applyTransformation(toPascalCase(text), 'Converted to PascalCase')}
          onInvertCase={() => applyTransformation(toInvertCase(text), 'Inverted Character Casing')}
          onRemoveExtraSpaces={() => applyTransformation(removeExtraSpaces(text), 'Removed Extra Whitespace')}
          onTrimLines={() => applyTransformation(trimLines(text), 'Trimmed Line Edges')}
          onRemoveEmptyLines={() => applyTransformation(removeEmptyLines(text), 'Stripped Empty Lines')}
          onRemoveDuplicateLines={() => applyTransformation(removeDuplicateLines(text), 'Removed Duplicate Lines')}
          onSortAZ={() => applyTransformation(sortLinesAZ(text), 'Sorted Lines A → Z')}
          onSortZA={() => applyTransformation(sortLinesZA(text), 'Sorted Lines Z → A')}
          onReverseLines={() => applyTransformation(reverseLines(text), 'Reversed Line Order')}
          onReverseAll={() => applyTransformation(reverseEntireText(text), 'Reversed Entire Character String')}
          onAddLineNumbers={() => applyTransformation(addLineNumbers(text), 'Numbered All Lines')}
          onStripLineNumbers={() => applyTransformation(stripLineNumbers(text), 'Stripped Line Numbers')}
          onSlugify={() => applyTransformation(slugify(text), 'Converted to URL Slug')}
          onFormatJSON={handleJSONFormat}
          onMinifyJSON={handleJSONMinify}
          onUrlEncode={() => applyTransformation(urlEncode(text), 'URL Encoded')}
          onUrlDecode={handleURLDecode}
          onBase64Encode={() => applyTransformation(base64Encode(text), 'Base64 Encoded')}
          onBase64Decode={handleBase64Decode}
          onHtmlEncode={() => applyTransformation(htmlEntityEncode(text), 'HTML Entities Encoded')}
          onHtmlDecode={() => applyTransformation(htmlEntityDecode(text), 'HTML Entities Decoded')}
          onSpeak={handleSpeak}
          onStopSpeech={handleStopSpeech}
          isSpeaking={isSpeaking}
          onStartVoice={handleStartVoice}
          onStopVoice={handleStopVoice}
          isListening={isListening}
          onExportTxt={exportTxt}
          onExportMarkdown={exportMarkdown}
          onExportHTML={exportHTML}
          onExportPDF={exportPDF}
          onExportJSON={exportJSON}
          onCopy={handleCopy}
          copied={copied}
          onClear={handleClear}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onToggleFindReplace={() => setIsFindReplaceOpen((prev) => !prev)}
          isFindReplaceOpen={isFindReplaceOpen}
          hasText={Boolean(text && text.length > 0)}
        />
      </div>

      {/* Live Analytics Dashboard */}
      <div className="mb-4">
        <AnalyticsCards stats={stats} />
      </div>

      {/* Text Insights: Frequency & Keywords */}
      <div className="mb-4">
        <TextInsights text={text} />
      </div>
    </section>
  );
}
