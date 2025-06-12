document.addEventListener('DOMContentLoaded', () => {
  class Toast {
    constructor() {
      this.activeToast = null;
    }

    show(message, options = {}) {
      const config = {
        type: 'info',
        duration: 4000,
        closable: false,
        ...options,
      };

      // Скрываем предыдущий тост если есть
      if (this.activeToast) {
        this.hide(this.activeToast);
      }

      const toast = this.createToast(message, config);
      document.body.appendChild(toast);
      this.activeToast = toast;

      // Показываем с анимацией
      requestAnimationFrame(() => {
        toast.classList.add('toast--show');
      });

      // Автоскрытие
      if (config.duration > 0) {
        setTimeout(() => {
          this.hide(toast);
        }, config.duration);
      }

      return toast;
    }

    createToast(message, config) {
      const toast = document.createElement('div');
      toast.className = `toast toast--${config.type}`;

      const content = document.createElement('div');
      content.className = 'toast__content';
      content.textContent = message;

      toast.appendChild(content);

      // Прогресс бар
      if (config.duration > 0) {
        const progress = document.createElement('div');
        progress.className = 'toast__progress';
        progress.style.animationDuration = `${config.duration}ms`;
        toast.appendChild(progress);
      }

      // Кнопка закрытия
      if (config.closable) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'toast__close';
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', () => this.hide(toast));
        toast.appendChild(closeBtn);
      }

      // Скрытие по клику на тост
      toast.addEventListener('click', () => this.hide(toast));

      return toast;
    }

    hide(toast) {
      if (!toast || toast !== this.activeToast) return;

      toast.classList.remove('toast--show');
      this.activeToast = null;

      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }

    // Методы быстрого доступа
    success(message, options = {}) {
      return this.show(message, { ...options, type: 'success' });
    }

    error(message, options = {}) {
      return this.show(message, { ...options, type: 'error' });
    }

    warning(message, options = {}) {
      return this.show(message, { ...options, type: 'warning' });
    }

    info(message, options = {}) {
      return this.show(message, { ...options, type: 'info' });
    }
  }

  // Создаем глобальный экземпляр
  const toast = new Toast();

  // Экспортируем для использования в других модулях
  window.Toast = toast;
});
