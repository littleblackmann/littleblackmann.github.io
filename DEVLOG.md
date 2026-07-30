# 工作日誌 — 小黑的小角落

> **重要：接手工作前，請務必從頭讀完這份日誌，了解過去做了什麼、為什麼這樣做。**

---

## 2026-07-30（第十三次工作）

### 新增作品：SIGNAL FIELD · 全息工作台

- 新增專案詳情頁 `projects/signal-field.html`，包含功能介紹、系統需求、隱私說明與安裝步驟。
- 首頁 `projects.json` 新增作品卡片，並更新快取版本，讓 GitHub Pages 不會沿用舊專案清單。
- 新增公開預覽圖 `images/projects/signal-field-cover.jpg` 與可直接下載的 `downloads/SIGNAL-FIELD-v1.0.0.zip`。
- 將使用者提供的新封面轉為 348 KB JPEG，更新網站封面與下載包；原始 PNG 保留在來源資料夾但不放入公開下載包。
- Steam Workshop 已發布：新增 Workshop 訂閱按鈕，讓訪客可選擇 Steam 訂閱或直接下載完整安裝包。
- 補齊 SIGNAL FIELD 作品頁底部的社群聯絡、贊助區塊與完整 footer，維持網站原有的支持入口。
- 新增 Steam 使用者專用的本機遙測 agent 安裝包；安裝一次後，Steam 訂閱版與完整下載版共用同一個本機 agent 並可自動連線。
- 發布前檢查分享版設定檔，確認只含範例 ICS 位址，沒有私人行事曆連結或使用者設定。
- 更新 `sitemap.xml`，讓新作品頁可被搜尋引擎收錄。

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
4. **新詳情頁的 `</body>` 前加上 GoatCounter 追蹤碼**（不加這頁就不會被追蹤到）：
   ```html
   <script data-goatcounter="https://littleblack.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
   ```
5. `git add . && git commit && git push`

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

## 2026-04-22（第四次工作）

### 做了什麼

#### 1. 新增「請小黑吃雞腿便當」贊助區塊
- 歐付寶個人會員審核通過，拿到**實況主收款**網址（不是一址付，一址付是賣商品用的，會問收件地址不對路）
- 贊助網址：`https://payment.opay.tw/Broadcaster/Donate/7341A28F6CDE05A1A6646A7B26DF4CD8`
- 在**首頁 + 三個作品頁底部**加入贊助卡片（banner 橫幅 + 標題 + 文案 + 按鈕）
- 使用生圖 AI 做了深夜便當橫幅圖，**同一張圖網站和歐付寶共用**，視覺連續

#### 2. 文案與擺放位置決策
- **文案走梗路線**：「請小黑吃雞腿便當 🍱」而非「贊助支持」，保持文青調性
- **位置刻意放低調**：首頁放社群連結下方、作品頁最底部 → 看完內容才看到，不打擾瀏覽
- **明確區分「作品免費、贊助給人」**：文案寫「作品都是免費的。如果你喜歡、想回饋…」避免使用者誤會網站在收費
- **卡片樣式**：max-width 720px 置中、金黑色系邊框、hover 才亮起金邊、banner 微放大

#### 3. 歐付寶申請過程的坑（給未來的自己）
- 個人會員申請流程要填**商店資料/販售資訊**送審，不是填完就能用
- 商品類別選「電玩遊戲與主機 - 其他電玩遊戲/主機」（人生步數是遊戲，最接近）
- 販售網址填 `https://littleblackmann.github.io`
- 商品說明強調「個人作品完全免費、此為自由贊助非商品販售」
- **沒申請 3D 驗證、沒申請信用卡分期**（小額贊助用不到）
- 費率：行動支付 2.45% / 網路購物 2.75%

#### 4. 測試結果（2026-04-22）
- ✅ iPass Money（一卡通 MONEY）測試付款成功
- ⚠️ **玉山信用卡測試失敗** — 刷不過。可能跟沒申請 3D 驗證有關，待之後確認
- 其他付款方式（LINE Pay、街口、其他信用卡）尚未測試
- 結論：**金流通道是通的**，使用者有多種付款選項可用，不影響上線

### 待辦 / 下次可以做的事
- [ ] 測試其他信用卡（中信、國泰、台新）是否也刷不過，判斷是不是 3D 驗證問題
- [ ] 如果多數信用卡都刷不過，考慮去歐付寶後台加開 3D 驗證
- [ ] 測試 LINE Pay、街口支付流程
- [ ] 作品累積到 6+ 個時回頭評估 grid 是否改 3 張一排
- [ ] 之後有新作品時照 SOP 收集（封面圖、截圖、下載連結、大小、版號、平台、標籤）

