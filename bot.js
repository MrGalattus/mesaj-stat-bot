const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const db = require('quick.db');
require('./util/eventLoader.js')(client);

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./türemeler/${command}`)];
      let cmd = require(`./türemeler/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./türemeler/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./türemeler/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./türemeler/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./türemeler/${command}`)];
      let cmd = require(`./türemeler/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

var prefix = ayarlar.prefix;

client.on('message' , async(message) =>{
  if(message.author.bot) return;
  let kanallar = ["kanal.id","kanal.id"] //her kanal ekleyeceğinde virgül çek, tırnak aç kanal idyi yaz.
 
  if(!kanallar.includes(message.channel.id)){
      
  } else {
      let sayı = message.content.split(" ").length
  db.add(`burak_${message.guild.id}_${message.author.id}` ,sayı)
  }
})

client.on('messageDelete' , async(message) =>{
  if(message.author.bot) return;
  let user = message.author
  let kanallar = ["kanal.id","kanal.id"] //her kanal ekleyeceğinde virgül çek, tırnak aç kanal idyi yaz.
  
if(!kanallar.includes(message.channel.id)){
  
}else{
  if(await db.fetch(`burak_${message.guild.id}_${message.author.id}`) < message.content.split(" ").length){

  } else {
    db.add(`burak_${message.guild.id}_${message.author.id}` , - message.content.split(" ").length)
  }
}
})
client.on('messageUpdate' , async(message1 , message2) =>{
if(message1.author.bot) return
if(message2.author.bot) return;

let kanallar = ["kanal.id","kanal.id"] //her kanal ekleyeceğinde virgül çek, tırnak aç kanal idyi yaz.

if(!kanallar.includes(message1.channel.id)){
  
}else{
    db.add(`burak_${message1.guild.id}_${message1.author.id}` , -message1.content.split(" ").length)
    db.add(`burak_${message1.guild.id}_${message1.author.id}` , +message2.content.split(" ").length)

  }
})
 
  client.on("message", async message => {

if(message.author.bot) return;
let kanallar = ["kanal.id","kanal.id"]//her kanal ekleyeceğinde virgül çek, tırnak aç kanal idyi yaz.
if(!kanallar.includes(message.channel.id)){
} else {
db.set(`denilen_${message.author}`, message.channel.id)

}
})  

  
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip || message.author.id === ayarlar.moderator ) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

  client.login(ayarlar.token);
