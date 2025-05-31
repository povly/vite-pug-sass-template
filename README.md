# Vite Multi-Page Template

Профессиональный шаблон для multi-page приложений с Pug, Sass-embed, autoprefixer и полной кроссбраузерной совместимостью.

## Возможности

- ⚡️ **Vite** - быстрая сборка и hot reload
- 🎨 **Pug** - мощный шаблонизатор с компонентами и миксинами
- 🎯 **Sass-embed** - современный CSS препроцессор
- 🔧 **Autoprefixer** - автоматические вендорные префиксы
- 🌐 **Multi-page** - поддержка нескольких страниц
- 📦 **Модульность** - раздельная компиляция CSS и JS
- 🧩 **Блоки** - модульная система стилей
- 🌐 **Кроссбраузерность** - поддержка старых браузеров

## Установка

```bash
npm install
```

## Запуск

```bash
# Режим разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

## Структура проекта

```
├── src/
│   ├── pug/
│   │   ├── pages/           # Страницы сайта
│   │   │   ├── index.pug
│   │   │   └── about.pug
│   │   ├── layout/          # Базовые шаблоны
│   │   │   └── base.pug
│   │   ├── components/      # Компоненты
│   │   │   ├── header.pug
│   │   │   └── footer.pug
│   │   └── mixins/          # Pug миксины
│   │       └── button.pug
│   ├── scss/
│   │   ├── main.scss        # Главные стили
│   │   ├── pages/           # Стили страниц
│   │   │   ├── index.scss
│   │   │   └── about.scss
│   │   └── blocks/          # Стили блоков
│   │       ├── header.scss
│   │       ├── footer.scss
│   │       └── button.scss
│   └── js/
│       ├── main.js          # Общий JavaScript
│       ├── index.js         # JS главной страницы
│       └── about.js         # JS страницы about
├── public/
│   └── vite.svg
├── vite.config.js           # Конфигурация Vite
└── package.json
```

## Сборка

После выполнения `npm run build` создается структура:

```
dist/
├── index.html               # Главная страница
├── about.html               # Страница about
├── css/
│   ├── main.css            # Основные стили
│   ├── index.css           # Стили главной
│   ├── about.css           # Стили about
│   └── blocks/             # Стили блоков
│       ├── header.css
│       ├── footer.css
│       └── button.css
└── js/
    ├── main.js             # Общий JS
    ├── index.js            # JS главной
    └── about.js            # JS about
```

## Добавление новых страниц

1. **Создать Pug файл**: `src/pug/pages/newpage.pug`
2. **Создать стили**: `src/scss/pages/newpage.scss`
3. **Создать JS**: `src/js/newpage.js`
4. **Добавить ссылку** в header.pug

Vite автоматически найдет и добавит новые файлы в сборку.

## Создание блоков

1. **Создать SCSS**: `src/scss/blocks/blockname.scss`
2. **Подключить в странице**: добавить в массив `blocks` в Pug файле
3. **Использовать**: применить CSS классы в разметке

## Поддерживаемые браузеры

- Chrome/Edge 80+
- Firefox 72+
- Safari 13+
- IE 11+ (с полифиллами)

## Особенности

### Автоматическая сборка
- Автоматический поиск страниц в `src/pug/pages/`
- Автоматическая компиляция SCSS из `src/scss/pages/` и `src/scss/blocks/`
- Автоматическое подключение JS из `src/js/`

### Оптимизация
- Минификация CSS и JS
- Удаление console.log в продакшене
- Автоматические префиксы
- Tree-shaking неиспользуемого кода

### Кроссбраузерность
- Legacy plugin для старых браузеров
- Полифиллы для ES6+ функций
- Fallback для современных CSS функций
