import { readdirSync, existsSync, mkdirSync, statSync } from 'fs'
import { join, extname, basename, dirname, relative } from 'path'
import sharp from 'sharp'

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.gif', '.bmp']
const srcDir = 'src/images'
const outputDir = 'public/images'

async function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true })
  }
}

async function convertImage(inputPath, outputDir, filename) {
  const baseName = basename(filename, extname(filename))
  const relativePath = relative(srcDir, dirname(inputPath))
  const targetDir = join(outputDir, relativePath)

  await ensureDir(targetDir)

  const outputPaths = {
    avif: join(targetDir, `${baseName}.avif`),
    webp: join(targetDir, `${baseName}.webp`),
    original: join(targetDir, filename)
  }

  try {
    const image = sharp(inputPath)

    // Конвертация в AVIF (лучшее сжатие)
    await image
      .clone()
      .avif({
        quality: 80,
        effort: 4,
        chromaSubsampling: '4:2:0'
      })
      .toFile(outputPaths.avif)

    // Конвертация в WebP (широкая поддержка)
    await image
      .clone()
      .webp({
        quality: 85,
        effort: 4,
        method: 6
      })
      .toFile(outputPaths.webp)

    // Оптимизация оригинального формата
    const ext = extname(filename).toLowerCase()
    if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .clone()
        .jpeg({
          quality: 90,
          progressive: true,
          mozjpeg: true
        })
        .toFile(outputPaths.original)
    } else if (ext === '.png') {
      await image
        .clone()
        .png({
          quality: 90,
          compressionLevel: 9,
          progressive: true
        })
        .toFile(outputPaths.original)
    } else {
      // Для других форматов просто копируем оптимизированную версию
      await image
        .clone()
        .toFile(outputPaths.original)
    }

    console.log(`✅ Обработано: ${filename}`)
    return true
  } catch (error) {
    console.error(`❌ Ошибка обработки ${filename}:`, error.message)
    return false
  }
}

async function processDirectory(dirPath) {
  if (!existsSync(dirPath)) {
    console.log(`📁 Папка ${dirPath} не найдена. Создайте её и добавьте изображения.`)
    return
  }

  const items = readdirSync(dirPath)
  let totalFiles = 0
  let processedFiles = 0

  for (const item of items) {
    const itemPath = join(dirPath, item)
    const stat = statSync(itemPath)

    if (stat.isDirectory()) {
      // Рекурсивно обрабатываем подпапки
      await processDirectory(itemPath)
    } else if (stat.isFile()) {
      const ext = extname(item).toLowerCase()
      if (SUPPORTED_FORMATS.includes(ext)) {
        totalFiles++
        const success = await convertImage(itemPath, outputDir, item)
        if (success) processedFiles++
      }
    }
  }

  if (totalFiles > 0) {
    console.log(`\n📊 Обработано ${processedFiles}/${totalFiles} изображений в ${dirPath}`)
  }
}

async function main() {
  console.log('🖼️  Начинаем конвертацию изображений...\n')

  await ensureDir(outputDir)
  await processDirectory(srcDir)

  console.log('\n✨ Конвертация завершена!')
  console.log(`📁 Результат: ${outputDir}`)
  console.log('\n💡 Для каждого изображения создано:')
  console.log('   📸 .avif - современный формат (лучшее сжатие)')
  console.log('   🌐 .webp - широкая поддержка')
  console.log('   🔄 оригинальный формат (оптимизированный)')
}

main().catch(console.error)
