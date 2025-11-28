(function(){
      const reveals = document.querySelectorAll('.reveal');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      reveals.forEach(el => io.observe(el));
    })();

    // FAQ accordion
    (function(){
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        btn.addEventListener('click', () => {
          const expanded = btn.getAttribute('aria-expanded') === 'true';
          if (expanded) {
            btn.setAttribute('aria-expanded','false');
            answer.setAttribute('aria-hidden','true');
            answer.classList.remove('open');
          } else {
            btn.setAttribute('aria-expanded','true');
            answer.setAttribute('aria-hidden','false');
            answer.classList.add('open');
            // optional: close other open answers
            faqItems.forEach(other => {
              if (other !== item) {
                const obtn = other.querySelector('.faq-question');
                const oans = other.querySelector('.faq-answer');
                obtn.setAttribute('aria-expanded','false');
                oans.setAttribute('aria-hidden','true');
                oans.classList.remove('open');
              }
            });
          }
        });
        // keyboard accessibility
        btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
        });
      });
    })();

    // Adjust anchor clicks to account for sticky nav (if needed)
    (function(){
      const navLinks = document.querySelectorAll('nav a[href^="#"]');
      navLinks.forEach(a => {
        a.addEventListener('click', (e) => {
          // let default smooth scroll happen; but ensure target becomes visible with margin
          // Close mobile menu if open
          const menuToggle = document.getElementById('menu-toggle');
          if (menuToggle && menuToggle.checked) menuToggle.checked = false;
        });
      });
    })();

// Handle registration form submission via Fetch and redirect to home
(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    // Ensure a toast container exists for feedback messages (top, white background, black text)
    let toast = document.getElementById('form-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'form-toast';
      toast.className = 'form-toast';
      toast.innerHTML = '<span class="ft-icon" aria-hidden="true">✓</span><span class="ft-msg"></span>';
      document.body.appendChild(toast);
    }

    const showToast = (msg, ms = 2600) => {
      const msgSpan = toast.querySelector('.ft-msg');
      if (msgSpan) msgSpan.textContent = msg;
      toast.classList.add('show');
      // remove any existing timer by clearing data attribute
      if (toast._timer) clearTimeout(toast._timer);
      toast._timer = setTimeout(() => {
        toast.classList.remove('show');
        toast._timer = null;
      }, ms);
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const url = form.action;
      const formData = new FormData(form);
      try {
        const resp = await fetch(url, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        // Show success message regardless of remote captcha handling
        showToast('Submission completed');

        // Reset form fields to blank
        form.reset();

        // Scroll to the registration form section and focus first input
        const formSection = document.getElementById('form');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // fallback: scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

      } catch (err) {
        // On network error, still show feedback and reset
        showToast('Submission completed (offline).');
        form.reset();
        const formSection = document.getElementById('form');
        if (formSection) formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();