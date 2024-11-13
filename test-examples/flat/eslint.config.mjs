import github from 'eslint-plugin-github'

export default [
  github.flatConfigs().browser,
  github.flatConfigs().recommended,
  github.flatConfigs().react,
  ...github.flatConfigs().typescript,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ignores: ['eslint.config.mjs'],
    rules: {
      'github/array-foreach': 'error',
      'github/async-preventdefault': 'warn',
      'github/no-then': 'error',
      'github/no-blur': 'error',
    },
  },
]
