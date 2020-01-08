"use strict";
// const {addUserMongo, getUsersMongo, deleteUsersMongo, getUsersMongoById, updateUsersMongo} = require("./mongoRep");
// let {getUsers, addUser} = require('./rep.js');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const express = require('express');
// @ts-ignore
const fileStore = require('./../bd/fileFake');
// @ts-ignore
const router = express.Router();
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now(), fileStore);
    next();
});
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = fileStore.getFile64(req.query.n);
    if (file)
        res.send(JSON.stringify(file));
    else
        res.send(404);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = { success: false };
    if (req.body.file64)
        success = fileStore.addFile64(req.body.file64);
    else {
        // save file
    }
    if (success)
        res.send(JSON.stringify(success));
    else
        res.send(404);
}));
// router.delete('/', async (req: any, res: any) => {
//     const product = shopStore.deleteProduct(req.query.id);
//
//     if (product) res.send(JSON.stringify(product));
//     else res.send(404);
// });
// router.put('/', async (req: any, res: any) => {
//     const product = shopStore.updateProduct(req.body.product);
//
//     if (product) res.send(JSON.stringify(product));
//     else res.send(404);
// });
exports.default = router;
//# sourceMappingURL=file.js.map