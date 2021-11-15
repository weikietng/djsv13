import { Client, ButtonInteraction, GuildMember, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import ms from "ms"

export default{
    category:"Moderation",
    description: "Mute a user",

    requireRoles: true,
    slash: true,


    minArgs: 2,
    expectedArgs: '<user> <reason> [duration]',
    expectedArgsTypes: ['USER', 'STRING', 'STRING'],

    callback: async ({ message, interaction, args }) => {
        try{
            const target = interaction.options.getMember('user') as GuildMember
            const reason = interaction.options.getString('reason')
            const duration = interaction.options.getString('duration') || "1h"
    
            if (!target){
                let noTagEmbed = new MessageEmbed()
                .setTitle("No user")
                .setDescription("Please mention a valid member.")
                .setColor("RED")
                .setFooter("Cereza Moderation")
                interaction.reply({embeds:[noTagEmbed],ephemeral: true})
                return
            }
    
            if(!reason){
                let noReasonEmbed = new MessageEmbed()
                 .setTitle("No reason provided")
                 .setDescription("Please provide a valid reason.")
                 .setColor("RED")
                 .setFooter("Cereza Moderation")
                 interaction.reply({embeds:[noReasonEmbed],ephemeral: true})
                 return
            }
            
           await  target.roles.add("861690102966648842")

           let MutedEmbed = new MessageEmbed()
           .setTitle("Muted Succesfully")
           .setDescription(`**${target.nickname}** had been muted. \n \n Reason: ${reason} Duration: ${duration}`)
           .setColor("PURPLE")
           .setFooter("Cereza Moderation")
           interaction.channel?.send({embeds:[MutedEmbed]})

            if (duration){
                setTimeout(async () => {
                    if (target){
                        if (target.roles.cache.has("861690102966648842")){
                            await target.roles.remove("861690102966648842")
                            let unmutedEmbed = new MessageEmbed()
                            .setTitle("System Notification")
                            .setDescription(`${target.nickname} has been unmuted automatically`)
                            .setColor("DARK_GREEN")
                            .setFooter("Cereza Moderation")
                            interaction.channel?.send({embeds:[unmutedEmbed]})
                        }
                    }

                },ms(duration))
            }
        return
        }catch(err){
            let errorEmbed = new MessageEmbed()
            .setTitle("Error has occured")
            .setDescription(`Error: ${err}`)
            .setColor("ORANGE")
            .setFooter("Cereza Error Handler")
            interaction.reply({embeds:[errorEmbed],ephemeral: true})

        }

       
    
    
    
    },

}as ICommand