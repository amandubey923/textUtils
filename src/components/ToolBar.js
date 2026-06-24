import React from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowUp,
  FaArrowDown,
  FaExchangeAlt,
  FaEraser,
  FaCopy,
  FaUndo,
  FaVolumeUp,
  FaMicrophone,
  FaDownload,
  FaTrash,
  FaFilePdf,
  FaCode,
  FaMarkdown,
  FaSortAlphaDown,
  FaSortAlphaUp
} from 'react-icons/fa';

export default function ToolBar({
  mode,
  onUppercase,
  onLowercase,
  onCapitalize,
  onRemoveSpaces,
  onCopy,
  onReverse,
  onSpeak,
  onVoice,
  onDownload,
  onClear,
  onExportPDF,
  onExportHTML,
  onExportMarkdown,
  onSortAZ,
  onSortZA,
  onRemoveDuplicateLines
}) {
  const buttonStyle = {
    border: 'none',
    borderRadius: '14px',
    padding: '12px 16px',
    fontWeight: 600,
    background:
      mode === 'dark'
        ? 'rgba(255,255,255,0.06)'
        : 'rgba(15,23,42,0.05)',
    color:
      mode === 'dark'
        ? '#F8FAFC'
        : '#0F172A',
    backdropFilter: 'blur(12px)',
    transition: 'all .25s ease'
  };

  const groups = [
    {
      title: 'Transform',
      tools: [
        {
          icon: <FaArrowUp />,
          label: 'Upper',
          action: onUppercase
        },
        {
          icon: <FaArrowDown />,
          label: 'Lower',
          action: onLowercase
        },
        {
          icon: <FaExchangeAlt />,
          label: 'Capitalize',
          action: onCapitalize
        },
        {
          icon: <FaUndo />,
          label: 'Reverse',
          action: onReverse
        }
      ]
    },
    {
      title: 'Utilities',
      tools: [
        {
          icon: <FaEraser />,
          label: 'Clean',
          action: onRemoveSpaces
        },
        {
          icon: <FaCopy />,
          label: 'Copy',
          action: onCopy
        },
        {
          icon: <FaSortAlphaDown />,
          label: 'A-Z',
          action: onSortAZ
        },
        {
          icon: <FaSortAlphaUp />,
          label: 'Z-A',
          action: onSortZA
        }
      ]
    },
    {
      title: 'Voice',
      tools: [
        {
          icon: <FaVolumeUp />,
          label: 'Speak',
          action: onSpeak
        },
        {
          icon: <FaMicrophone />,
          label: 'Voice',
          action: onVoice
        }
      ]
    },
    {
      title: 'Export',
      tools: [
        {
          icon: <FaDownload />,
          label: 'TXT',
          action: onDownload
        },
        {
          icon: <FaFilePdf />,
          label: 'PDF',
          action: onExportPDF
        },
        {
          icon: <FaCode />,
          label: 'HTML',
          action: onExportHTML
        },
        {
          icon: <FaMarkdown />,
          label: 'MD',
          action: onExportMarkdown
        }
      ]
    },
    {
      title: 'Actions',
      tools: [
        {
          icon: <FaEraser />,
          label: 'Duplicates',
          action: onRemoveDuplicateLines
        },
        {
          icon: <FaTrash />,
          label: 'Clear',
          action: onClear
        }
      ]
    }
  ];

  return (
    <div className="mb-4">
      {groups.map((group) => (
        <div key={group.title} className="mb-4">

          <div
            className="mb-2"
            style={{
              color:
                mode === 'dark'
                  ? '#94A3B8'
                  : '#475569',
              fontSize: '.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            {group.title}
          </div>

          <div className="d-flex flex-wrap gap-2">

            {group.tools.map((tool) => (
              <motion.button
                key={tool.label}
                whileHover={{
                  y: -3,
                  scale: 1.03
                }}
                whileTap={{
                  scale: 0.96
                }}
                style={buttonStyle}
                onClick={tool.action}
              >
                <span className="me-2">
                  {tool.icon}
                </span>

                {tool.label}
              </motion.button>
            ))}

          </div>

        </div>
      ))}
    </div>
  );
}