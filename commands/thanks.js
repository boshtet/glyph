module.exports.name = 'thanks';
module.exports.execute = (message, i18n) => {
    message.channel.send(i18n.t('thanks'));
};
