"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const privateChatsGet_1 = require("./pc-1-controllers/privateChatsGet");
const privateChatMessagesGet_1 = require("./pc-1-controllers/privateChatMessagesGet");
const privateChatPost_1 = require("./pc-1-controllers/privateChatPost");
const privateChatMessagesPost_1 = require("./pc-1-controllers/privateChatMessagesPost");
const privateChats = express_1.default.Router();
privateChatsGet_1.privateChatsGet('/', privateChats);
privateChatMessagesGet_1.privateChatMessagesGet('/messages', privateChats);
privateChatPost_1.privateChatPost('/', privateChats);
privateChatMessagesPost_1.privateChatMessagesPost('/messages', privateChats);
exports.default = privateChats;
//# sourceMappingURL=index.js.map