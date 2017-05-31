// commandDirectoriesList.js - gets all command directories
const fs = require('fs-extra');
const path = require('path');

module.exports = function getCommandDirectories() {
  const srcpath = './';
  return fs.readdirSync(srcpath).
      filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory()).
      filter(dir => dir !== 'node_modules' && dir[0] !== '.' && dir[0] !== '_');
};
