import { GuildMember, Message, MessageEmbed, Role } from 'discord.js'
import { ICommand } from 'wokcommands'
import noblox from "noblox.js"
import verification from "../models/account"

export default {
    category: 'Verification',
    description: `Updates a your role`,

 


    slash: true,


    

    callback: async ({ message, interaction, args }) => {

        let target = interaction.member as GuildMember
        let data1 = await verification.findOne({ DiscordID: `${target.id}` })
        if (data1) {
            let RobloxUserID = data1.RobloxUserID
            let rUsernamefromID = await noblox.getUsernameFromId(Number(RobloxUserID))
            try {
                target.setNickname(rUsernamefromID)
                let rankName = await noblox.getRankNameInGroup(5206353, Number(RobloxUserID))
                let RankNumber = await noblox.getRankInGroup(5206353, Number(RobloxUserID))
                // Verified Roles
                await target.roles.add("852583076910727228")

                await target.roles.remove([`${process.env.Chairman, process.env.ViceChairman, process.env.President, process.env.VicePresident, process.env.PresidentialDepartment, process.env.Developer, process.env.SuperRank, process.env.StaffingDirector, process.env.RelationsDirector, process.env.ServerAdministrator, process.env.ExecutiveAssistant, process.env.SupportTeam, process.env.HighRank, process.env.Coordinator, process.env.GeneralManager, process.env.GeneralManager, process.env.Supervisor, process.env.StaffAssistant, process.env.MiddleRank, process.env.EmergencyResponse, process.env.ManagementIntern, process.env.AdvancedBarista, process.env.Barista, process.env.JuniorBarista, process.env.Trainee, process.env.LowRank, process.env.HonouredCustomer, process.env.ProminentCustomer, process.env.Visitor}`])

                let rRole = interaction.guild?.roles.cache.find(r => r.name === rankName)

                console.log(rRole)
                await target.roles.add(`${rRole}`)
                if (RankNumber >= 7 && RankNumber <= 70) {
                    await target.roles.add(`${process.env.LowRank}`)
                } else if (RankNumber >= 75 && RankNumber <= 120) {
                    await target.roles.add(`${process.env.MiddleRank}`)

                    await target.roles.add(`${process.env.EmergencyResponse}`)

                } else if (RankNumber >= 121 && RankNumber <= 140) {
                    await target.roles.add(`${process.env.HighRank}`)

                    await target.roles.add(`${process.env.EmergencyResponse}`)
                    await target.roles.add(`${process.env.SupportTeam}`)
                    if (RankNumber >= 130) {
                        await target.roles.add(`${process.env.ServerAdministrator}`)
                    }

                } else if (RankNumber >= 200 && RankNumber <= 255) {
                    await target.roles.add(`${process.env.SuperRank}`)

                    await target.roles.add(`${process.env.EmergencyResponse}`)
                    await target.roles.add(`${process.env.SupportTeam}`)
                    await target.roles.add(`${process.env.ServerAdministrator}`)
                    if (RankNumber >= 240) {
                        await target.roles.add("857544805298602004")
                    }

                }
                await target.roles.add("852583076910727228")
                let verifiedEmbed = new MessageEmbed()
                    .setTitle("**Verification Success**")
                    .setDescription(`\n ${target.nickname}'s roles should be updated within the next few minutes.`)
                    .setFooter("Cereza Verification")
                    .setColor("GREEN")

                    await interaction.reply({
                        embeds: [verifiedEmbed]
                    })
                    return


            } catch (error) {
                const ErrorEmbed = new MessageEmbed()
                    .setTitle("**Error Occurred**")
                    .setDescription(`\n Please screenshot this and send this to DamienAngel0828 \n \n ${error}`)
                    .setColor("RED")
                    .setFooter("Cereza Verification")
                await interaction.reply({
                    embeds: [ErrorEmbed]
                })
                return

            }

        } else {
            let noVerifyEmbed = new MessageEmbed()
                .setTitle("**No verification data found**")
                .setDescription("Please ensure you are verified first.")
                .setFooter("Cereza Moderation")
                .setColor("RED")



            return noVerifyEmbed

        }








    },
} as ICommand