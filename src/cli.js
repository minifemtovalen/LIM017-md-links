const {
  convertToAbsolute,
  isDirectory,
  isValidPath,
  isMdFile,
  readFile,
} = require('./util.js');

const route = process.argv[2];

if (!route) {
  throw new TypeError('Error: Route parameter is required');
}

const absolutePath = convertToAbsolute(route);

if (!isValidPath(absolutePath)) {
  throw new TypeError('Error: invalid path');
}

if (isDirectory(absolutePath)) {
  console.log('is a directory');
} else {
  if (isMdFile(absolutePath)) {
    const links = readFile(absolutePath);
    console.log(links);
  } else {
    throw new TypeError('Error: the extension should be .md');
  }
}

console.log('the absolute path is', absolutePath);
