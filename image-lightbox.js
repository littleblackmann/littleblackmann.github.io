(function () {
  const SELECTOR = '.cover-image img, .gallery-item img';
  let items = [];
  let index = 0;
  let lightbox;
  let image;
  let caption;
  let prevButton;
  let nextButton;

  function getCaption(img) {
    const item = img.closest('.gallery-item');
    const captionNode = item ? item.querySelector('.gallery-caption') : null;
    return (captionNode && captionNode.textContent.trim()) || img.alt || '';
  }

  function collectItems() {
    items = Array.from(document.querySelectorAll(SELECTOR)).map((img) => ({
      img,
      src: img.currentSrc || img.src,
      alt: img.alt || '',
      caption: getCaption(img)
    }));
  }

  function buildLightbox() {
    lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', '放大圖片');
    lightbox.innerHTML = `
      <div class="image-lightbox__frame">
        <button class="image-lightbox__button image-lightbox__close" type="button" aria-label="關閉圖片">X</button>
        <button class="image-lightbox__button image-lightbox__nav image-lightbox__prev" type="button" aria-label="上一張">&lt;</button>
        <div class="image-lightbox__image-wrap">
          <img class="image-lightbox__image" alt="">
        </div>
        <button class="image-lightbox__button image-lightbox__nav image-lightbox__next" type="button" aria-label="下一張">&gt;</button>
        <div class="image-lightbox__caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);

    image = lightbox.querySelector('.image-lightbox__image');
    caption = lightbox.querySelector('.image-lightbox__caption');
    prevButton = lightbox.querySelector('.image-lightbox__prev');
    nextButton = lightbox.querySelector('.image-lightbox__next');

    lightbox.querySelector('.image-lightbox__close').addEventListener('click', close);
    image.addEventListener('click', close);
    prevButton.addEventListener('click', () => show(index - 1));
    nextButton.addEventListener('click', () => show(index + 1));
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) close();
    });
  }

  function show(nextIndex) {
    if (!items.length) return;
    index = (nextIndex + items.length) % items.length;
    const item = items[index];
    image.src = item.src;
    image.alt = item.alt;
    caption.textContent = item.caption;
    const multiple = items.length > 1;
    prevButton.hidden = !multiple;
    nextButton.hidden = !multiple;
  }

  function open(img) {
    collectItems();
    if (!lightbox) buildLightbox();
    const found = items.findIndex((item) => item.img === img);
    show(found >= 0 ? found : 0);
    lightbox.classList.add('is-open');
    document.body.classList.add('lightbox-open');
    lightbox.querySelector('.image-lightbox__close').focus();
  }

  function close() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    image.removeAttribute('src');
  }

  document.addEventListener('click', (event) => {
    const img = event.target.closest(SELECTOR);
    if (!img) return;
    event.preventDefault();
    open(img);
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') show(index - 1);
    if (event.key === 'ArrowRight') show(index + 1);
  });
})();
