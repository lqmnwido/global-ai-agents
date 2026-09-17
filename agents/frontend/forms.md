# Frontend · Forms

> Reusable frontend skill. Load when working on form handling, validation, and submission.

## Purpose

- Governs form construction, validation strategy, error presentation, and submission handling to ensure reliable, accessible data entry.

## Rules

- Validate on the client immediately and always validate again on the server; never trust client-only validation.
- Show inline field-level errors as close to the relevant input as possible; never use alert dialogs for field errors.
- Disable the submit button or prevent submission while a request is in-flight; always guard against double-submit.
- Required fields must be clearly marked and must not silently pass empty values through to the backend.
- Keep all business logic, API calls, and data transformation out of the view layer; belong in hooks, services, or stores.
- Form state must reset or redirect after successful submission to prevent stale-data confusion.
- Every form control must have an associated `<label>` or `aria-label`; never use placeholder text as the sole label.

## Guidelines

- Use a schema-based validation library (Zod, Yup, or equivalent) to define a single source of truth for field rules.
- Represent loading states with visual feedback: disable fields, show a spinner on the submit button, or both.
- For complex forms, use field-level dirty/pristine tracking to avoid marking untouched fields as errored.
- Preserve user input on navigation or error; do not reset the entire form on a transient failure.

```tsx
// Good: explicit validation, accessible label, disabled during submit
const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
function LoginForm({ onSubmit }: { onSubmit: (v: LoginValues) => Promise<void> }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" disabled={isSubmitting} {...register("email")} />
      {errors.email && <span role="alert">{errors.email.message}</span>}
      <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Signing in..." : "Sign in"}</button>
    </form>
  );
}
```

- Map server validation errors back to the correct fields using a stable field name or path.
- Use `aria-invalid` and `aria-describedby` to communicate error states to assistive technology.

## Anti-patterns

- Do not bypass client validation by calling the API directly from a click handler without going through the form library.
- Do not display all errors at the top of the form; associate each error with its field visually and semantically.
- Do not clear unrelated fields when a single field's validation fails.
- Do not use uncontrolled components for forms that require real-time validation or conditional field logic.
- Do not store sensitive data (passwords, tokens) in component state longer than necessary.
