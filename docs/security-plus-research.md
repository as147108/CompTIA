# CompTIA Security+ 資料研究與來源索引

查核日期：2026-10-06（Asia/Taipei）。本索引供 Security+ 考試準備與後續原創練習題使用，涵蓋考綱、教材、模擬考、PBQ 與技術原始資料。

目前可報考版本是 SY0-701。SY0-801 即將推出，兩版的領域比重與內容不同；應先依預計應試日期決定版本，再建立學習與出題範圍。官方考綱決定範圍，技術文件用來查證解析，教材與模擬題用來練習。

## 官方版本與考試規格

| 項目 | Security+ V7 | Security+ V8 |
| --- | --- | --- |
| Exam code | SY0-701 | SY0-801 |
| 2026-10-06 的狀態 | 官方表示可報考 | 尚未推出 |
| 發布日期 | 2023-11-07 | 預計 2026-11-17 前後；頁面 Exam details 列 2026-11-17，但說明仍使用 expected on or around |
| 退休日期 | 英文 2027-06-11；日文、葡萄牙文、西班牙文、泰文 2027-08-13 | 官方估計發布後約三年，尚無確定日期 |
| 題數與題型 | 最多 90 題，multiple-choice 與 performance-based questions | 最多 90 題，multiple-choice 與 performance-based questions |
| 時間 | 90 分鐘 | 90 分鐘 |
| 通過分數 | 750，量尺為 100–900 | 750，量尺為 100–900 |
| 官方列出的考試語言 | English、Japanese、Portuguese、Spanish、Thai | English |

