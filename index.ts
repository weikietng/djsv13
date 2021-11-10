import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import WOKCommands from 'wokcommands';
import noblox from 'noblox.js';
import mongoose from 'mongoose';
import path from 'path';
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS

    ],

})

client.on('ready', async () => {
    console.log("Bot is ready!");
    client.user?.setPresence({ activities: [{ name: 'Cereza | Under Development', type: "LISTENING" }], status: 'idle' });
    new WOKCommands(client, {
        // The name of the local folder for your command files
        commandsDir: path.join(__dirname, 'commands'),
        // Allow importing of .ts files if you are using ts-node
        mongoUri: process.env.dbLink,
        dbOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    })
    const currentUser = await noblox.setCookie(process.env.robloxcookie || "")
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)
})



client.login(process.env["TOKEN"])