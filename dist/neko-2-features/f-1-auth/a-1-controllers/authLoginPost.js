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
const user_1 = __importDefault(require("../a-2-models/user"));
const v1_1 = __importDefault(require("uuid/v1"));
exports.authLoginPost = (path, auth) => auth.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
        if (!user || user.password !== req.body.password)
            res.status(400).json({ error: 'not correct email/password' });
        else {
            const token = v1_1.default();
            const tokenDeathTime = req.body.rememberMe
                ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 day
                : new Date().getTime() + (1000 * 60 * 60 * 24); // 1 day
            user_1.default.findByIdAndUpdate(user.id, { token, tokenDeathTime, rememberMe: req.body.rememberMe }, { new: true })
                .exec()
                .then((newUser) => {
                if (!newUser)
                    res.status(500).json({ error: 'not updated?', in: 'authLoginPost' });
                else {
                    console.log('IUser?: ', Object.assign({}, newUser));
                    res.status(200).json(Object.assign(Object.assign({}, newUser._doc), { name: user.email })); // _doc!!!
                }
            })
                .catch(e => res.status(500)
                .json({
                error: 'some error',
                errorObject: e,
                in: 'authLoginPost/User.findByIdAndUpdate'
            }));
        }
    })
        .catch(e => res.status(500).json({
        error: 'some error',
        errorObject: e,
        in: 'authLoginPost/User.findOne'
    }));
}));
//# sourceMappingURL=authLoginPost.js.map