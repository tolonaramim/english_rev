const splitIntoSentences = (text) => {
  const normalized = String(text || '').trim();
  if (!normalized) {
    return [];
  }

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

const normalizeString = (value) => (typeof value === 'string' ? value.trim() : '');

module.exports = {
  splitIntoSentences,
  normalizeString,
};
