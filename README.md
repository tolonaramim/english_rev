# english_rev

Skill repository for advanced writing/idea-planning agents (Claude and Antigravity). It encodes the OCR skill map and implements five programmable skills:

- MD-CODER analytical skill
- BDT Formatter (paragraph architect)
- Coherence Bridge (transitioning)
- Style & Tone Calibrator
- Clarity & Conciseness Editor

## Skill map

The full skill map derived from the OCR extract is stored in `src/skillMap.js` and includes:

- Purpose Planning
- Idea Development & Thought Planning
- Attractive Beginning
- Unforgettable Ending
- Variety
- Colorful & Lively Language
- Conciseness & Simplicity
- Directness & Clarity
- Smooth Transition / Flow of Thought
- Writing the Modern Way
- Expressing Ideas the Right Way
- Tone & Style
- The Real Idea of an Essay
- The Paragraph
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
