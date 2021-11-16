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
var noblox_js_1 = __importDefault(require("noblox.js"));
var account_1 = __importDefault(require("../models/account"));
var cash_1 = __importDefault(require("../models/cash"));
var gamebans_1 = __importDefault(require("../models/gamebans"));
var discord_js_1 = require("discord.js");
exports.default = {
    category: 'Utility',
    description: "Return with the user's profile",
    slash: true,
    expectedArgs: '[user]',
    expectedArgsTypes: ['USER'],
    callback: function (_a) {
        var message = _a.message, args = _a.args, interaction = _a.interaction;
        return __awaiter(void 0, void 0, void 0, function () {
            var target, verificationData, username, rank, avatar, cashdata, bandata, plrCash, banMessage, replyEmbed, NotVerified, err_1, ErrorEmbed;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        target = interaction.options.getMember('user') || interaction.member;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 10, , 11]);
                        return [4 /*yield*/, account_1.default.findOne({ DiscordID: "" + target.id })];
                    case 2:
                        verificationData = _b.sent();
                        if (!verificationData) return [3 /*break*/, 8];
                        return [4 /*yield*/, noblox_js_1.default.getUsernameFromId(verificationData.RobloxUserID)];
                    case 3:
                        username = _b.sent();
                        return [4 /*yield*/, noblox_js_1.default.getRankNameInGroup(5206353, Number(verificationData.RobloxUserID))];
                    case 4:
                        rank = _b.sent();
                        return [4 /*yield*/, noblox_js_1.default.getPlayerThumbnail(Number(verificationData.RobloxUserID), "150x150")];
                    case 5:
                        avatar = _b.sent();
                        return [4 /*yield*/, cash_1.default.findOne({ RobloxUserID: "" + verificationData.RobloxUserID })];
                    case 6:
                        cashdata = _b.sent();
                        return [4 /*yield*/, gamebans_1.default.findOne({ RobloxUserID: "" + verificationData.RobloxUserID })];
                    case 7:
                        bandata = _b.sent();
                        plrCash = cashdata.Cash || 0;
                        banMessage = "\n \n **__Ban Information__** \n Status: Not banned";
                        if (bandata) {
                            banMessage = "\n \n **__Ban Information__** \n Status: Banned \n Reason: " + bandata.Reason + " \n Moderator: " + bandata.Moderator;
                            banMessage;
                        }
                        replyEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("__**Profile**__")
                            .setDescription("Here's the profile. \n \n **Username: **" + username + " \n **Group Rank: **" + rank + " \n **Cash: **" + plrCash + banMessage)
                            .setThumbnail("" + avatar[0].imageUrl)
                            .setColor("#ffbb8a")
                            .setFooter("Cereza Core V2");
                        interaction.editReply({ embeds: [replyEmbed] });
                        return [3 /*break*/, 9];
                    case 8:
                        NotVerified = new discord_js_1.MessageEmbed()
                            .setTitle("No profile found")
                            .setDescription("You or the user you mentioned is not verified with Cereza System yet.")
                            .setColor("RED")
                            .setFooter("Cereza Core V2");
                        interaction.editReply({ embeds: [NotVerified] });
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        err_1 = _b.sent();
                        ErrorEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("Error Occurred")
                            .setDescription("" + err_1)
                            .setColor("RED")
                            .setFooter("Cereza Error Handler");
                        interaction.reply({ embeds: [ErrorEmbed] });
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    }
};
