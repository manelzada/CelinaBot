const Discord = require('discord.js')

module.exports = function (client, msg, args) {
  msg.channel.send(`<@${msg.author.id}>`);
  msg.reply("**COMANDOS** \nc!teste\nc!help\nc!play");
}