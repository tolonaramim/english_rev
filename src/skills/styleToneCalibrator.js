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

const TONE_CATEGORY_PREFIXES = {
  subject: {
    respectful: 'With respect to the subject, ',
    critical: 'Critically, ',
    appreciative: 'Appreciatively, ',
    neutral: '',
  },
  reader: {
    direct: 'For you, ',
    inclusive: 'For the reader, ',
    guiding: 'To guide the reader, ',
  },
  self: {
    humble: 'From a humble perspective, ',
    confident: 'With confidence, ',
    reflective: 'In reflection, ',
  },
  purpose: {
    inform: 'To inform, ',
    persuade: 'To persuade, ',
    reflect: 'To reflect, ',
  },
};

const buildToneProfilePrefix = (toneProfile) => {
  if (!toneProfile || typeof toneProfile !== 'object') {
    return '';
  }

  const parts = [];

  Object.entries(toneProfile).forEach(([category, value]) => {
    if (!value) {
      return;
    }
    const categoryMap = TONE_CATEGORY_PREFIXES[category];
    if (categoryMap && categoryMap[value]) {
      parts.push(categoryMap[value]);
      return;
    }
    if (typeof value === 'string') {
      parts.push(value.endsWith(' ') ? value : `${value} `);
    }
  });

  return parts.join('');
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

const applyTone = (text, tone, toneProfile) => {
  const resolvedProfile =
    toneProfile || (tone && typeof tone === 'object' && !Array.isArray(tone) ? tone : null);
  const profilePrefix = buildToneProfilePrefix(resolvedProfile);
  if (profilePrefix) {
    return `${profilePrefix}${text}`;
  }
  const prefix = TONE_PREFIXES[tone] ?? '';
  return `${prefix}${text}`;
};

const calibrateStyle = (
  text,
  { style = STYLE_LEVELS.formal, tone = 'objective', toneProfile } = {},
) => {
  const styled = applyStyle(text, style);
  const tonedText = applyTone(styled.trim(), tone, toneProfile);
  return tonedText.trim();
};

module.exports = {
  STYLE_LEVELS,
  TONE_PREFIXES,
  TONE_CATEGORY_PREFIXES,
  calibrateStyle,
};
