import { defineConfig } from 'vite'
import pug from 'vite-plugin-pug'
import autoprefixer from 'autoprefixer'
import { resolve } from 'path'
import { readdirSync, existsSync, copyFileSync, unlinkSync, rmSync } from 'fs'

// Ручное указание HTML страниц в src/html
function getHTMLPages() {
  const htmlDir = 'src/html'
  const pages = {}

  // Вручную указываем страницы
  const pagesList = [
    'index',
    'about'
    // Добавляйте новые страницы здесь
  ]

  pagesList.forEach(pageName => {
    const htmlPath = resolve(process.cwd(), `${htmlDir}/${pageName}.html`)
    if (existsSync(htmlPath)) {
      // Используем только имя файла как ключ, чтобы избежать вложенных директорий
      pages[pageName] = htmlPath
    }
  })

  return pages
}

// Функция для поиска JS файлов
function getJSEntries() {
  const jsDir = 'src/js'
  if (!existsSync(jsDir)) return {}

  const jsFiles = readdirSync(jsDir).filter(file => file.endsWith('.js'))
  const entries = {}

  jsFiles.forEach(file => {
    const name = file.replace('.js', '')
    entries[`js/${name}`] = resolve(process.cwd(), `${jsDir}/${file}`)
  })

  return entries
}

// Функция для поиска SCSS файлов
function getSCSSEntries() {
  const entries = {}

  // Главный файл
  if (existsSync('src/scss/main.scss')) {
    entries['css/main'] = resolve(process.cwd(), 'src/scss/main.scss')
  }

  // Файлы страниц
  const pagesDir = 'src/scss/pages'
  if (existsSync(pagesDir)) {
    const scssFiles = readdirSync(pagesDir).filter(file => file.endsWith('.scss'))
    scssFiles.forEach(file => {
      const name = file.replace('.scss', '')
      entries[`css/${name}`] = resolve(process.cwd(), `${pagesDir}/${file}`)
    })
  }

  // Блоки
  const blocksDir = 'src/scss/blocks'
  if (existsSync(blocksDir)) {
    const blockFiles = readdirSync(blocksDir).filter(file => file.endsWith('.scss'))
    blockFiles.forEach(file => {
      const name = file.replace('.scss', '')
      entries[`css/blocks/${name}`] = resolve(process.cwd(), `${blocksDir}/${file}`)
    })
  }

  return entries
}

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve' || mode === 'development'
  console.log('Vite mode:', mode, 'command:', command, 'isDev:', isDev)

  return {
    plugins: [
      pug({
        pretty: true,
      }, {
        title: 'Vite App',
        isDev: isDev
      }),
      // Кастомный плагин для перемещения HTML файлов в корень build
      {
        name: 'move-html-to-root',
        writeBundle() {
          // Копируем HTML файлы из build/src/html/ в build/
          const buildDir = 'build'
          const htmlDir = `${buildDir}/src/html`

          if (existsSync(htmlDir)) {
            const htmlFiles = readdirSync(htmlDir).filter(file => file.endsWith('.html'))

            htmlFiles.forEach(file => {
              const srcPath = `${htmlDir}/${file}`
              const destPath = `${buildDir}/${file}`

              copyFileSync(srcPath, destPath)
              unlinkSync(srcPath) // Удаляем из исходного места
            })

            // Удаляем пустые директории
            try {
              rmSync(`${buildDir}/src/html`, { recursive: true, force: true })
              rmSync(`${buildDir}/src`, { recursive: true, force: true })
            } catch (e) {
              // Игнорируем ошибки, если директории не пустые
            }
          }
        }
      }
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api']
        }
      },
      postcss: {
        plugins: [
          autoprefixer()
        ]
      }
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: 'build',
      rollupOptions: {
        input: {
          ...getHTMLPages(),
          ...getJSEntries(),
          ...getSCSSEntries()
        },
        output: {
          entryFileNames: (chunkInfo) => {
            // Специальная обработка для HTML файлов - принудительно в корень
            if (chunkInfo.isEntry && chunkInfo.facadeModuleId?.includes('.html')) {
              return '[name].html'
            }
            if (chunkInfo.name.startsWith('js/')) {
              return '[name].js'
            }
            // Другие entry points
            return 'js/[name]-[hash].js'
          },
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              // Извлекаем имя файла без лишних путей
              const fileName = assetInfo.name.split('/').pop().replace(/\.[^/.]+$/, '')

              // Определяем оригинальный entry ключ
              if (assetInfo.originalFileNames) {
                const originalEntry = Object.keys({
                  ...getSCSSEntries()
                }).find(key =>
                  assetInfo.originalFileNames.some(orig => orig.includes(key.split('/').pop()))
                )

                if (originalEntry?.startsWith('css/blocks/')) {
                  return `css/blocks/${fileName}.css`
                }
              }

              return `css/${fileName}.css`
            }
            return 'assets/[name]-[hash][extname]'
          }
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    server: {
      port: 3000,
      open: true
    }
  }
})
