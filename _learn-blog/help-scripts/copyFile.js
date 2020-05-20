var fs = require('fs');

function copyFile(src, dist) {
  fs.writeFileSync(dist, fs.readFileSync(src));
}

copyFile('./Readme.md', './source/_posts/Readme2.md');
