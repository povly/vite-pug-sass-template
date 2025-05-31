# Vite Multi-Page Template

## 📚 Documentation

- [📋 **Main README**](README.md) - Project overview and setup (current)
- [🖼️ Images Guide](IMAGES.md) - Image processing and optimization
- [📝 Fonts Guide](FONTS.md) - Font management and conversion
- [🔧 Linting & Formatting](LINTING.md) - Code quality tools

---

Professional template for multi-page applications with Pug, Sass-embed, autoprefixer and full cross-browser compatibility.

## Features

- ⚡️ **Vite** - fast build and hot reload
- 🎨 **Pug** - powerful templating engine with components and mixins
- 🎯 **Sass-embed** - modern CSS preprocessor
- 🔧 **Autoprefixer** - automatic vendor prefixes
- 🌐 **Multi-page** - multiple pages support
- 📦 **Modular** - separate CSS and JS compilation
- 🧩 **Blocks** - modular style system
- 🌐 **Cross-browser** - legacy browser support
- 🔤 **Font conversion** - automatic TTF/OTF to WOFF/WOFF2 conversion
- 🖼️ **Image optimization** - automatic conversion to AVIF, WebP with optimization
- 🧹 **Code quality** - ESLint, Stylelint, Prettier, Pug-lint integration

## Installation

```bash
npm install
```

## Usage

```bash
# Development mode
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Convert fonts
npm run convert-fonts

# Convert images
npm run convert-images

# Convert all assets
npm run convert-assets

# Code quality
npm run lint              # Check all files
npm run format           # Format all files
npm run lint-staged      # Lint and format
```

## Project Structure

```
├── src/
│   ├── pug/
│   │   ├── pages/           # Website pages
│   │   │   ├── index.pug
│   │   │   └── about.pug
│   │   ├── layout/          # Base templates
│   │   │   └── base.pug
│   │   ├── components/      # Components
│   │   │   ├── header.pug
│   │   │   └── footer.pug
│   │   └── mixins/          # Pug mixins
│   │       ├── button.pug
│   │       └── picture.pug  # Image mixins
│   ├── scss/
│   │   ├── main.scss        # Main styles
│   │   ├── _fonts.scss      # Auto-generated fonts
│   │   ├── mixins/          # SCSS mixins
│   │   │   └── _images.scss # Image mixins
│   │   ├── pages/           # Page styles
│   │   │   ├── index.scss
│   │   │   └── about.scss
│   │   └── blocks/          # Block styles
│   │       ├── header.scss
│   │       ├── footer.scss
│   │       └── button.scss
│   ├── fonts/               # Source fonts (TTF/OTF)
│   │   └── roboto/          # Group by families
│   │       ├── Roboto-Regular.ttf
│   │       └── Roboto-Light.ttf
│   ├── images/              # Source images
│   │   ├── hero/            # Group by sections
│   │   │   ├── hero-desktop.jpg
│   │   │   ├── hero-tablet.jpg
│   │   │   └── hero-mobile.jpg
│   │   └── gallery/
│   │       ├── image-1.jpg
│   │       └── image-2.png
│   └── js/
│       ├── main.js          # Common JavaScript
│       ├── index.js         # Index page JS
│       └── about.js         # About page JS
├── public/
│   ├── fonts/               # Converted fonts
│   │   └── roboto/          # Structure preserved
│   │       ├── Roboto-Regular.woff2
│   │       ├── Roboto-Regular.woff
│   │       ├── Roboto-Light.woff2
│   │       └── Roboto-Light.woff
│   ├── images/              # Optimized images
│   │   ├── hero/            # Structure preserved
│   │   │   ├── hero-desktop.avif
│   │   │   ├── hero-desktop.webp
│   │   │   ├── hero-desktop.jpg
│   │   │   ├── hero-tablet.avif
│   │   │   ├── hero-tablet.webp
│   │   │   └── hero-tablet.jpg
│   │   └── gallery/
│   │       ├── image-1.avif
│   │       ├── image-1.webp
│   │       ├── image-1.jpg
│   │       ├── image-2.avif
│   │       ├── image-2.webp
│   │       └── image-2.png
│   └── vite.svg
├── scripts/
│   ├── convert-fonts.js     # Font conversion script
│   └── convert-images.js    # Image conversion script
├── vite.config.js           # Vite configuration
└── package.json
```

## Build Output

After running `npm run build`, the following structure is created:

```
build/
├── index.html               # Main page
├── about.html               # About page
├── css/
│   ├── main.css            # Main styles
│   ├── index.css           # Index styles
│   ├── about.css           # About styles
│   └── blocks/             # Block styles
│       ├── header.css
│       ├── footer.css
│       └── button.css
├── fonts/                  # Web fonts (WOFF2/WOFF)
│   └── roboto/             # Group by families
│       ├── Roboto-Regular.woff
│       ├── Roboto-Regular.woff2
│       ├── Roboto-Light.woff
│       └── Roboto-Light.woff2
├── images/                 # Optimized images
│   └── ...                 # All formats: AVIF, WebP, original
└── js/
    ├── main.js             # Common JS
    ├── index.js            # Index JS
    └── about.js            # About JS
```

## Adding New Pages

