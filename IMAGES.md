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


### Hero Images

```pug
//- Different images for different devices
+hero('hero-mobile.jpg', 'hero-tablet.jpg', 'hero-desktop.jpg', 'Main image', 'hero__bg')
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
