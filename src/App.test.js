import { render, screen } from '@testing-library/react';
import App from './App';
import {
  toUppercase,
  toLowercase,
  toTitleCase,
  toCamelCase,
  toSnakeCase,
  removeExtraSpaces,
  formatJSON,
  calculateStatistics
} from './utils/textOperations';

describe('Textora Core Application Tests', () => {
  test('renders Textora Studio brand and workspace', () => {
    render(<App />);
    const brandElements = screen.getAllByText(/Textora/i);
    expect(brandElements.length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText(/Type or paste your text here/i)).toBeInTheDocument();
  });

  test('textOperations accurately transforms case styles', () => {
    expect(toUppercase('hello world')).toBe('HELLO WORLD');
    expect(toLowercase('HELLO WORLD')).toBe('hello world');
    expect(toTitleCase('the quick brown fox')).toBe('The Quick Brown Fox');
    expect(toCamelCase('user profile id')).toBe('userProfileId');
    expect(toSnakeCase('user profile id')).toBe('user_profile_id');
  });

  test('textOperations normalizes spaces and formats JSON', () => {
    expect(removeExtraSpaces('hello    world   again')).toBe('hello world again');
    expect(formatJSON('{"key":"value"}')).toBe('{\n  "key": "value"\n}');
  });

  test('calculateStatistics computes words, characters, and reading time', () => {
    const stats = calculateStatistics('Hello world! This is a test.');
    expect(stats.words).toBe(6);
    expect(stats.sentences).toBe(2);
    expect(parseFloat(stats.readingTime)).toBeGreaterThanOrEqual(0);
  });
});

