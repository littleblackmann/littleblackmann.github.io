// Keep a working GitHub release-page fallback when the public API is unavailable.
(() => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  fetch('https://api.github.com/repos/littleblackmann/ziwei-today/releases/latest', {
    headers: { Accept: 'application/vnd.github+json' },
    signal: controller.signal,
  }).then(response => {
    if (!response.ok) throw new Error('Release metadata unavailable');
    return response.json();
  }).then(release => {
    if (release.draft !== false || release.prerelease !== false || !/^v\d+\.\d+\.\d+$/.test(release.tag_name)) return;
    const name = `ZiweiToday-${release.tag_name}.apk`;
    const asset = (release.assets || []).find(item => item.name === name && item.state === 'uploaded');
    if (!asset || !Number.isSafeInteger(asset.size) || asset.size <= 0) return;
    const url = new URL(asset.browser_download_url);
    const expectedPath = `/littleblackmann/ziwei-today/releases/download/${release.tag_name}/${name}`;
    if (url.protocol !== 'https:' || url.hostname !== 'github.com' || url.pathname !== expectedPath ||
        url.username || url.password || url.port || url.search || url.hash) return;
    document.querySelectorAll('[data-ziwei-download]').forEach(link => { link.href = url.href; });
    document.querySelectorAll('[data-release-version]').forEach(node => { node.textContent = release.tag_name; });
    document.querySelectorAll('[data-release-size]').forEach(node => { node.textContent = `${(asset.size / 1e6).toFixed(1)} MB`; });
    const date = new Date(release.published_at);
    if (!Number.isNaN(date.getTime())) {
      const label = new Intl.DateTimeFormat('zh-TW', {
        timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit',
      }).format(date);
      document.querySelectorAll('[data-release-date]').forEach(node => { node.textContent = label; });
    }
  }).catch(() => {
    // The latest-release page remains usable without JavaScript or API access.
  }).finally(() => clearTimeout(timeout));
})();
