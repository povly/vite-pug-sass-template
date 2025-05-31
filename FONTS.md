# 🔤 Конвертация шрифтов

Автоматическая конвертация TTF/OTF шрифтов в веб-форматы WOFF/WOFF2 с сохранением структуры папок.

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install ttf2woff ttf2woff2 --save-dev
```

### 2. Добавление шрифтов

Поместите TTF/OTF файлы в `src/fonts/`:

```
src/fonts/
├── roboto/
│   ├── Roboto-Regular.ttf
│   ├── Roboto-Bold.ttf
│   └── Roboto-Light.ttf
└── opensans/
    ├── OpenSans-Regular.ttf
    └── OpenSans-Bold.ttf
```

### 3. Конвертация

```bash
npm run convert-fonts
```

### 4. Подключение в SCSS

```scss
// src/scss/main.scss
@import 'fonts';

// Использование
.title {
  font-family: 'roboto', Arial, sans-serif;
}
```

## 📁 Структура после конвертации

```
public/fonts/
├── roboto/
│   ├── Roboto-Regular.woff2   # ~50% меньше TTF
│   ├── Roboto-Regular.woff    # ~30% меньше TTF
│   ├── Roboto-Bold.woff2
│   ├── Roboto-Bold.woff
│   ├── Roboto-Light.woff2
│   └── Roboto-Light.woff
└── opensans/
    ├── OpenSans-Regular.woff2
    ├── OpenSans-Regular.woff
    ├── OpenSans-Bold.woff2
    └── OpenSans-Bold.woff

src/scss/
└── _fonts.scss                # Автогенерируемый файл
```

## 🎯 Автогенерируемый CSS

Скрипт создает `src/scss/_fonts.scss` с готовыми `@font-face` декларациями:

```scss
@font-face {
  font-family: 'roboto';
  src:
    url('/fonts/roboto/Roboto-Regular.woff2') format('woff2'),
    url('/fonts/roboto/Roboto-Regular.woff') format('woff');
  font-display: swap;
}

@font-face {
  font-family: 'roboto';
  src:
    url('/fonts/roboto/Roboto-Bold.woff2') format('woff2'),
    url('/fonts/roboto/Roboto-Bold.woff') format('woff');
  font-display: swap;
}

@font-face {
  font-family: 'opensans';
  src:
    url('/fonts/opensans/OpenSans-Regular.woff2') format('woff2'),
    url('/fonts/opensans/OpenSans-Regular.woff') format('woff');
  font-display: swap;
}
```

## ⚙️ Особенности

### Автоматическая сборка

- Шрифты конвертируются автоматически при `npm run build`
- Плагин в `vite.config.js` запускает конвертацию
- Рекурсивный поиск в подпапках

### Оптимизация

- **WOFF2**: лучшее сжатие, поддержка 95% браузеров
- **WOFF**: fallback для старых браузеров
- **font-display: swap**: улучшенная производительность

### Именование семейств

- Имя папки = `font-family`
- Пример: `src/fonts/roboto/` → `font-family: 'roboto'`
- Поддержка любых имен папок

## 🌐 Поддержка браузеров

| Формат | Chrome | Firefox | Safari | Edge | IE  |
| ------ | ------ | ------- | ------ | ---- | --- |
| WOFF2  | 36+    | 39+     | 12+    | 14+  | ❌  |
| WOFF   | 6+     | 3.6+    | 5.1+   | 12+  | 9+  |

## 🚨 Решение проблем

### Шрифты не загружаются в dev режиме

```scss
// Проверьте пути в _fonts.scss
src: url('/fonts/...')  ✅ (правильно)
src: url('./fonts/...') ❌ (неправильно в dev)
```

### Ошибки конвертации

```bash
# Проверьте формат входных файлов
file src/fonts/font.ttf
# Должно показать: TrueType font data

# Переустановите зависимости
npm install ttf2woff ttf2woff2 --save-dev
```

## 📊 Сравнение размеров

| Шрифт Roboto Regular | Размер | Сжатие |
| -------------------- | ------ | ------ |
| TTF (исходный)       | 168 KB | -      |
| WOFF                 | 83 KB  | 51%    |
| WOFF2                | 64 KB  | 62%    |

## 🔄 Автоматизация

### При каждой сборке

```javascript
// vite.config.js уже настроен
// Автоматический запуск при npm run build
```
