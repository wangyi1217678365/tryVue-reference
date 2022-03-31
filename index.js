#!/usr/bin/env node
const figlet = require('figlet');
const versionStr = figlet.textSync('Fire Monkey');
const Printer = require('@darkobits/lolcatjs')
const { program } = require('commander')
const create = require('./command/create')
const add = require('./command/add')
const ui = require('./command/ui')


program
  .version(
    Printer.fromString(`\n    ${require('./package').version}\n    ${versionStr}`))

program.parse(process.argv)
