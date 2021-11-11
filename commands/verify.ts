import { ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import axios from 'axios'

export default {
    category: 'Setup',
    description: 'Setup verification button',

    slash: true,


    callback: async ({ interaction: msgInt, channel }) => {

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('Verification_Init')
                    .setEmoji('✔️')
                    .setLabel('Verify')
                    .setStyle('PRIMARY')
            )
        let messageEmbed = new MessageEmbed()
            .setTitle("**Cereza Verification**")
            .setDescription("\n \n Click the verify below to verify yourself. \n _It will use data from RoVer's database._ ")
            .setColor("ORANGE")
            .setFooter("Cereza Verification")

        await msgInt.channel?.send({
            embeds: [messageEmbed],
            components: [row]
        })

        const collector = channel.createMessageComponentCollector()

        collector.on('collect', async (i: ButtonInteraction) => {
            if (i.customId === 'Verification_Init') {
                let user = i.user
                let uri = `https://verify.eryn.io/api/user/${user.id}`
               
               try{

                const { data } =  await axios.get(uri)

              
                if (data.status === "error") {
                    const verifyRow = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setURL('https://rover.link/login/')
                                .setLabel('Verify account here')
                                .setStyle('LINK')
                        )

                    let verifyPlsEmbed = new MessageEmbed()
                        .setTitle("**You are not verified**")
                        .setDescription("Please verify yourself with RoVer by clicking on the button below.")
                        .setColor("YELLOW")
                        .setFooter("Cereza Verification")
                    await i.reply({
                        embeds: [verifyPlsEmbed],
                        components: [verifyRow],
                        ephemeral: true
                    })
                    return

                } else {

                    i.reply({
                        content: `You are verified, user is ${data.robloxUsername}`,
                        ephemeral: true
                    })

                }



               }catch(err){


                const verifyRow = new MessageActionRow()
                        .addComponents(
                            new MessageButton()

                                .setURL('https://rover.link/login/')
                                .setLabel('Verify account here')
                                .setStyle('LINK')
                        )

                    let verifyPlsEmbed = new MessageEmbed()
                        .setTitle("**You are not verified**")
                        .setDescription("Please verify yourself with RoVer by clicking on the button below.")
                        .setColor("YELLOW")
                        .setFooter("Cereza Verification")
                    await i.reply({
                        embeds: [verifyPlsEmbed],
                        components: [verifyRow],
                        ephemeral: true
                    })
                    return
               }
               
                

            }



        })

    },
} as ICommand