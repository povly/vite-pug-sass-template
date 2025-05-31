# Image Optimization

## 📚 Documentation

- [📋 Main README](README.md) - Project overview and setup
- [🖼️ **Images Guide**](IMAGES.md) - Image processing and optimization (current)
- [📝 Fonts Guide](FONTS.md) - Font management and conversion
- [🔧 Linting & Formatting](LINTING.md) - Code quality tools

---

Complete guide for working with images in Vite Multi-Page Template.

## Quick Start

```bash
# 1. Add images to src/images/
mkdir src/images
cp your-image.jpg src/images/

# 2. Convert to modern formats
npm run convert-images

# 3. Use in Pug
include ../mixins/picture
+picture('your-image.jpg', 'Description', 'image-class')
```

## Supported Formats

### Input Formats

- **JPG/JPEG** - photos, complex images
- **PNG** - images with transparency, graphics
- **WebP** - modern format (already optimized)
- **TIFF** - high quality images
- **GIF** - animated graphics
- **BMP** - bitmap images

### Output Formats

- **AVIF** - best compression (80% quality)
- **WebP** - wide browser support (85% quality)
- **Optimized original** - fallback (90% quality)

## File Organization

### Recommended Structure

```
src/images/
├── hero/                    # Hero sections
│   ├── hero-desktop.jpg     # 1920x1080 or larger
│   ├── hero-tablet.jpg      # 1024x768
│   └── hero-mobile.jpg      # 375x667
├── gallery/                 # Galleries
│   ├── gallery-1.jpg
│   ├── gallery-2.jpg
│   └── gallery-3.png
├── icons/                   # Icons and logos
│   ├── logo.svg
│   ├── icon-phone.png
│   └── social-facebook.png
├── backgrounds/             # Background images
│   ├── pattern.png
│   ├── texture.jpg
│   └── gradient-overlay.png
└── content/                # Content images
    ├── article-image.jpg
    ├── product-photo.jpg
    └── team-member.jpg
```

### File Naming

```bash
# Good
hero-desktop.jpg
gallery-item-1.jpg
logo-company.png
bg-pattern.jpg

# Bad
IMG_2341.jpg
picture1.jpeg
background.png
```

## Usage in Pug

### Including Mixins

```pug
//- At the beginning of the file
include ../mixins/picture
```

### Responsive Images

```pug
//- Simple image with automatic format selection
+picture('hero.jpg', 'Hero image', 'hero__image')

//- With lazy loading and sizes
+picture('gallery-1.jpg', 'Photo 1', 'gallery__item', 'lazy', '(max-width: 768px) 100vw, 50vw')

//- Eager loading for important images
+picture('logo.png', 'Logo', 'header__logo', 'eager')
```

### Hero Images

```pug
//- Different images for different devices
+hero('hero-mobile.jpg', 'hero-tablet.jpg', 'hero-desktop.jpg', 'Main image', 'hero__bg')
```

### Simple Images

```pug
//- Without <picture>, just <img>
+img('simple-icon.png', 'Icon', 'button__icon')
```

### Background Images

```pug
//- Creates CSS variables for backgrounds
+backgroundImage('pattern.jpg', 'section__background')
  .content
    h2 Title
    p Text over background
```

## Usage in SCSS

### Including Mixins

```scss
@import 'mixins/images';
```

### Background Images

```scss
// Automatic format selection
.hero {
  @include background-image('hero.jpg');
  @include image-cover;
  height: 100vh;
}

// Different images for different screens
.banner {
  @include responsive-background(
    'banner-mobile.jpg',
    // <= 767px
    'banner-tablet.jpg',
    // 768px - 1023px
    'banner-desktop.jpg' // >= 1024px
  );
}
```

### CSS Variables

```scss
// Used with Pug mixin +backgroundImage
.section {
  @include bg-with-vars;
  @include image-cover;
  min-height: 400px;
}
```

### Lazy Loading Backgrounds

```scss
.gallery-item {
  @include lazy-background('gallery-item.jpg');

  // Add .loaded class via JS
  &.loaded {
    // Image loaded
  }
}
```

### Container Optimization

