const {
  convertToAbsolute,
  isDirectory,
  isValidPath,
  isMdFile,
} = require('../../src/util.js');

describe('convertToAbsolute', () => {
  const path1 = '../LIM017-social-network/README.md';
  const path2 =
    '/home/ozzy/Desktop/Laboratoria/LIM017-social-network/README.md';

  it('Should convert a relative path to absolute', () => {
    expect(convertToAbsolute(path1)).toBe(path2);
  });

  it('Should return an absolute path', () => {
    expect(convertToAbsolute(path2)).toBe(path2);
  });
});

describe('isDirectory', () => {
  const directoryPath = '/home/ozzy/Documents/kitten-directory';
  const notADirectory = '/home/ozzy/Documents/cat.jpeg';

  it('Should return true if the path is a directory', () => {
    expect(isDirectory(directoryPath)).toBe(true);
  });

  it('Should return false if the path is not a directory', () => {
    expect(isDirectory(notADirectory)).toBe(false);
  });
});

describe('isValidPath', () => {
  const path = '/home/ozzy/Desktop/cats-are-awesome.md';

  it('Should return true if the path is valid', () => {
    expect(isValidPath(path)).toBe(true);
  });

  it('Should return false if the path is not valid', () => {
    expect(isValidPath('/cats-are-dumb')).toBe(false);
  });
});

describe('IsMdFile', () => {
  const firstFile = '/home/ozzy/Documents/kitten-directory/cats-are-better.md';
  const secondFile =
  '/home/ozzy/Documents/kitten-directory/dogs-are-better.txt';

  it('Should return true if the file ext is .md', () => {
    expect(isMdFile(firstFile)).toBe(true);
  });

  it('Should return false if the file ext is not .md', () => {
    expect(isMdFile(secondFile)).toBe(false);
  });
});

