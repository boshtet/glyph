const Polyglot = require('node-polyglot');
const phrases = require('./locales/en.json');
const polyglot = new Polyglot({ phrases: phrases });

const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

fs.readdirSync('./commands')
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
        console.log(polyglot.t('__console_module', { module: command.name }));
});

client.on('ready', () => {
    console.log(polyglot.t('__console_banner', { tag: client.user.tag }));
});

client.on('message', msg => {
    const self = client.user,
        author = msg.author,
        mentioned = msg.isMentioned(self),
        sent_by_me = author.equals(self);

    if (mentioned && !sent_by_me) {
        const text = msg.content;
        console.log(text);

        if (client.commands.has(text)) {
            client.commands.get(text).execute(message, polyglot);
        } else {
            msg.channel.send(polyglot.t('help_offer'));
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
