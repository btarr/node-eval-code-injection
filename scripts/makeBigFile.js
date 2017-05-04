//makes a 1MB file
var fs = require('fs');
var stream = fs.createWriteStream('bigFile.txt', { flags : 'w' });

//size of megabyte in bytes
const megabyte = '1000000'

const outputStr = 'thisisabigfile';

for (var i = 0; i < megabyte/outputStr.length; i++) {
  stream.write('thisisabigfile');
}
