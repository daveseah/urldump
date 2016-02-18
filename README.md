# URLDUMP

This is a utility that will scan a directory full of .url (Windows) and .webloc (MacOS) shortcut files and produce a formatted listing. I have a folder full of these that I'd like to eventually scan for patterns in my interests.

The utility is written as a NodeJS program. I followed a tutorial online to set it up. The steps are:

1. Create an empty repo on github and clone it to a development directory on your local dev machine.
2. Decide what to call your command; this will determine how you enter in the information for the next step!
3. Issue an `npm init` to create a `package.json` file with all the metadata. 
4. Add a `bin` field to the `package.json` file as a key-value object of "command" keys to "javascript file". Like `"bin":{ "urldump":"urldump.js" }`
5. Create the runfile associated with the entries in the `bin` key you just added. Add  `#!/usr/bin./env node` at the top and do normal NodeJS javascript
6. Test it by executing `node urldump.js`
7. Make it global by executing `npm link`

Tada! That's where I am right now.