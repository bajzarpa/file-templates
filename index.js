#!/usr/bin/env node
const fs = require('fs-extra')
const argv = require('yargs').argv
const camelCase = require('camelcase')
const storeFactory = require('./store')
const componentFactory = require('./component')

const { type, name } = argv

if (!type || !name || name === '' || type === '') return console.error('Both type and name parameters are required!')

const moduleName = camelCase(name)

const createStore = async () => {
  await fs.mkdirsSync(`./${name}`)
  await fs.writeFileSync(`./${name}/index.js`, storeFactory.index(moduleName))
  await fs.writeFileSync(`./${name}/getters.js`, storeFactory.getters(moduleName))
  await fs.writeFileSync(`./${name}/internal.js`, storeFactory.internal())
  await fs.writeFileSync(`./${name}/mutations.js`, '')
  await fs.writeFileSync(`./${name}/mutation-types.js`, '')
}

const createComponent = async () => {
  await fs.mkdirsSync(`./${name}`)
  await fs.writeFileSync(`./${name}/index.js`, componentFactory.component(moduleName))
  await fs.writeFileSync(`./${name}/template.html`, componentFactory.template(name))
  await fs.writeFileSync(`./${name}/style.scss`, componentFactory.styles(name))
}

if (type === 'store') createStore()
if (type === 'component') createComponent()
