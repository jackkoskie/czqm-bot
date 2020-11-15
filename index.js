// All the requires
const Discord = require('discord.js');
const client = new Discord.Client();
const {token} = require('./token.json');
const fs = require('fs')
const config = require('./config.json')

// Tells the console when the bot has logged on
client.on('ready', () => {
    console.log("The bot is ONLINE");
});

// Tells bot where to find the commands files
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

// Reads Incoming Messages
client.on('message', message => {
    if (!message.content.startsWith(`${config.prefix}`)) {
        return;
    } else {
        let args = message.content.toLowerCase().substring(config.prefix.length).split(" ");
        console.log(args[0])
    }
});

// Logs the bot in to Discord
try {
    client.login(token);
} catch (err) {
    console.error(`Error connecting to Discord. Received the following error:\n${err}`);
}