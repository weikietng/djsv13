import { ICommand } from "wokcommands";

export default{
    category: 'Utility',
    description: 'Replies with pong!',

    callback:({message})=>{
        message.reply('Pong!')
    }
} as ICommand