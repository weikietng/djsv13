import mongoose from "mongoose";

const schema = new mongoose.Schema({
    RobloxUserID: { Type: String },
    DiscordID: { Type: String },
    Donator: { Type: Boolean }
})

export default mongoose.model("Account", schema)