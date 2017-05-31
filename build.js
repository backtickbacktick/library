/* builds the json file for use in the extension options */

const cdcm = require('/Users/iambriansreed/cdcm');
const fs = require('fs-extra');

let config = {
  localPath: './.tmp',
  cdnUrl: 'https://raw.githubusercontent.com/backtickbacktick/Library/master',
  linkFileExt: ['.js'],
};

fs.copySync('./commands', './.tmp/commands');

cdcm(config).getData().then(data => {

  let output = {};

  data.forEach(kind => {
    output[kind.type] = kind.items;
  });

  fs.writeJsonSync('./commands.json', output.commands);

  fs.removeSync('./.tmp');
  fs.removeSync('./.tmp-cdcm');
});