const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const { RichEmbed } = require('discord.js');

module.exports = class SupportCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'canlı-destek',
      aliases: ['destek-hattı','destekhattı','canlıdestek'],
      group: 'kullanıcı',
      memberName: 'canlı-destek',
      description: 'The Difference Destek Ekibi ile görüşmeye bağlanırsınız.',
      details: oneLine `
               Azrael Bot ile ilgili yardıma ihtiyacınız var mı?
               Geliştiricilerle iletişime geçmek ve ihtiyacınız olan yardımı almak için bu komutu kullanın!
			`,
      examples: ['canlı-destek'],
      guildOnly: true,
      guarded: true
    })
  }

  async run(message) {
    
      //emojiler

  var yetkili = this.client.emojis.get("493526277425201182")
  var sunucu = this.client.emojis.get("493419202070183936")
  var kanal = this.client.emojis.get("493419203676864522")
  var kisi = this.client.emojis.get("493419202871427092")
  var destekisteyen = this.client.emojis.get("493419208617623553")
  var reddedildi = this.client.emojis.get("493419211142725642")
  var arama = this.client.emojis.get("493419204553474049")
  var asim = this.client.emojis.get("493506082883239966")
  var k = this.client.emojis.get("493419209842229253")
  var duyuru = this.client.emojis.get("493419210769301504")
  //emojiler
  
    let davet;
        if (message.channel.permissionsFor(this.client.user).has("CREATE_INSTANT_INVITE")) {
            await message.channel.createInvite({temporary: false, maxAge: 0, maxUses: 0, unique: false}).then(i => { davet = i.url });
        } else davet = 'Davet linkini almak için yeterli yetkim yok.';
    let isEnabled
        const client = this.client
    message.reply(`Canlı destek bildirimi gönderdiğiniz için teşekkürler. Difference Destek Ekibi yakında sizinle iletişime geçecektir.`)
    let chan = message.channel
    let supportChan = '498202115509059584'
    const embed = new RichEmbed()
      .setTitle(`Yeni Destek Çağrısı!`)
      .setColor("RANDOM")
      .addField(`${sunucu} Sunucu Adı`, message.guild.name)
      .addField(`${sunucu} Sunucu ID`, message.guild.id)
      .addField(`${kanal} Kanal Adı`, "#"+message.channel.name)
      .addField(`${kanal} Kanal ID`, message.channel.id)
      .addField(`${destekisteyen} Destek İsteyen Kullanıcı`, `${message.author.tag} (${message.author.id})`)
      .addField(`${sunucu} Sunucu Davet Linki`, davet)
      .setFooter(this.client.user.username + 'The Difference | Canlı Destek Sistemi')
		client.channels.get(supportChan).send('<@282144942619492352> <@388928046649966592>')
		client.channels.get(supportChan).send({ embed })
    const collector = this.client.channels.get(supportChan).createCollector(message => message.content.startsWith(''), {
      time: 0
    })
    this.client.channels.get(supportChan).send('Destek çağrısına bağlanmak için `katıl` yazınız.')
    collector.on('message', (message) => {
      if (message.content === 'kapat') collector.stop('aborted')
      if (message.content === 'katıl') collector.stop('success')
    })
    collector.on('end', (collected, reason) => {
      if (reason === 'time') return message.reply(`${asim}Çağrı zaman aşımına uğradı.`)
      if (reason === 'aborted') {
        message.reply(`${reddedildi} Çağrı reddedildi.`)
        this.client.channels.get(supportChan).send(`${reddedildi}Başarıyla çağrı reddedildi.`)
      }
      if (reason === 'success') {
        this.client.channels.get(supportChan).send(`${arama}Destek çağrısı alındı!`)
        //eslint-disable-next-line no-useless-escape
        this.client.channels.get(supportChan).send(`${k} Destek çağrısını kapatmak için kapat yazınız.`)
        chan.send(`${message.author}`)
        chan.send(`${arama}Çağrınız bir destek yetkilisi tarafından alındı!`)
        chan.send(`${asim}En kısa zamanda size yardımcı olacaklar.`)
        //eslint-disable-next-line no-useless-escape
        chan.send(`${k} Destek çağrısını kapatmak için kapat yazınız.`)
        isEnabled = true
        this.client.on('message', message => {
          function contact() {
            if (isEnabled === false) return
            if (message.author.id === client.user.id) return
            if (message.content.startsWith('kapat')) {
              message.channel.send(`${reddedildi}Çağrı kapatıldı.`)
              if (message.channel.id === chan.id) client.channels.get(supportChan).send(`${reddedildi} Çağrı diğer taraftan kapatıldı!`)
              if (message.channel.id === supportChan) chan.send(`${reddedildi} Çağrı diğer taraftan kapatıldı!`)

              return isEnabled = false
            }
            if (message.channel.id === chan.id) client.channels.get(supportChan).send(`${kisi} **(Kullanıcı) ${message.author.tag}:** ${message.content}`)
            if (message.channel.id === supportChan) chan.send(`${yetkili} **(Yetkili) ${message.author.tag}:** ${message.content}`)
          }
          contact(client)
        })
      }
    })
  }
};