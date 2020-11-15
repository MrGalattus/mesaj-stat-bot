const Discord = require("discord.js");
const client  = new Discord.Client();
const db = require('quick.db');
const Canvas = require('canvas');

module.exports.run = async (client, message, args) => {
///Değiştirilebilecek kısımlar/// (Madde5 : fotoğrafın üzerinde yazacak isimdir     bdt: Fotoğrafın arka plan resmi)
var madde5a = "Burak Denilen türeme(Burayı değiştirmek için rplist dosyasına giriniz ve bu mesajı değiştiriniz)"
let bdt = "https://st3.depositphotos.com/1000393/37488/i/600/depositphotos_374889738-stock-photo-minimalistic-geometric-black-background-low.jpg"
////////////////////////////////////
    let sıralama = message.guild.members.cache.filter(a => a.user.bot == false).array().sort((a , b) => {return db.fetch(`burak_${message.guild.id}_${b.user.id}`) - db.fetch(`burak_${message.guild.id}_${a.user.id}`) })
    let sırala= ""
    for (let i = 0 ; i < 10 ; i++){
        if(db.fetch(`burak_${message.guild.id}_${sıralama[i].id}`) != null && db.fetch(`burak_${message.guild.id}_${sıralama[i].id}`) != 0){
            sırala+= `[${i+1}]: <@`+sıralama[i]+`>` + ' | ' + db.fetch(`burak_${message.guild.id}_${sıralama[i].id}`) + " kelime\n"
        }
    }
    const canvas = Canvas.createCanvas(1000, 600);
    const ctx = canvas.getContext("2d");
   let iş = sırala == "" ? "Kimse mesaj atmamış." : sırala
    const background = await Canvas.loadImage(bdt);
    ctx.drawImage(background, 0, 0,canvas.width, canvas.height);
   
    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "WHITE";
    var yardımb = 40;

    
    var madde6a = iş
    

    do {
        ctx.font = `${yardımb -= 5}px sans-serif`; 
      } while (ctx.measureText(madde5a).width > canvas.width - 225);
      ctx.fillText(madde5a, 10 ,80);
 
    do {
        ctx.font = `${yardımb -= 5}px sans-serif`; 
      } while (ctx.measureText(madde6a).width > canvas.width - 225);
      ctx.fillText(madde6a, 10 ,200);
 
  ctx.beginPath();
  ctx.arc(100, 100 , 0, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  const avatar = await Canvas.loadImage(message.guild.iconURL({format: "jpg"}));
  ctx.drawImage(avatar,105, 155, 105, 35);
  const final = new Discord.MessageAttachment(canvas.toBuffer(), "userinfo.png");

  return message.channel.send(final)
  };



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["stat" , "stats" , "liste" , "top" , "kelimeler" , "üyesıralaması"],
    permLevel: 0
};

exports.help = {
    name: 'sıralama',
    description: 'Mesaj atanlar arasındaki sıralamayı gösterir',
    usage: ''
}; 
