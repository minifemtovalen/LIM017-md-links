const fs = require('fs');
const path = require('path');

const convertToAbsolute = (route) => {
  const isAbsolute = path.isAbsolute(route);
  return isAbsolute ? route : path.resolve(route);
};

const isDirectory = (route) => fs.statSync(route).isDirectory();

const isValidPath = (route) => fs.existsSync(route);

const isMdFile = (route) => path.extname(route) === '.md';

const readFile = (route) => {
  const data = fs.readFileSync(route, {encoding: 'utf8'});
  const matches =
    data.match(/\[([^\[]+)\]\((http?:|https?:\/\/[\w\d./?=#]+)\)$/gm);
  return matches;
};

module.exports = {
  convertToAbsolute,
  isDirectory,
  isValidPath,
  isMdFile,
  readFile,
};
