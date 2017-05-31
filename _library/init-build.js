/* build folders from existing commands list */

const fs = require('fs-extra');
const download = require('download');
const commands = getCommands() ||
    [{gistID: '', src: '', name: '', description: '', link: '', icon: ''}];

console.info('Building ' + commands.length + ' commands:' + '\r\n');

let commandDirs = require('./commandDirectoriesList')();

commandDirs.forEach(dir => fs.removeSync('./' + dir));

commands.forEach(command => {

  const dir = slugify(command.name);

  if (!dir) return true;

  console.info('Building ' + command.name + '...');

  let path = './' + dir;

  fs.ensureDirSync(path);
  fs.emptyDirSync(path);

  download(command.src).
      then(data => { fs.outputFileSync(path + '/command.js', data); });

  if (command.icon)
    download(command.icon).
        then(data => { fs.outputFileSync(path + '/icon.png', data); });

  command.author = command.author || 'JoelBesada';

  delete command.gistID;
  delete command.src;
  delete command.icon;

  fs.writeFileSync(path + '/details.json', JSON.stringify(command, null, '\t'));

  console.info('Done with ' + command.name + '...' + '\r\n');

});

function getCommands() {

  return [
    {
      gistID: '8dde812886f949e241e0',
      src: 'https://gist.githubusercontent.com/JoelBesada/8dde812886f949e241e0/raw/d9ab52c2b310909d33f203177a937a7f42a9d0ec/command.js',
      name: 'Add to Backtick',
      description: 'Add the current command gist on GitHub to Backtick.',
      icon: 'https://backtickio.s3.amazonaws.com/icons/backtick.png',
      required: true,
    },
    {
      gistID: '7699000',
      src: 'https://gist.githubusercontent.com/BacktickIO/7699000/raw/5f34537a1718d0e6908d4547421f64971c782221/command.js',
      name: 'Amazon Wish List',
      description: 'Add item to your Amazon Wish List.',
      link: 'http://www.amazon.com',
      icon: 'https://backtickio.s3.amazonaws.com/icons/amazon.png',
    },
    {
      gistID: 'b11c2e97c442b1df2cef',
      src: 'https://gist.githubusercontent.com/BacktickIO/b11c2e97c442b1df2cef/raw/6236a61afd440bf7a3505199c7edfefc8ddbad67/command.js',
      name: 'Buffer Share',
      description: 'Add the current page to share on Buffer.',
      link: 'http://bufferapp.com',
      icon: 'https://s3.amazonaws.com/backtickio/icons/buffer.png',
    },
    {
      gistID: '7311982',
      src: 'https://gist.githubusercontent.com/BacktickIO/7311982/raw/2f73b06e20cfb16acf0ae6bb34f2c0d153bc4725/command.js',
      name: 'Bitly Bitmark',
      description: 'Create a bitly bitmark from the current page.',
      link: 'http://bit.ly',
      icon: 'https://backtickio.s3.amazonaws.com/icons/bitly.png',
    },
    {
      gistID: '592cd1e7139ba65b46d0',
      src: 'https://gist.githubusercontent.com/BacktickIO/592cd1e7139ba65b46d0/raw/6c905b9ddca4586c53f940696101b313c1e8cf7d/command.js',
      name: 'Facebook Share',
      description: 'Share the current page on Facebook.',
      link: 'https://www.facebook.com',
      icon: 'https://s3.amazonaws.com/backtickio/icons/facebook.png',
    },
    {
      gistID: '9c6c1137a973fa4313ba',
      src: 'https://gist.githubusercontent.com/BacktickIO/9c6c1137a973fa4313ba/raw/c0f65ca73266cf827081f9ea15de6a12d249a1c4/command.js',
      name: 'Google Cache',
      description: 'View a cached version of the current page.',
      link: 'https://www.google.com/',
      icon: 'https://backtickio.s3.amazonaws.com/icons/google.png',
    },
    {
      gistID: '7344153',
      src: 'https://gist.githubusercontent.com/BacktickIO/7344153/raw/307e1d62419b059aa238ecadecf8a832be8925a6/command.js',
      name: 'Google Site Search',
      description: 'Performs a Google site search on the current domain.',
      link: 'http://google.com',
      icon: 'https://backtickio.s3.amazonaws.com/icons/google.png',
    },
    {
      gistID: 'f620b12d12189d118172',
      src: 'https://gist.githubusercontent.com/BacktickIO/f620b12d12189d118172/raw/b66339c11893f6abf8c9300ff8c3b7b1b84af1c4/command.js',
      name: 'Google+ Share',
      description: 'Share the current page on Google+.',
      link: 'https://plus.google.com',
      icon: 'https://s3.amazonaws.com/backtickio/icons/googleplus.png',
    },
    {
      gistID: 'e04a72a8a0a278ad9461',
      src: 'https://gist.githubusercontent.com/BacktickIO/e04a72a8a0a278ad9461/raw/80d9ef5725165ef0933b269b94d5085996253913/command.js',
      name: 'Hacker News Submit',
      description: 'Submit the current page to Hacker News.',
      link: 'https://news.ycombinator.com/',
      icon: 'https://backtickio.s3.amazonaws.com/icons/ycombinator.png',
    },
    {
      gistID: '7f14f0119b48d777637a',
      src: 'https://gist.githubusercontent.com/BacktickIO/7f14f0119b48d777637a/raw/c39611be27eb8788852b90b27be03b3e0cab44fc/command.js',
      name: 'Instapaper Read Later',
      description: 'Save the page to be read later on Instapaper.',
      link: 'http://www.instapaper.com',
      icon: 'https://s3.amazonaws.com/backtickio/icons/instapaper.png',
    },
    {
      gistID: '7361458',
      src: 'https://gist.githubusercontent.com/BacktickIO/7361458/raw/1cf511675a8e222312fca55d2696f0a877ac5a14/command.js',
      name: 'Is it Down?',
      description: 'Check if the current page is down for everyone or just you.',
      link: 'http://www.downforeveryoneorjustme.com/',
    },
    {
      gistID: '3e50b60e77fb8283c00e',
      src: 'https://gist.githubusercontent.com/BacktickIO/3e50b60e77fb8283c00e/raw/e72093cdacb7623f96f017e32b11d47a88cd1370/command.js',
      name: 'Pinterest Share',
      description: 'Share the current page on Pinterest.',
      link: 'https://www.pinterest.com',
      icon: 'https://backtickio.s3.amazonaws.com/icons/pinterest.png',
    },
    {
      gistID: '7880974',
      src: 'https://gist.githubusercontent.com/JoelBesada/7880974/raw/7665cac6039b83822f2cc640282547bfc800f10e/command.js',
      name: 'Post to Tumblr',
      description: 'Post the content from the current page to your Tumblr blog.',
      link: 'http://tumblr.com',
      icon: 'https://backtickio.s3.amazonaws.com/icons/tumblr.png',
    },
    {
      gistID: '9685429b0bc17b9b2df0',
      src: 'https://gist.githubusercontent.com/BacktickIO/9685429b0bc17b9b2df0/raw/a88d2099be62a047fd7c22656d73c88274bb7373/command.js',
      name: 'Reddit Submit',
      description: 'Submit the current page to Reddit.',
      link: 'http://www.reddit.com/',
      icon: 'https://backtickio.s3.amazonaws.com/icons/reddit.png',
    },
    {
      gistID: 'afe55053252a2c0d9844',
      src: 'https://gist.githubusercontent.com/JoelBesada/afe55053252a2c0d9844/raw/37ac04e26cde024dda2d67438ea04ca4e3f17b13/command.js',
      name: 'Translate to English',
      description: 'Translate the current page to English with Google Translate.',
      link: 'http://translate.google.com/',
      icon: 'https://backtickio.s3.amazonaws.com/icons/translate.png',
    },
    {
      gistID: 'd81b6e4e00df66ab8fa3',
      src: 'https://gist.githubusercontent.com/BacktickIO/d81b6e4e00df66ab8fa3/raw/a75e0fc457f75ef03201e3a68540af8d92508ea2/command.js',
      name: 'Rulers & Guides',
      description: 'Add Photoshop-like rulers and guides to the current page.',
      link: 'http://mark-rolich.github.io/RulersGuides.js/',
    },
    {
      gistID: 'fa62f5134e94d32636e5',
      src: 'https://gist.githubusercontent.com/BacktickIO/fa62f5134e94d32636e5/raw/9622f5e6073fb4731e3bccc9211d4f6d5e914935/command.js',
      name: 'Twitter Share',
      description: 'Share the current page on Twitter.',
      link: 'https://twitter.com',
      icon: 'https://s3.amazonaws.com/backtickio/icons/twitter.png',
    },
    {
      gistID: 'ee98ca9dc1a9c6470822',
      src: 'https://gist.githubusercontent.com/iambriansreed/2e0b4a7bb8570964e4a7ba0b4fd96472/raw/14d02ae8f3faf3b33017e2a15a871c88f5f59619/command.js',
      name: 'WhatFont',
      author: 'iambriansreed',
      description: 'The easiest way to identify fonts on web pages.',
      link: 'http://chengyinliu.com/whatfont.html',
      icon: 'https://s3.amazonaws.com/backtickio/icons/whatfont.png',
    },
    {
      gistID: '7741276',
      src: 'https://gist.githubusercontent.com/JoelBesada/7741276/raw/3b60298029e6bd9e6d1440abef74f30058f1adc3/command.js',
      name: 'Whois Lookup',
      description: 'Open a whois lookup for the current page.',
      link: 'http://whois.domaintools.com',
    },
  ];

}

function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
}