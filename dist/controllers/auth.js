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
const validators_1 = require("../helpers/validators");
auth.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.find({ isAdmin: false })
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
                ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 day
                : new Date().getTime() + (1000 * 60 * 60 * 24); // 1 day
            user_1.default.findByIdAndUpdate(user.id, { token, tokenDeathTime, rememberMe: req.body.rememberMe }, { new: true })
                .then((newUser) => {
                if (!newUser)
                    res.status(500).json({ error: 'not updated?' });
                else
                    res.status(200).json(Object.assign(Object.assign({}, newUser._doc), { name: user.email }));
            })
                .catch(e => res.status(500).json({ error: 'some error', e }));
        }
    })
        .catch(e => res.status(500).json({ error: 'some error', e }));
}));
auth.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validators_1.emailValidator(req.body.email))
        res.status(400).json({
            error: 'Email not valid! /^[\\w]{1}[\\w-\\.]*@[\\w-]+\\.[a-z]{2,7}$/i.test(\'x@x.xx\')',
            email: req.body.email
        });
    else if (!validators_1.passwordValidator(req.body.password))
        res.status(400)
            .json({ error: 'Password not valid! must be more than 7 characters...', password: req.body.password });
    else
        user_1.default.create({
            email: req.body.email,
            password: req.body.password,
            rememberMe: false,
            isAdmin: false
        })
            .then((user) => res.status(201).json({ addedUser: user, success: true }))
            .catch(e => res.status(400).json({ error: 'email address already exists', e }));
}));
auth.post('/forgot', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.findOne({ email: req.body.email })
        .then((user) => {
        if (!user)
            res.status(404).json({ error: 'Email address not found' });
        else
            res.status(200).json({ error: "sorry, I can't send new password on your email" });
    })
        .catch(e => res.status(500).json({ error: 'some error', e }));
}));
auth.post('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.findOne({ token: req.body.token })
        .then((user) => {
        if (!user || user.tokenDeathTime < new Date().getTime())
            res.status(401).json({ error: 'bad token!' });
        else {
            const token = v1_1.default();
            const tokenDeathTime = user.rememberMe
                ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 day
                : new Date().getTime() + (1000 * 60 * 60 * 24); // 1 day
            user_1.default.findByIdAndUpdate(user.id, { token, tokenDeathTime }, { new: true })
                .then((newUser) => {
                if (!newUser)
                    res.status(500).json({ error: 'not updated?' });
                else
                    res.status(200).json(Object.assign(Object.assign({}, newUser._doc), { name: user.email }));
            })
                .catch(e => res.status(500).json({ error: 'some error', e }));
        }
    })
        .catch(e => res.status(500).json({ error: 'some error', e }));
}));
exports.default = auth;
//# sourceMappingURL=auth.js.map