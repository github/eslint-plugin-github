# Ensure filenames match a regex naming convention (`github/filenames-match-regex`)

<!-- end auto-generated rule header -->

## Rule Details

Rule to ensure that filenames match a convention, with a default of kebab case or camelCase with one hump for flat config.

👎 Examples of **incorrect** filename for this default rule:

- `fileNameRule.js`

👍 Examples of **correct** code for this rule:

- `fileName.js`
- `file-name.js`

## Options

- regex - Regex to match the filename structure. Defaults to kebab case or camelCase with one hump.

Default:

```json
{
  "filenames-match-regex": [
    "error"
  ]
}
```

If you want to add custom regex such as matching all camelCase, add the regex as a string. For example, for camelCase it would look like:

```json
{
  "filenames-match-regex": [
    "error",
    "^([a-z0-9]+)([A-Z][a-z0-9]+)*$"
  ]
}
```

## Version

4.3.2
