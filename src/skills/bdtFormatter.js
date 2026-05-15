const { splitIntoSentences } = require('../utils/text');

const sentenceMatches = (text) => splitIntoSentences(text);

const bdtFormat = (text, options = {}) => {
  const includeLabels = options.includeLabels !== false;
  const sentences = sentenceMatches(text).map((sentence) => sentence.trim());

  if (!sentences.length) {
    return {
      beginner: '',
      developer: '',
      terminator: '',
      formatted: '',
    };
  }

  const beginner = sentences[0];
  const terminator = sentences.length > 1 ? sentences[sentences.length - 1] : '';
  const developer =
    sentences.length > 2
      ? sentences.slice(1, -1).join(' ')
      : sentences.length === 2
        ? sentences[1]
        : '';

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
