const TRANSITION_METHODS = {
  backward: 'backward',
  forward: 'forward',
  auto: 'auto',
};

const coherenceBridge = ({ previousTopic, nextTopic, method = TRANSITION_METHODS.auto } = {}) => {
  const hasPrevious = Boolean(previousTopic);
  const hasNext = Boolean(nextTopic);
  const resolvedMethod =
    method === TRANSITION_METHODS.auto
      ? hasPrevious
        ? TRANSITION_METHODS.backward
        : hasNext
          ? TRANSITION_METHODS.forward
          : null
      : method;

  if (!resolvedMethod) {
    return '';
  }

  if (resolvedMethod === TRANSITION_METHODS.backward && hasPrevious) {
    return `Building on ${previousTopic}, here is the next step.`;
  }

  if (resolvedMethod === TRANSITION_METHODS.forward && hasNext) {
    return `Next, we will move to ${nextTopic}.`;
  }

  return '';
};

module.exports = {
  TRANSITION_METHODS,
  coherenceBridge,
};
