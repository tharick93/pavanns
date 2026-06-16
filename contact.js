/* ============================================================
   DOMAINVERSE — Contact Page JS
   ============================================================ */

/* Contact Form */

const contactForm = document.querySelector('.contact-form');

if (contactForm) {

  contactForm.addEventListener('submit', function (e) {

    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value;

    if (email.includes('@')) {

      window.showToast(
        'Message sent successfully! We will contact you shortly.',
        'success'
      );

      this.reset();

      // Redirect to 404 page after successful submission
      setTimeout(() => {
        window.location.href = '404.html';
      }, 700);

    } else {

      window.showToast(
        'Please enter a valid email address.',
        'error'
      );

    }

  });

}

/* Support Cards */

document.querySelectorAll('.support-card').forEach(card => {

  card.addEventListener('click', () => {

    window.showToast(
      'Opening support center...',
      'success'
    );

  });

});

/* Contact Cards Hover Animation */

document.querySelectorAll('.contact-card').forEach(card => {

  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });

});

/* Office Cards */

document.querySelectorAll('.office-box').forEach(box => {

  box.addEventListener('click', () => {

    const title = box.querySelector('h3').textContent;

    window.showToast(
      `${title} Office Selected`,
      'success'
    );

  });

});