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
];

const buildMdCoderPrompt = (topic) => {
  const cleaned = String(topic || '').trim();
  if (!cleaned) {
    throw new Error('MD-CODER requires a non-empty topic.');
  }

  const prompts = MD_CODER_DIMENSIONS.map((dimension) => ({
    key: dimension.key,
    label: dimension.label,
    prompt: dimension.prompt(cleaned),
  }));

  return {
    topic: cleaned,
    prompts,
    combinedPrompt: prompts.map((entry) => `${entry.label}: ${entry.prompt}`).join('\n'),
  };
};

const mdCoder = (topic) => {
  const { prompts, combinedPrompt, topic: cleaned } = buildMdCoderPrompt(topic);

  const angles = prompts.reduce((accumulator, entry) => {
    accumulator[entry.key] = entry.prompt;
    return accumulator;
  }, {});

  return {
    topic: cleaned,
    angles,
    prompts,
    combinedPrompt,
  };
};

module.exports = {
  MD_CODER_DIMENSIONS,
  buildMdCoderPrompt,
  mdCoder,
};
