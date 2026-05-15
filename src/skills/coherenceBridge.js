const TRANSITION_METHODS = {
  backward: 'backward',
  forward: 'forward',
  mediate: 'mediate',
  bothWay: 'bothWay',
  none: 'none',
  auto: 'auto',
};

const TRANSITION_MARKER_SETS = {
  classic: {
    backward: [
      ({ previousTopic }) => `Building on ${previousTopic}, here is the next step.`,
      ({ previousTopic }) => `With ${previousTopic} in place, we can continue.`,
    ],
    forward: [
      ({ nextTopic }) => `Next, we will move to ${nextTopic}.`,
      ({ nextTopic }) => `Turning to ${nextTopic}, we can extend the point.`,
    ],
    mediate: [
      ({ previousTopic, nextTopic }) => `This point links ${previousTopic} to ${nextTopic}.`,
      ({ previousTopic, nextTopic }) => `This bridge connects ${previousTopic} with ${nextTopic}.`,
    ],
    bothWay: [
      ({ previousTopic, nextTopic }) =>
        `Having wrapped up ${previousTopic}, we can now proceed to ${nextTopic}.`,
      ({ previousTopic, nextTopic }) => `With ${previousTopic} in mind, we can turn to ${nextTopic}.`,
    ],
  },
  markers: {
    backward: [
      ({ previousTopic }) => `Moreover, ${previousTopic} sets up the next point.`,
      ({ previousTopic }) => `Furthermore, ${previousTopic} leads us forward.`,
    ],
    forward: [
      ({ nextTopic }) => `Next, ${nextTopic} comes into focus.`,
      ({ nextTopic }) => `In the next step, we will address ${nextTopic}.`,
    ],
    mediate: [
      ({ previousTopic, nextTopic }) => `Meanwhile, this links ${previousTopic} and ${nextTopic}.`,
      ({ previousTopic, nextTopic }) => `As a result, ${previousTopic} connects to ${nextTopic}.`,
    ],
    bothWay: [
      ({ previousTopic, nextTopic }) => `With that in mind, ${previousTopic} leads to ${nextTopic}.`,
      ({ previousTopic, nextTopic }) => `Accordingly, ${previousTopic} opens the door to ${nextTopic}.`,
    ],
  },
  reference: {
    backward: [
      ({ previousTopic }) => `This focus on ${previousTopic} prepares the next step.`,
      ({ previousTopic }) => `That emphasis on ${previousTopic} carries the discussion forward.`,
    ],
    forward: [
      ({ nextTopic }) => `This sets up ${nextTopic}.`,
      ({ nextTopic }) => `That brings us to ${nextTopic}.`,
    ],
    mediate: [
      ({ previousTopic, nextTopic }) => `This link between ${previousTopic} and ${nextTopic} keeps the flow.`,
      ({ previousTopic, nextTopic }) => `That connection ties ${previousTopic} to ${nextTopic}.`,
    ],
    bothWay: [
      ({ previousTopic, nextTopic }) =>
        `This discussion of ${previousTopic} now points to ${nextTopic}.`,
      ({ previousTopic, nextTopic }) => `That thread from ${previousTopic} moves us to ${nextTopic}.`,
    ],
  },
};

const pickTemplate = (templates = [], markerIndex = 0) => {
  if (!templates.length) {
    return null;
  }
  const normalizedIndex = markerIndex % templates.length;
  const safeIndex = normalizedIndex < 0 ? templates.length + normalizedIndex : normalizedIndex;
  return templates[safeIndex];
};

const resolveMarkerSet = (markerSet) =>
  TRANSITION_MARKER_SETS[markerSet] || TRANSITION_MARKER_SETS.classic;
const hasValidContent = (value) =>
  typeof value === 'string' ? value.trim().length > 0 : Boolean(value);

const coherenceBridge = ({
  previousTopic,
  nextTopic,
  method = TRANSITION_METHODS.auto,
  markerSet,
  markerIndex = 0,
} = {}) => {
  const trimmedPrevious = typeof previousTopic === 'string' ? previousTopic.trim() : previousTopic;
  const trimmedNext = typeof nextTopic === 'string' ? nextTopic.trim() : nextTopic;
  const hasPrevious = hasValidContent(trimmedPrevious);
  const hasNext = hasValidContent(trimmedNext);
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

  const markerTemplates = resolveMarkerSet(markerSet);
  const template = pickTemplate(markerTemplates[resolvedMethod], markerIndex);
  if (!template) {
    return '';
  }

  if (resolvedMethod === TRANSITION_METHODS.backward) {
    return hasPrevious ? template({ previousTopic: trimmedPrevious }) : '';
  }

  if (resolvedMethod === TRANSITION_METHODS.forward) {
    return hasNext ? template({ nextTopic: trimmedNext }) : '';
  }

  if (resolvedMethod === TRANSITION_METHODS.mediate || resolvedMethod === TRANSITION_METHODS.bothWay) {
    return hasPrevious && hasNext
      ? template({ previousTopic: trimmedPrevious, nextTopic: trimmedNext })
      : '';
  }

  return '';
};

module.exports = {
  TRANSITION_METHODS,
  TRANSITION_MARKER_SETS,
  coherenceBridge,
};
