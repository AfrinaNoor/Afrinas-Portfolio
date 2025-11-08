document.addEventListener('DOMContentLoaded', function () {
  // ---------------- theme ----------------
  const themeToggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') document.documentElement.setAttribute('data-theme','dark');
  updateThemeIcon();

  if (themeToggle) themeToggle.addEventListener('click', function () {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const t = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
    document.querySelectorAll('#themeToggle').forEach(n => n.textContent = t);
  }

  // ---------------- mobile nav ----------------
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));

  // ---------------- set active nav link ----------------
  document.querySelectorAll('.main-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    const current = location.pathname.split('/').pop() || 'index.html';
    if (href === current || (href.endsWith('#contact') && current === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---------------- projects filter ----------------
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.project').forEach(p => {
        if (f === 'all' || p.dataset.type === f) p.style.display = '';
        else p.style.display = 'none';
      });
    });
  });

  // ---------------- achievements modal ----------------
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const caption = document.getElementById('caption');
  const closeBtn = document.querySelector('.modal .close');

  document.querySelectorAll('.ach-item img').forEach(img => {
    img.addEventListener('click', () => {
      if (!modal) return;
      modal.style.display = 'flex';
      modalImg.src = img.src;
      caption.textContent = img.alt || '';
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none' });

  // ---------------- contact form demo ----------------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Simple demo behaviour:
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) {
        alert('Please fill required fields.');
        return;
      }
      // show success, clear form (in production, connect to backend/email service)
      alert('Thanks, ' + name + '! Your message has been received (demo).');
      contactForm.reset();
    });
  }

  // ---------------- set footer year(s) ----------------
  const y = new Date().getFullYear();
  document.querySelectorAll('#year, #yearSkills, #yearResume, #yearProjects, #yearAchievements, #yearContact').forEach(el => { if (el) el.textContent = y; });
});
