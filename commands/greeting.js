module.exports.name = 'greeting';
module.exports.execute = (message, polyglot) => {
    message.channel.send(polyglot.t('greeting'));
};
