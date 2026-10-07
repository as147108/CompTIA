import test from "node:test";
import assert from "node:assert/strict";
import { getQuestionPool, getQuestionView } from "../scripts/question-view.js";

test("翻譯切換使用同一題及答案，不改動原始英文", () => {
  const question = { id: 1, answer: "AC", question_text: "English stem", options: { A: "First", C: "Third" }, translations: { "zh-Hant": { question_text: "中文題幹", options: { A: "第一", C: "第三" } } } };
  const translated = getQuestionView(question, "zh-Hant");
  assert.equal(translated.answer, "AC");
  assert.equal(translated.question_text, "中文題幹");
  assert.equal(getQuestionView(question).question_text, "English stem");
  assert.equal(question.options.A, "First");
});

test("同版本不同題組與不同版本不能互相混入", () => {
  const bank = (version, set, questions) => ({ metadata: { exam_code: version, set_id: set }, questions });
  const banks = [bank("SY0-701", "01", [{ id: 1, domain: 1 }, { id: 2, domain: 2 }]), bank("SY0-701", "02", [{ id: 3, domain: 1 }]), bank("SY0-801", "01", [{ id: 4, domain: 1 }])];
  assert.deepEqual(getQuestionPool(banks, "SY0-701", "01", "1").map((question) => question.id), [1]);
  assert.deepEqual(getQuestionPool(banks, "SY0-701", "02").map((question) => question.id), [3]);
});
