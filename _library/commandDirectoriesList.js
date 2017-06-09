// commandDirectoriesList.js - gets all command directories
const fs = require('fs-extra');
const path = require('path');

module.exports = function getCommandDirectories() {

    let exclude_directories = Array.from(arguments);

    exclude_directories.push('node_modules');

    const srcpath = './';
    return fs.readdirSync(srcpath)
        .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
        .filter(dir => !exclude_directories.includes(dir) && dir[0] !== '.' && dir[0] !== '_');
};
