"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./a-2-models/user"));
exports.findUserByToken = (req, res, f, inR) => {
    user_1.default.findOne({ token: req.body.token })
        .exec()
        .then((user) => {
        if (!user || user.tokenDeathTime < new Date().getTime())
            res.status(401).json({ error: 'bad token!' });
        else
            f(user);
    })
        .catch(e => res.status(500)
        .json({ error: 'some error', errorObject: e, in: inR + '/findUserByToken/User.findOne' }));
};
//# sourceMappingURL=findUserByToken.js.map