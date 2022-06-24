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
  getLinkStats,
} = require('./util.js');

const route = process.argv[2];
const isValidate = process.argv.some((el) => el === '--validate');
const isStats = process.argv.some((el) => el === '--stats');
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
  const extractedLinks = [];
  getFile.forEach((link) => {
    extractedLinks.push(...readFile(link));
  });
  if (isValidate) {
    if (!isStats) {
      validateLink(extractedLinks).then((res) => {
        log(res);
      });
    } else {
      getLinkStats(extractedLinks, true).then((res) => {
        log(`
          Total: ${res.total}
          Unique: ${res.unique}
          Broken: ${res.broken}
        `);
      });
    }
  } else if (!isStats) {
    log(extractedLinks);
  } else if (isStats) {
    getLinkStats(extractedLinks).then((res) => {
      log(`
        Total: ${res.total}
        Unique: ${res.unique}
      `);
    });
  }
} else {
  if (isMdFile(absolutePath)) {
    const links = readFile(absolutePath);
    if (isValidate) {
      if (!isStats) {
        validateLink(links).then((res) => {
          log(res);
        });
      } else {
        getLinkStats(links, true).then((res) => {
          log(`
            Total: ${res.total}
            Unique: ${res.unique}
            Broken: ${res.broken}
          `);
        });
      }
    } else if (!isStats) {
      log(links);
    } else if (isStats) {
      getLinkStats(links).then((res) => {
        log(`
          Total: ${res.total}
          Unique: ${res.unique}
        `);
      });
    }
  } else {
    throw new TypeError(chalk.red.bold('Error: the extension should be .md'));
  }
}

log(chalk.magenta('the absolute path is'), chalk.cyan.italic(absolutePath));

