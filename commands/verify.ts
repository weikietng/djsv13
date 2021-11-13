import { ButtonInteraction, GuildMember, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import axios from 'axios'
import noblox from 'noblox.js'
import verifiation from "../models/account"

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
        if (msgInt.user.id === "482458649139347456") {
            await msgInt.channel?.send({
                embeds: [messageEmbed],
                components: [row]
            })
        } else {
            return 'You do not have permission to use this.'
        }

        const collector = channel.createMessageComponentCollector()

        collector.on('collect', async (i: ButtonInteraction) => {
            if (i.customId === 'Verification_Init') {
                let user = i.user
                let uri = `https://verify.eryn.io/api/user/${user.id}`

                try {

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

                        let data1 = await verifiation.findOne({ DiscordID: `${user.id}` })
                        if (!data1) {

                            let rUsernamefromID = await noblox.getUsernameFromId(Number(data.robloxId))
                            let playerID = `${data.robloxId}`

                            var newPlayerDataInstance = new verifiation({
                                RobloxUserID: playerID,
                                DiscordID: user.id,

                            })

                            await newPlayerDataInstance.save()

                            const memberItem = i.member as GuildMember

                            try {
                                memberItem.setNickname(rUsernamefromID)
                                let rankName = await noblox.getRankNameInGroup(5206353, Number(data.robloxId))
                                let RankNumber = await noblox.getRankInGroup(5206353, Number(data.robloxId))
                                // Verified Roles
                                await memberItem.roles.add("852583076910727228")

                              // Replace role id in env file|  await memberItem.roles.remove([`${process.env.Chairman, process.env.ViceChairman, process.env.President, process.env.VicePresident, process.env.PresidentialDepartment, process.env.Developer, process.env.SuperRank, process.env.StaffingDirector, process.env.RelationsDirector, process.env.ServerAdministrator, process.env.ExecutiveAssistant, process.env.SupportTeam, process.env.HighRank, process.env.Coordinator, process.env.GeneralManager, process.env.GeneralManager, process.env.Supervisor, process.env.StaffAssistant, process.env.MiddleRank, process.env.EmergencyResponse, process.env.ManagementIntern, process.env.AdvancedBarista, process.env.Barista, process.env.JuniorBarista, process.env.Trainee, process.env.LowRank, process.env.HonouredCustomer, process.env.ProminentCustomer, process.env.Visitor}`])

                                let rRole = i.guild?.roles.cache.find(r => r.name === rankName)

                                console.log(rRole)
                                await memberItem.roles.add(`${rRole}`)
                                if (RankNumber >= 7 && RankNumber <= 70) {
                                    await memberItem.roles.add(`${process.env.LowRank}`)
                                } else if (RankNumber >= 75 && RankNumber <= 120) {
                                    await memberItem.roles.add(`${process.env.MiddleRank}`)

                                    await memberItem.roles.add(`${process.env.EmergencyResponse}`)

                                } else if (RankNumber >= 121 && RankNumber <= 140) {
                                    await memberItem.roles.add(`${process.env.HighRank}`)

                                    await memberItem.roles.add(`${process.env.EmergencyResponse}`)
                                    await memberItem.roles.add(`${process.env.SupportTeam}`)
                                    if (RankNumber >= 130) {
                                        await memberItem.roles.add(`${process.env.ServerAdministrator}`)
                                    }

                                } else if (RankNumber >= 200 && RankNumber <= 255) {
                                    await memberItem.roles.add(`${process.env.SuperRank}`)

                                    await memberItem.roles.add(`${process.env.EmergencyResponse}`)
                                    await memberItem.roles.add(`${process.env.SupportTeam}`)
                                    await memberItem.roles.add(`${process.env.ServerAdministrator}`)
                                    if (RankNumber >= 240) {
                                        await memberItem.roles.add("857544805298602004")
                                    }

                                }
                                await memberItem.roles.add("852583076910727228")
                                let verifiedEmbed = new MessageEmbed()
                                    .setTitle("**Verification Success**")
                                    .setDescription("\n Your roles should be updated within the next few minutes.")
                                    .setFooter("Cereza Verification")
                                    .setColor("GREEN")

                                    await i.reply({
                                        embeds: [verifiedEmbed],
                                        ephemeral: true
                                    })
                                    return


                            } catch (error) {
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


                        } else {




                        }

                        
                        i.reply({
                            content: `You are already verified. Use /getroles to update your data instead.`,
                            ephemeral: true
                        })

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



        })

    },
} as ICommand