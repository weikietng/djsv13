"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var warns_1 = __importDefault(require("../models/warns"));
exports.default = {
    category: 'Moderation',
    description: 'Warn a user',
    requireRoles: true,
    slash: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var moderator, target, reason, data, obj, warnSuccess, warningTarget, DmError;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        moderator = interaction.member;
                        target = interaction.options.getMember('user');
                        reason = interaction.options.getString('reason');
                        return [4 /*yield*/, warns_1.default.findOne({ user: "" + target.id })];
                    case 1:
                        data = _b.sent();
                        if (!data) return [3 /*break*/, 4];
                        obj = {
                            moderator: moderator.nickname,
                            reason: reason
                        };
                        return [4 /*yield*/, data.content.push(obj)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, data.save()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        data = new warns_1.default({
                            user: target.id,
                            content: [
                                {
                                    moderator: moderator.nickname,
                                    reason: reason
                                }
                            ]
                        });
                        return [4 /*yield*/, data.save()];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        warnSuccess = new discord_js_1.MessageEmbed()
                            .setTitle("**Warn Success**")
                            .setDescription(target.nickname + " had been warned. \n \n Reason: " + reason + " \n Moderator: " + moderator.nickname)
                            .setFooter("Cereza Moderation")
                            .setColor("PURPLE");
                        interaction.reply({ embeds: [warnSuccess] });
                        try {
                            warningTarget = new discord_js_1.MessageEmbed()
                                .setTitle("You have been warned at Cereza")
                                .setDescription("\n \n Reason: " + reason + " \n Moderator: " + moderator.nickname)
                                .setColor("PURPLE")
                                .setFooter("Cereza Moderation");
                            target.send({ embeds: [warningTarget] });
                        }
                        catch (error) {
                            DmError = new discord_js_1.MessageEmbed()
                                .setTitle("Error DMing the user")
                                .setDescription(" The user has thier DM set to private. However, I have proceeded to warn them anyway.")
                                .setColor("RED")
                                .setFooter("Cereza Error Handler");
                            interaction.followUp({ embeds: [DmError] });
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
};
