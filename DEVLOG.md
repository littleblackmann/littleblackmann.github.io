# 工作日誌 — 小黑的小角落

> **重要：接手工作前，請務必從頭讀完這份日誌，了解過去做了什麼、為什麼這樣做。**

---

## 2026-04-08（第一次工作）

### 背景
- 小黑原本有一個用 Hugo + Liva Hugo 主題做的部落格網站，託管在 GitHub Pages（`littleblackmann.github.io`）
- 覺得 Hugo 太複雜不好維護，決定全部砍掉重做
- 新需求：做一個個人介紹網站，能展示專案、放社群連結，風格要像魔獸世界

### 做了什麼

#### 1. 清除所有舊檔案
- 刪除了 Hugo 產生的所有資料夾：`about/`、`blog/`、`categories/`、`contact/`、`js/`、`page/`、`plugins/`、`scss/`、`search/`、`tags/`
- 刪除舊檔案：`index.html`、`index.json`、`index.xml`、`sitemap.xml`
- 保留了 `images/` 資料夾，但清掉了裡面不需要的舊圖片
- 新建了 `images/projects/` 資料夾（放專案截圖用）

#### 2. 全新建站（純 HTML/CSS/JS，不用任何框架）
建立了以下檔案：

| 檔案 | 用途 |
|---|---|
| `index.html` | 唯一的 HTML 頁面（單頁式） |
| `style.css` | 所有樣式（魔獸世界深色主題） |
| `script.js` | 粒子背景特效、導航列滾動效果、漢堡選單、滾動顯示動畫、從 projects.json 動態載入專案 |
| `projects.json` | 專案資料（JSON 格式，改這個就能新增/修改專案） |

#### 3. 網站結構（單頁式，由上到下）
1. **導航列** — 固定頂部，有手機版漢堡選單，錨點連結到各區塊
2. **Hero** — 「小黑」標題 + Slogan：「還在路上，慢慢往前走，樂在其中。」
3. **關於我** — 大頭照 + 自我介紹文字面板
4. **專案作品** — 從 `projects.json` 動態讀取，每個專案一張卡片
5. **社群連結** — YouTube + Instagram
6. **頁尾** — 版權資訊（2025）

#### 4. 設計決策
- **風格**：魔獸世界風格 — 深色背景（`#0d0d1a`）+ 金色文字（`#c9aa71`）+ 粒子光效
- **邊框**：原本用金色邊框，小黑覺得太搶眼，改成低調暗色細邊（`#2a2a3e`），hover 時微微亮起
- **大小**：原本各區塊間距很大，小黑希望「小一點一頁式的感覺」，所以大幅縮減了 padding、字體大小、元素尺寸
- **Hero**：從 `min-height: 100vh` 改成 `60vh`，讓一個畫面就能看到 Hero + 關於我
- **容器最大寬度**：從 `1100px` 縮到 `700px`
- **標題字體**：使用 Google Fonts 的 Cinzel（中世紀風格）
- **內文字體**：Noto Sans TC（繁體中文）

#### 5. 其他調整
- 網頁標題（瀏覽器分頁）：從「小黑 — 個人作品集」改成「小黑的小角落」
- 大頭照：從舊照片換成動漫風格的程式開發者圖片（`images/avatar.png`）
- 向下捲動箭頭提示：因為頁面縮小後不需要了，已隱藏

### 社群連結（目前使用中）
- YouTube: `https://www.youtube.com/channel/UCFIwk5K008MMtRAofnNVOLw`
- Instagram: `https://www.instagram.com/free__yi/`

### 新增專案的方式
編輯 `projects.json`，格式：
```json
[
  {
    "name": "專案名稱",
    "description": "專案說明",
    "image": "images/projects/xxx.jpg",
    "link": "https://連結",
    "tags": ["Vue.js", "Python"]
  }
]
```
把截圖丟進 `images/projects/`，然後 `git push` 即可。

