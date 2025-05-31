# Линтинг и форматирование

Проект настроен с полным набором инструментов для проверки качества кода и автоматического форматирования.

## Установленные инструменты

### ESLint

- **Назначение**: Проверка JavaScript кода на ошибки и соблюдение стандартов
- **Конфиг**: `eslint.config.js`
- **Поддерживает**: ES modules, браузерные globals, автофикс

### Stylelint

- **Назначение**: Проверка CSS/SCSS кода
- **Конфиг**: `stylelint.config.js`
- **Поддерживает**: SCSS синтаксис, автофикс

### Prettier

- **Назначение**: Автоматическое форматирование кода
- **Конфиг**: `.prettierrc`
- **Поддерживает**: JS, CSS, SCSS, HTML, Markdown

### Pug-lint

- **Назначение**: Проверка Pug шаблонов
- **Конфиг**: `.pugrc.js`
- **Поддерживает**: Валидация синтаксиса и стиля

## Команды

### Линтинг

```bash
# Проверить все файлы
npm run lint

# Проверить только JavaScript
npm run lint:js

# Проверить только CSS/SCSS
npm run lint:css

# Проверить только Pug
npm run lint:pug
```

### Форматирование

```bash
# Форматировать все файлы
npm run format

# Форматировать только JavaScript
npm run format:js

# Форматировать только CSS/SCSS
npm run format:css

# Форматировать только Pug
npm run format:pug

# Проверить форматирование без изменений
npm run check-format
```

### Комбинированные команды

```bash
# Линтинг + форматирование
npm run lint-staged
```

## Настройки

### ESLint правила

- `no-console`: warning - предупреждение о console.log
- `no-unused-vars`: warning - неиспользуемые переменные
- `prefer-const`: error - использовать const вместо let
- `no-var`: error - запрет var

### Stylelint правила

- Стандартные правила SCSS
- Отключены строгие паттерны для классов и переменных
- Поддержка CSS modules (composes)

### Prettier настройки

- Одинарные кавычки
- Точки с запятой
- Trailing commas в ES5 стиле
- 80 символов на строку
- 2 пробела для отступов

## Интеграция с редактором

### VS Code

Установите расширения:

- ESLint
- Stylelint
- Prettier - Code formatter

Добавьте в `settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  }
}
```

### Другие редакторы

Большинство современных редакторов поддерживают эти инструменты через плагины.

## Исключения

Файлы в `.prettierignore`:

- `node_modules/`
- `build/`, `dist/`
- `*.min.js`, `*.min.css`
- `*.pug` (из-за проблем с парсингом JS в шаблонах)

## Troubleshooting

### Ошибки ESLint

- Проверьте, что все браузерные API добавлены в globals
- Используйте `// eslint-disable-next-line` для исключений

### Ошибки Stylelint

- Убедитесь, что используете SCSS синтаксис
- Проверьте правильность вложенности

### Ошибки Prettier

- Pug файлы исключены из автоформатирования
- Используйте `// prettier-ignore` для исключений
