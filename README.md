# CompTIA Security+ 考試準備

本專案用於 CompTIA Security+ 的考綱整理、概念學習、原創練習題與錯題複習。

提供繁體中文原創題庫與網頁練習介面。畫面的配色、面板與選項樣式參考 `D:\Project\Frontend\ipas-quiz`；考題內容與分類依 Security+ 官方考綱建立。

## 使用方式

需 Node.js 18 或更新版本，無第三方套件，無須 `npm install`。

```powershell
cd D:\Document\CompTIA
npm start
```

開啟 <http://127.0.0.1:4173>。可選版本、領域、題數與隨機排序；作答後顯示逐選項解析與來源，完成後可只重練錯題。資料及作答狀態留在本機，本次紀錄在重新整理頁面後清除。

## 題庫

| 版本 | 題數 | Objective 覆蓋 | Domain 1–5 題數 | 考綱文件版本 |
| --- | --- | --- | --- | --- |
| [SY0-701](exam/json/security-plus-sy0-701-01.json) | 90 | 28 / 28 | 11 / 20 / 16 / 25 / 18 | 6.0 |
| [SY0-801](exam/json/security-plus-sy0-801-01.json) | 90 | 27 / 27 | 14 / 22 / 17 / 24 / 13 | 2.0 |

每題標註 exam code、domain、objective、答案、正解與錯誤選項解析及來源。兩版獨立載入與篩選；SY0-801 包含 AI 風險與 AI-assisted workflows。完整 90 題組的領域分布按官方比重取近似整數，小份練習直接從所選領域抽題。

本題庫是原創單選、複選與情境練習，未實作互動 PBQ，也不收錄考場回憶題或 brain dumps。每題等權重，複選需完全答對；練習答對率不換算正式考試的 100–900 量尺分數。

資料查核日期：2026-10-06（Asia/Taipei）。目前可報考版本為 SY0-701；SY0-801 預計於 2026-11-17 前後推出。應試前請再次確認官方時程。詳見 [資料研究與來源索引](docs/security-plus-research.md) 及 [題庫格式與維護](docs/question-bank.md)。

## 驗證

```powershell
npm test
```

包含計分及抽題測試，並檢查兩份題庫的版本、領域分布、全部 objective 覆蓋、唯一題幹、答案格式、複選提示、各選項解析及來源欄位。自動檢查不代表 CompTIA 審核題目；技術解析仍須依參考資料維護。
