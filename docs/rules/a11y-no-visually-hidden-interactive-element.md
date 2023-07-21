# Ensures that interactive elements are not visually hidden (`github/a11y-no-visually-hidden-interactive-element`)

💼 This rule is enabled in the ⚛️ `react` config.

<!-- end auto-generated rule header -->

## Rule Details

This rule guards against visually hiding interactive elements. If a sighted keyboard user navigates to an interactive element that is visually hidden they might become confused and assume that keyboard focus has been lost.

Note: we are not guarding against visually hidden `input` elements at this time. Some visually hidden inputs might cause a false positive (e.g. some file inputs).

### Why do we visually hide content?

Visually hiding content can be useful when you want to provide information specifically to screen reader users or other assistive technology users while keeping content hidden from sighted users.

Applying the following css will visually hide content while still making it accessible to screen reader users.

```css
clip-path: inset(50%);
height: 1px;
overflow: hidden;
position: absolute;
white-space: nowrap;
width: 1px;
```

👎 Examples of **incorrect** code for this rule:

```jsx
<button className="visually-hidden">Submit</button>
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
<h2 className="visually-hidden">Welcome to GitHub</h2>
```

```jsx
<VisuallyHidden>
  <h2>Welcome to GitHub</h2>
</VisuallyHidden>
```

```jsx
<VisuallyHidden as="h2">Welcome to GitHub</VisuallyHidden>
```

## Options

- className - A css className that visually hides content. Defaults to `sr-only`.
- componentName - A react component name that visually hides content. Defaults to `VisuallyHidden`.

```json
{
  "a11y-no-visually-hidden-interactive-element": [
    "error",
    {
      "className": "visually-hidden",
      "componentName": "VisuallyHidden"
    }
  ]
}
```

## Version
