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
Object.defineProperty(exports, "__esModule", { value: true });
exports.filePost = (path, shop) => shop.post(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileData = req.file;
    console.log(fileData);
    if (fileData)
        res.status(200).json({ success: true, fileName: fileData.originalname });
    else
        res.status(500).json({ error: 'some error, I hz :)' });
}));
exports.fileGet = (path, shop) => shop.get(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.query;
    console.log(url);
    //
    // fs.readFile('uploads/file', (e, data) => {
    //     if (!e) {
    //         res.status(200).end(data);
    //
    //     } else res.status(500).json({error: 'some error, I hz :)', errorObj: {...e}})
    // });
}));
//# sourceMappingURL=filePost.js.map