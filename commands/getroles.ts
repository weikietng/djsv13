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
               await target.roles.set([])


                if (RankNumber > 0) {
                    let rRole = interaction.guild?.roles.cache.find(r => r.name === rankName)

                    console.log(rRole)
                    await target.roles.add(`${rRole}`)
                    await target.roles.add("852583076910727228")
                }else{
                    await target.roles.add("852583076910727228")
                }

                if (RankNumber >= 200) {
                    await target.roles.add(`${process.env.SuperRank}`)
                    await target.roles.add(`${process.env.Emergency}`)
                    await target.roles.add(`${process.env.Support}`)
                    await target.roles.add(`${process.env.ServerAdministrator}`)
                    if (RankNumber >= 220) {
                        await target.roles.add("857544805298602004")
                    }
                } else if (RankNumber >= 121) {
                    await target.roles.add(`${process.env.HR}`)
                    await target.roles.add(`${process.env.Emergency}`)
                    await target.roles.add(`${process.env.Support}`)
                    await target.roles.add(`${process.env.ServerAdministrator}`)

                } else if (RankNumber >= 70) {
                    await target.roles.add(`${process.env.MR}`)
                    await target.roles.add(`${process.env.Emergency}`)
                } else if (RankNumber >= 7) {
                    await target.roles.add(`${process.env.LR}`)
                }

                
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