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
const express_1 = __importDefault(require("express"));
const privateChats = express_1.default.Router();
const user_1 = __importDefault(require("../models/user"));
const privateChat_1 = __importDefault(require("../models/privateChat"));
const message_1 = __importDefault(require("../models/message"));
privateChats.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.token)
        res.status(401).json({ error: 'bad token!' });
    else
        user_1.default.findOne({ token: req.query.token })
            .then((user) => {
            if (!user || user.tokenDeathTime < new Date().getTime())
                res.status(401).json({ error: 'bad token!' });
            else {
                // let chats: IPrivateChat[] = [];
                // const setChats = (pc: IPrivateChat[]) => chats = [...chats, ...pc];
                privateChat_1.default.find({ $or: [{ user1Id: user._id }, { user2Id: user._id }] })
                    .then(pc => {
                    const ids = pc.reduce((acc, ipc) => [...acc, ipc.user1Id, ipc.user2Id], []);
                    user_1.default.find({ '_id': { $in: ids } })
                        .select('_id email')
                        .then(users => res.status(200).json({ privateChats: pc, users }))
                        .catch(e => res.status(500)
                        .json({ error: e.toString(), errorObject: e, in: 'User.find' }));
                })
                    .catch(e => res.status(500)
                    .json({ error: e.toString(), errorObject: e, in: 'PrivateChat.find' }));
            }
        })
            .catch(e => res.status(500).json({ error: e.toString(), errorObject: e, in: 'User.findOne' }));
}));
privateChats.get('/messages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.findOne({ token: req.query.token })
        .then((user) => {
        if (!user || user.tokenDeathTime < new Date().getTime())
            res.status(401).json({ error: 'bad token!' });
        else {
            privateChat_1.default.findById(req.query.chatId)
                .then(pc => {
                if (!pc)
                    res.status(400).json({ error: 'bad chatId!' });
                else if (!user._id.equals(pc.user1Id) && !user._id.equals(pc.user2Id))
                    res.status(401).json({ error: 'bad userId!' });
                else {
                    message_1.default.find({ '_id': { $in: pc.messages } })
                        .then(m => res.status(200).json({ messages: m }))
                        .catch(e => res.status(500)
                        .json({ error: e.toString(), errorObject: e, in: 'Message.find' }));
                }
            })
                .catch(e => res.status(500)
                .json({ error: e.toString(), errorObject: e, in: 'PrivateChat.findById' }));
        }
    })
        .catch(e => res.status(500).json({ error: e.toString(), errorObject: e, in: 'User.findOne' }));
}));
privateChats.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let find = false;
    user_1.default.findOne({ token: req.body.token })
        .then((user) => {
        if (!user || user.tokenDeathTime < new Date().getTime())
            res.status(401).json({ error: 'bad token!' });
        else {
            privateChat_1.default.findOne({ user1Id: user._id, user2Id: req.body.userId })
                .then((pc) => {
                if (pc) {
                    find = true;
                    res.status(200).json({ addedPrivateChat: pc, success: true, find });
                }
            })
                .catch(e => res.status(500)
                .json({ error: e.toString(), errorObject: e, in: 'PrivateChat.findOne' }));
            privateChat_1.default.findOne({ user1Id: req.body.userId, user2Id: user._id })
                .then((pc) => {
                if (pc) {
                    find = true;
                    res.status(200).json({ addedPrivateChat: pc, success: true, find });
                }
            })
                .catch(e => res.status(500)
                .json({ error: e.toString(), errorObject: e, in: 'PrivateChat.findOne' }));
            if (!find)
                privateChat_1.default.create({
                    user1Id: user._id,
                    user2Id: req.body.userId,
                    messages: []
                })
                    .then((pc) => res.status(201).json({ addedPrivateChat: pc, success: true }))
                    .catch(e => res.status(500)
                    .json({ error: e.toString(), errorObject: e, in: 'PrivateChat.create' }));
        }
    })
        .catch(e => res.status(500).json({ error: e.toString(), errorObject: e, in: 'User.findOne' }));
}));
privateChats.post('/messages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.findOne({ token: req.body.token })
        .then((user) => {
        if (!user || user.tokenDeathTime < new Date().getTime())
            res.status(401).json({ error: 'bad token!' });
        else {
            privateChat_1.default.findById(req.body.chatId)
                .then((pc) => {
                if (!pc)
                    res.status(400).json({ error: 'bad chatId!' });
                else if (!user._id.equals(pc.user1Id) && !user._id.equals(pc.user2Id))
                    res.status(401).json({ error: 'bad userId!' });
                else {
                    console.log('!!!message: ', req.body.message);
                    message_1.default.create({
                        chatId: pc._id,
                        authorId: user._id,
                        message: req.body.message
                    })
                        .then((m) => {
                        privateChat_1.default.findByIdAndUpdate(req.body.chatId, { messages: [...pc.messages, m._id] }, { new: true })
                            .then(npc => res.status(201)
                            .json({ updatedPrivateChat: npc, addedMessage: m }))
                            .catch(e => res.status(500)
                            .json({
                            error: e.toString(),
                            errorObject: e,
                            in: 'PrivateChat.findByIdAndUpdate'
                        }));
                    })
                        .catch(e => res.status(500)
                        .json({ error: e.toString(), errorObject: e, in: 'Message.create' }));
                }
            })
                .catch(e => res.status(500)
                .json({ error: e.toString(), errorObject: e, in: 'PrivateChat.findById' }));
        }
    })
        .catch(e => res.status(500).json({ error: e.toString(), errorObject: e, in: 'User.findOne' }));
}));
// auth.post('/login', async (req: Request, res: Response) => {
//     User.findOne({email: req.body.email})
//         .then((user: IUser | null) => {
//             if (!user) res.status(400).json({error: 'not correct email/password'});
//
//             else if (user.password !== req.body.password)
//                 res.status(400).json({error: 'not correct email/password'});
//
//             else {
//                 const token = uuidv1();
//                 const tokenDeathTime = req.body.rememberMe
//                     ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 day
//                     : new Date().getTime() + (1000 * 60 * 60 * 24); // 1 day
//
//                 User.findByIdAndUpdate(
//                     user.id,
//                     {token, tokenDeathTime, rememberMe: req.body.rememberMe},
//                     {new: true})
//                     .then((newUser: IUser | null) => {
//                         if (!newUser) res.status(500).json({error: 'not updated?'});
//
//                         else res.status(200).json({...newUser._doc, name: user.email});
//                     })
//                     .catch(e => res.status(500).json({error: 'some error', e}))
//             }
//         })
//         .catch(e => res.status(500).json({error: 'some error', e}));
// });
//
// auth.post('/forgot', async (req: Request, res: Response) => {
//     User.findOne({email: req.body.email})
//         .then((user: IUser | null) => {
//             if (!user) res.status(404).json({error: 'Email address not found'});
//
//             else res.status(200).json({error: "sorry, I can't send new password on your email"});
//         })
//         .catch(e => res.status(500).json({error: 'some error', e}));
// });
//
// auth.post('/me', async (req: Request, res: Response) => {
//     User.findOne({token: req.body.token})
//         .then((user: IUser | null) => {
//             if (!user || user.tokenDeathTime < new Date().getTime())
//                 res.status(400).json({error: 'bad token!'});
//
//             else {
//                 const token = uuidv1();
//                 const tokenDeathTime = user.rememberMe
//                     ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 day
//                     : new Date().getTime() + (1000 * 60 * 60 * 24); // 1 day
//
//                 User.findByIdAndUpdate(user.id, {token, tokenDeathTime}, {new: true})
//                     .then((newUser: IUser | null) => {
//                         if (!newUser) res.status(500).json({error: 'not updated?'});
//
//                         else res.status(200).json({...newUser._doc, name: user.email});
//                     })
//                     .catch(e => res.status(500).json({error: 'some error', e}))
//             }
//         })
//         .catch(e => res.status(500).json({error: 'some error', e}));
// });
exports.default = privateChats;
//# sourceMappingURL=privateChats.js.map