#!/usr/bin/env node
const chalk = require('chalk');

const {
  convertToAbsolute,
  isDirectory,
  isValidPath,
  isMdFile,
  readFile,
} = require('./util.js');

const route = process.argv[2];
const log = console.log;

if (!route) {
  throw new TypeError(chalk.red.bold('Error: Route parameter is required'));
}

const absolutePath = convertToAbsolute(route);

if (!isValidPath(absolutePath)) {
  throw new TypeError(chalk.red.bold('Error: invalid path'));
}

if (isDirectory(absolutePath)) {
  log(chalk.italic.green('is a directory'));
} else {
  if (isMdFile(absolutePath)) {
    const links = chalk.cyan.italic(readFile(absolutePath));
    log(links);
  } else {
    throw new TypeError(chalk.red.bold('Error: the extension should be .md'));
  }
}

log(chalk.magenta('the absolute path is'), chalk.cyan.italic(absolutePath));
