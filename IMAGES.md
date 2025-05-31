# Оптимизация изображений

Полное руководство по работе с изображениями в Vite Multi-Page Template.

## Быстрый старт

```bash
# 1. Добавить изображения в src/images/
mkdir src/images
cp your-image.jpg src/images/

# 2. Конвертировать в современные форматы
npm run convert-images

# 3. Использовать в Pug
include ../mixins/picture
+picture('your-image.jpg', 'Описание', 'image-class')
```

## Поддерживаемые форматы

### Входные форматы
- **JPG/JPEG** - фотографии, сложные изображения
- **PNG** - изображения с прозрачностью, графика
- **WebP** - современный формат (уже оптимизированный)
- **TIFF** - высококачественные изображения
- **GIF** - анимированная графика
- **BMP** - растровые изображения

### Выходные форматы
- **AVIF** - самое лучшее сжатие (80% качество)
- **WebP** - широкая поддержка (85% качество)
- **Оптимизированный оригинал** - fallback (90% качество)

## Организация файлов

### Рекомендуемая структура

```
src/images/
├── hero/                    # Hero секции
│   ├── hero-desktop.jpg     # 1920x1080 или больше
│   ├── hero-tablet.jpg      # 1024x768
│   └── hero-mobile.jpg      # 375x667
├── gallery/                 # Галереи
│   ├── gallery-1.jpg
│   ├── gallery-2.jpg
│   └── gallery-3.png
├── icons/                   # Иконки и логотипы
│   ├── logo.svg
│   ├── icon-phone.png
│   └── social-facebook.png
├── backgrounds/             # Фоновые изображения
│   ├── pattern.png
│   ├── texture.jpg
│   └── gradient-overlay.png
└── content/                # Контентные изображения
    ├── article-image.jpg
    ├── product-photo.jpg
    └── team-member.jpg
```

### Именование файлов

```bash
# Хорошо
hero-desktop.jpg
gallery-item-1.jpg
logo-company.png
bg-pattern.jpg

# Плохо
IMG_2341.jpg
picture1.jpeg
background.png
```

## Использование в Pug

### Подключение миксинов

```pug
//- В начале файла
include ../mixins/picture
```

### Адаптивные изображения

```pug
//- Простое изображение с автоматическим выбором формата
+picture('hero.jpg', 'Hero изображение', 'hero__image')

//- С lazy loading и размерами
+picture('gallery-1.jpg', 'Фото 1', 'gallery__item', 'lazy', '(max-width: 768px) 100vw, 50vw')

//- Eager loading для важных изображений
+picture('logo.png', 'Логотип', 'header__logo', 'eager')
```

### Hero изображения

```pug
//- Разные изображения для разных устройств
+hero('hero-mobile.jpg', 'hero-tablet.jpg', 'hero-desktop.jpg', 'Главное изображение', 'hero__bg')
```

### Простые изображения

```pug
//- Без <picture>, просто <img>
+img('simple-icon.png', 'Иконка', 'button__icon')
```

### Фоновые изображения

```pug
//- Создает CSS переменные для фонов
+backgroundImage('pattern.jpg', 'section__background')
  .content
    h2 Заголовок
    p Текст поверх фона
```

## Использование в SCSS

### Подключение миксинов

```scss
@import 'mixins/images';
```

### Фоновые изображения

```scss
// Автоматический выбор формата
.hero {
  @include background-image('hero.jpg');
  @include image-cover;
  height: 100vh;
}

// Разные изображения для разных экранов
.banner {
  @include responsive-background(
    'banner-mobile.jpg',    // <= 767px
    'banner-tablet.jpg',    // 768px - 1023px
    'banner-desktop.jpg'    // >= 1024px
  );
}
```

### CSS переменные

```scss
// Используется с Pug миксином +backgroundImage
.section {
  @include bg-with-vars;
  @include image-cover;
  min-height: 400px;
}
```

### Lazy loading фонов

```scss
.gallery-item {
  @include lazy-background('gallery-item.jpg');

  // Добавить класс .loaded через JS
  &.loaded {
    // Изображение загружено
  }
}
```

### Оптимизация контейнеров

```scss
.card {
  @include optimized-image;

  // Автоматически применяется:
  // - content-visibility: auto
  // - плавная загрузка изображений
  // - правильные размеры picture/img
}
```

## JavaScript интеграция

### Lazy loading контроль

```javascript
// Intersection Observer для lazy loading
const images = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
```

### Фоновые изображения lazy loading

```javascript
// Для фонов с классом lazy-background
const backgrounds = document.querySelectorAll('.lazy-background');
const bgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('loaded');
    }
  });
});

backgrounds.forEach(bg => bgObserver.observe(bg));
```

## Конфигурация оптимизации

### Настройки Sharp (scripts/convert-images.js)

