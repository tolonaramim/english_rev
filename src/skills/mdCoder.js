const MD_CODER_DIMENSIONS = [
  {
    key: 'merits',
    label: 'Merits',
    prompt: (topic) => `List the key benefits and strengths of ${topic}.`,
  },
  {
    key: 'demerits',
    label: 'Demerits',
    prompt: (topic) => `Identify the drawbacks, limitations, or risks of ${topic}.`,
  },
  {
    key: 'causes',
    label: 'Causes',
    prompt: (topic) => `Describe the causes or drivers that led to ${topic}.`,
  },
  {
    key: 'origin',
    label: 'Origin',
    prompt: (topic) => `Explain the origin or background of ${topic}.`,
  },
  {
    key: 'definition',
    label: 'Definition',
    prompt: (topic) => `Provide a clear, concise definition of ${topic}.`,
  },
  {
    key: 'effects',
    label: 'Effects',
    prompt: (topic) => `Outline the impacts and consequences of ${topic}.`,
  },
  {
    key: 'remedies',
    label: 'Remedies',
    prompt: (topic) => `Suggest remedies, solutions, or responses related to ${topic}.`,
  },
  {
    key: 'abilities',
    label: 'Abilities or Capabilities',
    prompt: (topic) => `Describe the abilities or capabilities associated with ${topic}.`,
  },
  {
    key: 'characteristics',
    label: 'Characteristics',
    prompt: (topic) => `Highlight the defining characteristics or traits of ${topic}.`,
  },
  {
    key: 'suggestions',
    label: 'Suggestions',
    prompt: (topic) => `Offer suggestions or recommendations related to ${topic}.`,
  },
];

const MULTI_TERM_DIMENSIONS = [
  {
    key: 'dependency',
    label: 'Dependency',
    prompt: (topicList) => `Explain any dependencies or relationships among ${topicList}.`,
  },
  {
    key: 'differences',
    label: 'Differences',
    prompt: (topicList) => `Compare and contrast ${topicList}.`,
  },
  {
    key: 'otherFactors',
    label: 'Other Relevant Factors',
    prompt: (topicList) => `Identify other relevant factors that influence ${topicList}.`,
  },
];

const resolveMdCoderInput = (topic, options = {}) => {
  if (topic && typeof topic === 'object' && !Array.isArray(topic)) {
    return {
      topic: topic.topic,
      topicTerms: topic.topicTerms ?? topic.terms ?? options.topicTerms,
    };
  }

  return { topic, topicTerms: options.topicTerms };
};

const normalizeTopicTerms = (terms) => {
  if (!terms) {
    return [];
  }

  if (Array.isArray(terms)) {
    return terms.map((term) => String(term).trim()).filter(Boolean);
  }

  if (typeof terms === 'string') {
    return terms
      .split(',')
      .map((term) => term.trim())
      .filter(Boolean);
  }

  const normalized = String(terms).trim();
  return normalized ? [normalized] : [];
};

const formatTopicList = (terms) => {
  if (!terms.length) {
    return '';
  }
  if (terms.length === 1) {
    return terms[0];
  }
  if (terms.length === 2) {
    return `${terms[0]} and ${terms[1]}`;
  }

  return `${terms.slice(0, -1).join(', ')}, and ${terms[terms.length - 1]}`;
};

const buildMultiTermPrompts = (terms) => {
  const topicList = formatTopicList(terms);
  return MULTI_TERM_DIMENSIONS.map((dimension) => ({
    key: dimension.key,
    label: dimension.label,
    prompt: dimension.prompt(topicList),
  }));
};

const buildMdCoderPrompt = (topic, options = {}) => {
  const { topic: resolvedTopic, topicTerms } = resolveMdCoderInput(topic, options);
  const cleaned = String(resolvedTopic || '').trim();
  if (!cleaned) {
    throw new Error('MD-CODER requires a non-empty topic.');
  }

  const cleanedTerms = normalizeTopicTerms(topicTerms);
  const multiTermPrompts = cleanedTerms.length > 1 ? buildMultiTermPrompts(cleanedTerms) : [];

  const prompts = MD_CODER_DIMENSIONS.map((dimension) => ({
    key: dimension.key,
    label: dimension.label,
    prompt: dimension.prompt(cleaned),
  })).concat(multiTermPrompts);

  return {
    topic: cleaned,
    topicTerms: cleanedTerms,
    prompts,
    combinedPrompt: prompts.map((entry) => `${entry.label}: ${entry.prompt}`).join('\n'),
  };
};

const mdCoder = (topic, options = {}) => {
  const { prompts, combinedPrompt, topic: cleaned, topicTerms } = buildMdCoderPrompt(topic, options);

  const angles = prompts.reduce((accumulator, entry) => {
    accumulator[entry.key] = entry.prompt;
    return accumulator;
  }, {});

  return {
    topic: cleaned,
    topicTerms,
    angles,
    prompts,
    combinedPrompt,
  };
};

module.exports = {
  MD_CODER_DIMENSIONS,
  MULTI_TERM_DIMENSIONS,
  buildMdCoderPrompt,
  mdCoder,
};
