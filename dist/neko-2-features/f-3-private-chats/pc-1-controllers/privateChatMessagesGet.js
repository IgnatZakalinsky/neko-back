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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const privateChat_1 = __importDefault(require("../pc-2-models/privateChat"));
const message_1 = __importDefault(require("../pc-2-models/message"));
const findUserByToken_1 = require("../../f-1-auth/findUserByToken");
exports.privateChatMessagesGet = (path, privateChat) => privateChat.get(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const f = (user) => {
        privateChat_1.default.findById(req.query.chatId)
            .exec()
            .then((pc) => {
            if (!pc)
                res.status(400).json({ error: 'bad chatId!' });
            else if (!user._id.equals(pc.user1Id) && !user._id.equals(pc.user2Id))
                res.status(401).json({ error: 'bad userId!' });
            else {
                message_1.default.find({ '_id': { $in: pc.messages } })
                    .exec()
                    .then((ms) => res.status(200).json({ messages: ms }))
                    .catch(e => res.status(500)
                    .json({
                    error: 'some error',
                    errorObject: e,
                    in: 'privateChatMessagesGet/Message.find'
                }));
            }
        })
            .catch(e => res.status(500)
            .json({
            error: 'some error',
            errorObject: e,
            in: 'privateChatMessagesGet/PrivateChat.findById'
        }));
    };
    findUserByToken_1.findUserByToken(req, res, req.query.token, f, 'privateChatMessagesGet');
}));
//# sourceMappingURL=privateChatMessagesGet.js.map