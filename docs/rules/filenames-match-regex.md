# Ensure filenames match a regex naming convention (`github/filenames-match-regex`)

<!-- end auto-generated rule header -->

## Rule Details

Rule to ensure that filenames match a convention, with a default of camelCase for ESLint v9+.

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
