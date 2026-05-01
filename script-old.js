/* =============================================
   小黑的個人網站 — JavaScript
   ============================================= */

// ---- 粒子背景特效 ----
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedY: -(Math.random() * 0.3 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      flickerSpeed: Math.random() * 0.02 + 0.005,
      flickerOffset: Math.random() * Math.PI * 2
    };
  }

  function init() {
    resize();
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const time = Date.now() * 0.001;

    particles.forEach(p => {
      const flicker = Math.sin(time * p.flickerSpeed * 60 + p.flickerOffset) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 170, 113, ${p.opacity * flicker})`;
      ctx.fill();

      // 微光暈
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 170, 113, ${p.opacity * flicker * 0.1})`;
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      // 超出邊界重置
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -10 || p.x > canvas.width + 10) {
        p.x = Math.random() * canvas.width;
        p.y = canvas.height + 10;
      }
    });

    animationId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animationId);
    init();
    draw();
  });

  init();
  draw();
})();


// ---- 滾動顯示動畫 ----
(function () {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => observer.observe(section));
})();


// ---- 載入專案資料 ----
(function () {
  const grid = document.getElementById('projectsGrid');
  const emptyMsg = document.getElementById('projectsEmpty');

  fetch('projects.json')
    .then(res => {
      if (!res.ok) throw new Error('無法載入專案資料');
      return res.json();
    })
    .then(projects => {
      if (!projects || projects.length === 0) {
        emptyMsg.style.display = 'block';
        return;
      }

      projects.forEach(project => {
        const isExternal = project.link && project.link.startsWith('http');
        const card = document.createElement('a');
        card.className = 'project-card';
        card.href = project.link || '#';
        if (isExternal) {
          card.target = '_blank';
          card.rel = 'noopener';
        }

        const imageHTML = project.image
          ? `<div class="project-card-image"><img src="${project.image}" alt="${project.name}" loading="lazy"></div>`
          : '';

        const tagsHTML = project.tags
          ? project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')
          : '';

        card.innerHTML = `
          ${imageHTML}
          <div class="project-card-body">
            <h3 class="project-card-title">${project.name}</h3>
            <p class="project-card-desc">${project.description}</p>
            ${tagsHTML ? `<div class="project-card-tags">${tagsHTML}</div>` : ''}
            <span class="project-card-link">查看詳情</span>
          </div>
        `;

        grid.appendChild(card);
      });
    })
    .catch(() => {
      emptyMsg.style.display = 'block';
    });
})();
