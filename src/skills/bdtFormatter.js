const { splitIntoSentences } = require('../utils/text');

const sentenceMatches = (text) => splitIntoSentences(text);

const parseInteger = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return Math.trunc(parsed);
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const resolveBoundaries = (sentences, boundaries = {}) => {
  const total = sentences.length;
  const defaultBeginnerEnd = 1;
  const defaultDeveloperEnd = Math.max(defaultBeginnerEnd, total - 1);

  const rawBeginnerEnd = parseInteger(boundaries.beginnerEnd);
  const rawDeveloperEnd = parseInteger(boundaries.developerEnd);

  const beginnerEnd = clamp(rawBeginnerEnd ?? defaultBeginnerEnd, 1, total);
  const developerEnd = clamp(rawDeveloperEnd ?? defaultDeveloperEnd, beginnerEnd, total);

  return { beginnerEnd, developerEnd };
};

const bdtFormat = (text, options = {}) => {
  const includeLabels = options.includeLabels !== false;
  const boundaries = options.boundaries || {};
  const sentences = sentenceMatches(text).map((sentence) => sentence.trim());

  if (!sentences.length) {
    return {
      beginner: '',
      developer: '',
      terminator: '',
      formatted: '',
    };
  }

  const { beginnerEnd, developerEnd } = resolveBoundaries(sentences, boundaries);
  const beginner = sentences.slice(0, beginnerEnd).join(' ');
  const developer = sentences.slice(beginnerEnd, developerEnd).join(' ');
  const terminator = sentences.slice(developerEnd).join(' ');

  const formatted = includeLabels
    ? [
        `Beginner: ${beginner}`,
        developer ? `Developer: ${developer}` : 'Developer: (add evidence, data, or examples here)',
        terminator ? `Terminator: ${terminator}` : 'Terminator: (add a concluding line)',
      ].join('\n')
    : [beginner, developer, terminator].filter(Boolean).join('\n\n');

  return {
    beginner,
    developer,
    terminator,
    formatted,
  };
};

module.exports = {
  bdtFormat,
};
