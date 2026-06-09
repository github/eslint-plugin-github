import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'

export const jsxA11yRecommendedRules = Object.fromEntries(
  Object.entries(jsxA11yPlugin.configs.recommended.rules).map(([ruleName, ruleConfig]) => [
    ruleName.replace(/^jsx-a11y-x\//, 'jsx-a11y/'),
    ruleConfig,
  ]),
)

export default jsxA11yPlugin
