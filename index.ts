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

    const wok = new WOKCommands(client, {
        // The name of the local folder for your command files
        commandsDir: path.join(__dirname, 'commands'),
        // Pass in the new dbOptions
        // Pass in your own mongo connection URI
       // mongoUri: "mongodb+srv://cerezadiscord:Cereza314@cluster0.1gt3c.mongodb.net/test"
       mongoUri: process.env["dbLink"]

    })

    const mongoose = require('mongoose')
   var db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error:"));

    db.once("open", function () {
        console.log("Connection To MongoDB Atlas Successful!");
    });
    client.user?.setPresence({ activities: [{ name: 'Cereza | Under Development', type: "LISTENING" }], status: 'idle' });
    const currentUser = await noblox.setCookie(`${process.env["robloxcookie"]}`)
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)

    





})


client.login(process.env["TOKEN"])