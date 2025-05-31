import { defineConfig } from 'vite';
import pug from 'vite-plugin-pug';
import autoprefixer from 'autoprefixer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { resolve } from 'path';
import {
  readdirSync,
  existsSync,
  copyFileSync,
  unlinkSync,
  rmSync,
  watch,
} from 'fs';
import { execSync } from 'child_process';
import process from "process";

// Глобальные массивы для отслеживания файлов
let jsFilesCache = [];
let scssFilesCache = [];
let htmlPagesCache = [];

// Инициализация кеша файлов
function initializeFileCache() {
  // HTML страницы
  const htmlDir = 'src/html';
  const pagesList = [
    'index',
    'about',
    // Добавляйте новые страницы здесь
  ];

  htmlPagesCache = pagesList.filter((pageName) => {
    const htmlPath = resolve(process.cwd(), `${htmlDir}/${pageName}.html`);
    return existsSync(htmlPath);
  });

  // JS файлы
  const jsDir = 'src/js';
  if (existsSync(jsDir)) {
    jsFilesCache = readdirSync(jsDir)
      .filter((file) => file.endsWith('.js'))
      .map((file) => file.replace('.js', ''));
  }

  // SCSS файлы
  scssFilesCache = [];

  // Главный файл
  if (existsSync('src/scss/main.scss')) {
    scssFilesCache.push({ type: 'main', name: 'main' });
  }

  // Файлы страниц
  const pagesDir = 'src/scss/pages';
  if (existsSync(pagesDir)) {
    const scssFiles = readdirSync(pagesDir).filter((file) =>
      file.endsWith('.scss')
    );
    scssFiles.forEach((file) => {
      const name = file.replace('.scss', '');
      scssFilesCache.push({ type: 'page', name });
    });
  }

  // Блоки
  const blocksDir = 'src/scss/blocks';
  if (existsSync(blocksDir)) {
    const blockFiles = readdirSync(blocksDir).filter((file) =>
      file.endsWith('.scss')
    );
    blockFiles.forEach((file) => {
      const name = file.replace('.scss', '');
      scssFilesCache.push({ type: 'block', name });
    });
  }

  console.log(`📁 Загружено файлов:`);
  console.log(`   HTML: ${htmlPagesCache.length}`);
  console.log(`   JS: ${jsFilesCache.length}`);
  console.log(`   SCSS: ${scssFilesCache.length}`);
}

// Ручное указание HTML страниц в src/html
function getHTMLPages() {
  const htmlDir = 'src/html';
  const pages = {};

  htmlPagesCache.forEach((pageName) => {
    const htmlPath = resolve(process.cwd(), `${htmlDir}/${pageName}.html`);
    pages[pageName] = htmlPath;
  });

  return pages;
}

// Функция для поиска JS файлов из кеша
function getJSEntries() {
  const entries = {};
  const jsDir = 'src/js';

  jsFilesCache.forEach((name) => {
    entries[`js/${name}`] = resolve(process.cwd(), `${jsDir}/${name}.js`);
  });

  return entries;
}

// Функция для поиска SCSS файлов из кеша
function getSCSSEntries() {
  const entries = {};

  scssFilesCache.forEach(({ type, name }) => {
    switch (type) {
      case 'main':
        entries['css/main'] = resolve(process.cwd(), 'src/scss/main.scss');
        break;
      case 'page':
        entries[`css/${name}`] = resolve(process.cwd(), `src/scss/pages/${name}.scss`);
        break;
      case 'block':
        entries[`css/blocks/${name}`] = resolve(
          process.cwd(),
          `src/scss/blocks/${name}.scss`,
        );
        break;
    }
  });

  return entries;
}

