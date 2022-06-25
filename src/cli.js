#!/usr/bin/env node
const {mdLinks} = require('./index');

const route = process.argv[2];
const validate = process.argv.some((el) => el === '--validate');
const stats = process.argv.some((el) => el === '--stats');
const log = console.log;

mdLinks(route, {validate, stats}).then((res) => {
  log(res);
});
