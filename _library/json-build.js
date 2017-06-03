/* builds the json file for use in the extension options */

const cdcm = require('/Users/iambriansreed/cdcm');
const fs = require('fs-extra');
const path = require('path');

let config = {
    localPath: './.tmp',
    cdnUrl: 'https://backtickbacktick.github.io/library',
    linkFileExt: ['.js']
};

console.log('JSON building...');

let commandDirs = require('./commandDirectoriesList')();

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

    fs.writeFileSync('./commands.json',
        JSON.stringify(output.commands, null, '\t').replace(/commands\//g, ''));

    fs.removeSync('./.tmp');
    fs.removeSync('./.tmp-cdcm');

    console.log('JSON built.');

});