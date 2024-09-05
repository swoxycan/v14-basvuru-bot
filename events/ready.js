const { Client, Collection, Events } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = require('../index');

client.on(Events.ClientReady, () => {
    console.log(`${client.user.tag} Bot Online!`);
    client.user.setActivity('Swoxy Was Here ❤️');

    client.commands = new Collection();
    client.aliases = new Collection();

    const commandsPath = path.resolve(__dirname, '../commands/');
    fs.readdir(commandsPath, (err, files) => {
        if (err) {
            console.error('Komut dosyaları okunurken bir hata oluştu:', err);
            return;
        }
        console.log(`${files.length} toplam komut dosyası bulundu!`);
        files.forEach(file => {
            const filePath = path.join(commandsPath, file);
            const props = require(filePath);

            console.log(`${props.help.name} komutu yüklendi!`);

            client.commands.set(props.help.name, props);
            if (props.conf.aliases) {
                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);
                });
            }
        });
    });
});
