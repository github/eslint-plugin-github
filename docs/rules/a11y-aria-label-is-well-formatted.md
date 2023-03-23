# [aria-label] text should be formatted as you would visual text (`github/a11y-aria-label-is-well-formatted`)

💼 This rule is enabled in the ⚛️ `react` config.

<!-- end auto-generated rule header -->

## Rule Details

`[aria-label]` content should be formatted in the same way you would visual text. Please use sentence case.

Do not connect the words like you would an ID. An `aria-label` is not an ID, and should be formatted as human-friendly text.

## Resources

- [Using aria-label](https://www.w3.org/WAI/tutorials/forms/labels/#using-aria-label)

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
