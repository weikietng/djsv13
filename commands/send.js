"use strict";
// module.exports = {}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Configuration',
    description: 'Sends a message.',
    permissions: ['ADMINISTRATOR'],
    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],
    slash: 'both',
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction, args = _a.args;
        var channel = (message
            ? message.mentions.channels.first()
            : interaction.options.getChannel('channel'));
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel.';
        }
        args.shift(); // Remove the channel from the arguments array
        var text = args.join(' ');
        channel.send(text);
        if (interaction) {
            interaction.reply({
                content: 'Send message!',
                ephemeral: true,
            });
        }
    },
};
