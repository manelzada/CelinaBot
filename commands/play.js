const discord = require('discord.js');
const ytdl = require('ytdl-core');

const canais = {
  'canal': {
    connection: null,
    dispatcher: null,
    fila: [],
    isTocando: false
  }
}

const queue = () => {
  if (canais.canal.isTocando === false) {
    const tocando = canais.canal.fila[0];
    canais.canal.isTocando = true;
    canais.canal.dispatcher = canais.canal.connection.play(ytdl(tocando, { filter: "audioonly" }));

    canais.canal.dispatcher.on('finish', () => {
      canais.canal.fila.shift();
      canais.canal.isTocando = false;
      if (canais.canal.fila.length > 0) {
        console.log("veio até aqui 2");
        queue();
      } else {
        canais.canal.dispatcher = null;
        console.log("Acabou");
      }
    });
  }
}

module.exports = async function mainFunction(client, msg, args) {
  let channel = msg.channel;
  // -------------------- Join

  if (msg.member.voice.channel) {
    try {
      canais.canal.connection = await msg.member.voice.channel.join();
    } catch (err) {
      console.log(err);
      try {
        canais.canal.connection.disconnect();
        msg.reply("Não consegui me conectar :(...");
      } catch (err) {
        console.log(err);
      };
    };
  } else {
    msg.reply('Você precisa estar em um canal de voz!!');
  } // Fim Join


  if (args.length < 2) {
    msg.reply("Modo de uso: c!play <link>");
    return;
  };

  // -------------------- Play
  canais.canal.fila.push(args[1]);
  console.log(`Adicionado: ${args[1]}`);
  msg.reply(" 🎵  Adicionada"); // Fim Play
  console.log(canais.canal.fila);
  queue();
};