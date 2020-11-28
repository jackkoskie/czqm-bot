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

            case 'name':
                if (!args[2] || !args[3]) { return };

                try {
                    async function name(args) {
                        const doc = await eventSchema.findOne({ "_id": args[2] });
                        var name = await args.slice(3).join(' ');
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

        }

    },
};