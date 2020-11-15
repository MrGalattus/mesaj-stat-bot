const Discord = require('discord.js');
const db = require('quick.db')
const client = new Discord.Client();

exports.run = async(client, message, args) => {
  if(message.author.id !== "liste sayı eklemek için kullanacak kişinin idsi") return message.channel.send("Senin bunu yapmaya yetkin yok.")

let kullanıcı = message.mentions.users.first() || message.member
if(!kullanıcı) message.channel.send("Bir kullanıcı belirt.")


  let burak = Number(args[1]);
if(!burak) return message.channel.send("Kaç mesaj ekliyorum?")


message.channel.send(' <@'+kullanıcı+'> adlı kişiye '+Number(args[1])+' mesaj eklendi eklendi.')


  db.add(`burak_${message.guild.id}_${kullanıcı.id}`, burak )
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["puanekle","mesajekle","ekle"],
  permLevel: 0
};

exports.help = {
  name: 'rpekle',
  description: 'Listede gözüken mesaj sayını eklemek için.',
  usage: 'Burak Denilen Türeme'
};
