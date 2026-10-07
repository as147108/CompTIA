export function getQuestionView(question, language = "en") {
  const translation = language === "zh-Hant" ? question.translations?.["zh-Hant"] : null;
  return translation ? { ...question, ...translation } : question;
}

export function getQuestionPool(banks, version, setId, domain = "all") {
  return banks
    .filter((bank) => bank.metadata.exam_code === version && bank.metadata.set_id === setId)
    .flatMap((bank) => bank.questions)
    .filter((question) => domain === "all" || question.domain === Number(domain));
}
