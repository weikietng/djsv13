import { ICommand } from "wokcommands";
import mongoose from "mongoose";

const verification = require("../models/account");

export default{
    category: 'Utility',
    description: 'Return with user profile',
    


    callback:({message})=>{
      message.reply(`${message.author.id} testing`)
        

    }
} as ICommand