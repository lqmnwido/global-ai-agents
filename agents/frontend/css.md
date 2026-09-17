# Frontend · CSS

> Reusable frontend skill. Load when writing or reviewing styles, theming, or layout.

## Purpose

- Governs CSS conventions, design-system token usage, and layout patterns to ensure visual consistency and maintainability.

## Rules

- Always use design system tokens (CSS custom properties, Tailwind utilities, or theme variables) for colors, spacing, typography, and shadows.
- Never use inline styles for layout, positioning, or responsive behavior; inline styles are restricted to dynamic values driven by JS state only.
- Follow the project's naming convention: BEM, utility-first (Tailwind), or CSS Modules with kebab-case class names; do not mix conventions.
- Responsive design must use the project's defined breakpoints; do not introduce ad hoc pixel values.
- Z-index usage must reference a token scale or documented layer system; arbitrary z-index values are prohibited.
- Theme switching (light/dark) must be implemented through token overrides, not by duplicating style rules.

## Guidelines

- Prefer CSS custom properties for values that change per theme or user preference; this enables runtime theming with minimal re-rendering.
- Use semantic class names that describe purpose, not appearance: `.card-title` not `.text-lg-blue`.

```css
/* Good: token-based, semantic */
.card-title {
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}
```

- Extract repeated layout patterns into shared utility classes or composed components; avoid repeating complex media query stacks.
- Limit specificity; avoid nesting selectors more than two levels deep in preprocessor workflows.
- Use `rem` for font sizing and spacing tokens; avoid `px` for anything other than borders and hairlines.

## Anti-patterns

- Do not hardcode hex, RGB, or named colors directly in component styles; use the design system color tokens.
- Do not use `!important` to override styles; fix specificity at the source instead.
- Do not create one-off utility classes for a single element; promote the pattern into the design system if it recurs.
- Do not duplicate responsive breakpoints or spacing scales outside the shared configuration file.
- Do not use CSS-in-JS runtime solutions if the project uses a build-time or utility CSS approach.
