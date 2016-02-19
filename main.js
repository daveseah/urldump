#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var pkg = require(path.join(__dirname,'package.json'));
var program = require ('commander');
var xml2js = require('xml2js');
var util = require('util');
var ini = require('ini');


/// DECLARATIONS //////////////////////////////////////////////////////////////

var wd 			= process.cwd();	// working directory default
var SP 			= '   ';
var num_webloc 	= 0;
var num_url 	= 0;


/// EXECUTION /////////////////////////////////////////////////////////////////

program
	.version(pkg.version)
	.usage('[<dir>]')
	.description('Scan the specified or current directory for .webloc and .url files, extract title and url, and emit a list.');

program
	.arguments('<dir>')
	.action(function( dir ) {
		wd = path.resolve(dir);	// note resolve already checks for cwd
	});

// execute the parser
program.parse(process.argv);

// read files non-recursively from working directory wd
fs.readdir( wd, function( err,files ) {
	if (err) throw new Error(err);
	console.log('Reading',files.length,'files...');
	files.forEach(function(name){
		var filePath = path.join(wd,name);
		var stats = fs.statSync(filePath);
		if (stats.isFile()) ProcessFile(filePath, stats);
	});
	console.log('Found',num_webloc,'.webloc files and',num_url,'.url files');
});


/// SUPPORT FUNCTIONS /////////////////////////////////////////////////////////
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ given a valid filePath, determine if it's a file to parse of one of two
	XML types based on extension
/*/	function ProcessFile ( filePath, stats ) {
		switch (path.extname( filePath )) {
			case '.webloc': 	ParseDotWebloc( filePath, stats );
								break;
			case '.url': 		ParseDotUrl( filePath, stats );
								break;
			default: 			return;
		}
	}
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/	Parse XML file in Webloc Format
/*/	function ParseDotWebloc ( filePath, stats ) {
		var parser = new xml2js.Parser();
		var data = fs.readFileSync(filePath,'utf8');
		parser.parseString( data, function( err, result ) {
			if (err) {
				console.log(filePath,'error',err);
				return;
			} 
			var url = result.plist.dict[0].string[0];
			var birth = stats.birthtime;
			var mm = ("0"+(birth.getMonth()+1)).slice(-2);
			var dd = ("0"+birth.getDate()).slice(-2);
			var yyyy = birth.getFullYear();
			var date = yyyy+'/'+mm+'/'+dd;
			var out = '* '+date+' ['+path.basename(filePath,'.webloc')+']('+url+')';
			console.log(out);
		});
		num_webloc++;
	}
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/	Parse XML file in URL format
/*/	function ParseDotUrl ( filePath, stats ) {
		var result = ini.parse(fs.readFileSync(filePath,'utf-8'));
		var url = result.InternetShortcut.URL;
		var birth = stats.birthtime;
		var mm = ("0"+(birth.getMonth()+1)).slice(-2);
		var dd = ("0"+birth.getDate()).slice(-2);
		var yyyy = birth.getFullYear();
		var date = yyyy+'/'+mm+'/'+dd;
		var out = '* '+date+' ['+path.basename(filePath,'.url')+']('+url+')';
		console.log(out);
		num_url++;
	}