```scss
.card {
  @include optimized-image;

  // Automatically applies:
  // - content-visibility: auto
  // - smooth image loading
  // - proper picture/img sizes
}
```

## JavaScript Integration

### Lazy Loading Control

```javascript
// Intersection Observer for lazy loading
const images = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
```

### Dynamic Format Detection

```javascript
// Check WebP support
function supportsWebP() {
  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/webp').indexOf('webp') > -1;
}

// Check AVIF support
async function supportsAVIF() {
  if (!self.createImageBitmap) return false;

  const avifData = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg';

  try {
    const blob = await fetch(avifData).then(r => r.blob());
    await createImageBitmap(blob);
    return true;
  } catch {
    return false;
  }
}
```

## Performance Optimization

### Preloading

```html
<!-- Preload critical images -->
<link rel="preload" as="image" href="/images/hero/hero-desktop.avif" type="image/avif">
<link rel="preload" as="image" href="/images/hero/hero-desktop.webp" type="image/webp">
```

### Resource Hints

```html
<!-- DNS prefetch for image CDN -->
<link rel="dns-prefetch" href="//images.example.com">

<!-- Preconnect for external images -->
<link rel="preconnect" href="https://images.unsplash.com">
```

### Image Optimization Tips

1. **Use appropriate sizes**: Don't serve desktop images to mobile
2. **Lazy load below-the-fold**: Save bandwidth for important content
3. **Optimize quality settings**: 80-85% quality is usually sufficient
4. **Use modern formats**: AVIF and WebP provide better compression
5. **Implement progressive enhancement**: Always provide fallbacks

## Browser Support

| Format | Chrome | Firefox | Safari | Edge | IE  |
|--------|--------|---------|--------|------|-----|
| AVIF   | 85+    | 93+     | 16.1+  | 93+  | ❌   |
| WebP   | 23+    | 65+     | 14+    | 18+  | ❌   |
| JPEG   | ✅      | ✅       | ✅      | ✅    | ✅   |
| PNG    | ✅      | ✅       | ✅      | ✅    | ✅   |

## Advanced Usage

### Art Direction

```pug
//- Different images for different viewports
picture
  source(
    media="(min-width: 1024px)"
    srcset="/images/hero/hero-desktop.avif"
    type="image/avif"
  )
  source(
    media="(min-width: 1024px)"
    srcset="/images/hero/hero-desktop.webp"
    type="image/webp"
  )
  source(
    media="(min-width: 768px)"
    srcset="/images/hero/hero-tablet.avif"
    type="image/avif"
  )
  source(
    media="(min-width: 768px)"
    srcset="/images/hero/hero-tablet.webp"
    type="image/webp"
  )
  img(
    src="/images/hero/hero-mobile.jpg"
    alt="Hero image"
    loading="eager"
  )
```

### Responsive Sizes

```pug
//- Complex sizes attribute
+picture(
  'gallery-item.jpg',
  'Gallery item',
  'gallery__item',
  'lazy',
  '(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
)
```

## Troubleshooting

### Images Not Loading

1. **Check file paths**: Ensure images exist in `src/images/`
2. **Run conversion**: Execute `npm run convert-images`
3. **Verify output**: Check `public/images/` directory
4. **Browser cache**: Hard refresh (Ctrl+F5)

### Large Bundle Sizes

1. **Optimize source images**: Reduce resolution before conversion
2. **Adjust quality settings**: Lower quality percentages in conversion script
3. **Remove unused images**: Clean up `src/images/` directory
4. **Use lazy loading**: Load images only when needed

### Poor Performance

1. **Implement lazy loading**: Add `loading="lazy"` to non-critical images
2. **Use appropriate formats**: Prefer AVIF over WebP over JPEG
3. **Size optimization**: Serve different sizes for different viewports
4. **Preload critical images**: Use resource hints for above-the-fold content

## Best Practices

- **Always provide alt text**: Essential for accessibility
- **Use semantic HTML**: Proper image markup improves SEO
- **Optimize for mobile first**: Start with smallest images
- **Test on real devices**: Verify performance on actual hardware
- **Monitor core web vitals**: Track LCP, CLS, and other metrics
- **Keep source images**: Never delete original high-quality files
