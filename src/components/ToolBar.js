import React, { useState } from 'react';
import {
  FiType,
  FiAlignLeft,
  FiCode,
  FiVolume2,
  FiDownload,
  FiMic,
  FiMicOff,
  FiSquare,
  FiFileText
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
  hasText
}) {
  const [activeCategory, setActiveCategory] = useState('case');

  const categories = [
    { id: 'case', label: 'Case Styles', icon: <FiType size={14} /> },
    { id: 'lines', label: 'Lines & Spacing', icon: <FiAlignLeft size={14} /> },
    { id: 'developer', label: 'Developer Code', icon: <FiCode size={14} /> },
    { id: 'voice-export', label: 'Voice & Export', icon: <FiVolume2 size={14} /> }
  ];

  return (
    <div className="tool-ribbon-container">
      {/* Category Segmented Bar */}
      <div className="ribbon-nav">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`ribbon-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Category 1: Case Transformations */}
      {activeCategory === 'case' && (
        <div className="row g-2">
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onUppercase} disabled={!hasText} className="btn-tool-action w-100">
              <span className="fw-bold">UPPERCASE</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onLowercase} disabled={!hasText} className="btn-tool-action w-100">
              <span>lowercase</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onTitleCase} disabled={!hasText} className="btn-tool-action w-100">
              <span>Title Case</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onSentenceCase} disabled={!hasText} className="btn-tool-action w-100">
              <span>Sentence case</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onCamelCase} disabled={!hasText} className="btn-tool-action w-100 font-monospace">
              <span>camelCase</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onPascalCase} disabled={!hasText} className="btn-tool-action w-100 font-monospace">
              <span>PascalCase</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onSnakeCase} disabled={!hasText} className="btn-tool-action w-100 font-monospace">
              <span>snake_case</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onKebabCase} disabled={!hasText} className="btn-tool-action w-100 font-monospace">
              <span>kebab-case</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onInvertCase} disabled={!hasText} className="btn-tool-action w-100">
              <span>iNVERT cASE</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onSlugify} disabled={!hasText} className="btn-tool-action w-100">
              <span>URL Slug Cleaner</span>
            </button>
          </div>
        </div>
      )}

      {/* Category 2: Lines & Clean */}
      {activeCategory === 'lines' && (
        <div className="row g-2">
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onRemoveExtraSpaces} disabled={!hasText} className="btn-tool-action w-100">
              <span>Clean Extra Spaces</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onTrimLines} disabled={!hasText} className="btn-tool-action w-100">
              <span>Trim Line Edges</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onRemoveEmptyLines} disabled={!hasText} className="btn-tool-action w-100">
              <span>Remove Empty Lines</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onRemoveDuplicateLines} disabled={!hasText} className="btn-tool-action w-100">
              <span>Deduplicate Lines</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onSortAZ} disabled={!hasText} className="btn-tool-action w-100">
              <span>Sort Lines A → Z</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onSortZA} disabled={!hasText} className="btn-tool-action w-100">
              <span>Sort Lines Z → A</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onReverseLines} disabled={!hasText} className="btn-tool-action w-100">
              <span>Reverse Line Order</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onReverseAll} disabled={!hasText} className="btn-tool-action w-100">
              <span>Reverse Entire Text</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onAddLineNumbers} disabled={!hasText} className="btn-tool-action w-100">
              <span>Add Line Numbers</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onStripLineNumbers} disabled={!hasText} className="btn-tool-action w-100">
              <span>Strip Line Numbers</span>
            </button>
          </div>
        </div>
      )}

      {/* Category 3: Developer & Encodings */}
      {activeCategory === 'developer' && (
        <div className="row g-2">
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onFormatJSON} disabled={!hasText} className="btn-tool-action w-100">
              <span>Prettify & Validate JSON</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onMinifyJSON} disabled={!hasText} className="btn-tool-action w-100">
              <span>Minify JSON</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onUrlEncode} disabled={!hasText} className="btn-tool-action w-100">
              <span>URL Encode</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onUrlDecode} disabled={!hasText} className="btn-tool-action w-100">
              <span>URL Decode</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onBase64Encode} disabled={!hasText} className="btn-tool-action w-100">
              <span>Base64 Encode</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onBase64Decode} disabled={!hasText} className="btn-tool-action w-100">
              <span>Base64 Decode</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onHtmlEncode} disabled={!hasText} className="btn-tool-action w-100">
              <span>HTML Entities Encode</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onHtmlDecode} disabled={!hasText} className="btn-tool-action w-100">
              <span>HTML Entities Decode</span>
            </button>
          </div>
        </div>
      )}

      {/* Category 4: Voice & Document Export */}
      {activeCategory === 'voice-export' && (
        <div className="row g-2">
          {/* Audio controls */}
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            {!isSpeaking ? (
              <button onClick={onSpeak} disabled={!hasText} className="btn-tool-action w-100">
                <FiVolume2 size={14} className="text-primary" />
                <span>Text to Speech (TTS)</span>
              </button>
            ) : (
              <button onClick={onStopSpeech} className="btn-tool-action w-100 text-danger border-danger">
                <FiSquare size={14} />
                <span>Stop Playback</span>
              </button>
            )}
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            {!isListening ? (
              <button onClick={onStartVoice} className="btn-tool-action w-100">
                <FiMic size={14} className="text-primary" />
                <span>Voice Dictate (STT)</span>
              </button>
            ) : (
              <button onClick={onStopVoice} className="btn-tool-action w-100 text-danger border-danger">
                <FiMicOff size={14} />
                <span>Stop Microphone</span>
              </button>
            )}
          </div>

          {/* Export options */}
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onExportPDF} disabled={!hasText} className="btn-tool-action w-100">
              <FiDownload size={14} />
              <span>Formatted PDF (.pdf)</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onExportTxt} disabled={!hasText} className="btn-tool-action w-100">
              <FiFileText size={14} />
              <span>Plain Text (.txt)</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onExportMarkdown} disabled={!hasText} className="btn-tool-action w-100">
              <FiFileText size={14} />
              <span>Markdown (.md)</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onExportHTML} disabled={!hasText} className="btn-tool-action w-100">
              <FiCode size={14} />
              <span>HTML Document (.html)</span>
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <button onClick={onExportJSON} disabled={!hasText} className="btn-tool-action w-100">
              <FiCode size={14} />
              <span>JSON Data (.json)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

