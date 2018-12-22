module.exports.name = 'ping';
module.exports.execute = (message, polyglot) => {
    message.channel.send(polyglot.t('ping'));
};
