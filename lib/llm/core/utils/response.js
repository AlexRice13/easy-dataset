const normalizeReasoningContent = (reasoning) => {
  if (!reasoning) {
    return '';
  }
  if (typeof reasoning === 'string') {
    return reasoning;
  }
  if (Array.isArray(reasoning)) {
    return reasoning
      .map((item) => {
        if (!item) {
          return '';
        }
        if (typeof item === 'string') {
          return item;
        }
        if (typeof item === 'object') {
          if (typeof item.text === 'string') {
            return item.text;
          }
          if (typeof item.content === 'string') {
            return item.content;
          }
        }
        return '';
      })
      .join('');
  }
  return '';
};

const combineMessageParts = (message = {}) => {
  const { content = '', reasoning_content: reasoningContent } = message;
  const reasoning = normalizeReasoningContent(reasoningContent);
  const combined = `${reasoning ? `<think>${reasoning}</think>` : ''}${content}`;
  return combined;
};

module.exports = {
  normalizeReasoningContent,
  combineMessageParts
};
