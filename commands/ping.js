module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message, args) {
        // Replies Pong!
        message.reply('Pong!');
    },
};