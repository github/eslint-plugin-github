#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

const defaults = {
  project: 'lib',
  env: 'browser',
  flow: true,
  react: true,
  relay: true
}

const packagePath = path.resolve(process.cwd(), 'package.json')
if (fs.existsSync(packagePath)) {
  const packageJSON = fs.readFileSync(packagePath, 'utf8')
  defaults.project = /private/.test(packageJSON) ? 'app' : 'lib'
  defaults.flow = /flow/.test(packageJSON)
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
    type: 'confirm',
    name: 'flow',
    message: 'Are you using Flow?',
    default: defaults.flow
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

  if (answers.project === 'app') {
    eslintrc.extends.push('plugin:github/app')
  } else if (answers.env === 'browser') {
    eslintrc.extends.push('plugin:github/browser')
  } else if (answers.env === 'node') {
    eslintrc.extends.push('plugin:github/node')
  }

  if (answers.flow) eslintrc.extends.push('plugin:github/flow')
  if (answers.react) eslintrc.extends.push('plugin:github/react')
  if (answers.relay) eslintrc.extends.push('plugin:github/relay')

  fs.writeFileSync(path.resolve(process.cwd(), '.eslintrc.json'), JSON.stringify(eslintrc, null, '  '), 'utf8')

  const prettierConfig = []
  if (answers.flow) prettierConfig.push('/* @flow */')
  prettierConfig.push("module.exports = require('eslint-plugin-github/prettier.config')")
  prettierConfig.push('')

  fs.writeFileSync(path.resolve(process.cwd(), 'prettier.config.js'), prettierConfig.join('\n'), 'utf8')
})
