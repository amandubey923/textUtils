import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import ToolsDirectory from './components/ToolsDirectory';
import About from './components/About';
import Alert from './components/Alert';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import SnippetsModal from './components/SnippetsModal';

import { getStoredTheme, saveTheme, getStoredDraft } from './utils/storage';
import './App.css';

function App() {
  const [mode, setMode] = useState(() => getStoredTheme());
  const [alert, setAlert] = useState(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSnippetsOpen, setIsSnippetsOpen] = useState(false);
  const [currentWorkspaceDraft, setCurrentWorkspaceDraft] = useState(() => getStoredDraft());

  // Synchronize theme with body & html attributes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    document.body.className = mode;
    saveTheme(mode);
  }, [mode]);

  const showAlert = useCallback((message, type = 'success') => {
    setAlert({ msg: message, type });
    const timer = setTimeout(() => {
      setAlert(null);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showAlert(`${next.charAt(0).toUpperCase() + next.slice(1)} theme activated`, 'info');
      return next;
    });
  };

  // Global shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Commands list for Command Palette
  const commands = [
    {
      id: 'cmd-theme',
      label: `Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Preferences',
      desc: 'Toggle between dark and light workspace theme',
      shortcut: 'Toggle',
      action: toggleMode
    },
    {
      id: 'cmd-snippets',
      label: 'Open Saved Snippets Library',
      category: 'Workspace',
      desc: 'Browse, load, and manage your saved text snippets',
      shortcut: '⌘S',
      action: () => setIsSnippetsOpen(true)
    },
    {
      id: 'cmd-copy',
      label: 'Copy Workspace Content',
      category: 'Actions',
      desc: 'Copy entire document text to clipboard',
      action: () => {
        const text = getStoredDraft();
        if (text) {
          navigator.clipboard.writeText(text);
          showAlert('Copied workspace content to clipboard', 'success');
        } else {
          showAlert('Workspace is currently empty', 'info');
        }
      }
    },
    {
      id: 'cmd-tools',
      label: 'Browse All Tools Directory',
      category: 'Navigation',
      desc: 'View comprehensive catalog of all 25+ utilities',
      action: () => {
        window.location.href = '/tools';
      }
    },
    {
      id: 'cmd-about',
      label: 'About Textora Studio',
      category: 'Navigation',
      desc: 'Architecture, shortcuts cheatsheet, and author info',
      action: () => {
        window.location.href = '/about';
      }
    }
  ];

  return (
    <Router>
      <div className={`app-container ${mode}`}>
        <Navbar
          mode={mode}
          toggleMode={toggleMode}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenSnippets={() => {
            setCurrentWorkspaceDraft(getStoredDraft());
            setIsSnippetsOpen(true);
          }}
        />

        <Alert alert={alert} />

        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          commands={commands}
        />

        <SnippetsModal
          isOpen={isSnippetsOpen}
          onClose={() => setIsSnippetsOpen(false)}
          currentText={currentWorkspaceDraft}
          onLoadSnippet={(content) => {
            // Write to draft and reload or broadcast
            localStorage.setItem('textora_active_draft', content);
            window.dispatchEvent(new Event('storage'));
            window.location.href = '/';
          }}
          showAlert={showAlert}
        />

        <main className="flex-grow-1">
          <Switch>
            <Route exact path="/">
              <TextForm
                showAlert={showAlert}
                onOpenSnippets={() => {
                  setCurrentWorkspaceDraft(getStoredDraft());
                  setIsSnippetsOpen(true);
                }}
                onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
              />
            </Route>

            <Route exact path="/tools">
              <ToolsDirectory />
            </Route>

            <Route exact path="/about">
              <About />
            </Route>

            {/* Fallback route */}
            <Route path="*">
              <TextForm
                showAlert={showAlert}
                onOpenSnippets={() => {
                  setCurrentWorkspaceDraft(getStoredDraft());
                  setIsSnippetsOpen(true);
                }}
                onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
              />
            </Route>
          </Switch>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
