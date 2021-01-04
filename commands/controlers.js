module.exports = {
    name: 'controlers',
    description: 'Lists interested controlers for a certain event',
    execute(message, args, config, Discord, mongoose, eventSchema, client, permissions) {
        if (permissions.event.includes(message.member.user.id)) {
            async function controlers(message) {
                var doc = await eventSchema.findOne({ "_id": args[1] });
                message.channel.send(doc.people.join(' '));
            }
            controlers(message)
        } else {
            message.channel.send('Sorry! You do not have permission to use that command')
        }
    },
};