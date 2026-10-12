import { readFile, writeFile, access } from 'node:fs/promises';

// projects.json is the source of truth; commit the generated index.html with it.
const root = new URL('../', import.meta.url);
const projects = JSON.parse(await readFile(new URL('projects.json', root), 'utf8'));
const file = new URL('index.html', root);
const original = await readFile(file, 'utf8');
const eol = original.includes('\r\n') ? '\r\n' : '\n';
const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

if (!Array.isArray(projects) || !projects.length) throw new Error('No projects found');
const links = new Set();
for (const project of projects) {
  if (!project.name || !project.description || !Array.isArray(project.tags)
      || !/^projects\/[a-z0-9-]+\.html$/.test(project.link)
      || !/^images\/projects\/[^/]+\.(png|jpe?g|webp)$/.test(project.image)
      || links.has(project.link)) throw new Error(`Invalid project: ${project.name}`);
  links.add(project.link);
  await Promise.all([access(new URL(project.link, root)), access(new URL(project.image, root))]);
}

const number = index => String(index + 1).padStart(2, '0');
const image = project => `<img src="${escape(project.image)}" alt="${escape(project.name)}畫面預覽" loading="lazy" decoding="async">`;
const tiles = projects.map((project, index) => `
    <a class="work-tile" href="${escape(project.link)}">
      <div class="work-tile-inner">
        <span class="work-num">${number(index)}</span>
        <div class="work-thumb">${image(project)}</div>
        <div class="work-name">${escape(project.name)}</div>
        <span class="work-tag">${escape(project.tags.slice(0, 2).join(' · '))}</span>
      </div>
      <span class="work-arrow" aria-hidden="true">→</span>
    </a>`).join('');
const rows = projects.map((project, index) => `
    <a class="project" href="${escape(project.link)}">
      <div class="project-num">${number(index)} / ${String(projects.length).padStart(2, '0')}</div>
      <div class="project-info">
        <h3 class="project-title">${escape(project.name)}</h3>
        <p class="project-desc">${escape(project.description)}</p>
        <div class="project-tags">${project.tags.map(tag => `<span class="project-tag">${escape(tag)}</span>`).join('')}</div>
      </div>
      <div class="project-thumb">
        ${image(project)}
        <div class="project-arrow"><span>查看詳情</span><b aria-hidden="true">→</b></div>
      </div>
    </a>`).join('');

let html = original;
for (const [name, content] of [['tiles', tiles], ['rows', rows]]) {
  const pattern = new RegExp(`<!-- projects:${name}:start -->[\\s\\S]*?<!-- projects:${name}:end -->`, 'g');
  if ([...html.matchAll(pattern)].length !== 1) throw new Error(`Missing or duplicate ${name} markers`);
  html = html.replace(pattern, () => `<!-- projects:${name}:start -->${content}\n    <!-- projects:${name}:end -->`.replace(/\n/g, eol));
}
html = html.replace(/(<b id="metaCount">)[^<]*(<\/b>)/, (_, open, close) => `${open}${String(projects.length).padStart(2, '0')}${close}`)
  .replace(/(<div class="count" id="projCount">)[^<]*(<\/div>)/, (_, open, close) => `${open}${String(projects.length).padStart(2, '0')} · Works${close}`);

if (process.argv.includes('--check')) {
  if (html !== original) throw new Error('Homepage is stale. Run node scripts/build-home.mjs');
  console.log(`Homepage matches all ${projects.length} projects.`);
} else {
  if (html !== original) await writeFile(file, html, 'utf8');
  console.log(`Generated ${projects.length} project previews and links.`);
}
