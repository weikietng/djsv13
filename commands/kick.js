"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Moderation',
    description: 'Kicks a user',
    permissions: ['ADMINISTRATOR'],
    slash: 'both',
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: function (_a) {
        var _b;
        var message = _a.message, interaction = _a.interaction, args = _a.args;
        var target = message
            ? (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first()
            : interaction.options.getMember('user');
        if (!target) {
            return 'Please tag someone to kick.';
        }
        if (!target.kickable) {
            return {
                custom: true,
                content: 'Cannot kick that user.',
                ephemeral: true,
            };
        }
        var author = interaction.member;
        if (!author.roles.cache.has("861328403357892658")) {
            return 'No roles bitch';
        }
        args.shift();
        var reason = args.join(' ');
        target.kick(reason);
        return {
            custom: true,
            content: "You kicked <@" + target.id + ">",
            ephemeral: true,
        };
    },
};
