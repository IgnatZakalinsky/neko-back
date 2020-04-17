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
const findUserByToken_1 = require("../findUserByToken");
exports.authMePost = (path, auth) => auth.post('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const f = (user) => {
        const token = v1_1.default();
        const tokenDeathTime = user.rememberMe
            ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 day
            : new Date().getTime() + (1000 * 60 * 60 * 24); // 1 day
        user_1.default.findByIdAndUpdate(user._id, { token, tokenDeathTime }, { new: true })
            .then((newUser) => {
            if (!newUser)
                res.status(500).json({ error: 'not updated?', in: 'authMePost' });
            else {
                console.log('IUser?: ', Object.assign({}, newUser));
                res.status(200).json(Object.assign(Object.assign({}, newUser._doc), { name: user.email })); // _doc
            }
        })
            .catch(e => res.status(500)
            .json({ error: 'some error', errorObject: e, in: 'authMePost/User.findByIdAndUpdate' }));
    };
    findUserByToken_1.findUserByToken(req, res, req.body.token, f, 'authMePost');
}));
//# sourceMappingURL=authMePost.js.map