const SKILL_MAP = [
  {
    name: 'Purpose Planning',
    items: [
      'the purpose',
      'purpose planning',
    ],
  },
  {
    name: 'Idea Development and Thought Planning',
    items: [
      'how to start thinking',
      'brainstorming or brain mapping',
      'idea boosters',
      'advanced thinking techniques',
      'profound idea sources',
      'idea arrangement and detailed outlining',
      'idea development in the exam hall',
      'preparing the writing plan',
    ],
  },
  {
    name: 'Attractive Beginning',
    items: [
      'attractive beginning',
      'flow of thought: inductive',
      'flow of thought: deductive',
      'beginning plan: amuse the reader',
      'beginning plan: surprise the reader',
      'beginning plan: involve the reader',
      'topic sentence: explicit',
      'topic sentence: implicit',
    ],
  },
  {
    name: 'Unforgettable Ending',
    items: [
      'possible sentence patterns for a nice ending',
      'circular ending',
      'ending by pseudo-repetition',
      'ending by reference to the beginning',
      'termination',
      'summary ending',
      'ending by recommendation or suggestion',
      'ending by rhythmic variation',
    ],
  },
  {
    name: 'Variety',
    items: [
      'dimensions of variety',
      'variety of words',
      'variety of sentences and patterns',
      'variety of paragraphs',
      'variety and the beginning',
      'variety and the ending',
      'variety of variety',
    ],
  },
  {
    name: 'Using Colorful and Lively Language',
    items: [
      'colorful and natural phrases',
      'lively and effective words',
      'a word of caution',
    ],
  },
  {
    name: 'Conciseness and Simplicity',
    items: [
      'choosing the right word',
      'choosing the right expression',
      'rewriting the whole sentence',
      'a word of caution',
    ],
  },
  {
    name: 'Directness and Clarity',
    items: [
      "what's meant by directness and how obscurity occurs",
      'tactics for writing directly',
    ],
  },
  {
    name: 'Smooth Transition: Shiny Flow of Thought',
    items: [
      "what's transition",
      'major causes of incoherence',
      'areas requiring transition',
      'transition within the paragraph',
      'filling a small gap in the thought',
      'cutting out irrelevant words',
      'leveling sentence patterns',
      'using transition markers',
      'using reference',
      'transition between paragraphs',
      'backward transition',
      'forward transition',
      'mediate transition',
      'both-way transition',
      'no use of transition',
      'conclusion',
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
      'expressing the point of view',
      'focusing on something',
      'emphasizing',
      'downtoning',
      'linking words and phrases',
      'rhetorical ways of focusing or highlighting, emphasizing, and creating dramatic effect',
      'other ways of focusing and emphasizing',
    ],
  },
  {
    name: 'Tone and Style',
    items: [
      "what's tone",
      'tone toward subject',
      'tone toward reader',
      'tone toward self',
      'tone and purpose',
      'tone and style',
      'how tone is manifested',
      "what's style",
      'formal style',
      'colloquial style',
      'informal style',
      'comparison table',
      'which style to choose',
    ],
  },
  {
    name: 'The Real Birth of an Essay',
    items: [
      'the plans revisited',
      'what this chapter is about',
      'fine-tuning your writing: an exhaustive self-training',
    ],
  },
  {
    name: 'The Paragraph: The Basic Unit of Composition',
    items: [
      "what's a paragraph",
      'the body of the paragraph',
      'characteristics of a good paragraph',
      'completeness',
      'unity',
      'order',
      'coherence',
      'types of paragraphs: expository',
      'types of paragraphs: descriptive',
      'types of paragraphs: narrative',
      'topic sentence and the paragraph',
      'paragraph development methods',
      'enumeration',
      'comparison and contrasts',
      'cause and effect',
      'classification',
      'illustration',
      'description and narration',
    ],
  },
  {
    name: 'The Essay',
    items: [
      'the beginning and the ending',
      'writing plan revisited',
    ],
  },
];

const MODES = SKILL_MAP.map((entry) => entry.name);

module.exports = {
  SKILL_MAP,
  MODES,
};
