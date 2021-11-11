import mongoose from "mongoose";

let Schema = new mongoose.Schema({


  RobloxUserID: String,
  DiscordID: String,
  Donator: Boolean

});
export default mongoose.model("Account", Schema)