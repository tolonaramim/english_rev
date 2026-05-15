const { SKILL_MAP } = require('../skillMap');
const { mdCoder } = require('../skills/mdCoder');
const { bdtFormat } = require('../skills/bdtFormatter');
const { coherenceBridge } = require('../skills/coherenceBridge');
const { calibrateStyle } = require('../skills/styleToneCalibrator');
const { clarityEdit } = require('../skills/clarityConcisenessEditor');

const DEFAULTS = {
  style: 'formal',
  tone: 'objective',
  mode: SKILL_MAP[0] ? SKILL_MAP[0].name : undefined,
};

const resolveMode = (mode) => {
  if (!mode) {
    return DEFAULTS.mode;
  }

  const match = SKILL_MAP.find(
    (entry) => entry.name.toLowerCase() === String(mode).toLowerCase(),
  );

  return match ? match.name : mode;
};

const createAgent = ({ name, defaults = {} } = {}) => {
  const resolvedDefaults = {
    ...DEFAULTS,
    ...defaults,
  };

  return {
    name,
    defaults: resolvedDefaults,
    skillMap: SKILL_MAP,
    modes: SKILL_MAP.map((entry) => entry.name),
    run(options = {}) {
      const {
        topic,
        draft,
        previousTopic,
        nextTopic,
        mode,
        style,
        tone,
        transitionMethod,
        includeLabels = true,
      } = options;

      const analysis = topic ? mdCoder(topic) : null;
      const transition = coherenceBridge({
        previousTopic,
        nextTopic,
        method: transitionMethod,
      });

      let output = typeof draft === 'string' ? draft : '';
      let sections = null;

      if (output) {
        sections = bdtFormat(output, { includeLabels });
        output = sections.formatted;
        output = clarityEdit(output);
        output = calibrateStyle(output, {
          style: style || resolvedDefaults.style,
          tone: tone || resolvedDefaults.tone,
        });
      }

      return {
        mode: resolveMode(mode),
        analysis,
        transition,
        output,
        sections,
      };
    },
  };
};

module.exports = {
  createAgent,
};
