"use strict";
var mongoose = require("mongoose");
var Schema = new mongoose.Schema({
    RobloxUserID: String,
    DiscordID: String,
    Donator: Boolean
});
module.exports = mongoose.model("Account", Schema);
