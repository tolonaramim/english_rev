const fs = require('fs');
const path = require('path');

const BOOK_TEXT_PATH = path.join(__dirname, 'bookText.txt');
const PAGE_DELIMITER = '\f';
const EXCERPT_LENGTH = 360;
const EXCERPT_CONTEXT = 120;
let BOOK_TEXT = '';

try {
  BOOK_TEXT = fs.readFileSync(BOOK_TEXT_PATH, 'utf8');
} catch (error) {
  console.warn(
    `[bookContent] Unable to read book text from ${BOOK_TEXT_PATH}: ${error.message}`,
  );
  BOOK_TEXT = '';
}

const flattenWhitespace = (text) => String(text || '').replace(/\s+/g, ' ').trim();

const BOOK_PAGES = BOOK_TEXT.split(PAGE_DELIMITER)
  .map((pageText, index) => {
    const cleaned = flattenWhitespace(pageText);
    if (!cleaned) {
      return null;
    }
    return {
      page: index + 1,
      text: cleaned,
    };
  })
  .filter(Boolean);

const BOOK_QUERY_CACHE = new Map();

const normalize = (value) => flattenWhitespace(value).toLowerCase();

const buildExcerpt = (text, index, length = EXCERPT_LENGTH) => {
  if (index < 0) {
    return '';
  }
  const start = Math.max(0, index - EXCERPT_CONTEXT);
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

  const cacheKey = `${normalizedQuery}:${limit}`;
  if (BOOK_QUERY_CACHE.has(cacheKey)) {
    return BOOK_QUERY_CACHE.get(cacheKey);
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

  BOOK_QUERY_CACHE.set(cacheKey, matches);
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
