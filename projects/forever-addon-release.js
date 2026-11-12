(() => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const read = url => fetch(url, {
    headers: { Accept: 'application/json' }, cache: 'no-store', signal: controller.signal,
  })
    .then(response => {
      if (!response.ok) throw new Error('Release unavailable');
      return response.json();
    });
  read(new URL('forever-addon-latest.json', document.currentScript.src))
    .catch(() => read('https://api.github.com/repos/littleblackmann/wow-forever-addon-updater/releases/latest'))
    .then(release => {
      if (release.repository && release.repository !== 'littleblackmann/wow-forever-addon-updater') return;
      if (release.draft || release.prerelease || !/^v\d+\.\d+\.\d+$/.test(release.tag_name)) return;
      const name = `XiaoHeiForeverUpdater-${release.tag_name}.zip`;
      const asset = (release.assets || []).find(item => item.name === name && item.state === 'uploaded');
      if (!asset || !Number.isFinite(asset.size) || asset.size <= 0) return;
      const url = new URL(asset.browser_download_url);
      const path = `/littleblackmann/wow-forever-addon-updater/releases/download/${release.tag_name}/${name}`;
      if (url.origin !== 'https://github.com' || url.pathname !== path ||
          url.username || url.password || url.search || url.hash) return;
      document.querySelectorAll('[data-forever-download]').forEach(link => { link.href = url.href; });
      document.querySelectorAll('[data-forever-version]').forEach(el => { el.textContent = release.tag_name; });
      document.querySelectorAll('[data-forever-size]').forEach(el => { el.textContent = `約 ${Math.round(asset.size / 1e6)} MB`; });
    })
    .catch(() => { /* Keep the GitHub Releases page as the fallback. */ })
    .finally(() => clearTimeout(timeout));
})();
