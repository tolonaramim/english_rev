const { SKILL_MAP } = require('../skillMap');
const { mdCoder } = require('../skills/mdCoder');
const { bdtFormat } = require('../skills/bdtFormatter');
const { coherenceBridge } = require('../skills/coherenceBridge');
const { calibrateStyle } = require('../skills/styleToneCalibrator');
const { clarityEdit } = require('../skills/clarityConcisenessEditor');
const { REVERSE_ORDER_MODE, reverseOrderWriter } = require('../skills/reverseOrderWriter');

const DEFAULT_MODE_INDEX = 0;
const DEFAULTS = {
  style: 'formal',
  tone: 'objective',
  mode: SKILL_MAP[DEFAULT_MODE_INDEX] ? SKILL_MAP[DEFAULT_MODE_INDEX].name : undefined,
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
      word,
      sentence,
      paragraph,
      essay,
      previousTopic,
      nextTopic,
      mode,
      style,
      tone,
      transitionMethod,
      includeLabels = true,
      includeBookContext = true,
    } = options;

    const resolvedMode = resolveMode(mode);
    const isReverseOrder = resolvedMode === REVERSE_ORDER_MODE;
    const analysis = topic ? mdCoder(topic) : null;
    const transition = coherenceBridge({
      previousTopic,
      nextTopic,
      method: transitionMethod,
    });

    const draftCandidate = typeof draft === 'string' ? draft : '';
    const essayCandidate =
      !draftCandidate && isReverseOrder && typeof essay === 'string' ? essay : '';
    let output = draftCandidate || essayCandidate;
    let sections = null;
    const reverseOrder = isReverseOrder
      ? reverseOrderWriter({
          word,
          sentence,
          paragraph,
          essay: essayCandidate || essay,
          topic,
          includeBookContext,
        })
      : null;

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
      mode: resolvedMode,
      analysis,
      transition,
      reverseOrder,
      output,
      sections,
    };
  },
  };
};

module.exports = {
  createAgent,
};
