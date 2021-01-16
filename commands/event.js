module.exports = {
    name: 'event',
    description: 'Command for creating and managing events',
    execute(message, args, config, Discord, mongoose, eventSchema, client) {

        if (message.member.roles.cache.some(role => role.name === 'staff')) {
            switch (args[1]) {

                case 'post':
                    if (!args[2]) { return };

                    function sleep(ms) {
                        return new Promise((resolve) => {
                            setTimeout(resolve, ms);
                        });
                    }

                    async function post(args) {
                        var doc = await eventSchema.findOne({ "_id": args[2] });

                        var eventEmbed = {
                            title: `Event Notification - *${doc.name}*`,
                            author: {
                                name: 'CZQM FIR',
                                icon_url: 'http://czqm.ca/images/imageTitleLeft.png',
                                url: 'http://czqm.ca',
                            },
                            fields: [
                                {
                                    name: 'Event Date',
                                    value: `*${doc.date}*`,
                                    inline: true,
                                },
                                {
                                    name: 'Event Time',
                                    value: `*${doc.time}*`,
                                    inline: true,
                                },
                                {
                                    name: 'Details',
                                    value: `*${doc.details}*`,
                                },

                            ],
                            footer: {
                                text: `To control at this event, please type the command: \`.control ${doc._id}\`.`
                            }
                        }
                        const banner = new Discord.MessageAttachment(doc.banner, `${doc._id}.png`);

                        //client.channels.get(config.eventChannel).send({ embed: eventEmbed});
                        message.delete()
                        message.channel.send('here')
                        message.channel.send({ embed: eventEmbed });
                        await sleep(500);
                        const event = new Discord.MessageAttachment(doc.banner, 'banner.png');
                        message.channel.send({ files: [banner] })
                    }

                    post(args);

                    break;

                case 'new':
                    if (!args[2]) { return };
                    try {

                        async function newEvent(args) {
                            var doc = await eventSchema.findOne({ "_id": args[2] });
                            if (doc) {
                                message.channel.send(`Sorry, an event with the id of \`${args[2]}\` already exists.`);
                                return;
                            }

                            var doc = new eventSchema({ _id: args[2] });
                            doc.save();

                            message.channel.send(`Created event with the id of \`${args[2]}\`.`);
                        };

                        newEvent(args);

                    } catch (err) {
                        message.reply('sorry there was an error!');
                    };
                    break;

                case 'name':
                    if (!args[2] || !args[3]) { return };

                    try {

                        async function name(args) {
                            var doc = await eventSchema.findOne({ "_id": args[2] });
                            var name = args.slice(3).join(' ');
                            var name2 = name.charAt(0).toUpperCase() + name.slice(1);
                            doc.name = name2;
                            await doc.save();
                            message.channel.send(`Set name of event with id of \`${doc._id}\` to **${doc.name}**.`);
                        };

                        name(args);

                    } catch (err) {
                        message.reply('sorry there was an error!');
                        console.error(err);
                    };

                    break;

                case 'date':

                    try {
                        async function date(args) {

                            if (!args[2] || !args[3]) { return };

                            var doc = await eventSchema.findOne({ "_id": args[2] });

                            if (!args[3]) { return };

                            doc.date = args.slice(3).join(' ');
                            await doc.save();

                            message.channel.send(`Set date of event with id of \`${doc._id}\` to **${doc.date}**.`);
                        };

                        date(args);

                    } catch {
                        message.reply('sorry there was an error!');
                        console.error(err);
                    };

                    break;

                case 'time':

                    try {
                        async function time(args) {

                            if (!args[2] || !args[3]) { return };

                            var doc = await eventSchema.findOne({ "_id": args[2] });
                            doc.time = args.slice(3).join(' ');
                            await doc.save();

                            message.channel.send(`Set time of event with id of \`${doc._id}\` to **${doc.time}**.`);
                        };

                        time(args);

                    } catch {
                        message.reply('sorry there was an error!');
                        console.error(err);
                    };

                    break;

                case 'details':

                    try {
                        async function details(args) {
                            if (!args[2] || !args[3]) { return };

                            var doc = await eventSchema.findOne({ "_id": args[2] });
                            doc.details = args.slice(3).join(' ');
                            await doc.save();

                            message.channel.send(`Set the details of event with id of \`${doc._id}\`.`);
                        }

                        details(args);
                    } catch {
                        message.reply('sorry there was an error!');
                        console.error(err);
                    };

                    break;

                case 'banner':
                    try {
                        async function banner(args) {
                            if (!args[2] || !args[3]) { return };
                            var doc = await eventSchema.findOne({ "_id": args[2] });
                            doc.banner = args.slice(2).join('')
                            doc.save()
                            message.channel.send(`Set the banner of event with id of \`${doc._id}\``);
                            message.delete();
                        }

                        banner(args);
                    } catch {
                        message.reply('sorry there was an error!');
                        console.error(err);
                    };
                    break;

            }
        } else {
            message.channel.send('Sorry! You do not have permission to use that command')
        }

    },
};