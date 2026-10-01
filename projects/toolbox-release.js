// The permanent release page also works if JavaScript or the public API is unavailable.
(() => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  fetch('https://api.github.com/repos/littleblackmann/littleblacktoolbox/releases/latest', {
    headers: { Accept: 'application/vnd.github+json' },
    signal: controller.signal,
  }).then(response => {
    if (!response.ok) throw new Error('Release metadata unavailable');
    return response.json();
  }).then(release => {
    const asset = (release.assets || []).find(item =>
      /^littleblacktoolbox_v\d+\.\d+\.\d+\.zip$/.test(item.name) && item.state === 'uploaded');
    if (!asset || !/^v\d+\.\d+\.\d+$/.test(release.tag_name)) return;
    const url = new URL(asset.browser_download_url);
    const expectedPath = `/littleblackmann/littleblacktoolbox/releases/download/${release.tag_name}/${asset.name}`;
    if (url.protocol !== 'https:' || url.hostname !== 'github.com' || url.pathname !== expectedPath) return;
    if (!Number.isFinite(asset.size) || asset.size <= 0) return;
    document.querySelectorAll('[data-toolbox-download]').forEach(link => { link.href = url.href; });
    document.querySelectorAll('[data-release-version]').forEach(node => { node.textContent = release.tag_name; });
    const size = asset.size >= 1e9 ? `${(asset.size / 1e9).toFixed(2)} GB` : `${(asset.size / 1e6).toFixed(1)} MB`;
    document.querySelectorAll('[data-release-size]').forEach(node => { node.textContent = size; });
    const date = new Date(release.published_at);
    if (!Number.isNaN(date.getTime())) {
      const label = new Intl.DateTimeFormat('zh-TW', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
      document.querySelectorAll('[data-release-date]').forEach(node => { node.textContent = label; });
    }
  }).catch(() => {
    // Keep the working latest-release links; visitors can select the full ZIP there.
  }).finally(() => clearTimeout(timeout));
})();
