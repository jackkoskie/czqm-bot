module.exports = {
    name: 'roster',
    description: 'A command that handles posting a roster',
    execute(message, args, config, Discord, mongoose, eventSchema, client) {
        if (message.channel.type === 'dm' || message.member.roles.cache.some(role => role.name === 'staff')) {
            const roster = new Discord.MessageAttachment(args[1], 'roster.png');
            message.channel.send(`@here`, { files: [roster] });
            message.delete();
        } else {
            message.channel.send('Sorry! You do not have permission to use that command')
        }
    }
}