# URLDUMP

This is a utility that scans a directory for .url (Windows) and .webloc (MacOS) shortcut files and produce a Markdown-formatted listing. I have a folder full of these that I'd like to scan and organize.

The utility is written as a NodeJS utility that installs to your command path via NPM.

## Installing

If you don't have Node, install it. Then clone this repo. Issue the following commands. 
```
> cd urldump
> npm install
> npm link
```
The `npm link` command installs urldump as a global command. (Mac) If you need to delete it and `npm unlink` fails, go to `usr/local/bin/` and delete the `urldump@` symlink there.

## Using

This is a pretty basic command.
```
> urldump             # scans current directory for webloc and url
> urldump <dir>       # scans for subpath in current directory
> urldump /full/path  # scan the specified full path
```
Formatted text is output to the console, so to capture it to a file do something like this:
```
> urldump > index.md
```
The formatting is as a bulleted list:

`* 2013/11/03 [Name of Shortcut File](http://url-to-destination)`

That's all it does! It's pretty straightforward.
