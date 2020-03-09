#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

const defaults = {
  project: 'lib',
  env: 'browser',
  typeSystem: 'none'
}

const packagePath = path.resolve(process.cwd(), 'package.json')
if (fs.existsSync(packagePath)) {
  const packageJSON = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
  defaults.project = packageJSON.private ? 'app' : 'lib'

  const dependencies = Object.keys(packageJSON.dependencies || {})
  const devDependencies = Object.keys(packageJSON.devDependencies || {})

  if (dependencies.includes('typescript') || devDependencies.includes('typescript')) {
    defaults.typeSystem = 'typescript'
  }
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
    choices: ['typescript', 'none'],
    default: defaults.typeSystem
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

  if (answers.typeSystem === 'typescript') {
    eslintrc.extends.push('plugin:github/typescript')
    eslintrc.parser = '@typescript-eslint/parser'

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
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfigDefaults, null, '  '), 'utf8')
    }
  }

  fs.writeFileSync(path.resolve(process.cwd(), '.eslintrc.json'), JSON.stringify(eslintrc, null, '  '), 'utf8')

  const prettierConfig = []
  prettierConfig.push("module.exports = require('eslint-plugin-github/prettier.config')")
  prettierConfig.push('')

  fs.writeFileSync(path.resolve(process.cwd(), 'prettier.config.js'), prettierConfig.join('\n'), 'utf8')
})
