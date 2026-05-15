const { createAgent } = require('./createAgent');

module.exports = createAgent({
  name: 'claude',
  defaults: {
    style: 'formal',
    tone: 'objective',
  },
});
