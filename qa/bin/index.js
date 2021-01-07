#!/usr/bin/env node

const process = require('process')
const cmd = require('commander')

cmd
  .command('build')
  .action(() => {
    const compile = require('../commands/compile')
    const mode = 'development'
    compile({
      mode,
      cwd: process.cwd(),
    }).catch(err => {
      process.exit(1)
    })
  })
  .allowUnknownOption()

cmd.parse(process.argv)
