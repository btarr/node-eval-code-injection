// user readline to get user input
const readline = require('readline');

// read from stdin, write to stdout
const r = readline.createInterface({input: process.stdin, output: process.stdout});

// NEVER call this function it is DANGEROUS
// TODO: remove this dangerous function
function secretfunction() {
    console.log('How\'d you get in this function?')
}

const colorHexes = {
    red : '#FF0000',
    yellow : '#FFFF00',
    blue : '#0000FF',
    black : '#000000',
    white : '#FFFFFF',
    green : '#008000',
    purple : '#800080',
    orange: '#FFA500'
};

r.question('Enter a color in lowercase to get its hex value (e.x. blue): ', (statement) => {
    // parse the variables from the input statement

    // someone that doesn't know how to access an object property using a string value (e.g. colorHexes['blue']) might resort to this
    console.log(eval('colorHexes.' + statement));
    r.close();
});
