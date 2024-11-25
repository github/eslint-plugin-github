# Ensure filenames match a regex naming convention (`github/filenames-match-regex`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Rule Details

TRule to ensure that filenames match a convention, with a default of camelCase.

👎 Examples of **incorrect** filename for this default rule:

`file-name.js`

👍 Examples of **correct** code for this rule:

`fileName.js`

## Options

regex - Regex to match the filename structure. Defaults to camelCase.


```json
{
  "filenames-match-regex": [
    "error",
    "^[a-z0-9-]+(.[a-z0-9-]+)?$"
  ]
}
```

## Version

4.3.2
