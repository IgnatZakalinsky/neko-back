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
exports.privateChatMessagesPost = (path, privateChat) => privateChat.post(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const f = (user) => __awaiter(void 0, void 0, void 0, function* () {
        privateChat_1.default.findById(req.body.chatId)
            .exec()
            .then((pc) => {
            if (!pc)
                res.status(400).json({ error: 'bad chatId!' });
            else if (!user._id.equals(pc.user1Id) && !user._id.equals(pc.user2Id))
                res.status(401).json({ error: 'bad userId!' });
            else {
                message_1.default.create({
                    chatId: pc._id,
                    authorId: user._id,
                    message: req.body.message
                })
                    .then((m) => {
                    privateChat_1.default.findByIdAndUpdate(req.body.chatId, { messages: [...pc.messages, m._id] }, { new: true }).exec()
                        .then(npc => res.status(201)
                        .json({ updatedPrivateChat: npc, addedMessage: m }))
                        .catch(e => res.status(500)
                        .json({
                        error: 'some error',
                        errorObject: e,
                        in: 'privateChatMessagesPost/PrivateChat.findByIdAndUpdate'
                    }));
                })
                    .catch(e => res.status(500)
                    .json({
                    error: 'some error',
                    errorObject: e,
                    in: 'privateChatMessagesPost/Message.create'
                }));
            }
        })
            .catch(e => res.status(500)
            .json({
            error: 'some error',
            errorObject: e,
            in: 'privateChatMessagesPost/PrivateChat.findById'
        }));
    });
    findUserByToken_1.findUserByToken(req, res, req.body.token, f, 'privateChatMessagesPost');
}));
//# sourceMappingURL=privateChatMessagesPost.js.map