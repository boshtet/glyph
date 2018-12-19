const Discord = require('discord.js');
const client = new Discord.Client();

const Polyglot = require('node-polyglot');
const phrases = require('./locales/en.json');
const polyglot = new Polyglot({ phrases: phrases });

client.on('ready', () => {
    console.log(polyglot.t('console_banner', { tag: client.user.tag }));
});

client.on('message', msg => {
    let self = client.user,
        author = msg.author,
        channel = msg.channel,
        mentioned = msg.isMentioned(self.id),
        isSender = author.equals(self);

    if (mentioned && !isSender) {
        channel.send(polyglot.t('greeting'));
    }
});

client.login(process.env.DISCORD_TOKEN);
