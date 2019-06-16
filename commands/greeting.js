module.exports.name = 'greeting';
module.exports.execute = (message, i18n) => {
    message.channel.send(i18n.t('greeting'));
};
