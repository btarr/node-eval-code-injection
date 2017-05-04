default:
	@echo 'get the hex value for blue'
	@echo 'blue' | node getHexValue.js
	@echo
	@echo 'exploit the program and call a secret function'
	@echo 'green; secret()' | node getHexValue.js

bigfile:
	@echo 'exploit program to create 1MB file'
	@echo 'purple; var fs=require("fs"),stream=fs.createWriteStream("bigFile.txt",{flags:"w"});const megabyte="1000000",outputStr="thisisabigfile";for(var i=0;i<megabyte/outputStr.length;i++)stream.write("thisisabigfile");' | node getHexValue.js
