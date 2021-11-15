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
var axios_1 = __importDefault(require("axios"));
var noblox_js_1 = __importDefault(require("noblox.js"));
var account_1 = __importDefault(require("../models/account"));
exports.default = {
    category: 'Setup',
    description: 'Setup verification button',
    slash: true,
    init: function (client) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            client.on('interactionCreate', function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
                var customId, member, user, uri, data, verifyRow, verifyPlsEmbed, data1, rUsernamefromID, playerID, newPlayerDataInstance, memberItem, rankName_1, RankNumber, rRole, verifiedEmbed, error_1, ErrorEmbed, target, RobloxUserID, rUsernamefromID, rankName_2, RankNumber, rRole, verifiedEmbed, error_2, ErrorEmbed, err_1, verifyRow, verifyPlsEmbed;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!interaction.isButton()) {
                                return [2 /*return*/];
                            }
                            customId = interaction.customId, member = interaction.member, user = interaction.user;
                            if (!(customId === 'Verification_Init' && member instanceof discord_js_1.GuildMember)) return [3 /*break*/, 72];
                            uri = "https://verify.eryn.io/api/user/" + user.id;
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 70, , 72]);
                            return [4 /*yield*/, axios_1.default.get(uri)];
                        case 2:
                            data = (_c.sent()).data;
                            if (!(data.status === "error")) return [3 /*break*/, 4];
                            verifyRow = new discord_js_1.MessageActionRow()
                                .addComponents(new discord_js_1.MessageButton()
                                .setURL('https://rover.link/login/')
                                .setLabel('Verify account here')
                                .setStyle('LINK'));
                            verifyPlsEmbed = new discord_js_1.MessageEmbed()
                                .setTitle("**You are not verified**")
                                .setDescription("Please verify yourself with RoVer by clicking on the button below.")
                                .setColor("YELLOW")
                                .setFooter("Cereza Verification");
                            return [4 /*yield*/, interaction.reply({
                                    embeds: [verifyPlsEmbed],
                                    components: [verifyRow],
                                    ephemeral: true
                                })];
                        case 3:
                            _c.sent();
                            return [2 /*return*/];
                        case 4: return [4 /*yield*/, account_1.default.findOne({ DiscordID: "" + user.id })];
                        case 5:
                            data1 = _c.sent();
                            if (!!data1) return [3 /*break*/, 38];
                            return [4 /*yield*/, noblox_js_1.default.getUsernameFromId(Number(data.robloxId))];
                        case 6:
                            rUsernamefromID = _c.sent();
                            playerID = "" + data.robloxId;
                            newPlayerDataInstance = new account_1.default({
                                RobloxUserID: playerID,
                                DiscordID: user.id,
                            });
                            return [4 /*yield*/, newPlayerDataInstance.save()];
                        case 7:
                            _c.sent();
                            memberItem = member;
                            _c.label = 8;
                        case 8:
                            _c.trys.push([8, 35, , 37]);
                            memberItem.setNickname(rUsernamefromID);
                            return [4 /*yield*/, noblox_js_1.default.getRankNameInGroup(5206353, Number(data.robloxId))];
                        case 9:
                            rankName_1 = _c.sent();
                            return [4 /*yield*/, noblox_js_1.default.getRankInGroup(5206353, Number(data.robloxId))];
                        case 10:
                            RankNumber = _c.sent();
                            return [4 /*yield*/, memberItem.roles.set([])];
                        case 11:
                            _c.sent();
                            if (!(RankNumber > 0)) return [3 /*break*/, 14];
                            rRole = (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.roles.cache.find(function (r) { return r.name === rankName_1; });
                            console.log(rRole);
                            return [4 /*yield*/, memberItem.roles.add("" + rRole)];
                        case 12:
                            _c.sent();
                            return [4 /*yield*/, memberItem.roles.add("852583076910727228")];
                        case 13:
                            _c.sent();
                            return [3 /*break*/, 16];
                        case 14: return [4 /*yield*/, memberItem.roles.add("852583076910727228")];
                        case 15:
                            _c.sent();
                            _c.label = 16;
                        case 16:
                            if (!(RankNumber >= 200)) return [3 /*break*/, 23];
                            return [4 /*yield*/, memberItem.roles.add("" + process.env.SuperRank)];
                        case 17:
                            _c.sent();
                            return [4 /*yield*/, memberItem.roles.add("" + process.env.Emergency)];
                        case 18:
                            _c.sent();
                            return [4 /*yield*/, memberItem.roles.add("" + process.env.Support)];
                        case 19:
                            _c.sent();
                            return [4 /*yield*/, memberItem.roles.add("" + process.env.ServerAdministrator)];
                        case 20:
                            _c.sent();
                            if (!(RankNumber >= 220)) return [3 /*break*/, 22];
                            return [4 /*yield*/, memberItem.roles.add("857544805298602004")];
                        case 21:
                            _c.sent();
                            _c.label = 22;
                        case 22: return [3 /*break*/, 33];
                        case 23:
                            if (!(RankNumber >= 121)) return [3 /*break*/, 28];
                            return [4 /*yield*/, memberItem.roles.add("" + process.env.HR)];
                        case 24:
                            _c.sent();
                            return [4 /*yield*/, memberItem.roles.add("" + process.env.Emergency)];
                        case 25:
                            _c.sent();
                            return [4 /*yield*/, memberItem.roles.add("" + process.env.Support)];
                        case 26:
                            _c.sent();
                            return [4 /*yield*/, memberItem.roles.add("" + process.env.ServerAdministrator)];
                        case 27:
                            _c.sent();
                            return [3 /*break*/, 33];
                        case 28:
                            if (!(RankNumber >= 70)) return [3 /*break*/, 31];
                            return [4 /*yield*/, memberItem.roles.add("" + process.env.MR)];
                        case 29:
                            _c.sent();
                            return [4 /*yield*/, memberItem.roles.add("" + process.env.Emergency)];
                        case 30:
                            _c.sent();
                            return [3 /*break*/, 33];
                        case 31:
                            if (!(RankNumber >= 7)) return [3 /*break*/, 33];
                            return [4 /*yield*/, memberItem.roles.add("" + process.env.LR)];
                        case 32:
                            _c.sent();
                            _c.label = 33;
                        case 33:
                            verifiedEmbed = new discord_js_1.MessageEmbed()
                                .setTitle("**Verification Success**")
                                .setDescription("\n Your roles should be updated within the next few minutes.")
                                .setFooter("Cereza Verification")
                                .setColor("GREEN");
                            return [4 /*yield*/, interaction.reply({
                                    embeds: [verifiedEmbed],
                                    ephemeral: true
                                })];
                        case 34:
                            _c.sent();
                            return [2 /*return*/];
                        case 35:
                            error_1 = _c.sent();
                            ErrorEmbed = new discord_js_1.MessageEmbed()
                                .setTitle("**Error Occurred**")
                                .setDescription("\n Please screenshot this and send this to DamienAngel0828 \n \n " + error_1)
                                .setColor("RED")
                                .setFooter("Cereza Verification");
                            return [4 /*yield*/, interaction.reply({
                                    embeds: [ErrorEmbed],
                                    ephemeral: true
                                })];
                        case 36:
                            _c.sent();
                            return [2 /*return*/];
                        case 37: return [3 /*break*/, 69];
                        case 38:
                            if (!data1) return [3 /*break*/, 69];
                            target = member;
                            RobloxUserID = data1.RobloxUserID;
                            return [4 /*yield*/, noblox_js_1.default.getUsernameFromId(Number(RobloxUserID))];
                        case 39:
                            rUsernamefromID = _c.sent();
                            _c.label = 40;
                        case 40:
                            _c.trys.push([40, 67, , 69]);
                            target.setNickname(rUsernamefromID);
                            return [4 /*yield*/, noblox_js_1.default.getRankNameInGroup(5206353, Number(RobloxUserID))];
                        case 41:
                            rankName_2 = _c.sent();
                            return [4 /*yield*/, noblox_js_1.default.getRankInGroup(5206353, Number(RobloxUserID))
                                // Verified Roles
                            ];
                        case 42:
                            RankNumber = _c.sent();
                            // Verified Roles
                            return [4 /*yield*/, target.roles.set([])];
                        case 43:
                            // Verified Roles
                            _c.sent();
                            if (!(RankNumber > 0)) return [3 /*break*/, 46];
                            rRole = (_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.roles.cache.find(function (r) { return r.name === rankName_2; });
                            console.log(rRole);
                            return [4 /*yield*/, target.roles.add("" + rRole)];
                        case 44:
                            _c.sent();
                            return [4 /*yield*/, target.roles.add("852583076910727228")];
                        case 45:
                            _c.sent();
                            return [3 /*break*/, 48];
                        case 46: return [4 /*yield*/, target.roles.add("852583076910727228")];
                        case 47:
                            _c.sent();
                            _c.label = 48;
                        case 48:
                            if (!(RankNumber >= 200)) return [3 /*break*/, 55];
                            return [4 /*yield*/, target.roles.add("" + process.env.SuperRank)];
                        case 49:
                            _c.sent();
                            return [4 /*yield*/, target.roles.add("" + process.env.Emergency)];
                        case 50:
                            _c.sent();
                            return [4 /*yield*/, target.roles.add("" + process.env.Support)];
                        case 51:
                            _c.sent();
                            return [4 /*yield*/, target.roles.add("" + process.env.ServerAdministrator)];
                        case 52:
                            _c.sent();
                            if (!(RankNumber >= 220)) return [3 /*break*/, 54];
                            return [4 /*yield*/, target.roles.add("857544805298602004")];
                        case 53:
                            _c.sent();
                            _c.label = 54;
                        case 54: return [3 /*break*/, 65];
                        case 55:
                            if (!(RankNumber >= 121)) return [3 /*break*/, 60];
                            return [4 /*yield*/, target.roles.add("" + process.env.HR)];
                        case 56:
                            _c.sent();
                            return [4 /*yield*/, target.roles.add("" + process.env.Emergency)];
                        case 57:
                            _c.sent();
                            return [4 /*yield*/, target.roles.add("" + process.env.Support)];
                        case 58:
                            _c.sent();
                            return [4 /*yield*/, target.roles.add("" + process.env.ServerAdministrator)];
                        case 59:
                            _c.sent();
                            return [3 /*break*/, 65];
                        case 60:
                            if (!(RankNumber >= 70)) return [3 /*break*/, 63];
                            return [4 /*yield*/, target.roles.add("" + process.env.MR)];
                        case 61:
                            _c.sent();
                            return [4 /*yield*/, target.roles.add("" + process.env.Emergency)];
                        case 62:
                            _c.sent();
                            return [3 /*break*/, 65];
                        case 63:
                            if (!(RankNumber >= 7)) return [3 /*break*/, 65];
                            return [4 /*yield*/, target.roles.add("" + process.env.LR)];
                        case 64:
                            _c.sent();
                            _c.label = 65;
                        case 65:
                            verifiedEmbed = new discord_js_1.MessageEmbed()
                                .setTitle("**Verification Success**")
                                .setDescription("\n " + target.nickname + "'s roles should be updated within the next few minutes.")
                                .setFooter("Cereza Verification")
                                .setColor("GREEN");
                            return [4 /*yield*/, interaction.reply({
                                    embeds: [verifiedEmbed]
                                })];
                        case 66:
                            _c.sent();
                            return [2 /*return*/];
                        case 67:
                            error_2 = _c.sent();
                            ErrorEmbed = new discord_js_1.MessageEmbed()
                                .setTitle("**Error Occurred**")
                                .setDescription("\n Please screenshot this and send this to DamienAngel0828 \n \n " + error_2)
                                .setColor("RED")
                                .setFooter("Cereza Verification");
                            return [4 /*yield*/, interaction.reply({
                                    embeds: [ErrorEmbed]
                                })];
                        case 68:
                            _c.sent();
                            return [2 /*return*/];
                        case 69: return [3 /*break*/, 72];
                        case 70:
                            err_1 = _c.sent();
                            verifyRow = new discord_js_1.MessageActionRow()
                                .addComponents(new discord_js_1.MessageButton()
                                .setURL('https://rover.link/login/')
                                .setLabel('Verify account here')
                                .setStyle('LINK'));
                            verifyPlsEmbed = new discord_js_1.MessageEmbed()
                                .setTitle("**You are not verified**")
                                .setDescription("Please verify yourself with RoVer by clicking on the button below.")
                                .setColor("YELLOW")
                                .setFooter("Cereza Verification");
                            return [4 /*yield*/, interaction.reply({
                                    embeds: [verifyPlsEmbed],
                                    components: [verifyRow],
                                    ephemeral: true
                                })];
                        case 71:
                            _c.sent();
                            return [2 /*return*/];
                        case 72: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); },
    callback: function (_a) {
        var msgInt = _a.interaction, channel = _a.channel;
        return __awaiter(void 0, void 0, void 0, function () {
            var row, messageEmbed;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        row = new discord_js_1.MessageActionRow()
                            .addComponents(new discord_js_1.MessageButton()
                            .setCustomId('Verification_Init')
                            .setEmoji('✔️')
                            .setLabel('Verify')
                            .setStyle('PRIMARY'));
                        messageEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("**Cereza Verification**")
                            .setDescription("\n \n Click the verify below to verify yourself. \n _It will use data from RoVer's database._ ")
                            .setColor("ORANGE")
                            .setFooter("Cereza Verification");
                        if (!(msgInt.user.id === "482458649139347456")) return [3 /*break*/, 2];
                        return [4 /*yield*/, ((_b = msgInt.channel) === null || _b === void 0 ? void 0 : _b.send({
                                embeds: [messageEmbed],
                                components: [row]
                            }))];
                    case 1:
                        _c.sent();
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, 'You do not have permission to use this.'];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
};
