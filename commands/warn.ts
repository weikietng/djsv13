import { GuildMember, Message, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import warns from '../models/warns'

export default {
    category: 'Moderation',
    description: 'Warn a user',

    requireRoles: true,


    slash: true,


    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: async ({ message, interaction, args }) => {
        const moderator = interaction.member as GuildMember
        const target = interaction.options.getMember('user') as GuildMember
        const reason = interaction.options.getString('reason')
        let data = await warns.findOne({user:`${target.id}`})
        if(data){
            const obj = {
                moderator: moderator.nickname,
                reason : reason
            }
            await data.content.push(obj)
           await  data.save()
        }else{

            data = new warns({
                user : target.id,
                content : [
                    {
                        moderator : moderator.nickname,
                        reason : reason
                    }
                ]
            })
            await  data.save()
        }
        
        let warnSuccess = new MessageEmbed()
        .setTitle("**Warn Success**")
        .setDescription(`${target.nickname} had been warned. \n \n Reason: ${reason} \n Moderator: ${moderator.nickname}`)
        .setFooter("Cereza Moderation")
        .setColor("PURPLE")


        interaction.reply({embeds:[warnSuccess]})
        try{
            let warningTarget = new MessageEmbed()
            .setTitle("You have been warned at Cereza")
            .setDescription(`\n \n Reason: ${reason} \n Moderator: ${moderator.nickname}`)
            .setColor("PURPLE")
            .setFooter("Cereza Moderation")
            target.send({embeds:[warningTarget]})
        }catch(error){
            let DmError = new MessageEmbed()
            .setTitle("Error DMing the user")
            .setDescription(" The user has thier DM set to private. However, I have proceeded to warn them anyway.")
            .setColor("RED")
            .setFooter("Cereza Error Handler")
            interaction.followUp({embeds:[DmError]})
        }




    },} as ICommand