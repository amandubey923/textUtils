import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiSearch,
  FiArrowRight,
  FiCheck
} from 'react-icons/fi';

export default function ToolsDirectory() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const toolsList = [
    // Case
    {
      name: 'UPPERCASE Converter',
      category: 'case',
      desc: 'Transforms all characters into capitalized uppercase letters.',
      example: 'hello world → HELLO WORLD'
    },
    {
      name: 'lowercase Converter',
      category: 'case',
      desc: 'Converts all letters into uniform small lowercase.',
      example: 'HELLO WORLD → hello world'
    },
    {
      name: 'Title Case Formatter',
      category: 'case',
      desc: 'Capitalizes the first letter of each major word.',
      example: 'the art of code → The Art Of Code'
    },
    {
      name: 'Sentence Case Formatter',
      category: 'case',
      desc: 'Capitalizes the first letter following each period or punctuation mark.',
      example: 'hello. world. → Hello. World.'
    },
    {
      name: 'camelCase Converter',
      category: 'case',
      desc: 'Formats words into camelCase identifier format for JavaScript & TypeScript.',
      example: 'user account id → userAccountId'
    },
    {
      name: 'PascalCase Converter',
      category: 'case',
      desc: 'Formats words into PascalCase identifier format for React components & classes.',
      example: 'user profile card → UserProfileCard'
    },
    {
      name: 'snake_case Converter',
      category: 'case',
      desc: 'Joins words with underscores in lowercase for Python and SQL databases.',
      example: 'created at timestamp → created_at_timestamp'
    },
    {
      name: 'kebab-case Converter',
      category: 'case',
      desc: 'Joins words with hyphens for CSS classes and URL endpoints.',
      example: 'primary action button → primary-action-button'
    },
    {
      name: 'Invert Case (tOGGLE)',
      category: 'case',
      desc: 'Inverts each letter’s casing from uppercase to lowercase and vice versa.',
      example: 'Textora → tEXTORA'
    },
    {
      name: 'URL Slug Cleaner',
      category: 'case',
      desc: 'Generates an SEO-friendly URL slug by stripping special characters.',
      example: '10 Tips For Clean Code! → 10-tips-for-clean-code'
    },

    // Lines & Whitespace
    {
      name: 'Extra Whitespace Cleaner',
      category: 'formatting',
      desc: 'Removes double spaces, consecutive tabs, and excessive empty space.',
      example: 'word    spacing   here → word spacing here'
    },
    {
      name: 'Trim Lines',
      category: 'formatting',
      desc: 'Trims leading and trailing spaces from each individual line.',
      example: '  indented line   → indented line'
    },
    {
      name: 'Remove Empty Lines',
      category: 'formatting',
      desc: 'Strips out all blank or whitespace-only lines to condense documents.',
      example: 'line 1\n\n\nline 2 → line 1\nline 2'
    },
    {
      name: 'Deduplicate Lines',
      category: 'formatting',
      desc: 'Filters out duplicate lines while preserving the original sequence.',
      example: 'apple\nbanana\napple → apple\nbanana'
    },
    {
      name: 'Alphabetical Sort (A → Z)',
      category: 'formatting',
      desc: 'Sorts lines in ascending alphabetical order.',
      example: 'Zebra\nApple → Apple\nZebra'
    },
    {
      name: 'Reverse Alphabetical (Z → A)',
      category: 'formatting',
      desc: 'Sorts lines in descending alphabetical order.',
      example: 'Apple\nZebra → Zebra\nApple'
    },
    {
      name: 'Reverse Line Order',
      category: 'formatting',
      desc: 'Flips the order of lines from bottom to top.',
      example: 'first\nsecond → second\nfirst'
    },
    {
      name: 'Reverse Character String',
      category: 'formatting',
      desc: 'Reverses the entire text character by character.',
      example: 'Textora → arotxeT'
    },
    {
      name: 'Add Line Numbers',
      category: 'formatting',
      desc: 'Prepends padded line numbers to every line for code review.',
      example: 'line → 1. line'
    },
    {
      name: 'Strip Line Numbers',
      category: 'formatting',
      desc: 'Removes prefixes like "1. ", "2: ", or "3) " from copied lists.',
      example: '1. Item → Item'
    },

    // Developer
    {
      name: 'JSON Prettify & Validator',
      category: 'developer',
      desc: 'Formats, indents, and validates raw JSON with instant syntax checking.',
      example: '{"a":1} → {\n  "a": 1\n}'
    },
    {
      name: 'JSON Minify / Compressor',
      category: 'developer',
      desc: 'Removes whitespace and newlines to produce compact single-line JSON.',
      example: '{\n  "a": 1\n} → {"a":1}'
    },
    {
      name: 'URL Encoder / Decoder',
      category: 'developer',
      desc: 'Safely encodes and decodes query parameters and URI components.',
      example: 'name=John Doe → name=John%20Doe'
    },
    {
      name: 'Base64 Encoder / Decoder',
      category: 'developer',
      desc: 'Encodes plain text to binary-safe Base64 and restores Base64 to text.',
      example: 'hello → aGVsbG8='
    },
    {
      name: 'HTML Entities Escaper',
      category: 'developer',
      desc: 'Escapes & < > " characters into valid HTML entities for web pages.',
      example: '<div> & "quote" → &lt;div&gt; &amp; &quot;quote&quot;'
    },

    // Audio & Export
    {
      name: 'Speech Synthesis (TTS)',
      category: 'audio',
      desc: 'Listens to your text aloud with native browser voice playback.',
      example: 'Hear pronunciation & flow'
    },
    {
      name: 'Voice Dictation (STT)',
      category: 'audio',
      desc: 'Transcribes spoken voice into text in real time using microphone.',
      example: 'Hands-free dictation'
    },
    {
      name: 'Multi-page PDF Generator',
      category: 'export',
      desc: 'Exports text to structured, paginated, clean PDF documents.',
      example: 'Download ready-to-share PDF'
    }
  ];

  const filtered = toolsList.filter((tool) => {
    const matchesCat = categoryFilter === 'all' || tool.category === categoryFilter;
    const matchesSearch =
      !search ||
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.desc.toLowerCase().includes(search.toLowerCase()) ||
      tool.example.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <span className="brand-badge mb-2">PRECISION TOOLKIT</span>
        <h1 className="display-6 fw-bold mt-2">All Text Utilities & Operations</h1>
        <p className="text-secondary mx-auto" style={{ maxWidth: '640px' }}>
          Explore 25+ fast, zero-latency, client-side text processing utilities built right into Textora Studio.
        </p>

        {/* Search & Filter Controls */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mt-4">
          <div className="position-relative" style={{ minWidth: '280px', maxWidth: '400px' }}>
            <FiSearch
              className="position-absolute top-50 translate-middle-y text-secondary ms-3"
              size={16}
            />
            <input
              type="text"
              className="find-input w-100 ps-5 py-2"
              placeholder="Search utilities by name, syntax..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="d-flex gap-1 flex-wrap justify-content-center">
            {[
              { id: 'all', label: 'All Tools' },
              { id: 'case', label: 'Case Styles' },
              { id: 'formatting', label: 'Lines & Spacing' },
              { id: 'developer', label: 'Developer & Code' },
              { id: 'audio', label: 'Voice & Speech' },
              { id: 'export', label: 'Export' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`btn-textora ${categoryFilter === cat.id ? 'btn-textora-primary' : 'btn-textora-secondary'} py-1 px-3`}
                style={{ fontSize: '0.8rem' }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Tools */}
      <div className="row g-3">
        {filtered.map((tool) => (
          <div className="col-lg-4 col-md-6 col-12" key={tool.name}>
            <div className="textora-card h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span
                    className="badge rounded-pill"
                    style={{
                      background: 'var(--bg-badge)',
                      color: 'var(--accent-primary)',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      fontSize: '0.7rem'
                    }}
                  >
                    {tool.category.toUpperCase()}
                  </span>
                  <FiCheck className="text-muted" size={14} />
                </div>

                <h6 className="fw-bold mb-2">{tool.name}</h6>
                <p className="text-secondary mb-3" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {tool.desc}
                </p>
              </div>

              <div>
                <div
                  className="p-2 rounded font-monospace text-muted mb-3"
                  style={{
                    background: 'var(--bg-surface)',
                    fontSize: '0.76rem',
                    border: '1px solid var(--border-subtle)',
                    overflowX: 'auto'
                  }}
                >
                  {tool.example}
                </div>

                <Link
                  to="/"
                  className="btn-textora btn-textora-secondary w-100 justify-content-between py-1 px-3"
                  style={{ fontSize: '0.8rem' }}
                >
                  <span>Use in Workspace</span>
                  <FiArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

