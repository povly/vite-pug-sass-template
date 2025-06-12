document.addEventListener('DOMContentLoaded', () => {
  const hFaqs = document.querySelectorAll('.h-faqs');
  if (hFaqs[0]) {
    hFaqs.forEach((hFaq) => {
      const items = hFaq.querySelectorAll('.h-faqs__item');
      items.forEach((item) => {
        const btn = item.querySelector('.h-faqs__btn');
        const content = item.querySelector('.h-faqs__content');
        btn.addEventListener('click', () => {
          item.classList.toggle('active');
          if (item.classList.contains('active')) {
            content.style.height = content.scrollHeight + 'px';
          } else {
            content.style.height = '';
          }
        });
      });
    });
  }
});
