"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const f_1_auth_1 = __importDefault(require("../neko-2-features/f-1-auth"));
const f_2_users_1 = __importDefault(require("../neko-2-features/f-2-users"));
const f_3_private_chats_1 = __importDefault(require("../neko-2-features/f-3-private-chats"));
const index_1 = __importDefault(require("../neko-2-features/f-4-shop/index"));
const index_2 = __importDefault(require("../neko-2-features/f-5-file/index"));
exports.routes = (app) => {
    // routes
    app.use('/auth', f_1_auth_1.default);
    app.use('/users', f_2_users_1.default);
    app.use('/private-chats', f_3_private_chats_1.default);
    app.use('/shop', index_1.default);
    app.use('/file', index_2.default);
    //default
    app.use((req, res) => {
        console.log('bad url: ', req.method, req.url);
        res.sendStatus(404);
    });
};
//# sourceMappingURL=routes.js.map