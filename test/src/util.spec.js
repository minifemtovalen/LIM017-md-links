const {convertToAbsolute} = require('../../src/util.js');

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


