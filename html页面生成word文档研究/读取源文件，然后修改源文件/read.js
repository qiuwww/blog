
const fs = require('fs');


fs.readFile('./1.doc', function (err, buffer) {
  if (err) throw err;
  console.log(buffer)
});

var text = fs.readFileSync('./1.doc', 'utf8');

// 将文件按行拆成数组
// text.split(/\r?\n/).forEach(function (line) {
//   console.log(line)
// });
// console.log(text)

fs.writeFile('message.js', text, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});