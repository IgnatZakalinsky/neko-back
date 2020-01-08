"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./controllers/auth"));
const shop_1 = __importDefault(require("./controllers/shop"));
const file_1 = __importDefault(require("./controllers/file"));
const app = express_1.default();
mongoose_1.default.connect('mongodb+srv://ai73aaa:1qazxcvBG@neko0-iwojt.mongodb.net/nekobd?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(e => console.log('MongoDB connection error: ' + e));
app.use(cors_1.default());
// parse application/json
app.use(body_parser_1.default.json({ limit: '200mb' }));
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ limit: '200mb', extended: false }));
// log middleware
app.use((req, res, next) => {
    console.log('Time: ', new Date().toDateString());
    console.log(req.method, req.url, 'params:', req.params);
    console.log('query:', req.query);
    console.log('body:', req.body);
    // console.log('headers:', req.headers);
    // console.log('rawHeaders:', req.rawHeaders);
    next();
});
// routes
app.use('/auth', auth_1.default);
app.use('/shop', shop_1.default);
app.use('/file', file_1.default);
//default
app.use((req, res) => {
    console.log('bad url: ', req);
    res.send(404);
});
//start
app.listen(process.env.PORT, () => {
    console.log('Neko-back app listening on port: ' + process.env.PORT);
});
console.log('start...');
process.on('unhandledRejection', (reason, p) => {
    console.log('unhandledRejection: ', reason, p);
});
//# sourceMappingURL=index.js.map