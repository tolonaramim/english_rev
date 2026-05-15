const { createAgent } = require('./createAgent');

module.exports = createAgent({
  name: 'antigravity',
  defaults: {
    style: 'colloquial',
    tone: 'friendly',
  },
});
