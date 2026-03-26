# github/no-dynamic-script-tag

📝 Disallow creating dynamic script tags.

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Rule Details

Creating dynamic script tags bypasses a lot of security measures - like SRIs - and pose a potential threat to your application.
Instead of creating a `script` tag in the client, provide all necessary `script` tags in the page's HTML.

👎 Examples of **incorrect** code for this rule:

```js
document.createElement('script')
document.getElementById('some-id').type = 'text/javascript'
```

👍 Examples of **correct** code for this rule:

```html
<!-- index.html -->
<script src="/index.js" type="text/javascript">
```

## Version

4.3.2
