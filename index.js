"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var discord_js_1 = __importStar(require("discord.js"));
var dotenv_1 = __importDefault(require("dotenv"));
var wokcommands_1 = __importDefault(require("wokcommands"));
var noblox_js_1 = __importDefault(require("noblox.js"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config();
var client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_PRESENCES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
});
client.on('ready', function () { return __awaiter(void 0, void 0, void 0, function () {
    var wok, mongoose, db, currentUser;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                wok = new wokcommands_1.default(client, {
                    // The name of the local folder for your command files
                    commandsDir: path_1.default.join(__dirname, 'commands'),
                    // Pass in the new dbOptions
                    // Pass in your own mongo connection URI
                    // mongoUri: "mongodb+srv://cerezadiscord:Cereza314@cluster0.1gt3c.mongodb.net/test"
                    mongoUri: process.env["dbLink"]
                });
                mongoose = require('mongoose');
                db = mongoose.connection;
                db.on("error", console.error.bind(console, "connection error:"));
                db.once("open", function () {
                    console.log("Connection To MongoDB Atlas Successful!");
                });
                (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({ activities: [{ name: 'Cereza | Under Development', type: "LISTENING" }], status: 'idle' });
                return [4 /*yield*/, noblox_js_1.default.setCookie("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D817227E322191D066D8C166C88A91200129B012596761D526B43333EC125D379EA7722DCE2DD3998CD9B075049C61E87410665AA73CED82E18DC1B562AE9EA939634149B9ED574358671A28C3E1EC71047DF17237B1F614F0A2C386D8D55A678F48D5DEF6AD8940521AA1E6B8056159E69D4F6577DEA5187177EB66287A5C7B03196BF614543116AF50B8E1A6BAA4845248F4A9544A1501930B619785ED62163E36A95DF70F110A09C0860EDEEE6DDAB338C9B7B444462FDCB46D9CC81B1DD9EEDCAACDBE13A1741C4C225EE856B7C32FE3535928B701E20FE33409AE89B0DE77171EE22E256FB81F315F372187971439CEB58AB8ABA2BA88CEE09CF5EC12AAE8C93EF5DED9DEA34FEA76A14DF8A2F72E37EE518920A074D76A065D97F41FAAAD8B60D48FEFEBF815008289D2770FB9F4EF5BA063D271E62D832B1B119DE5FE3EE159780AD881BE01E0E86748D3EB998364C2E1")];
            case 1:
                currentUser = _b.sent();
                console.log("Logged in as " + currentUser.UserName + " [" + currentUser.UserID + "]");
                return [2 /*return*/];
        }
    });
}); });
client.login(process.env["TOKEN"]);
