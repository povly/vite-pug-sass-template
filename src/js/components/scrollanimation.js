document.addEventListener('DOMContentLoaded', () => {
  class ScrollAnimation {
    constructor() {
      this.elements = document.querySelectorAll('.p-animate');
      this.init();
    }

    init() {
      if (!this.elements.length) return;

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('p-animate_active');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      this.elements.forEach((element) => {
        this.observer.observe(element);
      });
    }
  }

  // Initialize scroll animations
  const scrollAnimation = new ScrollAnimation();
  // window.scrollAnimation = scrollAnimation;
});
