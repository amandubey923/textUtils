/**
 * Textora - Core Text Processing Utilities
 * Authentic, zero-dependency, pure functions for text transformation & analytics.
 */

// Common English stopwords for high-quality keyword extraction
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing',
  'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t',
  'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers',
  'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if',
  'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t',
  'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our',
  'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s',
  'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re',
  'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t',
  'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s',
  'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t',
  'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself',
  'yourselves'
]);

// ── Case Transformations ──────────────────────────────────────────────

export const toUppercase = (text) => text.toUpperCase();

export const toLowercase = (text) => text.toLowerCase();

export const toTitleCase = (text) => {
  return text.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const toSentenceCase = (text) => {
  return text
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
};

export const toCamelCase = (text) => {
  return text
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
};

export const toPascalCase = (text) => {
  const camel = toCamelCase(text);
  return camel ? camel.charAt(0).toUpperCase() + camel.slice(1) : '';
};

export const toSnakeCase = (text) => {
  return text
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s\W-]+/g, '_')
    .toLowerCase()
    .replace(/^_+|_+$/g, '');
};

export const toKebabCase = (text) => {
  return text
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s\W_]+/g, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '');
};

export const toInvertCase = (text) => {
  return text
    .split('')
    .map((c) => {
      if (c === c.toUpperCase()) return c.toLowerCase();
      return c.toUpperCase();
    })
    .join('');
};

export const toAlternatingCase = (text) => {
  let upper = true;
  return text
    .split('')
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const res = upper ? char.toUpperCase() : char.toLowerCase();
        upper = !upper;
        return res;
      }
      return char;
    })
    .join('');
};

// ── Line & Spacing Cleaners ──────────────────────────────────────────

export const removeExtraSpaces = (text) => {
  return text
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

export const trimLines = (text) => {
  return text
    .split('\n')
    .map((line) => line.trim())
    .join('\n');
};

export const removeEmptyLines = (text) => {
  return text
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .join('\n');
};

export const removeDuplicateLines = (text) => {
  const lines = text.split('\n');
  const seen = new Set();
  const result = [];
  for (const line of lines) {
    if (!seen.has(line)) {
      seen.add(line);
      result.push(line);
    }
  }
  return result.join('\n');
};

export const sortLinesAZ = (text) => {
  return text
    .split('\n')
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    .join('\n');
};

export const sortLinesZA = (text) => {
  return text
    .split('\n')
    .sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }))
    .join('\n');
};

export const reverseLines = (text) => {
  return text.split('\n').reverse().join('\n');
};

export const reverseEntireText = (text) => {
  return text.split('').reverse().join('');
};

export const addLineNumbers = (text) => {
  const lines = text.split('\n');
  const padLength = String(lines.length).length;
  return lines
    .map((line, idx) => `${String(idx + 1).padStart(padLength, ' ')}. ${line}`)
    .join('\n');
};

export const stripLineNumbers = (text) => {
  return text
    .split('\n')
    .map((line) => line.replace(/^\s*\d+[.:)-]\s*/, ''))
    .join('\n');
};

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// ── Developer & Encoding Tools ────────────────────────────────────────

export const formatJSON = (text) => {
  const parsed = JSON.parse(text);
  return JSON.stringify(parsed, null, 2);
};

export const minifyJSON = (text) => {
  const parsed = JSON.parse(text);
  return JSON.stringify(parsed);
};

export const urlEncode = (text) => encodeURIComponent(text);

export const urlDecode = (text) => {
  try {
    return decodeURIComponent(text);
  } catch (e) {
    throw new Error('Malformed URL encoded string');
  }
};

export const base64Encode = (text) => {
  return btoa(
    encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode('0x' + p1)
    )
  );
};

