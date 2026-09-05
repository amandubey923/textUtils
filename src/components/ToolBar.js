import React, { useState } from 'react';
import {
  FiType,
  FiAlignLeft,
  FiCode,
  FiVolume2,
  FiSquare,
  FiMic,
  FiMicOff,
  FiDownload,
  FiCopy,
  FiCheck,
  FiTrash2,
  FiRotateCcw,
  FiRotateCw,
  FiSearch,
  FiFileText,
  FiShare2,
  FiSliders
} from 'react-icons/fi';

export default function ToolBar({
  onUppercase,
  onLowercase,
  onTitleCase,
  onSentenceCase,
  onCamelCase,
  onSnakeCase,
  onKebabCase,
  onPascalCase,
  onInvertCase,
  onRemoveExtraSpaces,
  onTrimLines,
  onRemoveEmptyLines,
  onRemoveDuplicateLines,
  onSortAZ,
  onSortZA,
  onReverseLines,
  onReverseAll,
  onAddLineNumbers,
  onStripLineNumbers,
  onSlugify,
  onFormatJSON,
  onMinifyJSON,
  onUrlEncode,
  onUrlDecode,
  onBase64Encode,
  onBase64Decode,
  onHtmlEncode,
  onHtmlDecode,
  onSpeak,
  onStopSpeech,
  isSpeaking,
  onStartVoice,
  onStopVoice,
  isListening,
  onExportTxt,
  onExportMarkdown,
  onExportHTML,
  onExportPDF,
  onExportJSON,
  onCopy,
  copied,
  onClear,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onToggleFindReplace,
  isFindReplaceOpen,
  hasText
}) {
  const [activeTab, setActiveTab] = useState('transform');

  const tabs = [
    { id: 'transform', label: 'Case & Formats', icon: <FiType size={14} /> },
    { id: 'lines', label: 'Lines & Spacing', icon: <FiAlignLeft size={14} /> },
    { id: 'developer', label: 'Developer & Code', icon: <FiCode size={14} /> },
    { id: 'speech', label: 'Audio & Voice', icon: <FiVolume2 size={14} /> },
    { id: 'export', label: 'Export & Share', icon: <FiDownload size={14} /> }
  ];

  return (
    <div className="w-100">
      {/* Top Quick Utility Action Row */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
        {/* Undo / Redo / Find & Replace quick triggers */}
        <div className="d-flex align-items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="btn-textora btn-textora-secondary py-1 px-2"
            title="Undo (Ctrl+Z)"
          >
            <FiRotateCcw size={14} />
            <span className="d-none d-sm-inline">Undo</span>
          </button>

          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="btn-textora btn-textora-secondary py-1 px-2"
            title="Redo (Ctrl+Y or Ctrl+Shift+Z)"
          >
            <FiRotateCw size={14} />
            <span className="d-none d-sm-inline">Redo</span>
          </button>

          <button
            onClick={onToggleFindReplace}
            className={`btn-textora ${isFindReplaceOpen ? 'btn-textora-primary' : 'btn-textora-secondary'} py-1 px-2`}
            title="Find & Replace (Ctrl+F)"
          >
            <FiSearch size={14} />
            <span>Find & Replace</span>
          </button>
        </div>

        {/* Copy & Clear quick triggers */}
        <div className="d-flex align-items-center gap-2">
          <button
            onClick={onCopy}
            disabled={!hasText}
            className={`btn-textora ${copied ? 'btn-textora-success' : 'btn-textora-secondary'} py-1 px-3`}
            title="Copy all text to clipboard"
          >
            {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={onClear}
            disabled={!hasText}
            className="btn-textora btn-textora-danger py-1 px-3"
            title="Clear all text"
          >
            <FiTrash2 size={14} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Segmented Category Navigation */}
      <div
        className="d-flex align-items-center gap-1 p-1 mb-3 rounded-3"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          overflowX: 'auto'
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn-textora flex-grow-1 py-2 px-3 ${
              activeTab === tab.id ? 'btn-textora-primary' : 'btn-textora-ghost'
            }`}
            style={{ fontSize: '0.82rem', whiteSpace: 'nowrap' }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div
        className="p-3 rounded-3"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        {/* Tab 1: Transform / Cases */}
        {activeTab === 'transform' && (
          <div>
            <div className="tool-category-header">
              <FiSliders size={13} />
              <span>Case Transformations & Naming Conventions</span>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <button onClick={onUppercase} disabled={!hasText} className="btn-tool-chip">
                UPPERCASE
              </button>
              <button onClick={onLowercase} disabled={!hasText} className="btn-tool-chip">
                lowercase
              </button>
              <button onClick={onTitleCase} disabled={!hasText} className="btn-tool-chip">
                Title Case
              </button>
              <button onClick={onSentenceCase} disabled={!hasText} className="btn-tool-chip">
                Sentence case
              </button>
              <button onClick={onCamelCase} disabled={!hasText} className="btn-tool-chip font-monospace">
                camelCase
              </button>
              <button onClick={onPascalCase} disabled={!hasText} className="btn-tool-chip font-monospace">
                PascalCase
              </button>
              <button onClick={onSnakeCase} disabled={!hasText} className="btn-tool-chip font-monospace">
                snake_case
              </button>
              <button onClick={onKebabCase} disabled={!hasText} className="btn-tool-chip font-monospace">
                kebab-case
              </button>
              <button onClick={onInvertCase} disabled={!hasText} className="btn-tool-chip">
                iNVERT cASE
              </button>
              <button onClick={onSlugify} disabled={!hasText} className="btn-tool-chip">
                URL-slug-cleaner
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Lines & Spacing */}
        {activeTab === 'lines' && (
          <div>
            <div className="tool-category-header">
              <FiAlignLeft size={13} />
              <span>Formatting, Sorting & Line Operations</span>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <button onClick={onRemoveExtraSpaces} disabled={!hasText} className="btn-tool-chip">
                Normalize Extra Spaces
              </button>
              <button onClick={onTrimLines} disabled={!hasText} className="btn-tool-chip">
                Trim Whitespace per Line
              </button>
              <button onClick={onRemoveEmptyLines} disabled={!hasText} className="btn-tool-chip">
                Remove Empty Lines
              </button>
              <button onClick={onRemoveDuplicateLines} disabled={!hasText} className="btn-tool-chip">
                Remove Duplicate Lines
              </button>
              <button onClick={onSortAZ} disabled={!hasText} className="btn-tool-chip">
                Sort Lines A → Z
              </button>
              <button onClick={onSortZA} disabled={!hasText} className="btn-tool-chip">
                Sort Lines Z → A
              </button>
              <button onClick={onReverseLines} disabled={!hasText} className="btn-tool-chip">
                Reverse Lines Order
              </button>
              <button onClick={onReverseAll} disabled={!hasText} className="btn-tool-chip">
                Reverse Entire Text
              </button>
              <button onClick={onAddLineNumbers} disabled={!hasText} className="btn-tool-chip">
                Add Line Numbers (1, 2...)
              </button>
              <button onClick={onStripLineNumbers} disabled={!hasText} className="btn-tool-chip">
                Strip Line Numbers
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Developer & Encodings */}
        {activeTab === 'developer' && (
          <div>
            <div className="tool-category-header">
              <FiCode size={13} />
              <span>Developer Encodings & Code Formatters</span>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <button onClick={onFormatJSON} disabled={!hasText} className="btn-tool-chip">
                Format / Prettify JSON
              </button>
              <button onClick={onMinifyJSON} disabled={!hasText} className="btn-tool-chip">
                Minify / Compress JSON
              </button>
              <button onClick={onUrlEncode} disabled={!hasText} className="btn-tool-chip">
                URL Encode
              </button>
              <button onClick={onUrlDecode} disabled={!hasText} className="btn-tool-chip">
                URL Decode
              </button>
              <button onClick={onBase64Encode} disabled={!hasText} className="btn-tool-chip">
                Base64 Encode
              </button>
              <button onClick={onBase64Decode} disabled={!hasText} className="btn-tool-chip">
                Base64 Decode
              </button>
              <button onClick={onHtmlEncode} disabled={!hasText} className="btn-tool-chip">
                HTML Entities Encode
              </button>
              <button onClick={onHtmlDecode} disabled={!hasText} className="btn-tool-chip">
                HTML Entities Decode
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Speech & Voice */}
        {activeTab === 'speech' && (
          <div>
            <div className="tool-category-header">
              <FiVolume2 size={13} />
              <span>Native Speech Synthesis & Voice Recognition</span>
            </div>
            <div className="d-flex flex-wrap gap-2 align-items-center">
              {!isSpeaking ? (
                <button
                  onClick={onSpeak}
                  disabled={!hasText}
                  className="btn-tool-chip text-primary border-primary"
                >
                  <FiVolume2 size={14} />
                  <span>Listen to Text (TTS)</span>
                </button>
              ) : (
                <button
                  onClick={onStopSpeech}
                  className="btn-tool-chip text-danger border-danger"
                >
                  <FiSquare size={14} />
                  <span>Stop Speaking</span>
                </button>
              )}

              {!isListening ? (
                <button
                  onClick={onStartVoice}
                  className="btn-tool-chip"
                >
                  <FiMic size={14} />
                  <span>Dictate (Speech to Text)</span>
                </button>
              ) : (
                <button
                  onClick={onStopVoice}
                  className="btn-tool-chip text-danger border-danger"
                >
                  <FiMicOff size={14} />
                  <span>Listening... (Click to Stop)</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Export & Share */}
        {activeTab === 'export' && (
          <div>
            <div className="tool-category-header">
              <FiDownload size={13} />
              <span>Download & Document Exports</span>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <button onClick={onExportTxt} disabled={!hasText} className="btn-tool-chip">
                <FiFileText size={14} />
                <span>Plain Text (.txt)</span>
              </button>
              <button onClick={onExportPDF} disabled={!hasText} className="btn-tool-chip">
                <FiDownload size={14} />
                <span>Document PDF (.pdf)</span>
              </button>
              <button onClick={onExportMarkdown} disabled={!hasText} className="btn-tool-chip">
                <FiFileText size={14} />
                <span>Markdown (.md)</span>
              </button>
              <button onClick={onExportHTML} disabled={!hasText} className="btn-tool-chip">
                <FiCode size={14} />
                <span>Web HTML (.html)</span>
              </button>
              <button onClick={onExportJSON} disabled={!hasText} className="btn-tool-chip">
                <FiCode size={14} />
                <span>Data JSON (.json)</span>
              </button>
              <button onClick={onCopy} disabled={!hasText} className="btn-tool-chip">
                <FiShare2 size={14} />
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
