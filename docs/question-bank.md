# 題庫格式與維護

兩份 JSON 位於 `exam/json/`，入口在 `scripts/config.js` 登記。SY0-701 與 SY0-801 各自依官方考綱編號對應，不以相同題號或舊版 objective 推定新版範圍。

## 欄位

| 欄位 | 用途 |
| --- | --- |
| `metadata.exam_code` | 整份題庫的版本 |
| `metadata.objectives_version` | 官方考綱 PDF 的文件版本，與 exam code 不同 |
| `metadata.domain_distribution` | Domain 1–5 的完整題數 |
| `id` | 該題庫內從 1 開始的連續題號 |
| `exam_codes` | 該題的版本標籤，目前固定只標示其所在題庫版本 |
| `domain` / `objective` | 所屬領域及官方考綱編號 |
| `category` / `chapter` | 領域英文名稱與 objective，供分類顯示 |
| `type` / `competency` | 題型與學習焦點 |
| `question_text` / `options` | 題幹及 A–D 四個不同選項 |
| `answer` | 正解字母，複選按字母排序，例如 `AC`；題幹須說明選擇數量 |
| `explanation` / `option_explanations` | 正解理由及四個選項各自的說明 |
| `references` | 來源標題、HTTPS 網址、章節及查核日期 |

`references` 的第一筆是官方考綱，支持學習範圍及 objective 對應；部分題目另外附具體技術文件。考綱不是原創答案的逐題官方背書。詳細教材與技術原始資料見 [研究索引](security-plus-research.md)。

## 更新流程

先核對所選 exam code 的官方考綱，再修改題幹、正解、所有選項及解析；不能只換題幹或版本標籤。情境要交代必要限制，讓唯一正解或指定數量的複選答案有清楚依據。新增干擾選項時優先使用容易混淆的同類概念。

執行 `npm test` 後，人工審查答案與 objective 映射，並在瀏覽器確認單選、複選與錯題重練。格式、字數與 objective 覆蓋通過，只能證明結構完整，不能代替內容審查。

目前採單題等權重與複選完全符合的練習計分，未模擬官方 PBQ 或官方分數量尺；重新整理頁面會重設本次練習紀錄。
