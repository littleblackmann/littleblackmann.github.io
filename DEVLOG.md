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
- [ ] 把網站 push 到 GitHub，確認 `littleblackmann.github.io` 正常顯示
- [ ] 替換範例假資料，放入真正的專案內容
- [ ] 如果需要可以更換 `favicon.png`（目前沿用舊的）
- [ ] 考慮是否要加更多社群連結（例如 GitHub）

---

> 下次工作前，請先讀完以上內容再開始。
