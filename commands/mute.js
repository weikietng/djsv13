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
var ms_1 = __importDefault(require("ms"));
exports.default = {
    category: "Moderation",
    description: "Mute a user",
    requireRoles: true,
    slash: true,
    minArgs: 2,
    expectedArgs: '<user> <reason> [duration]',
    expectedArgsTypes: ['USER', 'STRING', 'STRING'],
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var target_1, reason, duration, noTagEmbed, noReasonEmbed, MutedEmbed, err_1, errorEmbed;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        target_1 = interaction.options.getMember('user');
                        reason = interaction.options.getString('reason');
                        duration = interaction.options.getString('duration') || "1h";
                        if (!target_1) {
                            noTagEmbed = new discord_js_1.MessageEmbed()
                                .setTitle("No user")
                                .setDescription("Please mention a valid member.")
                                .setColor("RED")
                                .setFooter("Cereza Moderation");
                            interaction.reply({ embeds: [noTagEmbed], ephemeral: true });
                            return [2 /*return*/];
                        }
                        if (!reason) {
                            noReasonEmbed = new discord_js_1.MessageEmbed()
                                .setTitle("No reason provided")
                                .setDescription("Please provide a valid reason.")
                                .setColor("RED")
                                .setFooter("Cereza Moderation");
                            interaction.reply({ embeds: [noReasonEmbed], ephemeral: true });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, target_1.roles.add("861690102966648842")];
                    case 1:
                        _c.sent();
                        MutedEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("Muted Succesfully")
                            .setDescription("**" + target_1.nickname + "** had been muted. \n \n Reason: " + reason + " \n Duration: " + duration)
                            .setColor("PURPLE")
                            .setFooter("Cereza Moderation");
                        (_b = interaction.channel) === null || _b === void 0 ? void 0 : _b.send({ embeds: [MutedEmbed] });
                        setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var unmutedEmbed;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!target_1) return [3 /*break*/, 2];
                                        if (!target_1.roles.cache.has("861690102966648842")) return [3 /*break*/, 2];
                                        return [4 /*yield*/, target_1.roles.remove("861690102966648842")];
                                    case 1:
                                        _b.sent();
                                        unmutedEmbed = new discord_js_1.MessageEmbed()
                                            .setTitle("System Notification")
                                            .setDescription(target_1.nickname + " has been unmuted automatically")
                                            .setColor("DARK_GREEN")
                                            .setFooter("Cereza Moderation");
                                        return [2 /*return*/, (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send({ embeds: [unmutedEmbed] })];
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); }, (0, ms_1.default)(duration));
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _c.sent();
                        errorEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("Error has occured")
                            .setDescription("Error: " + err_1)
                            .setColor("ORANGE")
                            .setFooter("Cereza Error Handler");
                        return [2 /*return*/, interaction.reply({ embeds: [errorEmbed], ephemeral: true })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
};
