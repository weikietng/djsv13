

import { GuildMember,Message,MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
  category: 'Moderation',
  description: 'Kicks a user',

  requireRoles: true,
  

  slash: 'both',


  minArgs: 2,
  expectedArgs: '<user> <reason>',
  expectedArgsTypes: ['USER', 'STRING'],

  callback: ({ message, interaction, args }) => {
    const target = message
      ? message.mentions.members?.first()
      : (interaction.options.getMember('user') as GuildMember)

     

    if (!target) {
        let noTagEmbed = new MessageEmbed()
        .setTitle("**No user provided**")
        .setDescription("Please tag the user you are trying to kick.")
        .setFooter("Cereza Moderation")
        .setColor("RED")

    
  
    return noTagEmbed
    }

    

    if (!target.kickable) {
        let CannotKickEmbed = new MessageEmbed()
            .setTitle("**Unable to kick**")
            .setDescription("You can't kick this user.")
            .setFooter("Cereza Moderation")
            .setColor("RED")

        
      
        return CannotKickEmbed
    }
    

    args.shift()
    const reason = args.join(' ')

    if (!reason){
        let noReasonEmbed = new MessageEmbed()
            .setTitle("**No reason provided**")
            .setDescription("You can't kick this user without a valid reason.")
            .setFooter("Cereza Moderation")
            .setColor("RED")

        
      
        return noReasonEmbed

    }
    if (Message){
        let DMembed = new MessageEmbed()
        .setTitle("**Cereza Moderation**")
        .setDescription(`You have been kicked from Cereza for ${reason}. \n \n Moderator: ${message.member?.displayName}`)
        .setFooter("Cereza Moderation")
        .setColor("ORANGE")
    
    try{
        target.send({embeds: [DMembed]})

    }catch(error){
        console.log(error)
        interaction.channel?.send({embeds:[new MessageEmbed()
            .setTitle("Error DM'ing user")
            .setDescription("The user had their DM's set to private. \n However, I will proceed to kick them.")
            .setFooter("Cereza Modetaion")
            .setColor("YELLOW")
        ]})

    }


    target.kick(reason)

    let KickEmbed = new MessageEmbed()
    .setTitle("**Kicked Succesfully**")
    .setDescription(`${target.user.username} had been kicked. \n \n **Reason: ** ${reason} \n **Moderator:** ${message.member?.displayName}`)
    .setFooter("Cereza Moderation")
    .setColor("PURPLE")

    return KickEmbed
    }else{
        let DMembed = new MessageEmbed()
        .setTitle("**Cereza Moderation**")
        .setDescription(`You have been kicked from Cereza for ${reason}. \n \n Moderator: ${interaction.user.username}`)
        .setFooter("Cereza Moderation")
        .setColor("ORANGE")
    
    try{
        target.send({embeds: [DMembed]})

    }catch(error){
        console.log(error)
        interaction.channel?.send({embeds:[new MessageEmbed()
            .setTitle("Error DM'ing user")
            .setDescription("The user had their DM's set to private. \n However, I will proceed to kick them.")
            .setFooter("Cereza Modetaion")
            .setColor("YELLOW")
        ]})

    }


    target.kick(reason)

    let KickEmbed = new MessageEmbed()
    .setTitle("**Kicked Succesfully**")
    .setDescription(`${target.user.username} had been kicked. \n \n **Reason: ** ${reason} \n **Moderator:** ${interaction.user.username}`)
    .setFooter("Cereza Moderation")
    .setColor("PURPLE")

    return KickEmbed

    }
    
  },
} as ICommand
