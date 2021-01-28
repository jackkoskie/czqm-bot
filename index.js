// All the requires
const dotenv = require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const { measureMemory } = require('vm');
const mongoose = require('mongoose');
const eventSchema = require('./models/event')

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
    if (!message.content.startsWith(process.env.COMMAND_PREFIX)) {
        return;
    } else {
        let args = message.content.substring(process.env.COMMAND_PREFIX.length).split(" ");

        switch (args[0]) {
            case 'ping':
                client.commands.get('ping').execute(message, args, process.env, Discord, mongoose, eventSchema, client);
                break;

            case 'event':
            case 'ev':
                client.commands.get('event').execute(message, args, process.env, Discord, mongoose, eventSchema, client);
                break;

            case 'roster':
            case 'ro':
                client.commands.get('roster').execute(message, args, process.env, Discord, mongoose, eventSchema, client);
                break;
            case 'control':
                client.commands.get('control').execute(message, args, process.env, Discord, mongoose, eventSchema, client);
                break;
            case 'controlers':
                client.commands.get('controlers').execute(message, args, process.env, Discord, mongoose, eventSchema, client);
                break;
            case 'help':
                client.commands.get('help').execute(message, args, process.env, Discord, mongoose, eventSchema, client);
                break;
            case 'metar':
                client.commands.get('metar').execute(message, args, process.env, Discord, mongoose, eventSchema, client);
                break;
        }
    }
});

// Logs the bot in to the Database
try {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
} catch (err) {
    console.error(`Error connecting to MongoDB database. Received the following error:\n${err}`);
}

// Logs the bot in to Discord
try {
    client.login(process.env.DISCORD_TOKEN);
} catch (err) {
    console.error(`Error connecting to Discord. Received the following error:\n${err}`);
}