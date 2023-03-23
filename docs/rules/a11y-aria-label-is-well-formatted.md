# [aria-label] text should be formatted as you would visual text (`github/a11y-aria-label-is-well-formatted`)

💼 This rule is enabled in the ⚛️ `react` config.

<!-- end auto-generated rule header -->

## Rule Details

`[aria-label]` content should be formatted in the same way you would visual text.

Please use sentence case, and avoid using hyphens like you would an ID.

## Resources

## Examples

### **Incorrect** code for this rule 👎

```html
<a href="..." aria-label="learn more"></a>
```

```html
<a href="..." aria-label="go-to-link"></a>
```

### **Correct** code for this rule 👍

```html
<a href="..." aria-label="Learn more"></a>
```

```html
<a href="..." aria-label="Homepage"></a>
```

## Version