### 目前檔案結構
```
littleblackmann.github.io-main/
├── index.html
├── style.css
├── script.js
├── projects.json
├── DEVLOG.md          ← 你正在看的這個
└── images/
    ├── avatar.png     ← 大頭照
    ├── favicon.png    ← 網站圖示
    └── projects/      ← 專案截圖放這裡
```

### 待辦 / 下次可以做的事
- [x] 把網站 push 到 GitHub，確認 `littleblackmann.github.io` 正常顯示 ✔ 已在第二次工作完成
- [x] 替換範例假資料，放入真正的專案內容 ✔ 已在第二次工作完成
- [ ] 如果需要可以更換 `favicon.png`（目前沿用舊的）
- [ ] 考慮是否要加更多社群連結（例如 GitHub）

---

## 2026-04-08（第二次工作）

### 做了什麼

#### 1. 版面精簡化 — Hero 合併關於我
- 討論了 4 種流行版面方案（A: 合併 Hero / B: 專案優先 / C: Bento Grid / D: 加技能區塊）
- 小黑選了方案 A：把大頭照 + 自我介紹融進 Hero 區塊，移除獨立的「關於我」section
- 大頭照改為圓形（`border-radius: 50%`），放在標題上方
- 自我介紹文字直接放在 slogan 下方

#### 2. 移除導航列
- 小黑覺得頁面很短、滾一下就到底，不需要 navbar
- 完整移除：HTML nav 元素、CSS 導航列樣式、JS 滾動效果和漢堡選單邏輯
- Hero 上方 padding 從 `6rem` 調為 `4rem`，移除 `scroll-padding-top`

#### 3. 新增專案 — 台股預測分析系統
- 替換 `projects.json` 中的假資料為真實專案
- 建立獨立詳細頁 `projects/stock-predictor.html`
- 內容涵蓋：功能介紹（6 卡片）、預測原理（3 步驟）、系統截圖（3 張）、系統需求表格、風險聲明
- 頂部和底部各放一個下載按鈕（Google Drive 連結）
- 下載連結：`https://drive.google.com/file/d/1ELeGMH7CEh_4z9ZsP2CzmZ8GvHe0Cx3a/view?usp=sharing`
- 截圖檔案：`stock-cover.png`（封面/結果畫面）、`stock-main.png`（空白主畫面）、`stock-progress.png`（預測進度）

#### 4. 新增專案 — 小黑工具箱
- 加入 `projects.json` 第二個專案
- 建立獨立詳細頁 `projects/toolbox.html`
- 內容涵蓋：使用流程（4 步驟）、重點數據卡片（5 工具/0 安裝/100% 離線/0 上傳）、5 個工具介紹卡片、系統截圖（3 張）、技術原理、系統需求表格、隱私聲明
- 下載連結：`https://drive.google.com/file/d/1kKQVuEBL2riLv84Y0hBY02glUGrAhdNL/view?usp=sharing`
- 截圖檔案：`toolbox-cover.png`（工具首頁）、`toolbox-rembg.png`（AI 去背）、`toolbox-ocr.png`（OCR 辨識）

#### 5. 專案卡片改為整張可點擊
- `script.js` 中把卡片從 `<div>` 改為 `<a>` 標籤，整張卡片可點擊
- 內部連結（詳細頁）在同一視窗開啟，外部連結則新分頁開啟

#### 6. 部署上線
- 在資料夾初始化 git，commit 所有檔案
- Force push 到 `littleblackmann/littleblackmann.github.io` repo（覆蓋舊的 Hugo 內容）
- 開啟 GitHub Pages（source: main branch, root）
- 網站已上線：`https://littleblackmann.github.io`

### 目前網站結構（更新後）
```
Hero（大頭照 + 名字 + slogan + 自介）
    ↓
專案作品（台股預測分析系統 / 小黑工具箱）
    ↓
社群連結（YouTube / Instagram）
    ↓
頁尾
```

