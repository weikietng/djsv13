import { Client, ButtonInteraction, GuildMember, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'


export default {
    category: "Moderation",
    description: "Unmute a user",

    requireRoles: true,
    slash: true,


    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, interaction, args }) => {
        const target = interaction.options.getMember('user') as GuildMember

        if(target.roles.cache.has("861690102966648842")){
            await target.roles.remove("861690102966648842")
            let embed = new MessageEmbed()
            .setTitle("Unmuted Succesfully")
            .setDescription(`${target.nickname} had been unmuted succesfuly.`)
            .setFooter("Cereza Moderation")
            .setColor("DARK_GREEN")
        return interaction.reply({embeds:[embed]})
        }else{
            let embed = new MessageEmbed()
            .setTitle("Not Muted")
            .setDescription(`${target.nickname} is not muted.`)
            .setFooter("Cereza Moderation")
            .setColor("YELLOW")
        return interaction.reply({embeds:[embed]})

        }



    },}as ICommand