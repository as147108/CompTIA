import { readFile, readdir } from "node:fs/promises";
import { EXAM_FILES, VERSIONS } from "./config.js";

const errors = [];
const directory = new URL("../exam/json/", import.meta.url);
const files = (await readdir(directory)).filter((file) => file.endsWith(".json"));
if (files.sort().join() !== [...EXAM_FILES].sort().join()) errors.push("題庫檔案與 EXAM_FILES 不一致");
let total = 0;
for (const file of EXAM_FILES) {
  let data;
  try { data = JSON.parse(await readFile(new URL(file, directory), "utf8")); }
  catch (error) { errors.push(`${file}: ${error.message}`); continue; }
  const code = data.metadata?.exam_code;
  const config = VERSIONS[code];
  if (!config) { errors.push(`${file}: 未知 exam_code`); continue; }
  const questions = data.questions;
  if (!Array.isArray(questions)) { errors.push(`${file}: questions 必須為陣列`); continue; }
  if (questions.length !== 90 || data.metadata.question_count !== 90) errors.push(`${file}: 預期 90 題`);
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
    const stem = String(question.question_text).replace(/[\p{P}\p{S}\s]/gu, "");
    check(!stems.has(stem), "重複題幹");
    stems.add(stem);
    check(Object.keys(question.options || {}).join("") === "ABCD", "必須有四個選項 A–D");
    check(new Set(Object.values(question.options || {})).size === 4, "選項重複");
    const optionSet = Object.values(question.options || {}).sort().join("|");
    check(!optionSets.has(optionSet), "整組選項重複，請檢查模板題");
    optionSets.add(optionSet);
    check(/^[A-D]{1,3}$/.test(question.answer) && [...new Set(question.answer)].sort().join("") === question.answer, "答案格式錯誤");
    const isMulti = question.answer?.length > 1;
    if (isMulti) { multi += 1; check(/選[擇出取]?\s*[二三兩23一四]|選擇\s*[234]/u.test(question.question_text), "複選題未標示選擇數量"); }
    else answerCounts[question.answer] += 1;
    check(Boolean(question.type?.includes("複選")) === isMulti, "type 與答案數量不一致");
    if (question.type?.includes("情境")) scenarios += 1;
    check(typeof question.explanation === "string" && question.explanation.length >= 30, "正解解析不足");
    for (const letter of "ABCD") check(typeof question.option_explanations?.[letter] === "string" && question.option_explanations[letter].trim().length >= 8, `缺少 ${letter} 具體解析`);
    check(Array.isArray(question.references) && question.references.length > 0, "缺少 references");
    for (const reference of question.references || []) {
      let url;
      try { url = new URL(reference.url); } catch { check(false, "來源 URL 無效"); }
      check(url?.protocol === "https:" && reference.title?.length > 0 && reference.section?.length > 0 && /^\d{4}-\d{2}-\d{2}$/.test(reference.accessed), "來源欄位不足");
    }
    const content = JSON.stringify(question);
    check(!/\[Question \d+\]|TODO|TBD|PLACEHOLDER|某組織在既有流程|範圍錯置的方法|本題關鍵在於/u.test(content), "出現佔位或已拒收模板");
    check(!/[\uFFFD\u0000-\u0008]/u.test(content), "出現異常字元");
  });
  if (distribution.join() !== config.distribution.join()) errors.push(`${file}: domain 分布 ${distribution} 與 ${config.distribution} 不符`);
  if (Object.values(data.metadata.domain_distribution || {}).join() !== config.distribution.join()) errors.push(`${file}: metadata.domain_distribution 不符`);
  for (let domain = 1; domain <= 5; domain += 1) {
    for (let objective = 1; objective <= config.objectiveCounts[domain - 1]; objective += 1) {
      if (!objectives.has(`${domain}.${objective}`)) errors.push(`${file}: 缺少 Objective ${domain}.${objective}`);
    }
  }
  if (multi < 8 || scenarios < 12) errors.push(`${file}: 複選或情境題數不足`);
  if (Object.values(answerCounts).some((count) => count < 10)) errors.push(`${file}: 單選答案分布失衡 ${JSON.stringify(answerCounts)}`);
  total += questions.length;
  console.log(`${code}: ${questions.length} 題，${objectives.size} objectives，domain ${distribution.join("/")}，複選 ${multi}，情境 ${scenarios}`);
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`PASS: ${EXAM_FILES.length} 份題庫，${total} 題；版本、覆蓋、答案、解析與來源格式通過。`);
