# Ensures that interactive elements are not visually hidden (`github/a11y-no-sr-only-class-when-focusable`)

<!-- end auto-generated rule header -->

## Rule Details

This rule guards against visually hiding interactive elements. If a sighted keyboard user navigates to an interactive element that is visually hidden they might become confused and assume that keyboard focus has been lost.

👎 Examples of **incorrect** code for this rule:

```jsx
<button className="sr-only">Submit</button>
```

```jsx
<VisuallyHidden>
  <button>Submit</button>
</VisuallyHidden>
```

```jsx
<VisuallyHidden as="button">Submit</VisuallyHidden>
```

👍 Examples of **correct** code for this rule:

```jsx
<h2 className="sr-only">Welcome to GitHub</h2>
```

```jsx
<VisuallyHidden>
  <h2>Welcome to GitHub</h2>
</VisuallyHidden>
```

```jsx
<VisuallyHidden as="h2">Welcome to GitHub</VisuallyHidden>
```

## Version
