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

const mdLinks = (route, {validate, stats}) => {
  const absolutePath = convertToAbsolute(route);
  if (!route) {
    throw new TypeError(chalk.red.bold('Error: Route parameter is required'));
  }
  if (!isValidPath(absolutePath)) {
    throw new TypeError(chalk.red.bold('Error: invalid path'));
  }
  if (isDirectory(absolutePath)) {
    const getFile = getToFileLvl(absolutePath);
    const extractedLinks = [];
    getFile.forEach((link) => {
      extractedLinks.push(...readFile(link));
    });
    if (validate) {
      if (!stats) {
        return validateLink(extractedLinks);
      } else {
        return getLinkStats(extractedLinks, true).then((res) => {
          return `
            Total: ${res.total}
            Unique: ${res.unique}
            Broken: ${res.broken}
          `;
        });
      }
    } else if (!stats) {
      return new Promise((resolve) => {
        resolve(extractedLinks);
      });
    } else if (stats) {
      return getLinkStats(extractedLinks).then((res) => {
        return `
          Total: ${res.total}
          Unique: ${res.unique}
        `;
      });
    }
  } else {
    if (isMdFile(absolutePath)) {
      const links = readFile(absolutePath);
      if (validate) {
        if (!stats) {
          return validateLink(links);
        } else {
          return getLinkStats(links, true).then((res) => {
            return `
              Total: ${res.total}
              Unique: ${res.unique}
              Broken: ${res.broken}
            `;
          });
        }
      } else if (!stats) {
        return new Promise((resolve) => {
          resolve(links);
        });
      } else if (stats) {
        return getLinkStats(links).then((res) => {
          return `
            Total: ${res.total}
            Unique: ${res.unique}
          `;
        });
      }
    } else {
      throw new TypeError(chalk.red.bold('Error: the extension should be .md'));
    }
  }
};

module.exports = {
  mdLinks,
};
