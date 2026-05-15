const { getBookContext } = require('../content/bookContent');
const { normalizeString } = require('../utils/text');

const REVERSE_ORDER_MODE = 'Reverse Order Writing';

const REVERSE_ORDER_STEPS = [
  {
    key: 'word',
    label: 'Word',
    guidance: 'Pick a single word that captures the central idea or emotion you want to convey.',
  },
  {
    key: 'sentence',
    label: 'Sentence',
    guidance: 'Expand the word into one clear sentence that states the core message.',
  },
  {
    key: 'paragraph',
    label: 'Paragraph',
    guidance: 'Develop the sentence into a paragraph with supporting detail or evidence.',
  },
  {
    key: 'essay',
    label: 'Essay',
    guidance: 'Grow the paragraph into a full essay with a beginning, middle, and end.',
  },
];

const defaultQueries = [
  'word',
  'sentence',
  'paragraph',
  'essay',
  'writing plan',
  'purpose plan',
];

const reverseOrderWriter = ({
  word,
  sentence,
  paragraph,
  essay,
  topic,
  includeBookContext = true,
} = {}) => {
  const inputs = {
    topic: normalizeString(topic),
    word: normalizeString(word),
    sentence: normalizeString(sentence),
    paragraph: normalizeString(paragraph),
    essay: normalizeString(essay),
  };

  const steps = REVERSE_ORDER_STEPS.map((step) => ({
    ...step,
    seed: inputs[step.key] || '',
  }));

  const bookContext = includeBookContext ? getBookContext(defaultQueries) : null;

  return {
    mode: REVERSE_ORDER_MODE,
    inputs,
    steps,
    bookContext,
  };
};

module.exports = {
  REVERSE_ORDER_MODE,
  REVERSE_ORDER_STEPS,
  reverseOrderWriter,
};
