
![md-links](https://raw.githubusercontent.com/minifemtovalen/LIM017-md-links/dev/assets/logo.svg)

**md-links** is a  library that loops through markdown files to check the links they contain.

## Getting Started

`npm i md-links-minifemto --global`

### Usage:

You will be able to enter the following options:

**--validate option**

`md-links path --validate`

It will return as follows:

- href: URL found.
- text: Text that appeared inside the link (<a>).
- file: Path of the file where the link was found.
- status: HTTP response code.
- ok: 'fail' in case of failure or 'ok' in case of success.

**--stats**

`md-links path --stats`

Output:

- Total: *total links*
- Unique: *unique links*

**--validate --stats**

`md-links path --validate --stats` or `md-links path --stats --validate`
Output:

- Total: *total links*
- Unique: *unique links*
- Broken: *broken links*

**No options selected**

It will return
- href: URL found.
- text: Text that appeared inside the link (<a>).
- file: Path of the file where the link was found.

**Always enter the path** (otherwise it will throw an error)

