'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const Polyglot = require('node-polyglot');
const phrases = require('./locales/en.json');
const i18n = new Polyglot({ phrases: phrases });

const nlp = require('compromise');

const File = require('fs');
File.readdirSync('./commands')
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
        console.log(i18n.t('__console_info_module', { module: command.name }));
    });

client.on('ready', () => {
    console.log(i18n.t('__console_info_banner', { tag: client.user.tag }));
});

client.on('message', message => {
    const self = client.user,
        direct_message = message.channel.type === 'dm',
        mentioned = message.isMentioned(self),
        sent_by_me = message.author.equals(self),
        for_me = (direct_message || mentioned) && !sent_by_me;

    if (for_me) {
        const text = nlp(message.content.toLowerCase()).normalize(),
            command = text.verbs().out('array')[0];

        if (client.commands.has(command)) {
            const mention = '<@' + self.id + '>',
                removable = [command, mention],
                tokens = text.words().out('array'),
                args = tokens.filter(word => !removable.includes(word));
            console.log(i18n.t('__console_debug_received_known_command', { command: command, args: args }));
            client.commands.get(command).execute(message, i18n, args);
        } else {
            console.log(i18n.t('__console_debug_received_unknown_command', { command: command }));
            message.channel.send(i18n.t('help_offer'));
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
