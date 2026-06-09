/* ============================================================
   DOMAINVERSE — About Page JS
   ============================================================ */
// Newsletter
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