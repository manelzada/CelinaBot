const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
require("dotenv").config();

bot.on("ready", () => {
  console.log('O bot está funcionando!');
  bot.user.setPresence({ activities: [{ name: "github.com/manelzada", type: "PLAYING" }] })
});

bot.on("message", msg => {
  if (msg.author.bot === true) { return }
  else if (!msg.content.startsWith(config.prefix)) { return };

  try {
    let args = msg.content.split(" ");
    let command = msg.content.includes(" ") ? msg.content.split(" ")[0] : msg.content;
    command = command.substring(config.prefix.length, command.length);

    let commandFuncion = require(`./commands/${command}.js`);
    commandFuncion(bot, msg, args);
  } catch (err) {
    msg.reply(`Comando não encontrado *c!help*`);
    console.log(err);
  }
})
bot.login(process.env.TOKEN);
