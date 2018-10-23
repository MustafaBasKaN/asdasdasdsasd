const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = class İstatsitikCommand extends Command {
    constructor(client){

        super(client, {
            name: 'istatistik',
            aliases: ['i' , 'botdurum'],
            group: 'util',
            memberName: 'istatistik',
            description: 'Bot istatistiğini görüntülerr',

        })
    }


    run(msg, args) {
  const duration = moment.duration(this.client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  const embed = new Discord.RichEmbed()
  .setColor(0x36393e)
  .setAuthor(this.client.user.username , this.client.user.avatarURL)
  .addField('Bellek Kullanımı' , `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB` , true)
  .addField('Sunucular' , `${this.client.guilds.size.toLocaleString()}` , true)
  .addField('Kanallar' , `${this.client.channels.size.toLocaleString()}` , true)
  .addField('Kullanıcılar' , `${this.client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}` , true)
  .addField('DiscordJS Sürümü' , `v${Discord.version}` , true)
  .addField('NodeJS Sürümü', `${process.version}` , true)
  .addField('Çalışma süresi', `${duration}` , true)
  return msg.channel.sendEmbed(embed);
    }
}
