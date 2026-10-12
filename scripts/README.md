# 首頁作品維護

`projects.json` 是作品名稱、簡介、圖片、順序與標籤的唯一資料來源。
首頁使用預先產生的 HTML，訪客與搜尋引擎不必等待 JavaScript 載入作品。

修改 `projects.json` 後，在網站根目錄執行：

```powershell
node scripts/build-home.mjs
node scripts/build-home.mjs --check
```

將 `projects.json` 與產生的 `index.html` 一起提交。腳本會檢查作品頁與圖片是否存在，
保留首頁其他內容；不需要安裝套件。新增作品頁時也要更新 `sitemap.xml`，
`lastmod` 填該頁實際修改日期。
