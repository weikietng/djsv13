import { ICommand } from "wokcommands";

export default{
    category: 'Utility',
    description: 'Replies with pong!',
    slash: true,


    callback:({interaction})=>{
      return 'Pong!'
        

    }
} as ICommand