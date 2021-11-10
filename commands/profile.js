"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var verification = require("../models/account");
exports.default = {
    category: 'Utility',
    description: 'Return with user profile',
    slash: "both",
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction;
        if (message) {
            message.reply(message.author.username + " testing");
        }
        if (interaction) {
            interaction.reply(interaction.user.username + " testing");
        }
    }
};
