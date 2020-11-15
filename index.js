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

// Reads Incoming Messages
client.on('message', message => {
    if (!message.content.startsWith(`${config.prefix}`)) {
        return;
    } else {
        let args = message.content.toLowerCase().substring(config.prefix.length).split(" ");
        
        switch (args[0]) {
            case "ping":
                message.reply("Pong!")
                break;
            case "event":
                switch (args[1]) {
                    case "title":
                        const title1 = args.slice(2);
                        for (var i = 0; i < title1.length; i++) {
                            title1[i] = title1[i].charAt(0).toUpperCase() + title1[i].substring(1);
                        }

                        const title = title1.join(' ')

                        message.channel.send(`Event title set to \`${title}\``)
                        break;
                }
                break;
        }
    }
});

// Logs the bot in to Discord
try {
    client.login(token);
} catch (err) {
    console.error(`Error connecting to Discord. Received the following error:\n${err}`);
}