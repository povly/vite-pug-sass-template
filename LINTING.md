# Code Linting and Formatting

## 📚 Documentation

- [📋 Main README](README.md) - Project overview and setup
- [🖼️ Images Guide](IMAGES.md) - Image processing and optimization
- [📝 Fonts Guide](FONTS.md) - Font management and conversion
- [🔧 **Linting & Formatting**](LINTING.md) - Code quality tools (current)

---

This project is configured with a complete set of tools for code quality checking and automatic formatting.

## Installed Tools

### ESLint

- **Purpose**: JavaScript code analysis for errors and coding standards
- **Config**: `eslint.config.js`
- **Features**: ES modules, browser globals, auto-fix

### Stylelint

- **Purpose**: CSS/SCSS code analysis
- **Config**: `stylelint.config.js`
- **Features**: SCSS syntax support, auto-fix

### Prettier

- **Purpose**: Automatic code formatting
- **Config**: `.prettierrc`
- **Features**: JS, CSS, SCSS, HTML, Markdown support

### Pug-lint

- **Purpose**: Pug template validation
- **Config**: `.pugrc.js`
- **Features**: Syntax and style validation

## Commands

### Linting

```bash
# Check all files
npm run lint

# Check JavaScript only
npm run lint:js

# Check CSS/SCSS only
npm run lint:css

# Check Pug only
npm run lint:pug
```

### Formatting

```bash
# Format all files
npm run format

# Format JavaScript only
npm run format:js

# Format CSS/SCSS only
npm run format:css

# Format Pug only
npm run format:pug

# Check formatting without changes
npm run check-format
```

### Combined Commands

```bash
# Linting + formatting
npm run lint-staged
```

## Configuration

### ESLint Rules

- `no-console`: warning - warns about console.log usage
- `no-unused-vars`: warning - unused variables
- `prefer-const`: error - use const instead of let
- `no-var`: error - forbid var keyword

### Stylelint Rules

- Standard SCSS rules
- Disabled strict patterns for classes and variables
- CSS modules support (composes property)

### Prettier Settings

- Single quotes
- Semicolons enabled
- Trailing commas in ES5 style
- 80 characters per line
- 2 spaces for indentation

## Editor Integration

### VS Code

Install extensions:

- ESLint
- Stylelint
- Prettier - Code formatter

Add to `settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  }
}
```

### Other Editors

Most modern editors support these tools through plugins.

## Ignored Files

Files in `.prettierignore`:

- `node_modules/`
- `build/`, `dist/`
- `*.min.js`, `*.min.css`
- `*.pug` (due to JS parsing issues in templates)

## Troubleshooting

### ESLint Errors

- Ensure all browser APIs are added to globals
- Use `// eslint-disable-next-line` for exceptions

### Stylelint Errors

- Make sure you're using SCSS syntax
- Check proper nesting rules

### Prettier Errors

- Pug files are excluded from auto-formatting
- Use `// prettier-ignore` for exceptions

## Quick Start

1. **Install dependencies**: Already included in the project
2. **Run linting**: `npm run lint`
3. **Format code**: `npm run format`
4. **Set up your editor**: Install recommended extensions
5. **Enable format on save**: Follow editor integration guide above

## Best Practices

- Run `npm run lint` before committing
- Use `npm run format` to maintain consistent code style
- Configure your editor for automatic formatting on save
- Review linting warnings and fix them when possible
- Use ESLint disable comments sparingly and document why
