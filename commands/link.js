const https = require('https');
const querystring = require('querystring');
const util = require('util');

module.exports.name = 'link';
module.exports.execute = (message, i18n, args) => {
    const q = { term: args.join(' ') },
        host = process.env.DISCOURSE_HOST,
        options = {
            host: host,
            path: "/search/query.json?" + querystring.stringify(q),
            headers: {
                'Api-Username': process.env.DISCOURSE_USER,
                'Api-Key': process.env.DISCOURSE_API_KEY
            }
        };

        https.get(options, res => {
            const chunks = [];

            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
                const response = JSON.parse(chunks.join()),
                    topics_found = response['topics'];

                if (topics_found.length === 0) {
                    message.channel.send(i18n.t('link_found'));
                } else {
                    const topic = topics_found[0],
                        link = util.format("https://%s/t/%s/%i", host, topic.slug, topic.id);
                    message.channel.send(i18n.t('link_found', { title: topic.title, link: link }));
                }
            })
        });
};
