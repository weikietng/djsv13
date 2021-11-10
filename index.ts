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

client.on('ready', async() => {
    const dbOptions = {
      // These are the default values
      keepAlive: true
    }
    const wok = new WOKCommands(client, {
      // The name of the local folder for your command files
      commandsDir: path.join(__dirname, 'commands'),
      // Pass in the new dbOptions
      dbOptions,
      // Pass in your own mongo connection URI
      mongoUri: "mongodb+srv://cerezadiscord:Cereza314@cluster0.1gt3c.mongodb.net/test"
    })
    
    wok.on('databaseConnected', async (connection, state) => {
      const model = connection.models['Account']
    
      const results = await model.countDocuments()
      console.log(results)
    })
    client.user?.setPresence({ activities: [{ name: 'Cereza | Under Development', type: "LISTENING" }], status: 'idle' });
    const currentUser = await noblox.setCookie("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D817227E322191D066D8C166C88A91200129B012596761D526B43333EC125D379EA7722DCE2DD3998CD9B075049C61E87410665AA73CED82E18DC1B562AE9EA939634149B9ED574358671A28C3E1EC71047DF17237B1F614F0A2C386D8D55A678F48D5DEF6AD8940521AA1E6B8056159E69D4F6577DEA5187177EB66287A5C7B03196BF614543116AF50B8E1A6BAA4845248F4A9544A1501930B619785ED62163E36A95DF70F110A09C0860EDEEE6DDAB338C9B7B444462FDCB46D9CC81B1DD9EEDCAACDBE13A1741C4C225EE856B7C32FE3535928B701E20FE33409AE89B0DE77171EE22E256FB81F315F372187971439CEB58AB8ABA2BA88CEE09CF5EC12AAE8C93EF5DED9DEA34FEA76A14DF8A2F72E37EE518920A074D76A065D97F41FAAAD8B60D48FEFEBF815008289D2770FB9F4EF5BA063D271E62D832B1B119DE5FE3EE159780AD881BE01E0E86748D3EB998364C2E1")
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)
  })


/* client.on('ready', async () => {
    console.log("Bot is ready!");
    client.user?.setPresence({ activities: [{ name: 'Cereza | Under Development', type: "LISTENING" }], status: 'idle' });
   const wok =  new WOKCommands(client, {
        // The name of the local folder for your command files
        commandsDir: path.join(__dirname, 'commands'),
        // Allow importing of .ts files if you are using ts-node
        mongoUri: process.env.dbLink,
        dbOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
        wok.on('databaseConnected', async (connection, state) => {
            const model = connection.models['wokcommands-languages']
          
            const results = await model.countDocuments()
            console.log(results)
          })
        })
    })
    const currentUser = await noblox.setCookie("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D817227E322191D066D8C166C88A91200129B012596761D526B43333EC125D379EA7722DCE2DD3998CD9B075049C61E87410665AA73CED82E18DC1B562AE9EA939634149B9ED574358671A28C3E1EC71047DF17237B1F614F0A2C386D8D55A678F48D5DEF6AD8940521AA1E6B8056159E69D4F6577DEA5187177EB66287A5C7B03196BF614543116AF50B8E1A6BAA4845248F4A9544A1501930B619785ED62163E36A95DF70F110A09C0860EDEEE6DDAB338C9B7B444462FDCB46D9CC81B1DD9EEDCAACDBE13A1741C4C225EE856B7C32FE3535928B701E20FE33409AE89B0DE77171EE22E256FB81F315F372187971439CEB58AB8ABA2BA88CEE09CF5EC12AAE8C93EF5DED9DEA34FEA76A14DF8A2F72E37EE518920A074D76A065D97F41FAAAD8B60D48FEFEBF815008289D2770FB9F4EF5BA063D271E62D832B1B119DE5FE3EE159780AD881BE01E0E86748D3EB998364C2E1")
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)

})
*/


client.login(process.env["TOKEN"])