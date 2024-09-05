const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');
const config = require('../setting/config.js');

exports.run = async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return interaction.reply({ content: `${interaction.user} bu komutu kullanmak için \`Administrator\` yetkisine sahip olmalısın.`, ephemeral: true });
    }

    const basvuruEmbed = new EmbedBuilder()
        .setAuthor({ name: `${interaction.guild.name} Başvuru Sistemi` })
        .setColor('Random')
        .setFooter({ text: `${config.Footer}` })
        .setThumbnail(interaction.guild.iconURL())
        .setDescription(
            "Sunucumuzda yetkili olmak istiyorsanız yapmanız gereken aşağıdaki butona tıklayıp formu düzgün bir şekilde doldurmak.\n\n" +
            "Başvuru formuna erişmek için [bu linke](https://example.com) tıklayabilirsiniz."
        )
        .setImage('https://r.resimlink.com/LyGI_.gif'); 

    const basvuruButon = new ButtonBuilder()
        .setCustomId('basvuru_buton')
        .setLabel('Başvuru Yap')
        .setStyle('Primary');

    const row3 = new ActionRowBuilder()
        .addComponents(basvuruButon);

    await interaction.reply({ embeds: [basvuruEmbed], components: [row3] });
};

exports.conf = {
    aliases: ['başvur']
};

exports.help = {
    name: 'başvuru'
};
