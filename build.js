/* builds the json file for use in the extension options */

const cdcm = require('/Users/iambriansreed/cdcm');
const fs = require('fs-extra');

let config = {
  localPath: './.tmp',
  cdnUrl: 'https://raw.githubusercontent.com/backtickbacktick/Library/master',
  linkFileExt: ['.js'],
};

let commandDirs = getDirectories('./').filter(dir => dir !== 'node_modules');

fs.ensureDirSync('./.tmp/commands');
fs.emptyDirSync('./.tmp/commands');

commandDirs.forEach(dir => {
  fs.copySync('./' + dir, './.tmp/commands/' + dir);
});

cdcm(config).getData().then(data => {

  let output = {};

  data.forEach(kind => {
    output[kind.type] = kind.items;
  });

  fs.writeJsonSync('./commands.json', output.commands);

  fs.removeSync('./.tmp');
  fs.removeSync('./.tmp-cdcm');
});

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).
      filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory());
}