# URLDUMP

This is a utility that will scan a directory full of .url (Windows) and .webloc (MacOS) shortcut files and produce a Markdown-formatted listing. I have a folder full of these that I'd like to scan and organize.

The utility is written as a NodeJS program on OS X El Capitan. It may work on Windows systems with NodeJS installed.

## Installing

If you don't have Node, install it. Then clone this repo.
```
> cd urldump
> npm install
> npm link
```
The last command will install urldump as a global command. If you need to delete it and `npm unlink` fails, go to `usr/local/bin/` and delete the `urldump@` symlink there.

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
