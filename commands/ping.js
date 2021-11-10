"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Utility',
    description: 'Replies with pong!',
    callback: function (_a) {
        var message = _a.message;
        message.reply('Pong!');
    }
};
