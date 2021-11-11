"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
    category: 'Moderation',
    description: 'Kicks a user',
    requireRoles: true,
    slash: 'both',
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: function (_a) {
        var _b, _c, _d, _e, _f;
        var message = _a.message, interaction = _a.interaction, args = _a.args;
        var target = message
            ? (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first()
            : interaction.options.getMember('user');
        if (!target) {
            var noTagEmbed = new discord_js_1.MessageEmbed()
                .setTitle("**No user provided**")
                .setDescription("Please tag the user you are trying to kick.")
                .setFooter("Cereza Moderation")
                .setColor("RED");
            return noTagEmbed;
        }
        if (!target.kickable) {
            var CannotKickEmbed = new discord_js_1.MessageEmbed()
                .setTitle("**Unable to kick**")
                .setDescription("You can't kick this user.")
                .setFooter("Cereza Moderation")
                .setColor("RED");
            return CannotKickEmbed;
        }
        args.shift();
        var reason = args.join(' ');
        if (!reason) {
            var noReasonEmbed = new discord_js_1.MessageEmbed()
                .setTitle("**No reason provided**")
                .setDescription("You can't kick this user without a valid reason.")
                .setFooter("Cereza Moderation")
                .setColor("RED");
            return noReasonEmbed;
        }
        if (discord_js_1.Message) {
            var DMembed = new discord_js_1.MessageEmbed()
                .setTitle("**Cereza Moderation**")
                .setDescription("You have been kicked from Cereza for " + reason + ". \n \n Moderator: " + ((_c = message.member) === null || _c === void 0 ? void 0 : _c.displayName))
                .setFooter("Cereza Moderation")
                .setColor("ORANGE");
            try {
                target.send({ embeds: [DMembed] });
            }
            catch (error) {
                console.log(error);
                (_d = interaction.channel) === null || _d === void 0 ? void 0 : _d.send({ embeds: [new discord_js_1.MessageEmbed()
                            .setTitle("Error DM'ing user")
                            .setDescription("The user had their DM's set to private. \n However, I will proceed to kick them.")
                            .setFooter("Cereza Modetaion")
                            .setColor("YELLOW")
                    ] });
            }
            target.kick(reason);
            var KickEmbed = new discord_js_1.MessageEmbed()
                .setTitle("**Kicked Succesfully**")
                .setDescription(target.user.username + " had been kicked. \n \n **Reason: ** " + reason + " \n **Moderator:** " + ((_e = message.member) === null || _e === void 0 ? void 0 : _e.displayName))
                .setFooter("Cereza Moderation")
                .setColor("PURPLE");
            return KickEmbed;
        }
        else {
            var DMembed = new discord_js_1.MessageEmbed()
                .setTitle("**Cereza Moderation**")
                .setDescription("You have been kicked from Cereza for " + reason + ". \n \n Moderator: " + interaction.user.username)
                .setFooter("Cereza Moderation")
                .setColor("ORANGE");
            try {
                target.send({ embeds: [DMembed] });
            }
            catch (error) {
                console.log(error);
                (_f = interaction.channel) === null || _f === void 0 ? void 0 : _f.send({ embeds: [new discord_js_1.MessageEmbed()
                            .setTitle("Error DM'ing user")
                            .setDescription("The user had their DM's set to private. \n However, I will proceed to kick them.")
                            .setFooter("Cereza Modetaion")
                            .setColor("YELLOW")
                    ] });
            }
            target.kick(reason);
            var KickEmbed = new discord_js_1.MessageEmbed()
                .setTitle("**Kicked Succesfully**")
                .setDescription(target.user.username + " had been kicked. \n \n **Reason: ** " + reason + " \n **Moderator:** " + interaction.user.username)
                .setFooter("Cereza Moderation")
                .setColor("PURPLE");
            return KickEmbed;
        }
    },
};
