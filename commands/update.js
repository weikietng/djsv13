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
var noblox_js_1 = __importDefault(require("noblox.js"));
var account_1 = __importDefault(require("../models/account"));
exports.default = {
    category: 'Verification',
    description: "Updates a user's role",
    requireRoles: true,
    slash: true,
    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var target, noTagEmbed, data1, RobloxUserID, rUsernamefromID, rankName_1, RankNumber, rRole, verifiedEmbed, error_1, ErrorEmbed, noVerifyEmbed;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        target = message
                            ? (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first()
                            : interaction.options.getMember('user');
                        if (!target) {
                            noTagEmbed = new discord_js_1.MessageEmbed()
                                .setTitle("**No user provided**")
                                .setDescription("Please tag the user you are trying to update.")
                                .setFooter("Cereza Moderation")
                                .setColor("RED");
                            return [2 /*return*/, noTagEmbed];
                        }
                        return [4 /*yield*/, account_1.default.findOne({ DiscordID: "" + target.id })];
                    case 1:
                        data1 = _d.sent();
                        if (!data1) return [3 /*break*/, 30];
                        RobloxUserID = data1.RobloxUserID;
                        return [4 /*yield*/, noblox_js_1.default.getUsernameFromId(Number(RobloxUserID))];
                    case 2:
                        rUsernamefromID = _d.sent();
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 27, , 29]);
                        target.setNickname(rUsernamefromID);
                        return [4 /*yield*/, noblox_js_1.default.getRankNameInGroup(5206353, Number(RobloxUserID))];
                    case 4:
                        rankName_1 = _d.sent();
                        return [4 /*yield*/, noblox_js_1.default.getRankInGroup(5206353, Number(RobloxUserID))];
                    case 5:
                        RankNumber = _d.sent();
                        target.roles.set([]);
                        if (!(RankNumber > 0)) return [3 /*break*/, 7];
                        rRole = (_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.roles.cache.find(function (r) { return r.name === rankName_1; });
                        console.log(rRole);
                        return [4 /*yield*/, target.roles.add("" + rRole)];
                    case 6:
                        _d.sent();
                        _d.label = 7;
                    case 7:
                        if (!(RankNumber >= 200)) return [3 /*break*/, 14];
                        return [4 /*yield*/, target.roles.add("" + process.env.SuperRank)];
                    case 8:
                        _d.sent();
                        return [4 /*yield*/, target.roles.add("" + process.env.Emergency)];
                    case 9:
                        _d.sent();
                        return [4 /*yield*/, target.roles.add("" + process.env.Support)];
                    case 10:
                        _d.sent();
                        return [4 /*yield*/, target.roles.add("" + process.env.ServerAdministrator)];
                    case 11:
                        _d.sent();
                        if (!(RankNumber >= 220)) return [3 /*break*/, 13];
                        return [4 /*yield*/, target.roles.add("857544805298602004")];
                    case 12:
                        _d.sent();
                        _d.label = 13;
                    case 13: return [3 /*break*/, 24];
                    case 14:
                        if (!(RankNumber >= 121)) return [3 /*break*/, 19];
                        return [4 /*yield*/, target.roles.add("" + process.env.HR)];
                    case 15:
                        _d.sent();
                        return [4 /*yield*/, target.roles.add("" + process.env.Emergency)];
                    case 16:
                        _d.sent();
                        return [4 /*yield*/, target.roles.add("" + process.env.Support)];
                    case 17:
                        _d.sent();
                        return [4 /*yield*/, target.roles.add("" + process.env.ServerAdministrator)];
                    case 18:
                        _d.sent();
                        return [3 /*break*/, 24];
                    case 19:
                        if (!(RankNumber >= 70)) return [3 /*break*/, 22];
                        return [4 /*yield*/, target.roles.add("" + process.env.MR)];
                    case 20:
                        _d.sent();
                        return [4 /*yield*/, target.roles.add("" + process.env.Emergency)];
                    case 21:
                        _d.sent();
                        return [3 /*break*/, 24];
                    case 22:
                        if (!(RankNumber >= 7)) return [3 /*break*/, 24];
                        return [4 /*yield*/, target.roles.add("" + process.env.LR)];
                    case 23:
                        _d.sent();
                        _d.label = 24;
                    case 24: return [4 /*yield*/, target.roles.add("852583076910727228")];
                    case 25:
                        _d.sent();
                        verifiedEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("**Verification Success**")
                            .setDescription("\n " + target.nickname + "'s roles should be updated within the next few minutes.")
                            .setFooter("Cereza Verification")
                            .setColor("GREEN");
                        return [4 /*yield*/, interaction.reply({
                                embeds: [verifiedEmbed]
                            })];
                    case 26:
                        _d.sent();
                        return [2 /*return*/];
                    case 27:
                        error_1 = _d.sent();
                        ErrorEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("**Error Occurred**")
                            .setDescription("\n Please screenshot this and send this to DamienAngel0828 \n \n " + error_1)
                            .setColor("RED")
                            .setFooter("Cereza Verification");
                        return [4 /*yield*/, interaction.reply({
                                embeds: [ErrorEmbed]
                            })];
                    case 28:
                        _d.sent();
                        return [2 /*return*/];
                    case 29: return [3 /*break*/, 31];
                    case 30:
                        noVerifyEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("**No verification data found**")
                            .setDescription("Please ensure the user is verified first.")
                            .setFooter("Cereza Moderation")
                            .setColor("RED");
                        return [2 /*return*/, noVerifyEmbed];
                    case 31: return [2 /*return*/];
                }
            });
        });
    },
};
