var readline = require('readline');

process.stdin.resume();

var r = readline.createInterface(process.stdin, process.stdout, null);

var colorHexes = {
    red: '#FF0000',
    yellow: '#FFFF00',
    blue: '#0000FF',
    black: '#000000',
    white: '#FFFFFF',
    green: '#008000',
    purple: '#800080',
    orange: '#FFA500'
};

r.question('Enter a color in lowercase to get its hex value (e.x. blue): ', function (statement) {
    statement = statement.toLowerCase();
    if (statement && colorHexes[statement]) {
      console.log(colorHexes[statement]);
    } else {
      console.log('Can\'t find that color in the system, try Googling it!')
    }
    process.stdin.pause();
});
