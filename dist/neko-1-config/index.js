"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const express_1 = require("./express");
const routes_1 = require("./routes");
exports.config = {
    MongoDBUris: app_1.MongoDBUris,
    appUse: express_1.appUse,
    routes: routes_1.routes,
};
//# sourceMappingURL=index.js.map