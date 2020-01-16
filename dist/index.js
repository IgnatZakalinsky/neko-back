"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const neko_1_config_1 = require("./neko-1-config");
const { MongoDBUris, appUse, routes } = neko_1_config_1.config;
const app = express_1.default();
appUse(app);
routes(app);
mongoose_1.default.connect(MongoDBUris, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('MongoDB connected successfully');
    //start
    app.listen(process.env.PORT, () => {
        console.log('Neko-back listening on port: ' + process.env.PORT);
    });
    console.log('start...');
})
    .catch(e => console.log('MongoDB connection error: ' + e));
process.on('unhandledRejection', (reason, p) => {
    console.log('unhandledRejection: ', reason, p);
});
//# sourceMappingURL=index.js.map