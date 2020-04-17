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
const fileFake_1 = require("../bd/fileFake");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = fileFake_1.fileStore.getFile64(req.query.n);
    if (file)
        res.send(JSON.stringify(file));
    else
        res.send(404);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = { success: false };
    if (req.body.file64)
        success = fileFake_1.fileStore.addFile64(req.body.file64);
    else {
        // save file
    }
    if (success)
        res.send(JSON.stringify(success));
    else
        res.send(404);
}));
exports.default = router;
//# sourceMappingURL=file.js.map