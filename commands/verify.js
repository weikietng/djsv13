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
    callback: function (_a) {
        var msgInt = _a.interaction, channel = _a.channel;
        return __awaiter(void 0, void 0, void 0, function () {
            var row, messageEmbed, collector;
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
                    case 3:
                        collector = channel.createMessageComponentCollector();
                        collector.on('collect', function (i) { return __awaiter(void 0, void 0, void 0, function () {
                            var user, uri, data, verifyRow, verifyPlsEmbed, data1, rUsernamefromID, playerID, newPlayerDataInstance, memberItem, rankName_1, RankNumber, rRole, verifiedEmbed, error_1, ErrorEmbed, err_1, verifyRow, verifyPlsEmbed;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(i.customId === 'Verification_Init')) return [3 /*break*/, 40];
                                        user = i.user;
                                        uri = "https://verify.eryn.io/api/user/" + user.id;
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 38, , 40]);
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
                                    case 4: return [4 /*yield*/, account_1.default.findOne({ DiscordID: "" + user.id })];
                                    case 5:
                                        data1 = _b.sent();
                                        if (!!data1) return [3 /*break*/, 36];
                                        return [4 /*yield*/, noblox_js_1.default.getUsernameFromId(Number(data.robloxId))];
                                    case 6:
                                        rUsernamefromID = _b.sent();
                                        playerID = "" + data.robloxId;
                                        newPlayerDataInstance = new account_1.default({
                                            RobloxUserID: playerID,
                                            DiscordID: user.id,
                                        });
                                        return [4 /*yield*/, newPlayerDataInstance.save()];
                                    case 7:
                                        _b.sent();
                                        memberItem = i.member;
                                        _b.label = 8;
                                    case 8:
                                        _b.trys.push([8, 33, , 35]);
                                        memberItem.setNickname(rUsernamefromID);
                                        return [4 /*yield*/, noblox_js_1.default.getRankNameInGroup(5206353, Number(data.robloxId))];
                                    case 9:
                                        rankName_1 = _b.sent();
                                        return [4 /*yield*/, noblox_js_1.default.getRankInGroup(5206353, Number(data.robloxId))
                                            // Verified Roles
                                        ];
                                    case 10:
                                        RankNumber = _b.sent();
                                        // Verified Roles
                                        return [4 /*yield*/, memberItem.roles.add("852583076910727228")];
                                    case 11:
                                        // Verified Roles
                                        _b.sent();
                                        return [4 /*yield*/, memberItem.roles.remove(["" + (process.env.Chairman, process.env.ViceChairman, process.env.President, process.env.VicePresident, process.env.PresidentialDepartment, process.env.Developer, process.env.SuperRank, process.env.StaffingDirector, process.env.RelationsDirector, process.env.ServerAdministrator, process.env.ExecutiveAssistant, process.env.SupportTeam, process.env.HighRank, process.env.Coordinator, process.env.GeneralManager, process.env.GeneralManager, process.env.Supervisor, process.env.StaffAssistant, process.env.MiddleRank, process.env.EmergencyResponse, process.env.ManagementIntern, process.env.AdvancedBarista, process.env.Barista, process.env.JuniorBarista, process.env.Trainee, process.env.LowRank, process.env.HonouredCustomer, process.env.ProminentCustomer, process.env.Visitor)])];
                                    case 12:
                                        _b.sent();
                                        rRole = (_a = i.guild) === null || _a === void 0 ? void 0 : _a.roles.cache.find(function (r) { return r.name === rankName_1; });
                                        console.log(rRole);
                                        return [4 /*yield*/, memberItem.roles.add("" + rRole)];
                                    case 13:
                                        _b.sent();
                                        if (!(RankNumber >= 7 && RankNumber <= 70)) return [3 /*break*/, 15];
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.LowRank)];
                                    case 14:
                                        _b.sent();
                                        return [3 /*break*/, 30];
                                    case 15:
                                        if (!(RankNumber >= 75 && RankNumber <= 120)) return [3 /*break*/, 18];
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.MiddleRank)];
                                    case 16:
                                        _b.sent();
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.EmergencyResponse)];
                                    case 17:
                                        _b.sent();
                                        return [3 /*break*/, 30];
                                    case 18:
                                        if (!(RankNumber >= 121 && RankNumber <= 140)) return [3 /*break*/, 24];
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.HighRank)];
                                    case 19:
                                        _b.sent();
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.EmergencyResponse)];
                                    case 20:
                                        _b.sent();
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.SupportTeam)];
                                    case 21:
                                        _b.sent();
                                        if (!(RankNumber >= 130)) return [3 /*break*/, 23];
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.ServerAdministrator)];
                                    case 22:
                                        _b.sent();
                                        _b.label = 23;
                                    case 23: return [3 /*break*/, 30];
                                    case 24:
                                        if (!(RankNumber >= 200 && RankNumber <= 255)) return [3 /*break*/, 30];
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.SuperRank)];
                                    case 25:
                                        _b.sent();
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.EmergencyResponse)];
                                    case 26:
                                        _b.sent();
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.SupportTeam)];
                                    case 27:
                                        _b.sent();
                                        return [4 /*yield*/, memberItem.roles.add("" + process.env.ServerAdministrator)];
                                    case 28:
                                        _b.sent();
                                        if (!(RankNumber >= 240)) return [3 /*break*/, 30];
                                        return [4 /*yield*/, memberItem.roles.add("857544805298602004")];
                                    case 29:
                                        _b.sent();
                                        _b.label = 30;
                                    case 30: return [4 /*yield*/, memberItem.roles.add("852583076910727228")];
                                    case 31:
                                        _b.sent();
                                        verifiedEmbed = new discord_js_1.MessageEmbed()
                                            .setTitle("**Verification Success**")
                                            .setDescription("\n Your roles should be updated within the next few minutes.")
                                            .setFooter("Cereza Verification")
                                            .setColor("GREEN");
                                        return [4 /*yield*/, i.reply({
                                                embeds: [verifiedEmbed],
                                                ephemeral: true
                                            })];
                                    case 32:
                                        _b.sent();
                                        return [2 /*return*/];
                                    case 33:
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
                                    case 34:
                                        _b.sent();
                                        return [2 /*return*/];
                                    case 35: return [3 /*break*/, 36];
                                    case 36:
                                        i.reply({
                                            content: "You are already verified. Use /getroles to update your data instead.",
                                            ephemeral: true
                                        });
                                        _b.label = 37;
                                    case 37: return [3 /*break*/, 40];
                                    case 38:
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
                                    case 39:
                                        _b.sent();
                                        return [2 /*return*/];
                                    case 40: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    },
};
