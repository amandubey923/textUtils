/**
 * Textora - Local Storage Persistence Helper
 * Manages drafts, saved snippets, and preferences safely with error boundary.
 */

const STORAGE_KEYS = {
  DRAFT: 'textora_active_draft',
  SNIPPETS: 'textora_saved_snippets',
  THEME: 'textora_theme_preference',
  RECENT_OPS: 'textora_recent_operations'
};

export const getStoredDraft = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.DRAFT) || '';
  } catch (e) {
    console.warn('Unable to read draft from localStorage', e);
    return '';
  }
};

export const saveDraft = (text) => {
  try {
    localStorage.setItem(STORAGE_KEYS.DRAFT, text);
  } catch (e) {
    console.warn('Unable to persist draft', e);
  }
};

export const getStoredSnippets = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SNIPPETS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const saveSnippet = (title, content) => {
  try {
    const snippets = getStoredSnippets();
    const newSnippet = {
      id: Date.now().toString(),
      title: title || `Snippet #${snippets.length + 1}`,
      content,
      createdAt: new Date().toISOString()
    };
    const updated = [newSnippet, ...snippets].slice(0, 50); // limit to 50
    localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(updated));
    return newSnippet;
  } catch (e) {
    console.warn('Unable to save snippet', e);
    return null;
  }
};

export const deleteSnippet = (id) => {
  try {
    const snippets = getStoredSnippets().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(snippets));
    return true;
  } catch (e) {
    return false;
  }
};

export const getStoredTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  } catch (e) {
    return 'dark';
  }
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (e) {
    // noop
  }
};

