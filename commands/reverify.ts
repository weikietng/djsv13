import { ButtonInteraction, GuildMember, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import verification from "../models/account"
import noblox from "noblox.js"
import axios from "axios"


export default {
    category: 'Verification',
    description: 'Reverify your account/switch your account.',

    aliases: "switchroles",



    maxArgs: 1,
    expectedArgs: '[amount]',

    slash: true,


    callback: async ({ interaction: msgInt, channel }) => {
        const dataCheck = await verification.findOne({ DiscordID: `${msgInt.user.id}` })

        if (dataCheck) {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setURL('https://rover.link/login/')
                        .setLabel('Go to RoVer')
                        .setStyle('LINK')
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId('Reverification_Init')
                        .setEmoji('✔️')
                        .setLabel('Done')
                        .setStyle('SUCCESS')
                )
            const initEmbed = new MessageEmbed()
                .setTitle("**Switch Account**")
                .setDescription("\n 1. Click on the 'Go to Rover' button below and head to RoVer. \n 2. Log in with your Discord. \n 3. Click on 'Change' to change your verified account. \n 4. Follow the instruction on RoVer's website. \n 5. Click on the 'Done' button below.")
                .setFooter("Cereza Verification")
                .setColor("BLUE")

            await msgInt.reply({ embeds: [initEmbed], ephemeral: true })






            const collector = channel.createMessageComponentCollector()

            collector.on('collect', async (i: ButtonInteraction) => {
                if (i.user.id === msgInt.user.id) {
                    if (i.customId === 'Reverification_Init') {
                        try {
                            const uri = `https://verify.eryn.io/api/user/${msgInt.user.id}`
                            const { data } = await axios.get(uri)
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
                                let newRobloxID = data.robloxId
                                let rUsernamefromID = await noblox.getUsernameFromId(Number(data.robloxId))
                                let playerID = `${data.robloxId}`
                                await verification.findOneAndUpdate({ DiscordID: `${msgInt.user.id}` }, { RobloxUserID: playerID, DiscordID: msgInt.user.id })
                                try {
                                    const memberItem = msgInt.member as GuildMember
                                    memberItem.setNickname(rUsernamefromID)
                                    let rankName = await noblox.getRankNameInGroup(5206353, Number(data.robloxId))
                                    let RankNumber = await noblox.getRankInGroup(5206353, Number(data.robloxId))
                                    // Verified Roles
                                    await memberItem.roles.add("852583076910727228")

                                    const SuccessEmbed = new MessageEmbed()
                                        .setTitle("**Reverification Success**")
                                        .setDescription(`You are now reverified as **${rUsernamefromID}**!`)
                                        .setColor("DARK_GREEN")
                                        .setFooter("Cereza Verification")
                                    await msgInt.editReply({ embeds: [SuccessEmbed] })

                                } catch (error){
                                    const ErrorEmbed = new MessageEmbed()
                                        .setTitle("**Error Occurred**")
                                        .setDescription(`\n Please screenshot this and send this to DamienAngel0828 \n \n ${error}`)
                                        .setColor("RED")
                                        .setFooter("Cereza Verification")
                                    await i.reply({
                                        embeds: [ErrorEmbed],
                                        ephemeral: true
                                    })
                                    return



                                }
                            }

                        } catch (err) {
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

                }
            })

            collector.on('end', async (collection) => {
                collection.forEach((click) => {
                    console.log(click.user.id, click.customId)
                })

            })
        } else {
            let verifyPlsEmbed = new MessageEmbed()
                .setTitle("**You are not verified**")
                .setDescription("Please verify yourself by heading to the authorization channel.")
                .setColor("YELLOW")
                .setFooter("Cereza Verification")
            await msgInt.reply({
                embeds: [verifyPlsEmbed],

                ephemeral: true
            })

        }






    },
} as ICommand