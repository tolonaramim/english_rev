const TRANSITION_METHODS = {
  backward: 'backward',
  forward: 'forward',
  mediate: 'mediate',
  bothWay: 'bothWay',
  none: 'none',
  auto: 'auto',
};

const formatBackward = (topic) => `Building on ${topic}, here is the next step.`;
const formatForward = (topic) => `Next, we will move to ${topic}.`;
const hasContent = (value) => (typeof value === 'string' ? value.trim().length > 0 : Boolean(value));

const coherenceBridge = ({ previousTopic, nextTopic, method = TRANSITION_METHODS.auto } = {}) => {
  const trimmedPrevious = typeof previousTopic === 'string' ? previousTopic.trim() : previousTopic;
  const trimmedNext = typeof nextTopic === 'string' ? nextTopic.trim() : nextTopic;
  const hasPrevious = hasContent(trimmedPrevious);
  const hasNext = hasContent(trimmedNext);
  let resolvedMethod = method;

  if (method === TRANSITION_METHODS.auto) {
    if (hasPrevious && hasNext) {
      resolvedMethod = TRANSITION_METHODS.bothWay;
    } else if (hasPrevious) {
      resolvedMethod = TRANSITION_METHODS.backward;
    } else if (hasNext) {
      resolvedMethod = TRANSITION_METHODS.forward;
    } else {
      resolvedMethod = null;
    }
  }

  if (!resolvedMethod) {
    return '';
  }

  switch (resolvedMethod) {
    case TRANSITION_METHODS.none:
      return '';
    case TRANSITION_METHODS.backward:
      return hasPrevious ? formatBackward(trimmedPrevious) : '';
    case TRANSITION_METHODS.forward:
      return hasNext ? formatForward(trimmedNext) : '';
    case TRANSITION_METHODS.mediate:
      return hasPrevious && hasNext ? `This point links ${trimmedPrevious} to ${trimmedNext}.` : '';
    case TRANSITION_METHODS.bothWay:
      return hasPrevious && hasNext
        ? `Having wrapped up ${trimmedPrevious}, we can now proceed to ${trimmedNext}.`
        : '';
    default:
      return '';
  }
};

module.exports = {
  TRANSITION_METHODS,
  coherenceBridge,
};
