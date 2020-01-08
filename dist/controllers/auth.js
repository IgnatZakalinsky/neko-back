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
const v1_1 = __importDefault(require("uuid/v1"));
const auth = express_1.default.Router();
const user_1 = __importDefault(require("../models/user"));
// const store = require('./../bd/fake');
auth.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.find()
        .then(users => res.status(200)
        .json({ users, warnings: ['This endpoint will be deleted!!! Just for development!!!'] }))
        .catch(e => res.status(500).json({ error: e.toString(), errorObject: e }));
}));
auth.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.findOne({ email: req.body.email })
        .then((user) => {
        if (!user)
            res.status(400).json({ error: 'not correct email/password' });
        else if (user.password !== req.body.password)
            res.status(400).json({ error: 'not correct email/password' });
        else {
            const token = v1_1.default();
            const tokenDeathTime = req.body.rememberMe
                ? new Date().getTime() + (1000 * 60 * 60 * 24) // 1 day
                : new Date().getTime() + (1000 * 60 * 60 * 24 * 7); // 7 day
            user_1.default.findByIdAndUpdate(user.id, { token, tokenDeathTime }, { new: true })
                .then((newUser) => {
                if (!newUser)
                    res.status(500).json({ error: 'not updated?' });
                else
                    res.status(200).json(Object.assign({}, newUser));
            })
                .catch(e => res.status(500).json({ error: 'some error', e }));
        }
    })
        .catch(e => res.status(500).json({ error: 'some error', e }));
}));
auth.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.create({
        email: req.body.email,
        password: req.body.password,
        isAdmin: false
    })
        .then((user) => res.status(201).json({ addedUser: user, success: true }))
        .catch((e) => res.status(400).json({ error: 'email address already exists', e }));
}));
auth.post('/forgot', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const answer = store.forgot(req.body.email);
    res.send(JSON.stringify({}));
}));
auth.post('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const answer = store.me(req.body.token);
    res.send(JSON.stringify({}));
}));
exports.default = auth;
//# sourceMappingURL=auth.js.map