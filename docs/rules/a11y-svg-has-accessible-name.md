# SVGs must have an accessible name (`github/a11y-svg-has-accessible-name`)

💼 This rule is enabled in the ⚛️ `react` config.

<!-- end auto-generated rule header -->

## Rule Details

An `<svg>` must have an accessible name. Set `aria-label` or `aria-labelledby`, or nest a `<title>` element as the first child of the `<svg>` element.

However, if the `<svg>` is purely decorative, hide it with `aria-hidden="true"` or `role="presentation"`.

## Resources

- [Accessible SVGs](https://css-tricks.com/accessible-svgs/)

## Examples

### **Incorrect** code for this rule 👎

```html
<svg height='100' width='100'>
  <circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red'/>
</svg>
```

```html
<svg height='100' width='100' title='Circle with a black outline and red fill'>
  <circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red'/>
</svg>
```

```html
<svg height='100' width='100'>
  <circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red'/>
  <title>Circle with a black outline and red fill</title>
</svg>
```

### **Correct** code for this rule 👍

```html
<svg height='100' width='100'>
  <title>Circle with a black outline and red fill</title>
  <circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red'/>
</svg>
```

```html
<svg aria-label='Circle with a black outline and red fill' height='100' width='100'>
  <circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red'/>
</svg>
```

```html
<svg aria-labelledby='circle_text' height='100' width='100'>
  <circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red'/>
</svg>
```

```html
<svg aria-hidden='true' height='100' width='100'>
  <circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red'/>
</svg>
```

```html
<svg role='presentation' height='100' width='100'>
  <circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red'/>
</svg>
```

## Version
