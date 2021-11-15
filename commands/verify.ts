import { Client, ButtonInteraction, GuildMember, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import axios from 'axios'
import noblox from 'noblox.js'
import verifiation from "../models/account"

export default {
    category: 'Setup',
    description: 'Setup verification button',

    slash: true,

    init: async(client: Client) => {
      client.on('interactionCreate', async(interaction) => {
        if (!interaction.isButton()) {
          return
        }
  
        const { customId, member,user } = interaction
  
        if (customId === 'Verification_Init' && member instanceof GuildMember) {
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
                    await interaction.reply({
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

                        const memberItem = member as GuildMember

                        try {
                            memberItem.setNickname(rUsernamefromID)
                            let rankName = await noblox.getRankNameInGroup(5206353, Number(data.robloxId))
                            let RankNumber = await noblox.getRankInGroup(5206353, Number(data.robloxId))
                           
                            await memberItem.roles.set([])

        
                            if (RankNumber>0){
                                let rRole = interaction.guild?.roles.cache.find(r => r.name === rankName)

                                console.log(rRole)
                                await memberItem.roles.add(`${rRole}`)
                                await memberItem.roles.add("852583076910727228")
                            }else{
                                await memberItem.roles.add("852583076910727228")
                            }

                            if(RankNumber >= 200){
                                await memberItem.roles.add(`${process.env.SuperRank}`)
                                await memberItem.roles.add(`${process.env.Emergency}`)
                                await memberItem.roles.add(`${process.env.Support}`)
                                await memberItem.roles.add(`${process.env.ServerAdministrator}`)
                                if(RankNumber >=220){
                                    await memberItem.roles.add("857544805298602004")
                                }
                            }else if (RankNumber>=121){
                                await memberItem.roles.add(`${process.env.HR}`)
                                await memberItem.roles.add(`${process.env.Emergency}`)
                                await memberItem.roles.add(`${process.env.Support}`)
                                await memberItem.roles.add(`${process.env.ServerAdministrator}`)

                            }else if (RankNumber>=70){
                                await memberItem.roles.add(`${process.env.MR}`)
                                await memberItem.roles.add(`${process.env.Emergency}`)
                            }else if(RankNumber>=7){
                                await memberItem.roles.add(`${process.env.LR}`)
                            }

                           
                            let verifiedEmbed = new MessageEmbed()
                                .setTitle("**Verification Success**")
                                .setDescription("\n Your roles should be updated within the next few minutes.")
                                .setFooter("Cereza Verification")
                                .setColor("GREEN")

                                await interaction.reply({
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
                            await interaction.reply({
                                embeds: [ErrorEmbed],
                                ephemeral: true
                            })
                            return

                        }


                    } else {




                    }

                    
                    interaction.reply({
                        content: ` (Will be fixed) You are already verified. Use /getroles to update your data instead.`,
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
                await interaction.reply({
                    embeds: [verifyPlsEmbed],
                    components: [verifyRow],
                    ephemeral: true
                })
                return
            }
  
          interaction.reply({
            content: 'Roles update!',
            ephemeral: true,
          })
        }
      })
    },
  

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

        /*const collector = channel.createMessageComponentCollector()

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
                               
                                await memberItem.roles.set([])

            
                                if (RankNumber>0){
                                    let rRole = i.guild?.roles.cache.find(r => r.name === rankName)

                                    console.log(rRole)
                                    await memberItem.roles.add(`${rRole}`)
                                    await memberItem.roles.add("852583076910727228")
                                }else{
                                    await memberItem.roles.add("852583076910727228")
                                }

                                if(RankNumber >= 200){
                                    await memberItem.roles.add(`${process.env.SuperRank}`)
                                    await memberItem.roles.add(`${process.env.Emergency}`)
                                    await memberItem.roles.add(`${process.env.Support}`)
                                    await memberItem.roles.add(`${process.env.ServerAdministrator}`)
                                    if(RankNumber >=220){
                                        await memberItem.roles.add("857544805298602004")
                                    }
                                }else if (RankNumber>=121){
                                    await memberItem.roles.add(`${process.env.HR}`)
                                    await memberItem.roles.add(`${process.env.Emergency}`)
                                    await memberItem.roles.add(`${process.env.Support}`)
                                    await memberItem.roles.add(`${process.env.ServerAdministrator}`)

                                }else if (RankNumber>=70){
                                    await memberItem.roles.add(`${process.env.MR}`)
                                    await memberItem.roles.add(`${process.env.Emergency}`)
                                }else if(RankNumber>=7){
                                    await memberItem.roles.add(`${process.env.LR}`)
                                }

                               
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



        })*/

    },
} as ICommand