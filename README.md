# english_rev

Skill repository for advanced writing/idea-planning agents (Claude and Antigravity). It encodes the full book skill map and implements five programmable skills:

- MD-CODER analytical skill
- BDT Formatter (paragraph architect)
- Coherence Bridge (transitioning)
- Style & Tone Calibrator
- Clarity & Conciseness Editor

## Skill map

The full skill map derived from the OCR extract is stored in `src/skillMap.js` and includes:

- Purpose Planning
- Idea Development and Thought Planning
- Attractive Beginning
- Unforgettable Ending
- Variety
- Using Colorful and Lively Language
- Conciseness and Simplicity
- Directness and Clarity
- Smooth Transition: Shiny Flow of Thought
- Writing the Modern Way
- Expressing Ideas the Right Way
- Tone and Style
- The Real Birth of an Essay
- The Paragraph: The Basic Unit of Composition
- The Essay

## Agents

- `claude`: formal + objective defaults
- `antigravity`: colloquial + friendly defaults

## Usage

```js
const { agents } = require('./src');

const result = agents.claude.run({
  topic: 'remote work',
  draft: 'Remote work has grown quickly. It was adopted by many teams. It shapes culture.',
  previousTopic: 'hybrid work',
  nextTopic: 'team rituals',
});

console.log(result.output);
```
