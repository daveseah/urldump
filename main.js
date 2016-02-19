#!/usr/bin/env node

var path = require('path');
var pkg = require(path.join(__dirname,'package.json'));
var program = require ('commander');

program
	.version(pkg.version)
	.usage('usage');

program
	.arguments('<dir>')
	.action(function( dir ) {
		console.log('directory',dir);
	});

// execute the parser
program.parse(process.argv);
