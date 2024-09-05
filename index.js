const { Client, ButtonBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, EmbedBuilder, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./setting/config.js");
const db = require('croxydb');

const client = new Client({
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember],
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent],
});

module.exports = client;

require("./events/message.js");
require("./events/ready.js");

client.login(config.token || process.env.TOKEN).catch(e => {
  console.log("Bot tokeniniz hatalı veya botunuzun INTENT ayarları kapalı olabilir.");
});

const soru = require("./setting/sorular.js");

client.on("interactionCreate", async (i) => {
  const modal = new ModalBuilder()
    .setCustomId('ybasvuru')
    .setTitle('Yetkili Başvuru')
    .addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId("soru1")
          .setLabel(`${soru.soru1}`)
          .setStyle(1)
          .setMinLength(5)
          .setMaxLength(20)
          .setPlaceholder(`${soru.cevap1}`)
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId("soru2")
          .setLabel(`${soru.soru2}`)
          .setStyle(1)
          .setMinLength(1)
          .setMaxLength(10)
          .setPlaceholder(`${soru.cevap2}`)
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId("soru3")
          .setLabel(`${soru.soru3}`)
          .setStyle(1)
          .setMinLength(5)
          .setMaxLength(100)
          .setPlaceholder(`${soru.cevap3}`)
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId("soru4")
          .setLabel(`${soru.soru4}`)
          .setStyle(1)
          .setMinLength(5)
          .setMaxLength(100)
          .setPlaceholder(`${soru.cevap4}`)
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId("soru5")
          .setLabel(`${soru.soru5}`)
          .setStyle(1)
          .setMinLength(5)
          .setMaxLength(100)
          .setPlaceholder(`${soru.cevap5}`)
          .setRequired(true),
      )
    );

  if (i.customId === "basvuru_buton") {
    await i.showModal(modal);
  }

  let message;
  let logKanalı = client.channels.cache.get(config.logKanalı);

  if (i.customId === "ybasvuru") {
    const kabulet = new ButtonBuilder()
      .setCustomId("basvuru_kabul")
      .setLabel("Kabul Et")
      .setStyle(3)
      .setEmoji("✅");

    const reddet = new ButtonBuilder()
      .setCustomId("basvuru_red")
      .setLabel("Reddet")
      .setStyle(1)
      .setEmoji("❌");

    const row4 = new ActionRowBuilder()
      .addComponents(kabulet, reddet);

    const soru1 = i.fields.getTextInputValue("soru1");
    const soru2 = i.fields.getTextInputValue("soru2");
    const soru3 = i.fields.getTextInputValue("soru3");
    const soru4 = i.fields.getTextInputValue("soru4");
    const soru5 = i.fields.getTextInputValue("soru5");

    const titan = new EmbedBuilder()
      .setColor("Random")
      .setAuthor({ name: `${i.guild.name} Başvuru Sistemi` })
      .setThumbnail(i.guild.iconURL())
      .setDescription(`
      **${i.user.tag}** - (\`${i.user.id}\`) ** Kullanıcısının Başvuru Formu**
      
      **${soru.soru1}**
      \`${soru1}\`
      **${soru.soru2}**
      \`${soru2}\`
      **${soru.soru3}**
      \`${soru3}\`
      **${soru.soru4}**
      \`${soru4}\`
      **${soru.soru5}**
      \`${soru5}\`
      `)
      .setTimestamp();

    await i.reply({ embeds: [new EmbedBuilder().setColor('Green').setDescription('Başvurunuz başarıyla alındı, şimdi tek yapmanız gereken yetkililerin cevap vermesini beklemek :) umarım kabul edilir..')], ephemeral: true });
    message = await logKanalı.send({ content: `${i.user}`, embeds: [titan], components: [row4] });
    db.set(message.id, i.user.id);
  }

  const basvuruDurum = client.channels.cache.get(config.basvuruDurum);

  if (i.customId === "basvuru_kabul") {
    if (!i.member.roles.cache.has(config.basvuruYt)) {
      return i.reply({ embeds: [new EmbedBuilder().setColor('Red').setDescription(`Başvuruyu yanıtlamak için <@&${config.basvuruYt}> rolüne sahip olmalısın`)], ephemeral: true });
    }

    const kabulet2 = new ButtonBuilder()
      .setCustomId("basvuru_kabul")
      .setLabel("Kabul Edildi")
      .setStyle(3)
      .setEmoji("✅")
      .setDisabled(true);

    const row5 = new ActionRowBuilder()
      .addComponents(kabulet2);

    await i.update({ components: [row5] });
    let kişi = db.get(i.message.id);
    let kullanıcı = i.client.guilds.cache.get(config.guildID).members.cache.get(kişi);
    await kullanıcı.roles.add(config.yetkiRolleri);
    await basvuruDurum.send({ embeds: [new EmbedBuilder().setColor('Green').setDescription(`<@${kişi}>, Tebrikler! Başvurunuz **kabul edildi** ve **yetkili ekibimize** onaylandınız.\n**Sizi onaylayan kişi: **${i.user.toString()}`)] });
    await kullanıcı.user.send({ embeds: [new EmbedBuilder().setColor('Green').setDescription('Yetkili Başvurun Başarıyla Onaylanmıştır Ekibe Girmeye Hak Kazandınız!')] }).catch(() => {});
    db.delete(i.message.id);
  }

  if (i.customId === "basvuru_red") {
    let kişi = db.get(i.message.id);
    let kullanıcı = i.client.guilds.cache.get(config.guildID).members.cache.get(kişi);

    const reddet2 = new ButtonBuilder()
      .setCustomId("basvuru_red")
      .setLabel("Reddedildi")
      .setStyle(1)
      .setEmoji("❌")
      .setDisabled(true);

    const row6 = new ActionRowBuilder()
      .addComponents(reddet2);

    await basvuruDurum.send({ embeds: [new EmbedBuilder().setColor('Red').setDescription(`<@${kişi}>, Maalesef! Başvurunuz **kabul edilmedi** ve **yetkili ekibimize** onaylanmadınız.\n**Sizi onaylamayan kişi: **${i.user.toString()}`)] });
    await i.update({ components: [row6] });
    await kullanıcı.user.send({ embeds: [new EmbedBuilder().setColor('Red').setDescription('Maalesef yetkili başvurun reddedilmiştir!')] }).catch(() => {});
    db.delete(i.message.id);
  }
});