---

## 2026-04-27（第五次工作）

### 做了什麼

#### 1. 新增 GoatCounter 流量追蹤
- GA4 介面太複雜放棄使用，改用 GoatCounter（簡單、免費、無 Cookie）
- 在 [goatcounter.com](https://www.goatcounter.com) 註冊帳號，帳號名稱 `littleblack`，儀表板網址：`https://littleblack.goatcounter.com`
- 將 GoatCounter script 加入全站所有頁面的 `</body>` 前，GA4 代碼全部移除

#### 3. GoatCounter 使用方式
- 登入：`https://littleblack.goatcounter.com`
- 可以看到：哪天幾人來、訪問最多的頁面、從哪個國家來、用什麼瀏覽器 / 作業系統
- 不需要複雜設定，有資料就會自動顯示

### 待辦 / 下次可以做的事
- [ ] 確認 GoatCounter 有正確收到資料（登入後看有無訪問數字）
- [ ] 測試其他信用卡（中信、國泰、台新）是否也刷不過，判斷是不是歐付寶 3D 驗證問題
- [ ] 如果多數信用卡都刷不過，考慮去歐付寶後台加開 3D 驗證
- [ ] 測試 LINE Pay、街口支付流程
- [ ] 作品累積到 6+ 個時回頭評估 grid 是否改 3 張一排
- [ ] 之後有新作品時照 SOP 收集（封面圖、截圖、下載連結、大小、版號、平台、標籤）

---

## 2026-05-02（第六次工作）

### 做了什麼

#### 1. 全站改版 — 從奇幻 RPG 風改為 editorial dark 風格
- 舊版：Cinzel 字體、紫暗背景（`#0d0d1a`）、金光粒子特效 — 跟 AI / Python 專案調性不搭
- 新版：editorial dark / quiet luxury 雜誌風，安靜可讀，把焦點留給作品本身
- 設計稿來源：`E:\小黑網頁新設計\design-report\`（含 10 章設計交接報告、首頁成品、tokens.css）
- 舊版備份為 `index-old.html`、`style-old.css`、`script-old.js`（保留在 repo 根目錄）

#### 2. 新的 CSS Design Token（全站統一）
```
--bg:#0f0e0c   暖炭黑主背景
--bg-soft:#15130f
--bg-card:#181613
--line:#2a2620
--ink:#f3ede2   米白主文字
--accent:#b8956a  赭金
--serif:'Cormorant Garamond','Noto Serif TC',serif
--mono:'JetBrains Mono',monospace
```

#### 3. 設計守則（明確規定，日後要遵守）
- 不加第二個 accent 色
- 標題字重不超過 400（Noto Serif TC 300 是關鍵氣質來源）
- 不加 emoji 圖示（整站只用文字、線條、義式斜體）
- 不在卡片加陰影（1px 邊框就夠）
- Accent 佔比僅 1%（標題斜體、按鈕邊框、hover、項目符號）

#### 4. 改版範圍
- 首頁 `index.html` — 全新版面（Hero 左文右圖、編號式專案列表、社群+贊助合併區塊）
- 所有專案詳情頁（共 5 個）全部換新 CSS
- GA4 追蹤碼**保留**（GoatCounter 已在第五次加入，兩個並存）

#### 5. 本次工作同時新增兩個專案
- **今日紫微**（`projects/ziwei-today.html`）— Android 紫微斗數 + OpenAI AI 解讀 App，9 張截圖
- **廚師 AI 工具箱**（`projects/chef-ai-toolbox.html`）— Android AI 料理助理，5 張截圖

### 待辦 / 下次可以做的事
- [ ] 測試其他信用卡（中信、國泰、台新）是否也刷不過歐付寶
- [ ] 作品累積到 6 個，回頭評估 grid 是否改 3 張一排

---

## 2026-05-05（第七次工作）

### 做了什麼

#### 1. 首頁 Hero 補強 — 加入作品預覽帶
- 在首頁 Hero 底部新增 `hero-works` 作品預覽帶，桌機版一次顯示 5 個作品縮圖，訪客一進站不用往下滑就能先看到目前有哪些作品
- 原本 Hero 只有人物與文字，這次把入口感做得更明確，讓首頁上半部就同時兼顧「認識小黑」與「快速掃過作品」
- 手機版做了簡化：平板只顯示前 3 個、手機只顯示前 2 個，避免縮圖太擠

#### 2. 首頁比例調整
- 肖像欄位比例從 `1.1fr` 縮為 `0.85fr`，讓人物圖不會壓過作品資訊
- Hero 區塊改為更完整的滿版首屏結構，人物主視覺在上、作品預覽帶貼齊底部，整體更像作品集首頁

#### 3. 社群連結更新為 TomeiKitchen 帳號
- 首頁社群區塊的 YouTube 連結改為 `@TomeiKitchen`
- Instagram 連結改為 `@tomeikitchen`
- 之後如果品牌主軸繼續往料理 / 生活內容靠攏，網站上的社群入口就以這組帳號為主

#### 4. 補充備註
- 目前 repo 根目錄另外有一份 `concept-mockup.html`，內容是首頁概念稿 / 視覺草稿，屬於設計參考檔，**不是正式上線頁面**

### 待辦 / 下次可以做的事
- [ ] 測試其他信用卡（中信、國泰、台新）是否也刷不過歐付寶
- [ ] 觀察 Hero 作品預覽帶是否真的有幫助使用者更快點進作品，如果之後作品更多再評估是否保留 5 欄形式

---

## 2026-05-06（第八次工作）

### 做了什麼

#### 1. 新增專案 — 小白（家用語音 AI 助手）
- 建立 `projects/xiaobai-agent.html`，沿用 editorial dark 版型改寫
- 更新 `projects.json`，小白放第一個（最新作品在前），總數來到 6 個
- 9 張截圖上傳至 `images/projects/`（中文檔名，`小黑的AI-agent-` 開頭）：
  - `小黑的AI-agent-初始畫面.PNG`（封面圖）
  - `小黑的AI-agent-設定基本資料1–4.PNG`
  - `小黑的AI-agent-設定選項1–2.PNG`
  - `小黑的AI-agent-切換使用者畫面.PNG`
  - `小黑的AI-agent-設定完畫面.PNG`
- 標籤：Python / FastAPI / OpenAI API / 語音 AI

#### 2. 特殊處理 — 此作品不對外下載
- 小白是家庭內部使用的語音助手，不開放下載
- 詳情頁移除下載按鈕，改為單行說明文字：「家庭內部使用 · 不對外開放」
- 系統需求表格改為「使用環境」，最後一欄列明開放對象

#### 3. 作品累積到 6 個 — grid 評估
- 作品數已達第三次工作設定的觸發條件（6 個），但首頁改版後已改為「編號式列表」不是 grid，此議題已無需處理，關閉待辦

### 待辦 / 下次可以做的事
- [ ] 測試其他信用卡（中信、國泰、台新）是否也刷不過歐付寶
- [ ] 測試 LINE Pay、街口支付流程

---

## 2026-05-18（第九次工作）

### 做了什麼

#### 1. 更新小白作品頁文案
- 依照 `E:\小黑的AI-Agent\小白AI介紹.md` 的新版說明，把 `projects/xiaobai-agent.html` 從早期「查天氣、問新聞、設提醒」文案，更新為「會記得家人的家庭語音 AI」主線
- 重新整理 Hero、作品介紹、使用流程、重點卡片、核心特色、技術原理、使用環境與隱私說明
- 內容補上目前小白已完成的重點：家人 Profile、Wake Word、聲紋、Reminder Hub、Task Hub、Life Log、Daily Summary、Follow-up Radar、主動事件中心與 A·REACTOR 主畫面

#### 2. 更新首頁專案卡片資料
- 更新 `projects.json` 的小白描述，讓首頁與作品頁一致
- 標籤從 `OpenAI API / 語音 AI` 調整為 `OpenAI Realtime / 家庭 AI`

#### 3. 更新小白截圖引用
- 保留並使用本次更新過的小白截圖檔案
- 將聲紋設定截圖 `小黑的AI-agent-設定聲紋1.PNG`、`小黑的AI-agent-設定聲紋2.png` 接進作品頁 gallery
- 調整截圖 caption，讓畫面說明更貼近新版 onboarding、Profile 與 A·REACTOR 主畫面

#### 4. 調整小白主圖
- 將首頁 `projects.json` 的小白作品縮圖從 `小黑的AI-agent-初始畫面.PNG` 改成 `小黑的AI-agent-設定完畫面.PNG`
- 將 `projects/xiaobai-agent.html` 最上方 cover 圖同步改成 A·REACTOR 主畫面，讓第一眼更接近目前完成後的小白狀態

#### 5. 全作品頁新增圖片放大檢視
- 新增共用 `image-lightbox.css` 與 `image-lightbox.js`
- 6 個作品詳情頁都已接入 lightbox，點擊 cover 或 gallery 截圖可放大檢視
- 支援點背景 / 點圖片 / X 關閉、左右切換、鍵盤 `Esc` 關閉與方向鍵切換
- 首頁作品卡片維持原本點擊進入詳情頁，不做放大，避免破壞首頁導覽

### 待辦 / 下次可以做的事
- [ ] 等 GitHub Pages 部署完成後，線上確認小白作品頁與首頁預覽圖是否都載入新版截圖
- [ ] 之後如果補 30 秒 demo 影片，可以再加到小白作品頁

---

## 2026-06-26（第十次工作）

### 做了什麼

#### 1. 低調 SEO 基礎整理
- 目標是讓 Google 可以正常收錄網站，但不把網站改成履歷或高曝光行銷頁
- 首頁 `index.html` 更新：
  - title：`小黑 Little Black｜個人作品集與開發筆記`
  - description：整理程式作品、AI 工具實驗、生活工具與開發筆記
  - canonical：`https://littleblackmann.github.io/`
  - robots meta：`index, follow`
- 保留 Google Analytics `gtag.js`，沒有移除既有追蹤碼
- JSON-LD 只使用 `WebSite` schema，刻意不使用 `Person` schema

#### 2. 新增搜尋引擎檔案
- 新增 `robots.txt`
  - `User-agent: *`
  - `Allow: /`
  - `Sitemap: https://littleblackmann.github.io/sitemap.xml`
- 新增 `sitemap.xml`
  - 只放正式首頁：`https://littleblackmann.github.io/`
  - 不使用 `#` 路由

#### 3. Open Graph / Twitter Card 補強
- 加入低調版 Open Graph 欄位：
  - `og:title`
  - `og:description`
  - `og:url`
  - `og:type`
  - `og:image`
- 新增 `images/og-image.png`
  - 尺寸 1200x630
  - 深色簡潔文字圖，不放照片、不放真名、不放所在地、不放生日、不放公司或工作經歷
  - 部署後公開路徑：`https://littleblackmann.github.io/images/og-image.png`

#### 4. 首頁內容保持匿名低調
- 首頁介紹文字補上一段：
  - 「這裡整理一些我做過的小工具、AI 實驗、程式作品與日常開發筆記。慢慢做，慢慢放。」
- 頁首原本帶有地點感的文字改成中性字樣：
  - 顯示為 `Quiet · Corner`
  - 時鐘前綴顯示為 `NOW`
- 圖片 alt 改成中性描述：
  - `個人網站視覺圖片`
  - `專案展示圖片`

#### 5. Projects 載入修正與降調
- 首頁 Projects 使用 `projects.json?v=20260626`，避免瀏覽器吃到舊快取
- 如果 `projects.json` 載入失敗或沒有資料，會顯示低調 fallback：
  - AI 語音助手實驗
  - 生活工具開發
  - 資料分析小工具
- `projects.json` 的首頁專案描述改成概念型文字，拿掉過度像履歷或個人背景的語氣

#### 6. 檢查結果
- 本機與公開站都已驗證：
  - `https://littleblackmann.github.io/robots.txt`：200
  - `https://littleblackmann.github.io/sitemap.xml`：200
  - `https://littleblackmann.github.io/images/og-image.png`：200
  - 首頁 canonical、OG image、GA `gtag.js` 都存在
  - Projects 顯示 `06 · Works`，沒有卡在 Loading
  - 首頁 H1 只有 1 個，其他主要區塊使用 H2/H3
- 關鍵字檢查沒有在正式首頁與專案資料中發現真名、所在地、生日、公司、工作經歷、`Person` schema 或 keywords meta

#### 7. 部署狀態
- Commit：`56d2550 Add low-key SEO metadata`
- 已 push 到 GitHub：`littleblackmann/littleblackmann.github.io`
- GitHub Pages source：`main` branch / root
- GitHub Pages 狀態已確認為 `built`

### Google Search Console 下一步
1. 打開或新增資源：`https://littleblackmann.github.io/`
2. 到「Sitemaps」提交：`https://littleblackmann.github.io/sitemap.xml`
3. 到「網址檢查」輸入：`https://littleblackmann.github.io/`
4. 如果顯示尚未收錄，按「要求建立索引」
5. 提交後不用一直重複操作，等 Google 慢慢爬即可

### 待辦 / 下次可以做的事
- [ ] 到 Google Search Console 提交 sitemap，並要求首頁建立索引
- [ ] 幾天後搜尋 `site:littleblackmann.github.io` 看是否已被收錄
- [ ] 之後若新增作品，記得確認 `projects.json` 描述仍保持低調、不要寫成履歷

---

> 下次工作前，請先讀完以上內容再開始。
