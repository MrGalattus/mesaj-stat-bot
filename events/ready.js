const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const settings = require('../ayarlar.json');
var prefix = settings.prefix;
module.exports = (client) => {
    client.user.setStatus("online");
    client.user.setActivity("Burak denilen türeme",{ type: 3, browser: `Discord Android`});
  chalk.italic.yellow(+ client.user.presence.game )
console.log("Bdt<3İrem")
}
