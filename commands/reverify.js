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
var axios_1 = __importDefault(require("axios"));
exports.default = {
    category: 'Verification',
    description: 'Reverify your account/switch your account.',
    slash: true,
    callback: function (_a) {
        var msgInt = _a.interaction, channel = _a.channel;
        return __awaiter(void 0, void 0, void 0, function () {
            var dataCheck, row, initEmbed, collector, verifyPlsEmbed;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, account_1.default.findOne({ DiscordID: "" + msgInt.user.id })];
                    case 1:
                        dataCheck = _b.sent();
                        if (!dataCheck) return [3 /*break*/, 3];
                        row = new discord_js_1.MessageActionRow()
                            .addComponents(new discord_js_1.MessageButton()
                            .setURL('https://rover.link/login/')
                            .setLabel('Go to RoVer')
                            .setStyle('LINK'))
                            .addComponents(new discord_js_1.MessageButton()
                            .setCustomId('Reverification_Init')
                            .setEmoji('✔️')
                            .setLabel('Done')
                            .setStyle('SUCCESS'));
                        initEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("**Switch Account**")
                            .setDescription("\n 1. Click on the 'Go to Rover' button below and head to RoVer. \n 2. Log in with your Discord. \n 3. Click on 'Change' to change your verified account. \n 4. Follow the instruction on RoVer's website. \n 5. Click on the 'Done' button below.")
                            .setFooter("Cereza Verification")
                            .setColor("BLUE");
                        return [4 /*yield*/, msgInt.reply({ embeds: [initEmbed], components: [row], ephemeral: true })];
                    case 2:
                        _b.sent();
                        collector = channel.createMessageComponentCollector();
                        collector.on('collect', function (i) { return __awaiter(void 0, void 0, void 0, function () {
                            var uri, data, verifyRow, verifyPlsEmbed, newRobloxID, rUsernamefromID, playerID, memberItem, rankName_1, RankNumber, rRole, SuccessEmbed, error_1, ErrorEmbed, err_1, verifyRow, verifyPlsEmbed;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(i.user.id === msgInt.user.id)) return [3 /*break*/, 37];
                                        if (!(i.customId === 'Reverification_Init')) return [3 /*break*/, 37];
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 35, , 37]);
                                        uri = "https://verify.eryn.io/api/user/" + msgInt.user.id;
                                        return [4 /*yield*/, axios_1.default.get(uri)];
                                    case 2:
                                        data = (_b.sent()).data;
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
                                        return [4 /*yield*/, i.reply({
                                                embeds: [verifyPlsEmbed],
                                                components: [verifyRow],
                                                ephemeral: true
                                            })];
                                    case 3:
                                        _b.sent();
                                        return [2 /*return*/];
                                    case 4:
                                        newRobloxID = data.robloxId;
                                        return [4 /*yield*/, noblox_js_1.default.getUsernameFromId(Number(data.robloxId))];
                                    case 5:
                                        rUsernamefromID = _b.sent();
                                        playerID = "" + data.robloxId;
                                        return [4 /*yield*/, account_1.default.findOneAndUpdate({ DiscordID: "" + msgInt.user.id }, { RobloxUserID: playerID, DiscordID: msgInt.user.id })];
                                    case 6:
                                        _b.sent();
                                        _b.label = 7;
                                    case 7:
                                        _b.trys.push([7, 32, , 34]);
                                        memberItem = msgInt.member;
                                        memberItem.setNickname(rUsernamefromID);
                                        return [4 /*yield*/, noblox_js_1.default.getRankNameInGroup(5206353, Number(data.robloxId))];
                                    case 8:
                                        rankName_1 = _b.sent();
                                        return [4 /*yield*/, noblox_js_1.default.getRankInGroup(5206353, Number(data.robloxId))];
                                    case 9:
                                        RankNumber = _b.sent();
                                        memberItem.roles.set([]);
                                        return [4 /*yield*/, memberItem.roles.add("852583076910727228")];
                                    case 10:
                                        _b.sent();
                                        if (!(RankNumber > 0)) return [3 /*break*/, 12];
                                        rRole = (_a = i.guild) === null || _a === void 0 ? void 0 : _a.roles.cache.find(function (r) { return r.name === rankName_1; });
                                        console.log(rRole);
                                        return [4 /*yield*/, memberItem.roles.add("" + rRole)];
                                    case 11:
                                        _b.sent();
                                        _b.label = 12;
                                    case 12:
                                        if (!(RankNumber >= 200)) return [3 /*break*/, 19];
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.SuperRank)];
                                    case 13:
                                        _b.sent();
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.Emergency)];
                                    case 14:
                                        _b.sent();
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.Support)];
                                    case 15:
                                        _b.sent();
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.ServerAdministrator)];
                                    case 16:
                                        _b.sent();
                                        if (!(RankNumber >= 220)) return [3 /*break*/, 18];
                                        return [4 /*yield*/, memberItem.roles.add("857544805298602004")];
                                    case 17:
                                        _b.sent();
                                        _b.label = 18;
                                    case 18: return [3 /*break*/, 29];
                                    case 19:
                                        if (!(RankNumber >= 121)) return [3 /*break*/, 24];
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.HR)];
                                    case 20:
                                        _b.sent();
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.Emergency)];
                                    case 21:
                                        _b.sent();
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.Support)];
                                    case 22:
                                        _b.sent();
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.ServerAdministrator)];
                                    case 23:
                                        _b.sent();
                                        return [3 /*break*/, 29];
                                    case 24:
                                        if (!(RankNumber >= 70)) return [3 /*break*/, 27];
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.MR)];
                                    case 25:
                                        _b.sent();
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.Emergency)];
                                    case 26:
                                        _b.sent();
                                        return [3 /*break*/, 29];
                                    case 27:
                                        if (!(RankNumber >= 7)) return [3 /*break*/, 29];
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.LR)];
                                    case 28:
                                        _b.sent();
                                        _b.label = 29;
                                    case 29: return [4 /*yield*/, memberItem.roles.add("852583076910727228")];
                                    case 30:
                                        _b.sent();
                                        SuccessEmbed = new discord_js_1.MessageEmbed()
                                            .setTitle("**Reverification Success**")
                                            .setDescription("You are now reverified as **" + rUsernamefromID + "**!")
                                            .setColor("DARK_GREEN")
                                            .setFooter("Cereza Verification");
                                        return [4 /*yield*/, msgInt.editReply({ embeds: [SuccessEmbed], components: [] })];
                                    case 31:
                                        _b.sent();
                                        return [2 /*return*/];
                                    case 32:
                                        error_1 = _b.sent();
                                        ErrorEmbed = new discord_js_1.MessageEmbed()
                                            .setTitle("**Error Occurred**")
                                            .setDescription("\n Please screenshot this and send this to DamienAngel0828 \n \n " + error_1)
                                            .setColor("RED")
                                            .setFooter("Cereza Verification");
                                        return [4 /*yield*/, i.reply({
                                                embeds: [ErrorEmbed],
                                                ephemeral: true
                                            })];
                                    case 33:
                                        _b.sent();
                                        return [2 /*return*/];
                                    case 34: return [3 /*break*/, 37];
                                    case 35:
                                        err_1 = _b.sent();
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
                                        return [4 /*yield*/, i.reply({
                                                embeds: [verifyPlsEmbed],
                                                components: [verifyRow],
                                                ephemeral: true
                                            })];
                                    case 36:
                                        _b.sent();
                                        return [2 /*return*/];
                                    case 37: return [2 /*return*/];
                                }
                            });
                        }); });
                        collector.on('end', function (collection) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                collection.forEach(function (click) {
                                    console.log(click.user.id, click.customId);
                                });
                                return [2 /*return*/];
                            });
                        }); });
                        return [3 /*break*/, 5];
                    case 3:
                        verifyPlsEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("**You are not verified**")
                            .setDescription("Please verify yourself by heading to the authorization channel.")
                            .setColor("YELLOW")
                            .setFooter("Cereza Verification");
                        return [4 /*yield*/, msgInt.reply({
                                embeds: [verifyPlsEmbed],
                                ephemeral: true
                            })];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
};
