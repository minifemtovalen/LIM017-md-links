#!/usr/bin/env node
const chalk = require('chalk');

const {
  isDirectory,
  isValidPath,
  isMdFile,
  getToFileLvl,
  readFile,
  convertToAbsolute,
} = require('./util.js');

const route = process.argv[2];
const log = console.log;

const absolutePath = convertToAbsolute(route);
if (!route) {
  throw new TypeError(chalk.red.bold('Error: Route parameter is required'));
}
log(absolutePath);
if (!isValidPath(absolutePath)) {
  throw new TypeError(chalk.red.bold('Error: invalid path'));
}

if (isDirectory(absolutePath)) {
  const getFile = getToFileLvl(absolutePath);
  const extractedLinks = getFile.map((link) => {
    return readFile(link);
  });
  console.log(extractedLinks);
} else {
  if (isMdFile(absolutePath)) {
    chalk.cyan.italic(readFile(absolutePath));
    // log(links);
  } else {
    throw new TypeError(chalk.red.bold('Error: the extension should be .md'));
  }
}

log(chalk.magenta('the absolute path is'), chalk.cyan.italic(absolutePath));
