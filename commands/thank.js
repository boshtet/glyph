module.exports.name = 'thank';
module.exports.execute = (message, i18n) => {
    message.channel.send(i18n.t('thanks'));
};