// Функция для конвертации шрифтов и изображений
function assetConverter() {
  return {
    name: 'asset-converter',
    buildStart() {
      // Конвертация шрифтов
      const fontsDir = 'src/fonts';
      if (existsSync(fontsDir)) {
        const fontFiles = readdirSync(fontsDir, { recursive: true }).filter(
          (file) =>
            typeof file === 'string' &&
            (file.endsWith('.ttf') || file.endsWith('.otf'))
        );

        if (fontFiles.length > 0) {
          console.log(
            `🔄 Converting ${fontFiles.length} font(s) during build...`
          );
          try {
            execSync('node scripts/convert-fonts.js', { stdio: 'inherit' });
          } catch (error) {
            console.error('Font conversion failed:', error.message);
          }
        }
      }

      // Конвертация изображений
      const imagesDir = 'src/images';
      if (existsSync(imagesDir)) {
        const imageFiles = readdirSync(imagesDir, { recursive: true }).filter(
          (file) => {
            if (typeof file !== 'string') return false;
            const ext = file.toLowerCase();
            return (
              ext.endsWith('.jpg') ||
              ext.endsWith('.jpeg') ||
              ext.endsWith('.png') ||
              ext.endsWith('.webp') ||
              ext.endsWith('.gif') ||
              ext.endsWith('.bmp') ||
              ext.endsWith('.tiff')
            );
          }
        );

        if (imageFiles.length > 0) {
          console.log(
            `🖼️  Converting ${imageFiles.length} image(s) during build...`
          );
          try {
            execSync('node scripts/convert-images.js', { stdio: 'inherit' });
          } catch (error) {
            console.error('Image conversion failed:', error.message);
          }
        }
      }
    },
  };
}

