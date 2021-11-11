import mongoose from "mongoose";

let Schema = new mongoose.Schema({


    RobloxUserID: String,
    Cash: String

});
export default mongoose.model("Money", Schema)