module.exports = {
    name: 'controlers',
    description: 'Lists interested controlers for a certain event',
    execute(message, args, config, Discord, mongoose, eventSchema, client) {
        async function controlers(message) {
            var doc = await eventSchema.findOne({ "_id": args[1] });
            message.channel.send(doc.people.join(' '));
        }
        controlers(message)
    },
};