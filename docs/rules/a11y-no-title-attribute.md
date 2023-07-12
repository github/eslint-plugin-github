# Guards against developers using the title attribute (`github/a11y-no-title-attribute`)

💼 This rule is enabled in the ⚛️ `react` config.

<!-- end auto-generated rule header -->

The title attribute is strongly discouraged. The only exception is on an `<iframe>` element. It is hardly useful and cannot be accessed by multiple groups of users including keyboard-only users and mobile users.

The `title` attribute is commonly set on links, matching the link text. This is redundant and unnecessary so it can be simply be removed.

If you are considering the `title` attribute to provide supplementary description, consider whether the text in question can be persisted in the design. Alternatively, if it's important to display supplementary text that is hidden by default, consider using an accessible tooltip implementation that uses the aria-labelledby or aria-describedby semantics. Even so, proceed with caution: tooltips should only be used on interactive elements like links or buttons. See [Tooltip alternatives](https://primer.style/design/guides/accessibility/tooltip-alternatives) for more accessible alternatives.

### Should I use the title attribute to provide an accessible name for an <svg>?

Use a <title> element instead of the title attribute, or an aria-label.

## Rule Details

👎 Examples of **incorrect** code for this rule:

```jsx
<a src="https://www.github.com" title="A home for all developers">
  GitHub
</a>
```

```jsx
<a href="/" title="github.com">
  GitHub
</a>
```

```jsx
<span src="https://www.github.com" title="supercalifragilisticexpialidocious">
  supercali...
</span>
```

👍 Examples of **correct** code for this rule:

```jsx
<iframe src="https://www.github.com" title="Github"></iframe>
```

## Version