來源：[CompTIA V7 官方頁](https://www.comptia.org/en-us/certifications/security/v7/)、[CompTIA V8 官方頁](https://www.comptia.org/en-us/certifications/security/v8/)。通過分數是量尺分數，不應換算成固定答對率。官方列出的語言目前不包含繁體中文；筆記可用繁體中文，重要術語宜保留英文。

以下是官方公布的領域比重，並非每份試卷的固定題數。

| Domain | SY0-701 | SY0-801 |
| --- | --- | --- |
| 1 General Security Concepts | 12% | 16% |
| 2 Threats, Vulnerabilities, and Mitigations／新版為 Threats, Vulnerabilities, and Attacks | 22% | 24% |
| 3 Security Architecture | 18% | 19% |
| 4 Security Operations | 28% | 27% |
| 5 Security Program Management and Oversight | 20% | 14% |
| 合計 | 100% | 100% |

來源：上述官方 V7、V8 頁面，以及 [SY0-701 Exam Objectives Version 6.0](https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-security-sy0-701-exam-objectives-%286-0%29.pdf?sfvrsn=204179cc_6)。V8 官方摘要明列 AI 系統、模型、prompts、privacy、data exposure 相關風險，以及 AI-assisted workflows。不能只替 SY0-701 題庫加幾題 AI 題就當成 SY0-801 題庫。

### 版本選擇建議

- 若準備在英文版 SY0-701 退休前完成考試，現有教材與模擬考較容易取得，可採 SY0-701 作為準備基礎。
- 若預計考試時間超過 2027-06-11，英文考試準備應以 SY0-801 為方向，並重新確認發布與退休資訊。
- 尚未決定應試日期時，可先學兩版共通概念；練習題必須保留 exam code，避免混用 objective 編號與權重。

## 來源可信度與查核範圍

本索引的「官方」指 CompTIA、標準制定者、政府機構或技術供應商自己的頁面。教材供應商的頁面可證明其產品版本與功能，不能證明題目接近正式試卷，也不能作為通過保證。

查核分為三種：**已讀取**代表已直接開啟公開內容；**官方入口已確認**代表官方頁面提供該連結，但目標內容未完整讀取；**待補查**代表目前不足以作為題目答案依據。公開產品說明的查核不等於已購買或審閱完整付費題庫。

## CompTIA 官方資料

| ID | 來源 | 費用與用途 | 查核與限制 |
| --- | --- | --- | --- |
| O01 | [Security+ V7](https://www.comptia.org/en-us/certifications/security/v7/) | 免費公開；版本、時程、規格與領域摘要 | 已讀取官方頁面；應試前重新確認 |
| O02 | [Security+ V8](https://www.comptia.org/en-us/certifications/security/v8/) | 免費公開；新版時程與領域摘要 | 已讀取；發布說明仍帶預期語氣 |
| O03 | [SY0-701 Exam Objectives Version 6.0 PDF](https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-security-sy0-701-exam-objectives-%286-0%29.pdf?sfvrsn=204179cc_6) | 免費公開；學習範圍、objective 編號與術語 | 已讀取；Version 6.0 是文件版本，exam code 仍是 SY0-701 |
| O04 | [SY0-801 Exam Objectives Version 2.0 PDF](https://lecbyo.files.cmp.optimizely.com/download/77f3bd3223ac11f180820e495f189928) | 官方 V8 頁面連結；新版完整 objectives | 已下載並讀取，核對 27 個 objectives；Version 2.0 是文件版本 |
| O05 | [Performance-Based Questions 說明與範例入口](https://www.comptia.org/en-us/resources/test-policies/exam-development/performance-based-questions-explained/) | 免費公開；理解 PBQ 操作形式 | 已讀取；官方明言範例並非任何正式考試的題目 |
| O06 | [CertMaster Practice](https://www.comptia.org/en-us/resources/certmaster-training/practice/) | 付費產品；計時模擬考、objective quizzes、弱點檢查 | V7 官方頁已確認產品定位與連結；購買時核對 exam code、存取期與方案 |
| O07 | [CertMaster Learn](https://www.comptia.org/en-us/resources/certmaster-training/learn/) | 付費產品；系統教材、互動內容與測驗 | V7 官方頁已確認；適合需要完整教學者 |
| O08 | [CertMaster Labs](https://www.comptia.org/en-us/resources/certmaster-training/labs/) | 付費產品；guided tasks 與 virtual labs | V7 官方頁已確認；實驗練習與 PBQ 模擬是不同用途 |

CompTIA 官方 PBQ 說明將 Security+ 列在使用 simulation PBQ 的認證中。可從 O05 進入 [simulation PBQ 示範](https://demosim.comptia.org/) 熟悉介面；示範入口已確認，本次未操作示範題。PBQ 準備可涵蓋 firewall rules、網路區隔、log analysis、身分與存取控制及事件處理情境，這些是本專案建議的練習方向，不是正式考題預測。

## 教材與模擬題比較

| ID | 來源與版本 | 費用 | 適合用途 | 查核與限制 |
| --- | --- | --- | --- | --- |
| L01 | [Professor Messer SY0-701 課程入口](https://www.professormesser.com/sy0-701-certification-course/) | 影片、Study Groups、Pop Quiz 免費；premium materials 付費 | 作為主要概念課程，依考綱逐項複習 | 已讀取；免費與付費內容分開，非官方考題 |
| L02 | [Professor Messer SY0-701 Success Bundle 與 Practice Exams](https://www.professormesser.com/sy0-701-success-bundle/) | 付費 | 完整模擬考與逐題解析 | 已讀取供應商頁；包含三套各 90 題練習考及 PBQ 類題，紙本／PDF 類練習不等於官方互動介面 |
| L03 | [Dion Training SY0-701 Practice Exam Pack](https://www.diontraining.com/products/comptia-security-sy0-007-unlimited-practice-exam) | 付費 | 模擬考、情境選擇題與弱點診斷 | 已讀取；URL 含 sy0-007，但頁面標示 SY0-701，購買時再核對 |
| L04 | [Dion Training SY0-701 PBQ Practice Pack](https://www.diontraining.com/products/comptia-security-701-pbq-packet) | 付費 | PBQ-style 的分析與設定練習 | 已讀取；供應商模擬內容，非官方試題 |
| L05 | [Sybex Study Guide 第 9 版的 Wiley companion site](https://bcs.wiley.com/he-bcs/Books?action=index&bcsId=12640&itemId=1394211414) | 書籍付費；附加內容依購買條件 | 系統性閱讀、章節複習與練習 | 已讀取 companion site，確認 SY0-701 書名、版本與作者 Mike Chapple、David Seidl；正式商店頁存取受限，未採用 UAT 商店價格 |
| L06 | [Pearson Exam Cram SY0-701 Premium Edition 第 7 版](https://www.pearsonitcertification.com/store/comptia-security-plus-sy0-701-exam-cram-premium-edition-9780138225537) | 付費 | 考前總複習、計時模擬考與解析 | 已讀取；產品頁列四套完整 practice exams；要選含 Practice Test 的 edition |
| L07 | [MeasureUp SY0-701 Practice Test](https://www.measureup.com/sy0-701-comptia-security-practice-test.html) | 付費；頁面有試用入口 | 練習與考試模式、分類診斷 | 已讀取公開產品說明；未測試付費題庫。供應商說明題目不會與實際考題完全相同 |
| L08 | [ExamCompass SY0-701 免費測驗](https://www.examcompass.com/comptia/security-plus-certification/free-security-plus-practice-tests) | 免費 | 術語、縮寫與主題小測驗 | 已讀取；用於低成本複習，不能取代情境題、詳細解析或 PBQ |
| L09 | [Cisco Networking Academy](https://www.cisco.com/site/us/en/learn/training-certifications/training/netacad/index.html) | 官方列有免費自學課程 | 補強 networking 與 cybersecurity 基礎 | 已讀取 Cisco 介紹頁；非 Security+ 專用題庫。Introduction to Cybersecurity 與 Networking Basics 可作先備學習 |

### 建議的起始組合

先使用 O03 官方考綱與 L01 免費課程，搭配 L08 進行概念複習、O05 理解 PBQ 形式。若需要計時模擬考，可依預算從 L02、L03、L06、L07 擇一；需要官方完整方案者可評估 CertMaster。

這是按學習用途提出的組合建議，沒有以各家付費題庫進行實測排名。價格、折扣、題數和存取期可能改變，應以購買當下的產品頁為準。

## 技術原始資料

以下資料用於查證觀念、補足情境題解析及設計原創練習，不應把整份技術標準都當成 Security+ 必考內容。除另註外，已直接讀取官方公開入口或文件摘要；尚未逐章審閱所有文件。費用欄指公開閱讀，並非再散布授權。

| ID | 來源 | 費用與建議用途 | 版本與範圍提醒 |
| --- | --- | --- | --- |
| T01 | [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework) | 免費公開；governance、風險與防禦活動 | 使用 CSF 2.0；與考綱名詞對照 |
| T02 | [NIST SP 800-61 Rev. 3](https://csrc.nist.gov/pubs/sp/800/61/r3/final) | 免費公開；incident response 與風險管理 | 2025-04 發布，取代 Rev. 2；舊教材的處理階段仍需按該考綱理解 |
| T03 | [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final) | 免費公開；Zero Trust architecture | 用來釐清 policy engine、policy administrator、policy enforcement point |
| T04 | [NIST SP 800-63-4](https://csrc.nist.gov/pubs/sp/800/63/4/final) | 免費公開；identity proofing、authentication、federation | 2025-07 發布；勿把新版細節無條件套入舊版教材題目 |
| T05 | [NIST SP 800-30 Rev. 1](https://csrc.nist.gov/pubs/sp/800/30/r1/final) | 免費公開；risk assessment | 風險分析的補充閱讀，非出題範圍清單 |
| T06 | [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) | 免費公開；contingency planning、BIA、recovery | 2010 年文件；適合核心規劃觀念，具體技術要另查現行文件 |
| T07 | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) | 免費公開；security 與 privacy control families | 用於查證控制目的，不需逐項背誦整套 controls |
| T08 | [OWASP Top 10](https://owasp.org/projects/top-ten) | 免費公開；常見 web application risks | 官方目前列最新發布版為 2025；舊教材常引用 2021，編號與名稱不同 |
| T09 | [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) | 免費公開；authentication、password storage、SQLi/XSS、logging 等防禦細節 | 適合補充「為什麼」與選項解析；查核具體 cheat sheet 版本 |
| T10 | [MITRE ATT&CK](https://attack.mitre.org/) | 免費公開；攻擊者 tactics、techniques 與防禦情境 | 用於理解攻擊流程，避免死背全部 technique IDs；網站持續更新 |
| T11 | [MITRE CWE](https://cwe.mitre.org/) | 免費公開；軟體弱點類別 | 區分 weakness 類別與特定 vulnerability 記錄 |
| T12 | [FIRST CVSS](https://www.first.org/cvss/) | 免費公開；漏洞嚴重性、metric 與 vector | 官方目前為 CVSS 4.0；解析中要明示使用的 CVSS 版本 |
| T13 | [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | 免費公開；已在實際攻擊中遭利用的漏洞與修補優先序 | 已透過官方網頁讀取；是漏洞管理的輸入，不是所有漏洞的清單 |
| T14 | [CIS Critical Security Controls](https://www.cisecurity.org/controls) | 公開介紹；控制措施與優先序 | 官方入口目前列 v8.1；下載可能需填表，未提交資料 |
| T15 | [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks) | 公開介紹；產品 hardening 與 secure baselines | 具體 benchmark、版本與下載條件依平台而異 |
| T16 | [Microsoft Azure shared responsibility](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility) | 免費公開；IaaS、PaaS、SaaS 責任分工 | 供應商官方說明；出題時仍需交代服務型態與情境 |
| T17 | [IANA Service Name and Port Number Registry](https://www.iana.org/assignments/service-names-port-numbers) | 免費公開；查證服務名稱、port 與 TCP／UDP | 註冊 port 不代表實際服務必定使用該 port，也不代表連線安全 |
| T18 | [RFC 8446](https://www.rfc-editor.org/rfc/rfc8446.html) | 免費公開；TLS 1.3 原始規格 | 深度參考；Security+ 以協定目的與安全概念為主 |
| T19 | [Wireshark User’s Guide](https://www.wireshark.org/docs/wsug_html_chunked/) | 免費公開；封包判讀、filters 與 troubleshooting | 技能補強，不是 CompTIA PBQ 題庫 |
| T20 | [PortSwigger Web Security Academy](https://portswigger.net/web-security) | 免費訓練；web vulnerabilities 與互動 labs | 部分內容深於 Security+；按 objective 選學即可，非官方考題 |
| T21 | [OWASP LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | 免費公開；直接與間接 prompt injection | 已讀取公開說明；用於新版 AI 風險情境的補充解析 |
| T22 | [NIST SP 800-88 Rev. 2](https://csrc.nist.gov/pubs/sp/800/88/r2/final) | 免費公開；media sanitization 與退役 | 2025-09 發布；已讀取官方摘要，依媒體與資料敏感度選擇方法 |

### 五大領域的補充資料對照

此表是本專案的學習映射，非 CompTIA 指定閱讀清單；具體出題仍以選定版本的 objective 為準。

| SY0-701 Domain | 可優先使用的資料 | 練習方向 |
| --- | --- | --- |
| 1 General Security Concepts | T03、T04、T09、T18 | 安全控制、AAA、Zero Trust、加密與信任 |
| 2 Threats, Vulnerabilities, and Mitigations | T08–T13、T20 | 社交工程、攻擊指標、弱點、漏洞優先序與防禦選擇 |
| 3 Security Architecture | T03、T06、T15–T18 | 網路區隔、雲端責任、資料保護、備份與復原 |
| 4 Security Operations | T02、T04、T09、T12–T15、T19 | IAM、監控、log analysis、hardening、事件處理 |
| 5 Security Program Management and Oversight | T01、T05–T07、T14 | governance、risk assessment、BIA、控制與稽核觀念 |

## 考題來源與原創練習規則

CompTIA 的 O03 考綱內明列禁止使用 unauthorized training materials／brain dumps。宣稱 actual exam questions、recalled questions、考場回憶題或出售洩漏題目的來源不納入本專案。一般第三方原創教材不應因為「非官方」就一概視為 dumps，應檢查其內容來源與聲明。

本專案已建立兩版各 90 題，保留 exam code、objective 編號、題型、英文術語、題幹、答案、正解理由、各錯誤選項理由、來源網址與查核日期。考綱來源用於標示範圍；答案與解析為本專案原創，並非 CompTIA 提供的標準答案。

原創情境題應清楚交代約束，例如 MOST appropriate、FIRST、BEST 的判斷條件；讓答案取決於題幹，而不是靠猜出題者偏好。PBQ-style 練習應附任務、可用資料、評分點與解析，標明是自製模擬。

教材、模擬題和公開技術文件的存取權不等於重製授權。本索引僅保存連結與摘要；建立原創題目時應重新表述與設計情境，引用必要的技術依據，避免複製供應商整套題目。需要重製圖表或內容時，另外查核該來源的 license。

## 待補查事項

- 決定預計考試日期與 exam code，之後固定主考綱版本。
- SY0-801 正式推出或考綱更新時，重新核對 O04 文件版號、objective 細項與現有題庫。
- 選購任何付費產品前，重新核對版本、edition、試用內容、存取期限與當地價格。
- 更詳細的答案解析需逐一讀取相關章節或條目；目前來源入口已查核，尚未對所有題目建立逐條證據。

本次搜尋涵蓋官方網站、供應商產品頁與技術原始資料，沒有把論壇通過心得、搜尋摘要或未核實的「真題」網站當作答案依據。部分 CompTIA 網址無法由文字搜尋工具讀取，因此改以官方網頁確認；Wiley 正式商店存取受限，採已可讀取的 companion site。尚未購買教材、建立帳號或下載付費題庫。
