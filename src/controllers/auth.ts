// const {addUserMongo, getUsersMongo, deleteUsersMongo, getUsersMongoById, updateUsersMongo} = require("./mongoRep");
// let {getUsers, addUser} = require('./rep.js');

// @ts-ignore
const express = require('express');
// @ts-ignore
const store = require('./../bd/fake');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req: any, res: any, next: any) {
    console.log('Time: ', Date.now(), store);
    next();
});
router.get('/', async (req: any, res: any) => {
    const users = store.getAll();

    if (users) res.send(JSON.stringify(users));
    else res.send(404);
});
// router.get('/:id', async (req, res) => {
//     let users = await getUsersMongoById(req.params.id);
//
//     console.log(req.params.id);
//     if (users) res.send(JSON.stringify(users));
//     else res.send(404);
// });

// router.get('/', async (req, res) => {
//     let users;
//     if (req.query.name) {
//         //users = [users.find(u => u.name === req.query.name)];
//         users = await getUsersMongo(req.query.name);
//
//         console.log('qery: ' + req.query.name);
//     } else {
//         //let users = await getUsers();
//         users = await getUsersMongo();
//     }
//
//     console.log(users);
//     res.send(JSON.stringify(users));
// });
// router.delete('/:id', async (req, res) => {
//     await deleteUsersMongo(req.params.id);
//
//     console.log(req.params.id);
//     res.send(204);
// });
router.post('/login', async (req: any, res: any) => {
    console.log(req.body);
    //let result = await addUser(req.body.name);
    // await addUserMongo(req.body.name);
    const answer = store.login(req.body.email, req.body.password, req.body.rememberMe);

    res.send(JSON.stringify(answer));
});
router.post('/register', async (req: any, res: any) => {
    console.log(req.body);
    //let result = await addUser(req.body.name);
    // await addUserMongo(req.body.name);
    const answer = store.register(req.body.email, req.body.password);

    res.send(JSON.stringify(answer));
});
router.post('/forgot', async (req: any, res: any) => {
    console.log(req.body);
    //let result = await addUser(req.body.name);
    // await addUserMongo(req.body.name);
    const answer = store.forgot(req.body.email);

    res.send(JSON.stringify(answer));
});
router.post('/me', async (req: any, res: any) => {
    console.log(req.body);
    //let result = await addUser(req.body.name);
    // await addUserMongo(req.body.name);
    const answer = store.me(req.body.token);

    res.send(JSON.stringify(answer));
});


// router.put('/', async (req, res) => {
//     console.log(req.body.name);
//     //let result = await addUser(req.body.name);
//     await updateUsersMongo(req.body.id, req.body.name);
//     res.send(JSON.stringify({success: true}));
// });

module.exports = router;
