import { ButtonInteraction, GuildMember, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import verification from "../models/account"
import noblox from "noblox.js"
import axios from "axios"


export default {
    category: 'Verification',
    description: 'Reverify your account/switch your account.',


    slash: true,


    callback: async ({ interaction: msgInt, channel }) => {
        const dataCheck = await verification.findOne({ DiscordID: `${msgInt.user.id}` })

        if (dataCheck) {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setURL('https://rover.link/login/')
                        .setLabel('Go to RoVer')
                        .setStyle('LINK')
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId('Reverification_Init')
                        .setEmoji('✔️')
                        .setLabel('Done')
                        .setStyle('SUCCESS')
                )
            const initEmbed = new MessageEmbed()
                .setTitle("**Switch Account**")
                .setDescription("\n 1. Click on the 'Go to Rover' button below and head to RoVer. \n 2. Log in with your Discord. \n 3. Click on 'Change' to change your verified account. \n 4. Follow the instruction on RoVer's website. \n 5. Click on the 'Done' button below.")
                .setFooter("Cereza Verification")
                .setColor("BLUE")

            await msgInt.reply({ embeds: [initEmbed], components:[row], ephemeral: true })






            const collector = channel.createMessageComponentCollector()

            collector.on('collect', async (i: ButtonInteraction) => {
                if (i.user.id === msgInt.user.id) {
                    if (i.customId === 'Reverification_Init') {
                        try {
                            const uri = `https://verify.eryn.io/api/user/${msgInt.user.id}`
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
                                let newRobloxID = data.robloxId
                                let rUsernamefromID = await noblox.getUsernameFromId(Number(data.robloxId))
                                let playerID = `${data.robloxId}`
                                await verification.findOneAndUpdate({ DiscordID: `${msgInt.user.id}` }, { RobloxUserID: playerID, DiscordID: msgInt.user.id })
                                try {
                                    const memberItem = msgInt.member as GuildMember
                                    memberItem.setNickname(rUsernamefromID)
                                    let rankName = await noblox.getRankNameInGroup(5206353, Number(data.robloxId))
                                    let RankNumber = await noblox.getRankInGroup(5206353, Number(data.robloxId))
                                    memberItem.roles.set([])
                                    await memberItem.roles.add("852583076910727228")
            
                                    if (RankNumber>0){
                                        let rRole = i.guild?.roles.cache.find(r => r.name === rankName)
    
                                        console.log(rRole)
                                        await memberItem.roles.add(`${rRole}`)
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
    
                                    await memberItem.roles.add("852583076910727228")

                                    const SuccessEmbed = new MessageEmbed()
                                        .setTitle("**Reverification Success**")
                                        .setDescription(`You are now reverified as **${rUsernamefromID}**!`)
                                        .setColor("DARK_GREEN")
                                        .setFooter("Cereza Verification")
                                    await msgInt.editReply({ embeds: [SuccessEmbed],components:[] })
                                    return
                                } catch (error){
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

                }
            })

            collector.on('end', async (collection) => {
                collection.forEach((click) => {
                    console.log(click.user.id, click.customId)
                })

            })
        } else {
            let verifyPlsEmbed = new MessageEmbed()
                .setTitle("**You are not verified**")
                .setDescription("Please verify yourself by heading to the authorization channel.")
                .setColor("YELLOW")
                .setFooter("Cereza Verification")
            await msgInt.reply({
                embeds: [verifyPlsEmbed],

                ephemeral: true
            })

        }






    },
} as ICommand