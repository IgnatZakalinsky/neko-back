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
const findUserByToken_1 = require("../../f-1-auth/findUserByToken");
exports.privateChatPost = (path, privateChat) => privateChat.post(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const f = (user) => __awaiter(void 0, void 0, void 0, function* () {
        let find = false;
        let pc = null;
        try {
            pc = yield privateChat_1.default.findOne({ user1Id: user._id, user2Id: req.body.userId }).exec();
            if (pc) {
                find = true;
                res.status(200).json({ addedPrivateChat: pc, success: true, find });
            }
            pc = yield privateChat_1.default.findOne({ user1Id: req.body.userId, user2Id: user._id }).exec();
            if (pc) {
                find = true;
                res.status(200).json({ addedPrivateChat: pc, success: true, find });
            }
        }
        catch (e) {
            res.status(500)
                .json({ error: 'some error', errorObject: e, in: 'privateChatPost/PrivateChat.findOne' });
        }
        if (!find)
            privateChat_1.default.create({
                user1Id: user._id,
                user2Id: req.body.userId,
                messages: []
            })
                .then((pc) => res.status(201).json({ addedPrivateChat: pc, success: true }))
                .catch(e => res.status(500)
                .json({ error: 'some error', errorObject: e, in: 'privateChatPost/PrivateChat.create' }));
    });
    findUserByToken_1.findUserByToken(req, res, req.body.token, f, 'privateChatPost');
}));
//# sourceMappingURL=privateChatPost.js.map