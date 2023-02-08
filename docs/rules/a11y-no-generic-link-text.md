# Disallow generic link text (`github/a11y-no-generic-link-text`)

❌ This rule is deprecated. It was replaced by `jsx-a11y/anchor-ambiguous-text`.

<!-- end auto-generated rule header -->

## Rule Details

Avoid setting generic link text like, "Click here", "Read more", and "Learn more" which do not make sense when read out of context.

Screen reader users often tab through links on a page to quickly find content without needing to listen to the full page. When link text is too generic, it becomes difficult to quickly identify the destination of the link. While it is possible to provide a more specific link text by setting the `aria-label`, this results in divergence between the label and the text and is not an ideal, future-proof solution.

Additionally, generic link text can also problematic for heavy zoom users where the link context is out of view.

Ensure that your link text is descriptive and the purpose of the link is clear even when read out of context of surrounding text.
Learn more about how to write descriptive link text at [Access Guide: Write descriptive link text](https://www.accessguide.io/guide/descriptive-link-text)

### Use of ARIA attributes

If you _must_ use ARIA to replace the visible link text, include the visible text at the beginning.

For example, on a pricing plans page, the following are good:

- Visible text: `Learn more`
- Accessible label: `Learn more about GitHub pricing plans`

Accessible ✅

```html
<a href="..." aria-label="Learn more about GitHub pricing plans">Learn more</a>
```

Inaccessible 🚫

```html
<a href="..." aria-label="GitHub pricing plans">Learn more</a>
```

Including the visible text in the ARIA label satisfies [SC 2.5.3: Label in Name](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html).

#### False negatives

Caution: because of the restrictions of static code analysis, we may not catch all violations.

Please perform browser tests and spot checks:

- when `aria-label` is set dynamically
- when using `aria-labelledby`

## Resources

- [Primer: Links](https://primer.style/design/accessibility/links)
- [Understanding Success Criterion 2.4.4: Link Purpose (In Context)](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html)
- [WebAim: Links and Hypertext](https://webaim.org/techniques/hypertext/)
- [Deque: Use link text that make sense when read out of context](https://dequeuniversity.com/tips/link-text)

## Examples

### **Incorrect** code for this rule 👎

```jsx
<a href="github.com/about">Learn more</a>
```

```jsx
<a href="github.com/about">Read more</a>
```

```jsx
<a href="github.com/about" aria-label="Why dogs are awesome">
  Read more
</a>
```

```jsx
<a href="github.com/about" aria-describedby="element123">
  Read more
</a>
```

### **Correct** code for this rule 👍

```jsx
<a href="github.com/about">Learn more about GitHub</a>
```

```jsx
<a href="github.com/new">Create a new repository</a>
```

## Version
