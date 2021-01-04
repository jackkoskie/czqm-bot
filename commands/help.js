module.exports = {
    name: 'help',
    description: 'sends a help menu',
    execute(message, args) {
        var helpEmbed = {
            title: `CZQM Bot - Help`,
            author: {
                name: 'CZQM FIR',
                icon_url: 'http://czqm.ca/images/imageTitleLeft.png',
                url: 'http://czqm.ca',
            },
            description: 'Commands ending with a * are restricted.',
            fields: [
                {
                    name: '.event *',
                    inline: true,
                    value: 'Overlying command for most event bassed commands.'
                },
                {
                    name: '.control {eventID}',
                    inline: true,
                    value: 'Applies to control for an event.'
                },
                {
                    name: '.help',
                    inline: true,
                    value: 'Shows this menu.'
                },
                {
                    name: '.roster {rosterUrl} *',
                    inline: true,
                    value: 'Posts roster for an event.'
                },
                {
                    name: '.controlers {eventID} *',
                    inline: true,
                    value: 'Shows a list of controlers who wish to control during an event.'
                },
            ],
            footer: {
                text: `© CZQM FIR, 2021.`
            }

        }

        message.author.send({ embed: helpEmbed })

        if (message.channel.type === 'dm') {
            return;
        } else {
            message.channel.send(':mailbox: Check your DMs!')
        }
    },
};