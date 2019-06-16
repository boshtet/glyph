module.exports.name = 'ping';
module.exports.execute = (message, i18n) => {
    message.channel.send(i18n.t('ping'));
};
