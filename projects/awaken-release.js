// The verified installer and the release-page link work without this enhancement.
(() => {
  const repository = 'littleblackmann/awaken-ai-releases';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  fetch(`https://api.github.com/repos/${repository}/releases/latest`, {
    headers: { Accept: 'application/vnd.github+json' },
    credentials: 'omit',
    redirect: 'error',
    signal: controller.signal,
  }).then(response => {
    if (!response.ok) throw new Error('Release metadata unavailable');
    return response.json();
  }).then(release => {
    if (release.draft !== false || release.prerelease !== false
        || !/^v\d+\.\d+\.\d+$/.test(release.tag_name)) return;
    const version = release.tag_name.slice(1);
    const filename = `AwakenAI-Setup-${version}-x64.exe`;
    const asset = Array.isArray(release.assets)
      ? release.assets.find(item => item.name === filename && item.state === 'uploaded') : null;
    if (!asset || !Number.isSafeInteger(asset.size) || asset.size <= 0) return;
    const url = new URL(asset.browser_download_url);
    if (url.protocol !== 'https:' || url.hostname !== 'github.com'
        || url.username || url.password || url.port || url.search || url.hash
        || url.pathname !== `/${repository}/releases/download/${release.tag_name}/${filename}`) return;
    document.querySelectorAll('[data-awaken-download]').forEach(link => { link.href = url.href; });
    document.querySelectorAll('[data-awaken-version]').forEach(node => { node.textContent = version; });
    document.querySelectorAll('[data-awaken-size]').forEach(node => {
      node.textContent = asset.size >= 1e9 ? `${(asset.size / 1e9).toFixed(2)} GB` : `${Math.round(asset.size / 1e6)} MB`;
    });
  }).catch(() => {
    // Keep the previously verified download; the visitor can also browse all releases.
  }).finally(() => clearTimeout(timeout));
})();
