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
var account_1 = __importDefault(require("../models/account"));
var noblox_js_1 = __importDefault(require("noblox.js"));
var GROUPID = 5206353;
exports.default = {
    category: 'Moderation',
    description: 'Kicks a user',
    requireRoles: true,
    slash: true,
    expectedArgs: '[discord user] [roblox user] [rank] [rank number]',
    expectedArgsTypes: ['USER', 'STRING', 'STRING', 'STRING'],
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var target, targetRUser, rank, rankNumber, data, rUserID, RankedSuccesfulEmbed, err_1, errorEmbed, numberRank, RankedSuccesfulEmbed, err_2, errorEmbed, UnverifiedEmbed, rUserId, RankedSuccesfulEmbed, err_3, errorEmbed, numberRank, RankedSuccesfulEmbed, err_4, errorEmbed;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        target = interaction.options.getMember("discord user");
                        targetRUser = interaction.options.getString("roblox user");
                        rank = interaction.options.getString("rank");
                        rankNumber = interaction.options.getString("rank number");
                        if (!target) return [3 /*break*/, 13];
                        return [4 /*yield*/, account_1.default.findOne({ DiscordID: "" + target.id })];
                    case 1:
                        data = _b.sent();
                        if (!data) return [3 /*break*/, 11];
                        rUserID = data.RobloxUserID;
                        if (!rank) return [3 /*break*/, 6];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, noblox_js_1.default.setRank(GROUPID, rUserID, rank)];
                    case 3:
                        _b.sent();
                        RankedSuccesfulEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("Ranked Succesfuly")
                            .setDescription("The user's rank in group should change shortly.")
                            .setFooter("Cereza Ranking")
                            .setColor("GREEN");
                        return [2 /*return*/, interaction.reply({ embeds: [RankedSuccesfulEmbed] })];
                    case 4:
                        err_1 = _b.sent();
                        errorEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("Error has occured")
                            .setDescription("" + err_1)
                            .setFooter("Cereza Error Handler")
                            .setColor("ORANGE");
                        return [2 /*return*/, interaction.reply({ embeds: [errorEmbed] })];
                    case 5: return [3 /*break*/, 10];
                    case 6:
                        if (!rankNumber) return [3 /*break*/, 10];
                        numberRank = parseInt(rankNumber);
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, noblox_js_1.default.setRank(GROUPID, rUserID, numberRank)];
                    case 8:
                        _b.sent();
                        RankedSuccesfulEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("Ranked Succesfuly")
                            .setDescription("The user's rank in group should change shortly.")
                            .setFooter("Cereza Ranking")
                            .setColor("GREEN");
                        return [2 /*return*/, interaction.reply({ embeds: [RankedSuccesfulEmbed] })];
                    case 9:
                        err_2 = _b.sent();
                        errorEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("Error has occured")
                            .setDescription("" + err_2)
                            .setFooter("Cereza Error Handler")
                            .setColor("ORANGE");
                        return [2 /*return*/, interaction.reply({ embeds: [errorEmbed] })];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        UnverifiedEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("User is unverified")
                            .setDescription("Please make sure the user is verified in our Discord server.")
                            .setColor("RED")
                            .setFooter("Cereza Verification");
                        return [2 /*return*/, interaction.reply({ embeds: [UnverifiedEmbed] })];
                    case 12: return [3 /*break*/, 23];
                    case 13:
                        if (!targetRUser) return [3 /*break*/, 23];
                        return [4 /*yield*/, noblox_js_1.default.getIdFromUsername(targetRUser)];
                    case 14:
                        rUserId = _b.sent();
                        if (!rank) return [3 /*break*/, 19];
                        _b.label = 15;
                    case 15:
                        _b.trys.push([15, 17, , 18]);
                        return [4 /*yield*/, noblox_js_1.default.setRank(GROUPID, rUserId, rank)];
                    case 16:
                        _b.sent();
                        RankedSuccesfulEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("Ranked Succesfuly")
                            .setDescription("The user's rank in group should change shortly.")
                            .setFooter("Cereza Ranking")
                            .setColor("GREEN");
                        return [2 /*return*/, interaction.reply({ embeds: [RankedSuccesfulEmbed] })];
                    case 17:
                        err_3 = _b.sent();
                        errorEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("Error has occured")
                            .setDescription("" + err_3)
                            .setFooter("Cereza Error Handler")
                            .setColor("ORANGE");
                        return [2 /*return*/, interaction.reply({ embeds: [errorEmbed] })];
                    case 18: return [3 /*break*/, 23];
                    case 19:
                        if (!rankNumber) return [3 /*break*/, 23];
                        numberRank = parseInt(rankNumber);
                        _b.label = 20;
                    case 20:
                        _b.trys.push([20, 22, , 23]);
                        return [4 /*yield*/, noblox_js_1.default.setRank(GROUPID, rUserId, numberRank)];
                    case 21:
                        _b.sent();
                        RankedSuccesfulEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("Ranked Succesfuly")
                            .setDescription("The user's rank in group should change shortly.")
                            .setFooter("Cereza Ranking")
                            .setColor("GREEN");
                        return [2 /*return*/, interaction.reply({ embeds: [RankedSuccesfulEmbed] })];
                    case 22:
                        err_4 = _b.sent();
                        errorEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("Error has occured")
                            .setDescription("" + err_4)
                            .setFooter("Cereza Error Handler")
                            .setColor("ORANGE");
                        return [2 /*return*/, interaction.reply({ embeds: [errorEmbed] })];
                    case 23: return [2 /*return*/];
                }
            });
        });
    }
};
