const colors = require('colors');
const fs = require('fs-extra');
const slugify = require('../_library/slugify');

console.log('Confirming all commands have required data.');

let commandDirs = require('./commandDirectoriesList')() || [];

let allCommands = [];

commandDirs.forEach(dir => {

    let path = './' + dir;

    const details = fs.existsSync(path + '/details.json') ? fs.readJsonSync(
        path + '/details.json') : { name: '', description: '', author: '', link: '', slug: '' };

    let hasCommand = fs.existsSync(path + '/command.js');

    let validations = {
        hasValidSlug: [true, details.slug && details.slug.trim().length && details.slug === slugify(details.slug)],
        hasAuthor: [false, details.author && details.author.trim().length],
        hasLink: [false, details.link && details.link.trim().length],
        hasCommand: [true, hasCommand],
        hasSecureCommand: [true, fs.readFileSync(path + '/command.js', 'utf8').indexOf('http:') === -1],
        hasName: [true, details.name && details.name.trim().length],
        hasDescription: [
            true,
            details.description && details.description.trim().length],
        hasIcon: [false, fs.existsSync(path + '/icon.png')]
    };

    let name = (details.name || dir);

    console.log(name.bold.blue);

    let valid = true, required, exists;
    Object.keys(validations).forEach(key => {
        [required, exists] = validations[key];

        console.log('    ' + key.replace('has', '') + ' ' +
            (exists ? '✔' : '✘')[exists ? 'green' : (required ? 'red' : 'gray')]);
        valid = valid && (exists || !required);
    });

    console.log('  ' + (name + ' is ' + (!valid ? 'in' : '') + 'valid')[valid
            ? 'green' : 'red']);

    console.log('');

    allCommands.push({ name, valid });

});

console.log((allCommands.filter(command => command.valid).length +
' valid commands').green);

console.log('');

console.log((allCommands.filter(command => !command.valid).length +
' invalid commands').red.bold);
console.log(
    (allCommands.filter(command => !command.valid).map(command => ' ' + command.name).join('\n')).red);