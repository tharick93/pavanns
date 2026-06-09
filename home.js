/* ============================================================
   DOMAINVERSE — Home Page JS
   ============================================================ */

/* ── Big Search ── */
function fillSearch(val) {
  document.getElementById('bigSearchInput').value = val;
  doBigSearch();
}

function doBigSearch() {
  const input = document.getElementById('bigSearchInput');
  const grid = document.getElementById('searchResultsGrid');
  const q = input.value.trim().toLowerCase().replace(/\s+/g, '') || 'domain';
  const exts = [
    { ext: '.com', price: '$12.99/yr', avail: Math.random() > 0.3 },
    { ext: '.io',  price: '$39.99/yr', avail: Math.random() > 0.4 },
    { ext: '.ai',  price: '$79.99/yr', avail: Math.random() > 0.6 },
    { ext: '.co',  price: '$24.99/yr', avail: Math.random() > 0.3 },
    { ext: '.app', price: '$14.99/yr', avail: Math.random() > 0.4 },
    { ext: '.dev', price: '$12.99/yr', avail: Math.random() > 0.5 },
  ];
  grid.innerHTML = exts.map(e => `
    <div class="s-result-card">
      <div class="s-domain">${q}<span class="ext">${e.ext}</span></div>
      <div class="s-info">
        <div class="s-price">${e.avail ? e.price : 'Make Offer'}</div>
        <div class="s-status" style="color:${e.avail ? 'var(--cyan)' : 'var(--orange)'}">${e.avail ? '✓ Available' : '✗ Taken'}</div>
      </div>
    </div>
  `).join('');
  grid.style.animation = 'fadeUp 0.4s ease both';
}

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

/* ── Search bar hero enter ── */
document.querySelectorAll('.domain-search-bar input').forEach(inp => {
  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter') e.target.nextElementSibling && e.target.nextElementSibling.click();
  });
});
document.querySelector('.domain-search-bar button') &&
  document.querySelector('.domain-search-bar button').addEventListener('click', () => {
    window.showToast('Searching domains...', 'success');
  });

/* ── Lazy image placeholder animation ── */
document.querySelectorAll('.blog-img').forEach(img => {
  img.style.background = `linear-gradient(135deg, rgba(0,229,255,0.08), rgba(255,107,43,0.08))`;
});

/* ── Newsletter form ── */
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.querySelector('button').addEventListener('click', () => {
    const input = form.querySelector('input');
    if (input.value.includes('@')) {
      window.showToast('Subscribed! Welcome to DomainVerse 🎉', 'success');
      input.value = '';
    } else {
      window.showToast('Please enter a valid email', 'error');
    }
  });
});

/* ── Trending card click ── */
document.querySelectorAll('.trending-card').forEach(card => {
  card.addEventListener('click', () => {
    const ext = card.querySelector('.t-ext').textContent;
    const inp = document.getElementById('bigSearchInput');
    if (inp) {
      inp.value = '';
      window.scrollTo({ top: document.querySelector('.search-section').offsetTop - 80, behavior: 'smooth' });
    }
    window.showToast(`Searching ${ext} domains...`, 'success');
  });
});

/* ── Big search enter key ── */
const bsi = document.getElementById('bigSearchInput');
if (bsi) {
  bsi.addEventListener('keydown', e => { if (e.key === 'Enter') doBigSearch(); });
}