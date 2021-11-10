import { ICommand } from "wokcommands";
import mongoose from "mongoose";

const verification = require("../models/account");

export default{
    category: 'Utility',
    description: 'Replies with pong!',
    slash: true,


    callback:({message})=>{
      message.reply(`${message.author.id} testing`)
        

    }
} as ICommand