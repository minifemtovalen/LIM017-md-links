const fs = require('fs');
const path = require('path');
const axios = require('axios').default;

const convertToAbsolute = (route) => {
  const isAbsolute = path.isAbsolute(route);
  return isAbsolute ? route : path.resolve(route);
};

const isDirectory = (route) => fs.statSync(route).isDirectory();

const isValidPath = (route) => fs.existsSync(route);

const isMdFile = (route) => path.extname(route) === '.md';


const getToFileLvl = (route) => {
  let pathArray = [];

  if (isDirectory(route) === false && isMdFile(route)) {
    pathArray.push(route);
  };

  if (isDirectory(route)) {
    const readDirectory = fs.readdirSync(route);
    readDirectory.map((el) => {
      const newPath = path.join(route, el);
      const newPathArray= getToFileLvl(newPath);
      pathArray = pathArray.concat(newPathArray);
    });
  }
  return pathArray;
};

const readFile = (route) => {
  const linksRegexr = /\[([^\[]+)\]\((http?:|https?:\/\/[\w\d./?=#]+)\)$/gm;
  const urlRegexr = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/gm;
  const textRegexr = /\[[\w\s\d.()]+\]/;
  const data = fs.readFileSync(route, {encoding: 'utf8'}).match(linksRegexr);

  return data.map((links) => {
    const hrefLinks = links.match(urlRegexr).join().slice(1, -1);
    const textLinks = links.match(textRegexr).join().slice(1, -1);

    const linkData = {
      href: hrefLinks, // href: URL found
      text: textLinks, // text inside the link
      file: convertToAbsolute(route),
      // file: path of the file where the link was found.
    };
    return linkData;
  });
};

const validateLink = (links = []) => {
  const allPromises = links.map((link) => {
    return axios.get(link.href).then((res) => {
      return {
        ...link,
        status: res.status,
        ok: res.statusText,
      };
    }).catch((e) => {
      return {
        ...link,
        status: e.status,
        ok: 'fail',
      };
    });
  });
  return Promise.all(allPromises);
};

module.exports = {
  isDirectory,
  isValidPath,
  isMdFile,
  getToFileLvl,
  readFile,
  convertToAbsolute,
  validateLink,
};
