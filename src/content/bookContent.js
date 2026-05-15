const fs = require('fs');
const path = require('path');

const BOOK_TEXT_PATH = path.join(__dirname, 'bookText.txt');
const BOOK_TEXT = fs.readFileSync(BOOK_TEXT_PATH, 'utf8');

const normalizeWhitespace = (text) => String(text || '').replace(/\s+/g, ' ').trim();

const BOOK_PAGES = BOOK_TEXT.split('\f')
  .map((pageText, index) => {
    const cleaned = normalizeWhitespace(pageText);
    if (!cleaned) {
      return null;
    }
    return {
      page: index + 1,
      text: cleaned,
    };
  })
  .filter(Boolean);

const normalize = (value) => normalizeWhitespace(value).toLowerCase();

const buildExcerpt = (text, index, length = 360) => {
  if (index < 0) {
    return '';
  }
  const start = Math.max(0, index - 120);
  const end = Math.min(text.length, index + length);
  let excerpt = text.slice(start, end).trim();
  if (start > 0) {
    excerpt = `...${excerpt}`;
  }
  if (end < text.length) {
    excerpt = `${excerpt}...`;
  }
  return excerpt;
};

const findBookMatches = (query, { limit = 3 } = {}) => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return [];
  }

  const matches = [];

  for (const page of BOOK_PAGES) {
    const index = page.text.toLowerCase().indexOf(normalizedQuery);
    if (index === -1) {
      continue;
    }

    matches.push({
      page: page.page,
      excerpt: buildExcerpt(page.text, index),
    });

    if (matches.length >= limit) {
      break;
    }
  }

  return matches;
};

const getBookContext = (queries = [], { limit = 3 } = {}) => {
  const list = Array.isArray(queries) ? queries : [queries];
  const normalizedQueries = list.map((query) => String(query || '').trim()).filter(Boolean);

  return {
    totalPages: BOOK_PAGES.length,
    queries: normalizedQueries.map((query) => ({
      query,
      matches: findBookMatches(query, { limit }),
    })),
  };
};

module.exports = {
  BOOK_TEXT,
  BOOK_PAGES,
  findBookMatches,
  getBookContext,
};
