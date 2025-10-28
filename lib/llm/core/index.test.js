const test = require('node:test');
const assert = require('node:assert/strict');
const { combineMessageParts } = require('./utils/response');

test('getResponse wraps reasoning content in think tags', () => {
  const message = {
    content: 'Final answer',
    reasoning_content: [
      { type: 'reasoning', text: 'First step. ' },
      'Second step.'
    ]
  };

  const output = combineMessageParts(message);

  assert.equal(output, '<think>First step. Second step.</think>Final answer');
});

test('getResponse handles string reasoning content', () => {
  const message = {
    content: 'Plain output',
    reasoning_content: 'Some reasoning'
  };

  const output = combineMessageParts(message);

  assert.equal(output, '<think>Some reasoning</think>Plain output');
});
