document.addEventListener('DOMContentLoaded', () => {
  class Modal {
    constructor() {
      this.bodyScrollLock = false;
      this.init();
    }

    init() {
      this.initModalTriggers();
      this.initModalClosers();
    }

    // Lock/unlock body scroll
    toggleBodyScroll(lock) {
      document.body.style.overflow = lock ? 'hidden' : '';
      this.bodyScrollLock = lock;
    }

    // Show modal
    showModal(modal) {
      if (!modal) return;
      modal.classList.add('active');
      this.toggleBodyScroll(true);
      this.dispatchModalEvent('modalOpen', modal);
    }

    // Hide modal
    hideModal(modal) {
      if (!modal) return;
      modal.classList.remove('active');
      this.toggleBodyScroll(false);
      this.dispatchModalEvent('modalClose', modal);
    }

    // Custom event dispatcher
    dispatchModalEvent(eventName, modal, trigger = null) {
      const event = new CustomEvent(eventName, {
        detail: {
          modal,
          trigger,
        },
      });
      document.dispatchEvent(event);
    }

    // Initialize modal triggers
    initModalTriggers() {
      document.querySelectorAll('.modal__show').forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const modalId = trigger.getAttribute('data-modal');
          const modal = document.querySelector(`.modal_${modalId}`);
          this.showModal(modal);
        });
      });
    }

    // Initialize modal close handlers
    initModalClosers() {
      document.querySelectorAll('.modal').forEach((modal) => {
        // Close button handler
        modal.querySelectorAll('.modal__close').forEach((closeBtn) => {
          closeBtn.addEventListener('click', () => this.hideModal(modal));
        });

        // Back button handler
        const backBtn = modal.querySelector('.modal__back');
        if (backBtn) {
          backBtn.addEventListener('click', () => this.hideModal(modal));
        }

        // Click outside modal handler
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            this.hideModal(modal);
          }
        });
      });
    }
  }

  // Initialize modal functionality
  const modal = new Modal();
  window.Modal = modal;
});
