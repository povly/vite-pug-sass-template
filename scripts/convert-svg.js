import { readdirSync, existsSync, mkdirSync, statSync, copyFileSync, readFileSync, writeFileSync } from 'fs';
import { join, extname, dirname, relative } from 'path';
import { optimize } from 'svgo';

const srcDir = 'src/images';
const outputDir = 'public/images';

// Конфигурация SVGO для оптимизации SVG
const svgoConfig = {
  plugins: [
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeTitle',
    'removeDesc',
    'removeUselessDefs',
    'removeEditorsNSData',
    'removeEmptyAttrs',
    'removeHiddenElems',
    'removeEmptyText',
    'removeEmptyContainers',
    'removeViewBox',
    'cleanupEnableBackground',
    'convertStyleToAttrs',
    'convertColors',
    'convertPathData',
    'convertTransform',
    'removeUselessStrokeAndFill',
    'removeNonInheritGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeUnknownsAndDefaults',
    'removeNonInheritGroupAttrs',
    'cleanupIDs',
    'cleanupNumericValues',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    'removeRasterImages',
    'mergePaths',
    'convertShapeToPath',
    'sortAttrs',
    'removeDimensions',
  ],
};

async function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

async function optimizeSVG(inputPath, outputPath) {
  try {
    const svgContent = readFileSync(inputPath, 'utf8');
    const result = optimize(svgContent, svgoConfig);

    if (result.error) {
      throw new Error(result.error);
    }

    writeFileSync(outputPath, result.data);
    return true;
  } catch (error) {
    console.error(`❌ Ошибка оптимизации SVG ${inputPath}:`, error.message);
    // Если оптимизация не удалась, просто копируем оригинал
    copyFileSync(inputPath, outputPath);
    return false;
  }
}

async function processDirectory(dirPath) {
  if (!existsSync(dirPath)) {
    console.log(`📁 Папка ${dirPath} не найдена.`);
    return;
  }

  const items = readdirSync(dirPath);
  let totalFiles = 0;
  let processedFiles = 0;

  for (const item of items) {
    const itemPath = join(dirPath, item);
    const stat = statSync(itemPath);

    if (stat.isDirectory()) {
      // Рекурсивно обрабатываем подпапки
      await processDirectory(itemPath);
    } else if (stat.isFile()) {
      const ext = extname(item).toLowerCase();
      if (ext === '.svg') {
        totalFiles++;

        // Вычисляем путь вывода с сохранением структуры папок
        const relativePath = relative(srcDir, dirname(itemPath));
        const targetDir = join(outputDir, relativePath);
        const outputPath = join(targetDir, item);

        await ensureDir(targetDir);

        const success = await optimizeSVG(itemPath, outputPath);
        if (success) processedFiles++;

        console.log(`${success ? '✅' : '⚠️'} Обработано: ${relative(process.cwd(), itemPath)} → ${relative(process.cwd(), outputPath)}`);
      }
    }
  }

  if (totalFiles > 0) {
    console.log(`\n📊 Обработано ${processedFiles}/${totalFiles} SVG файлов в ${dirPath}`);
  }
}

async function main() {
  console.log('🎨 Начинаем оптимизацию SVG файлов...\n');

  await ensureDir(outputDir);
  await processDirectory(srcDir);

  console.log('\n✨ Оптимизация SVG завершена!');
  console.log(`📁 Результат: ${outputDir}`);
}

main().catch(console.error);
