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
const user_1 = __importDefault(require("../../f-1-auth/a-2-models/user"));
const findUserByToken_1 = require("../../f-1-auth/findUserByToken");
exports.privateChatsGet = (path, privateChat) => privateChat.get(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const f = (user) => {
        privateChat_1.default.find({ $or: [{ user1Id: user._id }, { user2Id: user._id }] })
            .exec()
            .then(pc => {
            const ids = pc.reduce((acc, ipc) => [...acc, ipc.user1Id, ipc.user2Id], []);
            user_1.default.find({ '_id': { $in: ids } })
                .select('_id email')
                .exec()
                .then(users => res.status(200).json({ privateChats: pc, users }))
                .catch(e => res.status(500)
                .json({ error: 'some error', errorObject: e, in: 'privateChatsGet/User.find' }));
        })
            .catch(e => res.status(500)
            .json({ error: 'some error', errorObject: e, in: 'privateChatsGet/PrivateChat.find' }));
    };
    findUserByToken_1.findUserByToken(req, res, req.query.token, f, 'privateChatsGet');
}));
//# sourceMappingURL=privateChatsGet.js.map