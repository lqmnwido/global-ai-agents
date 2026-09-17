# Frontend · Accessibility

> Reusable frontend skill. Load when building or reviewing accessible interfaces.

## Purpose

- Ensures all UI meets WCAG 2.1 AA standards and is operable by all users regardless of input method or assistive technology.

## Rules

- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<article>`, `<h1>`-`<h6>`) before reaching for ARIA roles.
- Every interactive element must be keyboard-operable: focusable, activatable with Enter/Space, and navigable with Tab/Arrow keys.
- All non-text content (images, icons, decorative elements) must have appropriate `alt` text or `aria-label` and be hidden from screen readers if decorative.
- Form controls must have visible, persistent labels; never rely solely on placeholders as labels.
- Color must not be the only means of conveying information; supplement with icons, text, or patterns.
- Focus must be managed explicitly: trap focus in modals, return focus on close, and avoid unexpected focus shifts.
- Never disable accessibility features, skip ARIA attributes, or suppress `role="alert"` for convenience.

## Guidelines

- Use `aria-live` regions for dynamic content updates (notifications, form submission feedback) so screen readers announce changes.
- Ensure all focusable elements have a visible focus indicator that meets the 3:1 contrast ratio minimum.
- Maintain a logical heading hierarchy; do not skip heading levels (e.g. `<h1>` directly to `<h3>`).

```html
<!-- Good: semantic, labeled, accessible -->
<label for="email">Email address</label>
<input id="email" type="email" aria-required="true" aria-describedby="email-error" />
<span id="email-error" role="alert">Please enter a valid email.</span>
```

- Test with screen readers (NVDA, VoiceOver, or equivalent) and keyboard-only navigation before merging.
- Use `prefers-reduced-motion` media query to respect motion sensitivity preferences.

## Anti-patterns

- Do not use `<div>` or `<span>` as buttons or links; always use the appropriate interactive element.
- Do not remove `outline: none` or `outline: 0` without providing an equally visible alternative focus style.
- Do not set `tabindex` greater than 0; use logical DOM order instead.
- Do not use `aria-hidden="true"` on focusable elements.
- Do not skip landmark roles or HTML5 landmarks (`<header>`, `<footer>`, `<aside>`) in favor of generic containers.
