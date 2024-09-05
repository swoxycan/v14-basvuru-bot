const { EmbedBuilder, Events } = require('discord.js');
const config = require('../setting/config.js');
const client = require('..'); 
const prefix = config.prefix;

client.on(Events.MessageCreate, async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    let cmd;
    if (client.commands.has(commandName)) {
        cmd = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
        cmd = client.commands.get(client.aliases.get(commandName));
    }

    if (cmd) {
        try {
            await cmd.run(client, message, args);
        } catch (error) {
            console.error('Komut çalıştırılırken bir hata oluştu:', error);
            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Komut Hatası')
                .setDescription('Komut çalıştırılırken bir hata oluştu. Lütfen tekrar deneyin veya hata hakkında bilgi almak için yetkililere başvurun.');
            await message.reply({ embeds: [errorEmbed] });
        }
    }
});
