import { readFile, readdir } from "node:fs/promises";
import { EXAM_FILES, VERSIONS } from "./config.js";

const errors = [];
const directory = new URL("../exam/json/", import.meta.url);
const files = (await readdir(directory)).filter((file) => file.endsWith(".json"));
if (files.sort().join() !== [...EXAM_FILES].sort().join()) errors.push("題庫檔案與 EXAM_FILES 不一致");
let total = 0;
const versionSets = new Map();
const versionObjectives = new Map();
const versionStems = new Map();
for (const file of EXAM_FILES) {
  let data;
  try { data = JSON.parse(await readFile(new URL(file, directory), "utf8")); }
  catch (error) { errors.push(`${file}: ${error.message}`); continue; }
  const code = data.metadata?.exam_code;
  const config = VERSIONS[code];
  if (!config) { errors.push(`${file}: 未知 exam_code`); continue; }
  const questions = data.questions;
  if (!Array.isArray(questions)) { errors.push(`${file}: questions 必須為陣列`); continue; }
  const setId = data.metadata.set_id;
  if (!/^\d{2}$/.test(setId) || !file.endsWith(`-${setId}.json`)) errors.push(`${file}: 題組識別不一致`);
  if (typeof data.metadata.set_title !== "string" || !data.metadata.set_title.trim()) errors.push(`${file}: 缺少題組標題`);
  if (data.metadata.language !== "en") errors.push(`${file}: 預設語言必須是英文`);
  const expectedCount = setId === "01" ? 90 : 30;
  const expectedDistribution = expectedCount === 90 ? config.distribution : config.shortDistribution;
  if (questions.length !== expectedCount || data.metadata.question_count !== expectedCount) errors.push(`${file}: 預期 ${expectedCount} 題`);
  if (!versionSets.has(code)) { versionSets.set(code, new Set()); versionObjectives.set(code, new Set()); versionStems.set(code, new Set()); }
  if (versionSets.get(code).has(setId)) errors.push(`${file}: 重複題組識別`);
  versionSets.get(code).add(setId);
  const distribution = [0, 0, 0, 0, 0];
  const objectives = new Set();
  const stems = new Set();
  const optionSets = new Set();
  const answerCounts = { A: 0, B: 0, C: 0, D: 0 };
  let multi = 0;
  let scenarios = 0;
  questions.forEach((question, index) => {
    const location = `${file}#${index + 1}`;
    const check = (condition, message) => { if (!condition) errors.push(`${location}: ${message}`); };
    check(question.id === index + 1, "id 不連續");
    check(question.exam_codes?.length === 1 && question.exam_codes[0] === code, "版本標籤不一致");
    check(Number.isInteger(question.domain) && question.domain >= 1 && question.domain <= 5, "domain 錯誤");
    const [domain, objective] = String(question.objective).split(".").map(Number);
    check(domain === question.domain && Number.isInteger(objective) && objective >= 1 && objective <= config.objectiveCounts[domain - 1], "objective 不屬於該版本領域");
    check(question.chapter === question.objective, "chapter 與 objective 不一致");
    check(question.category === `${question.domain}. ${config.domains[question.domain - 1]}`, "category 不一致");
    distribution[question.domain - 1] += 1;
    objectives.add(question.objective);
    check(typeof question.question_text === "string" && question.question_text.trim().length >= 15, "題幹過短或缺漏");
    const stem = String(question.question_text).toLowerCase().replace(/[\p{P}\p{S}\s]/gu, "");
    check(!stems.has(stem), "重複題幹");
    stems.add(stem);
    check(!versionStems.get(code).has(stem), "與其他題組的英文題幹重複");
    versionStems.get(code).add(stem);
    versionObjectives.get(code).add(question.objective);
    check(Object.keys(question.options || {}).join("") === "ABCD", "必須有四個選項 A–D");
    check(new Set(Object.values(question.options || {})).size === 4, "選項重複");
    const optionSet = Object.values(question.options || {}).sort().join("|");
    check(!optionSets.has(optionSet), "整組選項重複，請檢查模板題");
    optionSets.add(optionSet);
    check(/^[A-D]{1,3}$/.test(question.answer) && [...new Set(question.answer)].sort().join("") === question.answer, "答案格式錯誤");
    const isMulti = question.answer?.length > 1;
    if (isMulti) {
      multi += 1;
      const countPattern = question.answer.length === 2 ? /\b(?:two|2)\b/i : /\b(?:three|3)\b/i;
      check(countPattern.test(question.question_text), "英文複選提示與答案數量不符");
    }
    else answerCounts[question.answer] += 1;
    check(Boolean(question.type?.includes("複選")) === isMulti, "type 與答案數量不一致");
    if (question.type?.includes("情境")) scenarios += 1;
    check(typeof question.explanation === "string" && question.explanation.length >= 30, "正解解析不足");
    for (const letter of "ABCD") check(typeof question.option_explanations?.[letter] === "string" && question.option_explanations[letter].trim().length >= 8, `缺少 ${letter} 具體解析`);
    const translated = question.translations?.["zh-Hant"];
    check(typeof translated?.question_text === "string" && /[\u3400-\u9fff]/u.test(translated.question_text), "缺少繁體中文題幹");
    check(typeof translated?.explanation === "string" && translated.explanation.length >= 8, "缺少中文解析");
    check(Object.keys(translated?.options || {}).join("") === "ABCD", "中文選項字母不一致");
    for (const letter of "ABCD") {
      check(typeof translated?.options?.[letter] === "string" && translated.options[letter].length > 0, `缺少中文 ${letter} 選項`);
      check(typeof translated?.option_explanations?.[letter] === "string" && translated.option_explanations[letter].length >= 8, `缺少中文 ${letter} 解析`);
    }
    if (isMulti) {
      const countPattern = question.answer.length === 2 ? /選[擇出取]?\s*[二兩2]/u : /選[擇出取]?\s*[三3]/u;
      check(countPattern.test(translated?.question_text || ""), "中文複選提示與答案數量不符");
    }
    const english = JSON.stringify({stem:question.question_text,options:question.options,explanation:question.explanation,reasons:question.option_explanations,competency:question.competency});
    check(!/[\u3400-\u9fff]/u.test(english), "英文主內容出現中文或不完整翻譯");
    check(Array.isArray(question.references) && question.references.length > 0, "缺少 references");
    check(question.references?.[0]?.section === `Objective ${question.objective}`, "官方來源章節與 objective 不一致");
    for (const reference of question.references || []) {
      let url;
      try { url = new URL(reference.url); } catch { check(false, "來源 URL 無效"); }
      check(url?.protocol === "https:" && reference.title?.length > 0 && reference.section?.length > 0 && /^\d{4}-\d{2}-\d{2}$/.test(reference.accessed), "來源欄位不足");
    }
    const content = JSON.stringify(question);
    check(!/\[Question \d+\]|TODO|TBD|PLACEHOLDER|the described requirement|scenario tests objective|This option does not best satisfy|某組織在既有流程|範圍錯置的方法|本題關鍵在於/u.test(content), "出現佔位或已拒收模板");
    check(!/[\uFFFD\u0000-\u0008]/u.test(content), "出現異常字元");
  });
  if (distribution.join() !== expectedDistribution?.join()) errors.push(`${file}: domain 分布 ${distribution} 與 ${expectedDistribution} 不符`);
  if (Object.values(data.metadata.domain_distribution || {}).join() !== distribution.join()) errors.push(`${file}: metadata.domain_distribution 不符`);
  for (let domain = 1; setId === "01" && domain <= 5; domain += 1) {
    for (let objective = 1; objective <= config.objectiveCounts[domain - 1]; objective += 1) {
      if (!objectives.has(`${domain}.${objective}`)) errors.push(`${file}: 缺少 Objective ${domain}.${objective}`);
    }
  }
  if (multi < (expectedCount === 90 ? 8 : 3) || scenarios < 12) errors.push(`${file}: 複選或情境題數不足`);
  const minimumAnswers = expectedCount === 90 ? 10 : 3;
  if (Object.values(answerCounts).some((count) => count < minimumAnswers)) errors.push(`${file}: 單選答案分布失衡 ${JSON.stringify(answerCounts)}`);
  total += questions.length;
  console.log(`${code} Set ${setId}: ${questions.length} 題，${objectives.size} objectives，domain ${distribution.join("/")}，複選 ${multi}，情境 ${scenarios}`);
}
for (const [code, config] of Object.entries(VERSIONS)) {
  if (versionSets.get(code)?.size !== config.setCount) errors.push(`${code}: 預期 ${config.setCount} 份獨立題組`);
  for (let domain = 1; domain <= 5; domain += 1) for (let objective = 1; objective <= config.objectiveCounts[domain - 1]; objective += 1) {
    if (!versionObjectives.get(code)?.has(`${domain}.${objective}`)) errors.push(`${code}: 全題庫缺少 ${domain}.${objective}`);
  }
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`PASS: ${EXAM_FILES.length} 份題庫，${total} 題；版本、覆蓋、答案、解析與來源格式通過。`);
