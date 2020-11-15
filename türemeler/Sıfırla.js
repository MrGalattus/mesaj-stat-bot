const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => {
  
  
    if(message.author.id != "işlemi yapabilecek kişinin idsi") return message.reply('Sen bu kodu kullanamazsın.')

    let sıralama = message.guild.members.cache.filter(a => a.user.bot == false).array().sort((a , b) => {return db.fetch(`burak_${message.guild.id}_${b.user.id}`) - db.fetch(`burak_${message.guild.id}_${a.user.id}`) })
    for(let i = 0 ; i < sıralama.length ; i++){
        if(db.fetch(`burak_${message.guild.id}_${sıralama[i].id}`) != null){
        await db.delete(`burak_${message.guild.id}_${sıralama[i].id}`)
        }
    }

    const embed = new Discord.MessageEmbed()
    .setDescription(`Puanlar sıfırlandı.`)
    .setColor('blue')

    message.channel.send(embed)



}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sıfırla","temizle"],
    permLevel: 0
};

exports.help = {
    name: 'sıfırla',
    description: '',
    usage: ''
}