### 目前檔案結構（更新後）
```
littleblackmann.github.io-main/
├── index.html
├── style.css
├── script.js
├── projects.json
├── DEVLOG.md
├── images/
│   ├── avatar.png
│   ├── favicon.png
│   └── projects/
│       ├── stock-cover.png
│       ├── stock-main.png
│       ├── stock-progress.png
│       ├── toolbox-cover.png
│       ├── toolbox-ocr.png
│       └── toolbox-rembg.png
└── projects/
    ├── stock-predictor.html
    └── toolbox.html
```

### 新增專案的方式（更新版）
1. 編輯 `projects.json` 加入新專案
2. 在 `projects/` 建立對應的詳細頁 HTML（可參考 `stock-predictor.html` 或 `toolbox.html` 的格式）
3. 把截圖丟進 `images/projects/`
4. `git add . && git commit && git push`

### 新增專案時需要準備的東西
1. **簡報版報告**（`PROJECT_REPORT_簡報版.md`）— 我會根據這個整理詳細頁的內容
2. **封面截圖 1 張** — 放首頁卡片用，選最能代表整個系統的畫面（檔名：`xxx-cover.png`）
3. **功能截圖 2~4 張** — 放詳細頁，挑最有亮點的功能畫面
4. **雲端下載連結** — Google Drive 分享連結
5. 所有圖片丟進 `images/projects/`

### 待辦 / 下次可以做的事
- [ ] 如果需要可以更換 `favicon.png`（目前沿用舊的）
- [ ] 考慮是否要加更多社群連結（例如 GitHub）
- [ ] 詳細頁的樣式目前是各自獨立寫在 `<style>` 裡，如果專案變多可以考慮抽成共用 CSS

---

## 2026-04-19（第三次工作）

### 做了什麼

#### 1. 新增專案 — 人生步數（Android 計步養成遊戲）
- 建立 `projects/life-steps.html`，沿用 `toolbox.html` 的版型改寫
- 更新 `projects.json`，人生步數放第一個（最新作品在前）
- 6 張截圖丟進 `images/projects/`（中文檔名）：
  - `人生步數-首頁.jpg`（封面圖）
  - `人生步數-開始畫面.jpg`
  - `人生步數-取名子生日.jpg`
  - `人生步數-足跡.jpg`
  - `人生步數-人生圖鑑.jpg`
  - `人生步數-設定.jpg`
- 下載連結：`https://drive.google.com/drive/folders/18GWxaUCECFufkgTsGzmPRLm4s_nUpBby?usp=sharing`（資料夾形式，含 APK + zip + 安裝說明）
- 版本 v1.0.0，APK 約 30 MB，僅支援 Android 8.0+（iOS 無法裝）
- 詳情頁標籤：Kotlin / Jetpack Compose / Room / Android

#### 2. 頁面結構（成為未來作品頁的範本）
標題 → 封面 → 這是什麼 → 怎麼玩流程 → 重點數據 → 七個生命階段 → 核心特色 → 遊戲畫面 gallery → 怎麼做到的（技術）→ 系統需求 → 安裝提醒 → 隱私 → 底部下載按鈕。

#### 3. 文案決策（日後新專案都套用）
- **移除** 原本寫的「Flutter 砍掉重練」那句 — 開發過程內部八卦對使用者沒意義
- **不放** GitHub 原始碼連結 — 小黑想讓訪客透過 IG / YT 自己私訊聯絡，不走技術管道
- **不放** Email — 同上
- 調性：溫暖、療癒、文青感，不要商業化或誇大字眼

#### 4. 版面設計決策 — 專案卡片 grid
- 小黑問電腦版 2 張一排會不會太擠 → 討論後保留 2 張一排
- **觸發改 3 張一排的判斷條件**：作品累積到 **6 個以上**、卡片之間開始顯得過度疏鬆時再改
- 目前 3 個作品（人生步數 / 台股 / 工具箱）還太早，2 張一排反而大氣

### 待辦 / 下次可以做的事
- [ ] 作品累積到 6+ 個時回頭評估 grid 是否改 3 張一排
- [ ] 之後有新作品時照 SOP 收集（封面圖、截圖、下載連結、大小、版號、平台、標籤）

---

> 下次工作前，請先讀完以上內容再開始。
