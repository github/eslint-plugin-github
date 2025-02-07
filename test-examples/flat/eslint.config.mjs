import github from 'eslint-plugin-github'

export default [
  github.getFlatConfigs().recommended,
  github.getFlatConfigs().browser,
  github.getFlatConfigs().react,
  ...github.getFlatConfigs().typescript,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ignores: ['eslint.config.mjs'],
    rules: {
      'github/array-foreach': 'error',
      'github/no-then': 'error',
      'github/no-blur': 'error',
      'github/async-preventdefault': 'error',
      'github/async-currenttarget': 'error',
      'github/no-useless-passive': 'error',
      'github/filenames-match-regex': 'error',
    },
  },
]
