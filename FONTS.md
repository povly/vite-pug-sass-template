# 🔤 Font Conversion

## 📚 Documentation

- [📋 Main README](README.md) - Project overview and setup
- [🖼️ Images Guide](IMAGES.md) - Image processing and optimization
- [📝 **Fonts Guide**](FONTS.md) - Font management and conversion (current)
- [🔧 Linting & Formatting](LINTING.md) - Code quality tools

---

Automatic conversion of TTF/OTF fonts to web formats WOFF/WOFF2 while preserving folder structure.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install ttf2woff ttf2woff2 --save-dev
```

### 2. Add Fonts

Place TTF/OTF files in `src/fonts/`:

```
src/fonts/
├── roboto/
│   ├── Roboto-Regular.ttf
│   ├── Roboto-Bold.ttf
│   └── Roboto-Light.ttf
└── opensans/
    ├── OpenSans-Regular.ttf
    └── OpenSans-Bold.ttf
```

### 3. Convert

```bash
npm run convert-fonts
```

### 4. Include in SCSS

```scss
// src/scss/main.scss
@import 'fonts';

// Usage
.title {
  font-family: 'roboto', Arial, sans-serif;
}
```

## 📁 Structure After Conversion

```
public/fonts/
├── roboto/
│   ├── Roboto-Regular.woff2   # ~50% smaller than TTF
│   ├── Roboto-Regular.woff    # ~30% smaller than TTF
│   ├── Roboto-Bold.woff2
│   ├── Roboto-Bold.woff
│   ├── Roboto-Light.woff2
│   └── Roboto-Light.woff
└── opensans/
    ├── OpenSans-Regular.woff2
    ├── OpenSans-Regular.woff
    ├── OpenSans-Bold.woff2
    └── OpenSans-Bold.woff

src/scss/
└── _fonts.scss                # Auto-generated file
```

## 🎯 Auto-Generated CSS

The script creates `src/scss/_fonts.scss` with ready-to-use `@font-face` declarations:

```scss
@font-face {
  font-family: 'roboto';
  src:
    url('/fonts/roboto/Roboto-Regular.woff2') format('woff2'),
    url('/fonts/roboto/Roboto-Regular.woff') format('woff');
  font-display: swap;
}

@font-face {
  font-family: 'roboto';
  src:
    url('/fonts/roboto/Roboto-Bold.woff2') format('woff2'),
    url('/fonts/roboto/Roboto-Bold.woff') format('woff');
  font-display: swap;
}

@font-face {
  font-family: 'opensans';
  src:
    url('/fonts/opensans/OpenSans-Regular.woff2') format('woff2'),
    url('/fonts/opensans/OpenSans-Regular.woff') format('woff');
  font-display: swap;
}
```

## ⚙️ Features

### Automatic Build

- Fonts are converted automatically during `npm run build`
- Plugin in `vite.config.js` triggers conversion
- Recursive search in subfolders

### Optimization

- **WOFF2**: best compression, 95% browser support
- **WOFF**: fallback for older browsers
- **font-display: swap**: improved performance

### Family Naming

- Folder name = `font-family`
- Example: `src/fonts/roboto/` → `font-family: 'roboto'`
- Supports any folder names

## 🌐 Browser Support

| Format | Chrome | Firefox | Safari | Edge | IE  |
| ------ | ------ | ------- | ------ | ---- | --- |
| WOFF2  | 36+    | 39+     | 12+    | 14+  | ❌  |
| WOFF   | 6+     | 3.6+    | 5.1+   | 12+  | 9+  |

## 🚨 Troubleshooting

### Fonts Not Loading in Dev Mode

```scss
// Check paths in _fonts.scss
src: url('/fonts/...')  ✅ (correct)
src: url('./fonts/...') ❌ (incorrect in dev)
```

### Conversion Errors

```bash
# Check input file format
file src/fonts/font.ttf
# Should show: TrueType font data

# Reinstall dependencies
npm install ttf2woff ttf2woff2 --save-dev
```

## 📊 Size Comparison

| Roboto Regular Font | Size   | Compression |
| ------------------- | ------ | ----------- |
| TTF (original)      | 168 KB | -           |
| WOFF                | 83 KB  | 51%         |
| WOFF2               | 64 KB  | 62%         |

## 🔄 Automation

### On Every Build

```javascript
// vite.config.js is already configured
// Automatic execution on npm run build
```

## Advanced Usage

### Custom Font Weights

```scss
// After conversion, use specific weights
.heading {
  font-family: 'roboto', sans-serif;
  font-weight: 700; // Bold
}

.body-text {
  font-family: 'roboto', sans-serif;
  font-weight: 400; // Regular
}

.light-text {
  font-family: 'roboto', sans-serif;
  font-weight: 300; // Light
}
```

### Font Loading Strategies

```scss
// Fallback fonts while loading
.text {
  font-family: 'roboto', 'Helvetica Neue', Arial, sans-serif;
  font-display: swap; // Already included in generated CSS
}
```

## Font Organization Tips

### Recommended Structure

```
src/fonts/
├── primary/              # Main brand font
│   ├── Brand-Regular.ttf
│   ├── Brand-Bold.ttf
│   └── Brand-Light.ttf
├── secondary/            # Secondary/accent font
│   ├── Accent-Regular.ttf
│   └── Accent-Bold.ttf
├── system/               # System/UI fonts
│   ├── System-Regular.ttf
│   └── System-Medium.ttf
└── display/              # Display/heading fonts
    ├── Display-Regular.ttf
    └── Display-Bold.ttf
```

### Best Practices

1. **Limit font families**: Use 2-3 families maximum
2. **Choose essential weights**: Regular and Bold are often sufficient
3. **Consistent naming**: Use descriptive folder and file names
4. **Group logically**: Organize by usage, not alphabetically
5. **Test loading**: Verify fonts load correctly across devices

### Bundle Size Optimization

1. **Use only needed weights**: Remove unused font files
2. **Subset fonts**: Include only required characters (advanced)
3. **Monitor bundle**: Check output size regularly
4. **Consider system fonts**: Use OS defaults when appropriate

## Integration with Build Process

### Automatic Conversion

The conversion happens automatically when:

- Running `npm run build`
- Files change in `src/fonts/` during development
- New fonts are added to the project

### Build Output

After build, fonts are available at:

- `/fonts/family-name/Font-Weight.woff2`
- `/fonts/family-name/Font-Weight.woff`

CSS is automatically generated and included in your SCSS build.
