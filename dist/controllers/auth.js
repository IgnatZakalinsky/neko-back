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
const auth = express_1.default.Router();
const user_1 = __importDefault(require("../models/user"));
// const store = require('./../bd/fake');
auth.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.find()
        .then(users => res.status(200)
        .json({ users, warnings: ['This endpoint will be deleted!!! Just for development!!!'] }))
        .catch(e => res.status(404).json({ error: e.toString(), errorObject: e }));
}));
auth.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = store.login(req.body.email, req.body.password, req.body.rememberMe);
    res.send(JSON.stringify(answer));
}));
auth.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.create({
        email: req.body.email,
        password: req.body.password,
        isAdmin: false
    })
        .then((user) => res.status(201).json({ addedUser: user, success: true }))
        .catch((e) => res.status(409).json({ error: e.errors.message, e }));
}));
auth.post('/forgot', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = store.forgot(req.body.email);
    res.send(JSON.stringify(answer));
}));
auth.post('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = store.me(req.body.token);
    res.send(JSON.stringify(answer));
}));
exports.default = auth;
//# sourceMappingURL=auth.js.map