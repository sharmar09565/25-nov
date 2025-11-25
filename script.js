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