```javascript
// AVIF настройки
.avif({
  quality: 80,        // Качество 0-100
  effort: 4,          # Усилие сжатия 0-9
  chromaSubsampling: '4:2:0'  // Субдискретизация цвета
})

// WebP настройки
.webp({
  quality: 85,        // Качество 0-100
  effort: 4,          // Усилие сжатия 0-6
  method: 6           // Метод сжатия 0-6
})

// JPEG настройки
.jpeg({
  quality: 90,        // Качество 0-100
  progressive: true,  // Прогрессивная загрузка
  mozjpeg: true      // Использовать mozjpeg
})

// PNG настройки
.png({
  quality: 90,           // Качество 0-100
  compressionLevel: 9,   // Уровень сжатия 0-9
  progressive: true      // Прогрессивная загрузка
})
```

### Настройки Vite плагина

```javascript
// vite.config.js
ViteImageOptimize({
  jpg: { quality: 90, progressive: true },
  jpeg: { quality: 90, progressive: true },
  png: { quality: 90, compressionLevel: 9 },
  webp: { quality: 85, effort: 4 },
  avif: { quality: 80, effort: 4 },
  svg: {
    plugins: [
      { name: 'removeViewBox', active: false },
      { name: 'removeDimensions', active: true }
    ]
  }
})
```

## Размеры изображений

### Рекомендации по размерам

```
Hero изображения:
- Desktop: 1920x1080 (16:9) или 1920x800 (2.4:1)
- Tablet: 1024x768 (4:3) или 1024x576 (16:9)
- Mobile: 375x667 (примерно 9:16)

Галерея:
- Квадратные: 800x800, 600x600, 400x400
- Прямоугольные: 800x600 (4:3), 800x450 (16:9)

Иконки:
- Маленькие: 24x24, 32x32, 48x48
- Средние: 64x64, 96x96
- Большие: 128x128, 256x256

Логотипы:
- Обычные: 200x80, 300x120
- Ретина: 400x160, 600x240
```

### Adaptive изображения

```pug
//- Используйте sizes для оптимизации загрузки
+picture('hero.jpg', 'Hero', 'hero__image', 'lazy', '100vw')

+picture('card-image.jpg', 'Карточка', 'card__image', 'lazy', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw')
```

## Performance оптимизация

### Preload критичных изображений

```html
<!-- В <head> для важных изображений -->
<link rel="preload" as="image" href="/images/hero.avif" type="image/avif">
<link rel="preload" as="image" href="/images/hero.webp" type="image/webp">
<link rel="preload" as="image" href="/images/hero.jpg" type="image/jpeg">
```

### Prioritization

```pug
//- Важные изображения "above the fold"
+picture('hero.jpg', 'Hero', 'hero__image', 'eager')

//- Остальные изображения
+picture('gallery-1.jpg', 'Галерея', 'gallery__item', 'lazy')
```

### Resource hints

```html
<!-- Предзагрузка домена для изображений -->
<link rel="dns-prefetch" href="//images.example.com">
<link rel="preconnect" href="//images.example.com">
```

## Поддержка браузеров

### Статистика поддержки

- **AVIF**: Chrome 85+, Firefox 93+, Safari 16+ (~90% пользователей)
- **WebP**: Chrome 23+, Firefox 65+, Safari 14+ (~96% пользователей)
- **JPEG/PNG**: Все браузеры (100% пользователей)

### Fallback стратегия

```html
<!-- Автоматически генерируется миксином +picture -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Описание">
</picture>
```

## Автоматизация

### При разработке

```bash
# Автоматическая конвертация при изменении файлов
npm run dev
# Файлы обрабатываются автоматически при обнаружении новых изображений
```

### При сборке

```bash
# Автоматическая оптимизация
npm run build
# Включает:
# 1. Конвертацию в современные форматы
# 2. Дополнительную оптимизацию Vite плагином
# 3. Минификацию SVG
```

### CI/CD интеграция

```yaml
# .github/workflows/build.yml
- name: Install dependencies
  run: npm ci

- name: Convert images
  run: npm run convert-images

- name: Build
  run: npm run build
```

## Troubleshooting

### Проблемы с Sharp

```bash
# Переустановка Sharp
npm uninstall sharp
npm install --save-dev sharp

# Очистка кэша
npm cache clean --force
```

### Большие файлы

```javascript
// Увеличить качество для больших файлов
if (fileSize > 2000000) { // 2MB
  quality = 95;
}
```

### Медленная конвертация

```javascript
// Параллельная обработка
const maxConcurrency = require('os').cpus().length;
// Используйте worker threads или child processes
```

## Best Practices

1. **Используйте правильные форматы**:
   - JPEG для фотографий
   - PNG для графики с прозрачностью
   - SVG для простых иконок
   - WebP/AVIF для веба

2. **Оптимизируйте размеры**:
   - Не загружайте изображения больше, чем нужно
   - Используйте responsive изображения
   - Применяйте lazy loading

3. **Именуйте файлы осмысленно**:
   - Используйте описательные названия
   - Группируйте по папкам
   - Следуйте конвенции именования

4. **Тестируйте производительность**:
   - Используйте Lighthouse
   - Проверяйте Core Web Vitals
   - Тестируйте на медленных соединениях

5. **Мониторьте размеры**:
   - Следите за размером bundle
   - Используйте Budget в Webpack/Vite
   - Регулярно оптимизируйте изображения
