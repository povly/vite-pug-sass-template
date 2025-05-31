# Конвертация шрифтов

## Быстрый старт

1. **Поместите шрифты** в директорию `src/fonts/`
   - Поддерживаются форматы: `.ttf`, `.otf`

2. **Запустите конвертацию**:
   ```bash
   npm run convert-fonts
   ```

3. **Подключите шрифты** в main.scss:
   ```scss
   @import 'fonts';
   ```

## Что происходит при конвертации

- TTF/OTF → WOFF2 (современные браузеры, лучшее сжатие)
- TTF/OTF → WOFF (поддержка старых браузеров)
- Автогенерация `_fonts.scss` с @font-face объявлениями
- Шрифты сохраняются в `public/fonts/`

## Пример использования

```scss
// В вашем SCSS файле
.title {
  font-family: 'YourFontName', Arial, sans-serif;
}
```

## Автоматическая конвертация при сборке

Шрифты конвертируются автоматически при `npm run build` благодаря плагину в `vite.config.js`.

## Поддерживаемые форматы

**Вход**: TTF, OTF
**Выход**: WOFF2, WOFF

## Структура файлов

```
src/
  fonts/          # Исходные шрифты
    - MyFont.ttf
    - AnotherFont.otf
  scss/
    - _fonts.scss  # Автогенерируемый файл

public/
  fonts/          # Конвертированные шрифты
    - MyFont.woff2
    - MyFont.woff
    - AnotherFont.woff2
    - AnotherFont.woff
```
