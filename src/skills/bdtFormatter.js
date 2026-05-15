const sentenceMatches = (text) => {
  if (!text) {
    return [];
  }

  const normalized = String(text).trim();
  const sentences = [];
  let buffer = '';

  for (const char of normalized) {
    buffer += char;
    if ('.!?'.includes(char)) {
      const trimmed = buffer.trim();
      if (trimmed) {
        sentences.push(trimmed);
      }
      buffer = '';
    }
  }

  if (buffer.trim()) {
    sentences.push(buffer.trim());
  }

  return sentences;
};

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
  const terminator = sentences.length > 1 ? sentences[sentences.length - 1] : sentences[0];
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
        `Terminator: ${terminator}`,
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
