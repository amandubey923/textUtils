import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

import ToolBar from './ToolBar';
import AnalyticsCards from './AnalyticsCards';
import AIToolsSection from './AIToolsSection';
import TextInsights from './TextInsights';

export default function TextForm({
  heading,
  mode,
  showAlert
}) {
  const [text, setText] = useState('');

  const updateText = (newText, message) => {
    setText(newText);

    if (message) {
      showAlert(message, 'success');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    showAlert('Copied Successfully', 'success');
  };

  const handleSpeak = () => {
    const speech =
      new SpeechSynthesisUtterance(text);

    window.speechSynthesis.speak(speech);

    showAlert(
      'Speaking Text',
      'success'
    );
  };

  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showAlert(
        'Speech Recognition Not Supported',
        'danger'
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.onresult = (
      event
    ) => {
      setText(
        event.results[0][0].transcript
      );
    };

    recognition.start();
  };

  const exportTxt = () => {
    const blob = new Blob([text], {
      type: 'text/plain'
    });

    const link =
      document.createElement('a');

    link.href =
      URL.createObjectURL(blob);

    link.download =
      'TextProAI.txt';

    link.click();

    showAlert(
      'TXT Downloaded',
      'success'
    );
  };

  const exportMarkdown = () => {
    const blob = new Blob([text], {
      type: 'text/markdown'
    });

    const link =
      document.createElement('a');

    link.href =
      URL.createObjectURL(blob);

    link.download =
      'TextProAI.md';

    link.click();

    showAlert(
      'Markdown Downloaded',
      'success'
    );
  };

  const exportHTML = () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
      <title>TextPro AI</title>
      </head>
      <body>
      <pre>${text}</pre>
      </body>
      </html>
    `;

    const blob = new Blob([html], {
      type: 'text/html'
    });

    const link =
      document.createElement('a');

    link.href =
      URL.createObjectURL(blob);

    link.download =
      'TextProAI.html';

    link.click();

    showAlert(
      'HTML Downloaded',
      'success'
    );
  };

  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.text(
      text || 'Empty Document',
      10,
      10
    );

    pdf.save('TextProAI.pdf');

    showAlert(
      'PDF Downloaded',
      'success'
    );
  };

  const words =
    text.trim().length === 0
      ? 0
      : text.trim().split(/\s+/)
          .length;

  const characters =
    text.length;

  const sentences =
    text.trim().length === 0
      ? 0
      : text
          .split(/[.!?]+/)
          .filter(Boolean).length;

  const paragraphs =
    text.trim().length === 0
      ? 0
      : text
          .split(/\n\s*\n/)
          .filter(Boolean).length;

  const readingTime = (
    words * 0.008
  ).toFixed(2);

  const avgWordLength =
    words === 0
      ? 0
      : (
          text.replace(/\s+/g, '')
            .length / words
        ).toFixed(1);

  return (
    <section
      id="text-editor-section"
      className="container py-5"
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}
        style={{
          borderRadius: '30px',
          padding: '35px',
          background:
            mode === 'dark'
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(255,255,255,0.9)',
          backdropFilter:
            'blur(20px)',
          border:
            mode === 'dark'
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(15,23,42,0.08)',
          boxShadow:
            '0 20px 60px rgba(0,0,0,.12)'
        }}
      >
        <div className="mb-4">

          <h1
            style={{
              color:
                mode === 'dark'
                  ? '#F8FAFC'
                  : '#0F172A'
            }}
          >
            {heading}
          </h1>

          <p
            style={{
              color:
                mode === 'dark'
                  ? '#94A3B8'
                  : '#64748B'
            }}
          >
            Professional AI powered
            writing workspace.
          </p>

        </div>

        <ToolBar
          mode={mode}
          onUppercase={() =>
            updateText(
              text.toUpperCase(),
              'Uppercase Applied'
            )
          }
          onLowercase={() =>
            updateText(
              text.toLowerCase(),
              'Lowercase Applied'
            )
          }
          onCapitalize={() =>
            updateText(
              text.replace(
                /\b\w/g,
                (char) =>
                  char.toUpperCase()
              ),
              'Capitalized'
            )
          }
          onRemoveSpaces={() =>
            updateText(
              text
                .split(/\s+/)
                .join(' '),
              'Extra Spaces Removed'
            )
          }
          onCopy={handleCopy}
          onReverse={() =>
            updateText(
              text
                .split('')
                .reverse()
                .join(''),
              'Text Reversed'
            )
          }
          onSpeak={handleSpeak}
          onVoice={handleVoice}
          onDownload={exportTxt}
          onClear={() =>
            updateText(
              '',
              'Text Cleared'
            )
          }
          onExportPDF={exportPDF}
          onExportHTML={
            exportHTML
          }
          onExportMarkdown={
            exportMarkdown
          }
          onSortAZ={() =>
            updateText(
              text
                .split('\n')
                .sort()
                .join('\n'),
              'Sorted A-Z'
            )
          }
          onSortZA={() =>
            updateText(
              text
                .split('\n')
                .sort()
                .reverse()
                .join('\n'),
              'Sorted Z-A'
            )
          }
          onRemoveDuplicateLines={() =>
            updateText(
              [
                ...new Set(
                  text.split('\n')
                )
              ].join('\n'),
              'Duplicates Removed'
            )
          }
        />

        <textarea
          value={text}
          onChange={(e) =>
            setText(
              e.target.value
            )
          }
          rows="12"
          className="form-control mt-4"
          placeholder="Start writing something amazing..."
          style={{
            resize: 'none',
            border: 'none',
            borderRadius: '24px',
            padding: '24px',
            fontSize: '1rem',
            background:
              mode === 'dark'
                ? '#0F172A'
                : '#F8FAFC',
            color:
              mode === 'dark'
                ? '#F8FAFC'
                : '#0F172A'
          }}
        />

        <div className="mt-5">

          <AnalyticsCards
            mode={mode}
            words={words}
            characters={
              characters
            }
            sentences={
              sentences
            }
            readingTime={
              readingTime
            }
            paragraphs={
              paragraphs
            }
            avgWordLength={
              avgWordLength
            }
          />

        </div>

        <div className="mt-5">

          <TextInsights
            mode={mode}
            text={text}
          />

        </div>

        <div
          className="mt-5 p-4"
          style={{
            borderRadius:
              '24px',
            background:
              mode === 'dark'
                ? 'rgba(255,255,255,0.04)'
                : '#ffffff'
          }}
        >
          <h3
            style={{
              color:
                mode === 'dark'
                  ? '#F8FAFC'
                  : '#0F172A'
            }}
          >
            Live Preview
          </h3>

          <p
            style={{
              whiteSpace:
                'pre-wrap',
              color:
                mode === 'dark'
                  ? '#CBD5E1'
                  : '#475569'
            }}
          >
            {text.length > 0
              ? text
              : 'Start typing to preview your content...'}
          </p>

        </div>

        <AIToolsSection
          mode={mode}
        />

      </motion.div>
    </section>
  );
}