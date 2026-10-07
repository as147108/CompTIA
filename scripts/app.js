import { EXAM_FILES, VERSIONS } from "./config.js";
import { isCorrectAnswer, pickQuestionSet, summarizeResults } from "./quiz-engine.js";
import { getQuestionPool, getQuestionView } from "./question-view.js";

const elementIds = ["bankStatus", "sessionStatus", "settingsPanel", "settingsForm", "settingsSummaryText", "versionSelect", "setSelect", "categorySelect", "limitSelect", "shuffleInput", "startButton", "loadingView", "errorView", "quizView", "resultView", "versionTag", "objectiveTag", "typeTag", "progressText", "progressBar", "progressFill", "domainText", "caseBox", "caseTitle", "caseDescription", "questionText", "selectionHint", "optionsList", "checkButton", "nextButton", "feedbackBox", "feedbackTitle", "feedbackText", "optionReasons", "referenceList", "resultTitle", "resultSummary", "scoreValue", "rateValue", "wrongValue", "restartButton", "retryWrongButton", "changeButton", "reviewList", "translateButton", "languageStatus", "reviewTranslateButton"];
const els = Object.fromEntries(elementIds.map((id) => [id, document.getElementById(id)]));
const state = { banks: [], active: [], index: 0, selected: new Set(), answered: false, results: [], version: "", setId: "", language: "en" };

els.settingsForm.addEventListener("submit", (event) => { event.preventDefault(); startPractice(); });
els.versionSelect.addEventListener("change", populateSets);
els.setSelect.addEventListener("change", populateDomains);
els.translateButton.addEventListener("click", () => {
  state.language = state.language === "en" ? "zh-Hant" : "en";
  refreshLanguage();
});
els.reviewTranslateButton.addEventListener("click", () => {
  state.language = state.language === "en" ? "zh-Hant" : "en";
  showResult(false);
});
els.categorySelect.addEventListener("change", updateSettingsSummary);
els.limitSelect.addEventListener("change", updateSettingsSummary);
els.shuffleInput.addEventListener("change", updateSettingsSummary);
els.checkButton.addEventListener("click", checkAnswer);
els.nextButton.addEventListener("click", () => {
  if (!state.answered) return;
  if (state.index + 1 === state.active.length) showResult();
  else { state.index += 1; renderQuestion(); }
});
els.restartButton.addEventListener("click", () => beginSession(pickQuestionSet(state.active, "all", els.shuffleInput.checked), state.version));
els.retryWrongButton.addEventListener("click", () => {
  const questions = state.results.filter((result) => !result.isCorrect).map((result) => result.question);
  if (questions.length) beginSession(pickQuestionSet(questions, "all", els.shuffleInput.checked), state.version);
});
els.changeButton.addEventListener("click", () => { els.settingsPanel.open = true; els.versionSelect.focus(); });

initialize();

