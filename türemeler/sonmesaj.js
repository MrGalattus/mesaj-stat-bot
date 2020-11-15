const Discord = require('discord.js');
const db = require('quick.db');
 
exports.run =  async function(client , message , args) {
  let kanaletiket = await db.fetch(`denilen_${message.author.id}`)
  if(!kanaletiket) {
 message.reply('Bu sunucuda daha önce bir mesaj atmamışsınız.')
  } else {
      message.reply("en son <#"+ kanaletiket+ "> adlı kanala mesaj atmışsınız.")
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["nerede" ,"enson","devam","sohbet"],
  permLevel: 0
};

exports.help = {
  altyapı:türeme,
  name: 'konum',
  description: 'En son hangi kanalda mesaj atıldıysa.',
  usage: ''
};
