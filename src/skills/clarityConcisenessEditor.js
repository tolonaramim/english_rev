const PASSIVE_VOICE_REGEX =
  /\b([^.!?]+?)\s+(is|are|was|were|be|been|being)\s+(\w+ed)\s+by\s+([^.!?]+?)([.!?]|$)/gi;

const PHRASE_REPLACEMENTS = [
  [/in order to/gi, 'to'],
  [/due to the fact that/gi, 'because'],
  [/at this point in time/gi, 'now'],
  [/in the event that/gi, 'if'],
  [/a large number of/gi, 'many'],
  [/a small number of/gi, 'few'],
  [/has the ability to/gi, 'can'],
  [/is able to/gi, 'can'],
  [/it is important to note that/gi, 'notably'],
];

const TAUTOLOGY_REPLACEMENTS = [
  [/each and every/gi, 'each'],
  [/basic fundamentals/gi, 'fundamentals'],
  [/future plans/gi, 'plans'],
  [/past history/gi, 'history'],
  [/final outcome/gi, 'outcome'],
];

const CLICHE_REPLACEMENTS = [
  [/at the end of the day/gi, 'ultimately'],
  [/think outside the box/gi, 'think creatively'],
  [/as luck would have it/gi, 'by chance'],
  [/the bottom line/gi, 'the main point'],
];

const FILLER_WORDS = ['actually', 'basically', 'really', 'just', 'very', 'quite'];

const normalizeWhitespace = (text) =>
  text
    .replace(/\s+/g, ' ')
    .replace(/\s+([.!?])/g, '$1')
    .trim();

const convertPassiveVoice = (text) =>
  text.replace(
    PASSIVE_VOICE_REGEX,
    (_match, subject, _verb, participle, agent, punctuation) =>
      `${agent.trim()} ${participle.trim()} ${subject.trim()}${punctuation || ''}`,
  );

const replaceByPatterns = (text, replacements) =>
  replacements.reduce((output, [pattern, replacement]) => output.replace(pattern, replacement), text);

const removeFillers = (text) => {
  const regex = new RegExp(`\\b(${FILLER_WORDS.join('|')})\\b`, 'gi');
  return text.replace(regex, '').replace(/\s{2,}/g, ' ');
};

const splitLongSentence = (sentence, limit = 160) => {
  if (sentence.length <= limit) {
    return sentence;
  }

  const parts = sentence.split(/,|;|:/).map((part) => part.trim()).filter(Boolean);
  if (parts.length <= 1) {
    return sentence;
  }

  return parts.map((part) => `${part}.`).join(' ');
};

const splitLongSentences = (text) =>
  text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => splitLongSentence(sentence))
    .join(' ');

const clarityEdit = (text = '') => {
  let output = String(text);
  output = convertPassiveVoice(output);
  output = replaceByPatterns(output, PHRASE_REPLACEMENTS);
  output = replaceByPatterns(output, TAUTOLOGY_REPLACEMENTS);
  output = replaceByPatterns(output, CLICHE_REPLACEMENTS);
  output = removeFillers(output);
  output = splitLongSentences(output);
  return normalizeWhitespace(output);
};

module.exports = {
  clarityEdit,
};
