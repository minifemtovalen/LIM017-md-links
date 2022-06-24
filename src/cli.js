#!/usr/bin/env node
const chalk = require('chalk');

const {
  isDirectory,
  isValidPath,
  isMdFile,
  getToFileLvl,
  readFile,
  convertToAbsolute,
  validateLink,
} = require('./util.js');

const route = process.argv[2];
const isValidate = process.argv.some((el) => el === '--validate');
const log = console.log;
log(isValidate);

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
  const extractedLinks = [];
  getFile.forEach((link) => {
    extractedLinks.push(...readFile(link));
  });
  if (isValidate) {
    validateLink(extractedLinks).then((res) => {
      log(res);
    });
  } else {
    log(extractedLinks);
  }
} else {
  if (isMdFile(absolutePath)) {
    const links = readFile(absolutePath);
    if (isValidate) {
      validateLink(links).then((res) => {
        log(res);
      });
    } else {
      log(links);
    }
  } else {
    throw new TypeError(chalk.red.bold('Error: the extension should be .md'));
  }
}

log(chalk.magenta('the absolute path is'), chalk.cyan.italic(absolutePath));

