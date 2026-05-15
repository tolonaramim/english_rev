const TRANSITION_METHODS = {
  backward: 'backward',
  forward: 'forward',
  mediate: 'mediate',
  bothWay: 'both-way',
  none: 'none',
  auto: 'auto',
};

const coherenceBridge = ({ previousTopic, nextTopic, method = TRANSITION_METHODS.auto } = {}) => {
  const trimmedPrevious = typeof previousTopic === 'string' ? previousTopic.trim() : previousTopic;
  const trimmedNext = typeof nextTopic === 'string' ? nextTopic.trim() : nextTopic;
  const hasPrevious = Boolean(trimmedPrevious);
  const hasNext = Boolean(trimmedNext);
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

  if (resolvedMethod === TRANSITION_METHODS.none) {
    return '';
  }

  if (resolvedMethod === TRANSITION_METHODS.backward && hasPrevious) {
    return `Building on ${trimmedPrevious}, here is the next step.`;
  }

  if (resolvedMethod === TRANSITION_METHODS.forward && hasNext) {
    return `Next, we will move to ${trimmedNext}.`;
  }

  if (resolvedMethod === TRANSITION_METHODS.mediate && hasPrevious && hasNext) {
    return `This point links ${trimmedPrevious} to ${trimmedNext}.`;
  }

  if (resolvedMethod === TRANSITION_METHODS.bothWay && hasPrevious && hasNext) {
    return `Having wrapped up ${trimmedPrevious}, we can now proceed to ${trimmedNext}.`;
  }

  if (resolvedMethod === TRANSITION_METHODS.mediate && hasPrevious) {
    return `Building on ${trimmedPrevious}, here is the next step.`;
  }

  if (resolvedMethod === TRANSITION_METHODS.mediate && hasNext) {
    return `Next, we will move to ${trimmedNext}.`;
  }

  if (resolvedMethod === TRANSITION_METHODS.bothWay && hasPrevious) {
    return `Building on ${trimmedPrevious}, here is the next step.`;
  }

  if (resolvedMethod === TRANSITION_METHODS.bothWay && hasNext) {
    return `Next, we will move to ${trimmedNext}.`;
  }

  return '';
};

module.exports = {
  TRANSITION_METHODS,
  coherenceBridge,
};
