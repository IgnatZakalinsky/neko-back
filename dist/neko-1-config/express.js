"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
exports.appUse = (app) => {
    app.use(cors_1.default());
    // parse application/json
    app.use(body_parser_1.default.json({ limit: '150mb' }));
    // parse application/x-www-form-urlencoded
    app.use(body_parser_1.default.urlencoded({ limit: '150mb', extended: false }));
    // доступ к файлам, ...возможно не нужен
    app.use('/static', express_1.default.static(__dirname + '/files'));
    // Теперь чтобы обратиться к файлу about.html, необходимо отправить запрос http://localhost:3000/static/about.html.
    // for files
    app.use(multer_1.default({ dest: "uploads" }).single("myFile"));
    // log middleware
    app.use((req, res, next) => {
        console.log('Time: ', new Date().toString());
        console.log(req.method, req.url, 'params:', req.params);
        console.log('query:', req.query);
        console.log('body:', req.body);
        console.log('cookies:', req.cookies);
        // console.log('headers:', req.headers);
        // console.log('rawHeaders:', req.rawHeaders);
        next();
    });
};
//# sourceMappingURL=express.js.map