// user readline to get user input
var readline = require('readline');

process.stdin.resume();

// read from stdin, write to stdout
var r = readline.createInterface(process.stdin, process.stdout, null);

// NEVER call this function it is DANGEROUS
// TODO: remove this dangerous function
function secret() {
    console.log('How\'d you get in this function?');
}

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
    // parse the variables from the input statement

    // someone that doesn't know how to access an object property using a string value (e.g. colorHexes['blue']) might resort to this
    console.log(eval('colorHexes.' + statement));
    process.stdin.pause();
});
