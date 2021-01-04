module.exports = {
    name: 'roster',
    description: 'A command that handles posting a roster',
    execute(message, args, config, Discord, mongoose, eventSchema, client) {
        const roster = new Discord.MessageAttachment(args[1], 'roster.png');
        message.channel.send(`test`, roster);
        message.delete();
    }
}