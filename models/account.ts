const mongoose = require("mongoose");
let Schema = new mongoose.Schema({


  RobloxUserID: String,
  DiscordID: String,
  Donator: Boolean

});
module.exports = mongoose.model("Account", Schema);