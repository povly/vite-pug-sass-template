// About page JavaScript

document.addEventListener('DOMContentLoaded', function () {
  console.log('About page script loaded');

  // Animate stats counters
  const statsItems = document.querySelectorAll('.stats__item-number');

  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 20);
  };

  // Intersection Observer for stats
  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target);
          if (target) {
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  statsItems.forEach((item) => {
    // Extract number from text content
    const number = parseInt(item.textContent.replace(/\D/g, ''));
    item.dataset.target = number;
    item.textContent = '0';
    statsObserver.observe(item);
  });

  // Section animations
  const sections = document.querySelectorAll('.about__section');
  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform =
      index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
  });

  // Progressive list reveal
  const lists = document.querySelectorAll('.about__section ul');
  lists.forEach((list) => {
    const items = list.querySelectorAll('li');
    items.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(10px)';
      item.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;

      setTimeout(
        () => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        },
        500 + index * 100
      );
    });
  });

  // Contact form handling (if present)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple form validation and submission
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      console.log('Form data:', data);

      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Сообщение отправлено!';
      successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        z-index: 1000;
      `;

      document.body.appendChild(successMessage);

      setTimeout(() => {
        successMessage.remove();
      }, 3000);

      this.reset();
    });
  }
});
