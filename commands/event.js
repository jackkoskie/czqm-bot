module.exports = {
    name: 'event',
    description: 'Command for creating and managing events',
    execute(message, args, config, Discord, mongoose, eventSchema) {

        switch (args[1]) {

            case 'new':
                if (!args[2]) { return };
                try {
                    var doc = new eventSchema({ _id: args[2] });
                    doc.save();

                    message.channel.send(`Created event with the id of \`${args[2]}\`.`);
                } catch (err) {
                    message.reply('sorry there was an error!');
                };
                break;

            case 'title':
                if (!args[2] || !args[3]) { return };

                try {
                    var doc = eventSchema.findOne({ _id: args[2] });
                    var title = args.slice(3).join(' ');
                    doc.title = title.charAt(0).toUpperCase() + title.slice(1);
                    doc.save();

                    message.channel.send(`Set title of event with id of \`${doc._id}\` to **${doc.title}**.`);
                } catch (err) {
                    message.reply('sorry there was an error!');
                };

                break;

        }

    },
};