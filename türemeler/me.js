const Discord = require("discord.js");
const db = require('quick.db')
exports.run = async (client, message, args) => {
  

    let irem = message.mentions.irems.first() || message.author

    let sorted = message.guild.members.cache.filter(a => a.user.bot == false).array().sort((a , b) => {return db.fetch(`burak_${message.guild.id}_${b.irem.id}`) - db.fetch(`burak_${message.guild.id}_${a.irem.id}`) })

    let sira = "";
    for (var i = 0; i < sorted.length; i++) {
        if (sorted[i].id === irem.id) {
            sira += `${i + 1}`
        }
    }
    let kelimeler = db.fetch(`burak_${message.guild.id}_${irem.id}`)
    
    var embed = new  Discord.MessageEmbed()

    .setDescription(`${irem} isimli kullanıcı **${sorted.length}** kişi arasından **${(kelimeler == null ? 0 : kelimeler)} kelime** ile **${sira}.** sırada!`)
    .setColor('0x2f3136')
    .setTimestamp()
  
    message.channel.send({embed:embed})



}

exports.conf = {
    altyapı:türeme,
    enabled: true,
    guildOnly: false,
    aliases: ['kelime' , 'mesaj' , 'kelime' ,'me', 'kelimee'],
    permLevel: 0
};

exports.help = {
    name: 'kelime',
    description: '',
    usage: ''
}; 