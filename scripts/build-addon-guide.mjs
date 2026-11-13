import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const data = JSON.parse(readFileSync(new URL('projects/forever-addons.json', root), 'utf8'));
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link = (url, text, cls='') => `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${text}<span aria-hidden="true"> ↗</span></a>`;
const ids = new Set();
for (const a of data.addons) {
  if (ids.has(a.id) || !a.author || !a.description || !a.modules.length) throw Error('Incomplete or duplicate addon: '+a.id);
  ids.add(a.id);
  for (const u of [a.url, a.download, ...a.modules.map(m => m.url)]) if (!/^https:\/\/(www\.curseforge\.com\/wow\/addons\/|github\.com\/)/.test(u)) throw Error('Unexpected author URL');
}
const assigned = data.categories.flatMap(c => c.addons);
if (assigned.length !== ids.size || new Set(assigned).size !== ids.size || assigned.some(id => !ids.has(id))) throw Error('Category coverage mismatch');
const moduleCount = data.addons.reduce((n, a) => n+a.modules.length, 0);
const card = a => `<article class="addon" id="addon-${esc(a.id)}" data-addon="${esc(a.id)}">
  <div class="card-top"><span class="card-kind">${a.modules.length>1 ? '套件與附屬模組' : '遊戲插件'}</span>${a.upcoming?'<span class="upcoming">下次整合加入</span>':''}</div>
  <h3>${esc(a.title)}</h3><p class="addon-name">${esc(a.name)}</p>
  <p class="purpose">${esc(a.description)}</p>
  <p class="credit"><span>原作者／維護者</span>${esc(a.author)}</p>
  <div class="contribution"><span>本整合的調整</span><p>${esc(a.contribution)}</p></div>
  ${a.modules.length>1 ? `<details class="modules"><summary>包含的 ${a.modules.length} 個插件與模組</summary><ul>${a.modules.map(m=>`<li data-module="${esc(m.name)}"><h4>${esc(m.name)}</h4><p>${esc(m.description)}</p><p class="module-credit">作者／維護：${esc(m.author)}</p>${link(m.url,'作者來源與下載')}</li>`).join('')}</ul></details>` : `<span class="module-marker" data-module="${esc(a.modules[0].name)}" hidden></span>`}
  <div class="source-links">${link(a.url,'作者頁面')}${link(a.download,'官方下載')}</div>
</article>`;
const sections = data.categories.map((c,i)=>`<section class="category" id="${esc(c.id)}" aria-labelledby="heading-${esc(c.id)}"><div class="category-heading"><span class="number">0${i+1}</span><div><h2 id="heading-${esc(c.id)}">${esc(c.name)}</h2><p>${esc(c.description)}</p></div></div><div class="addon-grid">${c.addons.map(id=>card(data.addons.find(a=>a.id===id))).join('')}</div></section>`).join('\n');
const html = `<!DOCTYPE html>
<html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>插件介紹與原作者｜小黑的永恆插件管理器</title>
<meta name="description" content="認識小黑永恆整合清單中的全部插件、資料庫與附屬模組：用途、原作者、官方下載，以及本整合提供的繁中補充與便利調整。">
<link rel="canonical" href="https://littleblackmann.github.io/projects/forever-addons.html">
<meta property="og:title" content="插件介紹與原作者｜小黑的永恆插件管理器">
<meta property="og:description" content="從任務探索到背包拍賣，查看全部整合插件的用途、原作者與官方下載；了解小黑提供的中文與便利調整。">
<meta property="og:type" content="website"><meta property="og:locale" content="zh_TW">
<meta property="og:url" content="https://littleblackmann.github.io/projects/forever-addons.html">
<meta property="og:image" content="https://littleblackmann.github.io/images/projects/forever-manager-v121-main.jpg">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="插件介紹與原作者｜小黑的永恆插件管理器">
<meta name="twitter:description" content="所有整合插件的用途、作者與官方下載，以及小黑的繁中與便利調整。">
<meta name="twitter:image" content="https://littleblackmann.github.io/images/projects/forever-manager-v121-main.jpg">
<link rel="icon" href="../images/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="forever-addons.css?v=20261114"><script src="forever-addons.js?v=20261114" defer></script>
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'CollectionPage',name:'插件介紹與原作者',inLanguage:'zh-Hant',url:'https://littleblackmann.github.io/projects/forever-addons.html',isPartOf:{'@type':'WebPage',url:'https://littleblackmann.github.io/projects/forever-addon-manager.html'},mainEntity:{'@type':'ItemList',numberOfItems:data.addons.length,itemListElement:data.addons.map((a,i)=>({'@type':'ListItem',position:i+1,name:a.name,url:a.url}))}}).replace(/</g,'\\u003c')}</script>
</head><body>
<div class="topbar"><a class="brand" href="../index.html"><span class="seal">黑</span><span>Little Black</span></a><a href="forever-addon-manager.html">返回管理器介紹 <span aria-hidden="true">↗</span></a></div>
<main>
<nav class="breadcrumb" aria-label="導覽路徑"><a href="../index.html">作品 08</a><span aria-hidden="true">／</span><a href="forever-addon-manager.html">永恆插件管理器</a><span aria-hidden="true">／</span><span aria-current="page">插件介紹</span></nav>
<header class="hero"><div><p class="eyebrow">FOREVER · ADDON DIRECTORY</p><h1>讓冒險更順手，<br>也認識幕後的作者。</h1><p class="intro">每個便利功能背後，都有用心製作插件的人。這裡整理全部插件的用途、原作者與官方下載，也說明小黑另外做了哪些中文與便利調整。</p><div class="stats"><div><strong>${data.addons.length}</strong><span>組整合項目</span></div><div><strong>${moduleCount}</strong><span>個插件與附屬模組</span></div><div><strong>02</strong><span>個小黑整合工具</span></div></div></div><figure><img src="../images/projects/forever-adventure-cover.png" alt="暗金羅盤、地圖與戰利品的冒險主題示意" width="1672" height="941"><figcaption>冒險主題示意 · 非遊戲操作畫面</figcaption></figure></header>
<section class="about" aria-labelledby="about-title"><p class="eyebrow">ORIGINAL WORKS · LOCAL TOUCHES</p><h2 id="about-title">插件是作者的作品，整合是我們的用心。</h2><div class="about-grid"><div><h3>原作者提供插件本體</h3><p>任務、導航、戰鬥警報、背包與拍賣等功能，來自下方列出的各插件作者與貢獻者。原始內容及相關權利歸各原作者所有，本工具為非官方整理。</p></div><div><h3>小黑整理中文與使用流程</h3><p>我們製作管理器和遊戲內中文總入口，優化安裝、更新與查找設定的操作流程；另為部分插件補上繁中名稱、選項和提示。作者原有的中文仍屬原作，並非全部由我們翻譯。</p></div></div><p class="availability"><span class="status-dot" aria-hidden="true"></span>標示「下次整合加入」的項目正在準備下一次整合更新，目前公開下載包可能尚未收錄。各作者提供的官方原版，不包含小黑另外整理的中文補充與總入口；自行下載時請選擇 Forever 版本。</p></section>
<div class="directory-tools"><nav class="category-nav" aria-label="插件分類">${data.categories.map(c=>`<a href="#${esc(c.id)}">${esc(c.name)}</a>`).join('')}<a href="#our-tools">小黑的工具</a></nav><div class="search-row" hidden id="search-row"><label for="addon-search">找插件</label><input id="addon-search" type="search" placeholder="搜尋名稱、用途、作者或模組…" autocomplete="off"><span id="result-count" role="status" aria-live="polite">全部 ${data.addons.length} 組</span></div></div>
<div id="directory">${sections}</div><p id="empty-result" hidden>沒有找到符合的插件，試試其他名稱、用途或作者。</p>
<section class="our-tools" id="our-tools" aria-labelledby="our-tools-title"><p class="eyebrow">MADE FOR THIS COLLECTION</p><h2 id="our-tools-title">我們自己製作的整合工具</h2><p class="section-intro">以下兩個工具由小黑整理製作，與上方第三方插件的作者歸屬分開說明。</p><div class="addon-grid"><article class="tool-card"><span class="card-kind">Windows 工具</span><h3>小黑的永恆插件管理器</h3><p>選擇遊戲位置，集中安裝、檢查與更新插件，並同步整合清單及中文內容。管理器介面的更新，與遊戲插件更新分別處理。</p><p class="credit"><span>製作與整理</span>小黑</p><a href="forever-addon-manager.html">查看介紹與下載 <span aria-hidden="true">→</span></a></article><article class="tool-card" data-module="XiaoHeiAddonHub"><span class="card-kind">遊戲內入口</span><h3>小黑插件總入口</h3><p>把已安裝插件的設定與操作說明整理成中文選單，顯示用途、載入狀態與可用入口。隨管理器整合提供。</p><p class="credit"><span>製作與整理</span>小黑</p><a href="forever-addon-manager.html">隨管理器取得 <span aria-hidden="true">→</span></a></article></div></section>
<section class="closing"><p class="eyebrow">THANK YOU, ADDON AUTHORS</p><h2>喜歡某個插件，也可以支持它的作者。</h2><p>點擊各項目的作者頁面，可查看原始介紹、更新紀錄與作者提供的支持方式。這份整理只希望讓你少花點時間找插件，多留一點時間享受遊戲。</p><a class="return-button" href="forever-addon-manager.html">返回管理器介紹與下載 <span aria-hidden="true">→</span></a></section>
</main><footer><a href="forever-addon-manager.html">永恆插件管理器</a><span>© MMXXVI · LITTLE BLACK</span><a href="../index.html">返回作品列表</a></footer>
</body></html>
`;
const output = new URL('projects/forever-addons.html', root);
if (process.argv.includes('--check')) {
  if (readFileSync(output,'utf8').replace(/\r\n/g,'\n') !== html) throw Error('Guide is out of sync; run node scripts/build-addon-guide.mjs');
} else writeFileSync(output, html);
console.log(`Addon guide: ${ids.size} groups, ${moduleCount} third-party modules, 2 own tools.`);
