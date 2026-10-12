// Keep the verified APK and permanent version-page links when metadata is unavailable.
(() => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  fetch('https://api.github.com/repos/littleblackmann/ChefAIToolbox/releases/latest', {
    headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal,
  }).then(response => {
    if (!response.ok) throw new Error('Release metadata unavailable');
    return response.json();
  }).then(release => {
    if (release.draft || release.prerelease || !/^v\d+\.\d+\.\d+$/.test(release.tag_name)) return;
    const name = `ChefAIToolbox-${release.tag_name.slice(1)}.apk`;
    const asset = Array.isArray(release.assets) && release.assets.find(item =>
      item && item.name === name && item.state === 'uploaded');
    if (!asset || !Number.isFinite(asset.size) || asset.size <= 0) return;
    const url = new URL(asset.browser_download_url);
    const expectedPath = `/littleblackmann/ChefAIToolbox/releases/download/${release.tag_name}/${name}`;
    if (url.origin !== 'https://github.com' || url.pathname !== expectedPath ||
        url.username || url.password || url.search || url.hash) return;
    document.querySelectorAll('[data-chef-download]').forEach(link => { link.href = url.href; });
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
    // The static APK and latest-release page remain available, including without JavaScript.
  }).finally(() => clearTimeout(timeout));
})();