// Плагин для автоматического обнаружения новых файлов
function fileWatcherPlugin() {
  const watchers = [];
  const debounceTimers = new Map();

  return {
    name: "file-watcher",
    buildStart() {
      // Инициализируем кеш при старте
      initializeFileCache();
    },
    configureServer(viteServer) {
      // Функция для обновления кеша
      const updateCache = (filePath, action) => {
        const fileName = filePath.split("/").pop();
        const baseName = fileName.replace(/\.(js|scss)$/, "");

        if (filePath.includes("src/js") && fileName.endsWith(".js")) {
          if (action === "add") {
            if (!jsFilesCache.includes(baseName)) {
              jsFilesCache.push(baseName);
              console.log(`➕ JS файл добавлен в кеш: ${baseName}`);
            }
          } else if (action === "unlink") {
            jsFilesCache = jsFilesCache.filter((name) => name !== baseName);
            console.log(`➖ JS файл удален из кеша: ${baseName}`);
          }
        }

        if (filePath.includes("src/scss") && fileName.endsWith(".scss")) {
          if (action === "add") {
            let type = "main";
            if (filePath.includes("src/scss/pages")) type = "page";
            if (filePath.includes("src/scss/blocks")) type = "block";

            const exists = scssFilesCache.some(
              (item) => item.name === baseName && item.type === type,
            );

            if (!exists) {
              scssFilesCache.push({ type, name: baseName });
              console.log(`➕ SCSS файл добавлен в кеш: ${type}/${baseName}`);
            }
          } else if (action === "unlink") {
            scssFilesCache = scssFilesCache.filter(
              (item) => item.name !== baseName,
            );
            console.log(`➖ SCSS файл удален из кеша: ${baseName}`);
          }
        }
      };

      // Debounced функция для обработки файловых событий
      const handleFileEvent = (filePath, eventType) => {
        // Очищаем предыдущий таймер для этого файла
        if (debounceTimers.has(filePath)) {
          clearTimeout(debounceTimers.get(filePath));
        }

        // Устанавливаем новый таймер
        const timer = setTimeout(() => {
          console.log(`📁 ${eventType}: ${filePath}`);

          if (eventType === "rename") {
            // rename событие может означать как добавление, так и удаление
            if (existsSync(filePath)) {
              updateCache(filePath, "add");
            } else {
              updateCache(filePath, "unlink");
            }

            // Обновляем браузер без перезапуска сервера
            console.log("🔄 Обновление браузера...");
            viteServer.ws.send({
              type: "full-reload",
            });
          }

          // Удаляем таймер из Map
          debounceTimers.delete(filePath);
        }, 100); // 100ms задержка для группировки событий

        debounceTimers.set(filePath, timer);
      };

      // Настройка fs.watch для отслеживания директорий
      const watchDirectories = ["src/js", "src/scss/pages", "src/scss/blocks"];

      watchDirectories.forEach((dir) => {
        if (existsSync(dir)) {
          console.log(`👀 Отслеживаю директорию: ${dir}`);

          const watcher = watch(
            dir,
            { recursive: true },
            (eventType, filename) => {
              if (!filename) return;

              const filePath = `${dir}/${filename}`;
              const isJsFile = filename.endsWith(".js");
              const isScssFile = filename.endsWith(".scss");

              if (isJsFile || isScssFile) {
                handleFileEvent(filePath, eventType);
              }
            },
          );

          watchers.push(watcher);
        }
      });

      // Закрытие watchers при завершении
      viteServer.httpServer?.on("close", () => {
        // Очищаем все таймеры
        debounceTimers.forEach((timer) => clearTimeout(timer));
        debounceTimers.clear();

        watchers.forEach((watcher) => {
          if (watcher) {
            watcher.close();
          }
        });
      });
    },
  };
}

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve' || mode === 'development';

  return {
    plugins: [
      pug(
        {
          pretty: true,
        },
        {
          title: 'Vite App',
          isDev: isDev,
        }
      ),
      // Оптимизация изображений в production
      !isDev &&
        ViteImageOptimizer({
          jpg: {
            quality: 90,
            progressive: true,
          },
          jpeg: {
            quality: 90,
            progressive: true,
          },
          png: {
            quality: 90,
            compressionLevel: 9,
          },
          webp: {
            quality: 85,
            effort: 4,
          },
          avif: {
            quality: 80,
            effort: 4,
          },
          svg: {
            plugins: [
              { name: 'removeViewBox', active: false },
              { name: 'removeDimensions', active: true },
              { name: 'removeComments', active: true },
              { name: 'removeUselessStrokeAndFill', active: true },
            ],
          },
        }),
      // Кастомный плагин для перемещения HTML файлов в корень build
      {
        name: 'move-html-to-root',
        writeBundle() {
          // Копируем HTML файлы из build/src/html/ в build/
          const buildDir = 'build';
          const htmlDir = `${buildDir}/src/html`;

          if (existsSync(htmlDir)) {
            const htmlFiles = readdirSync(htmlDir).filter((file) =>
              file.endsWith('.html')
            );

            htmlFiles.forEach((file) => {
              const srcPath = `${htmlDir}/${file}`;
              const destPath = `${buildDir}/${file}`;

              copyFileSync(srcPath, destPath);
              unlinkSync(srcPath); // Удаляем из исходного места
            });

            // Удаляем пустые директории
            try {
              rmSync(`${buildDir}/src/html`, { recursive: true, force: true });
              rmSync(`${buildDir}/src`, { recursive: true, force: true });
            } catch (e) {
              // Игнорируем ошибки, если директории не пустые
            }
          }
        },
      },
      assetConverter(),
      fileWatcherPlugin(),
    ].filter(Boolean),
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api'],
        },
      },
      postcss: {
        plugins: [autoprefixer()],
      },
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: 'build',
      rollupOptions: {
        input: {
          ...getHTMLPages(),
          ...getJSEntries(),
          ...getSCSSEntries(),
        },
        output: {
          entryFileNames: (chunkInfo) => {
            // Специальная обработка для HTML файлов - принудительно в корень
            if (
              chunkInfo.isEntry &&
              chunkInfo.facadeModuleId?.includes('.html')
            ) {
              return '[name].html';
            }
            if (chunkInfo.name.startsWith('js/')) {
              return '[name].js';
            }
            // Другие entry points
            return 'js/[name]-[hash].js';
          },
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              // Извлекаем имя файла без лишних путей
              const fileName = assetInfo.name
                .split('/')
                .pop()
                .replace(/\.[^/.]+$/, '');

              // Определяем оригинальный entry ключ
              if (assetInfo.originalFileNames) {
                const originalEntry = Object.keys({
                  ...getSCSSEntries(),
                }).find((key) =>
                  assetInfo.originalFileNames.some((orig) =>
                    orig.includes(key.split('/').pop())
                  )
                );

                if (originalEntry?.startsWith('css/blocks/')) {
                  return `css/blocks/${fileName}.css`;
                }
              }

              return `css/${fileName}.css`;
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
