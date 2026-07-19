const test = require('node:test');
const assert = require('node:assert');
const TraceVersion = require('./trace.js');

test('questionCount 應該正確加總', () => {
  const ver1 = new TraceVersion(
    "ver1",
    "2026-5-18",
    [],
    [
      { name: "Step1", questions: ["Q1", "Q2"] },
      { name: "Step2", questions: ["Q3"] }
    ]
  );
  assert.strict(ver1.questionCount,3)
});