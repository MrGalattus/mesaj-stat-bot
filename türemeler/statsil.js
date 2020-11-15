const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => {
if(message.author.id !== "komutu kullanacak kişinin idsi") return message.channel.send("Senin bunu yapmaya yetkin yok.")

let kullanıcı = message.mentions.users.first() || message.member
if(!kullanıcı) message.channel.send("Bir kullanıcı belirt.")


  let miktar = Number(args[1])
if(!miktar) return message.channel.send("Kaç mesaj sayısı siliyorum?")


message.channel.send(' <@'+kullanıcı+'> adlı kişiden '+Number(args[1])+' roleplay kelime puanı silindi.')


  db.subtract(`burak_${message.guild.id}_${kullanıcı.id}`, miktar )
  
  
};

exports.conf = {
  altyapı:türeme,
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'rpsil',
  description: 'Kod denemek için kullanılır.',
  usage: 'küfür-engel'
};