1. **Create Pug file**: `src/pug/pages/newpage.pug`
2. **Create styles**: `src/scss/pages/newpage.scss`
3. **Create JS**: `src/js/newpage.js`
4. **Add link** in header.pug

Vite automatically discovers and includes new files in the build.

## Creating Blocks

1. **Create SCSS**: `src/scss/blocks/blockname.scss`
2. **Include in page**: add to `blocks` array in Pug file
3. **Use**: apply CSS classes in markup

## Working with Fonts

### Quick Start

1. **Add fonts**: place TTF/OTF files in `src/fonts/`
2. **Convert**: `npm run convert-fonts`
3. **Include**: `@import 'fonts';` in main.scss

### Font Organization

- Create subfolders by families: `src/fonts/roboto/`, `src/fonts/opensans/`
- Folder structure is preserved in `public/fonts/`
- Auto-generated CSS with correct paths

### Supported Formats

- **Input**: TTF, OTF
- **Output**: WOFF2 (modern), WOFF (legacy)
- **Browsers**: WOFF2 (95%+), WOFF (99%+)

Read more: [FONTS.md](FONTS.md)

## Working with Images

### Quick Start

1. **Add images**: place JPG/PNG/WebP files in `src/images/`
2. **Convert**: `npm run convert-images`

### Image Organization

- Group by sections: `src/images/hero/`, `src/images/gallery/`
- Folder structure is preserved in `public/images/`
- Automatic creation of all formats

### Output Formats

- **AVIF**: best compression (modern browsers)
- **WebP**: wide support (modern browsers)
- **Optimized original**: fallback (all browsers)

Read more: [IMAGES.md](IMAGES.md)

## Code Quality

### Available Tools

- **ESLint**: JavaScript linting and auto-fixing
- **Stylelint**: CSS/SCSS linting and auto-fixing
- **Prettier**: Code formatting for all file types
- **Pug-lint**: Pug template validation

### Commands

```bash
# Check all code
npm run lint

# Format all code
npm run format

# Individual tools
npm run lint:js       # JavaScript only
npm run lint:css      # CSS/SCSS only
npm run lint:pug      # Pug only
npm run format:js     # Format JavaScript
npm run format:css    # Format CSS/SCSS
```

### Editor Integration

For VS Code, install these extensions:

- ESLint
- Stylelint
- Prettier - Code formatter

Read more: [LINTING.md](LINTING.md)

## Configuration Files

### Main Configuration

- `vite.config.js` - Vite build configuration
- `package.json` - Dependencies and scripts
- `postcss.config.js` - PostCSS plugins

### Code Quality

- `eslint.config.js` - ESLint rules and settings
- `stylelint.config.js` - Stylelint rules for CSS/SCSS
- `.prettierrc` - Prettier formatting options
- `.pugrc.js` - Pug-lint validation rules

### Asset Processing

- `scripts/convert-fonts.js` - Font conversion logic
- `scripts/convert-images.js` - Image optimization logic

## Browser Support

### Modern Features

- ES6+ modules (via Vite transpilation)
- CSS Grid and Flexbox
- Modern image formats (AVIF, WebP)
- Web fonts (WOFF2, WOFF)

### Legacy Support

- Internet Explorer 11+ (with polyfills)
- Older mobile browsers
- Graceful degradation for images and fonts

### Browserslist Configuration

```json
{
  "browserslist": ["> 1%", "last 2 versions", "not ie <= 8"]
}
```

## Performance Features

### Image Optimization

- Automatic format conversion (AVIF, WebP)
- Lazy loading support
- Responsive image mixins
- Progressive enhancement

### Font Optimization

- WOFF2/WOFF conversion for smaller sizes
- Font-display: swap for better loading
- Automatic @font-face generation

### Build Optimization

- CSS/JS code splitting per page
- Asset optimization and minification
- Modern ES modules with legacy fallbacks

## Development Workflow

### Daily Development

1. `npm run dev` - start development server
2. Edit files in `src/`
3. Hot reload automatically updates browser
4. `npm run lint` - check code quality
5. `npm run format` - format code

### Asset Updates

1. **Fonts**: Add to `src/fonts/` → run `npm run convert-fonts`
2. **Images**: Add to `src/images/` → run `npm run convert-images`
3. **Styles**: Edit SCSS files → auto-compiled
4. **Scripts**: Edit JS files → auto-compiled

### Pre-deployment

1. `npm run lint` - ensure code quality
2. `npm run build` - create production build
3. `npm run preview` - test production build
4. Deploy `build/` directory

## Troubleshooting

### Common Issues

**Assets not loading**: Run asset conversion commands
**Styles not updating**: Check SCSS import paths
**Build errors**: Verify all files exist and are properly linked
**Font issues**: Ensure TTF/OTF files are in correct folders

### Debug Commands

```bash
npm run build --verbose    # Detailed build output
npm run dev --debug       # Debug mode
npm cache clean --force   # Clear npm cache
```

For specific issues, check the detailed guides:

- [Images troubleshooting](IMAGES.md#troubleshooting)
- [Fonts troubleshooting](FONTS.md#troubleshooting)
- [Linting issues](LINTING.md#troubleshooting)