async function initialize() {
  try {
    const documents = await Promise.all(EXAM_FILES.map(async (file) => {
      const response = await fetch(`exam/json/${file}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`${file} HTTP ${response.status}`);
      const data = await response.json();
      if (!VERSIONS[data.metadata?.exam_code] || !Array.isArray(data.questions) || !data.questions.length) throw new Error(`${file} 題庫格式錯誤`);
      if (data.questions.some((question) => question.exam_codes?.length !== 1 || question.exam_codes[0] !== data.metadata.exam_code)) throw new Error(`${file} 題目版本與題庫不一致`);
      return data;
    }));
    state.banks = documents;
    const total = documents.reduce((count, data) => count + data.questions.length, 0);
    els.bankStatus.textContent = `題庫 ${total} 題 / ${documents.length} 組 / ${new Set(documents.map((bank) => bank.metadata.exam_code)).size} 版本`;
    for (const id of ["versionSelect", "setSelect", "categorySelect", "limitSelect", "shuffleInput", "startButton"]) els[id].disabled = false;
    populateSets();
    startPractice();
  } catch (error) {
    els.bankStatus.textContent = "題庫載入失敗";
    els.errorView.textContent = `無法讀取題庫：${error.message}。請使用 npm start 開啟網站。`;
    showView("error");
  }
}

function populateSets() {
  const sets = state.banks.filter((bank) => bank.metadata.exam_code === els.versionSelect.value);
  els.setSelect.replaceChildren(...sets.map((bank) => new Option(`${bank.metadata.set_id} — ${bank.metadata.set_title || bank.metadata.exam_name}（${bank.questions.length} 題）`, bank.metadata.set_id)));
  populateDomains();
}

function populateDomains() {
  const version = els.versionSelect.value;
  const questions = getQuestionPool(state.banks, version, els.setSelect.value);
  els.categorySelect.replaceChildren(new Option(`全部（${questions.length} 題）`, "all"));
  VERSIONS[version].domains.forEach((name, index) => {
    const count = questions.filter((question) => question.domain === index + 1).length;
    els.categorySelect.append(new Option(`${index + 1}. ${name}（${count} 題）`, String(index + 1)));
  });
  updateSettingsSummary();
}

function getPool() {
  return getQuestionPool(state.banks, els.versionSelect.value, els.setSelect.value, els.categorySelect.value);
}

function updateSettingsSummary() {
  const pool = getPool();
  const count = els.limitSelect.value === "all" ? pool.length : Math.min(Number(els.limitSelect.value), pool.length);
  els.settingsSummaryText.textContent = `${els.versionSelect.value}｜Set ${els.setSelect.value}｜${count} 題｜${els.shuffleInput.checked ? "隨機" : "依序"}`;
}

function startPractice() {
  state.setId = els.setSelect.value;
  beginSession(pickQuestionSet(getPool(), els.limitSelect.value, els.shuffleInput.checked), els.versionSelect.value);
}

function beginSession(questions, version) {
  if (!questions.length) return;
  state.active = questions;
  state.version = version;
  state.index = 0;
  state.results = [];
  state.language = "en";
  els.settingsPanel.open = false;
  showView("quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = state.active[state.index];
  state.answered = false;
  state.selected = new Set();
  state.language = "en";
  els.versionTag.textContent = question.exam_codes.join(" / ");
  els.objectiveTag.textContent = `Objective ${question.objective}`;
  els.typeTag.textContent = question.answer.length > 1 ? "Multiple response" : "Single response";
  els.domainText.textContent = question.category;
  els.progressText.textContent = `第 ${state.index + 1} / ${state.active.length} 題`;
  setProgress(state.index / state.active.length * 100);
  els.questionText.textContent = question.question_text;
  els.caseBox.classList.toggle("hidden", !question.case_group);
  els.caseTitle.textContent = question.case_group?.id || "";
  els.caseDescription.textContent = question.case_group?.description || "";
  els.selectionHint.textContent = question.answer.length > 1 ? `Select ${question.answer.length} answers, then confirm.` : "Select one answer, then confirm.";
  els.optionsList.replaceChildren();
  for (const [letter, text] of Object.entries(question.options)) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.dataset.letter = letter;
    button.setAttribute("aria-pressed", "false");
    const key = document.createElement("span");
    key.className = "option-letter";
    key.textContent = letter;
    const content = document.createElement("span");
    content.className = "option-text";
    content.textContent = text;
    button.append(key, content);
    button.addEventListener("click", () => selectOption(letter, question));
    els.optionsList.append(button);
  }
  els.checkButton.disabled = true;
  els.nextButton.classList.add("hidden");
  els.feedbackBox.className = "feedback hidden";
  els.feedbackTitle.textContent = "";
  els.feedbackText.textContent = "";
  els.optionReasons.replaceChildren();
  els.referenceList.replaceChildren();
  refreshLanguage();
  els.nextButton.textContent = state.index + 1 === state.active.length ? "查看結果" : "下一題";
  const summary = summarizeResults(state.results);
  els.sessionStatus.textContent = `${state.version}｜Set ${state.setId}｜已答 ${summary.total} 題，答對 ${summary.correct} 題`;
  els.questionText.focus();
}

function selectOption(letter, question) {
  if (state.answered) return;
  if (question.answer.length === 1) state.selected = new Set([letter]);
  else if (state.selected.has(letter)) state.selected.delete(letter);
  else state.selected.add(letter);
  for (const button of els.optionsList.children) {
    const selected = state.selected.has(button.dataset.letter);
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  }
  els.checkButton.disabled = state.selected.size !== question.answer.length;
}

function checkAnswer() {
  const question = state.active[state.index];
  if (state.answered || state.selected.size !== question.answer.length) return;
  state.answered = true;
  const selected = [...state.selected].sort();
  const isCorrect = isCorrectAnswer(question.answer, selected);
  state.results.push({ question, selected, isCorrect });
  for (const button of els.optionsList.children) {
    button.disabled = true;
    const letter = button.dataset.letter;
    button.classList.toggle("correct", question.answer.includes(letter));
    button.classList.toggle("incorrect", state.selected.has(letter) && !question.answer.includes(letter));
  }
  els.feedbackBox.className = `feedback ${isCorrect ? "good" : "bad"}`;
  refreshLanguage();
  appendReferences(els.referenceList, question.references);
  els.checkButton.disabled = true;
  els.nextButton.classList.remove("hidden");
  setProgress((state.index + 1) / state.active.length * 100);
  const summary = summarizeResults(state.results);
  els.sessionStatus.textContent = `${state.version}｜Set ${state.setId}｜已答 ${summary.total} 題，答對 ${summary.correct} 題`;
  els.nextButton.focus();
}

function refreshLanguage() {
  const question = state.active[state.index];
  const view = getQuestionView(question, state.language);
  const chinese = state.language === "zh-Hant";
  els.translateButton.textContent = chinese ? "Back to English" : "翻譯成中文";
  els.translateButton.setAttribute("aria-pressed", String(chinese));
  els.languageStatus.textContent = chinese ? "繁體中文翻譯" : "English";
  els.questionText.lang = state.language;
  els.optionsList.lang = state.language;
  els.feedbackBox.lang = state.language;
  els.questionText.textContent = view.question_text;
  els.caseDescription.textContent = view.case_group?.description || "";
  els.selectionHint.textContent = chinese ? (question.answer.length > 1 ? `請選擇 ${question.answer.length} 項，再確認答案。` : "請選擇一項，再確認答案。") : (question.answer.length > 1 ? `Select ${question.answer.length} answers, then confirm.` : "Select one answer, then confirm.");
  for (const button of els.optionsList.children) button.querySelector(".option-text").textContent = view.options[button.dataset.letter];
  if (state.answered) {
    const correct = state.results[state.results.length - 1].isCorrect;
    els.feedbackTitle.textContent = correct ? (chinese ? "正確！" : "Correct!") : `${chinese ? "正確答案" : "Correct answer"}: ${[...question.answer].join(", ")}`;
    els.feedbackText.textContent = view.explanation;
    els.optionReasons.replaceChildren();
    appendReasons(els.optionReasons, question);
  }
}

function appendReasons(container, question, includeOptions = false) {
  const view = getQuestionView(question, state.language);
  for (const [letter, reason] of Object.entries(view.option_explanations)) {
    const item = document.createElement("li");
    item.textContent = `${letter}${question.answer.includes(letter) ? (state.language === "zh-Hant" ? "（正解）" : " (correct)") : ""}: ${includeOptions ? `${view.options[letter]} — ` : ""}${reason}`;
    container.append(item);
  }
}

function appendReferences(container, references) {
  for (const reference of references) {
    let url;
    try { url = new URL(reference.url); } catch { continue; }
    if (url.protocol !== "https:") continue;
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = url.href;
    link.textContent = `${reference.title}｜${reference.section}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    item.append(link);
    container.append(item);
  }
}

function setProgress(value) {
  const rounded = Math.round(value);
  els.progressFill.style.width = `${value}%`;
  els.progressBar.setAttribute("aria-valuenow", String(rounded));
}

function showResult(focus = true) {
  const summary = summarizeResults(state.results);
  els.resultSummary.textContent = `${state.version}｜Set ${state.setId}｜本次 ${summary.total} 題；請從錯題解析找出需要加強的觀念。`;
  els.reviewTranslateButton.textContent = state.language === "zh-Hant" ? "Back to English" : "翻譯錯題解析";
  els.reviewTranslateButton.setAttribute("aria-pressed", String(state.language === "zh-Hant"));
  els.reviewList.lang = state.language;
  els.scoreValue.textContent = `${summary.correct} / ${summary.total}`;
  els.rateValue.textContent = `${summary.rate}%`;
  els.wrongValue.textContent = String(summary.wrong);
  els.sessionStatus.textContent = `${state.version}｜完成，答對率 ${summary.rate}%`;
  els.retryWrongButton.disabled = summary.wrong === 0;
  els.reviewList.replaceChildren();
  for (const result of state.results.filter((item) => !item.isCorrect)) {
    const question = result.question;
    const view = getQuestionView(question, state.language);
    const item = document.createElement("div");
    item.className = "review-item wrong";
    const tag = document.createElement("p");
    tag.className = "domain-label";
    tag.textContent = `${question.exam_codes.join(" / ")}｜Set ${state.setId}｜Objective ${question.objective}`;
    const title = document.createElement("div");
    title.className = "review-item-title";
    title.textContent = view.question_text;
    const caseText = document.createElement("p");
    caseText.textContent = view.case_group?.description || "";
    const answers = document.createElement("p");
    answers.textContent = `你的答案：${result.selected.join("、")}；正確答案：${[...question.answer].join("、")}`;
    const explanation = document.createElement("p");
    explanation.textContent = view.explanation;
    const reasons = document.createElement("ul");
    appendReasons(reasons, question, true);
    const references = document.createElement("ul");
    appendReferences(references, question.references);
    item.append(tag, title, caseText, answers, explanation, reasons, references);
    els.reviewList.append(item);
  }
  if (!summary.wrong) {
    const message = document.createElement("p");
    message.textContent = "本次全部答對，可以更換領域或題數繼續練習。";
    els.reviewList.append(message);
  }
  showView("result");
  if (focus) els.resultTitle.focus();
}

function showView(name) {
  for (const view of ["loading", "error", "quiz", "result"]) els[`${view}View`].classList.toggle("hidden", view !== name);
}
