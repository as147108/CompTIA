export const EXAM_FILES = [
  ...Array.from({ length: 11 }, (_, index) => `security-plus-sy0-701-${String(index + 1).padStart(2, "0")}.json`),
  "security-plus-sy0-801-01.json"
];
export const VERSIONS = {
  "SY0-701": {
    setCount: 11,
    shortDistribution: [4, 7, 5, 8, 6],
    weights: [12, 22, 18, 28, 20],
    distribution: [11, 20, 16, 25, 18],
    objectiveCounts: [4, 5, 4, 9, 6],
    domains: ["General Security Concepts", "Threats, Vulnerabilities, and Mitigations", "Security Architecture", "Security Operations", "Security Program Management and Oversight"]
  },
  "SY0-801": {
    setCount: 1,
    weights: [16, 24, 19, 27, 14],
    distribution: [14, 22, 17, 24, 13],
    objectiveCounts: [3, 6, 4, 8, 6],
    domains: ["General Security Concepts", "Threats, Vulnerabilities, and Attacks", "Security Architecture", "Security Operations", "Security Program Management and Oversight"]
  }
};
