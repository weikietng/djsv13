import { GuildMember, PartialTextBasedChannel } from "discord.js";
import { ICommand } from "wokcommands";
import noblox from "noblox.js";

import verification from "../models/account";
import cash from "../models/cash";
import bans from "../models/gamebans";
import { MessageEmbed } from "discord.js";




export default {
  category: 'Utility',
  description: "Return with the user's profile",
  slash: true,

  expectedArgs: '[user]',
  expectedArgsTypes: ['USER'],

  callback: async ({interaction }) => {

    
    const target = interaction.options.getMember('user') as GuildMember || interaction.member as GuildMember
    try {
      let loadingEmbed = new MessageEmbed()
      .setTitle("**Fetching Profile.......**")
      .setColor("YELLOW")
      .setFooter("Cereza Core V2")

      interaction.reply({embeds:[loadingEmbed]})

      let verificationData = await verification.findOne({ DiscordID: `${target.id}` })
      if (verificationData) {
        let username = await noblox.getUsernameFromId(verificationData.RobloxUserID)
        let rank = await noblox.getRankNameInGroup(5206353, Number(verificationData.RobloxUserID))
        let avatar = await noblox.getPlayerThumbnail(Number(verificationData.RobloxUserID),"150x150")

        let cashdata = await cash.findOne({RobloxUserID: `${verificationData.RobloxUserID}`})
        let bandata = await bans.findOne({RobloxUserID: `${verificationData.RobloxUserID}`})
        let plrCash = cashdata.Cash || 0
        let banMessage = `\n \n **__Ban Information__** \n Status: Not banned`
        if (bandata){
          banMessage = `\n \n **__Ban Information__** \n Status: Banned \n Reason: ${bandata.Reason} \n Moderator: ${bandata.Moderator}`
          banMessage
        }
        let replyEmbed = new MessageEmbed()
        .setTitle("__**Profile**__")
        .setDescription(`Here's the profile. \n \n **Username: **${username} \n **Group Rank: **${rank} \n **Cash: **${plrCash}` + banMessage)
        .setThumbnail(`${avatar[0].imageUrl}`)
        .setColor("#ffbb8a")
        .setFooter("Cereza Core V2")

        interaction.editReply({embeds:[replyEmbed]})
      } else {
        let NotVerified = new MessageEmbed()
        .setTitle("No profile found")
        .setDescription("You or the user you mentioned is not verified with Cereza System yet.")
        .setColor("RED")
        .setFooter("Cereza Core V2")
        interaction.editReply({embeds:[NotVerified]})
      }

    } catch (err) {
      let ErrorEmbed = new MessageEmbed()
      .setTitle("Error Occurred")
      .setDescription(`${err}`)
      .setColor("RED")
      .setFooter("Cereza Error Handler")

      return interaction.channel?.send({embeds:[ErrorEmbed]})
      

    }




  }
} as ICommand