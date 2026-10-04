(() => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  fetch('https://api.github.com/repos/littleblackmann/stock-predictor/releases/latest', {
    headers: { Accept: 'application/vnd.github+json' },
    signal: controller.signal,
  })
    .then(response => {
      if (!response.ok) throw new Error('Release unavailable');
      return response.json();
    })
    .then(release => {
      if (release.draft || release.prerelease || !/^v\d+\.\d+\.\d+$/.test(release.tag_name)) return;
      const name = `StockPredictor-${release.tag_name}.zip`;
      const asset = (release.assets || []).find(item => item.name === name && item.state === 'uploaded');
      if (!asset || !Number.isFinite(asset.size) || asset.size <= 0) return;

      const url = new URL(asset.browser_download_url);
      const expectedPath = `/littleblackmann/stock-predictor/releases/download/${release.tag_name}/${name}`;
      if (url.origin !== 'https://github.com' || url.pathname !== expectedPath ||
          url.username || url.password || url.search || url.hash) return;

      document.querySelectorAll('[data-stock-download]').forEach(link => { link.href = url.href; });
      document.querySelectorAll('[data-stock-version]').forEach(el => { el.textContent = release.tag_name; });
      const size = asset.size >= 1e9 ? `${(asset.size / 1e9).toFixed(2)} GB` : `${Math.round(asset.size / 1e6)} MB`;
      document.querySelectorAll('[data-stock-size]').forEach(el => { el.textContent = size; });
      const date = new Date(release.published_at);
      if (!Number.isNaN(date.getTime())) {
        const formatted = new Intl.DateTimeFormat('zh-TW', { timeZone: 'Asia/Taipei',
          year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
        document.querySelectorAll('[data-stock-date]').forEach(el => { el.textContent = formatted; });
      }
    })
    .catch(() => {
      // The verified direct ZIP and permanent Releases link remain usable without the API.
    })
    .finally(() => clearTimeout(timeout));
})();
