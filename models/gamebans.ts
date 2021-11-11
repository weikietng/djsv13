import mongoose from "mongoose";

let Schema = new mongoose.Schema({


    RobloxUserID: String,
    Moderator: String,
    Reason: String

});
export default mongoose.model("GameBans", Schema)