import { GuildMember, Message, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import verification from "../models/account"
import noblox from "noblox.js"
const GROUPID = 5206353

export default {
    category: 'Moderation',
    description: 'Kicks a user',

    requireRoles: true,


    slash: true,


    expectedArgs: '[discord user] [roblox user] [rank] [rank number]',
    expectedArgsTypes: ['USER', 'STRING','STRING', 'STRING'],

    callback: async ({ message, interaction, args }) => {
        let target = interaction.options.getMember("discord user") as GuildMember
        let targetRUser = interaction.options.getString("roblox user")
        let rank = interaction.options.getString("rank")
        let rankNumber = interaction.options.getString("rank number")
        if (target){
            let data = await verification.findOne({ DiscordID: `${target.id}` })
            if (data){
                let rUserID = data.RobloxUserID
                if(rank){
                    try{
                        await noblox.setRank(GROUPID,rUserID,rank)
    
                        let RankedSuccesfulEmbed = new MessageEmbed()
                        .setTitle("Ranked Succesfuly")
                        .setDescription("The user's rank in group should change shortly.")
                        .setFooter("Cereza Ranking")
                        .setColor("GREEN")
    
                        return interaction.reply({embeds: [RankedSuccesfulEmbed]})
    
                    }catch(err){
                        let errorEmbed = new MessageEmbed()
                        .setTitle("Error has occured")
                        .setDescription(`${err}`)
                        .setFooter("Cereza Error Handler")
                        .setColor("ORANGE")
    
                        return interaction.reply({embeds:[errorEmbed]})
    
                    }
    
                }else if (rankNumber){
                    let numberRank = parseInt(rankNumber)
                    
                    try{
                        await noblox.setRank(GROUPID,rUserID,numberRank)
    
                        let RankedSuccesfulEmbed = new MessageEmbed()
                        .setTitle("Ranked Succesfuly")
                        .setDescription("The user's rank in group should change shortly.")
                        .setFooter("Cereza Ranking")
                        .setColor("GREEN")
    
                        return interaction.reply({embeds: [RankedSuccesfulEmbed]})
    
                    }catch(err){
                        let errorEmbed = new MessageEmbed()
                        .setTitle("Error has occured")
                        .setDescription(`${err}`)
                        .setFooter("Cereza Error Handler")
                        .setColor("ORANGE")
    
                        return interaction.reply({embeds:[errorEmbed]})
    
                    }
    
                }
            }else{
                let UnverifiedEmbed = new MessageEmbed()
                .setTitle("User is unverified")
                .setDescription("Please make sure the user is verified in our Discord server.")
                .setColor("RED")
                .setFooter("Cereza Verification")

                return interaction.reply({embeds:[UnverifiedEmbed]})
    
            }


        }else if(targetRUser){
            let rUserId = await noblox.getIdFromUsername(targetRUser)

            if(rank){
                try{
                    await noblox.setRank(GROUPID,rUserId,rank)

                    let RankedSuccesfulEmbed = new MessageEmbed()
                    .setTitle("Ranked Succesfuly")
                    .setDescription("The user's rank in group should change shortly.")
                    .setFooter("Cereza Ranking")
                    .setColor("GREEN")

                    return interaction.reply({embeds: [RankedSuccesfulEmbed]})

                }catch(err){
                    let errorEmbed = new MessageEmbed()
                    .setTitle("Error has occured")
                    .setDescription(`${err}`)
                    .setFooter("Cereza Error Handler")
                    .setColor("ORANGE")

                    return interaction.reply({embeds:[errorEmbed]})

                }

            }else if (rankNumber){
                let numberRank = parseInt(rankNumber)
                
                try{
                    await noblox.setRank(GROUPID,rUserId,numberRank)

                    let RankedSuccesfulEmbed = new MessageEmbed()
                    .setTitle("Ranked Succesfuly")
                    .setDescription("The user's rank in group should change shortly.")
                    .setFooter("Cereza Ranking")
                    .setColor("GREEN")

                    return interaction.reply({embeds: [RankedSuccesfulEmbed]})

                }catch(err){
                    let errorEmbed = new MessageEmbed()
                    .setTitle("Error has occured")
                    .setDescription(`${err}`)
                    .setFooter("Cereza Error Handler")
                    .setColor("ORANGE")

                    return interaction.reply({embeds:[errorEmbed]})

                }

            }

        }

        

    }

} as ICommand