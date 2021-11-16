import { GuildMember, Message, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import warns from '../models/warns'

export default {
    category: 'Moderation',
    description: "Checks a user's warnings",

    requireRoles: true,


    slash: true,


    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, interaction, args }) => {
        const target = interaction.options.getMember('user') as GuildMember
        let data = await warns.findOne({user: `${target.id}`})

        
        if(data){

            let warningsEmbed = new MessageEmbed()
            .setTitle(`Warnings for **${target.nickname}**`)
            .setDescription(`${data.content}`)
            .setColor("PURPLE")
            .setFooter("Cereza Moderation")

            interaction.reply({embeds:[warningsEmbed]})

        }else{
            return "No warning found."
        }
       



    },}as ICommand