"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const f_1_auth_1 = __importDefault(require("../neko-2-features/f-1-auth"));
const f_2_users_1 = __importDefault(require("../neko-2-features/f-2-users"));
const privateChats_1 = __importDefault(require("../controllers/privateChats"));
const shop_1 = __importDefault(require("../controllers/shop"));
const file_1 = __importDefault(require("../controllers/file"));
exports.routes = (app) => {
    // routes
    app.use('/auth', f_1_auth_1.default);
    app.use('/users', f_2_users_1.default);
    app.use('/private-chats', privateChats_1.default);
    app.use('/shop', shop_1.default);
    app.use('/file', file_1.default);
    //default
    app.use((req, res) => {
        console.log('bad url: ', req.method, req.url);
        res.send(404);
    });
};
//# sourceMappingURL=routes.js.map