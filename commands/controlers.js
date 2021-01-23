module.exports = {
    name: 'controlers',
    description: 'Lists interested controlers for a certain event',
    execute(message, args, config, Discord, mongoose, eventSchema, client) {
        if (message.channel.type === 'dm' || message.member.roles.cache.some(role => role.name === 'staff')) {
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