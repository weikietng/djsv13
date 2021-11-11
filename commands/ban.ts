

import { GuildMember, Message, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Moderation',
    description: 'Bans a user',

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
                .setDescription("Please tag the user you are trying to ban.")
                .setFooter("Cereza Moderation")
                .setColor("RED")



            return noTagEmbed
        }



        if (!target.bannable) {
            let CannotKickEmbed = new MessageEmbed()
                .setTitle("**Unable to ban**")
                .setDescription("You can't ban this user.")
                .setFooter("Cereza Moderation")
                .setColor("RED")



            return CannotKickEmbed
        }


        args.shift()
        const reason = args.join(' ')

        if (!reason) {
            let noReasonEmbed = new MessageEmbed()
                .setTitle("**No reason provided**")
                .setDescription("You can't ban this user without a valid reason.")
                .setFooter("Cereza Moderation")
                .setColor("RED")



            return noReasonEmbed

        }
        if (Message) {
            let DMembed = new MessageEmbed()
                .setTitle("**Cereza Moderation**")
                .setDescription(`You have been banned from Cereza for ${reason}. \n \n Moderator: ${message.member?.displayName}`)
                .setFooter("Cereza Moderation")
                .setColor("ORANGE")

            try {
                target.send({ embeds: [DMembed] })

            } catch (error) {
                console.log(error)
                interaction.channel?.send({
                    embeds: [new MessageEmbed()
                        .setTitle("Error DM'ing user")
                        .setDescription("The user had their DM's set to private. \n However, I will proceed to ban them.")
                        .setFooter("Cereza Modetaion")
                        .setColor("YELLOW")
                    ]
                })

            }


            target.ban({ reason })

            let KickEmbed = new MessageEmbed()
                .setTitle("**Banned Succesfully**")
                .setDescription(`${target.user.username} had been banned. \n \n **Reason: ** ${reason} \n **Moderator:** ${message.member?.displayName}`)
                .setFooter("Cereza Moderation")
                .setColor("DARK_PURPLE")

            return KickEmbed

        } else {
            let DMembed = new MessageEmbed()
                .setTitle("**Cereza Moderation**")
                .setDescription(`You have been banned from Cereza for ${reason}. \n \n Moderator: ${interaction.user.username}`)
                .setFooter("Cereza Moderation")
                .setColor("ORANGE")

            try {
                target.send({ embeds: [DMembed] })

            } catch (error) {
                console.log(error)
                interaction.channel?.send({
                    embeds: [new MessageEmbed()
                        .setTitle("Error DM'ing user")
                        .setDescription("The user had their DM's set to private. \n However, I will proceed to ban them.")
                        .setFooter("Cereza Modetaion")
                        .setColor("YELLOW")
                    ]
                })

            }


            target.ban({ reason })

            let BanEmbed = new MessageEmbed()
                .setTitle("**Banned Succesfully**")
                .setDescription(`${target.user.username} had been banned. \n \n **Reason: ** ${reason} \n **Moderator:** ${interaction.user.username}`)
                .setFooter("Cereza Moderation")
                .setColor("DARK_PURPLE")

            return BanEmbed


        }

    },
} as ICommand
