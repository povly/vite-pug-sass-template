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
# Pages available at localhost:5173/src/html/

# Production build
npm run build

# Preview build
npm run preview

# Convert fonts
npm run convert-fonts

# Convert images
npm run convert-images

# Convert specific files/folders
node scripts/convert-images.js src/images/photo.jpg      # specific file
node scripts/convert-images.js src/images/gallery       # specific folder

# Convert all assets
npm run convert-assets

# Code quality - All files
npm run lint              # Run all linting tools
npm run format           # Format all files with Prettier
npm run lint-staged      # Lint and format all files
npm run check-format     # Check if files are properly formatted

# Code quality - Individual tools
npm run lint:js          # ESLint for JavaScript only
npm run lint:css         # Stylelint for CSS/SCSS only
npm run lint:pug         # Pug-lint for templates only
npm run format:js        # Format JavaScript files only
npm run format:css       # Format CSS/SCSS files only
npm run format:pug       # Format Pug files only
```

## Project Structure

```
├── src/
│   ├── pug/
│   │   ├── pages/           # Website pages
│   │   │   └── index.pug    # Main page
│   │   ├── layout/          # Base layout templates
│   │   │   └── base.pug     # Main layout template
│   │   ├── components/      # Reusable UI components
│   │   │   ├── header/      # Header component
│   │   │   │   └── header.pug
│   │   │   └── footer/      # Footer component
│   │   │       └── footer.pug
│   │   ├── blocks/          # Page-specific blocks
│   │   │   └── home/        # Home page blocks
│   │   │       └── first.pug # First section
│   │   ├── mixins/          # Reusable Pug mixins
│   │   │   ├── picture.pug  # Responsive images
│   │   │   ├── video.pug    # Video embeds
│   │   │   └── iframe.pug   # Iframe embeds
│   │   └── templates/       # Component templates
│   │       └── p/           # Preset templates
│   │           └── swiper/  # Swiper presets
│   │               └── arrows.pug
│   ├── scss/
│   │   ├── main.scss        # Global styles only
│   │   ├── common/          # Common utilities
│   │   │   ├── fonts.scss   # Font definitions
│   │   │   ├── reset.scss   # CSS reset
│   │   │   ├── tools.scss   # SCSS mixins
│   │   │   └── modal.scss   # Common modals
│   │   ├── includes/        # Layout components
│   │   │   ├── header.scss  # Global header
│   │   │   └── footer.scss  # Global footer
│   │   ├── pages/           # Page-specific styles
│   │   │   ├── index.scss   # Index page styles
│   │   │   └── about.scss   # About page styles
│   │   └── blocks/          # Independent blocks
│   │       ├── home/        # Home page blocks
│   │       │   ├── hero.scss
│   │       │   ├── features.scss
│   │       │   └── testimonials.scss
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
│       ├── main.js          # Common JavaScript entry point
│       ├── components/      # Reusable JS components
│       │   ├── modal.js     # Modal dialogs
│       │   ├── toast.js     # Toast notifications
│       │   └── scrollanimation.js # Scroll animations
│       ├── libs/            # Third-party libraries
│       │   ├── swiper.js    # Swiper slider setup
│       │   └── lazyload.min.js # Lazy loading images
│       └── pages/           # Page-specific JavaScript
│           └── home/        # Home page scripts
│               └── faq.js   # FAQ interactions
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
│   ├── main.css            # Global styles only
│   ├── index.css           # Index page styles
│   ├── about.css           # About page styles
│   └── blocks/             # Independent block styles
│       ├── home/           # Home page blocks
│       │   ├── hero.css
│       │   ├── features.css
│       │   └── testimonials.css
├── fonts/                  # Web fonts (WOFF2/WOFF)
│   └── roboto/             # Group by families
│       ├── Roboto-Regular.woff
│       ├── Roboto-Regular.woff2
│       ├── Roboto-Light.woff
│       └── Roboto-Light.woff2
├── images/                 # Optimized images
│   └── ...                 # All formats: AVIF, WebP, original
└── js/
    ├── main.js             # Common JS entry point
    ├── libs/               # Third-party libraries
    │   ├── swiper.js       # Swiper setup
    │   └── lazyload.min.js # Image lazy loading
    └── pages/              # Page-specific bundles
        └── home/
            └── faq.js      # FAQ page interactions
```

## Adding New Pages

1. **Create HTML file**: `src/html/newpage.html` with:
   ```html
   <pug src="src/pug/pages/newpage.pug" />
   ```
2. **Create Pug file**: `src/pug/pages/newpage.pug`

Vite automatically discovers and includes new files in the build.

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
npm run lint              # Run all linting tools
npm run lint-staged      # Lint and format all files

# Individual linting tools
npm run lint:js          # ESLint for JavaScript
npm run lint:css         # Stylelint for CSS/SCSS
npm run lint:pug         # Pug-lint for Pug templates

# Format code
npm run format           # Format all files with Prettier
npm run format:js        # Format JavaScript files only
npm run format:css       # Format CSS/SCSS files only
npm run format:pug       # Format Pug files only

# Check formatting
npm run check-format     # Check if files are properly formatted
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
