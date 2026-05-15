const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const replaceWithMap = (text, replacements) =>
  Object.entries(replacements).reduce((output, [source, target]) => {
    const regex = new RegExp(`\\b${escapeRegExp(source)}\\b`, 'gi');
    return output.replace(regex, target);
  }, text);

const CONTRACTION_EXPANSIONS = {
  "can't": 'cannot',
  "won't": 'will not',
  "don't": 'do not',
  "doesn't": 'does not',
  "didn't": 'did not',
  "isn't": 'is not',
  "aren't": 'are not',
  "wasn't": 'was not',
  "weren't": 'were not',
  "it's": 'it is',
  "I'm": 'I am',
  "you're": 'you are',
  "we're": 'we are',
  "they're": 'they are',
  "there's": 'there is',
  "that's": 'that is',
  "couldn't": 'could not',
  "shouldn't": 'should not',
  "wouldn't": 'would not',
};

const CONTRACTION_FORMS = Object.entries(CONTRACTION_EXPANSIONS).reduce(
  (accumulator, [contraction, expansion]) => {
    accumulator[expansion] = contraction;
    return accumulator;
  },
  {},
);

const STYLE_LEVELS = {
  formal: 'formal',
  informal: 'informal',
  colloquial: 'colloquial',
};

const TONE_PREFIXES = {
  friendly: 'Here is a friendly take: ',
  advocative: 'I recommend the following: ',
  doubtful: 'It may be worth considering that ',
  didactic: 'Key lesson: ',
  objective: '',
};

const applyStyle = (text, style) => {
  let output = String(text || '');

  if (style === STYLE_LEVELS.formal) {
    output = replaceWithMap(output, CONTRACTION_EXPANSIONS);
    output = output.replace(/!/g, '.');
  }

  if (style === STYLE_LEVELS.informal) {
    output = replaceWithMap(output, CONTRACTION_FORMS);
    output = output.replace(/\bthe reader\b/gi, 'you');
  }

  if (style === STYLE_LEVELS.colloquial) {
    output = replaceWithMap(output, CONTRACTION_FORMS);
    output = output.replace(/\bthe reader\b/gi, 'you');
    output = output.replace(/;+/g, '.');
    output = output.replace(/\. {2,}/g, '. ');
  }

  return output;
};

const applyTone = (text, tone) => {
  const prefix = TONE_PREFIXES[tone] ?? '';
  return `${prefix}${text}`;
};

const calibrateStyle = (text, { style = STYLE_LEVELS.formal, tone = 'objective' } = {}) => {
  const styled = applyStyle(text, style);
  const toned = applyTone(styled.trim(), tone);
  return toned.trim();
};

module.exports = {
  STYLE_LEVELS,
  calibrateStyle,
};
