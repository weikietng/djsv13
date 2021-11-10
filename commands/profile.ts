import { ICommand } from "wokcommands";
import mongoose from "mongoose";

const verification = require("../models/account");

export default{
    category: 'Utility',
    description: 'Return with user profile',
    slash: "both",


    callback:({message,interaction})=>{
        if (message){
            message.reply(`${message.author.username} testing`)
        }
      if(interaction){
        interaction.reply(`${interaction.user.username} testing`)
      }
        

    }
} as ICommand