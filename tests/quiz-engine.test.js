import test from "node:test";
import assert from "node:assert/strict";
import { isCorrectAnswer, pickQuestionSet, shuffle, summarizeResults } from "../scripts/quiz-engine.js";

test("複選答案順序不影響結果，漏選或多選不給分", () => {
  assert.equal(isCorrectAnswer("AC", ["C", "A"]), true);
  assert.equal(isCorrectAnswer("AC", ["A"]), false);
  assert.equal(isCorrectAnswer("AC", ["A", "B", "C"]), false);
  assert.equal(isCorrectAnswer("B", []), false);
});
test("題數上限不超出題庫，抽題不修改原始陣列", () => {
  const pool = [{ id: 1 }, { id: 2 }, { id: 3 }];
  assert.deepEqual(pickQuestionSet(pool, "2", false), pool.slice(0, 2));
  assert.equal(pickQuestionSet(pool, "90", true).length, 3);
  assert.equal(pickQuestionSet(pool, "all", true).length, 3);
  assert.deepEqual(pool.map((question) => question.id), [1, 2, 3]);
});
test("隨機排序保留完整題目集合", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original, () => 0);
  assert.notDeepEqual(result, original);
  assert.deepEqual([...result].sort(), original);
});
test("摘要處理全對、部分錯誤與空結果", () => {
  assert.deepEqual(summarizeResults([]), { total: 0, correct: 0, wrong: 0, rate: 0 });
  assert.deepEqual(summarizeResults([{ isCorrect: true }, { isCorrect: false }, { isCorrect: true }]), { total: 3, correct: 2, wrong: 1, rate: 67 });
});
