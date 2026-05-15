const SKILL_MAP = [
  {
    name: 'Purpose Planning',
    items: [
      'define purpose',
      'audience',
      'output type',
      'length',
      'time',
      'scope',
      'tone (friendly/advocative/doubtful/didactic/objective)',
      'style (formal/informal/colloquial)',
      'strategy',
      'writing plan',
    ],
  },
  {
    name: 'Idea Development & Thought Planning',
    items: [
      'brainstorming/brain mapping',
      'idea boosters',
      'advanced thinking techniques',
      'profound idea sources',
      'idea arrangement & detailed outlining',
      'idea development in exam hall',
      'preparing the writing plan',
    ],
  },
  {
    name: 'Attractive Beginning',
    items: [
      'flow of thought (inductive/deductive)',
      'beginning plan (amuse/surprise/involve)',
      'topic sentence (explicit/implicit)',
    ],
  },
  {
    name: 'Unforgettable Ending',
    items: [
      'sentence patterns for endings',
      'ending types (circular, pseudo-repetition, reference to beginning, termination, summary, recommendation/suggestion, rhythmic variation)',
    ],
  },
  {
    name: 'Variety',
    items: [
      'dimensions of variety',
      'variety of words',
      'sentences/patterns',
      'paragraphs',
      'variety in beginning/ending',
      'variety of variety',
    ],
  },
  {
    name: 'Colorful & Lively Language',
    items: [
      'colorful/natural phrases',
      'lively/effective language',
      'caution',
    ],
  },
  {
    name: 'Conciseness & Simplicity',
    items: [
      'choosing the right word',
      'right expression',
      'rewriting whole sentence',
      'caution',
    ],
  },
  {
    name: 'Directness & Clarity',
    items: [
      'what directness means',
      'causes of obscurity',
      'writing directly',
    ],
  },
  {
    name: 'Smooth Transition / Flow of Thought',
    items: [
      'transitions',
      'major causes of incoherence',
      'areas requiring transition',
      'transition within paragraph',
      'small-gap fillers',
      'leveling sentence patterns (OCR partial)',
    ],
  },
  {
    name: 'Writing the Modern Way',
    items: [
      'introduction',
      'avoiding clichés',
      'avoiding sexism',
    ],
  },
  {
    name: 'Expressing Ideas the Right Way',
    items: [
      'point of view',
      'something (OCR partial)',
      'emphasizing',
      'downtoning',
      'linking words/phrases',
      'rhetorical focusing/emphasis',
      'ways of focusing/emphasizing (OCR partial)',
    ],
  },
  {
    name: 'Tone & Style',
    items: [
      'how tone is manifested',
      'what style is',
      'levels (formal/colloquial/informal)',
      'comparison table',
      'choosing style',
    ],
  },
  {
    name: 'The Real Idea of an Essay',
    items: [
      'plan',
      'what the stage is about (OCR partial)',
      'fine-tuning/self-training',
    ],
  },
  {
    name: 'The Paragraph',
    items: [
      'definition',
      'body paragraph',
      'characteristics (completeness, unity, order, coherence — OCR partial)',
      'types (expository, descriptive, narrative)',
      'topic sentence',
      'beginning/ending (OCR partial)',
    ],
  },
  {
    name: 'The Essay',
    items: [
      'chapter present (details not captured in OCR excerpt)',
    ],
  },
];

const MODES = SKILL_MAP.map((entry) => entry.name);

module.exports = {
  SKILL_MAP,
  MODES,
};
