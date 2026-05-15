const { splitIntoSentences } = require('../utils/text');

const MAX_SENTENCE_LENGTH = 160;
const BE_FORMS = ['is', 'are', 'was', 'were', 'be', 'been', 'being'];

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

const FILLER_WORDS = ['actually', 'basically', 'really', 'very', 'quite'];

const normalizeWhitespace = (text) => {
  const input = String(text);
  let output = '';
  let lastWasSpace = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    if (/\s/.test(char)) {
      if (!lastWasSpace) {
        output += ' ';
        lastWasSpace = true;
      }
    } else {
      if (lastWasSpace && /[.!?]/.test(char)) {
        output = output.slice(0, -1);
      }
      output += char;
      lastWasSpace = false;
    }
  }

  return output.trim();
};

const isRegularPastParticiple = (word) => word.toLowerCase().endsWith('ed');

const convertPassiveSentence = (sentence) => {
  const lowered = sentence.toLowerCase();
  const byIndex = lowered.lastIndexOf(' by ');
  if (byIndex === -1) {
    return sentence;
  }

  let beIndex = -1;
  let beForm = '';
  BE_FORMS.forEach((form) => {
    const index = lowered.indexOf(` ${form} `);
    if (index !== -1 && (beIndex === -1 || index < beIndex)) {
      beIndex = index;
      beForm = form;
    }
  });

  if (beIndex === -1 || beIndex > byIndex) {
    return sentence;
  }

  const subject = sentence.slice(0, beIndex).trim();
  const beToken = ` ${beForm} `;
  const verbSegment = sentence.slice(beIndex + beToken.length, byIndex).trim();
  const agentSegment = sentence.slice(byIndex + 4).trim();

  const verbTokens = verbSegment.split(/\s+/);
  const participle = verbTokens[verbTokens.length - 1];
  if (!participle || !isRegularPastParticiple(participle)) {
    return sentence;
  }

  const punctuationMatch = agentSegment.match(/([.!?])$/);
  const punctuation = punctuationMatch ? punctuationMatch[1] : '';
  const agent = punctuationMatch ? agentSegment.slice(0, -1).trim() : agentSegment;

  if (!subject || !agent) {
    return sentence;
  }

  return `${agent} ${verbSegment} ${subject}${punctuation}`.trim();
};

const convertPassiveVoice = (text) =>
  splitIntoSentences(text)
    .map((sentence) => convertPassiveSentence(sentence))
    .join(' ');

const replaceByPatterns = (text, replacements) =>
  replacements.reduce((output, [pattern, replacement]) => output.replace(pattern, replacement), text);

const removeFillers = (text) => {
  const regex = new RegExp(`\\b(${FILLER_WORDS.join('|')})\\b`, 'gi');
  return text.replace(regex, '').replace(/\s{2,}/g, ' ');
};

const splitLongSentence = (sentence, limit = MAX_SENTENCE_LENGTH) => {
  if (sentence.length <= limit) {
    return sentence;
  }

  const trimmed = sentence.trim();
  const punctuationMatch = trimmed.match(/([.!?])$/);
  const punctuation = punctuationMatch ? punctuationMatch[1] : '.';
  const core = punctuationMatch ? trimmed.slice(0, -1) : trimmed;
  const rewritten = core.replace(/[,;:]\s+/g, '. ').trim();

  if (rewritten === core) {
    return sentence;
  }

  return `${rewritten}${punctuation}`;
};

const splitLongSentences = (text) =>
  splitIntoSentences(text)
    .map((sentence) => splitLongSentence(sentence))
    .join(' ');

const clarityEdit = (text = '', options = {}) => {
  const {
    convertPassive = true,
    replacePhrases = true,
    replaceTautologies = true,
    replaceCliches = true,
    removeFillers: shouldRemoveFillers = true,
    splitLong = true,
  } = options;
  let output = String(text);
  if (convertPassive) {
    output = convertPassiveVoice(output);
  }
  if (replacePhrases) {
    output = replaceByPatterns(output, PHRASE_REPLACEMENTS);
  }
  if (replaceTautologies) {
    output = replaceByPatterns(output, TAUTOLOGY_REPLACEMENTS);
  }
  if (replaceCliches) {
    output = replaceByPatterns(output, CLICHE_REPLACEMENTS);
  }
  if (shouldRemoveFillers) {
    output = removeFillers(output);
  }
  if (splitLong) {
    output = splitLongSentences(output);
  }
  return normalizeWhitespace(output);
};

module.exports = {
  clarityEdit,
};
