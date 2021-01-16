module.exports = {
    name: 'control',
    description: 'A command that lets people say they want to control during an event',
    execute(message, args, config, Discord, mongoose, eventSchema, client) {
        async function control(message) {
            var doc = await eventSchema.findOne({ "_id": args[1] });
            doc.people.push(`${message.member.user.username}#${message.member.user.discriminator}`);
            doc.save();
            message.reply(`Added you to the list of people looking to control in the event with an ID of \`${doc._id}\``);
            message.delete();
        }
        control(message)
    }
}