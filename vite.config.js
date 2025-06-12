import { defineConfig } from 'vite';
import pug from 'vite-plugin-pug';
import autoprefixer from 'autoprefixer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { resolve } from 'path';
import { readdirSync, existsSync, copyFileSync, unlinkSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import process from 'process';
import commonjs from '@rollup/plugin-commonjs';

// Автоматическое сканирование HTML страниц в src/html
function getHTMLPages() {
  const htmlDir = 'src/html';
  const pages = {};

  if (existsSync(htmlDir)) {
    const htmlFiles = readdirSync(htmlDir).filter((file) =>
      file.endsWith('.html')
    );

    htmlFiles.forEach((file) => {
      const pageName = file.replace('.html', '');
      const htmlPath = resolve(process.cwd(), `${htmlDir}/${file}`);
      // Используем только имя файла как ключ, чтобы избежать вложенных директорий
      pages[pageName] = htmlPath;
    });
  }

  return pages;
}

// Функция для поиска JS файлов
function getJSEntries() {
  const entries = {};

  // Основные JS файлы
  const jsDir = 'src/js';
  if (existsSync(jsDir)) {
    const jsFiles = readdirSync(jsDir).filter((file) => file.endsWith('.js'));
    jsFiles.forEach((file) => {
      const name = file.replace('.js', '');
      entries[`js/${name}`] = resolve(process.cwd(), `${jsDir}/${file}`);
    });
  }

  // Библиотеки
  const libsDir = 'src/js/libs';
  if (existsSync(libsDir)) {
    const libFiles = readdirSync(libsDir).filter((file) =>
      file.endsWith('.js')
    );
    libFiles.forEach((file) => {
      const name = file.replace('.js', '');
      entries[`libs/${name}`] = resolve(process.cwd(), `${libsDir}/${file}`);
    });
  }

  const pagesDir = 'src/js/pages';
  if (existsSync(pagesDir)) {
    function scanDir(dir, baseEntry = '') {
      const items = readdirSync(dir, { withFileTypes: true });
      items.forEach((item) => {
        if (item.isDirectory()) {
          scanDir(`${dir}/${item.name}`, `${baseEntry}${item.name}/`);
        } else if (item.name.endsWith('.js')) {
          const name = item.name.replace('.js', '');
          entries[`pages/${baseEntry}${name}`] = resolve(
            process.cwd(),
            `${dir}/${item.name}`
          );
        }
      });
    }
    scanDir(pagesDir);
  }

  return entries;
}

// Функция для поиска SCSS файлов
function getSCSSEntries() {
  const entries = {};

  // Главный файл
  if (existsSync('src/scss/main.scss')) {
    entries['css/main'] = resolve(process.cwd(), 'src/scss/main.scss');
  }

  // Файлы страниц
  const pagesDir = 'src/scss/pages';
  if (existsSync(pagesDir)) {
    const scssFiles = readdirSync(pagesDir).filter((file) =>
      file.endsWith('.scss')
    );
    scssFiles.forEach((file) => {
      const name = file.replace('.scss', '');
      entries[`css/${name}`] = resolve(process.cwd(), `${pagesDir}/${file}`);
    });
  }

  const libsDir = 'src/scss/libs';
  if (existsSync(libsDir)) {
    const libFiles = readdirSync(libsDir).filter((file) =>
      file.endsWith('.scss')
    );
    libFiles.forEach((file) => {
      const name = file.replace('.scss', '');
      entries[`css/libs/${name}`] = resolve(
        process.cwd(),
        `${libsDir}/${file}`
      );
    });
  }

  // Блоки
  const blocksDir = 'src/scss/blocks';
  if (existsSync(blocksDir)) {
    function scanBlocksDir(dir, baseEntry = '') {
      const items = readdirSync(dir, { withFileTypes: true });
      items.forEach((item) => {
        if (item.isDirectory()) {
          scanBlocksDir(`${dir}/${item.name}`, `${baseEntry}${item.name}/`);
        } else if (item.name.endsWith('.scss')) {
          const name = item.name.replace('.scss', '');
          entries[`css/blocks/${baseEntry}${name}`] = resolve(
            process.cwd(),
            `${dir}/${item.name}`
          );
        }
      });
    }
    scanBlocksDir(blocksDir);
  }

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

      // Конвертация SVG файлов
      const svgFiles = readdirSync(imagesDir, { recursive: true }).filter(
        (file) => {
          if (typeof file !== 'string') return false;
          return file.toLowerCase().endsWith('.svg');
        }
      );

      if (svgFiles.length > 0) {
        console.log(
          `🎨 Converting ${svgFiles.length} SVG file(s) during build...`
        );
        try {
          execSync('node scripts/convert-svg.js', { stdio: 'inherit' });
        } catch (error) {
          console.error('SVG conversion failed:', error.message);
        }
      }
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
          // Копируем HTML файлы из src/html/ в build/
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
      // assetConverter(),
      commonjs(),
    ].filter(Boolean),
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api'],
        },
      },
      postcss: {
        plugins: !isDev && [autoprefixer()],
      },
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: 'build',
      sourcemap: false,
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
            return 'js/[name].js';
          },
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              const scssEntries = getSCSSEntries();

              // Ищем entry ключ по имени asset'а
              for (const [entryKey, entryPath] of Object.entries(scssEntries)) {
                const entryFileName = entryKey.split('/').pop();

                // Проверяем совпадение имени файла в asset'е
                if (assetInfo.name.includes(entryFileName)) {
                  // Дополнительная проверка через originalFileNames если они есть
                  if (assetInfo.originalFileNames) {
                    const hasMatch = assetInfo.originalFileNames.some(
                      (orig) => {
                        const normalizedOrig = orig.replace(/\\/g, '/');
                        const normalizedEntry = entryPath.replace(/\\/g, '/');
                        return (
                          normalizedOrig.includes(normalizedEntry) ||
                          normalizedEntry.includes(normalizedOrig)
                        );
                      }
                    );

                    if (hasMatch) {
                      return `${entryKey}.css`;
                    }
                  } else {
                    // Fallback если originalFileNames нет
                    return `${entryKey}.css`;
                  }
                }
              }

              // Последний fallback
              const fileName = assetInfo.name
                .split('/')
                .pop()
                .replace(/\.[^/.]+$/, '');
              return `css/${fileName}.css`;
            }
            return 'assets/[name]-[hash][extname]';
          },
          globals: {
            // Определяем глобальные переменные для избежания конфликтов
          },
        },
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
        mangle: {
          // Безопасный mangling для избежания конфликтов
          reserved: ['$', 'jQuery', 'window', 'document'],
          properties: false,
        },
        format: {
          comments: false,
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
