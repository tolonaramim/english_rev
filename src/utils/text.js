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

module.exports = {
  splitIntoSentences,
};