export const base64Decode = (text) => {
  try {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(text.trim()), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch (e) {
    throw new Error('Invalid Base64 string');
  }
};

export const htmlEntityEncode = (text) => {
  return text.replace(/[\u00A0-\u9999<>&"]/gim, (i) => `&#${i.charCodeAt(0)};`);
};

export const htmlEntityDecode = (text) => {
  const doc = new DOMParser().parseFromString(text, 'text/html');
  return doc.documentElement.textContent || '';
};

// ── Analytics & Insights Engine ───────────────────────────────────────

export const calculateStatistics = (text) => {
  const rawLength = text.length;
  const trimmed = text.trim();

  if (rawLength === 0) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTime: '0.0',
      speakingTime: '0.0',
      avgWordLength: '0.0',
      readingScore: 100,
      readingLevel: 'Very Easy'
    };
  }

  const wordsArray = trimmed.split(/\s+/).filter(Boolean);
  const wordsCount = wordsArray.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  const sentencesArray = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentencesCount = sentencesArray.length || (wordsCount > 0 ? 1 : 0);

  const paragraphsArray = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const paragraphsCount = paragraphsArray.length || (wordsCount > 0 ? 1 : 0);

  const linesCount = text.split('\n').length;

  // Average reading speed: 225 wpm; Speaking speed: 130 wpm
  const readingTimeMin = (wordsCount / 225).toFixed(1);
  const speakingTimeMin = (wordsCount / 130).toFixed(1);

  const avgWordLength = wordsCount > 0 ? (charactersNoSpaces / wordsCount).toFixed(1) : '0.0';

  // Flesch Reading Ease estimate
  let syllableCount = 0;
  for (const w of wordsArray) {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '');
    if (clean.length <= 3) {
      syllableCount += 1;
    } else {
      const matches = clean.match(/[aeiouy]{1,2}/g);
      syllableCount += matches ? matches.length : 1;
    }
  }

  let readingScore = 100;
  if (wordsCount > 0 && sentencesCount > 0) {
    const ASL = wordsCount / sentencesCount;
    const ASW = syllableCount / wordsCount;
    const rawScore = 206.835 - 1.015 * ASL - 84.6 * ASW;
    readingScore = Math.max(0, Math.min(100, Math.round(rawScore)));
  }

  let readingLevel = 'Standard';
  if (readingScore >= 90) readingLevel = 'Very Easy (5th grade)';
  else if (readingScore >= 80) readingLevel = 'Easy (6th grade)';
  else if (readingScore >= 70) readingLevel = 'Fairly Easy (7th grade)';
  else if (readingScore >= 60) readingLevel = 'Standard (8th-9th grade)';
  else if (readingScore >= 50) readingLevel = 'Fairly Difficult (High School)';
  else if (readingScore >= 30) readingLevel = 'Difficult (College)';
  else readingLevel = 'Very Difficult (Graduate)';

  return {
    words: wordsCount,
    characters: rawLength,
    charactersNoSpaces,
    sentences: sentencesCount,
    paragraphs: paragraphsCount,
    lines: linesCount,
    readingTime: readingTimeMin,
    speakingTime: speakingTimeMin,
    avgWordLength,
    readingScore,
    readingLevel
  };
};

export const extractFrequencyInsights = (text) => {
  if (!text || !text.trim()) {
    return { topWords: [], topChars: [], keywords: [] };
  }

  // Word frequency
  const rawWords = text
    .toLowerCase()
    .replace(/[^\w\s'-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1);

  const wordFrequency = {};
  for (const w of rawWords) {
    wordFrequency[w] = (wordFrequency[w] || 0) + 1;
  }

  const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]);
  const topWords = sortedWords.slice(0, 6);

  // Character frequency (ignoring spaces)
  const charFrequency = {};
  const cleanedChars = text.replace(/[\s\r\n]/g, '');
  for (const c of cleanedChars) {
    const key = c.toUpperCase();
    charFrequency[key] = (charFrequency[key] || 0) + 1;
  }

  const topChars = Object.entries(charFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // Meaningful keywords (excluding stopwords)
  const keywords = sortedWords
    .filter(([w]) => !STOP_WORDS.has(w) && w.length >= 3)
    .slice(0, 15)
    .map(([w, count]) => ({ word: w, count }));

  return { topWords, topChars, keywords };
};

