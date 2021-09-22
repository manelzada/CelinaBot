const discord = require('discord.js');
const conn = require('./conn.var.js');
const ytdl = require('ytdl-core');
const dispatcher = require('./dispatcher.var.js');

module.exports = async function mainFunction(client, msg, args) {
  let channel = msg.channel;

  if (msg.member.voice.channel) {
    try {
      conn.conn = await msg.member.voice.channel.join();
    } catch (err) {
      console.log(err);
      try {
        conn.conn.disconnect();
        msg.reply("Não consegui me conectar :(...");
      } catch { };
    };
  } else {
    msg.reply('Você precisa estar em um canal de voz!!');
  }

  if (args.length < 2) { msg.reply("Modo de uso: c!play <link>"); return; };

  try {
    dispatcher.dis = conn.conn.play(ytdl(args[1] ? args[1] : args[2], { filter: "audioonly" }));
    msg.reply("Tocando...")
  } catch (err) {
    msg.reply("Não consegui tocar a música, verifique se eu estou num canal de voz.");
    console.log(err);
  };
};