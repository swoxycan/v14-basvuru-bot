const { EmbedBuilder } = require('discord.js');

exports.run = async (client, interaction) => {
    const ping = client.ws.ping;

    const pingEmbed = new EmbedBuilder()
        .setColor('BLUE')
        .setTitle('Ping Bilgisi')
        .setDescription(`Botun ping değeri: ${ping}ms`)
        .setTimestamp();

    await interaction.reply({ embeds: [pingEmbed] });
};

exports.conf = {
    aliases: ['pong']
};

exports.help = {
    name: 'ping'
};
