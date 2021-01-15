// All the requires
const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./token.json');
const fs = require('fs')
const config = require('./config.json');
const { measureMemory } = require('vm');
const mongoose = require('mongoose');
const { dburl } = require('./database.json');
const eventSchema = require('./models/event')
const permissions = require('./permissions.json');

// Tells the console when the bot has logged on
client.on('ready', () => {
    console.log("The bot is ONLINE");
});

// Tells the bot where to find the command files
client.commands = new Discord.Collection();

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
        let args = message.content.substring(config.prefix.length).split(" ");

        switch (args[0]) {
            case 'ping':
                client.commands.get('ping').execute(message, args, config, Discord, mongoose, eventSchema, client, permissions);
                break;

            case 'event':
            case 'ev':
                client.commands.get('event').execute(message, args, config, Discord, mongoose, eventSchema, client, permissions);
                break;

            case 'roster':
            case 'ro':
                client.commands.get('roster').execute(message, args, config, Discord, mongoose, eventSchema, client, permissions);
                break;
            case 'control':
                client.commands.get('control').execute(message, args, config, Discord, mongoose, eventSchema, client, permissions);
                break;
            case 'controlers':
                client.commands.get('controlers').execute(message, args, config, Discord, mongoose, eventSchema, client, permissions);
                break;
            case 'help':
                client.commands.get('help').execute(message, args, config, Discord, mongoose, eventSchema, client, permissions);
                break;
            case 'metar':
                client.commands.get('metar').execute(message, args, config, Discord, mongoose, eventSchema, client, permissions);
                break;
        }
    }
});

// Logs the bot in to the Database
try {
    mongoose.connect(dburl, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
} catch (err) {
    console.error(`Error connecting to MongoDB database. Received the following error:\n${err}`);
}

// Logs the bot in to Discord
try {
    client.login(token);
} catch (err) {
    console.error(`Error connecting to Discord. Received the following error:\n${err}`);
}