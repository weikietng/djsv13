"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var verification = require("../models/account");
exports.default = {
    category: 'Utility',
    description: 'Replies with pong!',
    slash: true,
    callback: function (_a) {
        var message = _a.message;
        message.reply(message.author.id + " testing");
    }
};
