export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function pickQuestionSet(pool, limit, shouldShuffle) {
  const ordered = shouldShuffle ? shuffle(pool) : [...pool];
  return limit === "all" ? ordered : ordered.slice(0, Math.max(0, Number(limit)));
}

export function isCorrectAnswer(answer, selected) {
  const expected = [...answer].sort().join("");
  const actual = [...new Set(selected)].sort().join("");
  return expected === actual;
}

export function summarizeResults(results) {
  const total = results.length;
  const correct = results.filter((result) => result.isCorrect).length;
  return { total, correct, wrong: total - correct, rate: total ? Math.round(correct / total * 100) : 0 };
}
