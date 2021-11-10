"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Utility',
    description: 'Replies with pong!',
    slash: true,
    callback: function (_a) {
        var interaction = _a.interaction;
        return 'Pong!';
    }
};
