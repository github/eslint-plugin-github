#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

const defaults = {
  project: 'lib',
  env: 'browser',
  typeSystem: 'flow',
  react: true,
  relay: true
}

const packagePath = path.resolve(process.cwd(), 'package.json')
if (fs.existsSync(packagePath)) {
  const packageJSON = fs.readFileSync(packagePath, 'utf8')
  defaults.project = /private/.test(packageJSON) ? 'app' : 'lib'
  if (/typescript/.test(packageJSON)) {
    defaults.typeSystem = 'typescript'
  }
  defaults.react = /react/.test(packageJSON)
  defaults.relay = /relay/.test(packageJSON)
}

const questions = [
  {
    type: 'list',
    name: 'project',
    message: 'Is this project a web app or reuseable library?',
    choices: ['app', 'lib'],
    default: defaults.project
  },
  {
    type: 'list',
    name: 'env',
    message: 'Which environment does this library target?',
    choices: ['browser', 'node'],
    default: defaults.env
  },
  {
    type: 'list',
    name: 'typeSystem',
    message: 'What type system are you using?',
    choices: ['flow', 'typescript'],
    default: defaults.typeSystem
  },
  {
    type: 'confirm',
    name: 'relay',
    message: 'Are you using Relay?',
    default: defaults.relay
  },
  {
    type: 'confirm',
    name: 'react',
    message: 'Are you using React?',
    default: defaults.react,
    when: answers => answers.env === 'browser'
  }
]

inquirer.prompt(questions).then(answers => {
  const eslintrc = {extends: ['plugin:github/es6']}

  if (answers.env === 'node') {
    eslintrc.extends.push('plugin:github/node')
  } else if (answers.project === 'app') {
    eslintrc.extends.push('plugin:github/app')
  } else if (answers.env === 'browser') {
    eslintrc.extends.push('plugin:github/browser')
  }

  if (answers.typeSystem === 'flow') eslintrc.extends.push('plugin:github/flow')
  if (answers.typeSystem === 'typescript') {
    eslintrc.extends.push('plugin:github/typescript')
    eslintrc.parser = 'typescript-eslint-parser'
    eslintrc.plugins = ['tslint', 'typescript']
    eslintrc.rules = {
      'import/no-namespace': 'off',
      'typescript/no-unused-vars': 'error',
      'tslint/config': [
        'warn',
        {
          lintFile: './tslint.json',
          configFile: './tsconfig.json'
        }
      ]
    }

    // Create a `tsconfig.json`.
    const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json')
    if (!fs.existsSync(tsconfigPath)) {
      const tsconfigDefaults = {
        compilerOptions: {
          target: 'es2015',
          module: 'esnext',
          lib: ['esnext', 'dom'],
          allowSyntheticDefaultImports: true,
          moduleResolution: 'node'
        }
      }
      if (answers.react) {
        tsconfigDefaults.compilerOptions.jsx = 'react'
      }
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfigDefaults, null, '  '), 'utf8')
    }

    // Create a `tslint.json`.
    let tslintrc = {
      extends: ['eslint-plugin-github/lib/configs/tslint.json']
    }

    fs.writeFileSync(path.resolve(process.cwd(), 'tslint.json'), JSON.stringify(tslintrc, null, 2), 'utf8')
  }

  if (answers.react) eslintrc.extends.push('plugin:github/react')
  if (answers.relay) eslintrc.extends.push('plugin:github/relay')

  fs.writeFileSync(path.resolve(process.cwd(), '.eslintrc.json'), JSON.stringify(eslintrc, null, '  '), 'utf8')

  const prettierConfig = []
  if (answers.typeSystem === 'flow') prettierConfig.push('/* @flow */')

  prettierConfig.push("module.exports = require('eslint-plugin-github/prettier.config')")
  prettierConfig.push('')

  fs.writeFileSync(path.resolve(process.cwd(), 'prettier.config.js'), prettierConfig.join('\n'), 'utf8')
})
