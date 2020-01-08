// const {addUserMongo, getUsersMongo, deleteUsersMongo, getUsersMongoById, updateUsersMongo} = require("./mongoRep");
// let {getUsers, addUser} = require('./rep.js');

// @ts-ignore
const express = require('express');
// @ts-ignore
const fileStore = require('./../bd/fileFake');
// @ts-ignore
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req: any, res: any, next: any) {
    console.log('Time: ', Date.now(), fileStore);
    next();
});
router.get('/', async (req: any, res: any) => {
    const file = fileStore.getFile64(req.query.n);

    if (file) res.send(JSON.stringify(file));
    else res.send(404);
});
router.post('/', async (req: any, res: any) => {
    let success = {success: false};
    if (req.body.file64) success = fileStore.addFile64(req.body.file64);
    else {
        // save file
    }

    if (success) res.send(JSON.stringify(success));
    else res.send(404);
});

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

export default router;
